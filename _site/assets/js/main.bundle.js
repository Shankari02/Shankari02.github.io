(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/turbolinks/dist/turbolinks.js
  var require_turbolinks = __commonJS({
    "node_modules/turbolinks/dist/turbolinks.js"(exports, module) {
      (function() {
        var t = this;
        (function() {
          (function() {
            this.Turbolinks = { supported: function() {
              return null != window.history.pushState && null != window.requestAnimationFrame && null != window.addEventListener;
            }(), visit: function(t2, r) {
              return e.controller.visit(t2, r);
            }, clearCache: function() {
              return e.controller.clearCache();
            }, setProgressBarDelay: function(t2) {
              return e.controller.setProgressBarDelay(t2);
            } };
          }).call(this);
        }).call(t);
        var e = t.Turbolinks;
        (function() {
          (function() {
            var t2, r, n, o = [].slice;
            e.copyObject = function(t3) {
              var e2, r2, n2;
              r2 = {};
              for (e2 in t3) n2 = t3[e2], r2[e2] = n2;
              return r2;
            }, e.closest = function(e2, r2) {
              return t2.call(e2, r2);
            }, t2 = function() {
              var t3, e2;
              return t3 = document.documentElement, null != (e2 = t3.closest) ? e2 : function(t4) {
                var e3;
                for (e3 = this; e3; ) {
                  if (e3.nodeType === Node.ELEMENT_NODE && r.call(e3, t4)) return e3;
                  e3 = e3.parentNode;
                }
              };
            }(), e.defer = function(t3) {
              return setTimeout(t3, 1);
            }, e.throttle = function(t3) {
              var e2;
              return e2 = null, function() {
                var r2;
                return r2 = 1 <= arguments.length ? o.call(arguments, 0) : [], null != e2 ? e2 : e2 = requestAnimationFrame(/* @__PURE__ */ function(n2) {
                  return function() {
                    return e2 = null, t3.apply(n2, r2);
                  };
                }(this));
              };
            }, e.dispatch = function(t3, e2) {
              var r2, o2, i, s, a, u;
              return a = null != e2 ? e2 : {}, u = a.target, r2 = a.cancelable, o2 = a.data, i = document.createEvent("Events"), i.initEvent(t3, true, r2 === true), i.data = null != o2 ? o2 : {}, i.cancelable && !n && (s = i.preventDefault, i.preventDefault = function() {
                return this.defaultPrevented || Object.defineProperty(this, "defaultPrevented", { get: function() {
                  return true;
                } }), s.call(this);
              }), (null != u ? u : document).dispatchEvent(i), i;
            }, n = function() {
              var t3;
              return t3 = document.createEvent("Events"), t3.initEvent("test", true, true), t3.preventDefault(), t3.defaultPrevented;
            }(), e.match = function(t3, e2) {
              return r.call(t3, e2);
            }, r = function() {
              var t3, e2, r2, n2;
              return t3 = document.documentElement, null != (e2 = null != (r2 = null != (n2 = t3.matchesSelector) ? n2 : t3.webkitMatchesSelector) ? r2 : t3.msMatchesSelector) ? e2 : t3.mozMatchesSelector;
            }(), e.uuid = function() {
              var t3, e2, r2;
              for (r2 = "", t3 = e2 = 1; 36 >= e2; t3 = ++e2) r2 += 9 === t3 || 14 === t3 || 19 === t3 || 24 === t3 ? "-" : 15 === t3 ? "4" : 20 === t3 ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
              return r2;
            };
          }).call(this), function() {
            e.Location = function() {
              function t2(t3) {
                var e3, r2;
                null == t3 && (t3 = ""), r2 = document.createElement("a"), r2.href = t3.toString(), this.absoluteURL = r2.href, e3 = r2.hash.length, 2 > e3 ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e3), this.anchor = r2.hash.slice(1));
              }
              var e2, r, n, o;
              return t2.wrap = function(t3) {
                return t3 instanceof this ? t3 : new this(t3);
              }, t2.prototype.getOrigin = function() {
                return this.absoluteURL.split("/", 3).join("/");
              }, t2.prototype.getPath = function() {
                var t3, e3;
                return null != (t3 = null != (e3 = this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e3[1] : void 0) ? t3 : "/";
              }, t2.prototype.getPathComponents = function() {
                return this.getPath().split("/").slice(1);
              }, t2.prototype.getLastPathComponent = function() {
                return this.getPathComponents().slice(-1)[0];
              }, t2.prototype.getExtension = function() {
                var t3, e3;
                return null != (t3 = null != (e3 = this.getLastPathComponent().match(/\.[^.]*$/)) ? e3[0] : void 0) ? t3 : "";
              }, t2.prototype.isHTML = function() {
                return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/);
              }, t2.prototype.isPrefixedBy = function(t3) {
                var e3;
                return e3 = r(t3), this.isEqualTo(t3) || o(this.absoluteURL, e3);
              }, t2.prototype.isEqualTo = function(t3) {
                return this.absoluteURL === (null != t3 ? t3.absoluteURL : void 0);
              }, t2.prototype.toCacheKey = function() {
                return this.requestURL;
              }, t2.prototype.toJSON = function() {
                return this.absoluteURL;
              }, t2.prototype.toString = function() {
                return this.absoluteURL;
              }, t2.prototype.valueOf = function() {
                return this.absoluteURL;
              }, r = function(t3) {
                return e2(t3.getOrigin() + t3.getPath());
              }, e2 = function(t3) {
                return n(t3, "/") ? t3 : t3 + "/";
              }, o = function(t3, e3) {
                return t3.slice(0, e3.length) === e3;
              }, n = function(t3, e3) {
                return t3.slice(-e3.length) === e3;
              }, t2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.HttpRequest = function() {
              function r(r2, n, o) {
                this.delegate = r2, this.requestCanceled = t2(this.requestCanceled, this), this.requestTimedOut = t2(this.requestTimedOut, this), this.requestFailed = t2(this.requestFailed, this), this.requestLoaded = t2(this.requestLoaded, this), this.requestProgressed = t2(this.requestProgressed, this), this.url = e.Location.wrap(n).requestURL, this.referrer = e.Location.wrap(o).absoluteURL, this.createXHR();
              }
              return r.NETWORK_FAILURE = 0, r.TIMEOUT_FAILURE = -1, r.timeout = 60, r.prototype.send = function() {
                var t3;
                return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = true, "function" == typeof (t3 = this.delegate).requestStarted ? t3.requestStarted() : void 0) : void 0;
              }, r.prototype.cancel = function() {
                return this.xhr && this.sent ? this.xhr.abort() : void 0;
              }, r.prototype.requestProgressed = function(t3) {
                return t3.lengthComputable ? this.setProgress(t3.loaded / t3.total) : void 0;
              }, r.prototype.requestLoaded = function() {
                return this.endRequest(/* @__PURE__ */ function(t3) {
                  return function() {
                    var e2;
                    return 200 <= (e2 = t3.xhr.status) && 300 > e2 ? t3.delegate.requestCompletedWithResponse(t3.xhr.responseText, t3.xhr.getResponseHeader("Turbolinks-Location")) : (t3.failed = true, t3.delegate.requestFailedWithStatusCode(t3.xhr.status, t3.xhr.responseText));
                  };
                }(this));
              }, r.prototype.requestFailed = function() {
                return this.endRequest(/* @__PURE__ */ function(t3) {
                  return function() {
                    return t3.failed = true, t3.delegate.requestFailedWithStatusCode(t3.constructor.NETWORK_FAILURE);
                  };
                }(this));
              }, r.prototype.requestTimedOut = function() {
                return this.endRequest(/* @__PURE__ */ function(t3) {
                  return function() {
                    return t3.failed = true, t3.delegate.requestFailedWithStatusCode(t3.constructor.TIMEOUT_FAILURE);
                  };
                }(this));
              }, r.prototype.requestCanceled = function() {
                return this.endRequest();
              }, r.prototype.notifyApplicationBeforeRequestStart = function() {
                return e.dispatch("turbolinks:request-start", { data: { url: this.url, xhr: this.xhr } });
              }, r.prototype.notifyApplicationAfterRequestEnd = function() {
                return e.dispatch("turbolinks:request-end", { data: { url: this.url, xhr: this.xhr } });
              }, r.prototype.createXHR = function() {
                return this.xhr = new XMLHttpRequest(), this.xhr.open("GET", this.url, true), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled;
              }, r.prototype.endRequest = function(t3) {
                return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t3 && t3.call(this), this.destroy()) : void 0;
              }, r.prototype.setProgress = function(t3) {
                var e2;
                return this.progress = t3, "function" == typeof (e2 = this.delegate).requestProgressed ? e2.requestProgressed(this.progress) : void 0;
              }, r.prototype.destroy = function() {
                var t3;
                return this.setProgress(1), "function" == typeof (t3 = this.delegate).requestFinished && t3.requestFinished(), this.delegate = null, this.xhr = null;
              }, r;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.ProgressBar = function() {
              function e2() {
                this.trickle = t2(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement();
              }
              var r;
              return r = 300, e2.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + r + "ms ease-out, opacity " + r / 2 + "ms " + r / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", e2.prototype.show = function() {
                return this.visible ? void 0 : (this.visible = true, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling());
              }, e2.prototype.hide = function() {
                return this.visible && !this.hiding ? (this.hiding = true, this.fadeProgressElement(/* @__PURE__ */ function(t3) {
                  return function() {
                    return t3.uninstallProgressElement(), t3.stopTrickling(), t3.visible = false, t3.hiding = false;
                  };
                }(this))) : void 0;
              }, e2.prototype.setValue = function(t3) {
                return this.value = t3, this.refresh();
              }, e2.prototype.installStylesheetElement = function() {
                return document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
              }, e2.prototype.installProgressElement = function() {
                return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh();
              }, e2.prototype.fadeProgressElement = function(t3) {
                return this.progressElement.style.opacity = 0, setTimeout(t3, 1.5 * r);
              }, e2.prototype.uninstallProgressElement = function() {
                return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0;
              }, e2.prototype.startTrickling = function() {
                return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, r);
              }, e2.prototype.stopTrickling = function() {
                return clearInterval(this.trickleInterval), this.trickleInterval = null;
              }, e2.prototype.trickle = function() {
                return this.setValue(this.value + Math.random() / 100);
              }, e2.prototype.refresh = function() {
                return requestAnimationFrame(/* @__PURE__ */ function(t3) {
                  return function() {
                    return t3.progressElement.style.width = 10 + 90 * t3.value + "%";
                  };
                }(this));
              }, e2.prototype.createStylesheetElement = function() {
                var t3;
                return t3 = document.createElement("style"), t3.type = "text/css", t3.textContent = this.constructor.defaultCSS, t3;
              }, e2.prototype.createProgressElement = function() {
                var t3;
                return t3 = document.createElement("div"), t3.className = "turbolinks-progress-bar", t3;
              }, e2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.BrowserAdapter = function() {
              function r(r2) {
                this.controller = r2, this.showProgressBar = t2(this.showProgressBar, this), this.progressBar = new e.ProgressBar();
              }
              var n, o, i;
              return i = e.HttpRequest, n = i.NETWORK_FAILURE, o = i.TIMEOUT_FAILURE, r.prototype.visitProposedToLocationWithAction = function(t3, e2) {
                return this.controller.startVisitToLocationWithAction(t3, e2);
              }, r.prototype.visitStarted = function(t3) {
                return t3.issueRequest(), t3.changeHistory(), t3.loadCachedSnapshot();
              }, r.prototype.visitRequestStarted = function(t3) {
                return this.progressBar.setValue(0), t3.hasCachedSnapshot() || "restore" !== t3.action ? this.showProgressBarAfterDelay() : this.showProgressBar();
              }, r.prototype.visitRequestProgressed = function(t3) {
                return this.progressBar.setValue(t3.progress);
              }, r.prototype.visitRequestCompleted = function(t3) {
                return t3.loadResponse();
              }, r.prototype.visitRequestFailedWithStatusCode = function(t3, e2) {
                switch (e2) {
                  case n:
                  case o:
                    return this.reload();
                  default:
                    return t3.loadResponse();
                }
              }, r.prototype.visitRequestFinished = function(t3) {
                return this.hideProgressBar();
              }, r.prototype.visitCompleted = function(t3) {
                return t3.followRedirect();
              }, r.prototype.pageInvalidated = function() {
                return this.reload();
              }, r.prototype.showProgressBarAfterDelay = function() {
                return this.progressBarTimeout = setTimeout(this.showProgressBar, this.controller.progressBarDelay);
              }, r.prototype.showProgressBar = function() {
                return this.progressBar.show();
              }, r.prototype.hideProgressBar = function() {
                return this.progressBar.hide(), clearTimeout(this.progressBarTimeout);
              }, r.prototype.reload = function() {
                return window.location.reload();
              }, r;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.History = function() {
              function r(e2) {
                this.delegate = e2, this.onPageLoad = t2(this.onPageLoad, this), this.onPopState = t2(this.onPopState, this);
              }
              return r.prototype.start = function() {
                return this.started ? void 0 : (addEventListener("popstate", this.onPopState, false), addEventListener("load", this.onPageLoad, false), this.started = true);
              }, r.prototype.stop = function() {
                return this.started ? (removeEventListener("popstate", this.onPopState, false), removeEventListener("load", this.onPageLoad, false), this.started = false) : void 0;
              }, r.prototype.push = function(t3, r2) {
                return t3 = e.Location.wrap(t3), this.update("push", t3, r2);
              }, r.prototype.replace = function(t3, r2) {
                return t3 = e.Location.wrap(t3), this.update("replace", t3, r2);
              }, r.prototype.onPopState = function(t3) {
                var r2, n, o, i;
                return this.shouldHandlePopState() && (i = null != (n = t3.state) ? n.turbolinks : void 0) ? (r2 = e.Location.wrap(window.location), o = i.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(r2, o)) : void 0;
              }, r.prototype.onPageLoad = function(t3) {
                return e.defer(/* @__PURE__ */ function(t4) {
                  return function() {
                    return t4.pageLoaded = true;
                  };
                }(this));
              }, r.prototype.shouldHandlePopState = function() {
                return this.pageIsLoaded();
              }, r.prototype.pageIsLoaded = function() {
                return this.pageLoaded || "complete" === document.readyState;
              }, r.prototype.update = function(t3, e2, r2) {
                var n;
                return n = { turbolinks: { restorationIdentifier: r2 } }, history[t3 + "State"](n, null, e2);
              }, r;
            }();
          }.call(this), function() {
            e.HeadDetails = function() {
              function t2(t3) {
                var e3, r2, n2, s, a, u;
                for (this.elements = {}, n2 = 0, a = t3.length; a > n2; n2++) u = t3[n2], u.nodeType === Node.ELEMENT_NODE && (s = u.outerHTML, r2 = null != (e3 = this.elements)[s] ? e3[s] : e3[s] = { type: i(u), tracked: o(u), elements: [] }, r2.elements.push(u));
              }
              var e2, r, n, o, i;
              return t2.fromHeadElement = function(t3) {
                var e3;
                return new this(null != (e3 = null != t3 ? t3.childNodes : void 0) ? e3 : []);
              }, t2.prototype.hasElementWithKey = function(t3) {
                return t3 in this.elements;
              }, t2.prototype.getTrackedElementSignature = function() {
                var t3, e3;
                return function() {
                  var r2, n2;
                  r2 = this.elements, n2 = [];
                  for (t3 in r2) e3 = r2[t3].tracked, e3 && n2.push(t3);
                  return n2;
                }.call(this).join("");
              }, t2.prototype.getScriptElementsNotInDetails = function(t3) {
                return this.getElementsMatchingTypeNotInDetails("script", t3);
              }, t2.prototype.getStylesheetElementsNotInDetails = function(t3) {
                return this.getElementsMatchingTypeNotInDetails("stylesheet", t3);
              }, t2.prototype.getElementsMatchingTypeNotInDetails = function(t3, e3) {
                var r2, n2, o2, i2, s, a;
                o2 = this.elements, s = [];
                for (n2 in o2) i2 = o2[n2], a = i2.type, r2 = i2.elements, a !== t3 || e3.hasElementWithKey(n2) || s.push(r2[0]);
                return s;
              }, t2.prototype.getProvisionalElements = function() {
                var t3, e3, r2, n2, o2, i2, s;
                r2 = [], n2 = this.elements;
                for (e3 in n2) o2 = n2[e3], s = o2.type, i2 = o2.tracked, t3 = o2.elements, null != s || i2 ? t3.length > 1 && r2.push.apply(r2, t3.slice(1)) : r2.push.apply(r2, t3);
                return r2;
              }, t2.prototype.getMetaValue = function(t3) {
                var e3;
                return null != (e3 = this.findMetaElementByName(t3)) ? e3.getAttribute("content") : void 0;
              }, t2.prototype.findMetaElementByName = function(t3) {
                var r2, n2, o2, i2;
                r2 = void 0, i2 = this.elements;
                for (o2 in i2) n2 = i2[o2].elements, e2(n2[0], t3) && (r2 = n2[0]);
                return r2;
              }, i = function(t3) {
                return r(t3) ? "script" : n(t3) ? "stylesheet" : void 0;
              }, o = function(t3) {
                return "reload" === t3.getAttribute("data-turbolinks-track");
              }, r = function(t3) {
                var e3;
                return e3 = t3.tagName.toLowerCase(), "script" === e3;
              }, n = function(t3) {
                var e3;
                return e3 = t3.tagName.toLowerCase(), "style" === e3 || "link" === e3 && "stylesheet" === t3.getAttribute("rel");
              }, e2 = function(t3, e3) {
                var r2;
                return r2 = t3.tagName.toLowerCase(), "meta" === r2 && t3.getAttribute("name") === e3;
              }, t2;
            }();
          }.call(this), function() {
            e.Snapshot = function() {
              function t2(t3, e2) {
                this.headDetails = t3, this.bodyElement = e2;
              }
              return t2.wrap = function(t3) {
                return t3 instanceof this ? t3 : "string" == typeof t3 ? this.fromHTMLString(t3) : this.fromHTMLElement(t3);
              }, t2.fromHTMLString = function(t3) {
                var e2;
                return e2 = document.createElement("html"), e2.innerHTML = t3, this.fromHTMLElement(e2);
              }, t2.fromHTMLElement = function(t3) {
                var r, n, o, i;
                return o = t3.querySelector("head"), r = null != (i = t3.querySelector("body")) ? i : document.createElement("body"), n = e.HeadDetails.fromHeadElement(o), new this(n, r);
              }, t2.prototype.clone = function() {
                return new this.constructor(this.headDetails, this.bodyElement.cloneNode(true));
              }, t2.prototype.getRootLocation = function() {
                var t3, r;
                return r = null != (t3 = this.getSetting("root")) ? t3 : "/", new e.Location(r);
              }, t2.prototype.getCacheControlValue = function() {
                return this.getSetting("cache-control");
              }, t2.prototype.getElementForAnchor = function(t3) {
                try {
                  return this.bodyElement.querySelector("[id='" + t3 + "'], a[name='" + t3 + "']");
                } catch (e2) {
                }
              }, t2.prototype.getPermanentElements = function() {
                return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]");
              }, t2.prototype.getPermanentElementById = function(t3) {
                return this.bodyElement.querySelector("#" + t3 + "[data-turbolinks-permanent]");
              }, t2.prototype.getPermanentElementsPresentInSnapshot = function(t3) {
                var e2, r, n, o, i;
                for (o = this.getPermanentElements(), i = [], r = 0, n = o.length; n > r; r++) e2 = o[r], t3.getPermanentElementById(e2.id) && i.push(e2);
                return i;
              }, t2.prototype.findFirstAutofocusableElement = function() {
                return this.bodyElement.querySelector("[autofocus]");
              }, t2.prototype.hasAnchor = function(t3) {
                return null != this.getElementForAnchor(t3);
              }, t2.prototype.isPreviewable = function() {
                return "no-preview" !== this.getCacheControlValue();
              }, t2.prototype.isCacheable = function() {
                return "no-cache" !== this.getCacheControlValue();
              }, t2.prototype.isVisitable = function() {
                return "reload" !== this.getSetting("visit-control");
              }, t2.prototype.getSetting = function(t3) {
                return this.headDetails.getMetaValue("turbolinks-" + t3);
              }, t2;
            }();
          }.call(this), function() {
            var t2 = [].slice;
            e.Renderer = function() {
              function e2() {
              }
              var r;
              return e2.render = function() {
                var e3, r2, n, o;
                return n = arguments[0], r2 = arguments[1], e3 = 3 <= arguments.length ? t2.call(arguments, 2) : [], o = function(t3, e4, r3) {
                  r3.prototype = t3.prototype;
                  var n2 = new r3(), o2 = t3.apply(n2, e4);
                  return Object(o2) === o2 ? o2 : n2;
                }(this, e3, function() {
                }), o.delegate = n, o.render(r2), o;
              }, e2.prototype.renderView = function(t3) {
                return this.delegate.viewWillRender(this.newBody), t3(), this.delegate.viewRendered(this.newBody);
              }, e2.prototype.invalidateView = function() {
                return this.delegate.viewInvalidated();
              }, e2.prototype.createScriptElement = function(t3) {
                var e3;
                return "false" === t3.getAttribute("data-turbolinks-eval") ? t3 : (e3 = document.createElement("script"), e3.textContent = t3.textContent, e3.async = false, r(e3, t3), e3);
              }, r = function(t3, e3) {
                var r2, n, o, i, s, a, u;
                for (i = e3.attributes, a = [], r2 = 0, n = i.length; n > r2; r2++) s = i[r2], o = s.name, u = s.value, a.push(t3.setAttribute(o, u));
                return a;
              }, e2;
            }();
          }.call(this), function() {
            var t2, r, n = function(t3, e2) {
              function r2() {
                this.constructor = t3;
              }
              for (var n2 in e2) o.call(e2, n2) && (t3[n2] = e2[n2]);
              return r2.prototype = e2.prototype, t3.prototype = new r2(), t3.__super__ = e2.prototype, t3;
            }, o = {}.hasOwnProperty;
            e.SnapshotRenderer = function(e2) {
              function o2(t3, e3, r2) {
                this.currentSnapshot = t3, this.newSnapshot = e3, this.isPreview = r2, this.currentHeadDetails = this.currentSnapshot.headDetails, this.newHeadDetails = this.newSnapshot.headDetails, this.currentBody = this.currentSnapshot.bodyElement, this.newBody = this.newSnapshot.bodyElement;
              }
              return n(o2, e2), o2.prototype.render = function(t3) {
                return this.shouldRender() ? (this.mergeHead(), this.renderView(/* @__PURE__ */ function(e3) {
                  return function() {
                    return e3.replaceBody(), e3.isPreview || e3.focusFirstAutofocusableElement(), t3();
                  };
                }(this))) : this.invalidateView();
              }, o2.prototype.mergeHead = function() {
                return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements();
              }, o2.prototype.replaceBody = function() {
                var t3;
                return t3 = this.relocateCurrentBodyPermanentElements(), this.activateNewBodyScriptElements(), this.assignNewBody(), this.replacePlaceholderElementsWithClonedPermanentElements(t3);
              }, o2.prototype.shouldRender = function() {
                return this.newSnapshot.isVisitable() && this.trackedElementsAreIdentical();
              }, o2.prototype.trackedElementsAreIdentical = function() {
                return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature();
              }, o2.prototype.copyNewHeadStylesheetElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getNewHeadStylesheetElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++) t3 = n2[e3], o3.push(document.head.appendChild(t3));
                return o3;
              }, o2.prototype.copyNewHeadScriptElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getNewHeadScriptElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++) t3 = n2[e3], o3.push(document.head.appendChild(this.createScriptElement(t3)));
                return o3;
              }, o2.prototype.removeCurrentHeadProvisionalElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getCurrentHeadProvisionalElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++) t3 = n2[e3], o3.push(document.head.removeChild(t3));
                return o3;
              }, o2.prototype.copyNewHeadProvisionalElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getNewHeadProvisionalElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++) t3 = n2[e3], o3.push(document.head.appendChild(t3));
                return o3;
              }, o2.prototype.relocateCurrentBodyPermanentElements = function() {
                var e3, n2, o3, i, s, a, u;
                for (a = this.getCurrentBodyPermanentElements(), u = [], e3 = 0, n2 = a.length; n2 > e3; e3++) i = a[e3], s = t2(i), o3 = this.newSnapshot.getPermanentElementById(i.id), r(i, s.element), r(o3, i), u.push(s);
                return u;
              }, o2.prototype.replacePlaceholderElementsWithClonedPermanentElements = function(t3) {
                var e3, n2, o3, i, s, a, u;
                for (u = [], o3 = 0, i = t3.length; i > o3; o3++) a = t3[o3], n2 = a.element, s = a.permanentElement, e3 = s.cloneNode(true), u.push(r(n2, e3));
                return u;
              }, o2.prototype.activateNewBodyScriptElements = function() {
                var t3, e3, n2, o3, i, s;
                for (i = this.getNewBodyScriptElements(), s = [], e3 = 0, o3 = i.length; o3 > e3; e3++) n2 = i[e3], t3 = this.createScriptElement(n2), s.push(r(n2, t3));
                return s;
              }, o2.prototype.assignNewBody = function() {
                return document.body = this.newBody;
              }, o2.prototype.focusFirstAutofocusableElement = function() {
                var t3;
                return null != (t3 = this.newSnapshot.findFirstAutofocusableElement()) ? t3.focus() : void 0;
              }, o2.prototype.getNewHeadStylesheetElements = function() {
                return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails);
              }, o2.prototype.getNewHeadScriptElements = function() {
                return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails);
              }, o2.prototype.getCurrentHeadProvisionalElements = function() {
                return this.currentHeadDetails.getProvisionalElements();
              }, o2.prototype.getNewHeadProvisionalElements = function() {
                return this.newHeadDetails.getProvisionalElements();
              }, o2.prototype.getCurrentBodyPermanentElements = function() {
                return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot);
              }, o2.prototype.getNewBodyScriptElements = function() {
                return this.newBody.querySelectorAll("script");
              }, o2;
            }(e.Renderer), t2 = function(t3) {
              var e2;
              return e2 = document.createElement("meta"), e2.setAttribute("name", "turbolinks-permanent-placeholder"), e2.setAttribute("content", t3.id), { element: e2, permanentElement: t3 };
            }, r = function(t3, e2) {
              var r2;
              return (r2 = t3.parentNode) ? r2.replaceChild(e2, t3) : void 0;
            };
          }.call(this), function() {
            var t2 = function(t3, e2) {
              function n() {
                this.constructor = t3;
              }
              for (var o in e2) r.call(e2, o) && (t3[o] = e2[o]);
              return n.prototype = e2.prototype, t3.prototype = new n(), t3.__super__ = e2.prototype, t3;
            }, r = {}.hasOwnProperty;
            e.ErrorRenderer = function(e2) {
              function r2(t3) {
                var e3;
                e3 = document.createElement("html"), e3.innerHTML = t3, this.newHead = e3.querySelector("head"), this.newBody = e3.querySelector("body");
              }
              return t2(r2, e2), r2.prototype.render = function(t3) {
                return this.renderView(/* @__PURE__ */ function(e3) {
                  return function() {
                    return e3.replaceHeadAndBody(), e3.activateBodyScriptElements(), t3();
                  };
                }(this));
              }, r2.prototype.replaceHeadAndBody = function() {
                var t3, e3;
                return e3 = document.head, t3 = document.body, e3.parentNode.replaceChild(this.newHead, e3), t3.parentNode.replaceChild(this.newBody, t3);
              }, r2.prototype.activateBodyScriptElements = function() {
                var t3, e3, r3, n, o, i;
                for (n = this.getScriptElements(), i = [], e3 = 0, r3 = n.length; r3 > e3; e3++) o = n[e3], t3 = this.createScriptElement(o), i.push(o.parentNode.replaceChild(t3, o));
                return i;
              }, r2.prototype.getScriptElements = function() {
                return document.documentElement.querySelectorAll("script");
              }, r2;
            }(e.Renderer);
          }.call(this), function() {
            e.View = function() {
              function t2(t3) {
                this.delegate = t3, this.htmlElement = document.documentElement;
              }
              return t2.prototype.getRootLocation = function() {
                return this.getSnapshot().getRootLocation();
              }, t2.prototype.getElementForAnchor = function(t3) {
                return this.getSnapshot().getElementForAnchor(t3);
              }, t2.prototype.getSnapshot = function() {
                return e.Snapshot.fromHTMLElement(this.htmlElement);
              }, t2.prototype.render = function(t3, e2) {
                var r, n, o;
                return o = t3.snapshot, r = t3.error, n = t3.isPreview, this.markAsPreview(n), null != o ? this.renderSnapshot(o, n, e2) : this.renderError(r, e2);
              }, t2.prototype.markAsPreview = function(t3) {
                return t3 ? this.htmlElement.setAttribute("data-turbolinks-preview", "") : this.htmlElement.removeAttribute("data-turbolinks-preview");
              }, t2.prototype.renderSnapshot = function(t3, r, n) {
                return e.SnapshotRenderer.render(this.delegate, n, this.getSnapshot(), e.Snapshot.wrap(t3), r);
              }, t2.prototype.renderError = function(t3, r) {
                return e.ErrorRenderer.render(this.delegate, r, t3);
              }, t2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.ScrollManager = function() {
              function r(r2) {
                this.delegate = r2, this.onScroll = t2(this.onScroll, this), this.onScroll = e.throttle(this.onScroll);
              }
              return r.prototype.start = function() {
                return this.started ? void 0 : (addEventListener("scroll", this.onScroll, false), this.onScroll(), this.started = true);
              }, r.prototype.stop = function() {
                return this.started ? (removeEventListener("scroll", this.onScroll, false), this.started = false) : void 0;
              }, r.prototype.scrollToElement = function(t3) {
                return t3.scrollIntoView();
              }, r.prototype.scrollToPosition = function(t3) {
                var e2, r2;
                return e2 = t3.x, r2 = t3.y, window.scrollTo(e2, r2);
              }, r.prototype.onScroll = function(t3) {
                return this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
              }, r.prototype.updatePosition = function(t3) {
                var e2;
                return this.position = t3, null != (e2 = this.delegate) ? e2.scrollPositionChanged(this.position) : void 0;
              }, r;
            }();
          }.call(this), function() {
            e.SnapshotCache = function() {
              function t2(t3) {
                this.size = t3, this.keys = [], this.snapshots = {};
              }
              var r;
              return t2.prototype.has = function(t3) {
                var e2;
                return e2 = r(t3), e2 in this.snapshots;
              }, t2.prototype.get = function(t3) {
                var e2;
                if (this.has(t3)) return e2 = this.read(t3), this.touch(t3), e2;
              }, t2.prototype.put = function(t3, e2) {
                return this.write(t3, e2), this.touch(t3), e2;
              }, t2.prototype.read = function(t3) {
                var e2;
                return e2 = r(t3), this.snapshots[e2];
              }, t2.prototype.write = function(t3, e2) {
                var n;
                return n = r(t3), this.snapshots[n] = e2;
              }, t2.prototype.touch = function(t3) {
                var e2, n;
                return n = r(t3), e2 = this.keys.indexOf(n), e2 > -1 && this.keys.splice(e2, 1), this.keys.unshift(n), this.trim();
              }, t2.prototype.trim = function() {
                var t3, e2, r2, n, o;
                for (n = this.keys.splice(this.size), o = [], t3 = 0, r2 = n.length; r2 > t3; t3++) e2 = n[t3], o.push(delete this.snapshots[e2]);
                return o;
              }, r = function(t3) {
                return e.Location.wrap(t3).toCacheKey();
              }, t2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.Visit = function() {
              function r(r2, n2, o) {
                this.controller = r2, this.action = o, this.performScroll = t2(this.performScroll, this), this.identifier = e.uuid(), this.location = e.Location.wrap(n2), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {};
              }
              var n;
              return r.prototype.start = function() {
                return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0;
              }, r.prototype.cancel = function() {
                var t3;
                return "started" === this.state ? (null != (t3 = this.request) && t3.cancel(), this.cancelRender(), this.state = "canceled") : void 0;
              }, r.prototype.complete = function() {
                var t3;
                return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof (t3 = this.adapter).visitCompleted && t3.visitCompleted(this), this.controller.visitCompleted(this)) : void 0;
              }, r.prototype.fail = function() {
                var t3;
                return "started" === this.state ? (this.state = "failed", "function" == typeof (t3 = this.adapter).visitFailed ? t3.visitFailed(this) : void 0) : void 0;
              }, r.prototype.changeHistory = function() {
                var t3, e2;
                return this.historyChanged ? void 0 : (t3 = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e2 = n(t3), this.controller[e2](this.location, this.restorationIdentifier), this.historyChanged = true);
              }, r.prototype.issueRequest = function() {
                return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new e.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0;
              }, r.prototype.getCachedSnapshot = function() {
                var t3;
                return !(t3 = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t3.hasAnchor(this.location.anchor) || "restore" !== this.action && !t3.isPreviewable() ? void 0 : t3;
              }, r.prototype.hasCachedSnapshot = function() {
                return null != this.getCachedSnapshot();
              }, r.prototype.loadCachedSnapshot = function() {
                var t3, e2;
                return (e2 = this.getCachedSnapshot()) ? (t3 = this.shouldIssueRequest(), this.render(function() {
                  var r2;
                  return this.cacheSnapshot(), this.controller.render({ snapshot: e2, isPreview: t3 }, this.performScroll), "function" == typeof (r2 = this.adapter).visitRendered && r2.visitRendered(this), t3 ? void 0 : this.complete();
                })) : void 0;
              }, r.prototype.loadResponse = function() {
                return null != this.response ? this.render(function() {
                  var t3, e2;
                  return this.cacheSnapshot(), this.request.failed ? (this.controller.render({ error: this.response }, this.performScroll), "function" == typeof (t3 = this.adapter).visitRendered && t3.visitRendered(this), this.fail()) : (this.controller.render({ snapshot: this.response }, this.performScroll), "function" == typeof (e2 = this.adapter).visitRendered && e2.visitRendered(this), this.complete());
                }) : void 0;
              }, r.prototype.followRedirect = function() {
                return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = true) : void 0;
              }, r.prototype.requestStarted = function() {
                var t3;
                return this.recordTimingMetric("requestStart"), "function" == typeof (t3 = this.adapter).visitRequestStarted ? t3.visitRequestStarted(this) : void 0;
              }, r.prototype.requestProgressed = function(t3) {
                var e2;
                return this.progress = t3, "function" == typeof (e2 = this.adapter).visitRequestProgressed ? e2.visitRequestProgressed(this) : void 0;
              }, r.prototype.requestCompletedWithResponse = function(t3, r2) {
                return this.response = t3, null != r2 && (this.redirectedToLocation = e.Location.wrap(r2)), this.adapter.visitRequestCompleted(this);
              }, r.prototype.requestFailedWithStatusCode = function(t3, e2) {
                return this.response = e2, this.adapter.visitRequestFailedWithStatusCode(this, t3);
              }, r.prototype.requestFinished = function() {
                var t3;
                return this.recordTimingMetric("requestEnd"), "function" == typeof (t3 = this.adapter).visitRequestFinished ? t3.visitRequestFinished(this) : void 0;
              }, r.prototype.performScroll = function() {
                return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = true);
              }, r.prototype.scrollToRestoredPosition = function() {
                var t3, e2;
                return t3 = null != (e2 = this.restorationData) ? e2.scrollPosition : void 0, null != t3 ? (this.controller.scrollToPosition(t3), true) : void 0;
              }, r.prototype.scrollToAnchor = function() {
                return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), true) : void 0;
              }, r.prototype.scrollToTop = function() {
                return this.controller.scrollToPosition({ x: 0, y: 0 });
              }, r.prototype.recordTimingMetric = function(t3) {
                var e2;
                return null != (e2 = this.timingMetrics)[t3] ? e2[t3] : e2[t3] = (/* @__PURE__ */ new Date()).getTime();
              }, r.prototype.getTimingMetrics = function() {
                return e.copyObject(this.timingMetrics);
              }, n = function(t3) {
                switch (t3) {
                  case "replace":
                    return "replaceHistoryWithLocationAndRestorationIdentifier";
                  case "advance":
                  case "restore":
                    return "pushHistoryWithLocationAndRestorationIdentifier";
                }
              }, r.prototype.shouldIssueRequest = function() {
                return "restore" === this.action ? !this.hasCachedSnapshot() : true;
              }, r.prototype.cacheSnapshot = function() {
                return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = true);
              }, r.prototype.render = function(t3) {
                return this.cancelRender(), this.frame = requestAnimationFrame(/* @__PURE__ */ function(e2) {
                  return function() {
                    return e2.frame = null, t3.call(e2);
                  };
                }(this));
              }, r.prototype.cancelRender = function() {
                return this.frame ? cancelAnimationFrame(this.frame) : void 0;
              }, r;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.Controller = function() {
              function r() {
                this.clickBubbled = t2(this.clickBubbled, this), this.clickCaptured = t2(this.clickCaptured, this), this.pageLoaded = t2(this.pageLoaded, this), this.history = new e.History(this), this.view = new e.View(this), this.scrollManager = new e.ScrollManager(this), this.restorationData = {}, this.clearCache(), this.setProgressBarDelay(500);
              }
              return r.prototype.start = function() {
                return e.supported && !this.started ? (addEventListener("click", this.clickCaptured, true), addEventListener("DOMContentLoaded", this.pageLoaded, false), this.scrollManager.start(), this.startHistory(), this.started = true, this.enabled = true) : void 0;
              }, r.prototype.disable = function() {
                return this.enabled = false;
              }, r.prototype.stop = function() {
                return this.started ? (removeEventListener("click", this.clickCaptured, true), removeEventListener("DOMContentLoaded", this.pageLoaded, false), this.scrollManager.stop(), this.stopHistory(), this.started = false) : void 0;
              }, r.prototype.clearCache = function() {
                return this.cache = new e.SnapshotCache(10);
              }, r.prototype.visit = function(t3, r2) {
                var n, o;
                return null == r2 && (r2 = {}), t3 = e.Location.wrap(t3), this.applicationAllowsVisitingLocation(t3) ? this.locationIsVisitable(t3) ? (n = null != (o = r2.action) ? o : "advance", this.adapter.visitProposedToLocationWithAction(t3, n)) : window.location = t3 : void 0;
              }, r.prototype.startVisitToLocationWithAction = function(t3, r2, n) {
                var o;
                return e.supported ? (o = this.getRestorationDataForIdentifier(n), this.startVisit(t3, r2, { restorationData: o })) : window.location = t3;
              }, r.prototype.setProgressBarDelay = function(t3) {
                return this.progressBarDelay = t3;
              }, r.prototype.startHistory = function() {
                return this.location = e.Location.wrap(window.location), this.restorationIdentifier = e.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier);
              }, r.prototype.stopHistory = function() {
                return this.history.stop();
              }, r.prototype.pushHistoryWithLocationAndRestorationIdentifier = function(t3, r2) {
                return this.restorationIdentifier = r2, this.location = e.Location.wrap(t3), this.history.push(this.location, this.restorationIdentifier);
              }, r.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function(t3, r2) {
                return this.restorationIdentifier = r2, this.location = e.Location.wrap(t3), this.history.replace(this.location, this.restorationIdentifier);
              }, r.prototype.historyPoppedToLocationWithRestorationIdentifier = function(t3, r2) {
                var n;
                return this.restorationIdentifier = r2, this.enabled ? (n = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(t3, "restore", { restorationIdentifier: this.restorationIdentifier, restorationData: n, historyChanged: true }), this.location = e.Location.wrap(t3)) : this.adapter.pageInvalidated();
              }, r.prototype.getCachedSnapshotForLocation = function(t3) {
                var e2;
                return null != (e2 = this.cache.get(t3)) ? e2.clone() : void 0;
              }, r.prototype.shouldCacheSnapshot = function() {
                return this.view.getSnapshot().isCacheable();
              }, r.prototype.cacheSnapshot = function() {
                var t3, r2;
                return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), r2 = this.view.getSnapshot(), t3 = this.lastRenderedLocation, e.defer(/* @__PURE__ */ function(e2) {
                  return function() {
                    return e2.cache.put(t3, r2.clone());
                  };
                }(this))) : void 0;
              }, r.prototype.scrollToAnchor = function(t3) {
                var e2;
                return (e2 = this.view.getElementForAnchor(t3)) ? this.scrollToElement(e2) : this.scrollToPosition({ x: 0, y: 0 });
              }, r.prototype.scrollToElement = function(t3) {
                return this.scrollManager.scrollToElement(t3);
              }, r.prototype.scrollToPosition = function(t3) {
                return this.scrollManager.scrollToPosition(t3);
              }, r.prototype.scrollPositionChanged = function(t3) {
                var e2;
                return e2 = this.getCurrentRestorationData(), e2.scrollPosition = t3;
              }, r.prototype.render = function(t3, e2) {
                return this.view.render(t3, e2);
              }, r.prototype.viewInvalidated = function() {
                return this.adapter.pageInvalidated();
              }, r.prototype.viewWillRender = function(t3) {
                return this.notifyApplicationBeforeRender(t3);
              }, r.prototype.viewRendered = function() {
                return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender();
              }, r.prototype.pageLoaded = function() {
                return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad();
              }, r.prototype.clickCaptured = function() {
                return removeEventListener("click", this.clickBubbled, false), addEventListener("click", this.clickBubbled, false);
              }, r.prototype.clickBubbled = function(t3) {
                var e2, r2, n;
                return this.enabled && this.clickEventIsSignificant(t3) && (r2 = this.getVisitableLinkForNode(t3.target)) && (n = this.getVisitableLocationForLink(r2)) && this.applicationAllowsFollowingLinkToLocation(r2, n) ? (t3.preventDefault(), e2 = this.getActionForLink(r2), this.visit(n, { action: e2 })) : void 0;
              }, r.prototype.applicationAllowsFollowingLinkToLocation = function(t3, e2) {
                var r2;
                return r2 = this.notifyApplicationAfterClickingLinkToLocation(t3, e2), !r2.defaultPrevented;
              }, r.prototype.applicationAllowsVisitingLocation = function(t3) {
                var e2;
                return e2 = this.notifyApplicationBeforeVisitingLocation(t3), !e2.defaultPrevented;
              }, r.prototype.notifyApplicationAfterClickingLinkToLocation = function(t3, r2) {
                return e.dispatch("turbolinks:click", { target: t3, data: { url: r2.absoluteURL }, cancelable: true });
              }, r.prototype.notifyApplicationBeforeVisitingLocation = function(t3) {
                return e.dispatch("turbolinks:before-visit", { data: { url: t3.absoluteURL }, cancelable: true });
              }, r.prototype.notifyApplicationAfterVisitingLocation = function(t3) {
                return e.dispatch("turbolinks:visit", { data: { url: t3.absoluteURL } });
              }, r.prototype.notifyApplicationBeforeCachingSnapshot = function() {
                return e.dispatch("turbolinks:before-cache");
              }, r.prototype.notifyApplicationBeforeRender = function(t3) {
                return e.dispatch("turbolinks:before-render", { data: { newBody: t3 } });
              }, r.prototype.notifyApplicationAfterRender = function() {
                return e.dispatch("turbolinks:render");
              }, r.prototype.notifyApplicationAfterPageLoad = function(t3) {
                return null == t3 && (t3 = {}), e.dispatch("turbolinks:load", { data: { url: this.location.absoluteURL, timing: t3 } });
              }, r.prototype.startVisit = function(t3, e2, r2) {
                var n;
                return null != (n = this.currentVisit) && n.cancel(), this.currentVisit = this.createVisit(t3, e2, r2), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t3);
              }, r.prototype.createVisit = function(t3, r2, n) {
                var o, i, s, a, u;
                return i = null != n ? n : {}, a = i.restorationIdentifier, s = i.restorationData, o = i.historyChanged, u = new e.Visit(this, t3, r2), u.restorationIdentifier = null != a ? a : e.uuid(), u.restorationData = e.copyObject(s), u.historyChanged = o, u.referrer = this.location, u;
              }, r.prototype.visitCompleted = function(t3) {
                return this.notifyApplicationAfterPageLoad(t3.getTimingMetrics());
              }, r.prototype.clickEventIsSignificant = function(t3) {
                return !(t3.defaultPrevented || t3.target.isContentEditable || t3.which > 1 || t3.altKey || t3.ctrlKey || t3.metaKey || t3.shiftKey);
              }, r.prototype.getVisitableLinkForNode = function(t3) {
                return this.nodeIsVisitable(t3) ? e.closest(t3, "a[href]:not([target]):not([download])") : void 0;
              }, r.prototype.getVisitableLocationForLink = function(t3) {
                var r2;
                return r2 = new e.Location(t3.getAttribute("href")), this.locationIsVisitable(r2) ? r2 : void 0;
              }, r.prototype.getActionForLink = function(t3) {
                var e2;
                return null != (e2 = t3.getAttribute("data-turbolinks-action")) ? e2 : "advance";
              }, r.prototype.nodeIsVisitable = function(t3) {
                var r2;
                return (r2 = e.closest(t3, "[data-turbolinks]")) ? "false" !== r2.getAttribute("data-turbolinks") : true;
              }, r.prototype.locationIsVisitable = function(t3) {
                return t3.isPrefixedBy(this.view.getRootLocation()) && t3.isHTML();
              }, r.prototype.getCurrentRestorationData = function() {
                return this.getRestorationDataForIdentifier(this.restorationIdentifier);
              }, r.prototype.getRestorationDataForIdentifier = function(t3) {
                var e2;
                return null != (e2 = this.restorationData)[t3] ? e2[t3] : e2[t3] = {};
              }, r;
            }();
          }.call(this), function() {
            !function() {
              var t2, e2;
              if ((t2 = e2 = document.currentScript) && !e2.hasAttribute("data-turbolinks-suppress-warning")) {
                for (; t2 = t2.parentNode; ) if (t2 === document.body) return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s", e2.outerHTML);
              }
            }();
          }.call(this), function() {
            var t2, r, n;
            e.start = function() {
              return r() ? (null == e.controller && (e.controller = t2()), e.controller.start()) : void 0;
            }, r = function() {
              return null == window.Turbolinks && (window.Turbolinks = e), n();
            }, t2 = function() {
              var t3;
              return t3 = new e.Controller(), t3.adapter = new e.BrowserAdapter(t3), t3;
            }, n = function() {
              return window.Turbolinks === e;
            }, n() && e.start();
          }.call(this);
        }).call(this), "object" == typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e);
      }).call(exports);
    }
  });

  // src/assets/js/drawer.js
  var require_drawer = __commonJS({
    "src/assets/js/drawer.js"(exports, module) {
      var drawer2 = () => {
        const settings = {
          speedOpen: 50,
          speedClose: 350,
          activeClass: "is-active",
          visibleClass: "is-visible",
          selectorTarget: "[data-drawer-target]",
          selectorTrigger: "[data-drawer-trigger]",
          selectorClose: "[data-drawer-close]"
        };
        if (!Element.prototype.closest) {
          if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
          }
          Element.prototype.closest = (s) => {
            const el = exports;
            let ancestor = exports;
            if (!document.documentElement.contains(el)) return null;
            do {
              if (ancestor.matches(s)) return ancestor;
              ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return null;
          };
        }
        const trapFocus = (element) => {
          const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
          const firstFocusableEl = focusableEls[0];
          const lastFocusableEl = focusableEls[focusableEls.length - 1];
          const KEYCODE_TAB = 9;
          element.addEventListener("keydown", (e) => {
            const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;
            if (!isTabPressed) {
              return;
            }
            if (e.shiftKey) {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
              }
            }
          });
        };
        const toggleAccessibility = (event) => {
          if (event.getAttribute("aria-expanded") === "true") {
            event.setAttribute("aria-expanded", false);
          } else {
            event.setAttribute("aria-expanded", true);
          }
        };
        const removeOverlay = () => {
          document.documentElement.style.overflow = "";
        };
        const openDrawer = (trigger) => {
          const target = document.getElementById(trigger.getAttribute("aria-controls"));
          target.classList.add(settings.activeClass);
          document.documentElement.style.overflow = "hidden";
          toggleAccessibility(trigger);
          setTimeout(() => {
            target.classList.add(settings.visibleClass);
            trapFocus(target);
          }, settings.speedOpen);
        };
        const closeDrawer = (event) => {
          const closestParent = event.closest(settings.selectorTarget);
          const childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"');
          closestParent.classList.remove(settings.visibleClass);
          removeOverlay();
          toggleAccessibility(childrenTrigger);
          setTimeout(function() {
            closestParent.classList.remove(settings.activeClass);
          }, settings.speedClose);
        };
        const clickHandler = (event) => {
          const toggle = event.target;
          const open = toggle.closest(settings.selectorTrigger);
          const close = toggle.closest(settings.selectorClose);
          if (open) {
            openDrawer(open);
          }
          if (close) {
            closeDrawer(close);
          }
          if (open || close) {
            event.preventDefault();
          }
        };
        const keydownHandler = (event) => {
          if (event.key === "Escape" || event.keyCode === 27) {
            const drawers = document.querySelectorAll(settings.selectorTarget);
            for (let i = 0; i < drawers.length; ++i) {
              if (drawers[i].classList.contains(settings.activeClass)) {
                closeDrawer(drawers[i]);
              }
            }
          }
        };
        document.addEventListener("click", clickHandler, false);
        document.addEventListener("keydown", keydownHandler, false);
        document.addEventListener("turbolinks:click", removeOverlay, false);
      };
      module.exports = drawer2;
    }
  });

  // src/assets/js/dark-mode.js
  var require_dark_mode = __commonJS({
    "src/assets/js/dark-mode.js"(exports, module) {
      var darkMode2 = () => {
        const selectors = {
          toggleButton: "[data-theme-switch]"
        };
        const toggleTheme = () => {
          const themeSettings = document.documentElement.dataset;
          const newTheme = themeSettings.theme === "dark" ? "light" : "dark";
          themeSettings.theme = newTheme;
          localStorage.setItem("theme", newTheme);
        };
        const handleClick = (event) => {
          const shouldToggle = event.target.closest(selectors.toggleButton);
          if (shouldToggle) {
            toggleTheme();
          }
        };
        document.addEventListener("click", handleClick);
      };
      module.exports = darkMode2;
    }
  });

  // src/assets/js/main.js
  var Turbolinks = require_turbolinks();
  var drawer = require_drawer();
  var darkMode = require_dark_mode();
  Turbolinks.start();
  drawer();
  var { enableThemeSwitch } = document.documentElement.dataset;
  if (enableThemeSwitch) {
    darkMode();
  }
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
})();
