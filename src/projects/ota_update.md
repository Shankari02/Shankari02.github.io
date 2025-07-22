---
title: Over-the-air update on ESP32
emoji: 🕹️
date: 2024-04-14
summary: Implementation of OTA update system on ESP32 
tags:
  - FreeRTOS
  - ESP-IDF Framework
  - SoftAP
---

### Project Goal

Implement an OTA update system using ESP-IDF that allows firmware to be uploaded via a web server hosted by the ESP32 itself. The ESP32 runs in SoftAP mode and accepts firmware uploads directly through a browser. The device uses ESP-IDF's robust OTA partitioning system with rollback protection to ensure a reliable update process.

---

### Step-by-Step Implementation

#### Partition Table Configuration

I first enabled **two OTA partitions** using `idf.py menuconfig`:

- Go to `Partition Table` → `Custom partition table CSV`

Then I created a custom partition CSV:

```c
Name, Type, SubType, Offset, Size, Flags
Note: if you have increased the bootloader size, make sure to update the offsets to  avoid overlap
nvs, data, nvs, 0xb000, 0x4000
otadata, data, ota, , 0x2000
phy_init, data, phy, , 0x1000
factory, app, factory, , 1M
ota_0, app, ota_0, , 952k
ota_1, app, ota_1, , 952K
spiffs, data, spiffs, , 512K
www, data, spiffs, , 512K
```
I had to carefully adjust the sizes based on the size of the firmware binary I planned to flash.

---

####  Web Server for Firmware Upload

I used the ESP-IDF HTTP server to build a basic file upload endpoint that receives a `.bin` file and writes it to an OTA partition.

Here’s the main logic of the upload handler:
```c
esp_err_t upload_post_handler(httpd_req_t *req) {
esp_ota_handle_t update_handle = 0 ;
const esp_partition_t *update_partition = esp_ota_get_next_update_partition(NULL);

printf("Writing to partition subtype %d at offset 0x%x\n",
       update_partition->subtype, update_partition->address);

char buf[1000] __attribute__((aligned(8)));  // ⚠️ Critical fix (Read ahead)
int remaining = req->content_len;
bool image_header_checked = false;

while (remaining > 0) {
    int received = httpd_req_recv(req, buf, MIN(remaining, sizeof(buf)));
    if (received <= 0) {
        return ESP_FAIL;
    }

    if (!image_header_checked) {
        // You can check magic byte or headers here
        image_header_checked = true;
    }

    esp_err_t err = esp_ota_write(update_handle, (const void *)buf, received);
    if (err != ESP_OK) return err;

    remaining -= received;
}

esp_ota_end(update_handle);
esp_ota_set_boot_partition(update_partition);
return ESP_OK;
}
```
---

#### Testing and the Major Bug

While flashing, an ip used to be hosted by the esp32 and another one as soon as the laptop is connected to the wifi hosted by the esp32. Yes, I used the SoftAP here i.e. the esp32 becomes an access point and nodes can connect to it. Once the ip's were allotted and the binary file was uploaded on the server, I ran into this cryptic error:
```c
E (42129) esp_ota_ops: OTA image has invalid magic byte (expected 0xE9, saw 0x48)
W (42129) httpd_txrx: httpd_resp_send_err: 500 Internal Server Error - Flash Error
W (42129) httpd_uri: httpd_uri: uri handler execution failed
```

It took me quite a while to figure out, but eventually I found the cause was **buffer alignment**. The flash API expects the input buffer to be 8-byte aligned.

Fix:
```c
char buf[1000] attribute((aligned(8)));
```
Adding `__attribute__((aligned(8)))` to the buffer fixed the problem completely. From then on, uploads worked correctly.

---

#### Configuring SoftAP

As I said above, the ESP32 was configured to operate as a Wi-Fi Access Point (AP), so I could connect my laptop directly and open a local web page to upload the binary:
```c
wifi_config_t wifi_config = {
.ap = {
.ssid = "esp32-ota",
.ssid_len = strlen("esp32-ota"),
.channel = 1,
.password = "esp32pass",
.max_connection = 4,
.authmode = WIFI_AUTH_WPA_WPA2_PSK
},
};
```
Once connected, I opened the ESP32's local IP address and uploaded a binary through a simple HTML form.

---

#### Final Results

- Successfully uploaded and flashed new firmware over Wi-Fi. Flashed LED Blink code using OTA update. 
  <div style="text-align: center;">
  <video width="300" height="200" controls>
    <source src="/assets/img/blog_images/ota_project/ota-flashing.mp4" type="video/mp4">
  </video>
  </div>
  
- The PCB you can see is actually known as the SRA board developed by the members of [SRA-VJTI](https://sravjti.in/). You can have a look [here](https://github.com/SRA-VJTI/sra-board-hardware-design) for more information on the PCB.

- [Github repository](https://github.com/Shankari02/OTA-update-on-ESP32)

---

#### Summary

This project taught me a lot about:

- ESP32's OTA update system
- Writing custom partition tables
- Handling web uploads in embedded systems
- Debugging low-level memory alignment issues

The biggest challenge was figuring out the reason for OTA failure - the misaligned buffer and learning how critical memory alignment is in embedded development.

---
#### Primary References

- [ESP-IDF OTA Update Docs](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/ota.html)  
- [ESP-IDF HTTP Server Docs](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/esp_http_server.html)  
- [Partition Tables](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/partition-tables.html) 



