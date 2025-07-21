---
title: Wall-E on Zephyr
emoji: 🚜
date: 2024-12-31
summary: This is an NPM package I made
tags:
  - Zephyr RTOS
  - Devicetree overlays
---

I worked on a robot **Wall-E** - a self-balancing, line-following bot. The earlier version was built using **ESP32** and **FreeRTOS**, and you can find that on [GitHub](https://github.com/SRA-VJTI/Wall-E).

But for this project, I wanted to take it a step further and try out **Zephyr RTOS** on the **Beagleconnect Freedom** board. It wasn’t just a port, a deep dive into **PWM APIs, ADCs, UARTs**, and the (in)famous **Devicetree overlays** in Zephyr.

---

#### What it does

- Uses **TB6612FNG** to control the DC motors via **PWM**.
- Reads sensor output via **ADC** and sends that over **UART** for debugging.
- Tracks lines accurately, thanks to good signal filtering and fast PWM switching.

---

#### Why Zephyr?

I have already played with FreeRTOS, but Zephyr caught my eye for a few reasons:

- It's actively maintained and modular.
- Supports Devicetree (just like Linux).
- Industry adoption is growing.
- Great abstraction for drivers (ADC, PWM, UART, etc).

That said, **Devicetree overlays** were… a journey 😅

---

## Devicetree Overlays

Here's an example overlay I wrote to enable `pwm0`:

```
&pwm0 {
    status = "okay";
};

&pwmleds {
    compatible = "pwm-leds";
    led1: pwm_led_1 {
        pwms = <&pwm0 0 PWM_MSEC(20) PWM_POLARITY_NORMAL>;
    };
};
```
And I could get motors running -
<div style="text-align: center;">
  <video width="200" height="300" controls>
    <source src="/assets/img/blog_images/wall-e-zephyr/motors-running.mp4" type="video/mp4">
  </video>
</div>

And for ADC:

```
&adc {
    status = "okay";
    channel@0 {
        reg = <0>;
        zephyr,channel-id = <0>;
        zephyr,gain = "ADC_GAIN_1";
        zephyr,reference = "ADC_REF_INTERNAL";
        zephyr,acquisition-time = <ADC_ACQ_TIME_DEFAULT>;
    };
};
```
We also got to enable drivers in prj.conf:

```
CONFIG_PWM=y
CONFIG_ADC=y
CONFIG_UART_CONSOLE=y
```
---

#### Challenges I Faced
Devicetree overlays took a while to understand, especially how to structure them and which nodes to patch.
- PWM driver wasn’t obvious at first. Some pins didn't support it and silently failed.
- ADC values fluctuated like crazy until I used internal reference and correct gain settings.
- UART wasn’t logging until I enabled it explicitly in the board overlay and Kconfig.

---

#### Resources
- [Zephyr Devicetree Guide](https://docs.zephyrproject.org/latest/build/dts/index.html)
- [Zephyr PWM API](https://docs.zephyrproject.org/latest/doxygen/html/group__pwm__interface.html)
- [Zephyr ADC API](https://docs.zephyrproject.org/latest/doxygen/html/group__adc__interface.html)
- [BeagleConnect Freedom Docs](https://docs.beagleboard.org/boards/beagleconnect/freedom/index.html#beagleconnect-freedom-home)
- [Github Repository](https://github.com/Shankari02/Wall-E_Zephyr_Port/tree/main)

