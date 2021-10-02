! function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function(require, module, exports) {
        var AboutController = function($scope) {
            $scope.navigationItems = [{
                link: {
                    content: "Sobre nosotros",
                    path: "about.about-us"
                }
            }, {
                link: {
                    content: "Historia",
                    path: "about.history"
                }
            }, {
                link: {
                    content: "RSE",
                    path: "about.csr"
                }
            }]
        };
        module.exports = AboutController
    }, {}],
    2: [function(require, module, exports) {
        var ContactController = function($http, $scope, $timeout, _) {
            function initFormsData() {
                $scope.forms = {
                    contact: {
                        submit: submitContactForm,
                        fields: {
                            fullName: "",
                            email: "",
                            subject: "",
                            message: ""
                        }
                    },
                    rrhh: {
                        submit: submitRRHHForm,
                        fields: {
                            fullName: "",
                            email: "",
                            phone: "",
                            idNumber: "",
                            gender: "",
                            interests: "",
                            video: "",
                            attachment: "",
                            comments: ""
                        }
                    }
                }
            }

            function submitContactForm() {
                var config = {
                    method: "POST",
                    url: "lib/sendContactForm.php",
                    data: $scope.forms.contact.fields
                };
                makeHTTPRequest(config)
            }

            function submitRRHHForm() {
                var fields = $scope.forms.rrhh.fields,
                    fd = new FormData(fields);
                fd.append("fullName", fields.fullName), fd.append("email", fields.email), fd.append("phone", fields.phone), fd.append("idNumber", fields.idNumber), fd.append("gender", fields.gender), fd.append("interests", fields.interests), fd.append("video", fields.video), fd.append("attachment", fields.attachment), fd.append("comments", fields.comments);
                var config = {
                    method: "POST",
                    url: "lib/sendRRHHForm.php",
                    data: fd,
                    transformRequest: angular.identity,
                    headers: {
                        "Content-Type": void 0
                    }
                };
                makeHTTPRequest(config)
            }

            function makeHTTPRequest(config) {
                showMessage("sending"), $http(config).then(handleSuccess, handleError)
            }

            function handleSuccess(response) {
                response.data.status ? (showMessage("ok"), initFormsData()) : showMessage("error")
            }

            function handleError(error) {
                showMessage("error")
            }

            function showMessage(type) {
                var messages = {
                    error: "Hubo un problema al enviar su mensaje...",
                    incomplete: "Por favor complete todos los campos requeridos (*)",
                    ok: "Mensaje enviado correctamente!",
                    senging: "Enviando mensaje..."
                };
                $scope.formError = "error" === type, $scope.formSuccess = "ok" === type, $scope.formMessage = messages[type], "sending" !== type && cleanMessages()
            }

            function cleanMessages() {
                $timeout(function() {
                    $scope.formError = !1, $scope.formSuccess = !1, $scope.formMessage = ""
                }, 3e3)
            }
            $scope.navigationItems = [{
                link: {
                    content: "Consultas",
                    path: "contact.questions"
                }
            }, {
                link: {
                    content: "Trabajá con nosotros",
                    path: "contact.work-with-us"
                }
            }], $scope.formMessage = "", $scope.formSuccess = !1, $scope.formError = !1, $scope.validateForm = function(formType) {
                var error = 0,
                    fields = $scope.forms[formType].fields;
                _.each(fields, function(field, index) {
                    "video" !== index && "attachment" !== index && _.isEmpty(field) && error++, "attachment" === index && "" === field && error++
                }), error ? showMessage("incomplete") : $scope.forms[formType].submit()
            }, $scope.setFile = function(element) {
                $scope.$apply(function($scope) {
                    $scope.forms.rrhh.fields.attachment = element.files[0]
                })
            }, initFormsData()
        };
        module.exports = ContactController
    }, {}],
    3: [function(require, module, exports) {
        var HomeController = function($scope) {
            $scope.heroSliderItems = [{
                button: {
                    path: "#/about",
                    text: "Conozca más sobre nosotros"
                },
                copyText: ["Con 25 años de experiencia, Transdatos se consolida como una empresa líder en el mercado regional de telecomunicaciones, brindando soluciones integrales en Redes, Ingeniería, Construcción y Mantenimiento.", "Implementamos tecnologías innovadoras en un mercado en constante evolución. "],
                imageSource: "assets/img/hero1.jpg",
                subtitle: "Conozca más sobre nosotros",
                title: "Transdatos"
            }, {
                button: {
                    path: "#/solutions",
                    text: "Conozca nuestras soluciones"
                },
                copyText: ["Suministramos soluciones de conectividad de alta calidad y prestación aseguradas para una variada cartera de clientes en todo el litoral argentino."],
                imageSource: "assets/img/hero2.jpg",
                subtitle: "Conozca nuestras soluciones",
                title: "Transdatos"
            }, {
                button: {
                    path: "tower.html",
                    text: "Conózcanos"
                },
                copyText: ["Más de 20 años brindando servicios de Internet en la ciudad.", "Simplemente, te conectamos."],
                imageSource: "assets/img/hero3.jpg",
                subtitle: "Conózcanos",
                title: "@Tower"
            }], $scope.sectionFeatures = [{
                button: {
                    content: "Ver más",
                    path: "#/services/networking"
                },
                description: "Servicios customizados de redes LAN, MAN y WAN en el Litoral Argentino",
                iconClass: "feature--networking",
                title: "Redes"
            }, {
                button: {
                    content: "Ver más",
                    path: "#/services/engineering"
                },
                description: "Servicios de consultoría y diseño de redes de telecomunicaciones",
                iconClass: "feature--engineering",
                title: "Ingeniería"
            }, {
                button: {
                    content: "Ver más",
                    path: "#/services/buildings"
                },
                description: "Servicios de construcción integral de redes",
                iconClass: "feature--buildings",
                title: "Construcciones"
            }, {
                button: {
                    content: "Ver más",
                    path: "#/services/maintenance"
                },
                description: "Servicios de mantenimiento y asistencia técnica 24x365",
                iconClass: "feature--maintenance",
                title: "Mantenimiento"
            }], $scope.subSections = [{
                button: {
                    content: "Ver más",
                    path: "#/solutions/engineering"
                },
                hover: !1,
                title: "Industrias y Empresas de Servicios"
            }, {
                button: {
                    content: "Ver más",
                    path: "#/solutions/pymes"
                },
                hover: !1,
                title: "Pymes y Profesionales"
            }, {
                button: {
                    content: "Ver más",
                    path: "#/solutions/telcos"
                },
                hover: !1,
                title: "Telcos"
            }], $scope.getSubSectionClass = function($index) {
                return {
                    "sub-section": !0,
                    "sub-section_spaced": 1 === $index
                }
            }, $scope.onMouseOverSubSection = function($index) {
                $scope.subSections[$index].hover = !0
            }, $scope.onMouseLeaveSubSection = function($index) {
                $scope.subSections[$index].hover = !1
            }
        };
        module.exports = HomeController
    }, {}],
    4: [function(require, module, exports) {
        var ServicesController = function($scope) {
            $scope.navigationItems = [{
                link: {
                    content: "Redes",
                    path: "services.networking"
                }
            }, {
                link: {
                    content: "Ingeniería",
                    path: "services.engineering"
                }
            }, {
                link: {
                    content: "Mantenimiento",
                    path: "services.maintenance"
                }
            }, {
                link: {
                    content: "Construcciones",
                    path: "services.buildings"
                }
            }]
        };
        module.exports = ServicesController
    }, {}],
    5: [function(require, module, exports) {
        var SolutionsController = function($scope) {
            $scope.navigationItems = [{
                link: {
                    content: "Industrias y empresas de servicios",
                    path: "solutions.engineering"
                }
            }, {
                link: {
                    content: "Pymes y profesionales",
                    path: "solutions.pymes"
                }
            }, {
                link: {
                    content: "Telcos",
                    path: "solutions.telcos"
                }
            }]
        };
        module.exports = SolutionsController
    }, {}],
    6: [function(require, module, exports) {
        var TowerController = function($document, $http, $scope, $timeout, _) {
            function initFormData() {
                $scope.contactForm = {
                    fullName: "",
                    email: "",
                    subject: "",
                    message: ""
                }
            }

            function submitContactForm() {
                var config = {
                    method: "POST",
                    url: "lib/sendTowerContactForm.php",
                    data: $scope.contactForm
                };
                makeHTTPRequest(config)
            }

            function makeHTTPRequest(config) {
                showMessage("sending"), $http(config).then(handleSuccess, handleError)
            }

            function handleSuccess(response) {
                response.data.status ? (showMessage("ok"), initFormData()) : showMessage("error")
            }

            function handleError(error) {
                showMessage("error")
            }

            function showMessage(type) {
                var messages = {
                    error: "Hubo un problema al enviar su mensaje...",
                    incomplete: "Por favor complete todos los campos requeridos (*)",
                    ok: "Mensaje enviado correctamente. En las próximas horas le estaremos respondiendo su consulta",
                    sending: "Enviando mensaje..."
                };
                $scope.formError = "error" === type, $scope.formSuccess = "ok" === type, $scope.formMessage = messages[type], "sending" !== type && cleanMessages()
            }

            function cleanMessages() {
                $timeout(function() {
                    $scope.formError = !1, $scope.formSuccess = !1, $scope.formMessage = ""
                }, 3e3)
            }
            $scope.sectionFeatures = [{
               
                button: {
                    content: "Ver más"
                },
                modalId: "test",
                modalTemplate: "components/tower/modals/adsl-office.html",
                description: "Internet ADSL @Office",
                iconClass: "feature-tower--adsl-office"
            }, {
                button: {
                    content: "Ver más"
                },
                modalId: "test",
                modalTemplate: "components/tower/modals/dedicated.html",
                description: "Accesos Dedicados / Semidedicados",
                iconClass: "feature-tower--dedicated"
            }, {
                button: {
                    content: "Ver más"
                },
                modalId: "test",
                modalTemplate: "components/tower/modals/wireless.html",
                description: "Servicios inalámbricos dedicados",
                iconClass: "feature-tower--wireless"
            }, {
                button: {
                    content: "Ver más"
                },
                modalId: "test",
                modalTemplate: "components/tower/modals/hosting.html",
                description: "Hosting / Housing",
                iconClass: "feature-tower--hosting"
            }], $scope.modalControl = {
                modalOpen: !1,
                templateUrl: ""
            }, $scope.openModal = function(modalTemplate) {
                $document.scrollTopAnimated(100), $scope.modalControl.modalOpen = !0, $scope.modalControl.templateUrl = modalTemplate
            }, $scope.formMessage = "", $scope.formSuccess = !1, $scope.formError = !1, $scope.validateContactForm = function() {
                var error = 0;
                _.each($scope.contactForm, function(field, index) {
                    _.isEmpty(field) && error++
                }), error ? showMessage("incomplete") : submitContactForm()
            }, initFormData()
        };
        module.exports = TowerController
    }, {}],
    7: [function(require, module, exports) {
        var duScrollDefaultEasing = function(x) {
                "use strict";
                return x < .5 ? Math.pow(2 * x, 2) / 2 : 1 - Math.pow(2 * (1 - x), 2) / 2
            },
            duScroll = angular.module("duScroll", ["duScroll.scrollspy", "duScroll.smoothScroll", "duScroll.scrollContainer", "duScroll.spyContext", "duScroll.scrollHelpers"]).value("duScrollDuration", 350).value("duScrollSpyWait", 100).value("duScrollGreedy", !1).value("duScrollOffset", 0).value("duScrollEasing", duScrollDefaultEasing).value("duScrollCancelOnEvents", "scroll mousedown mousewheel touchmove keydown").value("duScrollBottomSpy", !1).value("duScrollActiveClass", "active");
        "undefined" != typeof module && module && module.exports && (module.exports = duScroll), angular.module("duScroll.scrollHelpers", ["duScroll.requestAnimation"]).run(["$window", "$q", "cancelAnimation", "requestAnimation", "duScrollEasing", "duScrollDuration", "duScrollOffset", "duScrollCancelOnEvents", function($window, $q, cancelAnimation, requestAnimation, duScrollEasing, duScrollDuration, duScrollOffset, duScrollCancelOnEvents) {
            "use strict";
            var proto = {},
                isDocument = function(el) {
                    return "undefined" != typeof HTMLDocument && el instanceof HTMLDocument || el.nodeType && el.nodeType === el.DOCUMENT_NODE
                },
                isElement = function(el) {
                    return "undefined" != typeof HTMLElement && el instanceof HTMLElement || el.nodeType && el.nodeType === el.ELEMENT_NODE
                },
                unwrap = function(el) {
                    return isElement(el) || isDocument(el) ? el : el[0]
                };
            proto.duScrollTo = function(left, top, duration, easing) {
                var aliasFn;
                if (angular.isElement(left) ? aliasFn = this.duScrollToElement : angular.isDefined(duration) && (aliasFn = this.duScrollToAnimated), aliasFn) return aliasFn.apply(this, arguments);
                var el = unwrap(this);
                return isDocument(el) ? $window.scrollTo(left, top) : (el.scrollLeft = left, void(el.scrollTop = top))
            };
            var scrollAnimation, deferred;
            proto.duScrollToAnimated = function(left, top, duration, easing) {
                duration && !easing && (easing = duScrollEasing);
                var startLeft = this.duScrollLeft(),
                    startTop = this.duScrollTop(),
                    deltaLeft = Math.round(left - startLeft),
                    deltaTop = Math.round(top - startTop),
                    startTime = null,
                    progress = 0,
                    el = this,
                    cancelScrollAnimation = function($event) {
                        (!$event || progress && $event.which > 0) && (duScrollCancelOnEvents && el.unbind(duScrollCancelOnEvents, cancelScrollAnimation), cancelAnimation(scrollAnimation), deferred.reject(), scrollAnimation = null)
                    };
                if (scrollAnimation && cancelScrollAnimation(), deferred = $q.defer(), 0 === duration || !deltaLeft && !deltaTop) return 0 === duration && el.duScrollTo(left, top), deferred.resolve(), deferred.promise;
                var animationStep = function(timestamp) {
                    null === startTime && (startTime = timestamp), progress = timestamp - startTime;
                    var percent = progress >= duration ? 1 : easing(progress / duration);
                    el.scrollTo(startLeft + Math.ceil(deltaLeft * percent), startTop + Math.ceil(deltaTop * percent)), percent < 1 ? scrollAnimation = requestAnimation(animationStep) : (duScrollCancelOnEvents && el.unbind(duScrollCancelOnEvents, cancelScrollAnimation), scrollAnimation = null, deferred.resolve())
                };
                return el.duScrollTo(startLeft, startTop), duScrollCancelOnEvents && el.bind(duScrollCancelOnEvents, cancelScrollAnimation), scrollAnimation = requestAnimation(animationStep), deferred.promise
            }, proto.duScrollToElement = function(target, offset, duration, easing) {
                var el = unwrap(this);
                angular.isNumber(offset) && !isNaN(offset) || (offset = duScrollOffset);
                var top = this.duScrollTop() + unwrap(target).getBoundingClientRect().top - offset;
                return isElement(el) && (top -= el.getBoundingClientRect().top), this.duScrollTo(0, top, duration, easing)
            }, proto.duScrollLeft = function(value, duration, easing) {
                if (angular.isNumber(value)) return this.duScrollTo(value, this.duScrollTop(), duration, easing);
                var el = unwrap(this);
                return isDocument(el) ? $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft : el.scrollLeft
            }, proto.duScrollTop = function(value, duration, easing) {
                if (angular.isNumber(value)) return this.duScrollTo(this.duScrollLeft(), value, duration, easing);
                var el = unwrap(this);
                return isDocument(el) ? $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop : el.scrollTop
            }, proto.duScrollToElementAnimated = function(target, offset, duration, easing) {
                return this.duScrollToElement(target, offset, duration || duScrollDuration, easing)
            }, proto.duScrollTopAnimated = function(top, duration, easing) {
                return this.duScrollTop(top, duration || duScrollDuration, easing)
            }, proto.duScrollLeftAnimated = function(left, duration, easing) {
                return this.duScrollLeft(left, duration || duScrollDuration, easing)
            }, angular.forEach(proto, function(fn, key) {
                angular.element.prototype[key] = fn;
                var unprefixed = key.replace(/^duScroll/, "scroll");
                angular.isUndefined(angular.element.prototype[unprefixed]) && (angular.element.prototype[unprefixed] = fn)
            })
        }]), angular.module("duScroll.polyfill", []).factory("polyfill", ["$window", function($window) {
            "use strict";
            var vendors = ["webkit", "moz", "o", "ms"];
            return function(fnName, fallback) {
                if ($window[fnName]) return $window[fnName];
                for (var key, suffix = fnName.substr(0, 1).toUpperCase() + fnName.substr(1), i = 0; i < vendors.length; i++)
                    if (key = vendors[i] + suffix, $window[key]) return $window[key];
                return fallback
            }
        }]), angular.module("duScroll.requestAnimation", ["duScroll.polyfill"]).factory("requestAnimation", ["polyfill", "$timeout", function(polyfill, $timeout) {
            "use strict";
            var lastTime = 0,
                fallback = function(callback, element) {
                    var currTime = (new Date).getTime(),
                        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                        id = $timeout(function() {
                            callback(currTime + timeToCall)
                        }, timeToCall);
                    return lastTime = currTime + timeToCall, id
                };
            return polyfill("requestAnimationFrame", fallback)
        }]).factory("cancelAnimation", ["polyfill", "$timeout", function(polyfill, $timeout) {
            "use strict";
            var fallback = function(promise) {
                $timeout.cancel(promise)
            };
            return polyfill("cancelAnimationFrame", fallback)
        }]), angular.module("duScroll.spyAPI", ["duScroll.scrollContainerAPI"]).factory("spyAPI", ["$rootScope", "$timeout", "$window", "$document", "scrollContainerAPI", "duScrollGreedy", "duScrollSpyWait", "duScrollBottomSpy", "duScrollActiveClass", function($rootScope, $timeout, $window, $document, scrollContainerAPI, duScrollGreedy, duScrollSpyWait, duScrollBottomSpy, duScrollActiveClass) {
            "use strict";
            var createScrollHandler = function(context) {
                    var timer = !1,
                        queued = !1,
                        handler = function() {
                            queued = !1;
                            var bottomReached, container = context.container,
                                containerEl = container[0],
                                containerOffset = 0;
                            if ("undefined" != typeof HTMLElement && containerEl instanceof HTMLElement || containerEl.nodeType && containerEl.nodeType === containerEl.ELEMENT_NODE) containerOffset = containerEl.getBoundingClientRect().top, bottomReached = Math.round(containerEl.scrollTop + containerEl.clientHeight) >= containerEl.scrollHeight;
                            else {
                                var documentScrollHeight = $document[0].body.scrollHeight || $document[0].documentElement.scrollHeight;
                                bottomReached = Math.round($window.pageYOffset + $window.innerHeight) >= documentScrollHeight
                            }
                            var i, currentlyActive, toBeActive, spies, spy, pos, compareProperty = duScrollBottomSpy && bottomReached ? "bottom" : "top";
                            for (spies = context.spies, currentlyActive = context.currentlyActive, toBeActive = void 0, i = 0; i < spies.length; i++) spy = spies[i], pos = spy.getTargetPosition(), pos && (duScrollBottomSpy && bottomReached || pos.top + spy.offset - containerOffset < 20 && (duScrollGreedy || pos.top * -1 + containerOffset) < pos.height) && (!toBeActive || toBeActive[compareProperty] < pos[compareProperty]) && (toBeActive = {
                                spy: spy
                            }, toBeActive[compareProperty] = pos[compareProperty]);
                            toBeActive && (toBeActive = toBeActive.spy), currentlyActive === toBeActive || duScrollGreedy && !toBeActive || (currentlyActive && (currentlyActive.$element.removeClass(duScrollActiveClass), $rootScope.$broadcast("duScrollspy:becameInactive", currentlyActive.$element, angular.element(currentlyActive.getTargetElement()))), toBeActive && (toBeActive.$element.addClass(duScrollActiveClass), $rootScope.$broadcast("duScrollspy:becameActive", toBeActive.$element, angular.element(toBeActive.getTargetElement()))), context.currentlyActive = toBeActive)
                        };
                    return duScrollSpyWait ? function() {
                        timer ? queued = !0 : (handler(), timer = $timeout(function() {
                            timer = !1, queued && handler()
                        }, duScrollSpyWait, !1))
                    } : handler
                },
                contexts = {},
                createContext = function($scope) {
                    var id = $scope.$id,
                        context = {
                            spies: []
                        };
                    return context.handler = createScrollHandler(context), contexts[id] = context, $scope.$on("$destroy", function() {
                        destroyContext($scope)
                    }), id
                },
                destroyContext = function($scope) {
                    var id = $scope.$id,
                        context = contexts[id],
                        container = context.container;
                    container && container.off("scroll", context.handler), delete contexts[id]
                },
                defaultContextId = createContext($rootScope),
                getContextForScope = function(scope) {
                    return contexts[scope.$id] ? contexts[scope.$id] : scope.$parent ? getContextForScope(scope.$parent) : contexts[defaultContextId]
                },
                getContextForSpy = function(spy) {
                    var context, contextId, scope = spy.$scope;
                    if (scope) return getContextForScope(scope);
                    for (contextId in contexts)
                        if (context = contexts[contextId], context.spies.indexOf(spy) !== -1) return context
                },
                isElementInDocument = function(element) {
                    for (; element.parentNode;)
                        if (element = element.parentNode, element === document) return !0;
                    return !1
                },
                addSpy = function(spy) {
                    var context = getContextForSpy(spy);
                    context && (context.spies.push(spy), context.container && isElementInDocument(context.container) || (context.container && context.container.off("scroll", context.handler), context.container = scrollContainerAPI.getContainer(spy.$scope), context.container.on("scroll", context.handler).triggerHandler("scroll")))
                },
                removeSpy = function(spy) {
                    var context = getContextForSpy(spy);
                    spy === context.currentlyActive && ($rootScope.$broadcast("duScrollspy:becameInactive", context.currentlyActive.$element), context.currentlyActive = null);
                    var i = context.spies.indexOf(spy);
                    i !== -1 && context.spies.splice(i, 1), spy.$element = null
                };
            return {
                addSpy: addSpy,
                removeSpy: removeSpy,
                createContext: createContext,
                destroyContext: destroyContext,
                getContextForScope: getContextForScope
            }
        }]), angular.module("duScroll.scrollContainerAPI", []).factory("scrollContainerAPI", ["$document", function($document) {
            "use strict";
            var containers = {},
                setContainer = function(scope, element) {
                    var id = scope.$id;
                    return containers[id] = element, id
                },
                getContainerId = function(scope) {
                    return containers[scope.$id] ? scope.$id : scope.$parent ? getContainerId(scope.$parent) : void 0
                },
                getContainer = function(scope) {
                    var id = getContainerId(scope);
                    return id ? containers[id] : $document
                },
                removeContainer = function(scope) {
                    var id = getContainerId(scope);
                    id && delete containers[id]
                };
            return {
                getContainerId: getContainerId,
                getContainer: getContainer,
                setContainer: setContainer,
                removeContainer: removeContainer
            }
        }]), angular.module("duScroll.smoothScroll", ["duScroll.scrollHelpers", "duScroll.scrollContainerAPI"]).directive("duSmoothScroll", ["duScrollDuration", "duScrollOffset", "scrollContainerAPI", function(duScrollDuration, duScrollOffset, scrollContainerAPI) {
            "use strict";
            return {
                link: function($scope, $element, $attr) {
                    $element.on("click", function(e) {
                        if ($attr.href && $attr.href.indexOf("#") !== -1 || "" !== $attr.duSmoothScroll) {
                            var id = $attr.href ? $attr.href.replace(/.*(?=#[^\s]+$)/, "").substring(1) : $attr.duSmoothScroll,
                                target = document.getElementById(id) || document.getElementsByName(id)[0];
                            if (target && target.getBoundingClientRect) {
                                e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
                                var offset = $attr.offset ? parseInt($attr.offset, 10) : duScrollOffset,
                                    duration = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration,
                                    container = scrollContainerAPI.getContainer($scope);
                                container.duScrollToElement(angular.element(target), isNaN(offset) ? 0 : offset, isNaN(duration) ? 0 : duration)
                            }
                        }
                    })
                }
            }
        }]), angular.module("duScroll.spyContext", ["duScroll.spyAPI"]).directive("duSpyContext", ["spyAPI", function(spyAPI) {
            "use strict";
            return {
                restrict: "A",
                scope: !0,
                compile: function(tElement, tAttrs, transclude) {
                    return {
                        pre: function($scope, iElement, iAttrs, controller) {
                            spyAPI.createContext($scope)
                        }
                    }
                }
            }
        }]), angular.module("duScroll.scrollContainer", ["duScroll.scrollContainerAPI"]).directive("duScrollContainer", ["scrollContainerAPI", function(scrollContainerAPI) {
            "use strict";
            return {
                restrict: "A",
                scope: !0,
                compile: function(tElement, tAttrs, transclude) {
                    return {
                        pre: function($scope, iElement, iAttrs, controller) {
                            iAttrs.$observe("duScrollContainer", function(element) {
                                angular.isString(element) && (element = document.getElementById(element)), element = angular.isElement(element) ? angular.element(element) : iElement, scrollContainerAPI.setContainer($scope, element), $scope.$on("$destroy", function() {
                                    scrollContainerAPI.removeContainer($scope)
                                })
                            })
                        }
                    }
                }
            }
        }]), angular.module("duScroll.scrollspy", ["duScroll.spyAPI"]).directive("duScrollspy", ["spyAPI", "duScrollOffset", "$timeout", "$rootScope", function(spyAPI, duScrollOffset, $timeout, $rootScope) {
            "use strict";
            var Spy = function(targetElementOrId, $scope, $element, offset) {
                angular.isElement(targetElementOrId) ? this.target = targetElementOrId : angular.isString(targetElementOrId) && (this.targetId = targetElementOrId), this.$scope = $scope, this.$element = $element, this.offset = offset
            };
            return Spy.prototype.getTargetElement = function() {
                return !this.target && this.targetId && (this.target = document.getElementById(this.targetId) || document.getElementsByName(this.targetId)[0]), this.target
            }, Spy.prototype.getTargetPosition = function() {
                var target = this.getTargetElement();
                if (target) return target.getBoundingClientRect()
            }, Spy.prototype.flushTargetCache = function() {
                this.targetId && (this.target = void 0)
            }, {
                link: function($scope, $element, $attr) {
                    var targetId, href = $attr.ngHref || $attr.href;
                    if (href && href.indexOf("#") !== -1 ? targetId = href.replace(/.*(?=#[^\s]+$)/, "").substring(1) : $attr.duScrollspy ? targetId = $attr.duScrollspy : $attr.duSmoothScroll && (targetId = $attr.duSmoothScroll), targetId) {
                        var timeoutPromise = $timeout(function() {
                            var spy = new Spy(targetId, $scope, $element, (-($attr.offset ? parseInt($attr.offset, 10) : duScrollOffset)));
                            spyAPI.addSpy(spy), $scope.$on("$locationChangeSuccess", spy.flushTargetCache.bind(spy));
                            var deregisterOnStateChange = $rootScope.$on("$stateChangeSuccess", spy.flushTargetCache.bind(spy));
                            $scope.$on("$destroy", function() {
                                spyAPI.removeSpy(spy), deregisterOnStateChange()
                            })
                        }, 0, !1);
                        $scope.$on("$destroy", function() {
                            $timeout.cancel(timeoutPromise)
                        })
                    }
                }
            }
        }])
    }, {}],
    8: [function(require, module, exports) {
        require("angular"), require("./angular-scroll"), module.exports = "duScroll"
    }, {
        "./angular-scroll": 7,
        angular: 11
    }],
    9: [function(require, module, exports) {
        "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
            function(window, angular, undefined) {
                "use strict";

                function inherit(parent, extra) {
                    return extend(new(extend(function() {}, {
                        prototype: parent
                    })), extra)
                }

                function merge(dst) {
                    return forEach(arguments, function(obj) {
                        obj !== dst && forEach(obj, function(value, key) {
                            dst.hasOwnProperty(key) || (dst[key] = value)
                        })
                    }), dst
                }

                function ancestors(first, second) {
                    var path = [];
                    for (var n in first.path) {
                        if (first.path[n] !== second.path[n]) break;
                        path.push(first.path[n])
                    }
                    return path
                }

                function objectKeys(object) {
                    if (Object.keys) return Object.keys(object);
                    var result = [];
                    return forEach(object, function(val, key) {
                        result.push(key)
                    }), result
                }

                function indexOf(array, value) {
                    if (Array.prototype.indexOf) return array.indexOf(value, Number(arguments[2]) || 0);
                    var len = array.length >>> 0,
                        from = Number(arguments[2]) || 0;
                    for (from = from < 0 ? Math.ceil(from) : Math.floor(from), from < 0 && (from += len); from < len; from++)
                        if (from in array && array[from] === value) return from;
                    return -1
                }

                function inheritParams(currentParams, newParams, $current, $to) {
                    var parentParams, parents = ancestors($current, $to),
                        inherited = {},
                        inheritList = [];
                    for (var i in parents)
                        if (parents[i] && parents[i].params && (parentParams = objectKeys(parents[i].params), parentParams.length))
                            for (var j in parentParams) indexOf(inheritList, parentParams[j]) >= 0 || (inheritList.push(parentParams[j]), inherited[parentParams[j]] = currentParams[parentParams[j]]);
                    return extend({}, inherited, newParams)
                }

                function equalForKeys(a, b, keys) {
                    if (!keys) {
                        keys = [];
                        for (var n in a) keys.push(n)
                    }
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        if (a[k] != b[k]) return !1
                    }
                    return !0
                }

                function filterByKeys(keys, values) {
                    var filtered = {};
                    return forEach(keys, function(name) {
                        filtered[name] = values[name]
                    }), filtered
                }

                function pick(obj) {
                    var copy = {},
                        keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
                    return forEach(keys, function(key) {
                        key in obj && (copy[key] = obj[key])
                    }), copy
                }

                function omit(obj) {
                    var copy = {},
                        keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
                    for (var key in obj) indexOf(keys, key) == -1 && (copy[key] = obj[key]);
                    return copy
                }

                function filter(collection, callback) {
                    var array = isArray(collection),
                        result = array ? [] : {};
                    return forEach(collection, function(val, i) {
                        callback(val, i) && (result[array ? result.length : i] = val)
                    }), result
                }

                function map(collection, callback) {
                    var result = isArray(collection) ? [] : {};
                    return forEach(collection, function(val, i) {
                        result[i] = callback(val, i)
                    }), result
                }

                function silenceUncaughtInPromise(promise) {
                    return promise.then(undefined, function() {}) && promise
                }

                function $Resolve($q, $injector) {
                    var VISIT_IN_PROGRESS = 1,
                        VISIT_DONE = 2,
                        NOTHING = {},
                        NO_DEPENDENCIES = [],
                        NO_LOCALS = NOTHING,
                        NO_PARENT = extend($q.when(NOTHING), {
                            $$promises: NOTHING,
                            $$values: NOTHING
                        });
                    this.study = function(invocables) {
                        function visit(value, key) {
                            if (visited[key] !== VISIT_DONE) {
                                if (cycle.push(key), visited[key] === VISIT_IN_PROGRESS) throw cycle.splice(0, indexOf(cycle, key)), new Error("Cyclic dependency: " + cycle.join(" -> "));
                                if (visited[key] = VISIT_IN_PROGRESS, isString(value)) plan.push(key, [function() {
                                    return $injector.get(value)
                                }], NO_DEPENDENCIES);
                                else {
                                    var params = $injector.annotate(value);
                                    forEach(params, function(param) {
                                        param !== key && invocables.hasOwnProperty(param) && visit(invocables[param], param)
                                    }), plan.push(key, value, params)
                                }
                                cycle.pop(), visited[key] = VISIT_DONE
                            }
                        }

                        function isResolve(value) {
                            return isObject(value) && value.then && value.$$promises
                        }
                        if (!isObject(invocables)) throw new Error("'invocables' must be an object");
                        var invocableKeys = objectKeys(invocables || {}),
                            plan = [],
                            cycle = [],
                            visited = {};
                        return forEach(invocables, visit), invocables = cycle = visited = null,
                            function(locals, parent, self) {
                                function done() {
                                    --wait || (merged || merge(values, parent.$$values), result.$$values = values, result.$$promises = result.$$promises || !0, delete result.$$inheritedValues, resolution.resolve(values))
                                }

                                function fail(reason) {
                                    result.$$failure = reason, resolution.reject(reason)
                                }

                                function invoke(key, invocable, params) {
                                    function onfailure(reason) {
                                        invocation.reject(reason), fail(reason)
                                    }

                                    function proceed() {
                                        if (!isDefined(result.$$failure)) try {
                                            invocation.resolve($injector.invoke(invocable, self, values)), invocation.promise.then(function(result) {
                                                values[key] = result, done()
                                            }, onfailure)
                                        } catch (e) {
                                            onfailure(e)
                                        }
                                    }
                                    var invocation = $q.defer(),
                                        waitParams = 0;
                                    forEach(params, function(dep) {
                                        promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep) && (waitParams++, promises[dep].then(function(result) {
                                            values[dep] = result, --waitParams || proceed()
                                        }, onfailure))
                                    }), waitParams || proceed(), promises[key] = invocation.promise
                                }
                                if (isResolve(locals) && self === undefined && (self = parent, parent = locals, locals = null), locals) {
                                    if (!isObject(locals)) throw new Error("'locals' must be an object")
                                } else locals = NO_LOCALS;
                                if (parent) {
                                    if (!isResolve(parent)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                                } else parent = NO_PARENT;
                                var resolution = $q.defer(),
                                    result = resolution.promise,
                                    promises = result.$$promises = {},
                                    values = extend({}, locals),
                                    wait = 1 + plan.length / 3,
                                    merged = !1;
                                if (isDefined(parent.$$failure)) return fail(parent.$$failure), result;
                                parent.$$inheritedValues && merge(values, omit(parent.$$inheritedValues, invocableKeys)), extend(promises, parent.$$promises), parent.$$values ? (merged = merge(values, omit(parent.$$values, invocableKeys)), result.$$inheritedValues = omit(parent.$$values, invocableKeys), done()) : (parent.$$inheritedValues && (result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys)), parent.then(done, fail));
                                for (var i = 0, ii = plan.length; i < ii; i += 3) locals.hasOwnProperty(plan[i]) ? done() : invoke(plan[i], plan[i + 1], plan[i + 2]);
                                return result
                            }
                    }, this.resolve = function(invocables, locals, parent, self) {
                        return this.study(invocables)(locals, parent, self)
                    }
                }

                function $TemplateFactory($http, $templateCache, $injector) {
                    this.fromConfig = function(config, params, locals) {
                        return isDefined(config.template) ? this.fromString(config.template, params) : isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) : isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) : null
                    }, this.fromString = function(template, params) {
                        return isFunction(template) ? template(params) : template
                    }, this.fromUrl = function(url, params) {
                        return isFunction(url) && (url = url(params)), null == url ? null : $http.get(url, {
                            cache: $templateCache,
                            headers: {
                                Accept: "text/html"
                            }
                        }).then(function(response) {
                            return response.data
                        })
                    }, this.fromProvider = function(provider, params, locals) {
                        return $injector.invoke(provider, null, locals || {
                            params: params
                        })
                    }
                }

                function UrlMatcher(pattern, config, parentMatcher) {
                    function addParameter(id, type, config, location) {
                        if (paramNames.push(id), parentParams[id]) return parentParams[id];
                        if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
                        if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
                        return params[id] = new $$UMFP.Param(id, type, config, location), params[id]
                    }

                    function quoteRegExp(string, pattern, squash, optional) {
                        var surroundPattern = ["", ""],
                            result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
                        if (!pattern) return result;
                        switch (squash) {
                            case !1:
                                surroundPattern = ["(", ")" + (optional ? "?" : "")];
                                break;
                            case !0:
                                result = result.replace(/\/$/, ""), surroundPattern = ["(?:/(", ")|/)?"];
                                break;
                            default:
                                surroundPattern = ["(" + squash + "|", ")?"]
                        }
                        return result + surroundPattern[0] + pattern + surroundPattern[1]
                    }

                    function matchDetails(m, isSearch) {
                        var id, regexp, segment, type, cfg;
                        return id = m[2] || m[3], cfg = config.params[id], segment = pattern.substring(last, m.index), regexp = isSearch ? m[4] : m[4] || ("*" == m[1] ? ".*" : null), regexp && (type = $$UMFP.type(regexp) || inherit($$UMFP.type("string"), {
                            pattern: new RegExp(regexp, config.caseInsensitive ? "i" : undefined)
                        })), {
                            id: id,
                            regexp: regexp,
                            segment: segment,
                            type: type,
                            cfg: cfg
                        }
                    }
                    config = extend({
                        params: {}
                    }, isObject(config) ? config : {});
                    var m, placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                        searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                        compiled = "^",
                        last = 0,
                        segments = this.segments = [],
                        parentParams = parentMatcher ? parentMatcher.params : {},
                        params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet,
                        paramNames = [];
                    this.source = pattern;
                    for (var p, param, segment;
                        (m = placeholder.exec(pattern)) && (p = matchDetails(m, !1), !(p.segment.indexOf("?") >= 0));) param = addParameter(p.id, p.type, p.cfg, "path"), compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional), segments.push(p.segment), last = placeholder.lastIndex;
                    segment = pattern.substring(last);
                    var i = segment.indexOf("?");
                    if (i >= 0) {
                        var search = this.sourceSearch = segment.substring(i);
                        if (segment = segment.substring(0, i), this.sourcePath = pattern.substring(0, last + i), search.length > 0)
                            for (last = 0; m = searchPlaceholder.exec(search);) p = matchDetails(m, !0), param = addParameter(p.id, p.type, p.cfg, "search"), last = placeholder.lastIndex
                    } else this.sourcePath = pattern, this.sourceSearch = "";
                    compiled += quoteRegExp(segment) + (config.strict === !1 ? "/?" : "") + "$", segments.push(segment), this.regexp = new RegExp(compiled, config.caseInsensitive ? "i" : undefined), this.prefix = segments[0], this.$$paramNames = paramNames
                }

                function Type(config) {
                    extend(this, config)
                }

                function $UrlMatcherFactory() {
                    function valToString(val) {
                        return null != val ? val.toString().replace(/(~|\/)/g, function(m) {
                            return {
                                "~": "~~",
                                "/": "~2F"
                            }[m]
                        }) : val
                    }

                    function valFromString(val) {
                        return null != val ? val.toString().replace(/(~~|~2F)/g, function(m) {
                            return {
                                "~~": "~",
                                "~2F": "/"
                            }[m]
                        }) : val
                    }

                    function getDefaultConfig() {
                        return {
                            strict: isStrictMode,
                            caseInsensitive: isCaseInsensitive
                        }
                    }

                    function isInjectable(value) {
                        return isFunction(value) || isArray(value) && isFunction(value[value.length - 1])
                    }

                    function flushTypeQueue() {
                        for (; typeQueue.length;) {
                            var type = typeQueue.shift();
                            if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                            angular.extend($types[type.name], injector.invoke(type.def))
                        }
                    }

                    function ParamSet(params) {
                        extend(this, params || {})
                    }
                    $$UMFP = this;
                    var injector, isCaseInsensitive = !1,
                        isStrictMode = !0,
                        defaultSquashPolicy = !1,
                        $types = {},
                        enqueue = !0,
                        typeQueue = [],
                        defaultTypes = {
                            string: {
                                encode: valToString,
                                decode: valFromString,
                                is: function(val) {
                                    return null == val || !isDefined(val) || "string" == typeof val
                                },
                                pattern: /[^\/]*/
                            },
                            int: {
                                encode: valToString,
                                decode: function(val) {
                                    return parseInt(val, 10)
                                },
                                is: function(val) {
                                    return isDefined(val) && this.decode(val.toString()) === val
                                },
                                pattern: /\d+/
                            },
                            bool: {
                                encode: function(val) {
                                    return val ? 1 : 0
                                },
                                decode: function(val) {
                                    return 0 !== parseInt(val, 10)
                                },
                                is: function(val) {
                                    return val === !0 || val === !1
                                },
                                pattern: /0|1/
                            },
                            date: {
                                encode: function(val) {
                                    return this.is(val) ? [val.getFullYear(), ("0" + (val.getMonth() + 1)).slice(-2), ("0" + val.getDate()).slice(-2)].join("-") : undefined
                                },
                                decode: function(val) {
                                    if (this.is(val)) return val;
                                    var match = this.capture.exec(val);
                                    return match ? new Date(match[1], match[2] - 1, match[3]) : undefined
                                },
                                is: function(val) {
                                    return val instanceof Date && !isNaN(val.valueOf())
                                },
                                equals: function(a, b) {
                                    return this.is(a) && this.is(b) && a.toISOString() === b.toISOString()
                                },
                                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
                            },
                            json: {
                                encode: angular.toJson,
                                decode: angular.fromJson,
                                is: angular.isObject,
                                equals: angular.equals,
                                pattern: /[^\/]*/
                            },
                            any: {
                                encode: angular.identity,
                                decode: angular.identity,
                                equals: angular.equals,
                                pattern: /.*/
                            }
                        };
                    $UrlMatcherFactory.$$getDefaultValue = function(config) {
                        if (!isInjectable(config.value)) return config.value;
                        if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
                        return injector.invoke(config.value)
                    }, this.caseInsensitive = function(value) {
                        return isDefined(value) && (isCaseInsensitive = value), isCaseInsensitive
                    }, this.strictMode = function(value) {
                        return isDefined(value) && (isStrictMode = value), isStrictMode
                    }, this.defaultSquashPolicy = function(value) {
                        if (!isDefined(value)) return defaultSquashPolicy;
                        if (value !== !0 && value !== !1 && !isString(value)) throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
                        return defaultSquashPolicy = value, value
                    }, this.compile = function(pattern, config) {
                        return new UrlMatcher(pattern, extend(getDefaultConfig(), config))
                    }, this.isMatcher = function(o) {
                        if (!isObject(o)) return !1;
                        var result = !0;
                        return forEach(UrlMatcher.prototype, function(val, name) {
                            isFunction(val) && (result = result && isDefined(o[name]) && isFunction(o[name]))
                        }), result
                    }, this.type = function(name, definition, definitionFn) {
                        if (!isDefined(definition)) return $types[name];
                        if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");
                        return $types[name] = new Type(extend({
                            name: name
                        }, definition)), definitionFn && (typeQueue.push({
                            name: name,
                            def: definitionFn
                        }), enqueue || flushTypeQueue()), this
                    }, forEach(defaultTypes, function(type, name) {
                        $types[name] = new Type(extend({
                            name: name
                        }, type))
                    }), $types = inherit($types, {}), this.$get = ["$injector", function($injector) {
                        return injector = $injector, enqueue = !1, flushTypeQueue(), forEach(defaultTypes, function(type, name) {
                            $types[name] || ($types[name] = new Type(type))
                        }), this
                    }], this.Param = function(id, type, config, location) {
                        function unwrapShorthand(config) {
                            var keys = isObject(config) ? objectKeys(config) : [],
                                isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 && indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
                            return isShorthand && (config = {
                                value: config
                            }), config.$$fn = isInjectable(config.value) ? config.value : function() {
                                return config.value
                            }, config
                        }

                        function getType(config, urlType, location) {
                            if (config.type && urlType) throw new Error("Param '" + id + "' has two type configurations.");
                            return urlType ? urlType : config.type ? angular.isString(config.type) ? $types[config.type] : config.type instanceof Type ? config.type : new Type(config.type) : "config" === location ? $types.any : $types.string
                        }

                        function getArrayMode() {
                            var arrayDefaults = {
                                    array: "search" === location && "auto"
                                },
                                arrayParamNomenclature = id.match(/\[\]$/) ? {
                                    array: !0
                                } : {};
                            return extend(arrayDefaults, arrayParamNomenclature, config).array
                        }

                        function getSquashPolicy(config, isOptional) {
                            var squash = config.squash;
                            if (!isOptional || squash === !1) return !1;
                            if (!isDefined(squash) || null == squash) return defaultSquashPolicy;
                            if (squash === !0 || isString(squash)) return squash;
                            throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string")
                        }

                        function getReplace(config, arrayMode, isOptional, squash) {
                            var replace, configuredKeys, defaultPolicy = [{
                                from: "",
                                to: isOptional || arrayMode ? undefined : ""
                            }, {
                                from: null,
                                to: isOptional || arrayMode ? undefined : ""
                            }];
                            return replace = isArray(config.replace) ? config.replace : [], isString(squash) && replace.push({
                                from: squash,
                                to: undefined
                            }), configuredKeys = map(replace, function(item) {
                                return item.from
                            }), filter(defaultPolicy, function(item) {
                                return indexOf(configuredKeys, item.from) === -1
                            }).concat(replace)
                        }

                        function $$getDefaultValue() {
                            if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
                            var defaultValue = injector.invoke(config.$$fn);
                            if (null !== defaultValue && defaultValue !== undefined && !self.type.is(defaultValue)) throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
                            return defaultValue
                        }

                        function $value(value) {
                            function hasReplaceVal(val) {
                                return function(obj) {
                                    return obj.from === val
                                }
                            }

                            function $replace(value) {
                                var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) {
                                    return obj.to
                                });
                                return replacement.length ? replacement[0] : value
                            }
                            return value = $replace(value), isDefined(value) ? self.type.$normalize(value) : $$getDefaultValue()
                        }

                        function toString() {
                            return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"
                        }
                        var self = this;
                        config = unwrapShorthand(config), type = getType(config, type, location);
                        var arrayMode = getArrayMode();
                        type = arrayMode ? type.$asArray(arrayMode, "search" === location) : type, "string" !== type.name || arrayMode || "path" !== location || config.value !== undefined || (config.value = "");
                        var isOptional = config.value !== undefined,
                            squash = getSquashPolicy(config, isOptional),
                            replace = getReplace(config, arrayMode, isOptional, squash);
                        extend(this, {
                            id: id,
                            type: type,
                            location: location,
                            array: arrayMode,
                            squash: squash,
                            replace: replace,
                            isOptional: isOptional,
                            value: $value,
                            dynamic: undefined,
                            config: config,
                            toString: toString
                        })
                    }, ParamSet.prototype = {
                        $$new: function() {
                            return inherit(this, extend(new ParamSet, {
                                $$parent: this
                            }))
                        },
                        $$keys: function() {
                            for (var keys = [], chain = [], parent = this, ignore = objectKeys(ParamSet.prototype); parent;) chain.push(parent), parent = parent.$$parent;
                            return chain.reverse(), forEach(chain, function(paramset) {
                                forEach(objectKeys(paramset), function(key) {
                                    indexOf(keys, key) === -1 && indexOf(ignore, key) === -1 && keys.push(key)
                                })
                            }), keys
                        },
                        $$values: function(paramValues) {
                            var values = {},
                                self = this;
                            return forEach(self.$$keys(), function(key) {
                                values[key] = self[key].value(paramValues && paramValues[key])
                            }), values
                        },
                        $$equals: function(paramValues1, paramValues2) {
                            var equal = !0,
                                self = this;
                            return forEach(self.$$keys(), function(key) {
                                var left = paramValues1 && paramValues1[key],
                                    right = paramValues2 && paramValues2[key];
                                self[key].type.equals(left, right) || (equal = !1)
                            }), equal
                        },
                        $$validates: function(paramValues) {
                            var i, param, rawVal, normalized, encoded, keys = this.$$keys();
                            for (i = 0; i < keys.length && (param = this[keys[i]], rawVal = paramValues[keys[i]], rawVal !== undefined && null !== rawVal || !param.isOptional); i++) {
                                if (normalized = param.type.$normalize(rawVal), !param.type.is(normalized)) return !1;
                                if (encoded = param.type.encode(normalized), angular.isString(encoded) && !param.type.pattern.exec(encoded)) return !1
                            }
                            return !0
                        },
                        $$parent: undefined
                    }, this.ParamSet = ParamSet
                }

                function $UrlRouterProvider($locationProvider, $urlMatcherFactory) {
                    function regExpPrefix(re) {
                        var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
                        return null != prefix ? prefix[1].replace(/\\(.)/g, "$1") : ""
                    }

                    function interpolate(pattern, match) {
                        return pattern.replace(/\$(\$|\d{1,2})/, function(m, what) {
                            return match["$" === what ? 0 : Number(what)]
                        })
                    }

                    function handleIfMatch($injector, handler, match) {
                        if (!match) return !1;
                        var result = $injector.invoke(handler, handler, {
                            $match: match
                        });
                        return !isDefined(result) || result
                    }

                    function $get($location, $rootScope, $injector, $browser, $sniffer) {
                        function appendBasePath(url, isHtml5, absolute) {
                            return "/" === baseHref ? url : isHtml5 ? baseHref.slice(0, -1) + url : absolute ? baseHref.slice(1) + url : url
                        }

                        function update(evt) {
                            function check(rule) {
                                var handled = rule($injector, $location);
                                return !!handled && (isString(handled) && $location.replace().url(handled), !0)
                            }
                            if (!evt || !evt.defaultPrevented) {
                                lastPushedUrl && $location.url() === lastPushedUrl;
                                lastPushedUrl = undefined;
                                var i, n = rules.length;
                                for (i = 0; i < n; i++)
                                    if (check(rules[i])) return;
                                otherwise && check(otherwise)
                            }
                        }

                        function listen() {
                            return listener = listener || $rootScope.$on("$locationChangeSuccess", update)
                        }
                        var lastPushedUrl, baseHref = $browser.baseHref(),
                            location = $location.url();
                        return interceptDeferred || listen(), {
                            sync: function() {
                                update()
                            },
                            listen: function() {
                                return listen()
                            },
                            update: function(read) {
                                return read ? void(location = $location.url()) : void($location.url() !== location && ($location.url(location), $location.replace()))
                            },
                            push: function(urlMatcher, params, options) {
                                var url = urlMatcher.format(params || {});
                                null !== url && params && params["#"] && (url += "#" + params["#"]), $location.url(url), lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined, options && options.replace && $location.replace()
                            },
                            href: function(urlMatcher, params, options) {
                                if (!urlMatcher.validates(params)) return null;
                                var isHtml5 = $locationProvider.html5Mode();
                                angular.isObject(isHtml5) && (isHtml5 = isHtml5.enabled), isHtml5 = isHtml5 && $sniffer.history;
                                var url = urlMatcher.format(params);
                                if (options = options || {}, isHtml5 || null === url || (url = "#" + $locationProvider.hashPrefix() + url), null !== url && params && params["#"] && (url += "#" + params["#"]), url = appendBasePath(url, isHtml5, options.absolute), !options.absolute || !url) return url;
                                var slash = !isHtml5 && url ? "/" : "",
                                    port = $location.port();
                                return port = 80 === port || 443 === port ? "" : ":" + port, [$location.protocol(), "://", $location.host(), port, slash, url].join("")
                            }
                        }
                    }
                    var listener, rules = [],
                        otherwise = null,
                        interceptDeferred = !1;
                    this.rule = function(rule) {
                        if (!isFunction(rule)) throw new Error("'rule' must be a function");
                        return rules.push(rule), this
                    }, this.otherwise = function(rule) {
                        if (isString(rule)) {
                            var redirect = rule;
                            rule = function() {
                                return redirect
                            }
                        } else if (!isFunction(rule)) throw new Error("'rule' must be a function");
                        return otherwise = rule, this
                    }, this.when = function(what, handler) {
                        var redirect, handlerIsString = isString(handler);
                        if (isString(what) && (what = $urlMatcherFactory.compile(what)), !handlerIsString && !isFunction(handler) && !isArray(handler)) throw new Error("invalid 'handler' in when()");
                        var strategies = {
                                matcher: function(what, handler) {
                                    return handlerIsString && (redirect = $urlMatcherFactory.compile(handler), handler = ["$match", function($match) {
                                        return redirect.format($match)
                                    }]), extend(function($injector, $location) {
                                        return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()))
                                    }, {
                                        prefix: isString(what.prefix) ? what.prefix : ""
                                    })
                                },
                                regex: function(what, handler) {
                                    if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");
                                    return handlerIsString && (redirect = handler, handler = ["$match", function($match) {
                                        return interpolate(redirect, $match)
                                    }]), extend(function($injector, $location) {
                                        return handleIfMatch($injector, handler, what.exec($location.path()))
                                    }, {
                                        prefix: regExpPrefix(what)
                                    })
                                }
                            },
                            check = {
                                matcher: $urlMatcherFactory.isMatcher(what),
                                regex: what instanceof RegExp
                            };
                        for (var n in check)
                            if (check[n]) return this.rule(strategies[n](what, handler));
                        throw new Error("invalid 'what' in when()")
                    }, this.deferIntercept = function(defer) {
                        defer === undefined && (defer = !0), interceptDeferred = defer
                    }, this.$get = $get, $get.$inject = ["$location", "$rootScope", "$injector", "$browser", "$sniffer"]
                }

                function $StateProvider($urlRouterProvider, $urlMatcherFactory) {
                    function isRelative(stateName) {
                        return 0 === stateName.indexOf(".") || 0 === stateName.indexOf("^")
                    }

                    function findState(stateOrName, base) {
                        if (!stateOrName) return undefined;
                        var isStr = isString(stateOrName),
                            name = isStr ? stateOrName : stateOrName.name,
                            path = isRelative(name);
                        if (path) {
                            if (!base) throw new Error("No reference point given for path '" + name + "'");
                            base = findState(base);
                            for (var rel = name.split("."), i = 0, pathLength = rel.length, current = base; i < pathLength; i++)
                                if ("" !== rel[i] || 0 !== i) {
                                    if ("^" !== rel[i]) break;
                                    if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
                                    current = current.parent
                                } else current = base;
                            rel = rel.slice(i).join("."), name = current.name + (current.name && rel ? "." : "") + rel
                        }
                        var state = states[name];
                        return !state || !isStr && (isStr || state !== stateOrName && state.self !== stateOrName) ? undefined : state
                    }

                    function queueState(parentName, state) {
                        queue[parentName] || (queue[parentName] = []), queue[parentName].push(state)
                    }

                    function flushQueuedChildren(parentName) {
                        for (var queued = queue[parentName] || []; queued.length;) registerState(queued.shift())
                    }

                    function registerState(state) {
                        state = inherit(state, {
                            self: state,
                            resolve: state.resolve || {},
                            toString: function() {
                                return this.name
                            }
                        });
                        var name = state.name;
                        if (!isString(name) || name.indexOf("@") >= 0) throw new Error("State must have a valid name");
                        if (states.hasOwnProperty(name)) throw new Error("State '" + name + "' is already defined");
                        var parentName = name.indexOf(".") !== -1 ? name.substring(0, name.lastIndexOf(".")) : isString(state.parent) ? state.parent : isObject(state.parent) && isString(state.parent.name) ? state.parent.name : "";
                        if (parentName && !states[parentName]) return queueState(parentName, state.self);
                        for (var key in stateBuilder) isFunction(stateBuilder[key]) && (state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]));
                        return states[name] = state, !state[abstractKey] && state.url && $urlRouterProvider.when(state.url, ["$match", "$stateParams", function($match, $stateParams) {
                            $state.$current.navigable == state && equalForKeys($match, $stateParams) || $state.transitionTo(state, $match, {
                                inherit: !0,
                                location: !1
                            })
                        }]), flushQueuedChildren(name), state
                    }

                    function isGlob(text) {
                        return text.indexOf("*") > -1
                    }

                    function doesStateMatchGlob(glob) {
                        for (var globSegments = glob.split("."), segments = $state.$current.name.split("."), i = 0, l = globSegments.length; i < l; i++) "*" === globSegments[i] && (segments[i] = "*");
                        return "**" === globSegments[0] && (segments = segments.slice(indexOf(segments, globSegments[1])), segments.unshift("**")), "**" === globSegments[globSegments.length - 1] && (segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE), segments.push("**")), globSegments.length == segments.length && segments.join("") === globSegments.join("")
                    }

                    function decorator(name, func) {
                        return isString(name) && !isDefined(func) ? stateBuilder[name] : isFunction(func) && isString(name) ? (stateBuilder[name] && !stateBuilder.$delegates[name] && (stateBuilder.$delegates[name] = stateBuilder[name]), stateBuilder[name] = func, this) : this
                    }

                    function state(name, definition) {
                        return isObject(name) ? definition = name : definition.name = name, registerState(definition), this
                    }

                    function $get($rootScope, $q, $view, $injector, $resolve, $stateParams, $urlRouter, $location, $urlMatcherFactory) {
                        function handleRedirect(redirect, state, params, options) {
                            var evt = $rootScope.$broadcast("$stateNotFound", redirect, state, params);
                            if (evt.defaultPrevented) return $urlRouter.update(), TransitionAborted;
                            if (!evt.retry) return null;
                            if (options.$retry) return $urlRouter.update(), TransitionFailed;
                            var retryTransition = $state.transition = $q.when(evt.retry);
                            return retryTransition.then(function() {
                                return retryTransition !== $state.transition ? ($rootScope.$broadcast("$stateChangeCancel", redirect.to, redirect.toParams, state, params), TransitionSuperseded) : (redirect.options.$retry = !0, $state.transitionTo(redirect.to, redirect.toParams, redirect.options))
                            }, function() {
                                return TransitionAborted
                            }), $urlRouter.update(), retryTransition
                        }

                        function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
                            function resolveViews() {
                                var viewsPromises = [];
                                return forEach(state.views, function(view, name) {
                                    var injectables = view.resolve && view.resolve !== state.resolve ? view.resolve : {};
                                    injectables.$template = [function() {
                                        return $view.load(name, {
                                            view: view,
                                            locals: dst.globals,
                                            params: $stateParams,
                                            notify: options.notify
                                        }) || ""
                                    }], viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function(result) {
                                        if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
                                            var injectLocals = angular.extend({}, injectables, dst.globals);
                                            result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals)
                                        } else result.$$controller = view.controller;
                                        result.$$state = state, result.$$controllerAs = view.controllerAs, result.$$resolveAs = view.resolveAs, dst[name] = result
                                    }))
                                }), $q.all(viewsPromises).then(function() {
                                    return dst.globals
                                })
                            }
                            var $stateParams = paramsAreFiltered ? params : filterByKeys(state.params.$$keys(), params),
                                locals = {
                                    $stateParams: $stateParams
                                };
                            dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
                            var promises = [dst.resolve.then(function(globals) {
                                dst.globals = globals
                            })];
                            return inherited && promises.push(inherited), $q.all(promises).then(resolveViews).then(function(values) {
                                return dst
                            })
                        }
                        var TransitionSupersededError = new Error("transition superseded"),
                            TransitionSuperseded = silenceUncaughtInPromise($q.reject(TransitionSupersededError)),
                            TransitionPrevented = silenceUncaughtInPromise($q.reject(new Error("transition prevented"))),
                            TransitionAborted = silenceUncaughtInPromise($q.reject(new Error("transition aborted"))),
                            TransitionFailed = silenceUncaughtInPromise($q.reject(new Error("transition failed")));
                        return root.locals = {
                            resolve: null,
                            globals: {
                                $stateParams: {}
                            }
                        }, $state = {
                            params: {},
                            current: root.self,
                            $current: root,
                            transition: null
                        }, $state.reload = function(state) {
                            return $state.transitionTo($state.current, $stateParams, {
                                reload: state || !0,
                                inherit: !1,
                                notify: !0
                            })
                        }, $state.go = function(to, params, options) {
                            return $state.transitionTo(to, params, extend({
                                inherit: !0,
                                relative: $state.$current
                            }, options))
                        }, $state.transitionTo = function(to, toParams, options) {
                            toParams = toParams || {}, options = extend({
                                location: !0,
                                inherit: !1,
                                relative: null,
                                notify: !0,
                                reload: !1,
                                $retry: !1
                            }, options || {});
                            var evt, from = $state.$current,
                                fromParams = $state.params,
                                fromPath = from.path,
                                toState = findState(to, options.relative),
                                hash = toParams["#"];
                            if (!isDefined(toState)) {
                                var redirect = {
                                        to: to,
                                        toParams: toParams,
                                        options: options
                                    },
                                    redirectResult = handleRedirect(redirect, from.self, fromParams, options);
                                if (redirectResult) return redirectResult;
                                if (to = redirect.to, toParams = redirect.toParams, options = redirect.options, toState = findState(to, options.relative), !isDefined(toState)) {
                                    if (!options.relative) throw new Error("No such state '" + to + "'");
                                    throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'")
                                }
                            }
                            if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
                            if (options.inherit && (toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState)), !toState.params.$$validates(toParams)) return TransitionFailed;
                            toParams = toState.params.$$values(toParams), to = toState;
                            var toPath = to.path,
                                keep = 0,
                                state = toPath[keep],
                                locals = root.locals,
                                toLocals = [];
                            if (options.reload) {
                                if (isString(options.reload) || isObject(options.reload)) {
                                    if (isObject(options.reload) && !options.reload.name) throw new Error("Invalid reload state object");
                                    var reloadState = options.reload === !0 ? fromPath[0] : findState(options.reload);
                                    if (options.reload && !reloadState) throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
                                    for (; state && state === fromPath[keep] && state !== reloadState;) locals = toLocals[keep] = state.locals, keep++, state = toPath[keep]
                                }
                            } else
                                for (; state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams);) locals = toLocals[keep] = state.locals, keep++, state = toPath[keep];
                            if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) return hash && (toParams["#"] = hash), $state.params = toParams, copy($state.params, $stateParams), copy(filterByKeys(to.params.$$keys(), $stateParams), to.locals.globals.$stateParams), options.location && to.navigable && to.navigable.url && ($urlRouter.push(to.navigable.url, toParams, {
                                $$avoidResync: !0,
                                replace: "replace" === options.location
                            }), $urlRouter.update(!0)), $state.transition = null, $q.when($state.current);
                            if (toParams = filterByKeys(to.params.$$keys(), toParams || {}), hash && (toParams["#"] = hash), options.notify && $rootScope.$broadcast("$stateChangeStart", to.self, toParams, from.self, fromParams, options).defaultPrevented) return $rootScope.$broadcast("$stateChangeCancel", to.self, toParams, from.self, fromParams), null == $state.transition && $urlRouter.update(), TransitionPrevented;
                            for (var resolved = $q.when(locals), l = keep; l < toPath.length; l++, state = toPath[l]) locals = toLocals[l] = inherit(locals), resolved = resolveState(state, toParams, state === to, resolved, locals, options);
                            var transition = $state.transition = resolved.then(function() {
                                var l, entering, exiting;
                                if ($state.transition !== transition) return $rootScope.$broadcast("$stateChangeCancel", to.self, toParams, from.self, fromParams), TransitionSuperseded;
                                for (l = fromPath.length - 1; l >= keep; l--) exiting = fromPath[l], exiting.self.onExit && $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals), exiting.locals = null;
                                for (l = keep; l < toPath.length; l++) entering = toPath[l], entering.locals = toLocals[l], entering.self.onEnter && $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
                                return $state.transition !== transition ? ($rootScope.$broadcast("$stateChangeCancel", to.self, toParams, from.self, fromParams), TransitionSuperseded) : ($state.$current = to, $state.current = to.self, $state.params = toParams, copy($state.params, $stateParams), $state.transition = null, options.location && to.navigable && $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
                                    $$avoidResync: !0,
                                    replace: "replace" === options.location
                                }), options.notify && $rootScope.$broadcast("$stateChangeSuccess", to.self, toParams, from.self, fromParams), $urlRouter.update(!0), $state.current)
                            }).then(null, function(error) {
                                return error === TransitionSupersededError ? TransitionSuperseded : $state.transition !== transition ? ($rootScope.$broadcast("$stateChangeCancel", to.self, toParams, from.self, fromParams), TransitionSuperseded) : ($state.transition = null, evt = $rootScope.$broadcast("$stateChangeError", to.self, toParams, from.self, fromParams, error), evt.defaultPrevented || $urlRouter.update(), $q.reject(error))
                            });
                            return transition
                        }, $state.is = function(stateOrName, params, options) {
                            options = extend({
                                relative: $state.$current
                            }, options || {});
                            var state = findState(stateOrName, options.relative);
                            return isDefined(state) ? $state.$current === state && (!params || equalForKeys(state.params.$$values(params), $stateParams)) : undefined
                        }, $state.includes = function(stateOrName, params, options) {
                            if (options = extend({
                                    relative: $state.$current
                                }, options || {}), isString(stateOrName) && isGlob(stateOrName)) {
                                if (!doesStateMatchGlob(stateOrName)) return !1;
                                stateOrName = $state.$current.name
                            }
                            var state = findState(stateOrName, options.relative);
                            if (!isDefined(state)) return undefined;
                            if (!isDefined($state.$current.includes[state.name])) return !1;
                            if (!params) return !0;
                            for (var keys = objectKeys(params), i = 0; i < keys.length; i++) {
                                var key = keys[i],
                                    paramDef = state.params[key];
                                if (paramDef && !paramDef.type.equals($stateParams[key], params[key])) return !1
                            }
                            return !0
                        }, $state.href = function(stateOrName, params, options) {
                            options = extend({
                                lossy: !0,
                                inherit: !0,
                                absolute: !1,
                                relative: $state.$current
                            }, options || {});
                            var state = findState(stateOrName, options.relative);
                            if (!isDefined(state)) return null;
                            options.inherit && (params = inheritParams($stateParams, params || {}, $state.$current, state));
                            var nav = state && options.lossy ? state.navigable : state;
                            return nav && nav.url !== undefined && null !== nav.url ? $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat("#"), params || {}), {
                                absolute: options.absolute
                            }) : null
                        }, $state.get = function(stateOrName, context) {
                            if (0 === arguments.length) return map(objectKeys(states), function(name) {
                                return states[name].self
                            });
                            var state = findState(stateOrName, context || $state.$current);
                            return state && state.self ? state.self : null
                        }, $state
                    }

                    function shouldSkipReload(to, toParams, from, fromParams, locals, options) {
                        function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {
                            function notSearchParam(key) {
                                return "search" != fromAndToState.params[key].location
                            }
                            var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam),
                                nonQueryParams = pick.apply({}, [fromAndToState.params].concat(nonQueryParamKeys)),
                                nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);
                            return nonQueryParamSet.$$equals(fromParams, toParams)
                        }
                        if (!options.reload && to === from && (locals === from.locals || to.self.reloadOnSearch === !1 && nonSearchParamsEqual(from, fromParams, toParams))) return !0
                    }
                    var root, $state, states = {},
                        queue = {},
                        abstractKey = "abstract",
                        stateBuilder = {
                            parent: function(state) {
                                if (isDefined(state.parent) && state.parent) return findState(state.parent);
                                var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
                                return compositeName ? findState(compositeName[1]) : root
                            },
                            data: function(state) {
                                return state.parent && state.parent.data && (state.data = state.self.data = inherit(state.parent.data, state.data)), state.data
                            },
                            url: function(state) {
                                var url = state.url,
                                    config = {
                                        params: state.params || {}
                                    };
                                if (isString(url)) return "^" == url.charAt(0) ? $urlMatcherFactory.compile(url.substring(1), config) : (state.parent.navigable || root).url.concat(url, config);
                                if (!url || $urlMatcherFactory.isMatcher(url)) return url;
                                throw new Error("Invalid url '" + url + "' in state '" + state + "'")
                            },
                            navigable: function(state) {
                                return state.url ? state : state.parent ? state.parent.navigable : null
                            },
                            ownParams: function(state) {
                                var params = state.url && state.url.params || new $$UMFP.ParamSet;
                                return forEach(state.params || {}, function(config, id) {
                                    params[id] || (params[id] = new $$UMFP.Param(id, null, config, "config"))
                                }), params
                            },
                            params: function(state) {
                                var ownParams = pick(state.ownParams, state.ownParams.$$keys());
                                return state.parent && state.parent.params ? extend(state.parent.params.$$new(), ownParams) : new $$UMFP.ParamSet
                            },
                            views: function(state) {
                                var views = {};
                                return forEach(isDefined(state.views) ? state.views : {
                                    "": state
                                }, function(view, name) {
                                    name.indexOf("@") < 0 && (name += "@" + state.parent.name), view.resolveAs = view.resolveAs || state.resolveAs || "$resolve", views[name] = view
                                }), views
                            },
                            path: function(state) {
                                return state.parent ? state.parent.path.concat(state) : []
                            },
                            includes: function(state) {
                                var includes = state.parent ? extend({}, state.parent.includes) : {};
                                return includes[state.name] = !0, includes
                            },
                            $delegates: {}
                        };
                    root = registerState({
                        name: "",
                        url: "^",
                        views: null,
                        abstract: !0
                    }), root.navigable = null, this.decorator = decorator, this.state = state, this.$get = $get, $get.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
                }

                function $ViewProvider() {
                    function $get($rootScope, $templateFactory) {
                        return {
                            load: function(name, options) {
                                var result, defaults = {
                                    template: null,
                                    controller: null,
                                    view: null,
                                    locals: null,
                                    notify: !0,
                                    async: !0,
                                    params: {}
                                };
                                return options = extend(defaults, options), options.view && (result = $templateFactory.fromConfig(options.view, options.params, options.locals)), result
                            }
                        }
                    }
                    this.$get = $get, $get.$inject = ["$rootScope", "$templateFactory"]
                }

                function $ViewScrollProvider() {
                    var useAnchorScroll = !1;
                    this.useAnchorScroll = function() {
                        useAnchorScroll = !0
                    }, this.$get = ["$anchorScroll", "$timeout", function($anchorScroll, $timeout) {
                        return useAnchorScroll ? $anchorScroll : function($element) {
                            return $timeout(function() {
                                $element[0].scrollIntoView()
                            }, 0, !1)
                        }
                    }]
                }

                function $ViewDirective($state, $injector, $uiViewScroll, $interpolate, $q) {
                    function getService() {
                        return $injector.has ? function(service) {
                            return $injector.has(service) ? $injector.get(service) : null
                        } : function(service) {
                            try {
                                return $injector.get(service)
                            } catch (e) {
                                return null
                            }
                        }
                    }

                    function getRenderer(attrs, scope) {
                        var statics = function() {
                            return {
                                enter: function(element, target, cb) {
                                    target.after(element), cb()
                                },
                                leave: function(element, cb) {
                                    element.remove(), cb()
                                }
                            }
                        };
                        if ($animate) return {
                            enter: function(element, target, cb) {
                                angular.version.minor > 2 ? $animate.enter(element, null, target).then(cb) : $animate.enter(element, null, target, cb)
                            },
                            leave: function(element, cb) {
                                angular.version.minor > 2 ? $animate.leave(element).then(cb) : $animate.leave(element, cb)
                            }
                        };
                        if ($animator) {
                            var animate = $animator && $animator(scope, attrs);
                            return {
                                enter: function(element, target, cb) {
                                    animate.enter(element, null, target), cb()
                                },
                                leave: function(element, cb) {
                                    animate.leave(element), cb()
                                }
                            }
                        }
                        return statics()
                    }
                    var service = getService(),
                        $animator = service("$animator"),
                        $animate = service("$animate"),
                        directive = {
                            restrict: "ECA",
                            terminal: !0,
                            priority: 400,
                            transclude: "element",
                            compile: function(tElement, tAttrs, $transclude) {
                                return function(scope, $element, attrs) {
                                    function cleanupLastView() {
                                        if (previousEl && (previousEl.remove(), previousEl = null), currentScope && (currentScope.$destroy(), currentScope = null), currentEl) {
                                            var $uiViewData = currentEl.data("$uiViewAnim");
                                            renderer.leave(currentEl, function() {
                                                $uiViewData.$$animLeave.resolve(), previousEl = null
                                            }), previousEl = currentEl, currentEl = null
                                        }
                                    }

                                    function updateView(firstTime) {
                                        var newScope, name = getUiViewName(scope, attrs, $element, $interpolate),
                                            previousLocals = name && $state.$current && $state.$current.locals[name];
                                        if (firstTime || previousLocals !== latestLocals) {
                                            newScope = scope.$new(), latestLocals = $state.$current.locals[name], newScope.$emit("$viewContentLoading", name);
                                            var clone = $transclude(newScope, function(clone) {
                                                var animEnter = $q.defer(),
                                                    animLeave = $q.defer(),
                                                    viewAnimData = {
                                                        $animEnter: animEnter.promise,
                                                        $animLeave: animLeave.promise,
                                                        $$animLeave: animLeave
                                                    };
                                                clone.data("$uiViewAnim", viewAnimData), renderer.enter(clone, $element, function() {
                                                    animEnter.resolve(), currentScope && currentScope.$emit("$viewContentAnimationEnded"), (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) && $uiViewScroll(clone)
                                                }), cleanupLastView()
                                            });
                                            currentEl = clone, currentScope = newScope, currentScope.$emit("$viewContentLoaded", name), currentScope.$eval(onloadExp)
                                        }
                                    }
                                    var previousEl, currentEl, currentScope, latestLocals, onloadExp = attrs.onload || "",
                                        autoScrollExp = attrs.autoscroll,
                                        renderer = getRenderer(attrs, scope);
                                    $element.inheritedData("$uiView");
                                    scope.$on("$stateChangeSuccess", function() {
                                        updateView(!1)
                                    }), updateView(!0)
                                }
                            }
                        };
                    return directive
                }

                function $ViewDirectiveFill($compile, $controller, $state, $interpolate) {
                    return {
                        restrict: "ECA",
                        priority: -400,
                        compile: function(tElement) {
                            var initial = tElement.html();
                            return function(scope, $element, attrs) {
                                var current = $state.$current,
                                    name = getUiViewName(scope, attrs, $element, $interpolate),
                                    locals = current && current.locals[name];
                                if (locals) {
                                    $element.data("$uiView", {
                                        name: name,
                                        state: locals.$$state
                                    }), $element.html(locals.$template ? locals.$template : initial);
                                    var resolveData = angular.extend({}, locals);
                                    scope[locals.$$resolveAs] = resolveData;
                                    var link = $compile($element.contents());
                                    if (locals.$$controller) {
                                        locals.$scope = scope, locals.$element = $element;
                                        var controller = $controller(locals.$$controller, locals);
                                        locals.$$controllerAs && (scope[locals.$$controllerAs] = controller, scope[locals.$$controllerAs][locals.$$resolveAs] = resolveData), isFunction(controller.$onInit) && controller.$onInit(), $element.data("$ngControllerController", controller), $element.children().data("$ngControllerController", controller)
                                    }
                                    link(scope)
                                }
                            }
                        }
                    }
                }

                function getUiViewName(scope, attrs, element, $interpolate) {
                    var name = $interpolate(attrs.uiView || attrs.name || "")(scope),
                        uiViewCreatedBy = element.inheritedData("$uiView");
                    return name.indexOf("@") >= 0 ? name : name + "@" + (uiViewCreatedBy ? uiViewCreatedBy.state.name : "")
                }

                function parseStateRef(ref, current) {
                    var parsed, preparsed = ref.match(/^\s*({[^}]*})\s*$/);
                    if (preparsed && (ref = current + "(" + preparsed[1] + ")"), parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !parsed || 4 !== parsed.length) throw new Error("Invalid state ref '" + ref + "'");
                    return {
                        state: parsed[1],
                        paramExpr: parsed[3] || null
                    }
                }

                function stateContext(el) {
                    var stateData = el.parent().inheritedData("$uiView");
                    if (stateData && stateData.state && stateData.state.name) return stateData.state
                }

                function getTypeInfo(el) {
                    var isSvg = "[object SVGAnimatedString]" === Object.prototype.toString.call(el.prop("href")),
                        isForm = "FORM" === el[0].nodeName;
                    return {
                        attr: isForm ? "action" : isSvg ? "xlink:href" : "href",
                        isAnchor: "A" === el.prop("tagName").toUpperCase(),
                        clickable: !isForm
                    }
                }

                function clickHook(el, $state, $timeout, type, current) {
                    return function(e) {
                        var button = e.which || e.button,
                            target = current();
                        if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr("target"))) {
                            var transition = $timeout(function() {
                                $state.go(target.state, target.params, target.options)
                            });
                            e.preventDefault();
                            var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1 : 0;
                            e.preventDefault = function() {
                                ignorePreventDefaultCount-- <= 0 && $timeout.cancel(transition)
                            }
                        }
                    }
                }

                function defaultOpts(el, $state) {
                    return {
                        relative: stateContext(el) || $state.$current,
                        inherit: !0
                    }
                }

                function $StateRefDirective($state, $timeout) {
                    return {
                        restrict: "A",
                        require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                        link: function(scope, element, attrs, uiSrefActive) {
                            var hookFn, ref = parseStateRef(attrs.uiSref, $state.current.name),
                                def = {
                                    state: ref.state,
                                    href: null,
                                    params: null
                                },
                                type = getTypeInfo(element),
                                active = uiSrefActive[1] || uiSrefActive[0],
                                unlinkInfoFn = null;
                            def.options = extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});
                            var update = function(val) {
                                val && (def.params = angular.copy(val)), def.href = $state.href(ref.state, def.params, def.options), unlinkInfoFn && unlinkInfoFn(), active && (unlinkInfoFn = active.$$addStateInfo(ref.state, def.params)), null !== def.href && attrs.$set(type.attr, def.href)
                            };
                            ref.paramExpr && (scope.$watch(ref.paramExpr, function(val) {
                                val !== def.params && update(val)
                            }, !0), def.params = angular.copy(scope.$eval(ref.paramExpr))), update(), type.clickable && (hookFn = clickHook(element, $state, $timeout, type, function() {
                                return def
                            }), element[element.on ? "on" : "bind"]("click", hookFn), scope.$on("$destroy", function() {
                                element[element.off ? "off" : "unbind"]("click", hookFn)
                            }))
                        }
                    }
                }

                function $StateRefDynamicDirective($state, $timeout) {
                    return {
                        restrict: "A",
                        require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                        link: function(scope, element, attrs, uiSrefActive) {
                            function runStateRefLink(group) {
                                def.state = group[0], def.params = group[1], def.options = group[2], def.href = $state.href(def.state, def.params, def.options), unlinkInfoFn && unlinkInfoFn(), active && (unlinkInfoFn = active.$$addStateInfo(def.state, def.params)), def.href && attrs.$set(type.attr, def.href)
                            }
                            var hookFn, type = getTypeInfo(element),
                                active = uiSrefActive[1] || uiSrefActive[0],
                                group = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null],
                                watch = "[" + group.map(function(val) {
                                    return val || "null"
                                }).join(", ") + "]",
                                def = {
                                    state: null,
                                    params: null,
                                    options: null,
                                    href: null
                                },
                                unlinkInfoFn = null;
                            scope.$watch(watch, runStateRefLink, !0), runStateRefLink(scope.$eval(watch)), type.clickable && (hookFn = clickHook(element, $state, $timeout, type, function() {
                                return def
                            }), element[element.on ? "on" : "bind"]("click", hookFn), scope.$on("$destroy", function() {
                                element[element.off ? "off" : "unbind"]("click", hookFn)
                            }))
                        }
                    }
                }

                function $StateRefActiveDirective($state, $stateParams, $interpolate) {
                    return {
                        restrict: "A",
                        controller: ["$scope", "$element", "$attrs", "$timeout", function($scope, $element, $attrs, $timeout) {
                            function addState(stateName, stateParams, activeClass) {
                                var state = $state.get(stateName, stateContext($element)),
                                    stateHash = createStateHash(stateName, stateParams),
                                    stateInfo = {
                                        state: state || {
                                            name: stateName
                                        },
                                        params: stateParams,
                                        hash: stateHash
                                    };
                                return states.push(stateInfo), activeClasses[stateHash] = activeClass,
                                    function() {
                                        var idx = states.indexOf(stateInfo);
                                        idx !== -1 && states.splice(idx, 1)
                                    }
                            }

                            function createStateHash(state, params) {
                                if (!isString(state)) throw new Error("state should be a string");
                                return isObject(params) ? state + toJson(params) : (params = $scope.$eval(params), isObject(params) ? state + toJson(params) : state)
                            }

                            function update() {
                                for (var i = 0; i < states.length; i++) anyMatch(states[i].state, states[i].params) ? addClass($element, activeClasses[states[i].hash]) : removeClass($element, activeClasses[states[i].hash]), exactMatch(states[i].state, states[i].params) ? addClass($element, activeEqClass) : removeClass($element, activeEqClass)
                            }

                            function addClass(el, className) {
                                $timeout(function() {
                                    el.addClass(className)
                                })
                            }

                            function removeClass(el, className) {
                                el.removeClass(className)
                            }

                            function anyMatch(state, params) {
                                return $state.includes(state.name, params)
                            }

                            function exactMatch(state, params) {
                                return $state.is(state.name, params)
                            }
                            var activeEqClass, uiSrefActive, states = [],
                                activeClasses = {};
                            activeEqClass = $interpolate($attrs.uiSrefActiveEq || "", !1)($scope);
                            try {
                                uiSrefActive = $scope.$eval($attrs.uiSrefActive)
                            } catch (e) {}
                            uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || "", !1)($scope), isObject(uiSrefActive) && forEach(uiSrefActive, function(stateOrName, activeClass) {
                                if (isString(stateOrName)) {
                                    var ref = parseStateRef(stateOrName, $state.current.name);
                                    addState(ref.state, $scope.$eval(ref.paramExpr), activeClass)
                                }
                            }), this.$$addStateInfo = function(newState, newParams) {
                                if (!(isObject(uiSrefActive) && states.length > 0)) {
                                    var deregister = addState(newState, newParams, uiSrefActive);
                                    return update(), deregister
                                }
                            }, $scope.$on("$stateChangeSuccess", update), update()
                        }]
                    }
                }

                function $IsStateFilter($state) {
                    var isFilter = function(state, params) {
                        return $state.is(state, params)
                    };
                    return isFilter.$stateful = !0, isFilter
                }

                function $IncludedByStateFilter($state) {
                    var includesFilter = function(state, params, options) {
                        return $state.includes(state, params, options)
                    };
                    return includesFilter.$stateful = !0, includesFilter
                }
                var isDefined = angular.isDefined,
                    isFunction = angular.isFunction,
                    isString = angular.isString,
                    isObject = angular.isObject,
                    isArray = angular.isArray,
                    forEach = angular.forEach,
                    extend = angular.extend,
                    copy = angular.copy,
                    toJson = angular.toJson;
                angular.module("ui.router.util", ["ng"]), angular.module("ui.router.router", ["ui.router.util"]), angular.module("ui.router.state", ["ui.router.router", "ui.router.util"]), angular.module("ui.router", ["ui.router.state"]), angular.module("ui.router.compat", ["ui.router"]), $Resolve.$inject = ["$q", "$injector"], angular.module("ui.router.util").service("$resolve", $Resolve), $TemplateFactory.$inject = ["$http", "$templateCache", "$injector"], angular.module("ui.router.util").service("$templateFactory", $TemplateFactory);
                var $$UMFP;
                UrlMatcher.prototype.concat = function(pattern, config) {
                    var defaultConfig = {
                        caseInsensitive: $$UMFP.caseInsensitive(),
                        strict: $$UMFP.strictMode(),
                        squash: $$UMFP.defaultSquashPolicy()
                    };
                    return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this)
                }, UrlMatcher.prototype.toString = function() {
                    return this.source
                }, UrlMatcher.prototype.exec = function(path, searchParams) {
                    function decodePathArray(string) {
                        function reverseString(str) {
                            return str.split("").reverse().join("")
                        }

                        function unquoteDashes(str) {
                            return str.replace(/\\-/g, "-")
                        }
                        var split = reverseString(string).split(/-(?!\\)/),
                            allReversed = map(split, reverseString);
                        return map(allReversed, unquoteDashes).reverse()
                    }
                    var m = this.regexp.exec(path);
                    if (!m) return null;
                    searchParams = searchParams || {};
                    var i, j, paramName, paramNames = this.parameters(),
                        nTotal = paramNames.length,
                        nPath = this.segments.length - 1,
                        values = {};
                    if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
                    var param, paramVal;
                    for (i = 0; i < nPath; i++) {
                        for (paramName = paramNames[i], param = this.params[paramName], paramVal = m[i + 1], j = 0; j < param.replace.length; j++) param.replace[j].from === paramVal && (paramVal = param.replace[j].to);
                        paramVal && param.array === !0 && (paramVal = decodePathArray(paramVal)), isDefined(paramVal) && (paramVal = param.type.decode(paramVal)), values[paramName] = param.value(paramVal)
                    }
                    for (; i < nTotal; i++) {
                        for (paramName = paramNames[i], values[paramName] = this.params[paramName].value(searchParams[paramName]), param = this.params[paramName], paramVal = searchParams[paramName], j = 0; j < param.replace.length; j++) param.replace[j].from === paramVal && (paramVal = param.replace[j].to);
                        isDefined(paramVal) && (paramVal = param.type.decode(paramVal)), values[paramName] = param.value(paramVal)
                    }
                    return values
                }, UrlMatcher.prototype.parameters = function(param) {
                    return isDefined(param) ? this.params[param] || null : this.$$paramNames
                }, UrlMatcher.prototype.validates = function(params) {
                    return this.params.$$validates(params)
                }, UrlMatcher.prototype.format = function(values) {
                    function encodeDashes(str) {
                        return encodeURIComponent(str).replace(/-/g, function(c) {
                            return "%5C%" + c.charCodeAt(0).toString(16).toUpperCase()
                        })
                    }
                    values = values || {};
                    var segments = this.segments,
                        params = this.parameters(),
                        paramset = this.params;
                    if (!this.validates(values)) return null;
                    var i, search = !1,
                        nPath = segments.length - 1,
                        nTotal = params.length,
                        result = segments[0];
                    for (i = 0; i < nTotal; i++) {
                        var isPathParam = i < nPath,
                            name = params[i],
                            param = paramset[name],
                            value = param.value(values[name]),
                            isDefaultValue = param.isOptional && param.type.equals(param.value(), value),
                            squash = !!isDefaultValue && param.squash,
                            encoded = param.type.encode(value);
                        if (isPathParam) {
                            var nextSegment = segments[i + 1],
                                isFinalPathParam = i + 1 === nPath;
                            if (squash === !1) null != encoded && (result += isArray(encoded) ? map(encoded, encodeDashes).join("-") : encodeURIComponent(encoded)), result += nextSegment;
                            else if (squash === !0) {
                                var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                                result += nextSegment.match(capture)[1]
                            } else isString(squash) && (result += squash + nextSegment);
                            isFinalPathParam && param.squash === !0 && "/" === result.slice(-1) && (result = result.slice(0, -1))
                        } else {
                            if (null == encoded || isDefaultValue && squash !== !1) continue;
                            if (isArray(encoded) || (encoded = [encoded]), 0 === encoded.length) continue;
                            encoded = map(encoded, encodeURIComponent).join("&" + name + "="), result += (search ? "&" : "?") + (name + "=" + encoded), search = !0
                        }
                    }
                    return result
                }, Type.prototype.is = function(val, key) {
                    return !0
                }, Type.prototype.encode = function(val, key) {
                    return val
                }, Type.prototype.decode = function(val, key) {
                    return val
                }, Type.prototype.equals = function(a, b) {
                    return a == b
                }, Type.prototype.$subPattern = function() {
                    var sub = this.pattern.toString();
                    return sub.substr(1, sub.length - 2)
                }, Type.prototype.pattern = /.*/, Type.prototype.toString = function() {
                    return "{Type:" + this.name + "}"
                }, Type.prototype.$normalize = function(val) {
                    return this.is(val) ? val : this.decode(val)
                }, Type.prototype.$asArray = function(mode, isSearch) {
                    function ArrayType(type, mode) {
                        function bindTo(type, callbackName) {
                            return function() {
                                return type[callbackName].apply(type, arguments)
                            }
                        }

                        function arrayWrap(val) {
                            return isArray(val) ? val : isDefined(val) ? [val] : []
                        }

                        function arrayUnwrap(val) {
                            switch (val.length) {
                                case 0:
                                    return undefined;
                                case 1:
                                    return "auto" === mode ? val[0] : val;
                                default:
                                    return val
                            }
                        }

                        function falsey(val) {
                            return !val
                        }

                        function arrayHandler(callback, allTruthyMode) {
                            return function(val) {
                                if (isArray(val) && 0 === val.length) return val;
                                val = arrayWrap(val);
                                var result = map(val, callback);
                                return allTruthyMode === !0 ? 0 === filter(result, falsey).length : arrayUnwrap(result)
                            }
                        }

                        function arrayEqualsHandler(callback) {
                            return function(val1, val2) {
                                var left = arrayWrap(val1),
                                    right = arrayWrap(val2);
                                if (left.length !== right.length) return !1;
                                for (var i = 0; i < left.length; i++)
                                    if (!callback(left[i], right[i])) return !1;
                                return !0
                            }
                        }
                        this.encode = arrayHandler(bindTo(type, "encode")), this.decode = arrayHandler(bindTo(type, "decode")), this.is = arrayHandler(bindTo(type, "is"), !0), this.equals = arrayEqualsHandler(bindTo(type, "equals")), this.pattern = type.pattern, this.$normalize = arrayHandler(bindTo(type, "$normalize")), this.name = type.name, this.$arrayMode = mode
                    }
                    if (!mode) return this;
                    if ("auto" === mode && !isSearch) throw new Error("'auto' array mode is for query parameters only");
                    return new ArrayType(this, mode)
                }, angular.module("ui.router.util").provider("$urlMatcherFactory", $UrlMatcherFactory), angular.module("ui.router.util").run(["$urlMatcherFactory", function($urlMatcherFactory) {}]), $UrlRouterProvider.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], angular.module("ui.router.router").provider("$urlRouter", $UrlRouterProvider), $StateProvider.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], angular.module("ui.router.state").factory("$stateParams", function() {
                    return {}
                }).constant("$state.runtime", {
                    autoinject: !0
                }).provider("$state", $StateProvider).run(["$injector", function($injector) {
                    $injector.get("$state.runtime").autoinject && $injector.get("$state")
                }]), $ViewProvider.$inject = [], angular.module("ui.router.state").provider("$view", $ViewProvider), angular.module("ui.router.state").provider("$uiViewScroll", $ViewScrollProvider), $ViewDirective.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate", "$q"], $ViewDirectiveFill.$inject = ["$compile", "$controller", "$state", "$interpolate"], angular.module("ui.router.state").directive("uiView", $ViewDirective), angular.module("ui.router.state").directive("uiView", $ViewDirectiveFill), $StateRefDirective.$inject = ["$state", "$timeout"], $StateRefDynamicDirective.$inject = ["$state", "$timeout"], $StateRefActiveDirective.$inject = ["$state", "$stateParams", "$interpolate"], angular.module("ui.router.state").directive("uiSref", $StateRefDirective).directive("uiSrefActive", $StateRefActiveDirective).directive("uiSrefActiveEq", $StateRefActiveDirective).directive("uiState", $StateRefDynamicDirective), $IsStateFilter.$inject = ["$state"], $IncludedByStateFilter.$inject = ["$state"], angular.module("ui.router.state").filter("isState", $IsStateFilter).filter("includedByState", $IncludedByStateFilter)
            }(window, window.angular)
    }, {}],
    10: [function(require, module, exports) {
        ! function(window) {
            "use strict";

            function minErr(module, ErrorConstructor) {
                return ErrorConstructor = ErrorConstructor || Error,
                    function() {
                        var paramPrefix, i, SKIP_INDEXES = 2,
                            templateArgs = arguments,
                            code = templateArgs[0],
                            message = "[" + (module ? module + ":" : "") + code + "] ",
                            template = templateArgs[1];
                        for (message += template.replace(/\{\d+\}/g, function(match) {
                                var index = +match.slice(1, -1),
                                    shiftedIndex = index + SKIP_INDEXES;
                                return shiftedIndex < templateArgs.length ? toDebugString(templateArgs[shiftedIndex]) : match
                            }), message += "\nhttp://errors.angularjs.org/1.5.9/" + (module ? module + "/" : "") + code, i = SKIP_INDEXES, paramPrefix = "?"; i < templateArgs.length; i++, paramPrefix = "&") message += paramPrefix + "p" + (i - SKIP_INDEXES) + "=" + encodeURIComponent(toDebugString(templateArgs[i]));
                        return new ErrorConstructor(message)
                    }
            }

            function isArrayLike(obj) {
                if (null == obj || isWindow(obj)) return !1;
                if (isArray(obj) || isString(obj) || jqLite && obj instanceof jqLite) return !0;
                var length = "length" in Object(obj) && obj.length;
                return isNumber(length) && (length >= 0 && (length - 1 in obj || obj instanceof Array) || "function" == typeof obj.item)
            }

            function forEach(obj, iterator, context) {
                var key, length;
                if (obj)
                    if (isFunction(obj))
                        for (key in obj) "prototype" === key || "length" === key || "name" === key || obj.hasOwnProperty && !obj.hasOwnProperty(key) || iterator.call(context, obj[key], key, obj);
                    else if (isArray(obj) || isArrayLike(obj)) {
                    var isPrimitive = "object" != typeof obj;
                    for (key = 0, length = obj.length; key < length; key++)(isPrimitive || key in obj) && iterator.call(context, obj[key], key, obj)
                } else if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context, obj);
                else if (isBlankObject(obj))
                    for (key in obj) iterator.call(context, obj[key], key, obj);
                else if ("function" == typeof obj.hasOwnProperty)
                    for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj);
                else
                    for (key in obj) hasOwnProperty.call(obj, key) && iterator.call(context, obj[key], key, obj);
                return obj
            }

            function forEachSorted(obj, iterator, context) {
                for (var keys = Object.keys(obj).sort(), i = 0; i < keys.length; i++) iterator.call(context, obj[keys[i]], keys[i]);
                return keys
            }

            function reverseParams(iteratorFn) {
                return function(value, key) {
                    iteratorFn(key, value)
                }
            }

            function nextUid() {
                return ++uid
            }

            function setHashKey(obj, h) {
                h ? obj.$$hashKey = h : delete obj.$$hashKey
            }

            function baseExtend(dst, objs, deep) {
                for (var h = dst.$$hashKey, i = 0, ii = objs.length; i < ii; ++i) {
                    var obj = objs[i];
                    if (isObject(obj) || isFunction(obj))
                        for (var keys = Object.keys(obj), j = 0, jj = keys.length; j < jj; j++) {
                            var key = keys[j],
                                src = obj[key];
                            deep && isObject(src) ? isDate(src) ? dst[key] = new Date(src.valueOf()) : isRegExp(src) ? dst[key] = new RegExp(src) : src.nodeName ? dst[key] = src.cloneNode(!0) : isElement(src) ? dst[key] = src.clone() : (isObject(dst[key]) || (dst[key] = isArray(src) ? [] : {}), baseExtend(dst[key], [src], !0)) : dst[key] = src
                        }
                }
                return setHashKey(dst, h), dst
            }

            function extend(dst) {
                return baseExtend(dst, slice.call(arguments, 1), !1)
            }

            function merge(dst) {
                return baseExtend(dst, slice.call(arguments, 1), !0)
            }

            function toInt(str) {
                return parseInt(str, 10)
            }

            function inherit(parent, extra) {
                return extend(Object.create(parent), extra)
            }

            function noop() {}

            function identity($) {
                return $
            }

            function valueFn(value) {
                return function() {
                    return value
                }
            }

            function hasCustomToString(obj) {
                return isFunction(obj.toString) && obj.toString !== toString
            }

            function isUndefined(value) {
                return "undefined" == typeof value
            }

            function isDefined(value) {
                return "undefined" != typeof value
            }

            function isObject(value) {
                return null !== value && "object" == typeof value
            }

            function isBlankObject(value) {
                return null !== value && "object" == typeof value && !getPrototypeOf(value)
            }

            function isString(value) {
                return "string" == typeof value
            }

            function isNumber(value) {
                return "number" == typeof value
            }

            function isDate(value) {
                return "[object Date]" === toString.call(value)
            }

            function isFunction(value) {
                return "function" == typeof value
            }

            function isRegExp(value) {
                return "[object RegExp]" === toString.call(value)
            }

            function isWindow(obj) {
                return obj && obj.window === obj
            }

            function isScope(obj) {
                return obj && obj.$evalAsync && obj.$watch
            }

            function isFile(obj) {
                return "[object File]" === toString.call(obj)
            }

            function isFormData(obj) {
                return "[object FormData]" === toString.call(obj)
            }

            function isBlob(obj) {
                return "[object Blob]" === toString.call(obj)
            }

            function isBoolean(value) {
                return "boolean" == typeof value
            }

            function isPromiseLike(obj) {
                return obj && isFunction(obj.then)
            }

            function isTypedArray(value) {
                return value && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value))
            }

            function isArrayBuffer(obj) {
                return "[object ArrayBuffer]" === toString.call(obj)
            }

            function isElement(node) {
                return !(!node || !(node.nodeName || node.prop && node.attr && node.find))
            }

            function makeMap(str) {
                var i, obj = {},
                    items = str.split(",");
                for (i = 0; i < items.length; i++) obj[items[i]] = !0;
                return obj
            }

            function nodeName_(element) {
                return lowercase(element.nodeName || element[0] && element[0].nodeName)
            }

            function arrayRemove(array, value) {
                var index = array.indexOf(value);
                return index >= 0 && array.splice(index, 1), index
            }

            function copy(source, destination) {
                function copyRecurse(source, destination) {
                    var key, h = destination.$$hashKey;
                    if (isArray(source))
                        for (var i = 0, ii = source.length; i < ii; i++) destination.push(copyElement(source[i]));
                    else if (isBlankObject(source))
                        for (key in source) destination[key] = copyElement(source[key]);
                    else if (source && "function" == typeof source.hasOwnProperty)
                        for (key in source) source.hasOwnProperty(key) && (destination[key] = copyElement(source[key]));
                    else
                        for (key in source) hasOwnProperty.call(source, key) && (destination[key] = copyElement(source[key]));
                    return setHashKey(destination, h), destination
                }

                function copyElement(source) {
                    if (!isObject(source)) return source;
                    var index = stackSource.indexOf(source);
                    if (index !== -1) return stackDest[index];
                    if (isWindow(source) || isScope(source)) throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
                    var needsRecurse = !1,
                        destination = copyType(source);
                    return void 0 === destination && (destination = isArray(source) ? [] : Object.create(getPrototypeOf(source)), needsRecurse = !0), stackSource.push(source), stackDest.push(destination), needsRecurse ? copyRecurse(source, destination) : destination
                }

                function copyType(source) {
                    switch (toString.call(source)) {
                        case "[object Int8Array]":
                        case "[object Int16Array]":
                        case "[object Int32Array]":
                        case "[object Float32Array]":
                        case "[object Float64Array]":
                        case "[object Uint8Array]":
                        case "[object Uint8ClampedArray]":
                        case "[object Uint16Array]":
                        case "[object Uint32Array]":
                            return new source.constructor(copyElement(source.buffer), source.byteOffset, source.length);
                        case "[object ArrayBuffer]":
                            if (!source.slice) {
                                var copied = new ArrayBuffer(source.byteLength);
                                return new Uint8Array(copied).set(new Uint8Array(source)), copied
                            }
                            return source.slice(0);
                        case "[object Boolean]":
                        case "[object Number]":
                        case "[object String]":
                        case "[object Date]":
                            return new source.constructor(source.valueOf());
                        case "[object RegExp]":
                            var re = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                            return re.lastIndex = source.lastIndex, re;
                        case "[object Blob]":
                            return new source.constructor([source], {
                                type: source.type
                            })
                    }
                    if (isFunction(source.cloneNode)) return source.cloneNode(!0)
                }
                var stackSource = [],
                    stackDest = [];
                if (destination) {
                    if (isTypedArray(destination) || isArrayBuffer(destination)) throw ngMinErr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
                    if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
                    return isArray(destination) ? destination.length = 0 : forEach(destination, function(value, key) {
                        "$$hashKey" !== key && delete destination[key]
                    }), stackSource.push(source), stackDest.push(destination), copyRecurse(source, destination)
                }
                return copyElement(source)
            }

            function equals(o1, o2) {
                if (o1 === o2) return !0;
                if (null === o1 || null === o2) return !1;
                if (o1 !== o1 && o2 !== o2) return !0;
                var length, key, keySet, t1 = typeof o1,
                    t2 = typeof o2;
                if (t1 === t2 && "object" === t1) {
                    if (!isArray(o1)) {
                        if (isDate(o1)) return !!isDate(o2) && equals(o1.getTime(), o2.getTime());
                        if (isRegExp(o1)) return !!isRegExp(o2) && o1.toString() === o2.toString();
                        if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2) || isDate(o2) || isRegExp(o2)) return !1;
                        keySet = createMap();
                        for (key in o1)
                            if ("$" !== key.charAt(0) && !isFunction(o1[key])) {
                                if (!equals(o1[key], o2[key])) return !1;
                                keySet[key] = !0
                            }
                        for (key in o2)
                            if (!(key in keySet) && "$" !== key.charAt(0) && isDefined(o2[key]) && !isFunction(o2[key])) return !1;
                        return !0
                    }
                    if (!isArray(o2)) return !1;
                    if ((length = o1.length) === o2.length) {
                        for (key = 0; key < length; key++)
                            if (!equals(o1[key], o2[key])) return !1;
                        return !0
                    }
                }
                return !1
            }

            function concat(array1, array2, index) {
                return array1.concat(slice.call(array2, index))
            }

            function sliceArgs(args, startIndex) {
                return slice.call(args, startIndex || 0)
            }

            function bind(self, fn) {
                var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
                return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function() {
                    return arguments.length ? fn.apply(self, concat(curryArgs, arguments, 0)) : fn.apply(self, curryArgs)
                } : function() {
                    return arguments.length ? fn.apply(self, arguments) : fn.call(self)
                }
            }

            function toJsonReplacer(key, value) {
                var val = value;
                return "string" == typeof key && "$" === key.charAt(0) && "$" === key.charAt(1) ? val = void 0 : isWindow(value) ? val = "$WINDOW" : value && window.document === value ? val = "$DOCUMENT" : isScope(value) && (val = "$SCOPE"), val
            }

            function toJson(obj, pretty) {
                if (!isUndefined(obj)) return isNumber(pretty) || (pretty = pretty ? 2 : null), JSON.stringify(obj, toJsonReplacer, pretty)
            }

            function fromJson(json) {
                return isString(json) ? JSON.parse(json) : json
            }

            function timezoneToOffset(timezone, fallback) {
                timezone = timezone.replace(ALL_COLONS, "");
                var requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
                return isNumberNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset
            }

            function addDateMinutes(date, minutes) {
                return date = new Date(date.getTime()), date.setMinutes(date.getMinutes() + minutes), date
            }

            function convertTimezoneToLocal(date, timezone, reverse) {
                reverse = reverse ? -1 : 1;
                var dateTimezoneOffset = date.getTimezoneOffset(),
                    timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
                return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset))
            }

            function startingTag(element) {
                element = jqLite(element).clone();
                try {
                    element.empty()
                } catch (e) {}
                var elemHtml = jqLite("<div>").append(element).html();
                try {
                    return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
                        return "<" + lowercase(nodeName)
                    })
                } catch (e) {
                    return lowercase(elemHtml)
                }
            }

            function tryDecodeURIComponent(value) {
                try {
                    return decodeURIComponent(value)
                } catch (e) {}
            }

            function parseKeyValue(keyValue) {
                var obj = {};
                return forEach((keyValue || "").split("&"), function(keyValue) {
                    var splitPoint, key, val;
                    keyValue && (key = keyValue = keyValue.replace(/\+/g, "%20"), splitPoint = keyValue.indexOf("="), splitPoint !== -1 && (key = keyValue.substring(0, splitPoint), val = keyValue.substring(splitPoint + 1)), key = tryDecodeURIComponent(key), isDefined(key) && (val = !isDefined(val) || tryDecodeURIComponent(val), hasOwnProperty.call(obj, key) ? isArray(obj[key]) ? obj[key].push(val) : obj[key] = [obj[key], val] : obj[key] = val))
                }), obj
            }

            function toKeyValue(obj) {
                var parts = [];
                return forEach(obj, function(value, key) {
                    isArray(value) ? forEach(value, function(arrayValue) {
                        parts.push(encodeUriQuery(key, !0) + (arrayValue === !0 ? "" : "=" + encodeUriQuery(arrayValue, !0)))
                    }) : parts.push(encodeUriQuery(key, !0) + (value === !0 ? "" : "=" + encodeUriQuery(value, !0)))
                }), parts.length ? parts.join("&") : ""
            }

            function encodeUriSegment(val) {
                return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
            }

            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+")
            }

            function getNgAttribute(element, ngAttr) {
                var attr, i, ii = ngAttrPrefixes.length;
                for (i = 0; i < ii; ++i)
                    if (attr = ngAttrPrefixes[i] + ngAttr, isString(attr = element.getAttribute(attr))) return attr;
                return null
            }

            function allowAutoBootstrap(document) {
                if (!document.currentScript) return !0;
                var src = document.currentScript.getAttribute("src"),
                    link = document.createElement("a");
                link.href = src;
                var scriptProtocol = link.protocol,
                    docLoadProtocol = document.location.protocol;
                if (docLoadProtocol === scriptProtocol) return !0;
                switch (scriptProtocol) {
                    case "http:":
                    case "https:":
                    case "ftp:":
                    case "blob:":
                    case "file:":
                    case "data:":
                        return !0;
                    default:
                        return !1
                }
            }

            function angularInit(element, bootstrap) {
                var appElement, module, config = {};
                if (forEach(ngAttrPrefixes, function(prefix) {
                        var name = prefix + "app";
                        !appElement && element.hasAttribute && element.hasAttribute(name) && (appElement = element, module = element.getAttribute(name))
                    }), forEach(ngAttrPrefixes, function(prefix) {
                        var candidate, name = prefix + "app";
                        !appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]")) && (appElement = candidate, module = candidate.getAttribute(name))
                    }), appElement) {
                    if (!isAutoBootstrapAllowed) return void window.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match.");
                    config.strictDi = null !== getNgAttribute(appElement, "strict-di"), bootstrap(appElement, module ? [module] : [], config)
                }
            }

            function bootstrap(element, modules, config) {
                isObject(config) || (config = {});
                var defaultConfig = {
                    strictDi: !1
                };
                config = extend(defaultConfig, config);
                var doBootstrap = function() {
                        if (element = jqLite(element), element.injector()) {
                            var tag = element[0] === window.document ? "document" : startingTag(element);
                            throw ngMinErr("btstrpd", "App already bootstrapped with this element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"))
                        }
                        modules = modules || [], modules.unshift(["$provide", function($provide) {
                            $provide.value("$rootElement", element)
                        }]), config.debugInfoEnabled && modules.push(["$compileProvider", function($compileProvider) {
                            $compileProvider.debugInfoEnabled(!0)
                        }]), modules.unshift("ng");
                        var injector = createInjector(modules, config.strictDi);
                        return injector.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(scope, element, compile, injector) {
                            scope.$apply(function() {
                                element.data("$injector", injector), compile(element)(scope)
                            })
                        }]), injector
                    },
                    NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/,
                    NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
                return window && NG_ENABLE_DEBUG_INFO.test(window.name) && (config.debugInfoEnabled = !0, window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "")), window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ""), angular.resumeBootstrap = function(extraModules) {
                    return forEach(extraModules, function(module) {
                        modules.push(module)
                    }), doBootstrap()
                }, void(isFunction(angular.resumeDeferredBootstrap) && angular.resumeDeferredBootstrap()))
            }

            function reloadWithDebugInfo() {
                window.name = "NG_ENABLE_DEBUG_INFO!" + window.name, window.location.reload()
            }

            function getTestability(rootElement) {
                var injector = angular.element(rootElement).injector();
                if (!injector) throw ngMinErr("test", "no injector found for element argument to getTestability");
                return injector.get("$$testability")
            }

            function snake_case(name, separator) {
                return separator = separator || "_", name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
                    return (pos ? separator : "") + letter.toLowerCase()
                })
            }

            function bindJQuery() {
                var originalCleanData;
                if (!bindJQueryFired) {
                    var jqName = jq();
                    jQuery = isUndefined(jqName) ? window.jQuery : jqName ? window[jqName] : void 0, jQuery && jQuery.fn.on ? (jqLite = jQuery, extend(jQuery.fn, {
                        scope: JQLitePrototype.scope,
                        isolateScope: JQLitePrototype.isolateScope,
                        controller: JQLitePrototype.controller,
                        injector: JQLitePrototype.injector,
                        inheritedData: JQLitePrototype.inheritedData
                    }), originalCleanData = jQuery.cleanData, jQuery.cleanData = function(elems) {
                        for (var events, elem, i = 0; null != (elem = elems[i]); i++) events = jQuery._data(elem, "events"), events && events.$destroy && jQuery(elem).triggerHandler("$destroy");
                        originalCleanData(elems)
                    }) : jqLite = JQLite, angular.element = jqLite, bindJQueryFired = !0
                }
            }

            function assertArg(arg, name, reason) {
                if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
                return arg
            }

            function assertArgFn(arg, name, acceptArrayAnnotation) {
                return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, "not a function, got " + (arg && "object" == typeof arg ? arg.constructor.name || "Object" : typeof arg)), arg
            }

            function assertNotHasOwnProperty(name, context) {
                if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
            }

            function getter(obj, path, bindFnToScope) {
                if (!path) return obj;
                for (var key, keys = path.split("."), lastInstance = obj, len = keys.length, i = 0; i < len; i++) key = keys[i], obj && (obj = (lastInstance = obj)[key]);
                return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj
            }

            function getBlockNodes(nodes) {
                for (var blockNodes, node = nodes[0], endNode = nodes[nodes.length - 1], i = 1; node !== endNode && (node = node.nextSibling); i++)(blockNodes || nodes[i] !== node) && (blockNodes || (blockNodes = jqLite(slice.call(nodes, 0, i))), blockNodes.push(node));
                return blockNodes || nodes
            }

            function createMap() {
                return Object.create(null)
            }

            function setupModuleLoader(window) {
                function ensure(obj, name, factory) {
                    return obj[name] || (obj[name] = factory())
                }
                var $injectorMinErr = minErr("$injector"),
                    ngMinErr = minErr("ng"),
                    angular = ensure(window, "angular", Object);
                return angular.$$minErr = angular.$$minErr || minErr, ensure(angular, "module", function() {
                    var modules = {};
                    return function(name, requires, configFn) {
                        var assertNotHasOwnProperty = function(name, context) {
                            if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
                        };
                        return assertNotHasOwnProperty(name, "module"), requires && modules.hasOwnProperty(name) && (modules[name] = null), ensure(modules, name, function() {
                            function invokeLater(provider, method, insertMethod, queue) {
                                return queue || (queue = invokeQueue),
                                    function() {
                                        return queue[insertMethod || "push"]([provider, method, arguments]), moduleInstance
                                    }
                            }

                            function invokeLaterAndSetModuleName(provider, method) {
                                return function(recipeName, factoryFunction) {
                                    return factoryFunction && isFunction(factoryFunction) && (factoryFunction.$$moduleName = name), invokeQueue.push([provider, method, arguments]), moduleInstance
                                }
                            }
                            if (!requires) throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", name);
                            var invokeQueue = [],
                                configBlocks = [],
                                runBlocks = [],
                                config = invokeLater("$injector", "invoke", "push", configBlocks),
                                moduleInstance = {
                                    _invokeQueue: invokeQueue,
                                    _configBlocks: configBlocks,
                                    _runBlocks: runBlocks,
                                    requires: requires,
                                    name: name,
                                    provider: invokeLaterAndSetModuleName("$provide", "provider"),
                                    factory: invokeLaterAndSetModuleName("$provide", "factory"),
                                    service: invokeLaterAndSetModuleName("$provide", "service"),
                                    value: invokeLater("$provide", "value"),
                                    constant: invokeLater("$provide", "constant", "unshift"),
                                    decorator: invokeLaterAndSetModuleName("$provide", "decorator"),
                                    animation: invokeLaterAndSetModuleName("$animateProvider", "register"),
                                    filter: invokeLaterAndSetModuleName("$filterProvider", "register"),
                                    controller: invokeLaterAndSetModuleName("$controllerProvider", "register"),
                                    directive: invokeLaterAndSetModuleName("$compileProvider", "directive"),
                                    component: invokeLaterAndSetModuleName("$compileProvider", "component"),
                                    config: config,
                                    run: function(block) {
                                        return runBlocks.push(block), this
                                    }
                                };
                            return configFn && config(configFn), moduleInstance
                        })
                    }
                })
            }

            function shallowCopy(src, dst) {
                if (isArray(src)) {
                    dst = dst || [];
                    for (var i = 0, ii = src.length; i < ii; i++) dst[i] = src[i]
                } else if (isObject(src)) {
                    dst = dst || {};
                    for (var key in src) "$" === key.charAt(0) && "$" === key.charAt(1) || (dst[key] = src[key]);
                }
                return dst || src
            }

            function serializeObject(obj) {
                var seen = [];
                return JSON.stringify(obj, function(key, val) {
                    if (val = toJsonReplacer(key, val), isObject(val)) {
                        if (seen.indexOf(val) >= 0) return "...";
                        seen.push(val)
                    }
                    return val
                })
            }

            function toDebugString(obj) {
                return "function" == typeof obj ? obj.toString().replace(/ \{[\s\S]*$/, "") : isUndefined(obj) ? "undefined" : "string" != typeof obj ? serializeObject(obj) : obj
            }

            function publishExternalAPI(angular) {
                extend(angular, {
                    bootstrap: bootstrap,
                    copy: copy,
                    extend: extend,
                    merge: merge,
                    equals: equals,
                    element: jqLite,
                    forEach: forEach,
                    injector: createInjector,
                    noop: noop,
                    bind: bind,
                    toJson: toJson,
                    fromJson: fromJson,
                    identity: identity,
                    isUndefined: isUndefined,
                    isDefined: isDefined,
                    isString: isString,
                    isFunction: isFunction,
                    isObject: isObject,
                    isNumber: isNumber,
                    isElement: isElement,
                    isArray: isArray,
                    version: version,
                    isDate: isDate,
                    lowercase: lowercase,
                    uppercase: uppercase,
                    callbacks: {
                        $$counter: 0
                    },
                    getTestability: getTestability,
                    $$minErr: minErr,
                    $$csp: csp,
                    reloadWithDebugInfo: reloadWithDebugInfo
                }), (angularModule = setupModuleLoader(window))("ng", ["ngLocale"], ["$provide", function($provide) {
                    $provide.provider({
                        $$sanitizeUri: $$SanitizeUriProvider
                    }), $provide.provider("$compile", $CompileProvider).directive({
                        a: htmlAnchorDirective,
                        input: inputDirective,
                        textarea: inputDirective,
                        form: formDirective,
                        script: scriptDirective,
                        select: selectDirective,
                        option: optionDirective,
                        ngBind: ngBindDirective,
                        ngBindHtml: ngBindHtmlDirective,
                        ngBindTemplate: ngBindTemplateDirective,
                        ngClass: ngClassDirective,
                        ngClassEven: ngClassEvenDirective,
                        ngClassOdd: ngClassOddDirective,
                        ngCloak: ngCloakDirective,
                        ngController: ngControllerDirective,
                        ngForm: ngFormDirective,
                        ngHide: ngHideDirective,
                        ngIf: ngIfDirective,
                        ngInclude: ngIncludeDirective,
                        ngInit: ngInitDirective,
                        ngNonBindable: ngNonBindableDirective,
                        ngPluralize: ngPluralizeDirective,
                        ngRepeat: ngRepeatDirective,
                        ngShow: ngShowDirective,
                        ngStyle: ngStyleDirective,
                        ngSwitch: ngSwitchDirective,
                        ngSwitchWhen: ngSwitchWhenDirective,
                        ngSwitchDefault: ngSwitchDefaultDirective,
                        ngOptions: ngOptionsDirective,
                        ngTransclude: ngTranscludeDirective,
                        ngModel: ngModelDirective,
                        ngList: ngListDirective,
                        ngChange: ngChangeDirective,
                        pattern: patternDirective,
                        ngPattern: patternDirective,
                        required: requiredDirective,
                        ngRequired: requiredDirective,
                        minlength: minlengthDirective,
                        ngMinlength: minlengthDirective,
                        maxlength: maxlengthDirective,
                        ngMaxlength: maxlengthDirective,
                        ngValue: ngValueDirective,
                        ngModelOptions: ngModelOptionsDirective
                    }).directive({
                        ngInclude: ngIncludeFillContentDirective
                    }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
                        $anchorScroll: $AnchorScrollProvider,
                        $animate: $AnimateProvider,
                        $animateCss: $CoreAnimateCssProvider,
                        $$animateJs: $$CoreAnimateJsProvider,
                        $$animateQueue: $$CoreAnimateQueueProvider,
                        $$AnimateRunner: $$AnimateRunnerFactoryProvider,
                        $$animateAsyncRun: $$AnimateAsyncRunFactoryProvider,
                        $browser: $BrowserProvider,
                        $cacheFactory: $CacheFactoryProvider,
                        $controller: $ControllerProvider,
                        $document: $DocumentProvider,
                        $exceptionHandler: $ExceptionHandlerProvider,
                        $filter: $FilterProvider,
                        $$forceReflow: $$ForceReflowProvider,
                        $interpolate: $InterpolateProvider,
                        $interval: $IntervalProvider,
                        $http: $HttpProvider,
                        $httpParamSerializer: $HttpParamSerializerProvider,
                        $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
                        $httpBackend: $HttpBackendProvider,
                        $xhrFactory: $xhrFactoryProvider,
                        $jsonpCallbacks: $jsonpCallbacksProvider,
                        $location: $LocationProvider,
                        $log: $LogProvider,
                        $parse: $ParseProvider,
                        $rootScope: $RootScopeProvider,
                        $q: $QProvider,
                        $$q: $$QProvider,
                        $sce: $SceProvider,
                        $sceDelegate: $SceDelegateProvider,
                        $sniffer: $SnifferProvider,
                        $templateCache: $TemplateCacheProvider,
                        $templateRequest: $TemplateRequestProvider,
                        $$testability: $$TestabilityProvider,
                        $timeout: $TimeoutProvider,
                        $window: $WindowProvider,
                        $$rAF: $$RAFProvider,
                        $$jqLite: $$jqLiteProvider,
                        $$HashMap: $$HashMapProvider,
                        $$cookieReader: $$CookieReaderProvider
                    })
                }])
            }

            function jqNextId() {
                return ++jqId
            }

            function camelCase(name) {
                return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
                    return offset ? letter.toUpperCase() : letter
                }).replace(MOZ_HACK_REGEXP, "Moz$1")
            }

            function jqLiteIsTextNode(html) {
                return !HTML_REGEXP.test(html)
            }

            function jqLiteAcceptsData(node) {
                var nodeType = node.nodeType;
                return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT
            }

            function jqLiteHasData(node) {
                for (var key in jqCache[node.ng339]) return !0;
                return !1
            }

            function jqLiteCleanData(nodes) {
                for (var i = 0, ii = nodes.length; i < ii; i++) jqLiteRemoveData(nodes[i])
            }

            function jqLiteBuildFragment(html, context) {
                var tmp, tag, wrap, i, fragment = context.createDocumentFragment(),
                    nodes = [];
                if (jqLiteIsTextNode(html)) nodes.push(context.createTextNode(html));
                else {
                    for (tmp = fragment.appendChild(context.createElement("div")), tag = (TAG_NAME_REGEXP.exec(html) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2], i = wrap[0]; i--;) tmp = tmp.lastChild;
                    nodes = concat(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
                }
                return fragment.textContent = "", fragment.innerHTML = "", forEach(nodes, function(node) {
                    fragment.appendChild(node)
                }), fragment
            }

            function jqLiteParseHTML(html, context) {
                context = context || window.document;
                var parsed;
                return (parsed = SINGLE_TAG_REGEXP.exec(html)) ? [context.createElement(parsed[1])] : (parsed = jqLiteBuildFragment(html, context)) ? parsed.childNodes : []
            }

            function jqLiteWrapNode(node, wrapper) {
                var parent = node.parentNode;
                parent && parent.replaceChild(wrapper, node), wrapper.appendChild(node)
            }

            function JQLite(element) {
                if (element instanceof JQLite) return element;
                var argIsString;
                if (isString(element) && (element = trim(element), argIsString = !0), !(this instanceof JQLite)) {
                    if (argIsString && "<" !== element.charAt(0)) throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
                    return new JQLite(element)
                }
                argIsString ? jqLiteAddNodes(this, jqLiteParseHTML(element)) : jqLiteAddNodes(this, element)
            }

            function jqLiteClone(element) {
                return element.cloneNode(!0)
            }

            function jqLiteDealoc(element, onlyDescendants) {
                if (onlyDescendants || jqLiteRemoveData(element), element.querySelectorAll)
                    for (var descendants = element.querySelectorAll("*"), i = 0, l = descendants.length; i < l; i++) jqLiteRemoveData(descendants[i])
            }

            function jqLiteOff(element, type, fn, unsupported) {
                if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
                var expandoStore = jqLiteExpandoStore(element),
                    events = expandoStore && expandoStore.events,
                    handle = expandoStore && expandoStore.handle;
                if (handle)
                    if (type) {
                        var removeHandler = function(type) {
                            var listenerFns = events[type];
                            isDefined(fn) && arrayRemove(listenerFns || [], fn), isDefined(fn) && listenerFns && listenerFns.length > 0 || (removeEventListenerFn(element, type, handle), delete events[type])
                        };
                        forEach(type.split(" "), function(type) {
                            removeHandler(type), MOUSE_EVENT_MAP[type] && removeHandler(MOUSE_EVENT_MAP[type])
                        })
                    } else
                        for (type in events) "$destroy" !== type && removeEventListenerFn(element, type, handle), delete events[type]
            }

            function jqLiteRemoveData(element, name) {
                var expandoId = element.ng339,
                    expandoStore = expandoId && jqCache[expandoId];
                if (expandoStore) {
                    if (name) return void delete expandoStore.data[name];
                    expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, "$destroy"), jqLiteOff(element)), delete jqCache[expandoId], element.ng339 = void 0
                }
            }

            function jqLiteExpandoStore(element, createIfNecessary) {
                var expandoId = element.ng339,
                    expandoStore = expandoId && jqCache[expandoId];
                return createIfNecessary && !expandoStore && (element.ng339 = expandoId = jqNextId(), expandoStore = jqCache[expandoId] = {
                    events: {},
                    data: {},
                    handle: void 0
                }), expandoStore
            }

            function jqLiteData(element, key, value) {
                if (jqLiteAcceptsData(element)) {
                    var isSimpleSetter = isDefined(value),
                        isSimpleGetter = !isSimpleSetter && key && !isObject(key),
                        massGetter = !key,
                        expandoStore = jqLiteExpandoStore(element, !isSimpleGetter),
                        data = expandoStore && expandoStore.data;
                    if (isSimpleSetter) data[key] = value;
                    else {
                        if (massGetter) return data;
                        if (isSimpleGetter) return data && data[key];
                        extend(data, key)
                    }
                }
            }

            function jqLiteHasClass(element, selector) {
                return !!element.getAttribute && (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1
            }

            function jqLiteRemoveClass(element, cssClasses) {
                cssClasses && element.setAttribute && forEach(cssClasses.split(" "), function(cssClass) {
                    element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")))
                })
            }

            function jqLiteAddClass(element, cssClasses) {
                if (cssClasses && element.setAttribute) {
                    var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
                    forEach(cssClasses.split(" "), function(cssClass) {
                        cssClass = trim(cssClass), existingClasses.indexOf(" " + cssClass + " ") === -1 && (existingClasses += cssClass + " ")
                    }), element.setAttribute("class", trim(existingClasses))
                }
            }

            function jqLiteAddNodes(root, elements) {
                if (elements)
                    if (elements.nodeType) root[root.length++] = elements;
                    else {
                        var length = elements.length;
                        if ("number" == typeof length && elements.window !== elements) {
                            if (length)
                                for (var i = 0; i < length; i++) root[root.length++] = elements[i]
                        } else root[root.length++] = elements
                    }
            }

            function jqLiteController(element, name) {
                return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller")
            }

            function jqLiteInheritedData(element, name, value) {
                element.nodeType === NODE_TYPE_DOCUMENT && (element = element.documentElement);
                for (var names = isArray(name) ? name : [name]; element;) {
                    for (var i = 0, ii = names.length; i < ii; i++)
                        if (isDefined(value = jqLite.data(element, names[i]))) return value;
                    element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host
                }
            }

            function jqLiteEmpty(element) {
                for (jqLiteDealoc(element, !0); element.firstChild;) element.removeChild(element.firstChild)
            }

            function jqLiteRemove(element, keepData) {
                keepData || jqLiteDealoc(element);
                var parent = element.parentNode;
                parent && parent.removeChild(element)
            }

            function jqLiteDocumentLoaded(action, win) {
                win = win || window, "complete" === win.document.readyState ? win.setTimeout(action) : jqLite(win).on("load", action)
            }

            function getBooleanAttrName(element, name) {
                var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
                return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr
            }

            function getAliasedAttrName(name) {
                return ALIASED_ATTR[name]
            }

            function createEventHandler(element, events) {
                var eventHandler = function(event, type) {
                    event.isDefaultPrevented = function() {
                        return event.defaultPrevented
                    };
                    var eventFns = events[type || event.type],
                        eventFnsLength = eventFns ? eventFns.length : 0;
                    if (eventFnsLength) {
                        if (isUndefined(event.immediatePropagationStopped)) {
                            var originalStopImmediatePropagation = event.stopImmediatePropagation;
                            event.stopImmediatePropagation = function() {
                                event.immediatePropagationStopped = !0, event.stopPropagation && event.stopPropagation(), originalStopImmediatePropagation && originalStopImmediatePropagation.call(event)
                            }
                        }
                        event.isImmediatePropagationStopped = function() {
                            return event.immediatePropagationStopped === !0
                        };
                        var handlerWrapper = eventFns.specialHandlerWrapper || defaultHandlerWrapper;
                        eventFnsLength > 1 && (eventFns = shallowCopy(eventFns));
                        for (var i = 0; i < eventFnsLength; i++) event.isImmediatePropagationStopped() || handlerWrapper(element, event, eventFns[i])
                    }
                };
                return eventHandler.elem = element, eventHandler
            }

            function defaultHandlerWrapper(element, event, handler) {
                handler.call(element, event)
            }

            function specialMouseHandlerWrapper(target, event, handler) {
                var related = event.relatedTarget;
                related && (related === target || jqLiteContains.call(target, related)) || handler.call(target, event)
            }

            function $$jqLiteProvider() {
                this.$get = function() {
                    return extend(JQLite, {
                        hasClass: function(node, classes) {
                            return node.attr && (node = node[0]), jqLiteHasClass(node, classes)
                        },
                        addClass: function(node, classes) {
                            return node.attr && (node = node[0]), jqLiteAddClass(node, classes)
                        },
                        removeClass: function(node, classes) {
                            return node.attr && (node = node[0]), jqLiteRemoveClass(node, classes)
                        }
                    })
                }
            }

            function hashKey(obj, nextUidFn) {
                var key = obj && obj.$$hashKey;
                if (key) return "function" == typeof key && (key = obj.$$hashKey()), key;
                var objType = typeof obj;
                return key = "function" === objType || "object" === objType && null !== obj ? obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)() : objType + ":" + obj
            }

            function HashMap(array, isolatedUid) {
                if (isolatedUid) {
                    var uid = 0;
                    this.nextUid = function() {
                        return ++uid
                    }
                }
                forEach(array, this.put, this)
            }

            function stringifyFn(fn) {
                return Function.prototype.toString.call(fn) + " "
            }

            function extractArgs(fn) {
                var fnText = stringifyFn(fn).replace(STRIP_COMMENTS, ""),
                    args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
                return args
            }

            function anonFn(fn) {
                var args = extractArgs(fn);
                return args ? "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
            }

            function annotate(fn, strictDi, name) {
                var $inject, argDecl, last;
                if ("function" == typeof fn) {
                    if (!($inject = fn.$inject)) {
                        if ($inject = [], fn.length) {
                            if (strictDi) throw isString(name) && name || (name = fn.name || anonFn(fn)), $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                            argDecl = extractArgs(fn), forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                                arg.replace(FN_ARG, function(all, underscore, name) {
                                    $inject.push(name)
                                })
                            })
                        }
                        fn.$inject = $inject
                    }
                } else isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], "fn"), $inject = fn.slice(0, last)) : assertArgFn(fn, "fn", !0);
                return $inject
            }

            function createInjector(modulesToLoad, strictDi) {
                function supportObject(delegate) {
                    return function(key, value) {
                        return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value)
                    }
                }

                function provider(name, provider_) {
                    if (assertNotHasOwnProperty(name, "service"), (isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), !provider_.$get) throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
                    return providerCache[name + providerSuffix] = provider_
                }

                function enforceReturnValue(name, factory) {
                    return function() {
                        var result = instanceInjector.invoke(factory, this);
                        if (isUndefined(result)) throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                        return result
                    }
                }

                function factory(name, factoryFn, enforce) {
                    return provider(name, {
                        $get: enforce !== !1 ? enforceReturnValue(name, factoryFn) : factoryFn
                    })
                }

                function service(name, constructor) {
                    return factory(name, ["$injector", function($injector) {
                        return $injector.instantiate(constructor)
                    }])
                }

                function value(name, val) {
                    return factory(name, valueFn(val), !1)
                }

                function constant(name, value) {
                    assertNotHasOwnProperty(name, "constant"), providerCache[name] = value, instanceCache[name] = value
                }

                function decorator(serviceName, decorFn) {
                    var origProvider = providerInjector.get(serviceName + providerSuffix),
                        orig$get = origProvider.$get;
                    origProvider.$get = function() {
                        var origInstance = instanceInjector.invoke(orig$get, origProvider);
                        return instanceInjector.invoke(decorFn, null, {
                            $delegate: origInstance
                        })
                    }
                }

                function loadModules(modulesToLoad) {
                    assertArg(isUndefined(modulesToLoad) || isArray(modulesToLoad), "modulesToLoad", "not an array");
                    var moduleFn, runBlocks = [];
                    return forEach(modulesToLoad, function(module) {
                        function runInvokeQueue(queue) {
                            var i, ii;
                            for (i = 0, ii = queue.length; i < ii; i++) {
                                var invokeArgs = queue[i],
                                    provider = providerInjector.get(invokeArgs[0]);
                                provider[invokeArgs[1]].apply(provider, invokeArgs[2])
                            }
                        }
                        if (!loadedModules.get(module)) {
                            loadedModules.put(module, !0);
                            try {
                                isString(module) ? (moduleFn = angularModule(module), runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks), runInvokeQueue(moduleFn._invokeQueue), runInvokeQueue(moduleFn._configBlocks)) : isFunction(module) ? runBlocks.push(providerInjector.invoke(module)) : isArray(module) ? runBlocks.push(providerInjector.invoke(module)) : assertArgFn(module, "module")
                            } catch (e) {
                                throw isArray(module) && (module = module[module.length - 1]), e.message && e.stack && e.stack.indexOf(e.message) === -1 && (e = e.message + "\n" + e.stack), $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e)
                            }
                        }
                    }), runBlocks
                }

                function createInternalInjector(cache, factory) {
                    function getService(serviceName, caller) {
                        if (cache.hasOwnProperty(serviceName)) {
                            if (cache[serviceName] === INSTANTIATING) throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                            return cache[serviceName]
                        }
                        try {
                            return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName, caller), cache[serviceName]
                        } catch (err) {
                            throw cache[serviceName] === INSTANTIATING && delete cache[serviceName], err
                        } finally {
                            path.shift()
                        }
                    }

                    function injectionArgs(fn, locals, serviceName) {
                        for (var args = [], $inject = createInjector.$$annotate(fn, strictDi, serviceName), i = 0, length = $inject.length; i < length; i++) {
                            var key = $inject[i];
                            if ("string" != typeof key) throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                            args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName))
                        }
                        return args
                    }

                    function isClass(func) {
                        return !(msie <= 11) && ("function" == typeof func && /^(?:class\b|constructor\()/.test(stringifyFn(func)))
                    }

                    function invoke(fn, self, locals, serviceName) {
                        "string" == typeof locals && (serviceName = locals, locals = null);
                        var args = injectionArgs(fn, locals, serviceName);
                        return isArray(fn) && (fn = fn[fn.length - 1]), isClass(fn) ? (args.unshift(null), new(Function.prototype.bind.apply(fn, args))) : fn.apply(self, args)
                    }

                    function instantiate(Type, locals, serviceName) {
                        var ctor = isArray(Type) ? Type[Type.length - 1] : Type,
                            args = injectionArgs(Type, locals, serviceName);
                        return args.unshift(null), new(Function.prototype.bind.apply(ctor, args))
                    }
                    return {
                        invoke: invoke,
                        instantiate: instantiate,
                        get: getService,
                        annotate: createInjector.$$annotate,
                        has: function(name) {
                            return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name)
                        }
                    }
                }
                strictDi = strictDi === !0;
                var INSTANTIATING = {},
                    providerSuffix = "Provider",
                    path = [],
                    loadedModules = new HashMap([], (!0)),
                    providerCache = {
                        $provide: {
                            provider: supportObject(provider),
                            factory: supportObject(factory),
                            service: supportObject(service),
                            value: supportObject(value),
                            constant: supportObject(constant),
                            decorator: decorator
                        }
                    },
                    providerInjector = providerCache.$injector = createInternalInjector(providerCache, function(serviceName, caller) {
                        throw angular.isString(caller) && path.push(caller), $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "))
                    }),
                    instanceCache = {},
                    protoInstanceInjector = createInternalInjector(instanceCache, function(serviceName, caller) {
                        var provider = providerInjector.get(serviceName + providerSuffix, caller);
                        return instanceInjector.invoke(provider.$get, provider, void 0, serviceName)
                    }),
                    instanceInjector = protoInstanceInjector;
                providerCache["$injector" + providerSuffix] = {
                    $get: valueFn(protoInstanceInjector)
                };
                var runBlocks = loadModules(modulesToLoad);
                return instanceInjector = protoInstanceInjector.get("$injector"), instanceInjector.strictDi = strictDi, forEach(runBlocks, function(fn) {
                    fn && instanceInjector.invoke(fn)
                }), instanceInjector
            }

            function $AnchorScrollProvider() {
                var autoScrollingEnabled = !0;
                this.disableAutoScrolling = function() {
                    autoScrollingEnabled = !1
                }, this.$get = ["$window", "$location", "$rootScope", function($window, $location, $rootScope) {
                    function getFirstAnchor(list) {
                        var result = null;
                        return Array.prototype.some.call(list, function(element) {
                            if ("a" === nodeName_(element)) return result = element, !0
                        }), result
                    }

                    function getYOffset() {
                        var offset = scroll.yOffset;
                        if (isFunction(offset)) offset = offset();
                        else if (isElement(offset)) {
                            var elem = offset[0],
                                style = $window.getComputedStyle(elem);
                            offset = "fixed" !== style.position ? 0 : elem.getBoundingClientRect().bottom
                        } else isNumber(offset) || (offset = 0);
                        return offset
                    }

                    function scrollTo(elem) {
                        if (elem) {
                            elem.scrollIntoView();
                            var offset = getYOffset();
                            if (offset) {
                                var elemTop = elem.getBoundingClientRect().top;
                                $window.scrollBy(0, elemTop - offset)
                            }
                        } else $window.scrollTo(0, 0)
                    }

                    function scroll(hash) {
                        hash = isString(hash) ? hash : $location.hash();
                        var elm;
                        hash ? (elm = document.getElementById(hash)) ? scrollTo(elm) : (elm = getFirstAnchor(document.getElementsByName(hash))) ? scrollTo(elm) : "top" === hash && scrollTo(null) : scrollTo(null)
                    }
                    var document = $window.document;
                    return autoScrollingEnabled && $rootScope.$watch(function() {
                        return $location.hash()
                    }, function(newVal, oldVal) {
                        newVal === oldVal && "" === newVal || jqLiteDocumentLoaded(function() {
                            $rootScope.$evalAsync(scroll)
                        })
                    }), scroll
                }]
            }

            function mergeClasses(a, b) {
                return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
            }

            function extractElementNode(element) {
                for (var i = 0; i < element.length; i++) {
                    var elm = element[i];
                    if (elm.nodeType === ELEMENT_NODE) return elm
                }
            }

            function splitClasses(classes) {
                isString(classes) && (classes = classes.split(" "));
                var obj = createMap();
                return forEach(classes, function(klass) {
                    klass.length && (obj[klass] = !0)
                }), obj
            }

            function prepareAnimateOptions(options) {
                return isObject(options) ? options : {}
            }

            function Browser(window, document, $log, $sniffer) {
                function completeOutstandingRequest(fn) {
                    try {
                        fn.apply(null, sliceArgs(arguments, 1))
                    } finally {
                        if (outstandingRequestCount--, 0 === outstandingRequestCount)
                            for (; outstandingRequestCallbacks.length;) try {
                                outstandingRequestCallbacks.pop()()
                            } catch (e) {
                                $log.error(e)
                            }
                    }
                }

                function getHash(url) {
                    var index = url.indexOf("#");
                    return index === -1 ? "" : url.substr(index)
                }

                function cacheStateAndFireUrlChange() {
                    pendingLocation = null, cacheState(), fireUrlChange()
                }

                function cacheState() {
                    cachedState = getCurrentState(), cachedState = isUndefined(cachedState) ? null : cachedState, equals(cachedState, lastCachedState) && (cachedState = lastCachedState), lastCachedState = cachedState
                }

                function fireUrlChange() {
                    lastBrowserUrl === self.url() && lastHistoryState === cachedState || (lastBrowserUrl = self.url(), lastHistoryState = cachedState, forEach(urlChangeListeners, function(listener) {
                        listener(self.url(), cachedState)
                    }))
                }
                var self = this,
                    location = window.location,
                    history = window.history,
                    setTimeout = window.setTimeout,
                    clearTimeout = window.clearTimeout,
                    pendingDeferIds = {};
                self.isMock = !1;
                var outstandingRequestCount = 0,
                    outstandingRequestCallbacks = [];
                self.$$completeOutstandingRequest = completeOutstandingRequest, self.$$incOutstandingRequestCount = function() {
                    outstandingRequestCount++
                }, self.notifyWhenNoOutstandingRequests = function(callback) {
                    0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback)
                };
                var cachedState, lastHistoryState, lastBrowserUrl = location.href,
                    baseElement = document.find("base"),
                    pendingLocation = null,
                    getCurrentState = $sniffer.history ? function() {
                        try {
                            return history.state
                        } catch (e) {}
                    } : noop;
                cacheState(), lastHistoryState = cachedState, self.url = function(url, replace, state) {
                    if (isUndefined(state) && (state = null), location !== window.location && (location = window.location), history !== window.history && (history = window.history), url) {
                        var sameState = lastHistoryState === state;
                        if (lastBrowserUrl === url && (!$sniffer.history || sameState)) return self;
                        var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                        return lastBrowserUrl = url, lastHistoryState = state, !$sniffer.history || sameBase && sameState ? (sameBase || (pendingLocation = url), replace ? location.replace(url) : sameBase ? location.hash = getHash(url) : location.href = url, location.href !== url && (pendingLocation = url)) : (history[replace ? "replaceState" : "pushState"](state, "", url), cacheState(), lastHistoryState = cachedState), pendingLocation && (pendingLocation = url), self
                    }
                    return pendingLocation || location.href.replace(/%27/g, "'")
                }, self.state = function() {
                    return cachedState
                };
                var urlChangeListeners = [],
                    urlChangeInit = !1,
                    lastCachedState = null;
                self.onUrlChange = function(callback) {
                    return urlChangeInit || ($sniffer.history && jqLite(window).on("popstate", cacheStateAndFireUrlChange), jqLite(window).on("hashchange", cacheStateAndFireUrlChange), urlChangeInit = !0), urlChangeListeners.push(callback), callback
                }, self.$$applicationDestroyed = function() {
                    jqLite(window).off("hashchange popstate", cacheStateAndFireUrlChange)
                }, self.$$checkUrlChange = fireUrlChange, self.baseHref = function() {
                    var href = baseElement.attr("href");
                    return href ? href.replace(/^(https?:)?\/\/[^\/]*/, "") : ""
                }, self.defer = function(fn, delay) {
                    var timeoutId;
                    return outstandingRequestCount++, timeoutId = setTimeout(function() {
                        delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn)
                    }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId
                }, self.defer.cancel = function(deferId) {
                    return !!pendingDeferIds[deferId] && (delete pendingDeferIds[deferId], clearTimeout(deferId), completeOutstandingRequest(noop), !0)
                }
            }

            function $BrowserProvider() {
                this.$get = ["$window", "$log", "$sniffer", "$document", function($window, $log, $sniffer, $document) {
                    return new Browser($window, $document, $log, $sniffer)
                }]
            }

            function $CacheFactoryProvider() {
                this.$get = function() {
                    function cacheFactory(cacheId, options) {
                        function refresh(entry) {
                            entry !== freshEnd && (staleEnd ? staleEnd === entry && (staleEnd = entry.n) : staleEnd = entry, link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null)
                        }

                        function link(nextEntry, prevEntry) {
                            nextEntry !== prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry))
                        }
                        if (cacheId in caches) throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                        var size = 0,
                            stats = extend({}, options, {
                                id: cacheId
                            }),
                            data = createMap(),
                            capacity = options && options.capacity || Number.MAX_VALUE,
                            lruHash = createMap(),
                            freshEnd = null,
                            staleEnd = null;
                        return caches[cacheId] = {
                            put: function(key, value) {
                                if (!isUndefined(value)) {
                                    if (capacity < Number.MAX_VALUE) {
                                        var lruEntry = lruHash[key] || (lruHash[key] = {
                                            key: key
                                        });
                                        refresh(lruEntry)
                                    }
                                    return key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key), value
                                }
                            },
                            get: function(key) {
                                if (capacity < Number.MAX_VALUE) {
                                    var lruEntry = lruHash[key];
                                    if (!lruEntry) return;
                                    refresh(lruEntry)
                                }
                                return data[key]
                            },
                            remove: function(key) {
                                if (capacity < Number.MAX_VALUE) {
                                    var lruEntry = lruHash[key];
                                    if (!lruEntry) return;
                                    lruEntry === freshEnd && (freshEnd = lruEntry.p), lruEntry === staleEnd && (staleEnd = lruEntry.n), link(lruEntry.n, lruEntry.p), delete lruHash[key]
                                }
                                key in data && (delete data[key], size--)
                            },
                            removeAll: function() {
                                data = createMap(), size = 0, lruHash = createMap(), freshEnd = staleEnd = null
                            },
                            destroy: function() {
                                data = null, stats = null, lruHash = null, delete caches[cacheId]
                            },
                            info: function() {
                                return extend({}, stats, {
                                    size: size
                                })
                            }
                        }
                    }
                    var caches = {};
                    return cacheFactory.info = function() {
                        var info = {};
                        return forEach(caches, function(cache, cacheId) {
                            info[cacheId] = cache.info()
                        }), info
                    }, cacheFactory.get = function(cacheId) {
                        return caches[cacheId]
                    }, cacheFactory
                }
            }

            function $TemplateCacheProvider() {
                this.$get = ["$cacheFactory", function($cacheFactory) {
                    return $cacheFactory("templates")
                }]
            }

            function UNINITIALIZED_VALUE() {}

            function $CompileProvider($provide, $$sanitizeUriProvider) {
                function parseIsolateBindings(scope, directiveName, isController) {
                    var LOCAL_REGEXP = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/,
                        bindings = createMap();
                    return forEach(scope, function(definition, scopeName) {
                        if (definition in bindingCache) return void(bindings[scopeName] = bindingCache[definition]);
                        var match = definition.match(LOCAL_REGEXP);
                        if (!match) throw $compileMinErr("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition, isController ? "controller bindings definition" : "isolate scope definition");
                        bindings[scopeName] = {
                            mode: match[1][0],
                            collection: "*" === match[2],
                            optional: "?" === match[3],
                            attrName: match[4] || scopeName
                        }, match[4] && (bindingCache[definition] = bindings[scopeName])
                    }), bindings
                }

                function parseDirectiveBindings(directive, directiveName) {
                    var bindings = {
                        isolateScope: null,
                        bindToController: null
                    };
                    if (isObject(directive.scope) && (directive.bindToController === !0 ? (bindings.bindToController = parseIsolateBindings(directive.scope, directiveName, !0), bindings.isolateScope = {}) : bindings.isolateScope = parseIsolateBindings(directive.scope, directiveName, !1)), isObject(directive.bindToController) && (bindings.bindToController = parseIsolateBindings(directive.bindToController, directiveName, !0)), isObject(bindings.bindToController)) {
                        var controller = directive.controller,
                            controllerAs = directive.controllerAs;
                        if (!controller) throw $compileMinErr("noctrl", "Cannot bind to controller without directive '{0}'s controller.", directiveName);
                        if (!identifierForController(controller, controllerAs)) throw $compileMinErr("noident", "Cannot bind to controller without identifier for directive '{0}'.", directiveName)
                    }
                    return bindings
                }

                function assertValidDirectiveName(name) {
                    var letter = name.charAt(0);
                    if (!letter || letter !== lowercase(letter)) throw $compileMinErr("baddir", "Directive/Component name '{0}' is invalid. The first character must be a lowercase letter", name);
                    if (name !== name.trim()) throw $compileMinErr("baddir", "Directive/Component name '{0}' is invalid. The name should not contain leading or trailing whitespaces", name)
                }

                function getDirectiveRequire(directive) {
                    var require = directive.require || directive.controller && directive.name;
                    return !isArray(require) && isObject(require) && forEach(require, function(value, key) {
                        var match = value.match(REQUIRE_PREFIX_REGEXP),
                            name = value.substring(match[0].length);
                        name || (require[key] = match[0] + key)
                    }), require
                }
                var hasDirectives = {},
                    Suffix = "Directive",
                    COMMENT_DIRECTIVE_REGEXP = /^\s*directive:\s*([\w\-]+)\s+(.*)$/,
                    CLASS_DIRECTIVE_REGEXP = /(([\w\-]+)(?::([^;]+))?;?)/,
                    ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"),
                    REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
                    EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/,
                    bindingCache = createMap();
                this.directive = function registerDirective(name, directiveFactory) {
                    return assertNotHasOwnProperty(name, "directive"), isString(name) ? (assertValidDirectiveName(name), assertArg(directiveFactory, "directiveFactory"), hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], $provide.factory(name + Suffix, ["$injector", "$exceptionHandler", function($injector, $exceptionHandler) {
                        var directives = [];
                        return forEach(hasDirectives[name], function(directiveFactory, index) {
                            try {
                                var directive = $injector.invoke(directiveFactory);
                                isFunction(directive) ? directive = {
                                    compile: valueFn(directive)
                                } : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), directive.priority = directive.priority || 0, directive.index = index, directive.name = directive.name || name, directive.require = getDirectiveRequire(directive), directive.restrict = directive.restrict || "EA", directive.$$moduleName = directiveFactory.$$moduleName, directives.push(directive)
                            } catch (e) {
                                $exceptionHandler(e)
                            }
                        }), directives
                    }])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), this
                }, this.component = function(name, options) {
                    function factory($injector) {
                        function makeInjectable(fn) {
                            return isFunction(fn) || isArray(fn) ? function(tElement, tAttrs) {
                                return $injector.invoke(fn, this, {
                                    $element: tElement,
                                    $attrs: tAttrs
                                })
                            } : fn
                        }
                        var template = options.template || options.templateUrl ? options.template : "",
                            ddo = {
                                controller: controller,
                                controllerAs: identifierForController(options.controller) || options.controllerAs || "$ctrl",
                                template: makeInjectable(template),
                                templateUrl: makeInjectable(options.templateUrl),
                                transclude: options.transclude,
                                scope: {},
                                bindToController: options.bindings || {},
                                restrict: "E",
                                require: options.require
                            };
                        return forEach(options, function(val, key) {
                            "$" === key.charAt(0) && (ddo[key] = val)
                        }), ddo
                    }
                    var controller = options.controller || function() {};
                    return forEach(options, function(val, key) {
                        "$" === key.charAt(0) && (factory[key] = val, isFunction(controller) && (controller[key] = val))
                    }), factory.$inject = ["$injector"], this.directive(name, factory)
                }, this.aHrefSanitizationWhitelist = function(regexp) {
                    return isDefined(regexp) ? ($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.aHrefSanitizationWhitelist()
                }, this.imgSrcSanitizationWhitelist = function(regexp) {
                    return isDefined(regexp) ? ($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.imgSrcSanitizationWhitelist()
                };
                var debugInfoEnabled = !0;
                this.debugInfoEnabled = function(enabled) {
                    return isDefined(enabled) ? (debugInfoEnabled = enabled, this) : debugInfoEnabled
                };
                var TTL = 10;
                this.onChangesTtl = function(value) {
                    return arguments.length ? (TTL = value, this) : TTL
                };
                var commentDirectivesEnabledConfig = !0;
                this.commentDirectivesEnabled = function(value) {
                    return arguments.length ? (commentDirectivesEnabledConfig = value, this) : commentDirectivesEnabledConfig
                };
                var cssClassDirectivesEnabledConfig = !0;
                this.cssClassDirectivesEnabled = function(value) {
                    return arguments.length ? (cssClassDirectivesEnabledConfig = value, this) : cssClassDirectivesEnabledConfig
                }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $sce, $animate, $$sanitizeUri) {
                    function flushOnChangesQueue() {
                        try {
                            if (!--onChangesTtl) throw onChangesQueue = void 0, $compileMinErr("infchng", "{0} $onChanges() iterations reached. Aborting!\n", TTL);
                            $rootScope.$apply(function() {
                                for (var errors = [], i = 0, ii = onChangesQueue.length; i < ii; ++i) try {
                                    onChangesQueue[i]()
                                } catch (e) {
                                    errors.push(e)
                                }
                                if (onChangesQueue = void 0, errors.length) throw errors
                            })
                        } finally {
                            onChangesTtl++
                        }
                    }

                    function Attributes(element, attributesToCopy) {
                        if (attributesToCopy) {
                            var i, l, key, keys = Object.keys(attributesToCopy);
                            for (i = 0, l = keys.length; i < l; i++) key = keys[i], this[key] = attributesToCopy[key]
                        } else this.$attr = {};
                        this.$$element = element
                    }

                    function setSpecialAttr(element, attrName, value) {
                        specialAttrHolder.innerHTML = "<span " + attrName + ">";
                        var attributes = specialAttrHolder.firstChild.attributes,
                            attribute = attributes[0];
                        attributes.removeNamedItem(attribute.name), attribute.value = value, element.attributes.setNamedItem(attribute)
                    }

                    function safeAddClass($element, className) {
                        try {
                            $element.addClass(className)
                        } catch (e) {}
                    }

                    function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                        $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes));
                        for (var NOT_EMPTY = /\S+/, i = 0, len = $compileNodes.length; i < len; i++) {
                            var domNode = $compileNodes[i];
                            domNode.nodeType === NODE_TYPE_TEXT && domNode.nodeValue.match(NOT_EMPTY) && jqLiteWrapNode(domNode, $compileNodes[i] = window.document.createElement("span"))
                        }
                        var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                        compile.$$addScopeClass($compileNodes);
                        var namespace = null;
                        return function(scope, cloneConnectFn, options) {
                            assertArg(scope, "scope"), previousCompileContext && previousCompileContext.needsNewScope && (scope = scope.$parent.$new()), options = options || {};
                            var parentBoundTranscludeFn = options.parentBoundTranscludeFn,
                                transcludeControllers = options.transcludeControllers,
                                futureParentElement = options.futureParentElement;
                            parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude && (parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude), namespace || (namespace = detectNamespaceForChildElements(futureParentElement));
                            var $linkNode;
                            if ($linkNode = "html" !== namespace ? jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html())) : cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes, transcludeControllers)
                                for (var controllerName in transcludeControllers) $linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                            return compile.$$addScopeInfo($linkNode, scope), cloneConnectFn && cloneConnectFn($linkNode, scope), compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn), $linkNode
                        }
                    }

                    function detectNamespaceForChildElements(parentElement) {
                        var node = parentElement && parentElement[0];
                        return node && "foreignobject" !== nodeName_(node) && toString.call(node).match(/SVG/) ? "svg" : "html"
                    }

                    function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                        function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                            var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn, stableNodeList;
                            if (nodeLinkFnFound) {
                                var nodeListLength = nodeList.length;
                                for (stableNodeList = new Array(nodeListLength), i = 0; i < linkFns.length; i += 3) idx = linkFns[i], stableNodeList[idx] = nodeList[idx]
                            } else stableNodeList = nodeList;
                            for (i = 0, ii = linkFns.length; i < ii;) node = stableNodeList[linkFns[i++]], nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], nodeLinkFn ? (nodeLinkFn.scope ? (childScope = scope.$new(), compile.$$addScopeInfo(jqLite(node), childScope)) : childScope = scope, childBoundTranscludeFn = nodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn) : !nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn ? parentBoundTranscludeFn : !parentBoundTranscludeFn && transcludeFn ? createBoundTranscludeFn(scope, transcludeFn) : null, nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn)) : childLinkFn && childLinkFn(scope, node.childNodes, void 0, parentBoundTranscludeFn)
                        }
                        for (var attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound, linkFns = [], i = 0; i < nodeList.length; i++) attrs = new Attributes, directives = collectDirectives(nodeList[i], [], attrs, 0 === i ? maxPriority : void 0, ignoreDirective), nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null, nodeLinkFn && nodeLinkFn.scope && compile.$$addScopeClass(attrs.$$element), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn), (nodeLinkFn || childLinkFn) && (linkFns.push(i, nodeLinkFn, childLinkFn), linkFnFound = !0, nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn), previousCompileContext = null;
                        return linkFnFound ? compositeLinkFn : null
                    }

                    function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                        function boundTranscludeFn(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                            return transcludedScope || (transcludedScope = scope.$new(!1, containingScope), transcludedScope.$$transcluded = !0), transcludeFn(transcludedScope, cloneFn, {
                                parentBoundTranscludeFn: previousBoundTranscludeFn,
                                transcludeControllers: controllers,
                                futureParentElement: futureParentElement
                            })
                        }
                        var boundSlots = boundTranscludeFn.$$slots = createMap();
                        for (var slotName in transcludeFn.$$slots) transcludeFn.$$slots[slotName] ? boundSlots[slotName] = createBoundTranscludeFn(scope, transcludeFn.$$slots[slotName], previousBoundTranscludeFn) : boundSlots[slotName] = null;
                        return boundTranscludeFn
                    }

                    function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                        var match, nodeName, className, nodeType = node.nodeType,
                            attrsMap = attrs.$attr;
                        switch (nodeType) {
                            case NODE_TYPE_ELEMENT:
                                nodeName = nodeName_(node), addDirective(directives, directiveNormalize(nodeName), "E", maxPriority, ignoreDirective);
                                for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                                    var attrStartName = !1,
                                        attrEndName = !1;
                                    attr = nAttrs[j], name = attr.name, value = trim(attr.value), ngAttrName = directiveNormalize(name), isNgAttr = NG_ATTR_BINDING.test(ngAttrName), isNgAttr && (name = name.replace(PREFIX_REGEXP, "").substr(8).replace(/_(.)/g, function(match, letter) {
                                        return letter.toUpperCase()
                                    }));
                                    var multiElementMatch = ngAttrName.match(MULTI_ELEMENT_DIR_RE);
                                    multiElementMatch && directiveIsMultiElement(multiElementMatch[1]) && (attrStartName = name, attrEndName = name.substr(0, name.length - 5) + "end", name = name.substr(0, name.length - 6)), nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, !isNgAttr && attrs.hasOwnProperty(nName) || (attrs[nName] = value, getBooleanAttrName(node, nName) && (attrs[nName] = !0)), addAttrInterpolateDirective(node, directives, value, nName, isNgAttr), addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName)
                                }
                                if ("input" === nodeName && "hidden" === node.getAttribute("type") && node.setAttribute("autocomplete", "off"), !cssClassDirectivesEnabled) break;
                                if (className = node.className, isObject(className) && (className = className.animVal), isString(className) && "" !== className)
                                    for (; match = CLASS_DIRECTIVE_REGEXP.exec(className);) nName = directiveNormalize(match[2]), addDirective(directives, nName, "C", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[3])), className = className.substr(match.index + match[0].length);
                                break;
                            case NODE_TYPE_TEXT:
                                if (11 === msie)
                                    for (; node.parentNode && node.nextSibling && node.nextSibling.nodeType === NODE_TYPE_TEXT;) node.nodeValue = node.nodeValue + node.nextSibling.nodeValue, node.parentNode.removeChild(node.nextSibling);
                                addTextInterpolateDirective(directives, node.nodeValue);
                                break;
                            case NODE_TYPE_COMMENT:
                                if (!commentDirectivesEnabled) break;
                                collectCommentDirectives(node, directives, attrs, maxPriority, ignoreDirective)
                        }
                        return directives.sort(byPriority), directives
                    }

                    function collectCommentDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                        try {
                            var match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                            if (match) {
                                var nName = directiveNormalize(match[1]);
                                addDirective(directives, nName, "M", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[2]))
                            }
                        } catch (e) {}
                    }

                    function groupScan(node, attrStart, attrEnd) {
                        var nodes = [],
                            depth = 0;
                        if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                            do {
                                if (!node) throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                                node.nodeType === NODE_TYPE_ELEMENT && (node.hasAttribute(attrStart) && depth++, node.hasAttribute(attrEnd) && depth--), nodes.push(node), node = node.nextSibling
                            } while (depth > 0)
                        } else nodes.push(node);
                        return jqLite(nodes)
                    }

                    function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                        return function(scope, element, attrs, controllers, transcludeFn) {
                            return element = groupScan(element[0], attrStart, attrEnd), linkFn(scope, element, attrs, controllers, transcludeFn)
                        }
                    }

                    function compilationGenerator(eager, $compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                        var compiled;
                        return eager ? compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) : function() {
                            return compiled || (compiled = compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext), $compileNodes = transcludeFn = previousCompileContext = null), compiled.apply(this, arguments)
                        }
                    }

                    function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                        function addLinkFns(pre, post, attrStart, attrEnd) {
                            pre && (attrStart && (pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd)), pre.require = directive.require, pre.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (pre = cloneAndAnnotateFn(pre, {
                                isolateScope: !0
                            })), preLinkFns.push(pre)), post && (attrStart && (post = groupElementsLinkFnWrapper(post, attrStart, attrEnd)), post.require = directive.require, post.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (post = cloneAndAnnotateFn(post, {
                                isolateScope: !0
                            })), postLinkFns.push(post))
                        }

                        function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                            function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement, slotName) {
                                var transcludeControllers;
                                if (isScope(scope) || (slotName = futureParentElement, futureParentElement = cloneAttachFn, cloneAttachFn = scope, scope = void 0), hasElementTranscludeDirective && (transcludeControllers = elementControllers), futureParentElement || (futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element), !slotName) return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                                var slotTranscludeFn = boundTranscludeFn.$$slots[slotName];
                                if (slotTranscludeFn) return slotTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                                if (isUndefined(slotTranscludeFn)) throw $compileMinErr("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', slotName, startingTag($element))
                            }
                            var i, ii, linkFn, isolateScope, controllerScope, elementControllers, transcludeFn, $element, attrs, scopeBindingInfo;
                            compileNode === linkNode ? (attrs = templateAttrs, $element = templateAttrs.$$element) : ($element = jqLite(linkNode), attrs = new Attributes($element, templateAttrs)), controllerScope = scope, newIsolateScopeDirective ? isolateScope = scope.$new(!0) : newScopeDirective && (controllerScope = scope.$parent), boundTranscludeFn && (transcludeFn = controllersBoundTransclude, transcludeFn.$$boundTransclude = boundTranscludeFn, transcludeFn.isSlotFilled = function(slotName) {
                                return !!boundTranscludeFn.$$slots[slotName]
                            }), controllerDirectives && (elementControllers = setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope, newIsolateScopeDirective)), newIsolateScopeDirective && (compile.$$addScopeInfo($element, isolateScope, !0, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective))), compile.$$addScopeClass($element, !0), isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings, scopeBindingInfo = initializeDirectiveBindings(scope, attrs, isolateScope, isolateScope.$$isolateBindings, newIsolateScopeDirective), scopeBindingInfo.removeWatches && isolateScope.$on("$destroy", scopeBindingInfo.removeWatches));
                            for (var name in elementControllers) {
                                var controllerDirective = controllerDirectives[name],
                                    controller = elementControllers[name],
                                    bindings = controllerDirective.$$bindings.bindToController;
                                controller.identifier && bindings ? controller.bindingInfo = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective) : controller.bindingInfo = {};
                                var controllerResult = controller();
                                controllerResult !== controller.instance && (controller.instance = controllerResult, $element.data("$" + controllerDirective.name + "Controller", controllerResult), controller.bindingInfo.removeWatches && controller.bindingInfo.removeWatches(), controller.bindingInfo = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective))
                            }
                            for (forEach(controllerDirectives, function(controllerDirective, name) {
                                    var require = controllerDirective.require;
                                    controllerDirective.bindToController && !isArray(require) && isObject(require) && extend(elementControllers[name].instance, getControllers(name, require, $element, elementControllers))
                                }), forEach(elementControllers, function(controller) {
                                    var controllerInstance = controller.instance;
                                    if (isFunction(controllerInstance.$onChanges)) try {
                                        controllerInstance.$onChanges(controller.bindingInfo.initialChanges)
                                    } catch (e) {
                                        $exceptionHandler(e)
                                    }
                                    if (isFunction(controllerInstance.$onInit)) try {
                                        controllerInstance.$onInit()
                                    } catch (e) {
                                        $exceptionHandler(e)
                                    }
                                    isFunction(controllerInstance.$doCheck) && (controllerScope.$watch(function() {
                                        controllerInstance.$doCheck()
                                    }), controllerInstance.$doCheck()), isFunction(controllerInstance.$onDestroy) && controllerScope.$on("$destroy", function() {
                                        controllerInstance.$onDestroy()
                                    })
                                }), i = 0, ii = preLinkFns.length; i < ii; i++) linkFn = preLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                            var scopeToChild = scope;
                            for (newIsolateScopeDirective && (newIsolateScopeDirective.template || null === newIsolateScopeDirective.templateUrl) && (scopeToChild = isolateScope), childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, void 0, boundTranscludeFn), i = postLinkFns.length - 1; i >= 0; i--) linkFn = postLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                            forEach(elementControllers, function(controller) {
                                var controllerInstance = controller.instance;
                                isFunction(controllerInstance.$postLink) && controllerInstance.$postLink()
                            })
                        }
                        previousCompileContext = previousCompileContext || {};
                        for (var directive, directiveName, $template, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, newScopeDirective = previousCompileContext.newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = !1, hasTemplate = !1, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, didScanForMultipleTransclusion = !1, mightHaveMultipleTransclusionError = !1, i = 0, ii = directives.length; i < ii; i++) {
                            directive = directives[i];
                            var attrStart = directive.$$start,
                                attrEnd = directive.$$end;
                            if (attrStart && ($compileNode = groupScan(compileNode, attrStart, attrEnd)), $template = void 0, terminalPriority > directive.priority) break;
                            if (directiveValue = directive.scope, directiveValue && (directive.templateUrl || (isObject(directiveValue) ? (assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode), newIsolateScopeDirective = directive) : assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode)), newScopeDirective = newScopeDirective || directive), directiveName = directive.name, !didScanForMultipleTransclusion && (directive.replace && (directive.templateUrl || directive.template) || directive.transclude && !directive.$$tlb)) {
                                for (var candidateDirective, scanningIndex = i + 1; candidateDirective = directives[scanningIndex++];)
                                    if (candidateDirective.transclude && !candidateDirective.$$tlb || candidateDirective.replace && (candidateDirective.templateUrl || candidateDirective.template)) {
                                        mightHaveMultipleTransclusionError = !0;
                                        break
                                    }
                                didScanForMultipleTransclusion = !0
                            }
                            if (!directive.templateUrl && directive.controller && (directiveValue = directive.controller, controllerDirectives = controllerDirectives || createMap(), assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode), controllerDirectives[directiveName] = directive), directiveValue = directive.transclude)
                                if (hasTranscludeDirective = !0, directive.$$tlb || (assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode), nonTlbTranscludeDirective = directive), "element" === directiveValue) hasElementTranscludeDirective = !0, terminalPriority = directive.priority, $template = $compileNode, $compileNode = templateAttrs.$$element = jqLite(compile.$$createComment(directiveName, templateAttrs[directiveName])), compileNode = $compileNode[0], replaceWith(jqCollection, sliceArgs($template), compileNode), $template[0].$$parentNode = $template[0].parentNode, childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                                    nonTlbTranscludeDirective: nonTlbTranscludeDirective
                                });
                                else {
                                    var slots = createMap();
                                    if ($template = jqLite(jqLiteClone(compileNode)).contents(), isObject(directiveValue)) {
                                        $template = [];
                                        var slotMap = createMap(),
                                            filledSlots = createMap();
                                        forEach(directiveValue, function(elementSelector, slotName) {
                                            var optional = "?" === elementSelector.charAt(0);
                                            elementSelector = optional ? elementSelector.substring(1) : elementSelector, slotMap[elementSelector] = slotName, slots[slotName] = null, filledSlots[slotName] = optional
                                        }), forEach($compileNode.contents(), function(node) {
                                            var slotName = slotMap[directiveNormalize(nodeName_(node))];
                                            slotName ? (filledSlots[slotName] = !0, slots[slotName] = slots[slotName] || [], slots[slotName].push(node)) : $template.push(node)
                                        }), forEach(filledSlots, function(filled, slotName) {
                                            if (!filled) throw $compileMinErr("reqslot", "Required transclusion slot `{0}` was not filled.", slotName)
                                        });
                                        for (var slotName in slots) slots[slotName] && (slots[slotName] = compilationGenerator(mightHaveMultipleTransclusionError, slots[slotName], transcludeFn))
                                    }
                                    $compileNode.empty(), childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, void 0, void 0, {
                                        needsNewScope: directive.$$isolateScope || directive.$$newScope
                                    }), childTranscludeFn.$$slots = slots
                                }
                            if (directive.template)
                                if (hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template, directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                                    if (replaceDirective = directive, $template = jqLiteIsTextNode(directiveValue) ? [] : removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue))), compileNode = $template[0], 1 !== $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                                    replaceWith(jqCollection, $compileNode, compileNode);
                                    var newTemplateAttrs = {
                                            $attr: {}
                                        },
                                        templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs),
                                        unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                                    (newIsolateScopeDirective || newScopeDirective) && markDirectiveScope(templateDirectives, newIsolateScopeDirective, newScopeDirective), directives = directives.concat(templateDirectives).concat(unprocessedDirectives), mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length
                                } else $compileNode.html(directiveValue);
                            if (directive.templateUrl) hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directive.replace && (replaceDirective = directive), nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                                controllerDirectives: controllerDirectives,
                                newScopeDirective: newScopeDirective !== directive && newScopeDirective,
                                newIsolateScopeDirective: newIsolateScopeDirective,
                                templateDirective: templateDirective,
                                nonTlbTranscludeDirective: nonTlbTranscludeDirective
                            }), ii = directives.length;
                            else if (directive.compile) try {
                                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                                var context = directive.$$originalDirective || directive;
                                isFunction(linkFn) ? addLinkFns(null, bind(context, linkFn), attrStart, attrEnd) : linkFn && addLinkFns(bind(context, linkFn.pre), bind(context, linkFn.post), attrStart, attrEnd)
                            } catch (e) {
                                $exceptionHandler(e, startingTag($compileNode))
                            }
                            directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority))
                        }
                        return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === !0, nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective, nodeLinkFn.templateOnThisElement = hasTemplate, nodeLinkFn.transclude = childTranscludeFn, previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective, nodeLinkFn
                    }

                    function getControllers(directiveName, require, $element, elementControllers) {
                        var value;
                        if (isString(require)) {
                            var match = require.match(REQUIRE_PREFIX_REGEXP),
                                name = require.substring(match[0].length),
                                inheritType = match[1] || match[3],
                                optional = "?" === match[2];
                            if ("^^" === inheritType ? $element = $element.parent() : (value = elementControllers && elementControllers[name], value = value && value.instance), !value) {
                                var dataName = "$" + name + "Controller";
                                value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName)
                            }
                            if (!value && !optional) throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", name, directiveName)
                        } else if (isArray(require)) {
                            value = [];
                            for (var i = 0, ii = require.length; i < ii; i++) value[i] = getControllers(directiveName, require[i], $element, elementControllers)
                        } else isObject(require) && (value = {}, forEach(require, function(controller, property) {
                            value[property] = getControllers(directiveName, controller, $element, elementControllers)
                        }));
                        return value || null
                    }

                    function setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope, newIsolateScopeDirective) {
                        var elementControllers = createMap();
                        for (var controllerKey in controllerDirectives) {
                            var directive = controllerDirectives[controllerKey],
                                locals = {
                                    $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                                    $element: $element,
                                    $attrs: attrs,
                                    $transclude: transcludeFn
                                },
                                controller = directive.controller;
                            "@" === controller && (controller = attrs[directive.name]);
                            var controllerInstance = $controller(controller, locals, !0, directive.controllerAs);
                            elementControllers[directive.name] = controllerInstance, $element.data("$" + directive.name + "Controller", controllerInstance.instance)
                        }
                        return elementControllers
                    }

                    function markDirectiveScope(directives, isolateScope, newScope) {
                        for (var j = 0, jj = directives.length; j < jj; j++) directives[j] = inherit(directives[j], {
                            $$isolateScope: isolateScope,
                            $$newScope: newScope
                        })
                    }

                    function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                        if (name === ignoreDirective) return null;
                        var match = null;
                        if (hasDirectives.hasOwnProperty(name))
                            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) try {
                                if (directive = directives[i], (isUndefined(maxPriority) || maxPriority > directive.priority) && directive.restrict.indexOf(location) !== -1) {
                                    if (startAttrName && (directive = inherit(directive, {
                                            $$start: startAttrName,
                                            $$end: endAttrName
                                        })), !directive.$$bindings) {
                                        var bindings = directive.$$bindings = parseDirectiveBindings(directive, directive.name);
                                        isObject(bindings.isolateScope) && (directive.$$isolateBindings = bindings.isolateScope)
                                    }
                                    tDirectives.push(directive), match = directive
                                }
                            } catch (e) {
                                $exceptionHandler(e)
                            }
                        return match
                    }

                    function directiveIsMultiElement(name) {
                        if (hasDirectives.hasOwnProperty(name))
                            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++)
                                if (directive = directives[i], directive.multiElement) return !0;
                        return !1
                    }

                    function mergeTemplateAttributes(dst, src) {
                        var srcAttr = src.$attr,
                            dstAttr = dst.$attr;
                        forEach(dst, function(value, key) {
                            "$" !== key.charAt(0) && (src[key] && src[key] !== value && (value += ("style" === key ? ";" : " ") + src[key]), dst.$set(key, value, !0, srcAttr[key]))
                        }), forEach(src, function(value, key) {
                            dst.hasOwnProperty(key) || "$" === key.charAt(0) || (dst[key] = value, "class" !== key && "style" !== key && (dstAttr[key] = srcAttr[key]))
                        })
                    }

                    function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                        var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [],
                            beforeTemplateCompileNode = $compileNode[0],
                            origAsyncDirective = directives.shift(),
                            derivedSyncDirective = inherit(origAsyncDirective, {
                                templateUrl: null,
                                transclude: null,
                                replace: null,
                                $$originalDirective: origAsyncDirective
                            }),
                            templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl,
                            templateNamespace = origAsyncDirective.templateNamespace;
                        return $compileNode.empty(), $templateRequest(templateUrl).then(function(content) {
                                var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                                if (content = denormalizeTemplate(content), origAsyncDirective.replace) {
                                    if ($template = jqLiteIsTextNode(content) ? [] : removeComments(wrapTemplate(templateNamespace, trim(content))), compileNode = $template[0], 1 !== $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                                    tempTemplateAttrs = {
                                        $attr: {}
                                    }, replaceWith($rootElement, $compileNode, compileNode);
                                    var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                                    isObject(origAsyncDirective.scope) && markDirectiveScope(templateDirectives, !0), directives = templateDirectives.concat(directives), mergeTemplateAttributes(tAttrs, tempTemplateAttrs)
                                } else compileNode = beforeTemplateCompileNode, $compileNode.html(content);
                                for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext), forEach($rootElement, function(node, i) {
                                        node === compileNode && ($rootElement[i] = $compileNode[0])
                                    }), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length;) {
                                    var scope = linkQueue.shift(),
                                        beforeTemplateLinkNode = linkQueue.shift(),
                                        linkRootElement = linkQueue.shift(),
                                        boundTranscludeFn = linkQueue.shift(),
                                        linkNode = $compileNode[0];
                                    if (!scope.$$destroyed) {
                                        if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                            var oldClasses = beforeTemplateLinkNode.className;
                                            previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace || (linkNode = jqLiteClone(compileNode)), replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode), safeAddClass(jqLite(linkNode), oldClasses)
                                        }
                                        childBoundTranscludeFn = afterTemplateNodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn) : boundTranscludeFn, afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn)
                                    }
                                }
                                linkQueue = null
                            }),
                            function(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                                var childBoundTranscludeFn = boundTranscludeFn;
                                scope.$$destroyed || (linkQueue ? linkQueue.push(scope, node, rootElement, childBoundTranscludeFn) : (afterTemplateNodeLinkFn.transcludeOnThisElement && (childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn)), afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn)))
                            }
                    }

                    function byPriority(a, b) {
                        var diff = b.priority - a.priority;
                        return 0 !== diff ? diff : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
                    }

                    function assertNoDuplicate(what, previousDirective, directive, element) {
                        function wrapModuleNameIfDefined(moduleName) {
                            return moduleName ? " (module: " + moduleName + ")" : ""
                        }
                        if (previousDirective) throw $compileMinErr("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", previousDirective.name, wrapModuleNameIfDefined(previousDirective.$$moduleName), directive.name, wrapModuleNameIfDefined(directive.$$moduleName), what, startingTag(element))
                    }

                    function addTextInterpolateDirective(directives, text) {
                        var interpolateFn = $interpolate(text, !0);
                        interpolateFn && directives.push({
                            priority: 0,
                            compile: function(templateNode) {
                                var templateNodeParent = templateNode.parent(),
                                    hasCompileParent = !!templateNodeParent.length;
                                return hasCompileParent && compile.$$addBindingClass(templateNodeParent),
                                    function(scope, node) {
                                        var parent = node.parent();
                                        hasCompileParent || compile.$$addBindingClass(parent), compile.$$addBindingInfo(parent, interpolateFn.expressions), scope.$watch(interpolateFn, function(value) {
                                            node[0].nodeValue = value
                                        })
                                    }
                            }
                        })
                    }

                    function wrapTemplate(type, template) {
                        switch (type = lowercase(type || "html")) {
                            case "svg":
                            case "math":
                                var wrapper = window.document.createElement("div");
                                return wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">", wrapper.childNodes[0].childNodes;
                            default:
                                return template
                        }
                    }

                    function getTrustedContext(node, attrNormalizedName) {
                        if ("srcdoc" === attrNormalizedName) return $sce.HTML;
                        var tag = nodeName_(node);
                        if ("src" === attrNormalizedName || "ngSrc" === attrNormalizedName) {
                            if (["img", "video", "audio", "source", "track"].indexOf(tag) === -1) return $sce.RESOURCE_URL
                        } else if ("xlinkHref" === attrNormalizedName || "form" === tag && "action" === attrNormalizedName) return $sce.RESOURCE_URL
                    }

                    function addAttrInterpolateDirective(node, directives, value, name, allOrNothing) {
                        var trustedContext = getTrustedContext(node, name);
                        allOrNothing = ALL_OR_NOTHING_ATTRS[name] || allOrNothing;
                        var interpolateFn = $interpolate(value, !0, trustedContext, allOrNothing);
                        if (interpolateFn) {
                            if ("multiple" === name && "select" === nodeName_(node)) throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                            directives.push({
                                priority: 100,
                                compile: function() {
                                    return {
                                        pre: function(scope, element, attr) {
                                            var $$observers = attr.$$observers || (attr.$$observers = createMap());
                                            if (EVENT_HANDLER_ATTR_REGEXP.test(name)) throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                            var newValue = attr[name];
                                            newValue !== value && (interpolateFn = newValue && $interpolate(newValue, !0, trustedContext, allOrNothing), value = newValue), interpolateFn && (attr[name] = interpolateFn(scope), ($$observers[name] || ($$observers[name] = [])).$$inter = !0, (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function(newValue, oldValue) {
                                                "class" === name && newValue !== oldValue ? attr.$updateClass(newValue, oldValue) : attr.$set(name, newValue)
                                            }))
                                        }
                                    }
                                }
                            })
                        }
                    }

                    function replaceWith($rootElement, elementsToRemove, newNode) {
                        var i, ii, firstElementToRemove = elementsToRemove[0],
                            removeCount = elementsToRemove.length,
                            parent = firstElementToRemove.parentNode;
                        if ($rootElement)
                            for (i = 0, ii = $rootElement.length; i < ii; i++)
                                if ($rootElement[i] === firstElementToRemove) {
                                    $rootElement[i++] = newNode;
                                    for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; j < jj; j++, j2++) j2 < jj ? $rootElement[j] = $rootElement[j2] : delete $rootElement[j];
                                    $rootElement.length -= removeCount - 1, $rootElement.context === firstElementToRemove && ($rootElement.context = newNode);
                                    break
                                }
                        parent && parent.replaceChild(newNode, firstElementToRemove);
                        var fragment = window.document.createDocumentFragment();
                        for (i = 0; i < removeCount; i++) fragment.appendChild(elementsToRemove[i]);
                        for (jqLite.hasData(firstElementToRemove) && (jqLite.data(newNode, jqLite.data(firstElementToRemove)), jqLite(firstElementToRemove).off("$destroy")), jqLite.cleanData(fragment.querySelectorAll("*")), i = 1; i < removeCount; i++) delete elementsToRemove[i];
                        elementsToRemove[0] = newNode, elementsToRemove.length = 1
                    }

                    function cloneAndAnnotateFn(fn, annotation) {
                        return extend(function() {
                            return fn.apply(null, arguments)
                        }, fn, annotation)
                    }

                    function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                        try {
                            linkFn(scope, $element, attrs, controllers, transcludeFn)
                        } catch (e) {
                            $exceptionHandler(e, startingTag($element))
                        }
                    }

                    function initializeDirectiveBindings(scope, attrs, destination, bindings, directive) {
                        function recordChanges(key, currentValue, previousValue) {
                            isFunction(destination.$onChanges) && currentValue !== previousValue && (onChangesQueue || (scope.$$postDigest(flushOnChangesQueue), onChangesQueue = []), changes || (changes = {}, onChangesQueue.push(triggerOnChangesHook)), changes[key] && (previousValue = changes[key].previousValue), changes[key] = new SimpleChange(previousValue, currentValue))
                        }

                        function triggerOnChangesHook() {
                            destination.$onChanges(changes), changes = void 0
                        }
                        var changes, removeWatchCollection = [],
                            initialChanges = {};
                        return forEach(bindings, function(definition, scopeName) {
                            var lastValue, parentGet, parentSet, compare, removeWatch, attrName = definition.attrName,
                                optional = definition.optional,
                                mode = definition.mode;
                            switch (mode) {
                                case "@":
                                    optional || hasOwnProperty.call(attrs, attrName) || (destination[scopeName] = attrs[attrName] = void 0), attrs.$observe(attrName, function(value) {
                                        if (isString(value) || isBoolean(value)) {
                                            var oldValue = destination[scopeName];
                                            recordChanges(scopeName, value, oldValue), destination[scopeName] = value
                                        }
                                    }), attrs.$$observers[attrName].$$scope = scope, lastValue = attrs[attrName], isString(lastValue) ? destination[scopeName] = $interpolate(lastValue)(scope) : isBoolean(lastValue) && (destination[scopeName] = lastValue), initialChanges[scopeName] = new SimpleChange(_UNINITIALIZED_VALUE, destination[scopeName]);
                                    break;
                                case "=":
                                    if (!hasOwnProperty.call(attrs, attrName)) {
                                        if (optional) break;
                                        attrs[attrName] = void 0
                                    }
                                    if (optional && !attrs[attrName]) break;
                                    parentGet = $parse(attrs[attrName]), compare = parentGet.literal ? equals : function(a, b) {
                                        return a === b || a !== a && b !== b
                                    }, parentSet = parentGet.assign || function() {
                                        throw lastValue = destination[scopeName] = parentGet(scope), $compileMinErr("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", attrs[attrName], attrName, directive.name)
                                    }, lastValue = destination[scopeName] = parentGet(scope);
                                    var parentValueWatch = function(parentValue) {
                                        return compare(parentValue, destination[scopeName]) || (compare(parentValue, lastValue) ? parentSet(scope, parentValue = destination[scopeName]) : destination[scopeName] = parentValue), lastValue = parentValue
                                    };
                                    parentValueWatch.$stateful = !0, removeWatch = definition.collection ? scope.$watchCollection(attrs[attrName], parentValueWatch) : scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal), removeWatchCollection.push(removeWatch);
                                    break;
                                case "<":
                                    if (!hasOwnProperty.call(attrs, attrName)) {
                                        if (optional) break;
                                        attrs[attrName] = void 0
                                    }
                                    if (optional && !attrs[attrName]) break;
                                    parentGet = $parse(attrs[attrName]);
                                    var initialValue = destination[scopeName] = parentGet(scope);
                                    initialChanges[scopeName] = new SimpleChange(_UNINITIALIZED_VALUE, destination[scopeName]), removeWatch = scope.$watch(parentGet, function(newValue, oldValue) {
                                        if (oldValue === newValue) {
                                            if (oldValue === initialValue) return;
                                            oldValue = initialValue
                                        }
                                        recordChanges(scopeName, newValue, oldValue), destination[scopeName] = newValue
                                    }, parentGet.literal), removeWatchCollection.push(removeWatch);
                                    break;
                                case "&":
                                    if (parentGet = attrs.hasOwnProperty(attrName) ? $parse(attrs[attrName]) : noop, parentGet === noop && optional) break;
                                    destination[scopeName] = function(locals) {
                                        return parentGet(scope, locals)
                                    }
                            }
                        }), {
                            initialChanges: initialChanges,
                            removeWatches: removeWatchCollection.length && function() {
                                for (var i = 0, ii = removeWatchCollection.length; i < ii; ++i) removeWatchCollection[i]()
                            }
                        }
                    }
                    var onChangesQueue, SIMPLE_ATTR_NAME = /^\w/,
                        specialAttrHolder = window.document.createElement("div"),
                        commentDirectivesEnabled = commentDirectivesEnabledConfig,
                        cssClassDirectivesEnabled = cssClassDirectivesEnabledConfig,
                        onChangesTtl = TTL;
                    Attributes.prototype = {
                        $normalize: directiveNormalize,
                        $addClass: function(classVal) {
                            classVal && classVal.length > 0 && $animate.addClass(this.$$element, classVal)
                        },
                        $removeClass: function(classVal) {
                            classVal && classVal.length > 0 && $animate.removeClass(this.$$element, classVal)
                        },
                        $updateClass: function(newClasses, oldClasses) {
                            var toAdd = tokenDifference(newClasses, oldClasses);
                            toAdd && toAdd.length && $animate.addClass(this.$$element, toAdd);
                            var toRemove = tokenDifference(oldClasses, newClasses);
                            toRemove && toRemove.length && $animate.removeClass(this.$$element, toRemove)
                        },
                        $set: function(key, value, writeAttr, attrName) {
                            var nodeName, node = this.$$element[0],
                                booleanKey = getBooleanAttrName(node, key),
                                aliasedKey = getAliasedAttrName(key),
                                observer = key;
                            if (booleanKey ? (this.$$element.prop(key, value), attrName = booleanKey) : aliasedKey && (this[aliasedKey] = value, observer = aliasedKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], attrName || (this.$attr[key] = attrName = snake_case(key, "-"))), nodeName = nodeName_(this.$$element), "a" === nodeName && ("href" === key || "xlinkHref" === key) || "img" === nodeName && "src" === key) this[key] = value = $$sanitizeUri(value, "src" === key);
                            else if ("img" === nodeName && "srcset" === key && isDefined(value)) {
                                for (var result = "", trimmedSrcset = trim(value), srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/, rawUris = trimmedSrcset.split(pattern), nbrUrisWith2parts = Math.floor(rawUris.length / 2), i = 0; i < nbrUrisWith2parts; i++) {
                                    var innerIdx = 2 * i;
                                    result += $$sanitizeUri(trim(rawUris[innerIdx]), !0), result += " " + trim(rawUris[innerIdx + 1])
                                }
                                var lastTuple = trim(rawUris[2 * i]).split(/\s/);
                                result += $$sanitizeUri(trim(lastTuple[0]), !0), 2 === lastTuple.length && (result += " " + trim(lastTuple[1])), this[key] = value = result
                            }
                            writeAttr !== !1 && (null === value || isUndefined(value) ? this.$$element.removeAttr(attrName) : SIMPLE_ATTR_NAME.test(attrName) ? this.$$element.attr(attrName, value) : setSpecialAttr(this.$$element[0], attrName, value));
                            var $$observers = this.$$observers;
                            $$observers && forEach($$observers[observer], function(fn) {
                                try {
                                    fn(value)
                                } catch (e) {
                                    $exceptionHandler(e)
                                }
                            })
                        },
                        $observe: function(key, fn) {
                            var attrs = this,
                                $$observers = attrs.$$observers || (attrs.$$observers = createMap()),
                                listeners = $$observers[key] || ($$observers[key] = []);
                            return listeners.push(fn), $rootScope.$evalAsync(function() {
                                    listeners.$$inter || !attrs.hasOwnProperty(key) || isUndefined(attrs[key]) || fn(attrs[key])
                                }),
                                function() {
                                    arrayRemove(listeners, fn)
                                }
                        }
                    };
                    var startSymbol = $interpolate.startSymbol(),
                        endSymbol = $interpolate.endSymbol(),
                        denormalizeTemplate = "{{" === startSymbol && "}}" === endSymbol ? identity : function(template) {
                            return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol)
                        },
                        NG_ATTR_BINDING = /^ngAttr[A-Z]/,
                        MULTI_ELEMENT_DIR_RE = /^(.+)Start$/;
                    return compile.$$addBindingInfo = debugInfoEnabled ? function($element, binding) {
                        var bindings = $element.data("$binding") || [];
                        isArray(binding) ? bindings = bindings.concat(binding) : bindings.push(binding), $element.data("$binding", bindings)
                    } : noop, compile.$$addBindingClass = debugInfoEnabled ? function($element) {
                        safeAddClass($element, "ng-binding")
                    } : noop, compile.$$addScopeInfo = debugInfoEnabled ? function($element, scope, isolated, noTemplate) {
                        var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                        $element.data(dataName, scope)
                    } : noop, compile.$$addScopeClass = debugInfoEnabled ? function($element, isolated) {
                        safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope")
                    } : noop, compile.$$createComment = function(directiveName, comment) {
                        var content = "";
                        return debugInfoEnabled && (content = " " + (directiveName || "") + ": ", comment && (content += comment + " ")), window.document.createComment(content)
                    }, compile
                }]
            }

            function SimpleChange(previous, current) {
                this.previousValue = previous, this.currentValue = current
            }

            function directiveNormalize(name) {
                return camelCase(name.replace(PREFIX_REGEXP, ""))
            }

            function tokenDifference(str1, str2) {
                var values = "",
                    tokens1 = str1.split(/\s+/),
                    tokens2 = str2.split(/\s+/);
                outer: for (var i = 0; i < tokens1.length; i++) {
                    for (var token = tokens1[i], j = 0; j < tokens2.length; j++)
                        if (token === tokens2[j]) continue outer;
                    values += (values.length > 0 ? " " : "") + token
                }
                return values
            }

            function removeComments(jqNodes) {
                jqNodes = jqLite(jqNodes);
                var i = jqNodes.length;
                if (i <= 1) return jqNodes;
                for (; i--;) {
                    var node = jqNodes[i];
                    node.nodeType === NODE_TYPE_COMMENT && splice.call(jqNodes, i, 1)
                }
                return jqNodes
            }

            function identifierForController(controller, ident) {
                if (ident && isString(ident)) return ident;
                if (isString(controller)) {
                    var match = CNTRL_REG.exec(controller);
                    if (match) return match[3]
                }
            }

            function $ControllerProvider() {
                var controllers = {},
                    globals = !1;
                this.has = function(name) {
                    return controllers.hasOwnProperty(name)
                }, this.register = function(name, constructor) {
                    assertNotHasOwnProperty(name, "controller"), isObject(name) ? extend(controllers, name) : controllers[name] = constructor
                }, this.allowGlobals = function() {
                    globals = !0
                }, this.$get = ["$injector", "$window", function($injector, $window) {
                    function addIdentifier(locals, identifier, instance, name) {
                        if (!locals || !isObject(locals.$scope)) throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                        locals.$scope[identifier] = instance
                    }
                    return function(expression, locals, later, ident) {
                        var instance, match, constructor, identifier;
                        if (later = later === !0, ident && isString(ident) && (identifier = ident), isString(expression)) {
                            if (match = expression.match(CNTRL_REG), !match) throw $controllerMinErr("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", expression);
                            constructor = match[1], identifier = identifier || match[3], expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, !0) || (globals ? getter($window, constructor, !0) : void 0), assertArgFn(expression, constructor, !0)
                        }
                        if (later) {
                            var controllerPrototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                            return instance = Object.create(controllerPrototype || null), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), extend(function() {
                                var result = $injector.invoke(expression, instance, locals, constructor);
                                return result !== instance && (isObject(result) || isFunction(result)) && (instance = result, identifier && addIdentifier(locals, identifier, instance, constructor || expression.name)), instance
                            }, {
                                instance: instance,
                                identifier: identifier
                            })
                        }
                        return instance = $injector.instantiate(expression, locals, constructor), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), instance
                    }
                }]
            }

            function $DocumentProvider() {
                this.$get = ["$window", function(window) {
                    return jqLite(window.document)
                }]
            }

            function $ExceptionHandlerProvider() {
                this.$get = ["$log", function($log) {
                    return function(exception, cause) {
                        $log.error.apply($log, arguments)
                    }
                }]
            }

            function serializeValue(v) {
                return isObject(v) ? isDate(v) ? v.toISOString() : toJson(v) : v
            }

            function $HttpParamSerializerProvider() {
                this.$get = function() {
                    return function(params) {
                        if (!params) return "";
                        var parts = [];
                        return forEachSorted(params, function(value, key) {
                            null === value || isUndefined(value) || (isArray(value) ? forEach(value, function(v) {
                                parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(v)))
                            }) : parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(value))))
                        }), parts.join("&")
                    }
                }
            }

            function $HttpParamSerializerJQLikeProvider() {
                this.$get = function() {
                    return function(params) {
                        function serialize(toSerialize, prefix, topLevel) {
                            null === toSerialize || isUndefined(toSerialize) || (isArray(toSerialize) ? forEach(toSerialize, function(value, index) {
                                serialize(value, prefix + "[" + (isObject(value) ? index : "") + "]")
                            }) : isObject(toSerialize) && !isDate(toSerialize) ? forEachSorted(toSerialize, function(value, key) {
                                serialize(value, prefix + (topLevel ? "" : "[") + key + (topLevel ? "" : "]"))
                            }) : parts.push(encodeUriQuery(prefix) + "=" + encodeUriQuery(serializeValue(toSerialize))))
                        }
                        if (!params) return "";
                        var parts = [];
                        return serialize(params, "", !0), parts.join("&")
                    }
                }
            }

            function defaultHttpResponseTransform(data, headers) {
                if (isString(data)) {
                    var tempData = data.replace(JSON_PROTECTION_PREFIX, "").trim();
                    if (tempData) {
                        var contentType = headers("Content-Type");
                        (contentType && 0 === contentType.indexOf(APPLICATION_JSON) || isJsonLike(tempData)) && (data = fromJson(tempData))
                    }
                }
                return data
            }

            function isJsonLike(str) {
                var jsonStart = str.match(JSON_START);
                return jsonStart && JSON_ENDS[jsonStart[0]].test(str)
            }

            function parseHeaders(headers) {
                function fillInParsed(key, val) {
                    key && (parsed[key] = parsed[key] ? parsed[key] + ", " + val : val)
                }
                var i, parsed = createMap();
                return isString(headers) ? forEach(headers.split("\n"), function(line) {
                    i = line.indexOf(":"), fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)))
                }) : isObject(headers) && forEach(headers, function(headerVal, headerKey) {
                    fillInParsed(lowercase(headerKey), trim(headerVal))
                }), parsed
            }

            function headersGetter(headers) {
                var headersObj;
                return function(name) {
                    if (headersObj || (headersObj = parseHeaders(headers)), name) {
                        var value = headersObj[lowercase(name)];
                        return void 0 === value && (value = null), value
                    }
                    return headersObj
                }
            }

            function transformData(data, headers, status, fns) {
                return isFunction(fns) ? fns(data, headers, status) : (forEach(fns, function(fn) {
                    data = fn(data, headers, status)
                }), data)
            }

            function isSuccess(status) {
                return 200 <= status && status < 300
            }

            function $HttpProvider() {
                var defaults = this.defaults = {
                        transformResponse: [defaultHttpResponseTransform],
                        transformRequest: [function(d) {
                            return !isObject(d) || isFile(d) || isBlob(d) || isFormData(d) ? d : toJson(d)
                        }],
                        headers: {
                            common: {
                                Accept: "application/json, text/plain, */*"
                            },
                            post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                            put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                            patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
                        },
                        xsrfCookieName: "XSRF-TOKEN",
                        xsrfHeaderName: "X-XSRF-TOKEN",
                        paramSerializer: "$httpParamSerializer"
                    },
                    useApplyAsync = !1;
                this.useApplyAsync = function(value) {
                    return isDefined(value) ? (useApplyAsync = !!value, this) : useApplyAsync
                };
                var useLegacyPromise = !0;
                this.useLegacyPromiseExtensions = function(value) {
                    return isDefined(value) ? (useLegacyPromise = !!value, this) : useLegacyPromise
                };
                var interceptorFactories = this.interceptors = [];
                this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function($httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector) {
                    function $http(requestConfig) {
                        function chainInterceptors(promise, interceptors) {
                            for (var i = 0, ii = interceptors.length; i < ii;) {
                                var thenFn = interceptors[i++],
                                    rejectFn = interceptors[i++];
                                promise = promise.then(thenFn, rejectFn)
                            }
                            return interceptors.length = 0, promise
                        }

                        function executeHeaderFns(headers, config) {
                            var headerContent, processedHeaders = {};
                            return forEach(headers, function(headerFn, header) {
                                isFunction(headerFn) ? (headerContent = headerFn(config), null != headerContent && (processedHeaders[header] = headerContent)) : processedHeaders[header] = headerFn
                            }), processedHeaders
                        }

                        function mergeHeaders(config) {
                            var defHeaderName, lowercaseDefHeaderName, reqHeaderName, defHeaders = defaults.headers,
                                reqHeaders = extend({}, config.headers);
                            defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                            defaultHeadersIteration: for (defHeaderName in defHeaders) {
                                lowercaseDefHeaderName = lowercase(defHeaderName);
                                for (reqHeaderName in reqHeaders)
                                    if (lowercase(reqHeaderName) === lowercaseDefHeaderName) continue defaultHeadersIteration;
                                reqHeaders[defHeaderName] = defHeaders[defHeaderName]
                            }
                            return executeHeaderFns(reqHeaders, shallowCopy(config))
                        }

                        function serverRequest(config) {
                            var headers = config.headers,
                                reqData = transformData(config.data, headersGetter(headers), void 0, config.transformRequest);
                            return isUndefined(reqData) && forEach(headers, function(value, header) {
                                "content-type" === lowercase(header) && delete headers[header]
                            }), isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials) && (config.withCredentials = defaults.withCredentials), sendReq(config, reqData).then(transformResponse, transformResponse)
                        }

                        function transformResponse(response) {
                            var resp = extend({}, response);
                            return resp.data = transformData(response.data, response.headers, response.status, config.transformResponse), isSuccess(response.status) ? resp : $q.reject(resp)
                        }
                        if (!isObject(requestConfig)) throw minErr("$http")("badreq", "Http request configuration must be an object.  Received: {0}", requestConfig);
                        if (!isString(requestConfig.url)) throw minErr("$http")("badreq", "Http request configuration url must be a string.  Received: {0}", requestConfig.url);
                        var config = extend({
                            method: "get",
                            transformRequest: defaults.transformRequest,
                            transformResponse: defaults.transformResponse,
                            paramSerializer: defaults.paramSerializer
                        }, requestConfig);
                        config.headers = mergeHeaders(requestConfig), config.method = uppercase(config.method), config.paramSerializer = isString(config.paramSerializer) ? $injector.get(config.paramSerializer) : config.paramSerializer;
                        var requestInterceptors = [],
                            responseInterceptors = [],
                            promise = $q.when(config);
                        return forEach(reversedInterceptors, function(interceptor) {
                            (interceptor.request || interceptor.requestError) && requestInterceptors.unshift(interceptor.request, interceptor.requestError), (interceptor.response || interceptor.responseError) && responseInterceptors.push(interceptor.response, interceptor.responseError)
                        }), promise = chainInterceptors(promise, requestInterceptors), promise = promise.then(serverRequest), promise = chainInterceptors(promise, responseInterceptors), useLegacyPromise ? (promise.success = function(fn) {
                            return assertArgFn(fn, "fn"), promise.then(function(response) {
                                fn(response.data, response.status, response.headers, config)
                            }), promise
                        }, promise.error = function(fn) {
                            return assertArgFn(fn, "fn"), promise.then(null, function(response) {
                                fn(response.data, response.status, response.headers, config)
                            }), promise
                        }) : (promise.success = $httpMinErrLegacyFn("success"), promise.error = $httpMinErrLegacyFn("error")), promise
                    }

                    function createShortMethods(names) {
                        forEach(arguments, function(name) {
                            $http[name] = function(url, config) {
                                return $http(extend({}, config || {}, {
                                    method: name,
                                    url: url
                                }))
                            }
                        })
                    }

                    function createShortMethodsWithData(name) {
                        forEach(arguments, function(name) {
                            $http[name] = function(url, data, config) {
                                return $http(extend({}, config || {}, {
                                    method: name,
                                    url: url,
                                    data: data
                                }))
                            }
                        })
                    }

                    function sendReq(config, reqData) {
                        function createApplyHandlers(eventHandlers) {
                            if (eventHandlers) {
                                var applyHandlers = {};
                                return forEach(eventHandlers, function(eventHandler, key) {
                                    applyHandlers[key] = function(event) {
                                        function callEventHandler() {
                                            eventHandler(event)
                                        }
                                        useApplyAsync ? $rootScope.$applyAsync(callEventHandler) : $rootScope.$$phase ? callEventHandler() : $rootScope.$apply(callEventHandler)
                                    }
                                }), applyHandlers
                            }
                        }

                        function done(status, response, headersString, statusText) {
                            function resolveHttpPromise() {
                                resolvePromise(response, status, headersString, statusText)
                            }
                            cache && (isSuccess(status) ? cache.put(url, [status, response, parseHeaders(headersString), statusText]) : cache.remove(url)), useApplyAsync ? $rootScope.$applyAsync(resolveHttpPromise) : (resolveHttpPromise(), $rootScope.$$phase || $rootScope.$apply())
                        }

                        function resolvePromise(response, status, headers, statusText) {
                            status = status >= -1 ? status : 0, (isSuccess(status) ? deferred.resolve : deferred.reject)({
                                data: response,
                                status: status,
                                headers: headersGetter(headers),
                                config: config,
                                statusText: statusText
                            })
                        }

                        function resolvePromiseWithResult(result) {
                            resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText)
                        }

                        function removePendingReq() {
                            var idx = $http.pendingRequests.indexOf(config);
                            idx !== -1 && $http.pendingRequests.splice(idx, 1)
                        }
                        var cache, cachedResp, deferred = $q.defer(),
                            promise = deferred.promise,
                            reqHeaders = config.headers,
                            url = buildUrl(config.url, config.paramSerializer(config.params));
                        if ($http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), !config.cache && !defaults.cache || config.cache === !1 || "GET" !== config.method && "JSONP" !== config.method || (cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache), cache && (cachedResp = cache.get(url), isDefined(cachedResp) ? isPromiseLike(cachedResp) ? cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult) : isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]) : resolvePromise(cachedResp, 200, {}, "OK") : cache.put(url, promise)), isUndefined(cachedResp)) {
                            var xsrfValue = urlIsSameOrigin(config.url) ? $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName] : void 0;
                            xsrfValue && (reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue), $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType, createApplyHandlers(config.eventHandlers), createApplyHandlers(config.uploadEventHandlers))
                        }
                        return promise
                    }

                    function buildUrl(url, serializedParams) {
                        return serializedParams.length > 0 && (url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams), url
                    }
                    var defaultCache = $cacheFactory("$http");
                    defaults.paramSerializer = isString(defaults.paramSerializer) ? $injector.get(defaults.paramSerializer) : defaults.paramSerializer;
                    var reversedInterceptors = [];
                    return forEach(interceptorFactories, function(interceptorFactory) {
                        reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory))
                    }), $http.pendingRequests = [], createShortMethods("get", "delete", "head", "jsonp"), createShortMethodsWithData("post", "put", "patch"), $http.defaults = defaults, $http
                }]
            }

            function $xhrFactoryProvider() {
                this.$get = function() {
                    return function() {
                        return new window.XMLHttpRequest
                    }
                }
            }

            function $HttpBackendProvider() {
                this.$get = ["$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function($browser, $jsonpCallbacks, $document, $xhrFactory) {
                    return createHttpBackend($browser, $xhrFactory, $browser.defer, $jsonpCallbacks, $document[0])
                }]
            }

            function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
                function jsonpReq(url, callbackPath, done) {
                    url = url.replace("JSON_CALLBACK", callbackPath);
                    var script = rawDocument.createElement("script"),
                        callback = null;
                    return script.type = "text/javascript", script.src = url, script.async = !0, callback = function(event) {
                        removeEventListenerFn(script, "load", callback), removeEventListenerFn(script, "error", callback), rawDocument.body.removeChild(script), script = null;
                        var status = -1,
                            text = "unknown";
                        event && ("load" !== event.type || callbacks.wasCalled(callbackPath) || (event = {
                            type: "error"
                        }), text = event.type, status = "error" === event.type ? 404 : 200), done && done(status, text)
                    }, addEventListenerFn(script, "load", callback), addEventListenerFn(script, "error", callback), rawDocument.body.appendChild(script), callback
                }
                return function(method, url, post, callback, headers, timeout, withCredentials, responseType, eventHandlers, uploadEventHandlers) {
                    function timeoutRequest() {
                        jsonpDone && jsonpDone(), xhr && xhr.abort()
                    }

                    function completeRequest(callback, status, response, headersString, statusText) {
                        isDefined(timeoutId) && $browserDefer.cancel(timeoutId), jsonpDone = xhr = null, callback(status, response, headersString, statusText), $browser.$$completeOutstandingRequest(noop)
                    }
                    if ($browser.$$incOutstandingRequestCount(), url = url || $browser.url(), "jsonp" === lowercase(method)) var callbackPath = callbacks.createCallback(url),
                        jsonpDone = jsonpReq(url, callbackPath, function(status, text) {
                            var response = 200 === status && callbacks.getResponse(callbackPath);
                            completeRequest(callback, status, response, "", text), callbacks.removeCallback(callbackPath)
                        });
                    else {
                        var xhr = createXhr(method, url);
                        xhr.open(method, url, !0), forEach(headers, function(value, key) {
                            isDefined(value) && xhr.setRequestHeader(key, value)
                        }), xhr.onload = function() {
                            var statusText = xhr.statusText || "",
                                response = "response" in xhr ? xhr.response : xhr.responseText,
                                status = 1223 === xhr.status ? 204 : xhr.status;
                            0 === status && (status = response ? 200 : "file" === urlResolve(url).protocol ? 404 : 0), completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText)
                        };
                        var requestError = function() {
                            completeRequest(callback, -1, null, null, "")
                        };
                        if (xhr.onerror = requestError, xhr.onabort = requestError, xhr.ontimeout = requestError, forEach(eventHandlers, function(value, key) {
                                xhr.addEventListener(key, value)
                            }), forEach(uploadEventHandlers, function(value, key) {
                                xhr.upload.addEventListener(key, value)
                            }), withCredentials && (xhr.withCredentials = !0), responseType) try {
                            xhr.responseType = responseType
                        } catch (e) {
                            if ("json" !== responseType) throw e
                        }
                        xhr.send(isUndefined(post) ? null : post)
                    }
                    if (timeout > 0) var timeoutId = $browserDefer(timeoutRequest, timeout);
                    else isPromiseLike(timeout) && timeout.then(timeoutRequest)
                }
            }

            function $InterpolateProvider() {
                var startSymbol = "{{",
                    endSymbol = "}}";
                this.startSymbol = function(value) {
                    return value ? (startSymbol = value, this) : startSymbol
                }, this.endSymbol = function(value) {
                    return value ? (endSymbol = value, this) : endSymbol
                }, this.$get = ["$parse", "$exceptionHandler", "$sce", function($parse, $exceptionHandler, $sce) {
                    function escape(ch) {
                        return "\\\\\\" + ch
                    }

                    function unescapeText(text) {
                        return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol)
                    }

                    function stringify(value) {
                        if (null == value) return "";
                        switch (typeof value) {
                            case "string":
                                break;
                            case "number":
                                value = "" + value;
                                break;
                            default:
                                value = toJson(value)
                        }
                        return value
                    }

                    function constantWatchDelegate(scope, listener, objectEquality, constantInterp) {
                        var unwatch = scope.$watch(function(scope) {
                            return unwatch(), constantInterp(scope)
                        }, listener, objectEquality);
                        return unwatch
                    }

                    function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                        function parseStringifyInterceptor(value) {
                            try {
                                return value = getValue(value), allOrNothing && !isDefined(value) ? value : stringify(value)
                            } catch (err) {
                                $exceptionHandler($interpolateMinErr.interr(text, err))
                            }
                        }
                        if (!text.length || text.indexOf(startSymbol) === -1) {
                            var constantInterp;
                            if (!mustHaveExpression) {
                                var unescapedText = unescapeText(text);
                                constantInterp = valueFn(unescapedText), constantInterp.exp = text, constantInterp.expressions = [], constantInterp.$$watchDelegate = constantWatchDelegate
                            }
                            return constantInterp
                        }
                        allOrNothing = !!allOrNothing;
                        for (var startIndex, endIndex, exp, index = 0, expressions = [], parseFns = [], textLength = text.length, concat = [], expressionPositions = []; index < textLength;) {
                            if ((startIndex = text.indexOf(startSymbol, index)) === -1 || (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) === -1) {
                                index !== textLength && concat.push(unescapeText(text.substring(index)));
                                break
                            }
                            index !== startIndex && concat.push(unescapeText(text.substring(index, startIndex))), exp = text.substring(startIndex + startSymbolLength, endIndex), expressions.push(exp), parseFns.push($parse(exp, parseStringifyInterceptor)), index = endIndex + endSymbolLength, expressionPositions.push(concat.length), concat.push("")
                        }
                        if (trustedContext && concat.length > 1 && $interpolateMinErr.throwNoconcat(text), !mustHaveExpression || expressions.length) {
                            var compute = function(values) {
                                    for (var i = 0, ii = expressions.length; i < ii; i++) {
                                        if (allOrNothing && isUndefined(values[i])) return;
                                        concat[expressionPositions[i]] = values[i]
                                    }
                                    return concat.join("")
                                },
                                getValue = function(value) {
                                    return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value)
                                };
                            return extend(function(context) {
                                var i = 0,
                                    ii = expressions.length,
                                    values = new Array(ii);
                                try {
                                    for (; i < ii; i++) values[i] = parseFns[i](context);
                                    return compute(values)
                                } catch (err) {
                                    $exceptionHandler($interpolateMinErr.interr(text, err))
                                }
                            }, {
                                exp: text,
                                expressions: expressions,
                                $$watchDelegate: function(scope, listener) {
                                    var lastValue;
                                    return scope.$watchGroup(parseFns, function(values, oldValues) {
                                        var currValue = compute(values);
                                        isFunction(listener) && listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope), lastValue = currValue
                                    })
                                }
                            })
                        }
                    }
                    var startSymbolLength = startSymbol.length,
                        endSymbolLength = endSymbol.length,
                        escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"),
                        escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
                    return $interpolate.startSymbol = function() {
                        return startSymbol
                    }, $interpolate.endSymbol = function() {
                        return endSymbol
                    }, $interpolate
                }]
            }

            function $IntervalProvider() {
                this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function($rootScope, $window, $q, $$q, $browser) {
                    function interval(fn, delay, count, invokeApply) {
                        function callback() {
                            hasParams ? fn.apply(null, args) : fn(iteration)
                        }
                        var hasParams = arguments.length > 4,
                            args = hasParams ? sliceArgs(arguments, 4) : [],
                            setInterval = $window.setInterval,
                            clearInterval = $window.clearInterval,
                            iteration = 0,
                            skipApply = isDefined(invokeApply) && !invokeApply,
                            deferred = (skipApply ? $$q : $q).defer(),
                            promise = deferred.promise;
                        return count = isDefined(count) ? count : 0, promise.$$intervalId = setInterval(function() {
                            skipApply ? $browser.defer(callback) : $rootScope.$evalAsync(callback), deferred.notify(iteration++), count > 0 && iteration >= count && (deferred.resolve(iteration), clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId]), skipApply || $rootScope.$apply()
                        }, delay), intervals[promise.$$intervalId] = deferred, promise
                    }
                    var intervals = {};
                    return interval.cancel = function(promise) {
                        return !!(promise && promise.$$intervalId in intervals) && (intervals[promise.$$intervalId].reject("canceled"), $window.clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId], !0)
                    }, interval
                }]
            }

            function encodePath(path) {
                for (var segments = path.split("/"), i = segments.length; i--;) segments[i] = encodeUriSegment(segments[i]);
                return segments.join("/")
            }

            function parseAbsoluteUrl(absoluteUrl, locationObj) {
                var parsedUrl = urlResolve(absoluteUrl);
                locationObj.$$protocol = parsedUrl.protocol, locationObj.$$host = parsedUrl.hostname, locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null
            }

            function parseAppUrl(url, locationObj) {
                if (DOUBLE_SLASH_REGEX.test(url)) throw $locationMinErr("badpath", 'Invalid url "{0}".', url);
                var prefixed = "/" !== url.charAt(0);
                prefixed && (url = "/" + url);
                var match = urlResolve(url);
                locationObj.$$path = decodeURIComponent(prefixed && "/" === match.pathname.charAt(0) ? match.pathname.substring(1) : match.pathname), locationObj.$$search = parseKeyValue(match.search), locationObj.$$hash = decodeURIComponent(match.hash), locationObj.$$path && "/" !== locationObj.$$path.charAt(0) && (locationObj.$$path = "/" + locationObj.$$path)
            }

            function startsWith(haystack, needle) {
                return 0 === haystack.lastIndexOf(needle, 0)
            }

            function stripBaseUrl(base, url) {
                if (startsWith(url, base)) return url.substr(base.length)
            }

            function stripHash(url) {
                var index = url.indexOf("#");
                return index === -1 ? url : url.substr(0, index)
            }

            function trimEmptyHash(url) {
                return url.replace(/(#.+)|#$/, "$1")
            }

            function stripFile(url) {
                return url.substr(0, stripHash(url).lastIndexOf("/") + 1)
            }

            function serverBase(url) {
                return url.substring(0, url.indexOf("/", url.indexOf("//") + 2))
            }

            function LocationHtml5Url(appBase, appBaseNoFile, basePrefix) {
                this.$$html5 = !0, basePrefix = basePrefix || "", parseAbsoluteUrl(appBase, this), this.$$parse = function(url) {
                    var pathUrl = stripBaseUrl(appBaseNoFile, url);
                    if (!isString(pathUrl)) throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
                    parseAppUrl(pathUrl, this), this.$$path || (this.$$path = "/"), this.$$compose()
                }, this.$$compose = function() {
                    var search = toKeyValue(this.$$search),
                        hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
                    this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBaseNoFile + this.$$url.substr(1)
                }, this.$$parseLinkUrl = function(url, relHref) {
                    if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
                    var appUrl, prevAppUrl, rewrittenUrl;
                    return isDefined(appUrl = stripBaseUrl(appBase, url)) ? (prevAppUrl = appUrl, rewrittenUrl = basePrefix && isDefined(appUrl = stripBaseUrl(basePrefix, appUrl)) ? appBaseNoFile + (stripBaseUrl("/", appUrl) || appUrl) : appBase + prevAppUrl) : isDefined(appUrl = stripBaseUrl(appBaseNoFile, url)) ? rewrittenUrl = appBaseNoFile + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl
                }
            }

            function LocationHashbangUrl(appBase, appBaseNoFile, hashPrefix) {
                parseAbsoluteUrl(appBase, this), this.$$parse = function(url) {
                    function removeWindowsDriveName(path, url, base) {
                        var firstPathSegmentMatch, windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                        return startsWith(url, base) && (url = url.replace(base, "")), windowsFilePathExp.exec(url) ? path : (firstPathSegmentMatch = windowsFilePathExp.exec(path), firstPathSegmentMatch ? firstPathSegmentMatch[1] : path)
                    }
                    var withoutHashUrl, withoutBaseUrl = stripBaseUrl(appBase, url) || stripBaseUrl(appBaseNoFile, url);
                    isUndefined(withoutBaseUrl) || "#" !== withoutBaseUrl.charAt(0) ? this.$$html5 ? withoutHashUrl = withoutBaseUrl : (withoutHashUrl = "", isUndefined(withoutBaseUrl) && (appBase = url, this.replace())) : (withoutHashUrl = stripBaseUrl(hashPrefix, withoutBaseUrl), isUndefined(withoutHashUrl) && (withoutHashUrl = withoutBaseUrl)),
                        parseAppUrl(withoutHashUrl, this), this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase), this.$$compose()
                }, this.$$compose = function() {
                    var search = toKeyValue(this.$$search),
                        hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
                    this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "")
                }, this.$$parseLinkUrl = function(url, relHref) {
                    return stripHash(appBase) === stripHash(url) && (this.$$parse(url), !0)
                }
            }

            function LocationHashbangInHtml5Url(appBase, appBaseNoFile, hashPrefix) {
                this.$$html5 = !0, LocationHashbangUrl.apply(this, arguments), this.$$parseLinkUrl = function(url, relHref) {
                    if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
                    var rewrittenUrl, appUrl;
                    return appBase === stripHash(url) ? rewrittenUrl = url : (appUrl = stripBaseUrl(appBaseNoFile, url)) ? rewrittenUrl = appBase + hashPrefix + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl
                }, this.$$compose = function() {
                    var search = toKeyValue(this.$$search),
                        hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
                    this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + hashPrefix + this.$$url
                }
            }

            function locationGetter(property) {
                return function() {
                    return this[property]
                }
            }

            function locationGetterSetter(property, preprocess) {
                return function(value) {
                    return isUndefined(value) ? this[property] : (this[property] = preprocess(value), this.$$compose(), this)
                }
            }

            function $LocationProvider() {
                var hashPrefix = "",
                    html5Mode = {
                        enabled: !1,
                        requireBase: !0,
                        rewriteLinks: !0
                    };
                this.hashPrefix = function(prefix) {
                    return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix
                }, this.html5Mode = function(mode) {
                    return isBoolean(mode) ? (html5Mode.enabled = mode, this) : isObject(mode) ? (isBoolean(mode.enabled) && (html5Mode.enabled = mode.enabled), isBoolean(mode.requireBase) && (html5Mode.requireBase = mode.requireBase), isBoolean(mode.rewriteLinks) && (html5Mode.rewriteLinks = mode.rewriteLinks), this) : html5Mode
                }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function($rootScope, $browser, $sniffer, $rootElement, $window) {
                    function setBrowserUrlWithFallback(url, replace, state) {
                        var oldUrl = $location.url(),
                            oldState = $location.$$state;
                        try {
                            $browser.url(url, replace, state), $location.$$state = $browser.state()
                        } catch (e) {
                            throw $location.url(oldUrl), $location.$$state = oldState, e
                        }
                    }

                    function afterLocationChange(oldUrl, oldState) {
                        $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState)
                    }
                    var $location, LocationMode, appBase, baseHref = $browser.baseHref(),
                        initialUrl = $browser.url();
                    if (html5Mode.enabled) {
                        if (!baseHref && html5Mode.requireBase) throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                        appBase = serverBase(initialUrl) + (baseHref || "/"), LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url
                    } else appBase = stripHash(initialUrl), LocationMode = LocationHashbangUrl;
                    var appBaseNoFile = stripFile(appBase);
                    $location = new LocationMode(appBase, appBaseNoFile, "#" + hashPrefix), $location.$$parseLinkUrl(initialUrl, initialUrl), $location.$$state = $browser.state();
                    var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
                    $rootElement.on("click", function(event) {
                        if (html5Mode.rewriteLinks && !event.ctrlKey && !event.metaKey && !event.shiftKey && 2 !== event.which && 2 !== event.button) {
                            for (var elm = jqLite(event.target);
                                "a" !== nodeName_(elm[0]);)
                                if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                            var absHref = elm.prop("href"),
                                relHref = elm.attr("href") || elm.attr("xlink:href");
                            isObject(absHref) && "[object SVGAnimatedString]" === absHref.toString() && (absHref = urlResolve(absHref.animVal).href), IGNORE_URI_REGEXP.test(absHref) || !absHref || elm.attr("target") || event.isDefaultPrevented() || $location.$$parseLinkUrl(absHref, relHref) && (event.preventDefault(), $location.absUrl() !== $browser.url() && ($rootScope.$apply(), $window.angular["ff-684208-preventDefault"] = !0))
                        }
                    }), trimEmptyHash($location.absUrl()) !== trimEmptyHash(initialUrl) && $browser.url($location.absUrl(), !0);
                    var initializing = !0;
                    return $browser.onUrlChange(function(newUrl, newState) {
                        return isUndefined(stripBaseUrl(appBaseNoFile, newUrl)) ? void($window.location.href = newUrl) : ($rootScope.$evalAsync(function() {
                            var defaultPrevented, oldUrl = $location.absUrl(),
                                oldState = $location.$$state;
                            newUrl = trimEmptyHash(newUrl), $location.$$parse(newUrl), $location.$$state = newState, defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented, $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), $location.$$state = oldState, setBrowserUrlWithFallback(oldUrl, !1, oldState)) : (initializing = !1, afterLocationChange(oldUrl, oldState)))
                        }), void($rootScope.$$phase || $rootScope.$digest()))
                    }), $rootScope.$watch(function() {
                        var oldUrl = trimEmptyHash($browser.url()),
                            newUrl = trimEmptyHash($location.absUrl()),
                            oldState = $browser.state(),
                            currentReplace = $location.$$replace,
                            urlOrStateChanged = oldUrl !== newUrl || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                        (initializing || urlOrStateChanged) && (initializing = !1, $rootScope.$evalAsync(function() {
                            var newUrl = $location.absUrl(),
                                defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, $location.$$state, oldState).defaultPrevented;
                            $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), $location.$$state = oldState) : (urlOrStateChanged && setBrowserUrlWithFallback(newUrl, currentReplace, oldState === $location.$$state ? null : $location.$$state), afterLocationChange(oldUrl, oldState)))
                        })), $location.$$replace = !1
                    }), $location
                }]
            }

            function $LogProvider() {
                var debug = !0,
                    self = this;
                this.debugEnabled = function(flag) {
                    return isDefined(flag) ? (debug = flag, this) : debug
                }, this.$get = ["$window", function($window) {
                    function formatError(arg) {
                        return arg instanceof Error && (arg.stack ? arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? "Error: " + arg.message + "\n" + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line)), arg
                    }

                    function consoleLog(type) {
                        var console = $window.console || {},
                            logFn = console[type] || console.log || noop,
                            hasApply = !1;
                        try {
                            hasApply = !!logFn.apply
                        } catch (e) {}
                        return hasApply ? function() {
                            var args = [];
                            return forEach(arguments, function(arg) {
                                args.push(formatError(arg))
                            }), logFn.apply(console, args)
                        } : function(arg1, arg2) {
                            logFn(arg1, null == arg2 ? "" : arg2)
                        }
                    }
                    return {
                        log: consoleLog("log"),
                        info: consoleLog("info"),
                        warn: consoleLog("warn"),
                        error: consoleLog("error"),
                        debug: function() {
                            var fn = consoleLog("debug");
                            return function() {
                                debug && fn.apply(self, arguments)
                            }
                        }()
                    }
                }]
            }

            function ensureSafeMemberName(name, fullExpression) {
                if ("__defineGetter__" === name || "__defineSetter__" === name || "__lookupGetter__" === name || "__lookupSetter__" === name || "__proto__" === name) throw $parseMinErr("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", fullExpression);
                return name
            }

            function getStringValue(name) {
                return name + ""
            }

            function ensureSafeObject(obj, fullExpression) {
                if (obj) {
                    if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
                    if (obj.window === obj) throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
                    if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression);
                    if (obj === Object) throw $parseMinErr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", fullExpression)
                }
                return obj
            }

            function ensureSafeFunction(obj, fullExpression) {
                if (obj) {
                    if (obj.constructor === obj) throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
                    if (obj === CALL || obj === APPLY || obj === BIND) throw $parseMinErr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", fullExpression)
                }
            }

            function ensureSafeAssignContext(obj, fullExpression) {
                if (obj && (obj === ARRAY_CTOR || obj === BOOLEAN_CTOR || obj === FUNCTION_CTOR || obj === NUMBER_CTOR || obj === OBJECT_CTOR || obj === STRING_CTOR || obj === ARRAY_CTOR_PROTO || obj === BOOLEAN_CTOR_PROTO || obj === FUNCTION_CTOR_PROTO || obj === NUMBER_CTOR_PROTO || obj === OBJECT_CTOR_PROTO || obj === STRING_CTOR_PROTO)) throw $parseMinErr("isecaf", "Assigning to a constructor or its prototype is disallowed! Expression: {0}", fullExpression)
            }

            function ifDefined(v, d) {
                return "undefined" != typeof v ? v : d
            }

            function plusFn(l, r) {
                return "undefined" == typeof l ? r : "undefined" == typeof r ? l : l + r
            }

            function isStateless($filter, filterName) {
                var fn = $filter(filterName);
                return !fn.$stateful
            }

            function findConstantAndWatchExpressions(ast, $filter) {
                var allConstants, argsToWatch, isStatelessFilter;
                switch (ast.type) {
                    case AST.Program:
                        allConstants = !0, forEach(ast.body, function(expr) {
                            findConstantAndWatchExpressions(expr.expression, $filter), allConstants = allConstants && expr.expression.constant
                        }), ast.constant = allConstants;
                        break;
                    case AST.Literal:
                        ast.constant = !0, ast.toWatch = [];
                        break;
                    case AST.UnaryExpression:
                        findConstantAndWatchExpressions(ast.argument, $filter), ast.constant = ast.argument.constant, ast.toWatch = ast.argument.toWatch;
                        break;
                    case AST.BinaryExpression:
                        findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.left.toWatch.concat(ast.right.toWatch);
                        break;
                    case AST.LogicalExpression:
                        findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.constant ? [] : [ast];
                        break;
                    case AST.ConditionalExpression:
                        findConstantAndWatchExpressions(ast.test, $filter), findConstantAndWatchExpressions(ast.alternate, $filter), findConstantAndWatchExpressions(ast.consequent, $filter), ast.constant = ast.test.constant && ast.alternate.constant && ast.consequent.constant, ast.toWatch = ast.constant ? [] : [ast];
                        break;
                    case AST.Identifier:
                        ast.constant = !1, ast.toWatch = [ast];
                        break;
                    case AST.MemberExpression:
                        findConstantAndWatchExpressions(ast.object, $filter), ast.computed && findConstantAndWatchExpressions(ast.property, $filter), ast.constant = ast.object.constant && (!ast.computed || ast.property.constant), ast.toWatch = [ast];
                        break;
                    case AST.CallExpression:
                        isStatelessFilter = !!ast.filter && isStateless($filter, ast.callee.name), allConstants = isStatelessFilter, argsToWatch = [], forEach(ast.arguments, function(expr) {
                            findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch)
                        }), ast.constant = allConstants, ast.toWatch = isStatelessFilter ? argsToWatch : [ast];
                        break;
                    case AST.AssignmentExpression:
                        findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = [ast];
                        break;
                    case AST.ArrayExpression:
                        allConstants = !0, argsToWatch = [], forEach(ast.elements, function(expr) {
                            findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch)
                        }), ast.constant = allConstants, ast.toWatch = argsToWatch;
                        break;
                    case AST.ObjectExpression:
                        allConstants = !0, argsToWatch = [], forEach(ast.properties, function(property) {
                            findConstantAndWatchExpressions(property.value, $filter), allConstants = allConstants && property.value.constant && !property.computed, property.value.constant || argsToWatch.push.apply(argsToWatch, property.value.toWatch)
                        }), ast.constant = allConstants, ast.toWatch = argsToWatch;
                        break;
                    case AST.ThisExpression:
                        ast.constant = !1, ast.toWatch = [];
                        break;
                    case AST.LocalsExpression:
                        ast.constant = !1, ast.toWatch = []
                }
            }

            function getInputs(body) {
                if (1 === body.length) {
                    var lastExpression = body[0].expression,
                        candidate = lastExpression.toWatch;
                    return 1 !== candidate.length ? candidate : candidate[0] !== lastExpression ? candidate : void 0
                }
            }

            function isAssignable(ast) {
                return ast.type === AST.Identifier || ast.type === AST.MemberExpression
            }

            function assignableAST(ast) {
                if (1 === ast.body.length && isAssignable(ast.body[0].expression)) return {
                    type: AST.AssignmentExpression,
                    left: ast.body[0].expression,
                    right: {
                        type: AST.NGValueParameter
                    },
                    operator: "="
                }
            }

            function isLiteral(ast) {
                return 0 === ast.body.length || 1 === ast.body.length && (ast.body[0].expression.type === AST.Literal || ast.body[0].expression.type === AST.ArrayExpression || ast.body[0].expression.type === AST.ObjectExpression)
            }

            function isConstant(ast) {
                return ast.constant
            }

            function ASTCompiler(astBuilder, $filter) {
                this.astBuilder = astBuilder, this.$filter = $filter
            }

            function ASTInterpreter(astBuilder, $filter) {
                this.astBuilder = astBuilder, this.$filter = $filter
            }

            function isPossiblyDangerousMemberName(name) {
                return "constructor" === name
            }

            function getValueOf(value) {
                return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value)
            }

            function $ParseProvider() {
                var identStart, identContinue, cacheDefault = createMap(),
                    cacheExpensive = createMap(),
                    literals = {
                        true: !0,
                        false: !1,
                        null: null,
                        undefined: void 0
                    };
                this.addLiteral = function(literalName, literalValue) {
                    literals[literalName] = literalValue
                }, this.setIdentifierFns = function(identifierStart, identifierContinue) {
                    return identStart = identifierStart, identContinue = identifierContinue, this
                }, this.$get = ["$filter", function($filter) {
                    function $parse(exp, interceptorFn, expensiveChecks) {
                        var parsedExpression, oneTime, cacheKey;
                        switch (expensiveChecks = expensiveChecks || runningChecksEnabled, typeof exp) {
                            case "string":
                                exp = exp.trim(), cacheKey = exp;
                                var cache = expensiveChecks ? cacheExpensive : cacheDefault;
                                if (parsedExpression = cache[cacheKey], !parsedExpression) {
                                    ":" === exp.charAt(0) && ":" === exp.charAt(1) && (oneTime = !0, exp = exp.substring(2));
                                    var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions,
                                        lexer = new Lexer(parseOptions),
                                        parser = new Parser(lexer, $filter, parseOptions);
                                    parsedExpression = parser.parse(exp), parsedExpression.constant ? parsedExpression.$$watchDelegate = constantWatchDelegate : oneTime ? parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate : parsedExpression.inputs && (parsedExpression.$$watchDelegate = inputsWatchDelegate), expensiveChecks && (parsedExpression = expensiveChecksInterceptor(parsedExpression)), cache[cacheKey] = parsedExpression
                                }
                                return addInterceptor(parsedExpression, interceptorFn);
                            case "function":
                                return addInterceptor(exp, interceptorFn);
                            default:
                                return addInterceptor(noop, interceptorFn)
                        }
                    }

                    function expensiveChecksInterceptor(fn) {
                        function expensiveCheckFn(scope, locals, assign, inputs) {
                            var expensiveCheckOldValue = runningChecksEnabled;
                            runningChecksEnabled = !0;
                            try {
                                return fn(scope, locals, assign, inputs)
                            } finally {
                                runningChecksEnabled = expensiveCheckOldValue
                            }
                        }
                        if (!fn) return fn;
                        expensiveCheckFn.$$watchDelegate = fn.$$watchDelegate, expensiveCheckFn.assign = expensiveChecksInterceptor(fn.assign), expensiveCheckFn.constant = fn.constant, expensiveCheckFn.literal = fn.literal;
                        for (var i = 0; fn.inputs && i < fn.inputs.length; ++i) fn.inputs[i] = expensiveChecksInterceptor(fn.inputs[i]);
                        return expensiveCheckFn.inputs = fn.inputs, expensiveCheckFn
                    }

                    function expressionInputDirtyCheck(newValue, oldValueOfValue) {
                        return null == newValue || null == oldValueOfValue ? newValue === oldValueOfValue : ("object" != typeof newValue || (newValue = getValueOf(newValue), "object" != typeof newValue)) && (newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue)
                    }

                    function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression, prettyPrintExpression) {
                        var lastResult, inputExpressions = parsedExpression.inputs;
                        if (1 === inputExpressions.length) {
                            var oldInputValueOf = expressionInputDirtyCheck;
                            return inputExpressions = inputExpressions[0], scope.$watch(function(scope) {
                                var newInputValue = inputExpressions(scope);
                                return expressionInputDirtyCheck(newInputValue, oldInputValueOf) || (lastResult = parsedExpression(scope, void 0, void 0, [newInputValue]), oldInputValueOf = newInputValue && getValueOf(newInputValue)), lastResult
                            }, listener, objectEquality, prettyPrintExpression)
                        }
                        for (var oldInputValueOfValues = [], oldInputValues = [], i = 0, ii = inputExpressions.length; i < ii; i++) oldInputValueOfValues[i] = expressionInputDirtyCheck, oldInputValues[i] = null;
                        return scope.$watch(function(scope) {
                            for (var changed = !1, i = 0, ii = inputExpressions.length; i < ii; i++) {
                                var newInputValue = inputExpressions[i](scope);
                                (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i]))) && (oldInputValues[i] = newInputValue, oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue))
                            }
                            return changed && (lastResult = parsedExpression(scope, void 0, void 0, oldInputValues)), lastResult
                        }, listener, objectEquality, prettyPrintExpression)
                    }

                    function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                        var unwatch, lastValue;
                        return unwatch = scope.$watch(function(scope) {
                            return parsedExpression(scope)
                        }, function(value, old, scope) {
                            lastValue = value, isFunction(listener) && listener.apply(this, arguments), isDefined(value) && scope.$$postDigest(function() {
                                isDefined(lastValue) && unwatch()
                            })
                        }, objectEquality)
                    }

                    function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                        function isAllDefined(value) {
                            var allDefined = !0;
                            return forEach(value, function(val) {
                                isDefined(val) || (allDefined = !1)
                            }), allDefined
                        }
                        var unwatch, lastValue;
                        return unwatch = scope.$watch(function(scope) {
                            return parsedExpression(scope)
                        }, function(value, old, scope) {
                            lastValue = value, isFunction(listener) && listener.call(this, value, old, scope), isAllDefined(value) && scope.$$postDigest(function() {
                                isAllDefined(lastValue) && unwatch()
                            })
                        }, objectEquality)
                    }

                    function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                        var unwatch = scope.$watch(function(scope) {
                            return unwatch(), parsedExpression(scope)
                        }, listener, objectEquality);
                        return unwatch
                    }

                    function addInterceptor(parsedExpression, interceptorFn) {
                        if (!interceptorFn) return parsedExpression;
                        var watchDelegate = parsedExpression.$$watchDelegate,
                            useInputs = !1,
                            regularWatch = watchDelegate !== oneTimeLiteralWatchDelegate && watchDelegate !== oneTimeWatchDelegate,
                            fn = regularWatch ? function(scope, locals, assign, inputs) {
                                var value = useInputs && inputs ? inputs[0] : parsedExpression(scope, locals, assign, inputs);
                                return interceptorFn(value, scope, locals)
                            } : function(scope, locals, assign, inputs) {
                                var value = parsedExpression(scope, locals, assign, inputs),
                                    result = interceptorFn(value, scope, locals);
                                return isDefined(value) ? result : value
                            };
                        return parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate ? fn.$$watchDelegate = parsedExpression.$$watchDelegate : interceptorFn.$stateful || (fn.$$watchDelegate = inputsWatchDelegate, useInputs = !parsedExpression.inputs, fn.inputs = parsedExpression.inputs ? parsedExpression.inputs : [parsedExpression]), fn
                    }
                    var noUnsafeEval = csp().noUnsafeEval,
                        $parseOptions = {
                            csp: noUnsafeEval,
                            expensiveChecks: !1,
                            literals: copy(literals),
                            isIdentifierStart: isFunction(identStart) && identStart,
                            isIdentifierContinue: isFunction(identContinue) && identContinue
                        },
                        $parseOptionsExpensive = {
                            csp: noUnsafeEval,
                            expensiveChecks: !0,
                            literals: copy(literals),
                            isIdentifierStart: isFunction(identStart) && identStart,
                            isIdentifierContinue: isFunction(identContinue) && identContinue
                        },
                        runningChecksEnabled = !1;
                    return $parse.$$runningExpensiveChecks = function() {
                        return runningChecksEnabled
                    }, $parse
                }]
            }

            function $QProvider() {
                this.$get = ["$rootScope", "$exceptionHandler", function($rootScope, $exceptionHandler) {
                    return qFactory(function(callback) {
                        $rootScope.$evalAsync(callback)
                    }, $exceptionHandler)
                }]
            }

            function $$QProvider() {
                this.$get = ["$browser", "$exceptionHandler", function($browser, $exceptionHandler) {
                    return qFactory(function(callback) {
                        $browser.defer(callback)
                    }, $exceptionHandler)
                }]
            }

            function qFactory(nextTick, exceptionHandler) {
                function Promise() {
                    this.$$state = {
                        status: 0
                    }
                }

                function simpleBind(context, fn) {
                    return function(value) {
                        fn.call(context, value)
                    }
                }

                function processQueue(state) {
                    var fn, deferred, pending;
                    pending = state.pending, state.processScheduled = !1, state.pending = void 0;
                    for (var i = 0, ii = pending.length; i < ii; ++i) {
                        deferred = pending[i][0], fn = pending[i][state.status];
                        try {
                            isFunction(fn) ? deferred.resolve(fn(state.value)) : 1 === state.status ? deferred.resolve(state.value) : deferred.reject(state.value)
                        } catch (e) {
                            deferred.reject(e), exceptionHandler(e)
                        }
                    }
                }

                function scheduleProcessQueue(state) {
                    !state.processScheduled && state.pending && (state.processScheduled = !0, nextTick(function() {
                        processQueue(state)
                    }))
                }

                function Deferred() {
                    this.promise = new Promise
                }

                function all(promises) {
                    var deferred = new Deferred,
                        counter = 0,
                        results = isArray(promises) ? [] : {};
                    return forEach(promises, function(promise, key) {
                        counter++, when(promise).then(function(value) {
                            results.hasOwnProperty(key) || (results[key] = value, --counter || deferred.resolve(results))
                        }, function(reason) {
                            results.hasOwnProperty(key) || deferred.reject(reason)
                        })
                    }), 0 === counter && deferred.resolve(results), deferred.promise
                }

                function race(promises) {
                    var deferred = defer();
                    return forEach(promises, function(promise) {
                        when(promise).then(deferred.resolve, deferred.reject)
                    }), deferred.promise
                }
                var $qMinErr = minErr("$q", TypeError),
                    defer = function() {
                        var d = new Deferred;
                        return d.resolve = simpleBind(d, d.resolve), d.reject = simpleBind(d, d.reject), d.notify = simpleBind(d, d.notify), d
                    };
                extend(Promise.prototype, {
                    then: function(onFulfilled, onRejected, progressBack) {
                        if (isUndefined(onFulfilled) && isUndefined(onRejected) && isUndefined(progressBack)) return this;
                        var result = new Deferred;
                        return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([result, onFulfilled, onRejected, progressBack]), this.$$state.status > 0 && scheduleProcessQueue(this.$$state), result.promise
                    },
                    catch: function(callback) {
                        return this.then(null, callback)
                    },
                    finally: function(callback, progressBack) {
                        return this.then(function(value) {
                            return handleCallback(value, !0, callback)
                        }, function(error) {
                            return handleCallback(error, !1, callback)
                        }, progressBack)
                    }
                }), extend(Deferred.prototype, {
                    resolve: function(val) {
                        this.promise.$$state.status || (val === this.promise ? this.$$reject($qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val)) : this.$$resolve(val))
                    },
                    $$resolve: function(val) {
                        function resolvePromise(val) {
                            done || (done = !0, that.$$resolve(val))
                        }

                        function rejectPromise(val) {
                            done || (done = !0, that.$$reject(val))
                        }
                        var then, that = this,
                            done = !1;
                        try {
                            (isObject(val) || isFunction(val)) && (then = val && val.then), isFunction(then) ? (this.promise.$$state.status = -1, then.call(val, resolvePromise, rejectPromise, simpleBind(this, this.notify))) : (this.promise.$$state.value = val, this.promise.$$state.status = 1, scheduleProcessQueue(this.promise.$$state))
                        } catch (e) {
                            rejectPromise(e), exceptionHandler(e)
                        }
                    },
                    reject: function(reason) {
                        this.promise.$$state.status || this.$$reject(reason)
                    },
                    $$reject: function(reason) {
                        this.promise.$$state.value = reason, this.promise.$$state.status = 2, scheduleProcessQueue(this.promise.$$state)
                    },
                    notify: function(progress) {
                        var callbacks = this.promise.$$state.pending;
                        this.promise.$$state.status <= 0 && callbacks && callbacks.length && nextTick(function() {
                            for (var callback, result, i = 0, ii = callbacks.length; i < ii; i++) {
                                result = callbacks[i][0], callback = callbacks[i][3];
                                try {
                                    result.notify(isFunction(callback) ? callback(progress) : progress)
                                } catch (e) {
                                    exceptionHandler(e)
                                }
                            }
                        })
                    }
                });
                var reject = function(reason) {
                        var result = new Deferred;
                        return result.reject(reason), result.promise
                    },
                    makePromise = function(value, resolved) {
                        var result = new Deferred;
                        return resolved ? result.resolve(value) : result.reject(value), result.promise
                    },
                    handleCallback = function(value, isResolved, callback) {
                        var callbackOutput = null;
                        try {
                            isFunction(callback) && (callbackOutput = callback())
                        } catch (e) {
                            return makePromise(e, !1)
                        }
                        return isPromiseLike(callbackOutput) ? callbackOutput.then(function() {
                            return makePromise(value, isResolved)
                        }, function(error) {
                            return makePromise(error, !1)
                        }) : makePromise(value, isResolved)
                    },
                    when = function(value, callback, errback, progressBack) {
                        var result = new Deferred;
                        return result.resolve(value), result.promise.then(callback, errback, progressBack)
                    },
                    resolve = when,
                    $Q = function(resolver) {
                        function resolveFn(value) {
                            deferred.resolve(value)
                        }

                        function rejectFn(reason) {
                            deferred.reject(reason)
                        }
                        if (!isFunction(resolver)) throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
                        var deferred = new Deferred;
                        return resolver(resolveFn, rejectFn), deferred.promise
                    };
                return $Q.prototype = Promise.prototype, $Q.defer = defer, $Q.reject = reject, $Q.when = when, $Q.resolve = resolve, $Q.all = all, $Q.race = race, $Q
            }

            function $$RAFProvider() {
                this.$get = ["$window", "$timeout", function($window, $timeout) {
                    var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame,
                        cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame,
                        rafSupported = !!requestAnimationFrame,
                        raf = rafSupported ? function(fn) {
                            var id = requestAnimationFrame(fn);
                            return function() {
                                cancelAnimationFrame(id)
                            }
                        } : function(fn) {
                            var timer = $timeout(fn, 16.66, !1);
                            return function() {
                                $timeout.cancel(timer)
                            }
                        };
                    return raf.supported = rafSupported, raf
                }]
            }

            function $RootScopeProvider() {
                function createChildScopeClass(parent) {
                    function ChildScope() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = nextUid(), this.$$ChildScope = null
                    }
                    return ChildScope.prototype = parent, ChildScope
                }
                var TTL = 10,
                    $rootScopeMinErr = minErr("$rootScope"),
                    lastDirtyWatch = null,
                    applyAsyncId = null;
                this.digestTtl = function(value) {
                    return arguments.length && (TTL = value), TTL
                }, this.$get = ["$exceptionHandler", "$parse", "$browser", function($exceptionHandler, $parse, $browser) {
                    function destroyChildScope($event) {
                        $event.currentScope.$$destroyed = !0
                    }

                    function cleanUpScope($scope) {
                        9 === msie && ($scope.$$childHead && cleanUpScope($scope.$$childHead), $scope.$$nextSibling && cleanUpScope($scope.$$nextSibling)), $scope.$parent = $scope.$$nextSibling = $scope.$$prevSibling = $scope.$$childHead = $scope.$$childTail = $scope.$root = $scope.$$watchers = null
                    }

                    function Scope() {
                        this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
                    }

                    function beginPhase(phase) {
                        if ($rootScope.$$phase) throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                        $rootScope.$$phase = phase
                    }

                    function clearPhase() {
                        $rootScope.$$phase = null
                    }

                    function incrementWatchersCount(current, count) {
                        do current.$$watchersCount += count; while (current = current.$parent)
                    }

                    function decrementListenerCount(current, count, name) {
                        do current.$$listenerCount[name] -= count, 0 === current.$$listenerCount[name] && delete current.$$listenerCount[name]; while (current = current.$parent)
                    }

                    function initWatchVal() {}

                    function flushApplyAsync() {
                        for (; applyAsyncQueue.length;) try {
                            applyAsyncQueue.shift()()
                        } catch (e) {
                            $exceptionHandler(e)
                        }
                        applyAsyncId = null
                    }

                    function scheduleApplyAsync() {
                        null === applyAsyncId && (applyAsyncId = $browser.defer(function() {
                            $rootScope.$apply(flushApplyAsync)
                        }))
                    }
                    Scope.prototype = {
                        constructor: Scope,
                        $new: function(isolate, parent) {
                            var child;
                            return parent = parent || this, isolate ? (child = new Scope, child.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = createChildScopeClass(this)), child = new this.$$ChildScope), child.$parent = parent, child.$$prevSibling = parent.$$childTail, parent.$$childHead ? (parent.$$childTail.$$nextSibling = child, parent.$$childTail = child) : parent.$$childHead = parent.$$childTail = child, (isolate || parent !== this) && child.$on("$destroy", destroyChildScope), child
                        },
                        $watch: function(watchExp, listener, objectEquality, prettyPrintExpression) {
                            var get = $parse(watchExp);
                            if (get.$$watchDelegate) return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
                            var scope = this,
                                array = scope.$$watchers,
                                watcher = {
                                    fn: listener,
                                    last: initWatchVal,
                                    get: get,
                                    exp: prettyPrintExpression || watchExp,
                                    eq: !!objectEquality
                                };
                            return lastDirtyWatch = null, isFunction(listener) || (watcher.fn = noop), array || (array = scope.$$watchers = []), array.unshift(watcher), incrementWatchersCount(this, 1),
                                function() {
                                    arrayRemove(array, watcher) >= 0 && incrementWatchersCount(scope, -1), lastDirtyWatch = null
                                }
                        },
                        $watchGroup: function(watchExpressions, listener) {
                            function watchGroupAction() {
                                changeReactionScheduled = !1, firstRun ? (firstRun = !1, listener(newValues, newValues, self)) : listener(newValues, oldValues, self)
                            }
                            var oldValues = new Array(watchExpressions.length),
                                newValues = new Array(watchExpressions.length),
                                deregisterFns = [],
                                self = this,
                                changeReactionScheduled = !1,
                                firstRun = !0;
                            if (!watchExpressions.length) {
                                var shouldCall = !0;
                                return self.$evalAsync(function() {
                                        shouldCall && listener(newValues, newValues, self)
                                    }),
                                    function() {
                                        shouldCall = !1
                                    }
                            }
                            return 1 === watchExpressions.length ? this.$watch(watchExpressions[0], function(value, oldValue, scope) {
                                newValues[0] = value, oldValues[0] = oldValue, listener(newValues, value === oldValue ? newValues : oldValues, scope)
                            }) : (forEach(watchExpressions, function(expr, i) {
                                var unwatchFn = self.$watch(expr, function(value, oldValue) {
                                    newValues[i] = value, oldValues[i] = oldValue, changeReactionScheduled || (changeReactionScheduled = !0, self.$evalAsync(watchGroupAction))
                                });
                                deregisterFns.push(unwatchFn)
                            }), function() {
                                for (; deregisterFns.length;) deregisterFns.shift()()
                            })
                        },
                        $watchCollection: function(obj, listener) {
                            function $watchCollectionInterceptor(_value) {
                                newValue = _value;
                                var newLength, key, bothNaN, newItem, oldItem;
                                if (!isUndefined(newValue)) {
                                    if (isObject(newValue))
                                        if (isArrayLike(newValue)) {
                                            oldValue !== internalArray && (oldValue = internalArray, oldLength = oldValue.length = 0, changeDetected++), newLength = newValue.length, oldLength !== newLength && (changeDetected++, oldValue.length = oldLength = newLength);
                                            for (var i = 0; i < newLength; i++) oldItem = oldValue[i], newItem = newValue[i], bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, oldValue[i] = newItem)
                                        } else {
                                            oldValue !== internalObject && (oldValue = internalObject = {}, oldLength = 0, changeDetected++), newLength = 0;
                                            for (key in newValue) hasOwnProperty.call(newValue, key) && (newLength++, newItem = newValue[key], oldItem = oldValue[key], key in oldValue ? (bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, oldValue[key] = newItem)) : (oldLength++, oldValue[key] = newItem, changeDetected++));
                                            if (oldLength > newLength) {
                                                changeDetected++;
                                                for (key in oldValue) hasOwnProperty.call(newValue, key) || (oldLength--, delete oldValue[key])
                                            }
                                        } else oldValue !== newValue && (oldValue = newValue, changeDetected++);
                                    return changeDetected
                                }
                            }

                            function $watchCollectionAction() {
                                if (initRun ? (initRun = !1, listener(newValue, newValue, self)) : listener(newValue, veryOldValue, self), trackVeryOldValue)
                                    if (isObject(newValue))
                                        if (isArrayLike(newValue)) {
                                            veryOldValue = new Array(newValue.length);
                                            for (var i = 0; i < newValue.length; i++) veryOldValue[i] = newValue[i]
                                        } else {
                                            veryOldValue = {};
                                            for (var key in newValue) hasOwnProperty.call(newValue, key) && (veryOldValue[key] = newValue[key])
                                        } else veryOldValue = newValue
                            }
                            $watchCollectionInterceptor.$stateful = !0;
                            var newValue, oldValue, veryOldValue, self = this,
                                trackVeryOldValue = listener.length > 1,
                                changeDetected = 0,
                                changeDetector = $parse(obj, $watchCollectionInterceptor),
                                internalArray = [],
                                internalObject = {},
                                initRun = !0,
                                oldLength = 0;
                            return this.$watch(changeDetector, $watchCollectionAction)
                        },
                        $digest: function() {
                            var watch, value, last, fn, get, watchers, length, dirty, next, current, logIdx, asyncTask, ttl = TTL,
                                target = this,
                                watchLog = [];
                            beginPhase("$digest"), $browser.$$checkUrlChange(), this === $rootScope && null !== applyAsyncId && ($browser.defer.cancel(applyAsyncId), flushApplyAsync()), lastDirtyWatch = null;
                            do {
                                dirty = !1, current = target;
                                for (var asyncQueuePosition = 0; asyncQueuePosition < asyncQueue.length; asyncQueuePosition++) {
                                    try {
                                        asyncTask = asyncQueue[asyncQueuePosition], asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals)
                                    } catch (e) {
                                        $exceptionHandler(e)
                                    }
                                    lastDirtyWatch = null
                                }
                                asyncQueue.length = 0;
                                traverseScopesLoop: do {
                                    if (watchers = current.$$watchers)
                                        for (length = watchers.length; length--;) try {
                                            if (watch = watchers[length])
                                                if (get = watch.get, (value = get(current)) === (last = watch.last) || (watch.eq ? equals(value, last) : isNumberNaN(value) && isNumberNaN(last))) {
                                                    if (watch === lastDirtyWatch) {
                                                        dirty = !1;
                                                        break traverseScopesLoop
                                                    }
                                                } else dirty = !0, lastDirtyWatch = watch, watch.last = watch.eq ? copy(value, null) : value, fn = watch.fn, fn(value, last === initWatchVal ? value : last, current), ttl < 5 && (logIdx = 4 - ttl, watchLog[logIdx] || (watchLog[logIdx] = []), watchLog[logIdx].push({
                                                    msg: isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                                    newVal: value,
                                                    oldVal: last
                                                }))
                                        } catch (e) {
                                            $exceptionHandler(e)
                                        }
                                    if (!(next = current.$$watchersCount && current.$$childHead || current !== target && current.$$nextSibling))
                                        for (; current !== target && !(next = current.$$nextSibling);) current = current.$parent;
                                } while (current = next);
                                if ((dirty || asyncQueue.length) && !ttl--) throw clearPhase(), $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", TTL, watchLog)
                            } while (dirty || asyncQueue.length);
                            for (clearPhase(); postDigestQueuePosition < postDigestQueue.length;) try {
                                postDigestQueue[postDigestQueuePosition++]()
                            } catch (e) {
                                $exceptionHandler(e)
                            }
                            postDigestQueue.length = postDigestQueuePosition = 0
                        },
                        $destroy: function() {
                            if (!this.$$destroyed) {
                                var parent = this.$parent;
                                this.$broadcast("$destroy"), this.$$destroyed = !0, this === $rootScope && $browser.$$applicationDestroyed(), incrementWatchersCount(this, -this.$$watchersCount);
                                for (var eventName in this.$$listenerCount) decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                                parent && parent.$$childHead === this && (parent.$$childHead = this.$$nextSibling), parent && parent.$$childTail === this && (parent.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop, this.$on = this.$watch = this.$watchGroup = function() {
                                    return noop
                                }, this.$$listeners = {}, this.$$nextSibling = null, cleanUpScope(this)
                            }
                        },
                        $eval: function(expr, locals) {
                            return $parse(expr)(this, locals)
                        },
                        $evalAsync: function(expr, locals) {
                            $rootScope.$$phase || asyncQueue.length || $browser.defer(function() {
                                asyncQueue.length && $rootScope.$digest()
                            }), asyncQueue.push({
                                scope: this,
                                expression: $parse(expr),
                                locals: locals
                            })
                        },
                        $$postDigest: function(fn) {
                            postDigestQueue.push(fn)
                        },
                        $apply: function(expr) {
                            try {
                                beginPhase("$apply");
                                try {
                                    return this.$eval(expr)
                                } finally {
                                    clearPhase()
                                }
                            } catch (e) {
                                $exceptionHandler(e)
                            } finally {
                                try {
                                    $rootScope.$digest()
                                } catch (e) {
                                    throw $exceptionHandler(e), e
                                }
                            }
                        },
                        $applyAsync: function(expr) {
                            function $applyAsyncExpression() {
                                scope.$eval(expr)
                            }
                            var scope = this;
                            expr && applyAsyncQueue.push($applyAsyncExpression), expr = $parse(expr), scheduleApplyAsync()
                        },
                        $on: function(name, listener) {
                            var namedListeners = this.$$listeners[name];
                            namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener);
                            var current = this;
                            do current.$$listenerCount[name] || (current.$$listenerCount[name] = 0), current.$$listenerCount[name]++; while (current = current.$parent);
                            var self = this;
                            return function() {
                                var indexOfListener = namedListeners.indexOf(listener);
                                indexOfListener !== -1 && (namedListeners[indexOfListener] = null, decrementListenerCount(self, 1, name))
                            }
                        },
                        $emit: function(name, args) {
                            var namedListeners, i, length, empty = [],
                                scope = this,
                                stopPropagation = !1,
                                event = {
                                    name: name,
                                    targetScope: scope,
                                    stopPropagation: function() {
                                        stopPropagation = !0
                                    },
                                    preventDefault: function() {
                                        event.defaultPrevented = !0
                                    },
                                    defaultPrevented: !1
                                },
                                listenerArgs = concat([event], arguments, 1);
                            do {
                                for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, i = 0, length = namedListeners.length; i < length; i++)
                                    if (namedListeners[i]) try {
                                        namedListeners[i].apply(null, listenerArgs)
                                    } catch (e) {
                                        $exceptionHandler(e)
                                    } else namedListeners.splice(i, 1), i--, length--;
                                if (stopPropagation) return event.currentScope = null, event;
                                scope = scope.$parent
                            } while (scope);
                            return event.currentScope = null, event
                        },
                        $broadcast: function(name, args) {
                            var target = this,
                                current = target,
                                next = target,
                                event = {
                                    name: name,
                                    targetScope: target,
                                    preventDefault: function() {
                                        event.defaultPrevented = !0
                                    },
                                    defaultPrevented: !1
                                };
                            if (!target.$$listenerCount[name]) return event;
                            for (var listeners, i, length, listenerArgs = concat([event], arguments, 1); current = next;) {
                                for (event.currentScope = current, listeners = current.$$listeners[name] || [], i = 0, length = listeners.length; i < length; i++)
                                    if (listeners[i]) try {
                                        listeners[i].apply(null, listenerArgs)
                                    } catch (e) {
                                        $exceptionHandler(e)
                                    } else listeners.splice(i, 1), i--, length--;
                                if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling))
                                    for (; current !== target && !(next = current.$$nextSibling);) current = current.$parent
                            }
                            return event.currentScope = null, event
                        }
                    };
                    var $rootScope = new Scope,
                        asyncQueue = $rootScope.$$asyncQueue = [],
                        postDigestQueue = $rootScope.$$postDigestQueue = [],
                        applyAsyncQueue = $rootScope.$$applyAsyncQueue = [],
                        postDigestQueuePosition = 0;
                    return $rootScope
                }]
            }

            function $$SanitizeUriProvider() {
                var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/,
                    imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
                this.aHrefSanitizationWhitelist = function(regexp) {
                    return isDefined(regexp) ? (aHrefSanitizationWhitelist = regexp, this) : aHrefSanitizationWhitelist
                }, this.imgSrcSanitizationWhitelist = function(regexp) {
                    return isDefined(regexp) ? (imgSrcSanitizationWhitelist = regexp, this) : imgSrcSanitizationWhitelist
                }, this.$get = function() {
                    return function(uri, isImage) {
                        var normalizedVal, regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                        return normalizedVal = urlResolve(uri).href, "" === normalizedVal || normalizedVal.match(regex) ? uri : "unsafe:" + normalizedVal
                    }
                }
            }

            function adjustMatcher(matcher) {
                if ("self" === matcher) return matcher;
                if (isString(matcher)) {
                    if (matcher.indexOf("***") > -1) throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
                    return matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + matcher + "$")
                }
                if (isRegExp(matcher)) return new RegExp("^" + matcher.source + "$");
                throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
            }

            function adjustMatchers(matchers) {
                var adjustedMatchers = [];
                return isDefined(matchers) && forEach(matchers, function(matcher) {
                    adjustedMatchers.push(adjustMatcher(matcher))
                }), adjustedMatchers
            }

            function $SceDelegateProvider() {
                this.SCE_CONTEXTS = SCE_CONTEXTS;
                var resourceUrlWhitelist = ["self"],
                    resourceUrlBlacklist = [];
                this.resourceUrlWhitelist = function(value) {
                    return arguments.length && (resourceUrlWhitelist = adjustMatchers(value)), resourceUrlWhitelist
                }, this.resourceUrlBlacklist = function(value) {
                    return arguments.length && (resourceUrlBlacklist = adjustMatchers(value)), resourceUrlBlacklist
                }, this.$get = ["$injector", function($injector) {
                    function matchUrl(matcher, parsedUrl) {
                        return "self" === matcher ? urlIsSameOrigin(parsedUrl) : !!matcher.exec(parsedUrl.href)
                    }

                    function isResourceUrlAllowedByPolicy(url) {
                        var i, n, parsedUrl = urlResolve(url.toString()),
                            allowed = !1;
                        for (i = 0, n = resourceUrlWhitelist.length; i < n; i++)
                            if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                                allowed = !0;
                                break
                            }
                        if (allowed)
                            for (i = 0, n = resourceUrlBlacklist.length; i < n; i++)
                                if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                                    allowed = !1;
                                    break
                                }
                        return allowed
                    }

                    function generateHolderType(Base) {
                        var holderType = function(trustedValue) {
                            this.$$unwrapTrustedValue = function() {
                                return trustedValue
                            }
                        };
                        return Base && (holderType.prototype = new Base), holderType.prototype.valueOf = function() {
                            return this.$$unwrapTrustedValue()
                        }, holderType.prototype.toString = function() {
                            return this.$$unwrapTrustedValue().toString()
                        }, holderType
                    }

                    function trustAs(type, trustedValue) {
                        var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                        if (!Constructor) throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                        if (null === trustedValue || isUndefined(trustedValue) || "" === trustedValue) return trustedValue;
                        if ("string" != typeof trustedValue) throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                        return new Constructor(trustedValue)
                    }

                    function valueOf(maybeTrusted) {
                        return maybeTrusted instanceof trustedValueHolderBase ? maybeTrusted.$$unwrapTrustedValue() : maybeTrusted
                    }

                    function getTrusted(type, maybeTrusted) {
                        if (null === maybeTrusted || isUndefined(maybeTrusted) || "" === maybeTrusted) return maybeTrusted;
                        var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                        if (constructor && maybeTrusted instanceof constructor) return maybeTrusted.$$unwrapTrustedValue();
                        if (type === SCE_CONTEXTS.RESOURCE_URL) {
                            if (isResourceUrlAllowedByPolicy(maybeTrusted)) return maybeTrusted;
                            throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString())
                        }
                        if (type === SCE_CONTEXTS.HTML) return htmlSanitizer(maybeTrusted);
                        throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
                    }
                    var htmlSanitizer = function(html) {
                        throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
                    };
                    $injector.has("$sanitize") && (htmlSanitizer = $injector.get("$sanitize"));
                    var trustedValueHolderBase = generateHolderType(),
                        byType = {};
                    return byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]), {
                        trustAs: trustAs,
                        getTrusted: getTrusted,
                        valueOf: valueOf
                    }
                }]
            }

            function $SceProvider() {
                var enabled = !0;
                this.enabled = function(value) {
                    return arguments.length && (enabled = !!value), enabled
                }, this.$get = ["$parse", "$sceDelegate", function($parse, $sceDelegate) {
                    if (enabled && msie < 8) throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
                    var sce = shallowCopy(SCE_CONTEXTS);
                    sce.isEnabled = function() {
                        return enabled
                    }, sce.trustAs = $sceDelegate.trustAs, sce.getTrusted = $sceDelegate.getTrusted, sce.valueOf = $sceDelegate.valueOf, enabled || (sce.trustAs = sce.getTrusted = function(type, value) {
                        return value
                    }, sce.valueOf = identity), sce.parseAs = function(type, expr) {
                        var parsed = $parse(expr);
                        return parsed.literal && parsed.constant ? parsed : $parse(expr, function(value) {
                            return sce.getTrusted(type, value)
                        })
                    };
                    var parse = sce.parseAs,
                        getTrusted = sce.getTrusted,
                        trustAs = sce.trustAs;
                    return forEach(SCE_CONTEXTS, function(enumValue, name) {
                        var lName = lowercase(name);
                        sce[camelCase("parse_as_" + lName)] = function(expr) {
                            return parse(enumValue, expr)
                        }, sce[camelCase("get_trusted_" + lName)] = function(value) {
                            return getTrusted(enumValue, value)
                        }, sce[camelCase("trust_as_" + lName)] = function(value) {
                            return trustAs(enumValue, value)
                        }
                    }), sce
                }]
            }

            function $SnifferProvider() {
                this.$get = ["$window", "$document", function($window, $document) {
                    var vendorPrefix, match, eventSupport = {},
                        isChromePackagedApp = $window.chrome && ($window.chrome.app && $window.chrome.app.runtime || !$window.chrome.app && $window.chrome.runtime && $window.chrome.runtime.id),
                        hasHistoryPushState = !isChromePackagedApp && $window.history && $window.history.pushState,
                        android = toInt((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]),
                        boxee = /Boxee/i.test(($window.navigator || {}).userAgent),
                        document = $document[0] || {},
                        vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/,
                        bodyStyle = document.body && document.body.style,
                        transitions = !1,
                        animations = !1;
                    if (bodyStyle) {
                        for (var prop in bodyStyle)
                            if (match = vendorRegex.exec(prop)) {
                                vendorPrefix = match[0], vendorPrefix = vendorPrefix[0].toUpperCase() + vendorPrefix.substr(1);
                                break
                            }
                        vendorPrefix || (vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit"), transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle), animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle), !android || transitions && animations || (transitions = isString(bodyStyle.webkitTransition), animations = isString(bodyStyle.webkitAnimation))
                    }
                    return {
                        history: !(!hasHistoryPushState || android < 4 || boxee),
                        hasEvent: function(event) {
                            if ("input" === event && msie <= 11) return !1;
                            if (isUndefined(eventSupport[event])) {
                                var divElm = document.createElement("div");
                                eventSupport[event] = "on" + event in divElm
                            }
                            return eventSupport[event]
                        },
                        csp: csp(),
                        vendorPrefix: vendorPrefix,
                        transitions: transitions,
                        animations: animations,
                        android: android
                    }
                }]
            }

            function $TemplateRequestProvider() {
                var httpOptions;
                this.httpOptions = function(val) {
                    return val ? (httpOptions = val, this) : httpOptions
                }, this.$get = ["$templateCache", "$http", "$q", "$sce", function($templateCache, $http, $q, $sce) {
                    function handleRequestFn(tpl, ignoreRequestError) {
                        function handleError(resp) {
                            if (!ignoreRequestError) throw $templateRequestMinErr("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", tpl, resp.status, resp.statusText);
                            return $q.reject(resp)
                        }
                        handleRequestFn.totalPendingRequests++, isString(tpl) && !isUndefined($templateCache.get(tpl)) || (tpl = $sce.getTrustedResourceUrl(tpl));
                        var transformResponse = $http.defaults && $http.defaults.transformResponse;
                        return isArray(transformResponse) ? transformResponse = transformResponse.filter(function(transformer) {
                            return transformer !== defaultHttpResponseTransform
                        }) : transformResponse === defaultHttpResponseTransform && (transformResponse = null), $http.get(tpl, extend({
                            cache: $templateCache,
                            transformResponse: transformResponse
                        }, httpOptions)).finally(function() {
                            handleRequestFn.totalPendingRequests--
                        }).then(function(response) {
                            return $templateCache.put(tpl, response.data), response.data
                        }, handleError)
                    }
                    return handleRequestFn.totalPendingRequests = 0, handleRequestFn
                }]
            }

            function $$TestabilityProvider() {
                this.$get = ["$rootScope", "$browser", "$location", function($rootScope, $browser, $location) {
                    var testability = {};
                    return testability.findBindings = function(element, expression, opt_exactMatch) {
                        var bindings = element.getElementsByClassName("ng-binding"),
                            matches = [];
                        return forEach(bindings, function(binding) {
                            var dataBinding = angular.element(binding).data("$binding");
                            dataBinding && forEach(dataBinding, function(bindingName) {
                                if (opt_exactMatch) {
                                    var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                                    matcher.test(bindingName) && matches.push(binding)
                                } else bindingName.indexOf(expression) !== -1 && matches.push(binding)
                            })
                        }), matches
                    }, testability.findModels = function(element, expression, opt_exactMatch) {
                        for (var prefixes = ["ng-", "data-ng-", "ng\\:"], p = 0; p < prefixes.length; ++p) {
                            var attributeEquals = opt_exactMatch ? "=" : "*=",
                                selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]',
                                elements = element.querySelectorAll(selector);
                            if (elements.length) return elements
                        }
                    }, testability.getLocation = function() {
                        return $location.url()
                    }, testability.setLocation = function(url) {
                        url !== $location.url() && ($location.url(url), $rootScope.$digest())
                    }, testability.whenStable = function(callback) {
                        $browser.notifyWhenNoOutstandingRequests(callback)
                    }, testability
                }]
            }

            function $TimeoutProvider() {
                this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function($rootScope, $browser, $q, $$q, $exceptionHandler) {
                    function timeout(fn, delay, invokeApply) {
                        isFunction(fn) || (invokeApply = delay, delay = fn, fn = noop);
                        var timeoutId, args = sliceArgs(arguments, 3),
                            skipApply = isDefined(invokeApply) && !invokeApply,
                            deferred = (skipApply ? $$q : $q).defer(),
                            promise = deferred.promise;
                        return timeoutId = $browser.defer(function() {
                            try {
                                deferred.resolve(fn.apply(null, args))
                            } catch (e) {
                                deferred.reject(e), $exceptionHandler(e)
                            } finally {
                                delete deferreds[promise.$$timeoutId]
                            }
                            skipApply || $rootScope.$apply()
                        }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise
                    }
                    var deferreds = {};
                    return timeout.cancel = function(promise) {
                        return !!(promise && promise.$$timeoutId in deferreds) && (deferreds[promise.$$timeoutId].reject("canceled"), delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId))
                    }, timeout
                }]
            }

            function urlResolve(url) {
                var href = url;
                return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), urlParsingNode.setAttribute("href", href), {
                    href: urlParsingNode.href,
                    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
                    host: urlParsingNode.host,
                    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
                    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
                    hostname: urlParsingNode.hostname,
                    port: urlParsingNode.port,
                    pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
                }
            }

            function urlIsSameOrigin(requestUrl) {
                var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
                return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host
            }

            function $WindowProvider() {
                this.$get = valueFn(window)
            }

            function $$CookieReader($document) {
                function safeDecodeURIComponent(str) {
                    try {
                        return decodeURIComponent(str)
                    } catch (e) {
                        return str
                    }
                }
                var rawDocument = $document[0] || {},
                    lastCookies = {},
                    lastCookieString = "";
                return function() {
                    var cookieArray, cookie, i, index, name, currentCookieString = rawDocument.cookie || "";
                    if (currentCookieString !== lastCookieString)
                        for (lastCookieString = currentCookieString, cookieArray = lastCookieString.split("; "), lastCookies = {}, i = 0; i < cookieArray.length; i++) cookie = cookieArray[i], index = cookie.indexOf("="), index > 0 && (name = safeDecodeURIComponent(cookie.substring(0, index)), isUndefined(lastCookies[name]) && (lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1))));
                    return lastCookies
                }
            }

            function $$CookieReaderProvider() {
                this.$get = $$CookieReader
            }

            function $FilterProvider($provide) {
                function register(name, factory) {
                    if (isObject(name)) {
                        var filters = {};
                        return forEach(name, function(filter, key) {
                            filters[key] = register(key, filter)
                        }), filters
                    }
                    return $provide.factory(name + suffix, factory)
                }
                var suffix = "Filter";
                this.register = register, this.$get = ["$injector", function($injector) {
                    return function(name) {
                        return $injector.get(name + suffix)
                    }
                }], register("currency", currencyFilter), register("date", dateFilter), register("filter", filterFilter), register("json", jsonFilter), register("limitTo", limitToFilter), register("lowercase", lowercaseFilter), register("number", numberFilter), register("orderBy", orderByFilter), register("uppercase", uppercaseFilter)
            }

            function filterFilter() {
                return function(array, expression, comparator, anyPropertyKey) {
                    if (!isArrayLike(array)) {
                        if (null == array) return array;
                        throw minErr("filter")("notarray", "Expected array but received: {0}", array)
                    }
                    anyPropertyKey = anyPropertyKey || "$";
                    var predicateFn, matchAgainstAnyProp, expressionType = getTypeForFilter(expression);
                    switch (expressionType) {
                        case "function":
                            predicateFn = expression;
                            break;
                        case "boolean":
                        case "null":
                        case "number":
                        case "string":
                            matchAgainstAnyProp = !0;
                        case "object":
                            predicateFn = createPredicateFn(expression, comparator, anyPropertyKey, matchAgainstAnyProp);
                            break;
                        default:
                            return array
                    }
                    return Array.prototype.filter.call(array, predicateFn)
                }
            }

            function createPredicateFn(expression, comparator, anyPropertyKey, matchAgainstAnyProp) {
                var predicateFn, shouldMatchPrimitives = isObject(expression) && anyPropertyKey in expression;
                return comparator === !0 ? comparator = equals : isFunction(comparator) || (comparator = function(actual, expected) {
                    return !isUndefined(actual) && (null === actual || null === expected ? actual === expected : !(isObject(expected) || isObject(actual) && !hasCustomToString(actual)) && (actual = lowercase("" + actual), expected = lowercase("" + expected), actual.indexOf(expected) !== -1))
                }), predicateFn = function(item) {
                    return shouldMatchPrimitives && !isObject(item) ? deepCompare(item, expression[anyPropertyKey], comparator, anyPropertyKey, !1) : deepCompare(item, expression, comparator, anyPropertyKey, matchAgainstAnyProp)
                }
            }

            function deepCompare(actual, expected, comparator, anyPropertyKey, matchAgainstAnyProp, dontMatchWholeObject) {
                var actualType = getTypeForFilter(actual),
                    expectedType = getTypeForFilter(expected);
                if ("string" === expectedType && "!" === expected.charAt(0)) return !deepCompare(actual, expected.substring(1), comparator, anyPropertyKey, matchAgainstAnyProp);
                if (isArray(actual)) return actual.some(function(item) {
                    return deepCompare(item, expected, comparator, anyPropertyKey, matchAgainstAnyProp)
                });
                switch (actualType) {
                    case "object":
                        var key;
                        if (matchAgainstAnyProp) {
                            for (key in actual)
                                if ("$" !== key.charAt(0) && deepCompare(actual[key], expected, comparator, anyPropertyKey, !0)) return !0;
                            return !dontMatchWholeObject && deepCompare(actual, expected, comparator, anyPropertyKey, !1)
                        }
                        if ("object" === expectedType) {
                            for (key in expected) {
                                var expectedVal = expected[key];
                                if (!isFunction(expectedVal) && !isUndefined(expectedVal)) {
                                    var matchAnyProperty = key === anyPropertyKey,
                                        actualVal = matchAnyProperty ? actual : actual[key];
                                    if (!deepCompare(actualVal, expectedVal, comparator, anyPropertyKey, matchAnyProperty, matchAnyProperty)) return !1
                                }
                            }
                            return !0
                        }
                        return comparator(actual, expected);
                    case "function":
                        return !1;
                    default:
                        return comparator(actual, expected)
                }
            }

            function getTypeForFilter(val) {
                return null === val ? "null" : typeof val
            }

            function currencyFilter($locale) {
                var formats = $locale.NUMBER_FORMATS;
                return function(amount, currencySymbol, fractionSize) {
                    return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), isUndefined(fractionSize) && (fractionSize = formats.PATTERNS[1].maxFrac), null == amount ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol)
                }
            }

            function numberFilter($locale) {
                var formats = $locale.NUMBER_FORMATS;
                return function(number, fractionSize) {
                    return null == number ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize)
                }
            }

            function parse(numStr) {
                var digits, numberOfIntegerDigits, i, j, zeros, exponent = 0;
                for ((numberOfIntegerDigits = numStr.indexOf(DECIMAL_SEP)) > -1 && (numStr = numStr.replace(DECIMAL_SEP, "")), (i = numStr.search(/e/i)) > 0 ? (numberOfIntegerDigits < 0 && (numberOfIntegerDigits = i), numberOfIntegerDigits += +numStr.slice(i + 1), numStr = numStr.substring(0, i)) : numberOfIntegerDigits < 0 && (numberOfIntegerDigits = numStr.length), i = 0; numStr.charAt(i) === ZERO_CHAR; i++);
                if (i === (zeros = numStr.length)) digits = [0], numberOfIntegerDigits = 1;
                else {
                    for (zeros--; numStr.charAt(zeros) === ZERO_CHAR;) zeros--;
                    for (numberOfIntegerDigits -= i, digits = [], j = 0; i <= zeros; i++, j++) digits[j] = +numStr.charAt(i)
                }
                return numberOfIntegerDigits > MAX_DIGITS && (digits = digits.splice(0, MAX_DIGITS - 1), exponent = numberOfIntegerDigits - 1, numberOfIntegerDigits = 1), {
                    d: digits,
                    e: exponent,
                    i: numberOfIntegerDigits
                }
            }

            function roundNumber(parsedNumber, fractionSize, minFrac, maxFrac) {
                var digits = parsedNumber.d,
                    fractionLen = digits.length - parsedNumber.i;
                fractionSize = isUndefined(fractionSize) ? Math.min(Math.max(minFrac, fractionLen), maxFrac) : +fractionSize;
                var roundAt = fractionSize + parsedNumber.i,
                    digit = digits[roundAt];
                if (roundAt > 0) {
                    digits.splice(Math.max(parsedNumber.i, roundAt));
                    for (var j = roundAt; j < digits.length; j++) digits[j] = 0
                } else {
                    fractionLen = Math.max(0, fractionLen), parsedNumber.i = 1, digits.length = Math.max(1, roundAt = fractionSize + 1), digits[0] = 0;
                    for (var i = 1; i < roundAt; i++) digits[i] = 0
                }
                if (digit >= 5)
                    if (roundAt - 1 < 0) {
                        for (var k = 0; k > roundAt; k--) digits.unshift(0), parsedNumber.i++;
                        digits.unshift(1), parsedNumber.i++
                    } else digits[roundAt - 1]++;
                for (; fractionLen < Math.max(0, fractionSize); fractionLen++) digits.push(0);
                var carry = digits.reduceRight(function(carry, d, i, digits) {
                    return d += carry, digits[i] = d % 10, Math.floor(d / 10)
                }, 0);
                carry && (digits.unshift(carry), parsedNumber.i++)
            }

            function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
                if (!isString(number) && !isNumber(number) || isNaN(number)) return "";
                var parsedNumber, isInfinity = !isFinite(number),
                    isZero = !1,
                    numStr = Math.abs(number) + "",
                    formattedText = "";
                if (isInfinity) formattedText = "∞";
                else {
                    parsedNumber = parse(numStr), roundNumber(parsedNumber, fractionSize, pattern.minFrac, pattern.maxFrac);
                    var digits = parsedNumber.d,
                        integerLen = parsedNumber.i,
                        exponent = parsedNumber.e,
                        decimals = [];
                    for (isZero = digits.reduce(function(isZero, d) {
                            return isZero && !d
                        }, !0); integerLen < 0;) digits.unshift(0), integerLen++;
                    integerLen > 0 ? decimals = digits.splice(integerLen, digits.length) : (decimals = digits, digits = [0]);
                    var groups = [];
                    for (digits.length >= pattern.lgSize && groups.unshift(digits.splice(-pattern.lgSize, digits.length).join("")); digits.length > pattern.gSize;) groups.unshift(digits.splice(-pattern.gSize, digits.length).join(""));
                    digits.length && groups.unshift(digits.join("")), formattedText = groups.join(groupSep), decimals.length && (formattedText += decimalSep + decimals.join("")), exponent && (formattedText += "e+" + exponent)
                }
                return number < 0 && !isZero ? pattern.negPre + formattedText + pattern.negSuf : pattern.posPre + formattedText + pattern.posSuf
            }

            function padNumber(num, digits, trim, negWrap) {
                var neg = "";
                for ((num < 0 || negWrap && num <= 0) && (negWrap ? num = -num + 1 : (num = -num, neg = "-")), num = "" + num; num.length < digits;) num = ZERO_CHAR + num;
                return trim && (num = num.substr(num.length - digits)), neg + num
            }

            function dateGetter(name, size, offset, trim, negWrap) {
                return offset = offset || 0,
                    function(date) {
                        var value = date["get" + name]();
                        return (offset > 0 || value > -offset) && (value += offset), 0 === value && offset === -12 && (value = 12), padNumber(value, size, trim, negWrap)
                    }
            }

            function dateStrGetter(name, shortForm, standAlone) {
                return function(date, formats) {
                    var value = date["get" + name](),
                        propPrefix = (standAlone ? "STANDALONE" : "") + (shortForm ? "SHORT" : ""),
                        get = uppercase(propPrefix + name);
                    return formats[get][value]
                }
            }

            function timeZoneGetter(date, formats, offset) {
                var zone = -1 * offset,
                    paddedZone = zone >= 0 ? "+" : "";
                return paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
            }

            function getFirstThursdayOfYear(year) {
                var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
                return new Date(year, 0, (dayOfWeekOnFirst <= 4 ? 5 : 12) - dayOfWeekOnFirst)
            }

            function getThursdayThisWeek(datetime) {
                return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()))
            }

            function weekGetter(size) {
                return function(date) {
                    var firstThurs = getFirstThursdayOfYear(date.getFullYear()),
                        thisThurs = getThursdayThisWeek(date),
                        diff = +thisThurs - +firstThurs,
                        result = 1 + Math.round(diff / 6048e5);
                    return padNumber(result, size)
                }
            }

            function ampmGetter(date, formats) {
                return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
            }

            function eraGetter(date, formats) {
                return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1]
            }

            function longEraGetter(date, formats) {
                return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1]
            }

            function dateFilter($locale) {
                function jsonStringToDate(string) {
                    var match;
                    if (match = string.match(R_ISO8601_STR)) {
                        var date = new Date(0),
                            tzHour = 0,
                            tzMin = 0,
                            dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
                            timeSetter = match[8] ? date.setUTCHours : date.setHours;
                        match[9] && (tzHour = toInt(match[9] + match[10]), tzMin = toInt(match[9] + match[11])), dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
                        var h = toInt(match[4] || 0) - tzHour,
                            m = toInt(match[5] || 0) - tzMin,
                            s = toInt(match[6] || 0),
                            ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
                        return timeSetter.call(date, h, m, s, ms), date
                    }
                    return string
                }
                var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
                return function(date, format, timezone) {
                    var fn, match, text = "",
                        parts = [];
                    if (format = format || "mediumDate", format = $locale.DATETIME_FORMATS[format] || format, isString(date) && (date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date)), isNumber(date) && (date = new Date(date)), !isDate(date) || !isFinite(date.getTime())) return date;
                    for (; format;) match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), format = parts.pop()) : (parts.push(format), format = null);
                    var dateTimezoneOffset = date.getTimezoneOffset();
                    return timezone && (dateTimezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset), date = convertTimezoneToLocal(date, timezone, !0)), forEach(parts, function(value) {
                        fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset) : "''" === value ? "'" : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                    }), text
                }
            }

            function jsonFilter() {
                return function(object, spacing) {
                    return isUndefined(spacing) && (spacing = 2), toJson(object, spacing)
                }
            }

            function limitToFilter() {
                return function(input, limit, begin) {
                    return limit = Math.abs(Number(limit)) === 1 / 0 ? Number(limit) : toInt(limit), isNumberNaN(limit) ? input : (isNumber(input) && (input = input.toString()), isArrayLike(input) ? (begin = !begin || isNaN(begin) ? 0 : toInt(begin), begin = begin < 0 ? Math.max(0, input.length + begin) : begin, limit >= 0 ? sliceFn(input, begin, begin + limit) : 0 === begin ? sliceFn(input, limit, input.length) : sliceFn(input, Math.max(0, begin + limit), begin)) : input)
                }
            }

            function sliceFn(input, begin, end) {
                return isString(input) ? input.slice(begin, end) : slice.call(input, begin, end)
            }

            function orderByFilter($parse) {
                function processPredicates(sortPredicates) {
                    return sortPredicates.map(function(predicate) {
                        var descending = 1,
                            get = identity;
                        if (isFunction(predicate)) get = predicate;
                        else if (isString(predicate) && ("+" !== predicate.charAt(0) && "-" !== predicate.charAt(0) || (descending = "-" === predicate.charAt(0) ? -1 : 1, predicate = predicate.substring(1)), "" !== predicate && (get = $parse(predicate), get.constant))) {
                            var key = get();
                            get = function(value) {
                                return value[key]
                            }
                        }
                        return {
                            get: get,
                            descending: descending
                        }
                    })
                }

                function isPrimitive(value) {
                    switch (typeof value) {
                        case "number":
                        case "boolean":
                        case "string":
                            return !0;
                        default:
                            return !1
                    }
                }

                function objectValue(value) {
                    return isFunction(value.valueOf) && (value = value.valueOf(), isPrimitive(value)) ? value : hasCustomToString(value) && (value = value.toString(), isPrimitive(value)) ? value : value
                }

                function getPredicateValue(value, index) {
                    var type = typeof value;
                    return null === value ? (type = "string", value = "null") : "object" === type && (value = objectValue(value)), {
                        value: value,
                        type: type,
                        index: index
                    }
                }

                function defaultCompare(v1, v2) {
                    var result = 0,
                        type1 = v1.type,
                        type2 = v2.type;
                    if (type1 === type2) {
                        var value1 = v1.value,
                            value2 = v2.value;
                        "string" === type1 ? (value1 = value1.toLowerCase(), value2 = value2.toLowerCase()) : "object" === type1 && (isObject(value1) && (value1 = v1.index), isObject(value2) && (value2 = v2.index)), value1 !== value2 && (result = value1 < value2 ? -1 : 1)
                    } else result = type1 < type2 ? -1 : 1;
                    return result
                }
                return function(array, sortPredicate, reverseOrder, compareFn) {
                    function getComparisonObject(value, index) {
                        return {
                            value: value,
                            tieBreaker: {
                                value: index,
                                type: "number",
                                index: index
                            },
                            predicateValues: predicates.map(function(predicate) {
                                return getPredicateValue(predicate.get(value), index)
                            })
                        }
                    }

                    function doComparison(v1, v2) {
                        for (var i = 0, ii = predicates.length; i < ii; i++) {
                            var result = compare(v1.predicateValues[i], v2.predicateValues[i]);
                            if (result) return result * predicates[i].descending * descending
                        }
                        return compare(v1.tieBreaker, v2.tieBreaker) * descending
                    }
                    if (null == array) return array;
                    if (!isArrayLike(array)) throw minErr("orderBy")("notarray", "Expected array but received: {0}", array);
                    isArray(sortPredicate) || (sortPredicate = [sortPredicate]), 0 === sortPredicate.length && (sortPredicate = ["+"]);
                    var predicates = processPredicates(sortPredicate),
                        descending = reverseOrder ? -1 : 1,
                        compare = isFunction(compareFn) ? compareFn : defaultCompare,
                        compareValues = Array.prototype.map.call(array, getComparisonObject);
                    return compareValues.sort(doComparison), array = compareValues.map(function(item) {
                        return item.value
                    })
                }
            }

            function ngDirective(directive) {
                return isFunction(directive) && (directive = {
                    link: directive
                }), directive.restrict = directive.restrict || "AC", valueFn(directive)
            }

            function nullFormRenameControl(control, name) {
                control.$name = name
            }

            function FormController(element, attrs, $scope, $animate, $interpolate) {
                var form = this,
                    controls = [];
                form.$error = {}, form.$$success = {}, form.$pending = void 0, form.$name = $interpolate(attrs.name || attrs.ngForm || "")($scope), form.$dirty = !1, form.$pristine = !0, form.$valid = !0, form.$invalid = !1, form.$submitted = !1, form.$$parentForm = nullFormCtrl, form.$rollbackViewValue = function() {
                    forEach(controls, function(control) {
                        control.$rollbackViewValue()
                    })
                }, form.$commitViewValue = function() {
                    forEach(controls, function(control) {
                        control.$commitViewValue()
                    })
                }, form.$addControl = function(control) {
                    assertNotHasOwnProperty(control.$name, "input"), controls.push(control), control.$name && (form[control.$name] = control), control.$$parentForm = form
                }, form.$$renameControl = function(control, newName) {
                    var oldName = control.$name;
                    form[oldName] === control && delete form[oldName], form[newName] = control, control.$name = newName
                }, form.$removeControl = function(control) {
                    control.$name && form[control.$name] === control && delete form[control.$name], forEach(form.$pending, function(value, name) {
                        form.$setValidity(name, null, control)
                    }), forEach(form.$error, function(value, name) {
                        form.$setValidity(name, null, control)
                    }), forEach(form.$$success, function(value, name) {
                        form.$setValidity(name, null, control)
                    }), arrayRemove(controls, control), control.$$parentForm = nullFormCtrl
                }, addSetValidityMethod({
                    ctrl: this,
                    $element: element,
                    set: function(object, property, controller) {
                        var list = object[property];
                        if (list) {
                            var index = list.indexOf(controller);
                            index === -1 && list.push(controller)
                        } else object[property] = [controller]
                    },
                    unset: function(object, property, controller) {
                        var list = object[property];
                        list && (arrayRemove(list, controller), 0 === list.length && delete object[property])
                    },
                    $animate: $animate
                }), form.$setDirty = function() {
                    $animate.removeClass(element, PRISTINE_CLASS), $animate.addClass(element, DIRTY_CLASS), form.$dirty = !0, form.$pristine = !1, form.$$parentForm.$setDirty()
                }, form.$setPristine = function() {
                    $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS),
                        form.$dirty = !1, form.$pristine = !0, form.$submitted = !1, forEach(controls, function(control) {
                            control.$setPristine()
                        })
                }, form.$setUntouched = function() {
                    forEach(controls, function(control) {
                        control.$setUntouched()
                    })
                }, form.$setSubmitted = function() {
                    $animate.addClass(element, SUBMITTED_CLASS), form.$submitted = !0, form.$$parentForm.$setSubmitted()
                }
            }

            function stringBasedInputType(ctrl) {
                ctrl.$formatters.push(function(value) {
                    return ctrl.$isEmpty(value) ? value : value.toString()
                })
            }

            function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl)
            }

            function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                var type = lowercase(element[0].type);
                if (!$sniffer.android) {
                    var composing = !1;
                    element.on("compositionstart", function() {
                        composing = !0
                    }), element.on("compositionend", function() {
                        composing = !1, listener()
                    })
                }
                var timeout, listener = function(ev) {
                    if (timeout && ($browser.defer.cancel(timeout), timeout = null), !composing) {
                        var value = element.val(),
                            event = ev && ev.type;
                        "password" === type || attr.ngTrim && "false" === attr.ngTrim || (value = trim(value)), (ctrl.$viewValue !== value || "" === value && ctrl.$$hasNativeValidators) && ctrl.$setViewValue(value, event)
                    }
                };
                if ($sniffer.hasEvent("input")) element.on("input", listener);
                else {
                    var deferListener = function(ev, input, origValue) {
                        timeout || (timeout = $browser.defer(function() {
                            timeout = null, input && input.value === origValue || listener(ev)
                        }))
                    };
                    element.on("keydown", function(event) {
                        var key = event.keyCode;
                        91 === key || 15 < key && key < 19 || 37 <= key && key <= 40 || deferListener(event, this, this.value)
                    }), $sniffer.hasEvent("paste") && element.on("paste cut", deferListener)
                }
                element.on("change", listener), PARTIAL_VALIDATION_TYPES[type] && ctrl.$$hasNativeValidators && type === attr.type && element.on(PARTIAL_VALIDATION_EVENTS, function(ev) {
                    if (!timeout) {
                        var validity = this[VALIDITY_STATE_PROPERTY],
                            origBadInput = validity.badInput,
                            origTypeMismatch = validity.typeMismatch;
                        timeout = $browser.defer(function() {
                            timeout = null, validity.badInput === origBadInput && validity.typeMismatch === origTypeMismatch || listener(ev)
                        })
                    }
                }), ctrl.$render = function() {
                    var value = ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue;
                    element.val() !== value && element.val(value)
                }
            }

            function weekParser(isoWeek, existingDate) {
                if (isDate(isoWeek)) return isoWeek;
                if (isString(isoWeek)) {
                    WEEK_REGEXP.lastIndex = 0;
                    var parts = WEEK_REGEXP.exec(isoWeek);
                    if (parts) {
                        var year = +parts[1],
                            week = +parts[2],
                            hours = 0,
                            minutes = 0,
                            seconds = 0,
                            milliseconds = 0,
                            firstThurs = getFirstThursdayOfYear(year),
                            addDays = 7 * (week - 1);
                        return existingDate && (hours = existingDate.getHours(), minutes = existingDate.getMinutes(), seconds = existingDate.getSeconds(), milliseconds = existingDate.getMilliseconds()), new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds)
                    }
                }
                return NaN
            }

            function createDateParser(regexp, mapping) {
                return function(iso, date) {
                    var parts, map;
                    if (isDate(iso)) return iso;
                    if (isString(iso)) {
                        if ('"' === iso.charAt(0) && '"' === iso.charAt(iso.length - 1) && (iso = iso.substring(1, iso.length - 1)), ISO_DATE_REGEXP.test(iso)) return new Date(iso);
                        if (regexp.lastIndex = 0, parts = regexp.exec(iso)) return parts.shift(), map = date ? {
                            yyyy: date.getFullYear(),
                            MM: date.getMonth() + 1,
                            dd: date.getDate(),
                            HH: date.getHours(),
                            mm: date.getMinutes(),
                            ss: date.getSeconds(),
                            sss: date.getMilliseconds() / 1e3
                        } : {
                            yyyy: 1970,
                            MM: 1,
                            dd: 1,
                            HH: 0,
                            mm: 0,
                            ss: 0,
                            sss: 0
                        }, forEach(parts, function(part, index) {
                            index < mapping.length && (map[mapping[index]] = +part)
                        }), new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, 1e3 * map.sss || 0)
                    }
                    return NaN
                }
            }

            function createDateInputType(type, regexp, parseDate, format) {
                return function(scope, element, attr, ctrl, $sniffer, $browser, $filter) {
                    function isValidDate(value) {
                        return value && !(value.getTime && value.getTime() !== value.getTime())
                    }

                    function parseObservedDateValue(val) {
                        return isDefined(val) && !isDate(val) ? parseDate(val) || void 0 : val
                    }
                    badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
                    var previousDate, timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
                    if (ctrl.$$parserName = type, ctrl.$parsers.push(function(value) {
                            if (ctrl.$isEmpty(value)) return null;
                            if (regexp.test(value)) {
                                var parsedDate = parseDate(value, previousDate);
                                return timezone && (parsedDate = convertTimezoneToLocal(parsedDate, timezone)), parsedDate
                            }
                        }), ctrl.$formatters.push(function(value) {
                            if (value && !isDate(value)) throw ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                            return isValidDate(value) ? (previousDate = value, previousDate && timezone && (previousDate = convertTimezoneToLocal(previousDate, timezone, !0)), $filter("date")(value, format, timezone)) : (previousDate = null, "")
                        }), isDefined(attr.min) || attr.ngMin) {
                        var minVal;
                        ctrl.$validators.min = function(value) {
                            return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal
                        }, attr.$observe("min", function(val) {
                            minVal = parseObservedDateValue(val), ctrl.$validate()
                        })
                    }
                    if (isDefined(attr.max) || attr.ngMax) {
                        var maxVal;
                        ctrl.$validators.max = function(value) {
                            return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal
                        }, attr.$observe("max", function(val) {
                            maxVal = parseObservedDateValue(val), ctrl.$validate()
                        })
                    }
                }
            }

            function badInputChecker(scope, element, attr, ctrl) {
                var node = element[0],
                    nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
                nativeValidation && ctrl.$parsers.push(function(value) {
                    var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
                    return validity.badInput || validity.typeMismatch ? void 0 : value
                })
            }

            function numberFormatterParser(ctrl) {
                ctrl.$$parserName = "number", ctrl.$parsers.push(function(value) {
                    return ctrl.$isEmpty(value) ? null : NUMBER_REGEXP.test(value) ? parseFloat(value) : void 0
                }), ctrl.$formatters.push(function(value) {
                    if (!ctrl.$isEmpty(value)) {
                        if (!isNumber(value)) throw ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                        value = value.toString()
                    }
                    return value
                })
            }

            function parseNumberAttrVal(val) {
                return isDefined(val) && !isNumber(val) && (val = parseFloat(val)), isNumberNaN(val) ? void 0 : val
            }

            function isNumberInteger(num) {
                return (0 | num) === num
            }

            function countDecimals(num) {
                var numString = num.toString(),
                    decimalSymbolIndex = numString.indexOf(".");
                if (decimalSymbolIndex === -1) {
                    if (-1 < num && num < 1) {
                        var match = /e-(\d+)$/.exec(numString);
                        if (match) return Number(match[1])
                    }
                    return 0
                }
                return numString.length - decimalSymbolIndex - 1
            }

            function isValidForStep(viewValue, stepBase, step) {
                var value = Number(viewValue);
                if (!isNumberInteger(value) || !isNumberInteger(stepBase) || !isNumberInteger(step)) {
                    var decimalCount = Math.max(countDecimals(value), countDecimals(stepBase), countDecimals(step)),
                        multiplier = Math.pow(10, decimalCount);
                    value *= multiplier, stepBase *= multiplier, step *= multiplier
                }
                return (value - stepBase) % step === 0
            }

            function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser), numberFormatterParser(ctrl);
                var minVal, maxVal;
                (isDefined(attr.min) || attr.ngMin) && (ctrl.$validators.min = function(value) {
                    return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal
                }, attr.$observe("min", function(val) {
                    minVal = parseNumberAttrVal(val), ctrl.$validate()
                })), (isDefined(attr.max) || attr.ngMax) && (ctrl.$validators.max = function(value) {
                    return ctrl.$isEmpty(value) || isUndefined(maxVal) || value <= maxVal
                }, attr.$observe("max", function(val) {
                    maxVal = parseNumberAttrVal(val), ctrl.$validate()
                }))
            }

            function rangeInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                function setInitialValueAndObserver(htmlAttrName, changeFn) {
                    element.attr(htmlAttrName, attr[htmlAttrName]), attr.$observe(htmlAttrName, changeFn)
                }

                function minChange(val) {
                    if (minVal = parseNumberAttrVal(val), !isNumberNaN(ctrl.$modelValue))
                        if (supportsRange) {
                            var elVal = element.val();
                            minVal > elVal && (elVal = minVal, element.val(elVal)), ctrl.$setViewValue(elVal)
                        } else ctrl.$validate()
                }

                function maxChange(val) {
                    if (maxVal = parseNumberAttrVal(val), !isNumberNaN(ctrl.$modelValue))
                        if (supportsRange) {
                            var elVal = element.val();
                            maxVal < elVal && (element.val(maxVal), elVal = maxVal < minVal ? minVal : maxVal), ctrl.$setViewValue(elVal)
                        } else ctrl.$validate()
                }

                function stepChange(val) {
                    stepVal = parseNumberAttrVal(val), isNumberNaN(ctrl.$modelValue) || (supportsRange && ctrl.$viewValue !== element.val() ? ctrl.$setViewValue(element.val()) : ctrl.$validate())
                }
                badInputChecker(scope, element, attr, ctrl), numberFormatterParser(ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
                var supportsRange = ctrl.$$hasNativeValidators && "range" === element[0].type,
                    minVal = supportsRange ? 0 : void 0,
                    maxVal = supportsRange ? 100 : void 0,
                    stepVal = supportsRange ? 1 : void 0,
                    validity = element[0].validity,
                    hasMinAttr = isDefined(attr.min),
                    hasMaxAttr = isDefined(attr.max),
                    hasStepAttr = isDefined(attr.step),
                    originalRender = ctrl.$render;
                ctrl.$render = supportsRange && isDefined(validity.rangeUnderflow) && isDefined(validity.rangeOverflow) ? function() {
                    originalRender(), ctrl.$setViewValue(element.val())
                } : originalRender, hasMinAttr && (ctrl.$validators.min = supportsRange ? function() {
                    return !0
                } : function(modelValue, viewValue) {
                    return ctrl.$isEmpty(viewValue) || isUndefined(minVal) || viewValue >= minVal
                }, setInitialValueAndObserver("min", minChange)), hasMaxAttr && (ctrl.$validators.max = supportsRange ? function() {
                    return !0
                } : function(modelValue, viewValue) {
                    return ctrl.$isEmpty(viewValue) || isUndefined(maxVal) || viewValue <= maxVal
                }, setInitialValueAndObserver("max", maxChange)), hasStepAttr && (ctrl.$validators.step = supportsRange ? function() {
                    return !validity.stepMismatch
                } : function(modelValue, viewValue) {
                    return ctrl.$isEmpty(viewValue) || isUndefined(stepVal) || isValidForStep(viewValue, minVal || 0, stepVal)
                }, setInitialValueAndObserver("step", stepChange))
            }

            function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), ctrl.$$parserName = "url", ctrl.$validators.url = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return ctrl.$isEmpty(value) || URL_REGEXP.test(value)
                }
            }

            function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), ctrl.$$parserName = "email", ctrl.$validators.email = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value)
                }
            }

            function radioInputType(scope, element, attr, ctrl) {
                isUndefined(attr.name) && element.attr("name", nextUid());
                var listener = function(ev) {
                    element[0].checked && ctrl.$setViewValue(attr.value, ev && ev.type)
                };
                element.on("click", listener), ctrl.$render = function() {
                    var value = attr.value;
                    element[0].checked = value === ctrl.$viewValue
                }, attr.$observe("value", ctrl.$render)
            }

            function parseConstantExpr($parse, context, name, expression, fallback) {
                var parseFn;
                if (isDefined(expression)) {
                    if (parseFn = $parse(expression), !parseFn.constant) throw ngModelMinErr("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", name, expression);
                    return parseFn(context)
                }
                return fallback
            }

            function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
                var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, !0),
                    falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, !1),
                    listener = function(ev) {
                        ctrl.$setViewValue(element[0].checked, ev && ev.type)
                    };
                element.on("click", listener), ctrl.$render = function() {
                    element[0].checked = ctrl.$viewValue
                }, ctrl.$isEmpty = function(value) {
                    return value === !1
                }, ctrl.$formatters.push(function(value) {
                    return equals(value, trueValue)
                }), ctrl.$parsers.push(function(value) {
                    return value ? trueValue : falseValue
                })
            }

            function classDirective(name, selector) {
                return name = "ngClass" + name, ["$animate", function($animate) {
                    function arrayDifference(tokens1, tokens2) {
                        var values = [];
                        outer: for (var i = 0; i < tokens1.length; i++) {
                            for (var token = tokens1[i], j = 0; j < tokens2.length; j++)
                                if (token === tokens2[j]) continue outer;
                            values.push(token)
                        }
                        return values
                    }

                    function arrayClasses(classVal) {
                        var classes = [];
                        return isArray(classVal) ? (forEach(classVal, function(v) {
                            classes = classes.concat(arrayClasses(v))
                        }), classes) : isString(classVal) ? classVal.split(" ") : isObject(classVal) ? (forEach(classVal, function(v, k) {
                            v && (classes = classes.concat(k.split(" ")))
                        }), classes) : classVal
                    }
                    return {
                        restrict: "AC",
                        link: function(scope, element, attr) {
                            function addClasses(classes) {
                                var newClasses = digestClassCounts(classes, 1);
                                attr.$addClass(newClasses)
                            }

                            function removeClasses(classes) {
                                var newClasses = digestClassCounts(classes, -1);
                                attr.$removeClass(newClasses)
                            }

                            function digestClassCounts(classes, count) {
                                var classCounts = element.data("$classCounts") || createMap(),
                                    classesToUpdate = [];
                                return forEach(classes, function(className) {
                                    (count > 0 || classCounts[className]) && (classCounts[className] = (classCounts[className] || 0) + count, classCounts[className] === +(count > 0) && classesToUpdate.push(className))
                                }), element.data("$classCounts", classCounts), classesToUpdate.join(" ")
                            }

                            function updateClasses(oldClasses, newClasses) {
                                var toAdd = arrayDifference(newClasses, oldClasses),
                                    toRemove = arrayDifference(oldClasses, newClasses);
                                toAdd = digestClassCounts(toAdd, 1), toRemove = digestClassCounts(toRemove, -1), toAdd && toAdd.length && $animate.addClass(element, toAdd), toRemove && toRemove.length && $animate.removeClass(element, toRemove)
                            }

                            function ngClassWatchAction(newVal) {
                                if (selector === !0 || (1 & scope.$index) === selector) {
                                    var newClasses = arrayClasses(newVal || []);
                                    if (oldVal) {
                                        if (!equals(newVal, oldVal)) {
                                            var oldClasses = arrayClasses(oldVal);
                                            updateClasses(oldClasses, newClasses)
                                        }
                                    } else addClasses(newClasses)
                                }
                                oldVal = isArray(newVal) ? newVal.map(function(v) {
                                    return shallowCopy(v)
                                }) : shallowCopy(newVal)
                            }
                            var oldVal;
                            scope.$watch(attr[name], ngClassWatchAction, !0), attr.$observe("class", function(value) {
                                ngClassWatchAction(scope.$eval(attr[name]))
                            }), "ngClass" !== name && scope.$watch("$index", function($index, old$index) {
                                var mod = 1 & $index;
                                if (mod !== (1 & old$index)) {
                                    var classes = arrayClasses(scope.$eval(attr[name]));
                                    mod === selector ? addClasses(classes) : removeClasses(classes)
                                }
                            })
                        }
                    }
                }]
            }

            function addSetValidityMethod(context) {
                function setValidity(validationErrorKey, state, controller) {
                    isUndefined(state) ? createAndSet("$pending", validationErrorKey, controller) : unsetAndCleanup("$pending", validationErrorKey, controller), isBoolean(state) ? state ? (unset(ctrl.$error, validationErrorKey, controller), set(ctrl.$$success, validationErrorKey, controller)) : (set(ctrl.$error, validationErrorKey, controller), unset(ctrl.$$success, validationErrorKey, controller)) : (unset(ctrl.$error, validationErrorKey, controller), unset(ctrl.$$success, validationErrorKey, controller)), ctrl.$pending ? (cachedToggleClass(PENDING_CLASS, !0), ctrl.$valid = ctrl.$invalid = void 0, toggleValidationCss("", null)) : (cachedToggleClass(PENDING_CLASS, !1), ctrl.$valid = isObjectEmpty(ctrl.$error), ctrl.$invalid = !ctrl.$valid, toggleValidationCss("", ctrl.$valid));
                    var combinedState;
                    combinedState = ctrl.$pending && ctrl.$pending[validationErrorKey] ? void 0 : !ctrl.$error[validationErrorKey] && (!!ctrl.$$success[validationErrorKey] || null), toggleValidationCss(validationErrorKey, combinedState), ctrl.$$parentForm.$setValidity(validationErrorKey, combinedState, ctrl)
                }

                function createAndSet(name, value, controller) {
                    ctrl[name] || (ctrl[name] = {}), set(ctrl[name], value, controller)
                }

                function unsetAndCleanup(name, value, controller) {
                    ctrl[name] && unset(ctrl[name], value, controller), isObjectEmpty(ctrl[name]) && (ctrl[name] = void 0)
                }

                function cachedToggleClass(className, switchValue) {
                    switchValue && !classCache[className] ? ($animate.addClass($element, className), classCache[className] = !0) : !switchValue && classCache[className] && ($animate.removeClass($element, className), classCache[className] = !1)
                }

                function toggleValidationCss(validationErrorKey, isValid) {
                    validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === !0), cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === !1)
                }
                var ctrl = context.ctrl,
                    $element = context.$element,
                    classCache = {},
                    set = context.set,
                    unset = context.unset,
                    $animate = context.$animate;
                classCache[INVALID_CLASS] = !(classCache[VALID_CLASS] = $element.hasClass(VALID_CLASS)), ctrl.$setValidity = setValidity
            }

            function isObjectEmpty(obj) {
                if (obj)
                    for (var prop in obj)
                        if (obj.hasOwnProperty(prop)) return !1;
                return !0
            }

            function chromeHack(optionElement) {
                optionElement[0].hasAttribute("selected") && (optionElement[0].selected = !0)
            }
            var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/,
                VALIDITY_STATE_PROPERTY = "validity",
                hasOwnProperty = Object.prototype.hasOwnProperty,
                lowercase = function(string) {
                    return isString(string) ? string.toLowerCase() : string
                },
                uppercase = function(string) {
                    return isString(string) ? string.toUpperCase() : string
                },
                manualLowercase = function(s) {
                    return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
                        return String.fromCharCode(32 | ch.charCodeAt(0))
                    }) : s
                },
                manualUppercase = function(s) {
                    return isString(s) ? s.replace(/[a-z]/g, function(ch) {
                        return String.fromCharCode(ch.charCodeAt(0) & -33)
                    }) : s
                };
            "i" !== "I".toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
            var msie, jqLite, jQuery, angularModule, slice = [].slice,
                splice = [].splice,
                push = [].push,
                toString = Object.prototype.toString,
                getPrototypeOf = Object.getPrototypeOf,
                ngMinErr = minErr("ng"),
                angular = window.angular || (window.angular = {}),
                uid = 0;
            msie = window.document.documentMode;
            var isNumberNaN = Number.isNaN || function(num) {
                return num !== num
            };
            noop.$inject = [], identity.$inject = [];
            var isArray = Array.isArray,
                TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
                trim = function(value) {
                    return isString(value) ? value.trim() : value
                },
                escapeForRegexp = function(s) {
                    return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
                },
                csp = function() {
                    function noUnsafeEval() {
                        try {
                            return new Function(""), !1
                        } catch (e) {
                            return !0
                        }
                    }
                    if (!isDefined(csp.rules)) {
                        var ngCspElement = window.document.querySelector("[ng-csp]") || window.document.querySelector("[data-ng-csp]");
                        if (ngCspElement) {
                            var ngCspAttribute = ngCspElement.getAttribute("ng-csp") || ngCspElement.getAttribute("data-ng-csp");
                            csp.rules = {
                                noUnsafeEval: !ngCspAttribute || ngCspAttribute.indexOf("no-unsafe-eval") !== -1,
                                noInlineStyle: !ngCspAttribute || ngCspAttribute.indexOf("no-inline-style") !== -1
                            }
                        } else csp.rules = {
                            noUnsafeEval: noUnsafeEval(),
                            noInlineStyle: !1
                        }
                    }
                    return csp.rules
                },
                jq = function() {
                    if (isDefined(jq.name_)) return jq.name_;
                    var el, i, prefix, name, ii = ngAttrPrefixes.length;
                    for (i = 0; i < ii; ++i)
                        if (prefix = ngAttrPrefixes[i], el = window.document.querySelector("[" + prefix.replace(":", "\\:") + "jq]")) {
                            name = el.getAttribute(prefix + "jq");
                            break
                        }
                    return jq.name_ = name
                },
                ALL_COLONS = /:/g,
                ngAttrPrefixes = ["ng-", "data-ng-", "ng:", "x-ng-"],
                isAutoBootstrapAllowed = allowAutoBootstrap(window.document),
                SNAKE_CASE_REGEXP = /[A-Z]/g,
                bindJQueryFired = !1,
                NODE_TYPE_ELEMENT = 1,
                NODE_TYPE_ATTRIBUTE = 2,
                NODE_TYPE_TEXT = 3,
                NODE_TYPE_COMMENT = 8,
                NODE_TYPE_DOCUMENT = 9,
                NODE_TYPE_DOCUMENT_FRAGMENT = 11,
                version = {
                    full: "1.5.9",
                    major: 1,
                    minor: 5,
                    dot: 9,
                    codeName: "timeturning-lockdown"
                };
            JQLite.expando = "ng339";
            var jqCache = JQLite.cache = {},
                jqId = 1,
                addEventListenerFn = function(element, type, fn) {
                    element.addEventListener(type, fn, !1)
                },
                removeEventListenerFn = function(element, type, fn) {
                    element.removeEventListener(type, fn, !1)
                };
            JQLite._data = function(node) {
                return this.cache[node[this.expando]] || {}
            };
            var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g,
                MOZ_HACK_REGEXP = /^moz([A-Z])/,
                MOUSE_EVENT_MAP = {
                    mouseleave: "mouseout",
                    mouseenter: "mouseover"
                },
                jqLiteMinErr = minErr("jqLite"),
                SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                HTML_REGEXP = /<|&#?\w+;/,
                TAG_NAME_REGEXP = /<([\w:-]+)/,
                XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                wrapMap = {
                    option: [1, '<select multiple="multiple">', "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
            var jqLiteContains = window.Node.prototype.contains || function(arg) {
                    return !!(16 & this.compareDocumentPosition(arg))
                },
                JQLitePrototype = JQLite.prototype = {
                    ready: function(fn) {
                        function trigger() {
                            fired || (fired = !0, fn())
                        }
                        var fired = !1;
                        "complete" === window.document.readyState ? window.setTimeout(trigger) : (this.on("DOMContentLoaded", trigger), JQLite(window).on("load", trigger))
                    },
                    toString: function() {
                        var value = [];
                        return forEach(this, function(e) {
                            value.push("" + e)
                        }), "[" + value.join(", ") + "]"
                    },
                    eq: function(index) {
                        return jqLite(index >= 0 ? this[index] : this[this.length + index])
                    },
                    length: 0,
                    push: push,
                    sort: [].sort,
                    splice: [].splice
                },
                BOOLEAN_ATTR = {};
            forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(value) {
                BOOLEAN_ATTR[lowercase(value)] = value
            });
            var BOOLEAN_ELEMENTS = {};
            forEach("input,select,option,textarea,button,form,details".split(","), function(value) {
                BOOLEAN_ELEMENTS[value] = !0
            });
            var ALIASED_ATTR = {
                ngMinlength: "minlength",
                ngMaxlength: "maxlength",
                ngMin: "min",
                ngMax: "max",
                ngPattern: "pattern"
            };
            forEach({
                data: jqLiteData,
                removeData: jqLiteRemoveData,
                hasData: jqLiteHasData,
                cleanData: jqLiteCleanData
            }, function(fn, name) {
                JQLite[name] = fn
            }), forEach({
                data: jqLiteData,
                inheritedData: jqLiteInheritedData,
                scope: function(element) {
                    return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, ["$isolateScope", "$scope"])
                },
                isolateScope: function(element) {
                    return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate")
                },
                controller: jqLiteController,
                injector: function(element) {
                    return jqLiteInheritedData(element, "$injector")
                },
                removeAttr: function(element, name) {
                    element.removeAttribute(name)
                },
                hasClass: jqLiteHasClass,
                css: function(element, name, value) {
                    return name = camelCase(name), isDefined(value) ? void(element.style[name] = value) : element.style[name]
                },
                attr: function(element, name, value) {
                    var nodeType = element.nodeType;
                    if (nodeType !== NODE_TYPE_TEXT && nodeType !== NODE_TYPE_ATTRIBUTE && nodeType !== NODE_TYPE_COMMENT) {
                        var lowercasedName = lowercase(name);
                        if (BOOLEAN_ATTR[lowercasedName]) {
                            if (!isDefined(value)) return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : void 0;
                            value ? (element[name] = !0, element.setAttribute(name, lowercasedName)) : (element[name] = !1, element.removeAttribute(lowercasedName))
                        } else if (isDefined(value)) element.setAttribute(name, value);
                        else if (element.getAttribute) {
                            var ret = element.getAttribute(name, 2);
                            return null === ret ? void 0 : ret
                        }
                    }
                },
                prop: function(element, name, value) {
                    return isDefined(value) ? void(element[name] = value) : element[name]
                },
                text: function() {
                    function getText(element, value) {
                        if (isUndefined(value)) {
                            var nodeType = element.nodeType;
                            return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : ""
                        }
                        element.textContent = value
                    }
                    return getText.$dv = "", getText
                }(),
                val: function(element, value) {
                    if (isUndefined(value)) {
                        if (element.multiple && "select" === nodeName_(element)) {
                            var result = [];
                            return forEach(element.options, function(option) {
                                option.selected && result.push(option.value || option.text)
                            }), 0 === result.length ? null : result
                        }
                        return element.value
                    }
                    element.value = value
                },
                html: function(element, value) {
                    return isUndefined(value) ? element.innerHTML : (jqLiteDealoc(element, !0), void(element.innerHTML = value))
                },
                empty: jqLiteEmpty
            }, function(fn, name) {
                JQLite.prototype[name] = function(arg1, arg2) {
                    var i, key, nodeCount = this.length;
                    if (fn !== jqLiteEmpty && isUndefined(2 === fn.length && fn !== jqLiteHasClass && fn !== jqLiteController ? arg1 : arg2)) {
                        if (isObject(arg1)) {
                            for (i = 0; i < nodeCount; i++)
                                if (fn === jqLiteData) fn(this[i], arg1);
                                else
                                    for (key in arg1) fn(this[i], key, arg1[key]);
                            return this
                        }
                        for (var value = fn.$dv, jj = isUndefined(value) ? Math.min(nodeCount, 1) : nodeCount, j = 0; j < jj; j++) {
                            var nodeValue = fn(this[j], arg1, arg2);
                            value = value ? value + nodeValue : nodeValue
                        }
                        return value
                    }
                    for (i = 0; i < nodeCount; i++) fn(this[i], arg1, arg2);
                    return this
                }
            }), forEach({
                removeData: jqLiteRemoveData,
                on: function(element, type, fn, unsupported) {
                    if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
                    if (jqLiteAcceptsData(element)) {
                        var expandoStore = jqLiteExpandoStore(element, !0),
                            events = expandoStore.events,
                            handle = expandoStore.handle;
                        handle || (handle = expandoStore.handle = createEventHandler(element, events));
                        for (var types = type.indexOf(" ") >= 0 ? type.split(" ") : [type], i = types.length, addHandler = function(type, specialHandlerWrapper, noEventListener) {
                                var eventFns = events[type];
                                eventFns || (eventFns = events[type] = [], eventFns.specialHandlerWrapper = specialHandlerWrapper, "$destroy" === type || noEventListener || addEventListenerFn(element, type, handle)), eventFns.push(fn)
                            }; i--;) type = types[i], MOUSE_EVENT_MAP[type] ? (addHandler(MOUSE_EVENT_MAP[type], specialMouseHandlerWrapper), addHandler(type, void 0, !0)) : addHandler(type)
                    }
                },
                off: jqLiteOff,
                one: function(element, type, fn) {
                    element = jqLite(element), element.on(type, function onFn() {
                        element.off(type, fn), element.off(type, onFn)
                    }), element.on(type, fn)
                },
                replaceWith: function(element, replaceNode) {
                    var index, parent = element.parentNode;
                    jqLiteDealoc(element), forEach(new JQLite(replaceNode), function(node) {
                        index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), index = node
                    })
                },
                children: function(element) {
                    var children = [];
                    return forEach(element.childNodes, function(element) {
                        element.nodeType === NODE_TYPE_ELEMENT && children.push(element)
                    }), children
                },
                contents: function(element) {
                    return element.contentDocument || element.childNodes || []
                },
                append: function(element, node) {
                    var nodeType = element.nodeType;
                    if (nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_DOCUMENT_FRAGMENT) {
                        node = new JQLite(node);
                        for (var i = 0, ii = node.length; i < ii; i++) {
                            var child = node[i];
                            element.appendChild(child)
                        }
                    }
                },
                prepend: function(element, node) {
                    if (element.nodeType === NODE_TYPE_ELEMENT) {
                        var index = element.firstChild;
                        forEach(new JQLite(node), function(child) {
                            element.insertBefore(child, index)
                        })
                    }
                },
                wrap: function(element, wrapNode) {
                    jqLiteWrapNode(element, jqLite(wrapNode).eq(0).clone()[0])
                },
                remove: jqLiteRemove,
                detach: function(element) {
                    jqLiteRemove(element, !0)
                },
                after: function(element, newElement) {
                    var index = element,
                        parent = element.parentNode;
                    newElement = new JQLite(newElement);
                    for (var i = 0, ii = newElement.length; i < ii; i++) {
                        var node = newElement[i];
                        parent.insertBefore(node, index.nextSibling), index = node
                    }
                },
                addClass: jqLiteAddClass,
                removeClass: jqLiteRemoveClass,
                toggleClass: function(element, selector, condition) {
                    selector && forEach(selector.split(" "), function(className) {
                        var classCondition = condition;
                        isUndefined(classCondition) && (classCondition = !jqLiteHasClass(element, className)), (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className)
                    })
                },
                parent: function(element) {
                    var parent = element.parentNode;
                    return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null
                },
                next: function(element) {
                    return element.nextElementSibling
                },
                find: function(element, selector) {
                    return element.getElementsByTagName ? element.getElementsByTagName(selector) : []
                },
                clone: jqLiteClone,
                triggerHandler: function(element, event, extraParameters) {
                    var dummyEvent, eventFnsCopy, handlerArgs, eventName = event.type || event,
                        expandoStore = jqLiteExpandoStore(element),
                        events = expandoStore && expandoStore.events,
                        eventFns = events && events[eventName];
                    eventFns && (dummyEvent = {
                        preventDefault: function() {
                            this.defaultPrevented = !0
                        },
                        isDefaultPrevented: function() {
                            return this.defaultPrevented === !0
                        },
                        stopImmediatePropagation: function() {
                            this.immediatePropagationStopped = !0
                        },
                        isImmediatePropagationStopped: function() {
                            return this.immediatePropagationStopped === !0
                        },
                        stopPropagation: noop,
                        type: eventName,
                        target: element
                    }, event.type && (dummyEvent = extend(dummyEvent, event)), eventFnsCopy = shallowCopy(eventFns), handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent], forEach(eventFnsCopy, function(fn) {
                        dummyEvent.isImmediatePropagationStopped() || fn.apply(element, handlerArgs)
                    }))
                }
            }, function(fn, name) {
                JQLite.prototype[name] = function(arg1, arg2, arg3) {
                    for (var value, i = 0, ii = this.length; i < ii; i++) isUndefined(value) ? (value = fn(this[i], arg1, arg2, arg3), isDefined(value) && (value = jqLite(value))) : jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
                    return isDefined(value) ? value : this
                }, JQLite.prototype.bind = JQLite.prototype.on, JQLite.prototype.unbind = JQLite.prototype.off
            }), HashMap.prototype = {
                put: function(key, value) {
                    this[hashKey(key, this.nextUid)] = value
                },
                get: function(key) {
                    return this[hashKey(key, this.nextUid)]
                },
                remove: function(key) {
                    var value = this[key = hashKey(key, this.nextUid)];
                    return delete this[key], value
                }
            };
            var $$HashMapProvider = [function() {
                    this.$get = [function() {
                        return HashMap
                    }]
                }],
                ARROW_ARG = /^([^\(]+?)=>/,
                FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m,
                FN_ARG_SPLIT = /,/,
                FN_ARG = /^\s*(_?)(\S+?)\1\s*$/,
                STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
                $injectorMinErr = minErr("$injector");
            createInjector.$$annotate = annotate;
            var $animateMinErr = minErr("$animate"),
                ELEMENT_NODE = 1,
                NG_ANIMATE_CLASSNAME = "ng-animate",
                $$CoreAnimateJsProvider = function() {
                    this.$get = noop
                },
                $$CoreAnimateQueueProvider = function() {
                    var postDigestQueue = new HashMap,
                        postDigestElements = [];
                    this.$get = ["$$AnimateRunner", "$rootScope", function($$AnimateRunner, $rootScope) {
                        function updateData(data, classes, value) {
                            var changed = !1;
                            return classes && (classes = isString(classes) ? classes.split(" ") : isArray(classes) ? classes : [], forEach(classes, function(className) {
                                className && (changed = !0, data[className] = value)
                            })), changed
                        }

                        function handleCSSClassChanges() {
                            forEach(postDigestElements, function(element) {
                                var data = postDigestQueue.get(element);
                                if (data) {
                                    var existing = splitClasses(element.attr("class")),
                                        toAdd = "",
                                        toRemove = "";
                                    forEach(data, function(status, className) {
                                        var hasClass = !!existing[className];
                                        status !== hasClass && (status ? toAdd += (toAdd.length ? " " : "") + className : toRemove += (toRemove.length ? " " : "") + className)
                                    }), forEach(element, function(elm) {
                                        toAdd && jqLiteAddClass(elm, toAdd), toRemove && jqLiteRemoveClass(elm, toRemove)
                                    }), postDigestQueue.remove(element)
                                }
                            }), postDigestElements.length = 0
                        }

                        function addRemoveClassesPostDigest(element, add, remove) {
                            var data = postDigestQueue.get(element) || {},
                                classesAdded = updateData(data, add, !0),
                                classesRemoved = updateData(data, remove, !1);
                            (classesAdded || classesRemoved) && (postDigestQueue.put(element, data), postDigestElements.push(element), 1 === postDigestElements.length && $rootScope.$$postDigest(handleCSSClassChanges))
                        }
                        return {
                            enabled: noop,
                            on: noop,
                            off: noop,
                            pin: noop,
                            push: function(element, event, options, domOperation) {
                                domOperation && domOperation(), options = options || {}, options.from && element.css(options.from), options.to && element.css(options.to), (options.addClass || options.removeClass) && addRemoveClassesPostDigest(element, options.addClass, options.removeClass);
                                var runner = new $$AnimateRunner;
                                return runner.complete(), runner
                            }
                        }
                    }]
                },
                $AnimateProvider = ["$provide", function($provide) {
                    var provider = this;
                    this.$$registeredAnimations = Object.create(null), this.register = function(name, factory) {
                        if (name && "." !== name.charAt(0)) throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
                        var key = name + "-animation";
                        provider.$$registeredAnimations[name.substr(1)] = key, $provide.factory(key, factory)
                    }, this.classNameFilter = function(expression) {
                        if (1 === arguments.length && (this.$$classNameFilter = expression instanceof RegExp ? expression : null, this.$$classNameFilter)) {
                            var reservedRegex = new RegExp("(\\s+|\\/)" + NG_ANIMATE_CLASSNAME + "(\\s+|\\/)");
                            if (reservedRegex.test(this.$$classNameFilter.toString())) throw $animateMinErr("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', NG_ANIMATE_CLASSNAME)
                        }
                        return this.$$classNameFilter
                    }, this.$get = ["$$animateQueue", function($$animateQueue) {
                        function domInsert(element, parentElement, afterElement) {
                            if (afterElement) {
                                var afterNode = extractElementNode(afterElement);
                                !afterNode || afterNode.parentNode || afterNode.previousElementSibling || (afterElement = null)
                            }
                            afterElement ? afterElement.after(element) : parentElement.prepend(element)
                        }
                        return {
                            on: $$animateQueue.on,
                            off: $$animateQueue.off,
                            pin: $$animateQueue.pin,
                            enabled: $$animateQueue.enabled,
                            cancel: function(runner) {
                                runner.end && runner.end()
                            },
                            enter: function(element, parent, after, options) {
                                return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), domInsert(element, parent, after), $$animateQueue.push(element, "enter", prepareAnimateOptions(options))
                            },
                            move: function(element, parent, after, options) {
                                return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), domInsert(element, parent, after), $$animateQueue.push(element, "move", prepareAnimateOptions(options))
                            },
                            leave: function(element, options) {
                                return $$animateQueue.push(element, "leave", prepareAnimateOptions(options), function() {
                                    element.remove()
                                })
                            },
                            addClass: function(element, className, options) {
                                return options = prepareAnimateOptions(options),
                                    options.addClass = mergeClasses(options.addclass, className), $$animateQueue.push(element, "addClass", options)
                            },
                            removeClass: function(element, className, options) {
                                return options = prepareAnimateOptions(options), options.removeClass = mergeClasses(options.removeClass, className), $$animateQueue.push(element, "removeClass", options)
                            },
                            setClass: function(element, add, remove, options) {
                                return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addClass, add), options.removeClass = mergeClasses(options.removeClass, remove), $$animateQueue.push(element, "setClass", options)
                            },
                            animate: function(element, from, to, className, options) {
                                return options = prepareAnimateOptions(options), options.from = options.from ? extend(options.from, from) : from, options.to = options.to ? extend(options.to, to) : to, className = className || "ng-inline-animate", options.tempClasses = mergeClasses(options.tempClasses, className), $$animateQueue.push(element, "animate", options)
                            }
                        }
                    }]
                }],
                $$AnimateAsyncRunFactoryProvider = function() {
                    this.$get = ["$$rAF", function($$rAF) {
                        function waitForTick(fn) {
                            waitQueue.push(fn), waitQueue.length > 1 || $$rAF(function() {
                                for (var i = 0; i < waitQueue.length; i++) waitQueue[i]();
                                waitQueue = []
                            })
                        }
                        var waitQueue = [];
                        return function() {
                            var passed = !1;
                            return waitForTick(function() {
                                    passed = !0
                                }),
                                function(callback) {
                                    passed ? callback() : waitForTick(callback)
                                }
                        }
                    }]
                },
                $$AnimateRunnerFactoryProvider = function() {
                    this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function($q, $sniffer, $$animateAsyncRun, $document, $timeout) {
                        function AnimateRunner(host) {
                            this.setHost(host);
                            var rafTick = $$animateAsyncRun(),
                                timeoutTick = function(fn) {
                                    $timeout(fn, 0, !1)
                                };
                            this._doneCallbacks = [], this._tick = function(fn) {
                                var doc = $document[0];
                                doc && doc.hidden ? timeoutTick(fn) : rafTick(fn)
                            }, this._state = 0
                        }
                        var INITIAL_STATE = 0,
                            DONE_PENDING_STATE = 1,
                            DONE_COMPLETE_STATE = 2;
                        return AnimateRunner.chain = function(chain, callback) {
                            function next() {
                                return index === chain.length ? void callback(!0) : void chain[index](function(response) {
                                    return response === !1 ? void callback(!1) : (index++, void next())
                                })
                            }
                            var index = 0;
                            next()
                        }, AnimateRunner.all = function(runners, callback) {
                            function onProgress(response) {
                                status = status && response, ++count === runners.length && callback(status)
                            }
                            var count = 0,
                                status = !0;
                            forEach(runners, function(runner) {
                                runner.done(onProgress)
                            })
                        }, AnimateRunner.prototype = {
                            setHost: function(host) {
                                this.host = host || {}
                            },
                            done: function(fn) {
                                this._state === DONE_COMPLETE_STATE ? fn() : this._doneCallbacks.push(fn)
                            },
                            progress: noop,
                            getPromise: function() {
                                if (!this.promise) {
                                    var self = this;
                                    this.promise = $q(function(resolve, reject) {
                                        self.done(function(status) {
                                            status === !1 ? reject() : resolve()
                                        })
                                    })
                                }
                                return this.promise
                            },
                            then: function(resolveHandler, rejectHandler) {
                                return this.getPromise().then(resolveHandler, rejectHandler)
                            },
                            catch: function(handler) {
                                return this.getPromise().catch(handler)
                            },
                            finally: function(handler) {
                                return this.getPromise().finally(handler)
                            },
                            pause: function() {
                                this.host.pause && this.host.pause()
                            },
                            resume: function() {
                                this.host.resume && this.host.resume()
                            },
                            end: function() {
                                this.host.end && this.host.end(), this._resolve(!0)
                            },
                            cancel: function() {
                                this.host.cancel && this.host.cancel(), this._resolve(!1)
                            },
                            complete: function(response) {
                                var self = this;
                                self._state === INITIAL_STATE && (self._state = DONE_PENDING_STATE, self._tick(function() {
                                    self._resolve(response)
                                }))
                            },
                            _resolve: function(response) {
                                this._state !== DONE_COMPLETE_STATE && (forEach(this._doneCallbacks, function(fn) {
                                    fn(response)
                                }), this._doneCallbacks.length = 0, this._state = DONE_COMPLETE_STATE)
                            }
                        }, AnimateRunner
                    }]
                },
                $CoreAnimateCssProvider = function() {
                    this.$get = ["$$rAF", "$q", "$$AnimateRunner", function($$rAF, $q, $$AnimateRunner) {
                        return function(element, initialOptions) {
                            function run() {
                                return $$rAF(function() {
                                    applyAnimationContents(), closed || runner.complete(), closed = !0
                                }), runner
                            }

                            function applyAnimationContents() {
                                options.addClass && (element.addClass(options.addClass), options.addClass = null), options.removeClass && (element.removeClass(options.removeClass), options.removeClass = null), options.to && (element.css(options.to), options.to = null)
                            }
                            var options = initialOptions || {};
                            options.$$prepared || (options = copy(options)), options.cleanupStyles && (options.from = options.to = null), options.from && (element.css(options.from), options.from = null);
                            var closed, runner = new $$AnimateRunner;
                            return {
                                start: run,
                                end: run
                            }
                        }
                    }]
                },
                $compileMinErr = minErr("$compile"),
                _UNINITIALIZED_VALUE = new UNINITIALIZED_VALUE;
            $CompileProvider.$inject = ["$provide", "$$sanitizeUriProvider"], SimpleChange.prototype.isFirstChange = function() {
                return this.previousValue === _UNINITIALIZED_VALUE
            };
            var PREFIX_REGEXP = /^((?:x|data)[:\-_])/i,
                $controllerMinErr = minErr("$controller"),
                CNTRL_REG = /^(\S+)(\s+as\s+([\w$]+))?$/,
                $$ForceReflowProvider = function() {
                    this.$get = ["$document", function($document) {
                        return function(domNode) {
                            return domNode ? !domNode.nodeType && domNode instanceof jqLite && (domNode = domNode[0]) : domNode = $document[0].body, domNode.offsetWidth + 1
                        }
                    }]
                },
                APPLICATION_JSON = "application/json",
                CONTENT_TYPE_APPLICATION_JSON = {
                    "Content-Type": APPLICATION_JSON + ";charset=utf-8"
                },
                JSON_START = /^\[|^\{(?!\{)/,
                JSON_ENDS = {
                    "[": /]$/,
                    "{": /}$/
                },
                JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/,
                $httpMinErr = minErr("$http"),
                $httpMinErrLegacyFn = function(method) {
                    return function() {
                        throw $httpMinErr("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", method)
                    }
                },
                $interpolateMinErr = angular.$interpolateMinErr = minErr("$interpolate");
            $interpolateMinErr.throwNoconcat = function(text) {
                throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", text)
            }, $interpolateMinErr.interr = function(text, err) {
                return $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString())
            };
            var $jsonpCallbacksProvider = function() {
                    this.$get = ["$window", function($window) {
                        function createCallback(callbackId) {
                            var callback = function(data) {
                                callback.data = data, callback.called = !0
                            };
                            return callback.id = callbackId, callback
                        }
                        var callbacks = $window.angular.callbacks,
                            callbackMap = {};
                        return {
                            createCallback: function(url) {
                                var callbackId = "_" + (callbacks.$$counter++).toString(36),
                                    callbackPath = "angular.callbacks." + callbackId,
                                    callback = createCallback(callbackId);
                                return callbackMap[callbackPath] = callbacks[callbackId] = callback, callbackPath
                            },
                            wasCalled: function(callbackPath) {
                                return callbackMap[callbackPath].called
                            },
                            getResponse: function(callbackPath) {
                                return callbackMap[callbackPath].data
                            },
                            removeCallback: function(callbackPath) {
                                var callback = callbackMap[callbackPath];
                                delete callbacks[callback.id], delete callbackMap[callbackPath]
                            }
                        }
                    }]
                },
                PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
                DEFAULT_PORTS = {
                    http: 80,
                    https: 443,
                    ftp: 21
                },
                $locationMinErr = minErr("$location"),
                DOUBLE_SLASH_REGEX = /^\s*[\\/]{2,}/,
                locationPrototype = {
                    $$absUrl: "",
                    $$html5: !1,
                    $$replace: !1,
                    absUrl: locationGetter("$$absUrl"),
                    url: function(url) {
                        if (isUndefined(url)) return this.$$url;
                        var match = PATH_MATCH.exec(url);
                        return (match[1] || "" === url) && this.path(decodeURIComponent(match[1])), (match[2] || match[1] || "" === url) && this.search(match[3] || ""), this.hash(match[5] || ""), this
                    },
                    protocol: locationGetter("$$protocol"),
                    host: locationGetter("$$host"),
                    port: locationGetter("$$port"),
                    path: locationGetterSetter("$$path", function(path) {
                        return path = null !== path ? path.toString() : "", "/" === path.charAt(0) ? path : "/" + path
                    }),
                    search: function(search, paramValue) {
                        switch (arguments.length) {
                            case 0:
                                return this.$$search;
                            case 1:
                                if (isString(search) || isNumber(search)) search = search.toString(), this.$$search = parseKeyValue(search);
                                else {
                                    if (!isObject(search)) throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                                    search = copy(search, {}), forEach(search, function(value, key) {
                                        null == value && delete search[key]
                                    }), this.$$search = search
                                }
                                break;
                            default:
                                isUndefined(paramValue) || null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue
                        }
                        return this.$$compose(), this
                    },
                    hash: locationGetterSetter("$$hash", function(hash) {
                        return null !== hash ? hash.toString() : ""
                    }),
                    replace: function() {
                        return this.$$replace = !0, this
                    }
                };
            forEach([LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url], function(Location) {
                Location.prototype = Object.create(locationPrototype), Location.prototype.state = function(state) {
                    if (!arguments.length) return this.$$state;
                    if (Location !== LocationHtml5Url || !this.$$html5) throw $locationMinErr("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
                    return this.$$state = isUndefined(state) ? null : state, this
                }
            });
            var $parseMinErr = minErr("$parse"),
                ARRAY_CTOR = [].constructor,
                BOOLEAN_CTOR = (!1).constructor,
                FUNCTION_CTOR = Function.constructor,
                NUMBER_CTOR = (0).constructor,
                OBJECT_CTOR = {}.constructor,
                STRING_CTOR = "".constructor,
                ARRAY_CTOR_PROTO = ARRAY_CTOR.prototype,
                BOOLEAN_CTOR_PROTO = BOOLEAN_CTOR.prototype,
                FUNCTION_CTOR_PROTO = FUNCTION_CTOR.prototype,
                NUMBER_CTOR_PROTO = NUMBER_CTOR.prototype,
                OBJECT_CTOR_PROTO = OBJECT_CTOR.prototype,
                STRING_CTOR_PROTO = STRING_CTOR.prototype,
                CALL = FUNCTION_CTOR_PROTO.call,
                APPLY = FUNCTION_CTOR_PROTO.apply,
                BIND = FUNCTION_CTOR_PROTO.bind,
                objectValueOf = OBJECT_CTOR_PROTO.valueOf,
                OPERATORS = createMap();
            forEach("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(operator) {
                OPERATORS[operator] = !0
            });
            var ESCAPE = {
                    n: "\n",
                    f: "\f",
                    r: "\r",
                    t: "\t",
                    v: "\v",
                    "'": "'",
                    '"': '"'
                },
                Lexer = function(options) {
                    this.options = options
                };
            Lexer.prototype = {
                constructor: Lexer,
                lex: function(text) {
                    for (this.text = text, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                        var ch = this.text.charAt(this.index);
                        if ('"' === ch || "'" === ch) this.readString(ch);
                        else if (this.isNumber(ch) || "." === ch && this.isNumber(this.peek())) this.readNumber();
                        else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();
                        else if (this.is(ch, "(){}[].,;:?")) this.tokens.push({
                            index: this.index,
                            text: ch
                        }), this.index++;
                        else if (this.isWhitespace(ch)) this.index++;
                        else {
                            var ch2 = ch + this.peek(),
                                ch3 = ch2 + this.peek(2),
                                op1 = OPERATORS[ch],
                                op2 = OPERATORS[ch2],
                                op3 = OPERATORS[ch3];
                            if (op1 || op2 || op3) {
                                var token = op3 ? ch3 : op2 ? ch2 : ch;
                                this.tokens.push({
                                    index: this.index,
                                    text: token,
                                    operator: !0
                                }), this.index += token.length
                            } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                        }
                    }
                    return this.tokens
                },
                is: function(ch, chars) {
                    return chars.indexOf(ch) !== -1
                },
                peek: function(i) {
                    var num = i || 1;
                    return this.index + num < this.text.length && this.text.charAt(this.index + num)
                },
                isNumber: function(ch) {
                    return "0" <= ch && ch <= "9" && "string" == typeof ch
                },
                isWhitespace: function(ch) {
                    return " " === ch || "\r" === ch || "\t" === ch || "\n" === ch || "\v" === ch || " " === ch
                },
                isIdentifierStart: function(ch) {
                    return this.options.isIdentifierStart ? this.options.isIdentifierStart(ch, this.codePointAt(ch)) : this.isValidIdentifierStart(ch)
                },
                isValidIdentifierStart: function(ch) {
                    return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || "_" === ch || "$" === ch
                },
                isIdentifierContinue: function(ch) {
                    return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(ch, this.codePointAt(ch)) : this.isValidIdentifierContinue(ch)
                },
                isValidIdentifierContinue: function(ch, cp) {
                    return this.isValidIdentifierStart(ch, cp) || this.isNumber(ch)
                },
                codePointAt: function(ch) {
                    return 1 === ch.length ? ch.charCodeAt(0) : (ch.charCodeAt(0) << 10) + ch.charCodeAt(1) - 56613888
                },
                peekMultichar: function() {
                    var ch = this.text.charAt(this.index),
                        peek = this.peek();
                    if (!peek) return ch;
                    var cp1 = ch.charCodeAt(0),
                        cp2 = peek.charCodeAt(0);
                    return cp1 >= 55296 && cp1 <= 56319 && cp2 >= 56320 && cp2 <= 57343 ? ch + peek : ch
                },
                isExpOperator: function(ch) {
                    return "-" === ch || "+" === ch || this.isNumber(ch)
                },
                throwError: function(error, start, end) {
                    end = end || this.index;
                    var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
                    throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text)
                },
                readNumber: function() {
                    for (var number = "", start = this.index; this.index < this.text.length;) {
                        var ch = lowercase(this.text.charAt(this.index));
                        if ("." === ch || this.isNumber(ch)) number += ch;
                        else {
                            var peekCh = this.peek();
                            if ("e" === ch && this.isExpOperator(peekCh)) number += ch;
                            else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && "e" === number.charAt(number.length - 1)) number += ch;
                            else {
                                if (!this.isExpOperator(ch) || peekCh && this.isNumber(peekCh) || "e" !== number.charAt(number.length - 1)) break;
                                this.throwError("Invalid exponent")
                            }
                        }
                        this.index++
                    }
                    this.tokens.push({
                        index: start,
                        text: number,
                        constant: !0,
                        value: Number(number)
                    })
                },
                readIdent: function() {
                    var start = this.index;
                    for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
                        var ch = this.peekMultichar();
                        if (!this.isIdentifierContinue(ch)) break;
                        this.index += ch.length
                    }
                    this.tokens.push({
                        index: start,
                        text: this.text.slice(start, this.index),
                        identifier: !0
                    })
                },
                readString: function(quote) {
                    var start = this.index;
                    this.index++;
                    for (var string = "", rawString = quote, escape = !1; this.index < this.text.length;) {
                        var ch = this.text.charAt(this.index);
                        if (rawString += ch, escape) {
                            if ("u" === ch) {
                                var hex = this.text.substring(this.index + 1, this.index + 5);
                                hex.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + hex + "]"), this.index += 4, string += String.fromCharCode(parseInt(hex, 16))
                            } else {
                                var rep = ESCAPE[ch];
                                string += rep || ch
                            }
                            escape = !1
                        } else if ("\\" === ch) escape = !0;
                        else {
                            if (ch === quote) return this.index++, void this.tokens.push({
                                index: start,
                                text: rawString,
                                constant: !0,
                                value: string
                            });
                            string += ch
                        }
                        this.index++
                    }
                    this.throwError("Unterminated quote", start)
                }
            };
            var AST = function(lexer, options) {
                this.lexer = lexer, this.options = options
            };
            AST.Program = "Program", AST.ExpressionStatement = "ExpressionStatement", AST.AssignmentExpression = "AssignmentExpression", AST.ConditionalExpression = "ConditionalExpression", AST.LogicalExpression = "LogicalExpression", AST.BinaryExpression = "BinaryExpression", AST.UnaryExpression = "UnaryExpression", AST.CallExpression = "CallExpression", AST.MemberExpression = "MemberExpression", AST.Identifier = "Identifier", AST.Literal = "Literal", AST.ArrayExpression = "ArrayExpression", AST.Property = "Property", AST.ObjectExpression = "ObjectExpression", AST.ThisExpression = "ThisExpression", AST.LocalsExpression = "LocalsExpression", AST.NGValueParameter = "NGValueParameter", AST.prototype = {
                ast: function(text) {
                    this.text = text, this.tokens = this.lexer.lex(text);
                    var value = this.program();
                    return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), value
                },
                program: function() {
                    for (var body = [];;)
                        if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && body.push(this.expressionStatement()), !this.expect(";")) return {
                            type: AST.Program,
                            body: body
                        }
                },
                expressionStatement: function() {
                    return {
                        type: AST.ExpressionStatement,
                        expression: this.filterChain()
                    }
                },
                filterChain: function() {
                    for (var left = this.expression(); this.expect("|");) left = this.filter(left);
                    return left
                },
                expression: function() {
                    return this.assignment()
                },
                assignment: function() {
                    var result = this.ternary();
                    return this.expect("=") && (result = {
                        type: AST.AssignmentExpression,
                        left: result,
                        right: this.assignment(),
                        operator: "="
                    }), result
                },
                ternary: function() {
                    var alternate, consequent, test = this.logicalOR();
                    return this.expect("?") && (alternate = this.expression(), this.consume(":")) ? (consequent = this.expression(), {
                        type: AST.ConditionalExpression,
                        test: test,
                        alternate: alternate,
                        consequent: consequent
                    }) : test
                },
                logicalOR: function() {
                    for (var left = this.logicalAND(); this.expect("||");) left = {
                        type: AST.LogicalExpression,
                        operator: "||",
                        left: left,
                        right: this.logicalAND()
                    };
                    return left
                },
                logicalAND: function() {
                    for (var left = this.equality(); this.expect("&&");) left = {
                        type: AST.LogicalExpression,
                        operator: "&&",
                        left: left,
                        right: this.equality()
                    };
                    return left
                },
                equality: function() {
                    for (var token, left = this.relational(); token = this.expect("==", "!=", "===", "!==");) left = {
                        type: AST.BinaryExpression,
                        operator: token.text,
                        left: left,
                        right: this.relational()
                    };
                    return left
                },
                relational: function() {
                    for (var token, left = this.additive(); token = this.expect("<", ">", "<=", ">=");) left = {
                        type: AST.BinaryExpression,
                        operator: token.text,
                        left: left,
                        right: this.additive()
                    };
                    return left
                },
                additive: function() {
                    for (var token, left = this.multiplicative(); token = this.expect("+", "-");) left = {
                        type: AST.BinaryExpression,
                        operator: token.text,
                        left: left,
                        right: this.multiplicative()
                    };
                    return left
                },
                multiplicative: function() {
                    for (var token, left = this.unary(); token = this.expect("*", "/", "%");) left = {
                        type: AST.BinaryExpression,
                        operator: token.text,
                        left: left,
                        right: this.unary()
                    };
                    return left
                },
                unary: function() {
                    var token;
                    return (token = this.expect("+", "-", "!")) ? {
                        type: AST.UnaryExpression,
                        operator: token.text,
                        prefix: !0,
                        argument: this.unary()
                    } : this.primary()
                },
                primary: function() {
                    var primary;
                    this.expect("(") ? (primary = this.filterChain(), this.consume(")")) : this.expect("[") ? primary = this.arrayDeclaration() : this.expect("{") ? primary = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? primary = copy(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? primary = {
                        type: AST.Literal,
                        value: this.options.literals[this.consume().text]
                    } : this.peek().identifier ? primary = this.identifier() : this.peek().constant ? primary = this.constant() : this.throwError("not a primary expression", this.peek());
                    for (var next; next = this.expect("(", "[", ".");) "(" === next.text ? (primary = {
                        type: AST.CallExpression,
                        callee: primary,
                        arguments: this.parseArguments()
                    }, this.consume(")")) : "[" === next.text ? (primary = {
                        type: AST.MemberExpression,
                        object: primary,
                        property: this.expression(),
                        computed: !0
                    }, this.consume("]")) : "." === next.text ? primary = {
                        type: AST.MemberExpression,
                        object: primary,
                        property: this.identifier(),
                        computed: !1
                    } : this.throwError("IMPOSSIBLE");
                    return primary
                },
                filter: function(baseExpression) {
                    for (var args = [baseExpression], result = {
                            type: AST.CallExpression,
                            callee: this.identifier(),
                            arguments: args,
                            filter: !0
                        }; this.expect(":");) args.push(this.expression());
                    return result
                },
                parseArguments: function() {
                    var args = [];
                    if (")" !== this.peekToken().text)
                        do args.push(this.filterChain()); while (this.expect(","));
                    return args
                },
                identifier: function() {
                    var token = this.consume();
                    return token.identifier || this.throwError("is not a valid identifier", token), {
                        type: AST.Identifier,
                        name: token.text
                    }
                },
                constant: function() {
                    return {
                        type: AST.Literal,
                        value: this.consume().value
                    }
                },
                arrayDeclaration: function() {
                    var elements = [];
                    if ("]" !== this.peekToken().text)
                        do {
                            if (this.peek("]")) break;
                            elements.push(this.expression())
                        } while (this.expect(","));
                    return this.consume("]"), {
                        type: AST.ArrayExpression,
                        elements: elements
                    }
                },
                object: function() {
                    var property, properties = [];
                    if ("}" !== this.peekToken().text)
                        do {
                            if (this.peek("}")) break;
                            property = {
                                type: AST.Property,
                                kind: "init"
                            }, this.peek().constant ? (property.key = this.constant(), property.computed = !1, this.consume(":"), property.value = this.expression()) : this.peek().identifier ? (property.key = this.identifier(), property.computed = !1, this.peek(":") ? (this.consume(":"), property.value = this.expression()) : property.value = property.key) : this.peek("[") ? (this.consume("["), property.key = this.expression(), this.consume("]"), property.computed = !0, this.consume(":"), property.value = this.expression()) : this.throwError("invalid key", this.peek()), properties.push(property)
                        } while (this.expect(","));
                    return this.consume("}"), {
                        type: AST.ObjectExpression,
                        properties: properties
                    }
                },
                throwError: function(msg, token) {
                    throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index))
                },
                consume: function(e1) {
                    if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
                    var token = this.expect(e1);
                    return token || this.throwError("is unexpected, expecting [" + e1 + "]", this.peek()), token
                },
                peekToken: function() {
                    if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
                    return this.tokens[0]
                },
                peek: function(e1, e2, e3, e4) {
                    return this.peekAhead(0, e1, e2, e3, e4)
                },
                peekAhead: function(i, e1, e2, e3, e4) {
                    if (this.tokens.length > i) {
                        var token = this.tokens[i],
                            t = token.text;
                        if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) return token
                    }
                    return !1
                },
                expect: function(e1, e2, e3, e4) {
                    var token = this.peek(e1, e2, e3, e4);
                    return !!token && (this.tokens.shift(), token)
                },
                selfReferential: {
                    this: {
                        type: AST.ThisExpression
                    },
                    $locals: {
                        type: AST.LocalsExpression
                    }
                }
            }, ASTCompiler.prototype = {
                compile: function(expression, expensiveChecks) {
                    var self = this,
                        ast = this.astBuilder.ast(expression);
                    this.state = {
                        nextId: 0,
                        filters: {},
                        expensiveChecks: expensiveChecks,
                        fn: {
                            vars: [],
                            body: [],
                            own: {}
                        },
                        assign: {
                            vars: [],
                            body: [],
                            own: {}
                        },
                        inputs: []
                    }, findConstantAndWatchExpressions(ast, self.$filter);
                    var assignable, extra = "";
                    if (this.stage = "assign", assignable = assignableAST(ast)) {
                        this.state.computing = "assign";
                        var result = this.nextId();
                        this.recurse(assignable, result), this.return_(result), extra = "fn.assign=" + this.generateFunction("assign", "s,v,l")
                    }
                    var toWatch = getInputs(ast.body);
                    self.stage = "inputs", forEach(toWatch, function(watch, key) {
                        var fnKey = "fn" + key;
                        self.state[fnKey] = {
                            vars: [],
                            body: [],
                            own: {}
                        }, self.state.computing = fnKey;
                        var intoId = self.nextId();
                        self.recurse(watch, intoId), self.return_(intoId), self.state.inputs.push(fnKey), watch.watchId = key
                    }), this.state.computing = "fn", this.stage = "main", this.recurse(ast);
                    var fnString = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + extra + this.watchFns() + "return fn;",
                        fn = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", fnString)(this.$filter, ensureSafeMemberName, ensureSafeObject, ensureSafeFunction, getStringValue, ensureSafeAssignContext, ifDefined, plusFn, expression);
                    return this.state = this.stage = void 0, fn.literal = isLiteral(ast), fn.constant = isConstant(ast), fn
                },
                USE: "use",
                STRICT: "strict",
                watchFns: function() {
                    var result = [],
                        fns = this.state.inputs,
                        self = this;
                    return forEach(fns, function(name) {
                        result.push("var " + name + "=" + self.generateFunction(name, "s"))
                    }), fns.length && result.push("fn.inputs=[" + fns.join(",") + "];"), result.join("")
                },
                generateFunction: function(name, params) {
                    return "function(" + params + "){" + this.varsPrefix(name) + this.body(name) + "};"
                },
                filterPrefix: function() {
                    var parts = [],
                        self = this;
                    return forEach(this.state.filters, function(id, filter) {
                        parts.push(id + "=$filter(" + self.escape(filter) + ")")
                    }), parts.length ? "var " + parts.join(",") + ";" : ""
                },
                varsPrefix: function(section) {
                    return this.state[section].vars.length ? "var " + this.state[section].vars.join(",") + ";" : ""
                },
                body: function(section) {
                    return this.state[section].body.join("")
                },
                recurse: function(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
                    var left, right, args, expression, computed, self = this;
                    if (recursionFn = recursionFn || noop, !skipWatchIdCheck && isDefined(ast.watchId)) return intoId = intoId || this.nextId(), void this.if_("i", this.lazyAssign(intoId, this.computedMember("i", ast.watchId)), this.lazyRecurse(ast, intoId, nameId, recursionFn, create, !0));
                    switch (ast.type) {
                        case AST.Program:
                            forEach(ast.body, function(expression, pos) {
                                self.recurse(expression.expression, void 0, void 0, function(expr) {
                                    right = expr
                                }), pos !== ast.body.length - 1 ? self.current().body.push(right, ";") : self.return_(right)
                            });
                            break;
                        case AST.Literal:
                            expression = this.escape(ast.value), this.assign(intoId, expression), recursionFn(expression);
                            break;
                        case AST.UnaryExpression:
                            this.recurse(ast.argument, void 0, void 0, function(expr) {
                                right = expr
                            }), expression = ast.operator + "(" + this.ifDefined(right, 0) + ")", this.assign(intoId, expression), recursionFn(expression);
                            break;
                        case AST.BinaryExpression:
                            this.recurse(ast.left, void 0, void 0, function(expr) {
                                left = expr
                            }), this.recurse(ast.right, void 0, void 0, function(expr) {
                                right = expr
                            }), expression = "+" === ast.operator ? this.plus(left, right) : "-" === ast.operator ? this.ifDefined(left, 0) + ast.operator + this.ifDefined(right, 0) : "(" + left + ")" + ast.operator + "(" + right + ")", this.assign(intoId, expression), recursionFn(expression);
                            break;
                        case AST.LogicalExpression:
                            intoId = intoId || this.nextId(), self.recurse(ast.left, intoId), self.if_("&&" === ast.operator ? intoId : self.not(intoId), self.lazyRecurse(ast.right, intoId)), recursionFn(intoId);
                            break;
                        case AST.ConditionalExpression:
                            intoId = intoId || this.nextId(), self.recurse(ast.test, intoId), self.if_(intoId, self.lazyRecurse(ast.alternate, intoId), self.lazyRecurse(ast.consequent, intoId)), recursionFn(intoId);
                            break;
                        case AST.Identifier:
                            intoId = intoId || this.nextId(), nameId && (nameId.context = "inputs" === self.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", ast.name) + "?l:s"), nameId.computed = !1, nameId.name = ast.name), ensureSafeMemberName(ast.name), self.if_("inputs" === self.stage || self.not(self.getHasOwnProperty("l", ast.name)), function() {
                                self.if_("inputs" === self.stage || "s", function() {
                                    create && 1 !== create && self.if_(self.not(self.nonComputedMember("s", ast.name)), self.lazyAssign(self.nonComputedMember("s", ast.name), "{}")), self.assign(intoId, self.nonComputedMember("s", ast.name))
                                })
                            }, intoId && self.lazyAssign(intoId, self.nonComputedMember("l", ast.name))), (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.name)) && self.addEnsureSafeObject(intoId), recursionFn(intoId);
                            break;
                        case AST.MemberExpression:
                            left = nameId && (nameId.context = this.nextId()) || this.nextId(), intoId = intoId || this.nextId(), self.recurse(ast.object, left, void 0, function() {
                                self.if_(self.notNull(left), function() {
                                    create && 1 !== create && self.addEnsureSafeAssignContext(left), ast.computed ? (right = self.nextId(), self.recurse(ast.property, right), self.getStringValue(right), self.addEnsureSafeMemberName(right), create && 1 !== create && self.if_(self.not(self.computedMember(left, right)), self.lazyAssign(self.computedMember(left, right), "{}")), expression = self.ensureSafeObject(self.computedMember(left, right)), self.assign(intoId, expression), nameId && (nameId.computed = !0, nameId.name = right)) : (ensureSafeMemberName(ast.property.name), create && 1 !== create && self.if_(self.not(self.nonComputedMember(left, ast.property.name)), self.lazyAssign(self.nonComputedMember(left, ast.property.name), "{}")), expression = self.nonComputedMember(left, ast.property.name), (self.state.expensiveChecks || isPossiblyDangerousMemberName(ast.property.name)) && (expression = self.ensureSafeObject(expression)), self.assign(intoId, expression), nameId && (nameId.computed = !1, nameId.name = ast.property.name))
                                }, function() {
                                    self.assign(intoId, "undefined")
                                }), recursionFn(intoId)
                            }, !!create);
                            break;
                        case AST.CallExpression:
                            intoId = intoId || this.nextId(), ast.filter ? (right = self.filter(ast.callee.name), args = [], forEach(ast.arguments, function(expr) {
                                var argument = self.nextId();
                                self.recurse(expr, argument), args.push(argument)
                            }), expression = right + "(" + args.join(",") + ")", self.assign(intoId, expression), recursionFn(intoId)) : (right = self.nextId(), left = {}, args = [], self.recurse(ast.callee, right, left, function() {
                                self.if_(self.notNull(right), function() {
                                    self.addEnsureSafeFunction(right), forEach(ast.arguments, function(expr) {
                                        self.recurse(expr, self.nextId(), void 0, function(argument) {
                                            args.push(self.ensureSafeObject(argument))
                                        })
                                    }), left.name ? (self.state.expensiveChecks || self.addEnsureSafeObject(left.context), expression = self.member(left.context, left.name, left.computed) + "(" + args.join(",") + ")") : expression = right + "(" + args.join(",") + ")", expression = self.ensureSafeObject(expression), self.assign(intoId, expression)
                                }, function() {
                                    self.assign(intoId, "undefined")
                                }), recursionFn(intoId)
                            }));
                            break;
                        case AST.AssignmentExpression:
                            if (right = this.nextId(), left = {}, !isAssignable(ast.left)) throw $parseMinErr("lval", "Trying to assign a value to a non l-value");
                            this.recurse(ast.left, void 0, left, function() {
                                self.if_(self.notNull(left.context), function() {
                                    self.recurse(ast.right, right), self.addEnsureSafeObject(self.member(left.context, left.name, left.computed)), self.addEnsureSafeAssignContext(left.context), expression = self.member(left.context, left.name, left.computed) + ast.operator + right, self.assign(intoId, expression), recursionFn(intoId || expression)
                                })
                            }, 1);
                            break;
                        case AST.ArrayExpression:
                            args = [], forEach(ast.elements, function(expr) {
                                self.recurse(expr, self.nextId(), void 0, function(argument) {
                                    args.push(argument)
                                })
                            }), expression = "[" + args.join(",") + "]", this.assign(intoId, expression), recursionFn(expression);
                            break;
                        case AST.ObjectExpression:
                            args = [], computed = !1, forEach(ast.properties, function(property) {
                                property.computed && (computed = !0)
                            }), computed ? (intoId = intoId || this.nextId(), this.assign(intoId, "{}"), forEach(ast.properties, function(property) {
                                property.computed ? (left = self.nextId(), self.recurse(property.key, left)) : left = property.key.type === AST.Identifier ? property.key.name : "" + property.key.value, right = self.nextId(), self.recurse(property.value, right), self.assign(self.member(intoId, left, property.computed), right)
                            })) : (forEach(ast.properties, function(property) {
                                self.recurse(property.value, ast.constant ? void 0 : self.nextId(), void 0, function(expr) {
                                    args.push(self.escape(property.key.type === AST.Identifier ? property.key.name : "" + property.key.value) + ":" + expr)
                                })
                            }), expression = "{" + args.join(",") + "}", this.assign(intoId, expression)), recursionFn(intoId || expression);
                            break;
                        case AST.ThisExpression:
                            this.assign(intoId, "s"), recursionFn("s");
                            break;
                        case AST.LocalsExpression:
                            this.assign(intoId, "l"), recursionFn("l");
                            break;
                        case AST.NGValueParameter:
                            this.assign(intoId, "v"), recursionFn("v")
                    }
                },
                getHasOwnProperty: function(element, property) {
                    var key = element + "." + property,
                        own = this.current().own;
                    return own.hasOwnProperty(key) || (own[key] = this.nextId(!1, element + "&&(" + this.escape(property) + " in " + element + ")")), own[key]
                },
                assign: function(id, value) {
                    if (id) return this.current().body.push(id, "=", value, ";"), id
                },
                filter: function(filterName) {
                    return this.state.filters.hasOwnProperty(filterName) || (this.state.filters[filterName] = this.nextId(!0)), this.state.filters[filterName]
                },
                ifDefined: function(id, defaultValue) {
                    return "ifDefined(" + id + "," + this.escape(defaultValue) + ")"
                },
                plus: function(left, right) {
                    return "plus(" + left + "," + right + ")"
                },
                return_: function(id) {
                    this.current().body.push("return ", id, ";")
                },
                if_: function(test, alternate, consequent) {
                    if (test === !0) alternate();
                    else {
                        var body = this.current().body;
                        body.push("if(", test, "){"), alternate(), body.push("}"), consequent && (body.push("else{"), consequent(), body.push("}"))
                    }
                },
                not: function(expression) {
                    return "!(" + expression + ")"
                },
                notNull: function(expression) {
                    return expression + "!=null"
                },
                nonComputedMember: function(left, right) {
                    var SAFE_IDENTIFIER = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/,
                        UNSAFE_CHARACTERS = /[^$_a-zA-Z0-9]/g;
                    return SAFE_IDENTIFIER.test(right) ? left + "." + right : left + '["' + right.replace(UNSAFE_CHARACTERS, this.stringEscapeFn) + '"]'
                },
                computedMember: function(left, right) {
                    return left + "[" + right + "]"
                },
                member: function(left, right, computed) {
                    return computed ? this.computedMember(left, right) : this.nonComputedMember(left, right)
                },
                addEnsureSafeObject: function(item) {
                    this.current().body.push(this.ensureSafeObject(item), ";")
                },
                addEnsureSafeMemberName: function(item) {
                    this.current().body.push(this.ensureSafeMemberName(item), ";")
                },
                addEnsureSafeFunction: function(item) {
                    this.current().body.push(this.ensureSafeFunction(item), ";")
                },
                addEnsureSafeAssignContext: function(item) {
                    this.current().body.push(this.ensureSafeAssignContext(item), ";")
                },
                ensureSafeObject: function(item) {
                    return "ensureSafeObject(" + item + ",text)"
                },
                ensureSafeMemberName: function(item) {
                    return "ensureSafeMemberName(" + item + ",text)"
                },
                ensureSafeFunction: function(item) {
                    return "ensureSafeFunction(" + item + ",text)"
                },
                getStringValue: function(item) {
                    this.assign(item, "getStringValue(" + item + ")")
                },
                ensureSafeAssignContext: function(item) {
                    return "ensureSafeAssignContext(" + item + ",text)"
                },
                lazyRecurse: function(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
                    var self = this;
                    return function() {
                        self.recurse(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck)
                    }
                },
                lazyAssign: function(id, value) {
                    var self = this;
                    return function() {
                        self.assign(id, value)
                    }
                },
                stringEscapeRegex: /[^ a-zA-Z0-9]/g,
                stringEscapeFn: function(c) {
                    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
                },
                escape: function(value) {
                    if (isString(value)) return "'" + value.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
                    if (isNumber(value)) return value.toString();
                    if (value === !0) return "true";
                    if (value === !1) return "false";
                    if (null === value) return "null";
                    if ("undefined" == typeof value) return "undefined";
                    throw $parseMinErr("esc", "IMPOSSIBLE")
                },
                nextId: function(skip, init) {
                    var id = "v" + this.state.nextId++;
                    return skip || this.current().vars.push(id + (init ? "=" + init : "")), id
                },
                current: function() {
                    return this.state[this.state.computing]
                }
            }, ASTInterpreter.prototype = {
                compile: function(expression, expensiveChecks) {
                    var self = this,
                        ast = this.astBuilder.ast(expression);
                    this.expression = expression, this.expensiveChecks = expensiveChecks, findConstantAndWatchExpressions(ast, self.$filter);
                    var assignable, assign;
                    (assignable = assignableAST(ast)) && (assign = this.recurse(assignable));
                    var inputs, toWatch = getInputs(ast.body);
                    toWatch && (inputs = [], forEach(toWatch, function(watch, key) {
                        var input = self.recurse(watch);
                        watch.input = input, inputs.push(input), watch.watchId = key
                    }));
                    var expressions = [];
                    forEach(ast.body, function(expression) {
                        expressions.push(self.recurse(expression.expression))
                    });
                    var fn = 0 === ast.body.length ? noop : 1 === ast.body.length ? expressions[0] : function(scope, locals) {
                        var lastValue;
                        return forEach(expressions, function(exp) {
                            lastValue = exp(scope, locals)
                        }), lastValue
                    };
                    return assign && (fn.assign = function(scope, value, locals) {
                        return assign(scope, locals, value)
                    }), inputs && (fn.inputs = inputs), fn.literal = isLiteral(ast), fn.constant = isConstant(ast), fn
                },
                recurse: function(ast, context, create) {
                    var left, right, args, self = this;
                    if (ast.input) return this.inputs(ast.input, ast.watchId);
                    switch (ast.type) {
                        case AST.Literal:
                            return this.value(ast.value, context);
                        case AST.UnaryExpression:
                            return right = this.recurse(ast.argument), this["unary" + ast.operator](right, context);
                        case AST.BinaryExpression:
                            return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);
                        case AST.LogicalExpression:
                            return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);
                        case AST.ConditionalExpression:
                            return this["ternary?:"](this.recurse(ast.test), this.recurse(ast.alternate), this.recurse(ast.consequent), context);
                        case AST.Identifier:
                            return ensureSafeMemberName(ast.name, self.expression), self.identifier(ast.name, self.expensiveChecks || isPossiblyDangerousMemberName(ast.name), context, create, self.expression);
                        case AST.MemberExpression:
                            return left = this.recurse(ast.object, !1, !!create), ast.computed || (ensureSafeMemberName(ast.property.name, self.expression), right = ast.property.name), ast.computed && (right = this.recurse(ast.property)), ast.computed ? this.computedMember(left, right, context, create, self.expression) : this.nonComputedMember(left, right, self.expensiveChecks, context, create, self.expression);
                        case AST.CallExpression:
                            return args = [], forEach(ast.arguments, function(expr) {
                                args.push(self.recurse(expr))
                            }), ast.filter && (right = this.$filter(ast.callee.name)), ast.filter || (right = this.recurse(ast.callee, !0)), ast.filter ? function(scope, locals, assign, inputs) {
                                for (var values = [], i = 0; i < args.length; ++i) values.push(args[i](scope, locals, assign, inputs));
                                var value = right.apply(void 0, values, inputs);
                                return context ? {
                                    context: void 0,
                                    name: void 0,
                                    value: value
                                } : value
                            } : function(scope, locals, assign, inputs) {
                                var value, rhs = right(scope, locals, assign, inputs);
                                if (null != rhs.value) {
                                    ensureSafeObject(rhs.context, self.expression), ensureSafeFunction(rhs.value, self.expression);
                                    for (var values = [], i = 0; i < args.length; ++i) values.push(ensureSafeObject(args[i](scope, locals, assign, inputs), self.expression));
                                    value = ensureSafeObject(rhs.value.apply(rhs.context, values), self.expression)
                                }
                                return context ? {
                                    value: value
                                } : value
                            };
                        case AST.AssignmentExpression:
                            return left = this.recurse(ast.left, !0, 1), right = this.recurse(ast.right),
                                function(scope, locals, assign, inputs) {
                                    var lhs = left(scope, locals, assign, inputs),
                                        rhs = right(scope, locals, assign, inputs);
                                    return ensureSafeObject(lhs.value, self.expression), ensureSafeAssignContext(lhs.context), lhs.context[lhs.name] = rhs, context ? {
                                        value: rhs
                                    } : rhs
                                };
                        case AST.ArrayExpression:
                            return args = [], forEach(ast.elements, function(expr) {
                                    args.push(self.recurse(expr))
                                }),
                                function(scope, locals, assign, inputs) {
                                    for (var value = [], i = 0; i < args.length; ++i) value.push(args[i](scope, locals, assign, inputs));
                                    return context ? {
                                        value: value
                                    } : value
                                };
                        case AST.ObjectExpression:
                            return args = [], forEach(ast.properties, function(property) {
                                    property.computed ? args.push({
                                        key: self.recurse(property.key),
                                        computed: !0,
                                        value: self.recurse(property.value)
                                    }) : args.push({
                                        key: property.key.type === AST.Identifier ? property.key.name : "" + property.key.value,
                                        computed: !1,
                                        value: self.recurse(property.value)
                                    })
                                }),
                                function(scope, locals, assign, inputs) {
                                    for (var value = {}, i = 0; i < args.length; ++i) args[i].computed ? value[args[i].key(scope, locals, assign, inputs)] = args[i].value(scope, locals, assign, inputs) : value[args[i].key] = args[i].value(scope, locals, assign, inputs);
                                    return context ? {
                                        value: value
                                    } : value
                                };
                        case AST.ThisExpression:
                            return function(scope) {
                                return context ? {
                                    value: scope
                                } : scope
                            };
                        case AST.LocalsExpression:
                            return function(scope, locals) {
                                return context ? {
                                    value: locals
                                } : locals
                            };
                        case AST.NGValueParameter:
                            return function(scope, locals, assign) {
                                return context ? {
                                    value: assign
                                } : assign
                            }
                    }
                },
                "unary+": function(argument, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = argument(scope, locals, assign, inputs);
                        return arg = isDefined(arg) ? +arg : 0, context ? {
                            value: arg
                        } : arg
                    }
                },
                "unary-": function(argument, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = argument(scope, locals, assign, inputs);
                        return arg = isDefined(arg) ? -arg : 0, context ? {
                            value: arg
                        } : arg
                    }
                },
                "unary!": function(argument, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = !argument(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary+": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var lhs = left(scope, locals, assign, inputs),
                            rhs = right(scope, locals, assign, inputs),
                            arg = plusFn(lhs, rhs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary-": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var lhs = left(scope, locals, assign, inputs),
                            rhs = right(scope, locals, assign, inputs),
                            arg = (isDefined(lhs) ? lhs : 0) - (isDefined(rhs) ? rhs : 0);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary*": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) * right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary/": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) / right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary%": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) % right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary===": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) === right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary!==": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) !== right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary==": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) == right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary!=": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) != right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary<": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) < right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary>": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) > right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary<=": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) <= right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary>=": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) >= right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary&&": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) && right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "binary||": function(left, right, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = left(scope, locals, assign, inputs) || right(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                "ternary?:": function(test, alternate, consequent, context) {
                    return function(scope, locals, assign, inputs) {
                        var arg = test(scope, locals, assign, inputs) ? alternate(scope, locals, assign, inputs) : consequent(scope, locals, assign, inputs);
                        return context ? {
                            value: arg
                        } : arg
                    }
                },
                value: function(value, context) {
                    return function() {
                        return context ? {
                            context: void 0,
                            name: void 0,
                            value: value
                        } : value
                    }
                },
                identifier: function(name, expensiveChecks, context, create, expression) {
                    return function(scope, locals, assign, inputs) {
                        var base = locals && name in locals ? locals : scope;
                        create && 1 !== create && base && !base[name] && (base[name] = {});
                        var value = base ? base[name] : void 0;
                        return expensiveChecks && ensureSafeObject(value, expression), context ? {
                            context: base,
                            name: name,
                            value: value
                        } : value
                    }
                },
                computedMember: function(left, right, context, create, expression) {
                    return function(scope, locals, assign, inputs) {
                        var rhs, value, lhs = left(scope, locals, assign, inputs);
                        return null != lhs && (rhs = right(scope, locals, assign, inputs), rhs = getStringValue(rhs), ensureSafeMemberName(rhs, expression), create && 1 !== create && (ensureSafeAssignContext(lhs), lhs && !lhs[rhs] && (lhs[rhs] = {})), value = lhs[rhs], ensureSafeObject(value, expression)), context ? {
                            context: lhs,
                            name: rhs,
                            value: value
                        } : value
                    }
                },
                nonComputedMember: function(left, right, expensiveChecks, context, create, expression) {
                    return function(scope, locals, assign, inputs) {
                        var lhs = left(scope, locals, assign, inputs);
                        create && 1 !== create && (ensureSafeAssignContext(lhs), lhs && !lhs[right] && (lhs[right] = {}));
                        var value = null != lhs ? lhs[right] : void 0;
                        return (expensiveChecks || isPossiblyDangerousMemberName(right)) && ensureSafeObject(value, expression), context ? {
                            context: lhs,
                            name: right,
                            value: value
                        } : value
                    }
                },
                inputs: function(input, watchId) {
                    return function(scope, value, locals, inputs) {
                        return inputs ? inputs[watchId] : input(scope, value, locals)
                    }
                }
            };
            var Parser = function(lexer, $filter, options) {
                this.lexer = lexer, this.$filter = $filter, this.options = options, this.ast = new AST(lexer, options), this.astCompiler = options.csp ? new ASTInterpreter(this.ast, $filter) : new ASTCompiler(this.ast, $filter)
            };
            Parser.prototype = {
                constructor: Parser,
                parse: function(text) {
                    return this.astCompiler.compile(text, this.options.expensiveChecks)
                }
            };
            var $sceMinErr = minErr("$sce"),
                SCE_CONTEXTS = {
                    HTML: "html",
                    CSS: "css",
                    URL: "url",
                    RESOURCE_URL: "resourceUrl",
                    JS: "js"
                },
                $templateRequestMinErr = minErr("$compile"),
                urlParsingNode = window.document.createElement("a"),
                originUrl = urlResolve(window.location.href);
            $$CookieReader.$inject = ["$document"], $FilterProvider.$inject = ["$provide"];
            var MAX_DIGITS = 22,
                DECIMAL_SEP = ".",
                ZERO_CHAR = "0";
            currencyFilter.$inject = ["$locale"], numberFilter.$inject = ["$locale"];
            var DATE_FORMATS = {
                    yyyy: dateGetter("FullYear", 4, 0, !1, !0),
                    yy: dateGetter("FullYear", 2, 0, !0, !0),
                    y: dateGetter("FullYear", 1, 0, !1, !0),
                    MMMM: dateStrGetter("Month"),
                    MMM: dateStrGetter("Month", !0),
                    MM: dateGetter("Month", 2, 1),
                    M: dateGetter("Month", 1, 1),
                    LLLL: dateStrGetter("Month", !1, !0),
                    dd: dateGetter("Date", 2),
                    d: dateGetter("Date", 1),
                    HH: dateGetter("Hours", 2),
                    H: dateGetter("Hours", 1),
                    hh: dateGetter("Hours", 2, -12),
                    h: dateGetter("Hours", 1, -12),
                    mm: dateGetter("Minutes", 2),
                    m: dateGetter("Minutes", 1),
                    ss: dateGetter("Seconds", 2),
                    s: dateGetter("Seconds", 1),
                    sss: dateGetter("Milliseconds", 3),
                    EEEE: dateStrGetter("Day"),
                    EEE: dateStrGetter("Day", !0),
                    a: ampmGetter,
                    Z: timeZoneGetter,
                    ww: weekGetter(2),
                    w: weekGetter(1),
                    G: eraGetter,
                    GG: eraGetter,
                    GGG: eraGetter,
                    GGGG: longEraGetter
                },
                DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
                NUMBER_STRING = /^\-?\d+$/;
            dateFilter.$inject = ["$locale"];
            var lowercaseFilter = valueFn(lowercase),
                uppercaseFilter = valueFn(uppercase);
            orderByFilter.$inject = ["$parse"];
            var htmlAnchorDirective = valueFn({
                    restrict: "E",
                    compile: function(element, attr) {
                        if (!attr.href && !attr.xlinkHref) return function(scope, element) {
                            if ("a" === element[0].nodeName.toLowerCase()) {
                                var href = "[object SVGAnimatedString]" === toString.call(element.prop("href")) ? "xlink:href" : "href";
                                element.on("click", function(event) {
                                    element.attr(href) || event.preventDefault()
                                })
                            }
                        }
                    }
                }),
                ngAttributeAliasDirectives = {};
            forEach(BOOLEAN_ATTR, function(propName, attrName) {
                function defaultLinkFn(scope, element, attr) {
                    scope.$watch(attr[normalized], function(value) {
                        attr.$set(attrName, !!value)
                    })
                }
                if ("multiple" !== propName) {
                    var normalized = directiveNormalize("ng-" + attrName),
                        linkFn = defaultLinkFn;
                    "checked" === propName && (linkFn = function(scope, element, attr) {
                        attr.ngModel !== attr[normalized] && defaultLinkFn(scope, element, attr)
                    }), ngAttributeAliasDirectives[normalized] = function() {
                        return {
                            restrict: "A",
                            priority: 100,
                            link: linkFn
                        }
                    }
                }
            }), forEach(ALIASED_ATTR, function(htmlAttr, ngAttr) {
                ngAttributeAliasDirectives[ngAttr] = function() {
                    return {
                        priority: 100,
                        link: function(scope, element, attr) {
                            if ("ngPattern" === ngAttr && "/" === attr.ngPattern.charAt(0)) {
                                var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                                if (match) return void attr.$set("ngPattern", new RegExp(match[1], match[2]))
                            }
                            scope.$watch(attr[ngAttr], function(value) {
                                attr.$set(ngAttr, value)
                            })
                        }
                    }
                }
            }), forEach(["src", "srcset", "href"], function(attrName) {
                var normalized = directiveNormalize("ng-" + attrName);
                ngAttributeAliasDirectives[normalized] = function() {
                    return {
                        priority: 99,
                        link: function(scope, element, attr) {
                            var propName = attrName,
                                name = attrName;
                            "href" === attrName && "[object SVGAnimatedString]" === toString.call(element.prop("href")) && (name = "xlinkHref", attr.$attr[name] = "xlink:href", propName = null), attr.$observe(normalized, function(value) {
                                return value ? (attr.$set(name, value), void(msie && propName && element.prop(propName, attr[name]))) : void("href" === attrName && attr.$set(name, null))
                            })
                        }
                    }
                }
            });
            var nullFormCtrl = {
                    $addControl: noop,
                    $$renameControl: nullFormRenameControl,
                    $removeControl: noop,
                    $setValidity: noop,
                    $setDirty: noop,
                    $setPristine: noop,
                    $setSubmitted: noop
                },
                SUBMITTED_CLASS = "ng-submitted";
            FormController.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
            var formDirectiveFactory = function(isNgForm) {
                    return ["$timeout", "$parse", function($timeout, $parse) {
                        function getSetter(expression) {
                            return "" === expression ? $parse('this[""]').assign : $parse(expression).assign || noop
                        }
                        var formDirective = {
                            name: "form",
                            restrict: isNgForm ? "EAC" : "E",
                            require: ["form", "^^?form"],
                            controller: FormController,
                            compile: function(formElement, attr) {
                                formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);
                                var nameAttr = attr.name ? "name" : !(!isNgForm || !attr.ngForm) && "ngForm";
                                return {
                                    pre: function(scope, formElement, attr, ctrls) {
                                        var controller = ctrls[0];
                                        if (!("action" in attr)) {
                                            var handleFormSubmission = function(event) {
                                                scope.$apply(function() {
                                                    controller.$commitViewValue(), controller.$setSubmitted()
                                                }), event.preventDefault()
                                            };
                                            addEventListenerFn(formElement[0], "submit", handleFormSubmission), formElement.on("$destroy", function() {
                                                $timeout(function() {
                                                    removeEventListenerFn(formElement[0], "submit", handleFormSubmission)
                                                }, 0, !1)
                                            })
                                        }
                                        var parentFormCtrl = ctrls[1] || controller.$$parentForm;
                                        parentFormCtrl.$addControl(controller);
                                        var setter = nameAttr ? getSetter(controller.$name) : noop;
                                        nameAttr && (setter(scope, controller), attr.$observe(nameAttr, function(newValue) {
                                            controller.$name !== newValue && (setter(scope, void 0), controller.$$parentForm.$$renameControl(controller, newValue), (setter = getSetter(controller.$name))(scope, controller))
                                        })), formElement.on("$destroy", function() {
                                            controller.$$parentForm.$removeControl(controller), setter(scope, void 0), extend(controller, nullFormCtrl)
                                        })
                                    }
                                }
                            }
                        };
                        return formDirective
                    }]
                },
                formDirective = formDirectiveFactory(),
                ngFormDirective = formDirectiveFactory(!0),
                ISO_DATE_REGEXP = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
                URL_REGEXP = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
                EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
                NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
                DATE_REGEXP = /^(\d{4,})-(\d{2})-(\d{2})$/,
                DATETIMELOCAL_REGEXP = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
                WEEK_REGEXP = /^(\d{4,})-W(\d\d)$/,
                MONTH_REGEXP = /^(\d{4,})-(\d\d)$/,
                TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
                PARTIAL_VALIDATION_EVENTS = "keydown wheel mousedown",
                PARTIAL_VALIDATION_TYPES = createMap();
            forEach("date,datetime-local,month,time,week".split(","), function(type) {
                PARTIAL_VALIDATION_TYPES[type] = !0
            });
            var inputType = {
                    text: textInputType,
                    date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
                    "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
                    time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
                    week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
                    month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, ["yyyy", "MM"]), "yyyy-MM"),
                    number: numberInputType,
                    url: urlInputType,
                    email: emailInputType,
                    radio: radioInputType,
                    range: rangeInputType,
                    checkbox: checkboxInputType,
                    hidden: noop,
                    button: noop,
                    submit: noop,
                    reset: noop,
                    file: noop
                },
                inputDirective = ["$browser", "$sniffer", "$filter", "$parse", function($browser, $sniffer, $filter, $parse) {
                    return {
                        restrict: "E",
                        require: ["?ngModel"],
                        link: {
                            pre: function(scope, element, attr, ctrls) {
                                if (ctrls[0]) {
                                    var type = lowercase(attr.type);
                                    "range" !== type || attr.hasOwnProperty("ngInputRange") || (type = "text"), (inputType[type] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse)
                                }
                            }
                        }
                    }
                }],
                CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/,
                ngValueDirective = function() {
                    return {
                        restrict: "A",
                        priority: 100,
                        compile: function(tpl, tplAttr) {
                            return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function(scope, elm, attr) {
                                attr.$set("value", scope.$eval(attr.ngValue))
                            } : function(scope, elm, attr) {
                                scope.$watch(attr.ngValue, function(value) {
                                    attr.$set("value", value)
                                })
                            }
                        }
                    }
                },
                ngBindDirective = ["$compile", function($compile) {
                    return {
                        restrict: "AC",
                        compile: function(templateElement) {
                            return $compile.$$addBindingClass(templateElement),
                                function(scope, element, attr) {
                                    $compile.$$addBindingInfo(element, attr.ngBind), element = element[0], scope.$watch(attr.ngBind, function(value) {
                                        element.textContent = isUndefined(value) ? "" : value
                                    })
                                }
                        }
                    }
                }],
                ngBindTemplateDirective = ["$interpolate", "$compile", function($interpolate, $compile) {
                    return {
                        compile: function(templateElement) {
                            return $compile.$$addBindingClass(templateElement),
                                function(scope, element, attr) {
                                    var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                                    $compile.$$addBindingInfo(element, interpolateFn.expressions), element = element[0], attr.$observe("ngBindTemplate", function(value) {
                                        element.textContent = isUndefined(value) ? "" : value
                                    })
                                }
                        }
                    }
                }],
                ngBindHtmlDirective = ["$sce", "$parse", "$compile", function($sce, $parse, $compile) {
                    return {
                        restrict: "A",
                        compile: function(tElement, tAttrs) {
                            var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml),
                                ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function(val) {
                                    return $sce.valueOf(val)
                                });
                            return $compile.$$addBindingClass(tElement),
                                function(scope, element, attr) {
                                    $compile.$$addBindingInfo(element, attr.ngBindHtml), scope.$watch(ngBindHtmlWatch, function() {
                                        var value = ngBindHtmlGetter(scope);
                                        element.html($sce.getTrustedHtml(value) || "")
                                    })
                                }
                        }
                    }
                }],
                ngChangeDirective = valueFn({
                    restrict: "A",
                    require: "ngModel",
                    link: function(scope, element, attr, ctrl) {
                        ctrl.$viewChangeListeners.push(function() {
                            scope.$eval(attr.ngChange)
                        })
                    }
                }),
                ngClassDirective = classDirective("", !0),
                ngClassOddDirective = classDirective("Odd", 0),
                ngClassEvenDirective = classDirective("Even", 1),
                ngCloakDirective = ngDirective({
                    compile: function(element, attr) {
                        attr.$set("ngCloak", void 0), element.removeClass("ng-cloak")
                    }
                }),
                ngControllerDirective = [function() {
                    return {
                        restrict: "A",
                        scope: !0,
                        controller: "@",
                        priority: 500
                    }
                }],
                ngEventDirectives = {},
                forceAsyncEvents = {
                    blur: !0,
                    focus: !0
                };
            forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(eventName) {
                var directiveName = directiveNormalize("ng-" + eventName);
                ngEventDirectives[directiveName] = ["$parse", "$rootScope", function($parse, $rootScope) {
                    return {
                        restrict: "A",
                        compile: function($element, attr) {
                            var fn = $parse(attr[directiveName], null, !0);
                            return function(scope, element) {
                                element.on(eventName, function(event) {
                                    var callback = function() {
                                        fn(scope, {
                                            $event: event
                                        })
                                    };
                                    forceAsyncEvents[eventName] && $rootScope.$$phase ? scope.$evalAsync(callback) : scope.$apply(callback)
                                })
                            }
                        }
                    }
                }]
            });
            var ngIfDirective = ["$animate", "$compile", function($animate, $compile) {
                    return {
                        multiElement: !0,
                        transclude: "element",
                        priority: 600,
                        terminal: !0,
                        restrict: "A",
                        $$tlb: !0,
                        link: function($scope, $element, $attr, ctrl, $transclude) {
                            var block, childScope, previousElements;
                            $scope.$watch($attr.ngIf, function(value) {
                                value ? childScope || $transclude(function(clone, newScope) {
                                    childScope = newScope, clone[clone.length++] = $compile.$$createComment("end ngIf", $attr.ngIf), block = {
                                        clone: clone
                                    }, $animate.enter(clone, $element.parent(), $element)
                                }) : (previousElements && (previousElements.remove(), previousElements = null), childScope && (childScope.$destroy(), childScope = null), block && (previousElements = getBlockNodes(block.clone), $animate.leave(previousElements).then(function() {
                                    previousElements = null
                                }), block = null))
                            })
                        }
                    }
                }],
                ngIncludeDirective = ["$templateRequest", "$anchorScroll", "$animate", function($templateRequest, $anchorScroll, $animate) {
                    return {
                        restrict: "ECA",
                        priority: 400,
                        terminal: !0,
                        transclude: "element",
                        controller: angular.noop,
                        compile: function(element, attr) {
                            var srcExp = attr.ngInclude || attr.src,
                                onloadExp = attr.onload || "",
                                autoScrollExp = attr.autoscroll;
                            return function(scope, $element, $attr, ctrl, $transclude) {
                                var currentScope, previousElement, currentElement, changeCounter = 0,
                                    cleanupLastIncludeContent = function() {
                                        previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), currentScope = null), currentElement && ($animate.leave(currentElement).then(function() {
                                            previousElement = null
                                        }), previousElement = currentElement, currentElement = null)
                                    };
                                scope.$watch(srcExp, function(src) {
                                    var afterAnimation = function() {
                                            !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll()
                                        },
                                        thisChangeId = ++changeCounter;
                                    src ? ($templateRequest(src, !0).then(function(response) {
                                        if (!scope.$$destroyed && thisChangeId === changeCounter) {
                                            var newScope = scope.$new();
                                            ctrl.template = response;
                                            var clone = $transclude(newScope, function(clone) {
                                                cleanupLastIncludeContent(), $animate.enter(clone, null, $element).then(afterAnimation)
                                            });
                                            currentScope = newScope, currentElement = clone, currentScope.$emit("$includeContentLoaded", src), scope.$eval(onloadExp)
                                        }
                                    }, function() {
                                        scope.$$destroyed || thisChangeId === changeCounter && (cleanupLastIncludeContent(), scope.$emit("$includeContentError", src))
                                    }), scope.$emit("$includeContentRequested", src)) : (cleanupLastIncludeContent(), ctrl.template = null)
                                })
                            }
                        }
                    }
                }],
                ngIncludeFillContentDirective = ["$compile", function($compile) {
                    return {
                        restrict: "ECA",
                        priority: -400,
                        require: "ngInclude",
                        link: function(scope, $element, $attr, ctrl) {
                            return toString.call($element[0]).match(/SVG/) ? ($element.empty(), void $compile(jqLiteBuildFragment(ctrl.template, window.document).childNodes)(scope, function(clone) {
                                $element.append(clone)
                            }, {
                                futureParentElement: $element
                            })) : ($element.html(ctrl.template), void $compile($element.contents())(scope))
                        }
                    }
                }],
                ngInitDirective = ngDirective({
                    priority: 450,
                    compile: function() {
                        return {
                            pre: function(scope, element, attrs) {
                                scope.$eval(attrs.ngInit)
                            }
                        }
                    }
                }),
                ngListDirective = function() {
                    return {
                        restrict: "A",
                        priority: 100,
                        require: "ngModel",
                        link: function(scope, element, attr, ctrl) {
                            var ngList = element.attr(attr.$attr.ngList) || ", ",
                                trimValues = "false" !== attr.ngTrim,
                                separator = trimValues ? trim(ngList) : ngList,
                                parse = function(viewValue) {
                                    if (!isUndefined(viewValue)) {
                                        var list = [];
                                        return viewValue && forEach(viewValue.split(separator), function(value) {
                                            value && list.push(trimValues ? trim(value) : value)
                                        }), list
                                    }
                                };
                            ctrl.$parsers.push(parse), ctrl.$formatters.push(function(value) {
                                if (isArray(value)) return value.join(ngList)
                            }), ctrl.$isEmpty = function(value) {
                                return !value || !value.length
                            }
                        }
                    }
                },
                VALID_CLASS = "ng-valid",
                INVALID_CLASS = "ng-invalid",
                PRISTINE_CLASS = "ng-pristine",
                DIRTY_CLASS = "ng-dirty",
                UNTOUCHED_CLASS = "ng-untouched",
                TOUCHED_CLASS = "ng-touched",
                PENDING_CLASS = "ng-pending",
                EMPTY_CLASS = "ng-empty",
                NOT_EMPTY_CLASS = "ng-not-empty",
                ngModelMinErr = minErr("ngModel"),
                NgModelController = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $rootScope, $q, $interpolate) {
                    this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = void 0, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = void 0, this.$name = $interpolate($attr.name || "", !1)($scope), this.$$parentForm = nullFormCtrl;
                    var parserValid, parsedNgModel = $parse($attr.ngModel),
                        parsedNgModelAssign = parsedNgModel.assign,
                        ngModelGet = parsedNgModel,
                        ngModelSet = parsedNgModelAssign,
                        pendingDebounce = null,
                        ctrl = this;
                    this.$$setOptions = function(options) {
                        if (ctrl.$options = options, options && options.getterSetter) {
                            var invokeModelGetter = $parse($attr.ngModel + "()"),
                                invokeModelSetter = $parse($attr.ngModel + "($$$p)");
                            ngModelGet = function($scope) {
                                var modelValue = parsedNgModel($scope);
                                return isFunction(modelValue) && (modelValue = invokeModelGetter($scope)), modelValue
                            }, ngModelSet = function($scope, newValue) {
                                isFunction(parsedNgModel($scope)) ? invokeModelSetter($scope, {
                                    $$$p: newValue
                                }) : parsedNgModelAssign($scope, newValue)
                            }
                        } else if (!parsedNgModel.assign) throw ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element))
                    }, this.$render = noop, this.$isEmpty = function(value) {
                        return isUndefined(value) || "" === value || null === value || value !== value
                    }, this.$$updateEmptyClasses = function(value) {
                        ctrl.$isEmpty(value) ? ($animate.removeClass($element, NOT_EMPTY_CLASS), $animate.addClass($element, EMPTY_CLASS)) : ($animate.removeClass($element, EMPTY_CLASS), $animate.addClass($element, NOT_EMPTY_CLASS))
                    };
                    var currentValidationRunId = 0;
                    addSetValidityMethod({
                        ctrl: this,
                        $element: $element,
                        set: function(object, property) {
                            object[property] = !0
                        },
                        unset: function(object, property) {
                            delete object[property]
                        },
                        $animate: $animate
                    }), this.$setPristine = function() {
                        ctrl.$dirty = !1, ctrl.$pristine = !0, $animate.removeClass($element, DIRTY_CLASS), $animate.addClass($element, PRISTINE_CLASS)
                    }, this.$setDirty = function() {
                        ctrl.$dirty = !0, ctrl.$pristine = !1, $animate.removeClass($element, PRISTINE_CLASS), $animate.addClass($element, DIRTY_CLASS), ctrl.$$parentForm.$setDirty()
                    }, this.$setUntouched = function() {
                        ctrl.$touched = !1, ctrl.$untouched = !0, $animate.setClass($element, UNTOUCHED_CLASS, TOUCHED_CLASS)
                    }, this.$setTouched = function() {
                        ctrl.$touched = !0, ctrl.$untouched = !1, $animate.setClass($element, TOUCHED_CLASS, UNTOUCHED_CLASS)
                    }, this.$rollbackViewValue = function() {
                        $timeout.cancel(pendingDebounce), ctrl.$viewValue = ctrl.$$lastCommittedViewValue, ctrl.$render()
                    }, this.$validate = function() {
                        if (!isNumberNaN(ctrl.$modelValue)) {
                            var viewValue = ctrl.$$lastCommittedViewValue,
                                modelValue = ctrl.$$rawModelValue,
                                prevValid = ctrl.$valid,
                                prevModelValue = ctrl.$modelValue,
                                allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
                            ctrl.$$runValidators(modelValue, viewValue, function(allValid) {
                                allowInvalid || prevValid === allValid || (ctrl.$modelValue = allValid ? modelValue : void 0, ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope())
                            })
                        }
                    }, this.$$runValidators = function(modelValue, viewValue, doneCallback) {
                        function processParseErrors() {
                            var errorKey = ctrl.$$parserName || "parse";
                            return isUndefined(parserValid) ? (setValidity(errorKey, null), !0) : (parserValid || (forEach(ctrl.$validators, function(v, name) {
                                setValidity(name, null)
                            }), forEach(ctrl.$asyncValidators, function(v, name) {
                                setValidity(name, null)
                            })), setValidity(errorKey, parserValid), parserValid)
                        }

                        function processSyncValidators() {
                            var syncValidatorsValid = !0;
                            return forEach(ctrl.$validators, function(validator, name) {
                                var result = validator(modelValue, viewValue);
                                syncValidatorsValid = syncValidatorsValid && result, setValidity(name, result)
                            }), !!syncValidatorsValid || (forEach(ctrl.$asyncValidators, function(v, name) {
                                setValidity(name, null)
                            }), !1)
                        }

                        function processAsyncValidators() {
                            var validatorPromises = [],
                                allValid = !0;
                            forEach(ctrl.$asyncValidators, function(validator, name) {
                                var promise = validator(modelValue, viewValue);
                                if (!isPromiseLike(promise)) throw ngModelMinErr("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                                setValidity(name, void 0), validatorPromises.push(promise.then(function() {
                                    setValidity(name, !0)
                                }, function() {
                                    allValid = !1, setValidity(name, !1)
                                }))
                            }), validatorPromises.length ? $q.all(validatorPromises).then(function() {
                                validationDone(allValid)
                            }, noop) : validationDone(!0)
                        }

                        function setValidity(name, isValid) {
                            localValidationRunId === currentValidationRunId && ctrl.$setValidity(name, isValid)
                        }

                        function validationDone(allValid) {
                            localValidationRunId === currentValidationRunId && doneCallback(allValid)
                        }
                        currentValidationRunId++;
                        var localValidationRunId = currentValidationRunId;
                        return processParseErrors() && processSyncValidators() ? void processAsyncValidators() : void validationDone(!1)
                    }, this.$commitViewValue = function() {
                        var viewValue = ctrl.$viewValue;
                        $timeout.cancel(pendingDebounce), (ctrl.$$lastCommittedViewValue !== viewValue || "" === viewValue && ctrl.$$hasNativeValidators) && (ctrl.$$updateEmptyClasses(viewValue), ctrl.$$lastCommittedViewValue = viewValue, ctrl.$pristine && this.$setDirty(), this.$$parseAndValidate())
                    }, this.$$parseAndValidate = function() {
                        function writeToModelIfNeeded() {
                            ctrl.$modelValue !== prevModelValue && ctrl.$$writeModelToScope()
                        }
                        var viewValue = ctrl.$$lastCommittedViewValue,
                            modelValue = viewValue;
                        if (parserValid = !isUndefined(modelValue) || void 0)
                            for (var i = 0; i < ctrl.$parsers.length; i++)
                                if (modelValue = ctrl.$parsers[i](modelValue), isUndefined(modelValue)) {
                                    parserValid = !1;
                                    break
                                }
                        isNumberNaN(ctrl.$modelValue) && (ctrl.$modelValue = ngModelGet($scope));
                        var prevModelValue = ctrl.$modelValue,
                            allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
                        ctrl.$$rawModelValue = modelValue, allowInvalid && (ctrl.$modelValue = modelValue, writeToModelIfNeeded()), ctrl.$$runValidators(modelValue, ctrl.$$lastCommittedViewValue, function(allValid) {
                            allowInvalid || (ctrl.$modelValue = allValid ? modelValue : void 0, writeToModelIfNeeded())
                        })
                    }, this.$$writeModelToScope = function() {
                        ngModelSet($scope, ctrl.$modelValue), forEach(ctrl.$viewChangeListeners, function(listener) {
                            try {
                                listener()
                            } catch (e) {
                                $exceptionHandler(e)
                            }
                        })
                    }, this.$setViewValue = function(value, trigger) {
                        ctrl.$viewValue = value, ctrl.$options && !ctrl.$options.updateOnDefault || ctrl.$$debounceViewValueCommit(trigger)
                    }, this.$$debounceViewValueCommit = function(trigger) {
                        var debounce, debounceDelay = 0,
                            options = ctrl.$options;
                        options && isDefined(options.debounce) && (debounce = options.debounce, isNumber(debounce) ? debounceDelay = debounce : isNumber(debounce[trigger]) ? debounceDelay = debounce[trigger] : isNumber(debounce.default) && (debounceDelay = debounce.default)), $timeout.cancel(pendingDebounce), debounceDelay ? pendingDebounce = $timeout(function() {
                            ctrl.$commitViewValue()
                        }, debounceDelay) : $rootScope.$$phase ? ctrl.$commitViewValue() : $scope.$apply(function() {
                            ctrl.$commitViewValue()
                        })
                    }, $scope.$watch(function() {
                        var modelValue = ngModelGet($scope);
                        if (modelValue !== ctrl.$modelValue && (ctrl.$modelValue === ctrl.$modelValue || modelValue === modelValue)) {
                            ctrl.$modelValue = ctrl.$$rawModelValue = modelValue, parserValid = void 0;
                            for (var formatters = ctrl.$formatters, idx = formatters.length, viewValue = modelValue; idx--;) viewValue = formatters[idx](viewValue);
                            ctrl.$viewValue !== viewValue && (ctrl.$$updateEmptyClasses(viewValue), ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue, ctrl.$render(), ctrl.$$runValidators(ctrl.$modelValue, ctrl.$viewValue, noop))
                        }
                        return modelValue
                    })
                }],
                ngModelDirective = ["$rootScope", function($rootScope) {
                    return {
                        restrict: "A",
                        require: ["ngModel", "^?form", "^?ngModelOptions"],
                        controller: NgModelController,
                        priority: 1,
                        compile: function(element) {
                            return element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS), {
                                pre: function(scope, element, attr, ctrls) {
                                    var modelCtrl = ctrls[0],
                                        formCtrl = ctrls[1] || modelCtrl.$$parentForm;
                                    modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options), formCtrl.$addControl(modelCtrl), attr.$observe("name", function(newValue) {
                                        modelCtrl.$name !== newValue && modelCtrl.$$parentForm.$$renameControl(modelCtrl, newValue);
                                    }), scope.$on("$destroy", function() {
                                        modelCtrl.$$parentForm.$removeControl(modelCtrl)
                                    })
                                },
                                post: function(scope, element, attr, ctrls) {
                                    var modelCtrl = ctrls[0];
                                    modelCtrl.$options && modelCtrl.$options.updateOn && element.on(modelCtrl.$options.updateOn, function(ev) {
                                        modelCtrl.$$debounceViewValueCommit(ev && ev.type)
                                    }), element.on("blur", function() {
                                        modelCtrl.$touched || ($rootScope.$$phase ? scope.$evalAsync(modelCtrl.$setTouched) : scope.$apply(modelCtrl.$setTouched))
                                    })
                                }
                            }
                        }
                    }
                }],
                DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/,
                ngModelOptionsDirective = function() {
                    return {
                        restrict: "A",
                        controller: ["$scope", "$attrs", function($scope, $attrs) {
                            var that = this;
                            this.$options = copy($scope.$eval($attrs.ngModelOptions)), isDefined(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = trim(this.$options.updateOn.replace(DEFAULT_REGEXP, function() {
                                return that.$options.updateOnDefault = !0, " "
                            }))) : this.$options.updateOnDefault = !0
                        }]
                    }
                },
                ngNonBindableDirective = ngDirective({
                    terminal: !0,
                    priority: 1e3
                }),
                ngOptionsMinErr = minErr("ngOptions"),
                NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                ngOptionsDirective = ["$compile", "$document", "$parse", function($compile, $document, $parse) {
                    function parseOptionsExpression(optionsExp, selectElement, scope) {
                        function Option(selectValue, viewValue, label, group, disabled) {
                            this.selectValue = selectValue, this.viewValue = viewValue, this.label = label, this.group = group, this.disabled = disabled
                        }

                        function getOptionValuesKeys(optionValues) {
                            var optionValuesKeys;
                            if (!keyName && isArrayLike(optionValues)) optionValuesKeys = optionValues;
                            else {
                                optionValuesKeys = [];
                                for (var itemKey in optionValues) optionValues.hasOwnProperty(itemKey) && "$" !== itemKey.charAt(0) && optionValuesKeys.push(itemKey)
                            }
                            return optionValuesKeys
                        }
                        var match = optionsExp.match(NG_OPTIONS_REGEXP);
                        if (!match) throw ngOptionsMinErr("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
                        var valueName = match[5] || match[7],
                            keyName = match[6],
                            selectAs = / as /.test(match[0]) && match[1],
                            trackBy = match[9],
                            valueFn = $parse(match[2] ? match[1] : valueName),
                            selectAsFn = selectAs && $parse(selectAs),
                            viewValueFn = selectAsFn || valueFn,
                            trackByFn = trackBy && $parse(trackBy),
                            getTrackByValueFn = trackBy ? function(value, locals) {
                                return trackByFn(scope, locals)
                            } : function(value) {
                                return hashKey(value)
                            },
                            getTrackByValue = function(value, key) {
                                return getTrackByValueFn(value, getLocals(value, key))
                            },
                            displayFn = $parse(match[2] || match[1]),
                            groupByFn = $parse(match[3] || ""),
                            disableWhenFn = $parse(match[4] || ""),
                            valuesFn = $parse(match[8]),
                            locals = {},
                            getLocals = keyName ? function(value, key) {
                                return locals[keyName] = key, locals[valueName] = value, locals
                            } : function(value) {
                                return locals[valueName] = value, locals
                            };
                        return {
                            trackBy: trackBy,
                            getTrackByValue: getTrackByValue,
                            getWatchables: $parse(valuesFn, function(optionValues) {
                                var watchedArray = [];
                                optionValues = optionValues || [];
                                for (var optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; index < optionValuesLength; index++) {
                                    var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index],
                                        value = optionValues[key],
                                        locals = getLocals(value, key),
                                        selectValue = getTrackByValueFn(value, locals);
                                    if (watchedArray.push(selectValue), match[2] || match[1]) {
                                        var label = displayFn(scope, locals);
                                        watchedArray.push(label)
                                    }
                                    if (match[4]) {
                                        var disableWhen = disableWhenFn(scope, locals);
                                        watchedArray.push(disableWhen)
                                    }
                                }
                                return watchedArray
                            }),
                            getOptions: function() {
                                for (var optionItems = [], selectValueMap = {}, optionValues = valuesFn(scope) || [], optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; index < optionValuesLength; index++) {
                                    var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index],
                                        value = optionValues[key],
                                        locals = getLocals(value, key),
                                        viewValue = viewValueFn(scope, locals),
                                        selectValue = getTrackByValueFn(viewValue, locals),
                                        label = displayFn(scope, locals),
                                        group = groupByFn(scope, locals),
                                        disabled = disableWhenFn(scope, locals),
                                        optionItem = new Option(selectValue, viewValue, label, group, disabled);
                                    optionItems.push(optionItem), selectValueMap[selectValue] = optionItem
                                }
                                return {
                                    items: optionItems,
                                    selectValueMap: selectValueMap,
                                    getOptionFromViewValue: function(value) {
                                        return selectValueMap[getTrackByValue(value)]
                                    },
                                    getViewValueFromOption: function(option) {
                                        return trackBy ? angular.copy(option.viewValue) : option.viewValue
                                    }
                                }
                            }
                        }
                    }

                    function ngOptionsPostLink(scope, selectElement, attr, ctrls) {
                        function addOptionElement(option, parent) {
                            var optionElement = optionTemplate.cloneNode(!1);
                            parent.appendChild(optionElement), updateOptionElement(option, optionElement)
                        }

                        function updateOptionElement(option, element) {
                            option.element = element, element.disabled = option.disabled, option.label !== element.label && (element.label = option.label, element.textContent = option.label), option.value !== element.value && (element.value = option.selectValue)
                        }

                        function updateOptions() {
                            var previousValue = options && selectCtrl.readValue();
                            if (options)
                                for (var i = options.items.length - 1; i >= 0; i--) {
                                    var option = options.items[i];
                                    jqLiteRemove(isDefined(option.group) ? option.element.parentNode : option.element)
                                }
                            options = ngOptions.getOptions();
                            var groupElementMap = {};
                            if (providedEmptyOption && selectElement.prepend(emptyOption), options.items.forEach(function(option) {
                                    var groupElement;
                                    isDefined(option.group) ? (groupElement = groupElementMap[option.group], groupElement || (groupElement = optGroupTemplate.cloneNode(!1), listFragment.appendChild(groupElement), groupElement.label = null === option.group ? "null" : option.group, groupElementMap[option.group] = groupElement), addOptionElement(option, groupElement)) : addOptionElement(option, listFragment)
                                }), selectElement[0].appendChild(listFragment), ngModelCtrl.$render(), !ngModelCtrl.$isEmpty(previousValue)) {
                                var nextValue = selectCtrl.readValue(),
                                    isNotPrimitive = ngOptions.trackBy || multiple;
                                (isNotPrimitive ? equals(previousValue, nextValue) : previousValue === nextValue) || (ngModelCtrl.$setViewValue(nextValue), ngModelCtrl.$render())
                            }
                        }
                        for (var emptyOption, selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, i = 0, children = selectElement.children(), ii = children.length; i < ii; i++)
                            if ("" === children[i].value) {
                                emptyOption = children.eq(i);
                                break
                            }
                        var providedEmptyOption = !!emptyOption,
                            unknownOption = jqLite(optionTemplate.cloneNode(!1));
                        unknownOption.val("?");
                        var options, ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope),
                            listFragment = $document[0].createDocumentFragment(),
                            renderEmptyOption = function() {
                                providedEmptyOption || selectElement.prepend(emptyOption), selectElement.val(""), emptyOption.prop("selected", !0), emptyOption.attr("selected", !0)
                            },
                            removeEmptyOption = function() {
                                providedEmptyOption ? emptyOption.removeAttr("selected") : emptyOption.remove()
                            },
                            renderUnknownOption = function() {
                                selectElement.prepend(unknownOption), selectElement.val("?"), unknownOption.prop("selected", !0), unknownOption.attr("selected", !0)
                            },
                            removeUnknownOption = function() {
                                unknownOption.remove()
                            };
                        multiple ? (ngModelCtrl.$isEmpty = function(value) {
                            return !value || 0 === value.length
                        }, selectCtrl.writeValue = function(value) {
                            options.items.forEach(function(option) {
                                option.element.selected = !1
                            }), value && value.forEach(function(item) {
                                var option = options.getOptionFromViewValue(item);
                                option && (option.element.selected = !0)
                            })
                        }, selectCtrl.readValue = function() {
                            var selectedValues = selectElement.val() || [],
                                selections = [];
                            return forEach(selectedValues, function(value) {
                                var option = options.selectValueMap[value];
                                option && !option.disabled && selections.push(options.getViewValueFromOption(option))
                            }), selections
                        }, ngOptions.trackBy && scope.$watchCollection(function() {
                            if (isArray(ngModelCtrl.$viewValue)) return ngModelCtrl.$viewValue.map(function(value) {
                                return ngOptions.getTrackByValue(value)
                            })
                        }, function() {
                            ngModelCtrl.$render()
                        })) : (selectCtrl.writeValue = function(value) {
                            var selectedOption = options.selectValueMap[selectElement.val()],
                                option = options.getOptionFromViewValue(value);
                            selectedOption && selectedOption.element.removeAttribute("selected"), option ? (selectElement[0].value !== option.selectValue && (removeUnknownOption(), removeEmptyOption(), selectElement[0].value = option.selectValue, option.element.selected = !0), option.element.setAttribute("selected", "selected")) : null === value || providedEmptyOption ? (removeUnknownOption(), renderEmptyOption()) : (removeEmptyOption(), renderUnknownOption())
                        }, selectCtrl.readValue = function() {
                            var selectedOption = options.selectValueMap[selectElement.val()];
                            return selectedOption && !selectedOption.disabled ? (removeEmptyOption(), removeUnknownOption(), options.getViewValueFromOption(selectedOption)) : null
                        }, ngOptions.trackBy && scope.$watch(function() {
                            return ngOptions.getTrackByValue(ngModelCtrl.$viewValue)
                        }, function() {
                            ngModelCtrl.$render()
                        })), providedEmptyOption ? (emptyOption.remove(), $compile(emptyOption)(scope), emptyOption.removeClass("ng-scope")) : emptyOption = jqLite(optionTemplate.cloneNode(!1)), selectElement.empty(), updateOptions(), scope.$watchCollection(ngOptions.getWatchables, updateOptions)
                    }
                    var optionTemplate = window.document.createElement("option"),
                        optGroupTemplate = window.document.createElement("optgroup");
                    return {
                        restrict: "A",
                        terminal: !0,
                        require: ["select", "ngModel"],
                        link: {
                            pre: function(scope, selectElement, attr, ctrls) {
                                ctrls[0].registerOption = noop
                            },
                            post: ngOptionsPostLink
                        }
                    }
                }],
                ngPluralizeDirective = ["$locale", "$interpolate", "$log", function($locale, $interpolate, $log) {
                    var BRACE = /{}/g,
                        IS_WHEN = /^when(Minus)?(.+)$/;
                    return {
                        link: function(scope, element, attr) {
                            function updateElementText(newText) {
                                element.text(newText || "")
                            }
                            var lastCount, numberExp = attr.count,
                                whenExp = attr.$attr.when && element.attr(attr.$attr.when),
                                offset = attr.offset || 0,
                                whens = scope.$eval(whenExp) || {},
                                whensExpFns = {},
                                startSymbol = $interpolate.startSymbol(),
                                endSymbol = $interpolate.endSymbol(),
                                braceReplacement = startSymbol + numberExp + "-" + offset + endSymbol,
                                watchRemover = angular.noop;
                            forEach(attr, function(expression, attributeName) {
                                var tmpMatch = IS_WHEN.exec(attributeName);
                                if (tmpMatch) {
                                    var whenKey = (tmpMatch[1] ? "-" : "") + lowercase(tmpMatch[2]);
                                    whens[whenKey] = element.attr(attr.$attr[attributeName])
                                }
                            }), forEach(whens, function(expression, key) {
                                whensExpFns[key] = $interpolate(expression.replace(BRACE, braceReplacement))
                            }), scope.$watch(numberExp, function(newVal) {
                                var count = parseFloat(newVal),
                                    countIsNaN = isNumberNaN(count);
                                if (countIsNaN || count in whens || (count = $locale.pluralCat(count - offset)), !(count === lastCount || countIsNaN && isNumberNaN(lastCount))) {
                                    watchRemover();
                                    var whenExpFn = whensExpFns[count];
                                    isUndefined(whenExpFn) ? (null != newVal && $log.debug("ngPluralize: no rule defined for '" + count + "' in " + whenExp), watchRemover = noop, updateElementText()) : watchRemover = scope.$watch(whenExpFn, updateElementText), lastCount = count
                                }
                            })
                        }
                    }
                }],
                ngRepeatDirective = ["$parse", "$animate", "$compile", function($parse, $animate, $compile) {
                    var NG_REMOVED = "$$NG_REMOVED",
                        ngRepeatMinErr = minErr("ngRepeat"),
                        updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
                            scope[valueIdentifier] = value, keyIdentifier && (scope[keyIdentifier] = key), scope.$index = index, scope.$first = 0 === index, scope.$last = index === arrayLength - 1, scope.$middle = !(scope.$first || scope.$last), scope.$odd = !(scope.$even = 0 === (1 & index))
                        },
                        getBlockStart = function(block) {
                            return block.clone[0]
                        },
                        getBlockEnd = function(block) {
                            return block.clone[block.clone.length - 1]
                        };
                    return {
                        restrict: "A",
                        multiElement: !0,
                        transclude: "element",
                        priority: 1e3,
                        terminal: !0,
                        $$tlb: !0,
                        compile: function($element, $attr) {
                            var expression = $attr.ngRepeat,
                                ngRepeatEndComment = $compile.$$createComment("end ngRepeat", expression),
                                match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                            if (!match) throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                            var lhs = match[1],
                                rhs = match[2],
                                aliasAs = match[3],
                                trackByExp = match[4];
                            if (match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !match) throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                            var valueIdentifier = match[3] || match[1],
                                keyIdentifier = match[2];
                            if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                            var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, hashFnLocals = {
                                $id: hashKey
                            };
                            return trackByExp ? trackByExpGetter = $parse(trackByExp) : (trackByIdArrayFn = function(key, value) {
                                    return hashKey(value)
                                }, trackByIdObjFn = function(key) {
                                    return key
                                }),
                                function($scope, $element, $attr, ctrl, $transclude) {
                                    trackByExpGetter && (trackByIdExpFn = function(key, value, index) {
                                        return keyIdentifier && (hashFnLocals[keyIdentifier] = key), hashFnLocals[valueIdentifier] = value, hashFnLocals.$index = index, trackByExpGetter($scope, hashFnLocals)
                                    });
                                    var lastBlockMap = createMap();
                                    $scope.$watchCollection(rhs, function(collection) {
                                        var index, length, nextNode, collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove, previousNode = $element[0],
                                            nextBlockMap = createMap();
                                        if (aliasAs && ($scope[aliasAs] = collection), isArrayLike(collection)) collectionKeys = collection, trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                                        else {
                                            trackByIdFn = trackByIdExpFn || trackByIdObjFn, collectionKeys = [];
                                            for (var itemKey in collection) hasOwnProperty.call(collection, itemKey) && "$" !== itemKey.charAt(0) && collectionKeys.push(itemKey)
                                        }
                                        for (collectionLength = collectionKeys.length, nextBlockOrder = new Array(collectionLength), index = 0; index < collectionLength; index++)
                                            if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], trackById = trackByIdFn(key, value, index), lastBlockMap[trackById]) block = lastBlockMap[trackById], delete lastBlockMap[trackById], nextBlockMap[trackById] = block, nextBlockOrder[index] = block;
                                            else {
                                                if (nextBlockMap[trackById]) throw forEach(nextBlockOrder, function(block) {
                                                    block && block.scope && (lastBlockMap[block.id] = block)
                                                }), ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, value);
                                                nextBlockOrder[index] = {
                                                    id: trackById,
                                                    scope: void 0,
                                                    clone: void 0
                                                }, nextBlockMap[trackById] = !0
                                            }
                                        for (var blockKey in lastBlockMap) {
                                            if (block = lastBlockMap[blockKey], elementsToRemove = getBlockNodes(block.clone), $animate.leave(elementsToRemove), elementsToRemove[0].parentNode)
                                                for (index = 0, length = elementsToRemove.length; index < length; index++) elementsToRemove[index][NG_REMOVED] = !0;
                                            block.scope.$destroy()
                                        }
                                        for (index = 0; index < collectionLength; index++)
                                            if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], block = nextBlockOrder[index], block.scope) {
                                                nextNode = previousNode;
                                                do nextNode = nextNode.nextSibling; while (nextNode && nextNode[NG_REMOVED]);
                                                getBlockStart(block) !== nextNode && $animate.move(getBlockNodes(block.clone), null, previousNode), previousNode = getBlockEnd(block), updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength)
                                            } else $transclude(function(clone, scope) {
                                                block.scope = scope;
                                                var endNode = ngRepeatEndComment.cloneNode(!1);
                                                clone[clone.length++] = endNode, $animate.enter(clone, null, previousNode), previousNode = endNode, block.clone = clone, nextBlockMap[block.id] = block, updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength)
                                            });
                                        lastBlockMap = nextBlockMap
                                    })
                                }
                        }
                    }
                }],
                NG_HIDE_CLASS = "ng-hide",
                NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate",
                ngShowDirective = ["$animate", function($animate) {
                    return {
                        restrict: "A",
                        multiElement: !0,
                        link: function(scope, element, attr) {
                            scope.$watch(attr.ngShow, function(value) {
                                $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {
                                    tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                                })
                            })
                        }
                    }
                }],
                ngHideDirective = ["$animate", function($animate) {
                    return {
                        restrict: "A",
                        multiElement: !0,
                        link: function(scope, element, attr) {
                            scope.$watch(attr.ngHide, function(value) {
                                $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {
                                    tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                                })
                            })
                        }
                    }
                }],
                ngStyleDirective = ngDirective(function(scope, element, attr) {
                    scope.$watch(attr.ngStyle, function(newStyles, oldStyles) {
                        oldStyles && newStyles !== oldStyles && forEach(oldStyles, function(val, style) {
                            element.css(style, "")
                        }), newStyles && element.css(newStyles)
                    }, !0)
                }),
                ngSwitchDirective = ["$animate", "$compile", function($animate, $compile) {
                    return {
                        require: "ngSwitch",
                        controller: ["$scope", function() {
                            this.cases = {}
                        }],
                        link: function(scope, element, attr, ngSwitchController) {
                            var watchExpr = attr.ngSwitch || attr.on,
                                selectedTranscludes = [],
                                selectedElements = [],
                                previousLeaveAnimations = [],
                                selectedScopes = [],
                                spliceFactory = function(array, index) {
                                    return function() {
                                        array.splice(index, 1)
                                    }
                                };
                            scope.$watch(watchExpr, function(value) {
                                var i, ii;
                                for (i = 0, ii = previousLeaveAnimations.length; i < ii; ++i) $animate.cancel(previousLeaveAnimations[i]);
                                for (previousLeaveAnimations.length = 0, i = 0, ii = selectedScopes.length; i < ii; ++i) {
                                    var selected = getBlockNodes(selectedElements[i].clone);
                                    selectedScopes[i].$destroy();
                                    var promise = previousLeaveAnimations[i] = $animate.leave(selected);
                                    promise.then(spliceFactory(previousLeaveAnimations, i))
                                }
                                selectedElements.length = 0, selectedScopes.length = 0, (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) && forEach(selectedTranscludes, function(selectedTransclude) {
                                    selectedTransclude.transclude(function(caseElement, selectedScope) {
                                        selectedScopes.push(selectedScope);
                                        var anchor = selectedTransclude.element;
                                        caseElement[caseElement.length++] = $compile.$$createComment("end ngSwitchWhen");
                                        var block = {
                                            clone: caseElement
                                        };
                                        selectedElements.push(block), $animate.enter(caseElement, anchor.parent(), anchor)
                                    })
                                })
                            })
                        }
                    }
                }],
                ngSwitchWhenDirective = ngDirective({
                    transclude: "element",
                    priority: 1200,
                    require: "^ngSwitch",
                    multiElement: !0,
                    link: function(scope, element, attrs, ctrl, $transclude) {
                        ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [], ctrl.cases["!" + attrs.ngSwitchWhen].push({
                            transclude: $transclude,
                            element: element
                        })
                    }
                }),
                ngSwitchDefaultDirective = ngDirective({
                    transclude: "element",
                    priority: 1200,
                    require: "^ngSwitch",
                    multiElement: !0,
                    link: function(scope, element, attr, ctrl, $transclude) {
                        ctrl.cases["?"] = ctrl.cases["?"] || [], ctrl.cases["?"].push({
                            transclude: $transclude,
                            element: element
                        })
                    }
                }),
                ngTranscludeMinErr = minErr("ngTransclude"),
                ngTranscludeDirective = ["$compile", function($compile) {
                    return {
                        restrict: "EAC",
                        terminal: !0,
                        compile: function(tElement) {
                            var fallbackLinkFn = $compile(tElement.contents());
                            return tElement.empty(),
                                function($scope, $element, $attrs, controller, $transclude) {
                                    function ngTranscludeCloneAttachFn(clone, transcludedScope) {
                                        clone.length ? $element.append(clone) : (useFallbackContent(), transcludedScope.$destroy())
                                    }

                                    function useFallbackContent() {
                                        fallbackLinkFn($scope, function(clone) {
                                            $element.append(clone)
                                        })
                                    }
                                    if (!$transclude) throw ngTranscludeMinErr("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", startingTag($element));
                                    $attrs.ngTransclude === $attrs.$attr.ngTransclude && ($attrs.ngTransclude = "");
                                    var slotName = $attrs.ngTransclude || $attrs.ngTranscludeSlot;
                                    $transclude(ngTranscludeCloneAttachFn, null, slotName), slotName && !$transclude.isSlotFilled(slotName) && useFallbackContent()
                                }
                        }
                    }
                }],
                scriptDirective = ["$templateCache", function($templateCache) {
                    return {
                        restrict: "E",
                        terminal: !0,
                        compile: function(element, attr) {
                            if ("text/ng-template" === attr.type) {
                                var templateUrl = attr.id,
                                    text = element[0].text;
                                $templateCache.put(templateUrl, text)
                            }
                        }
                    }
                }],
                noopNgModelController = {
                    $setViewValue: noop,
                    $render: noop
                },
                SelectController = ["$element", "$scope", function($element, $scope) {
                    var self = this,
                        optionsMap = new HashMap;
                    self.ngModelCtrl = noopNgModelController, self.unknownOption = jqLite(window.document.createElement("option")), self.renderUnknownOption = function(val) {
                        var unknownVal = "? " + hashKey(val) + " ?";
                        self.unknownOption.val(unknownVal), $element.prepend(self.unknownOption), $element.val(unknownVal)
                    }, $scope.$on("$destroy", function() {
                        self.renderUnknownOption = noop
                    }), self.removeUnknownOption = function() {
                        self.unknownOption.parent() && self.unknownOption.remove()
                    }, self.readValue = function() {
                        return self.removeUnknownOption(), $element.val()
                    }, self.writeValue = function(value) {
                        self.hasOption(value) ? (self.removeUnknownOption(), $element.val(value), "" === value && self.emptyOption.prop("selected", !0)) : null == value && self.emptyOption ? (self.removeUnknownOption(), $element.val("")) : self.renderUnknownOption(value)
                    }, self.addOption = function(value, element) {
                        if (element[0].nodeType !== NODE_TYPE_COMMENT) {
                            assertNotHasOwnProperty(value, '"option value"'), "" === value && (self.emptyOption = element);
                            var count = optionsMap.get(value) || 0;
                            optionsMap.put(value, count + 1), self.ngModelCtrl.$render(), chromeHack(element)
                        }
                    }, self.removeOption = function(value) {
                        var count = optionsMap.get(value);
                        count && (1 === count ? (optionsMap.remove(value), "" === value && (self.emptyOption = void 0)) : optionsMap.put(value, count - 1))
                    }, self.hasOption = function(value) {
                        return !!optionsMap.get(value)
                    }, self.registerOption = function(optionScope, optionElement, optionAttrs, interpolateValueFn, interpolateTextFn) {
                        if (interpolateValueFn) {
                            var oldVal;
                            optionAttrs.$observe("value", function(newVal) {
                                isDefined(oldVal) && self.removeOption(oldVal), oldVal = newVal, self.addOption(newVal, optionElement)
                            })
                        } else interpolateTextFn ? optionScope.$watch(interpolateTextFn, function(newVal, oldVal) {
                            optionAttrs.$set("value", newVal), oldVal !== newVal && self.removeOption(oldVal), self.addOption(newVal, optionElement)
                        }) : self.addOption(optionAttrs.value, optionElement);
                        optionElement.on("$destroy", function() {
                            self.removeOption(optionAttrs.value), self.ngModelCtrl.$render()
                        })
                    }
                }],
                selectDirective = function() {
                    function selectPreLink(scope, element, attr, ctrls) {
                        var ngModelCtrl = ctrls[1];
                        if (ngModelCtrl) {
                            var selectCtrl = ctrls[0];
                            if (selectCtrl.ngModelCtrl = ngModelCtrl, element.on("change", function() {
                                    scope.$apply(function() {
                                        ngModelCtrl.$setViewValue(selectCtrl.readValue())
                                    })
                                }), attr.multiple) {
                                selectCtrl.readValue = function() {
                                    var array = [];
                                    return forEach(element.find("option"), function(option) {
                                        option.selected && array.push(option.value)
                                    }), array
                                }, selectCtrl.writeValue = function(value) {
                                    var items = new HashMap(value);
                                    forEach(element.find("option"), function(option) {
                                        option.selected = isDefined(items.get(option.value))
                                    })
                                };
                                var lastView, lastViewRef = NaN;
                                scope.$watch(function() {
                                    lastViewRef !== ngModelCtrl.$viewValue || equals(lastView, ngModelCtrl.$viewValue) || (lastView = shallowCopy(ngModelCtrl.$viewValue), ngModelCtrl.$render()), lastViewRef = ngModelCtrl.$viewValue
                                }), ngModelCtrl.$isEmpty = function(value) {
                                    return !value || 0 === value.length
                                }
                            }
                        }
                    }

                    function selectPostLink(scope, element, attrs, ctrls) {
                        var ngModelCtrl = ctrls[1];
                        if (ngModelCtrl) {
                            var selectCtrl = ctrls[0];
                            ngModelCtrl.$render = function() {
                                selectCtrl.writeValue(ngModelCtrl.$viewValue)
                            }
                        }
                    }
                    return {
                        restrict: "E",
                        require: ["select", "?ngModel"],
                        controller: SelectController,
                        priority: 1,
                        link: {
                            pre: selectPreLink,
                            post: selectPostLink
                        }
                    }
                },
                optionDirective = ["$interpolate", function($interpolate) {
                    return {
                        restrict: "E",
                        priority: 100,
                        compile: function(element, attr) {
                            if (isDefined(attr.value)) var interpolateValueFn = $interpolate(attr.value, !0);
                            else {
                                var interpolateTextFn = $interpolate(element.text(), !0);
                                interpolateTextFn || attr.$set("value", element.text())
                            }
                            return function(scope, element, attr) {
                                var selectCtrlName = "$selectController",
                                    parent = element.parent(),
                                    selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                                selectCtrl && selectCtrl.registerOption(scope, element, attr, interpolateValueFn, interpolateTextFn)
                            }
                        }
                    }
                }],
                requiredDirective = function() {
                    return {
                        restrict: "A",
                        require: "?ngModel",
                        link: function(scope, elm, attr, ctrl) {
                            ctrl && (attr.required = !0, ctrl.$validators.required = function(modelValue, viewValue) {
                                return !attr.required || !ctrl.$isEmpty(viewValue)
                            }, attr.$observe("required", function() {
                                ctrl.$validate()
                            }))
                        }
                    }
                },
                patternDirective = function() {
                    return {
                        restrict: "A",
                        require: "?ngModel",
                        link: function(scope, elm, attr, ctrl) {
                            if (ctrl) {
                                var regexp, patternExp = attr.ngPattern || attr.pattern;
                                attr.$observe("pattern", function(regex) {
                                    if (isString(regex) && regex.length > 0 && (regex = new RegExp("^" + regex + "$")), regex && !regex.test) throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                                    regexp = regex || void 0, ctrl.$validate()
                                }), ctrl.$validators.pattern = function(modelValue, viewValue) {
                                    return ctrl.$isEmpty(viewValue) || isUndefined(regexp) || regexp.test(viewValue)
                                }
                            }
                        }
                    }
                },
                maxlengthDirective = function() {
                    return {
                        restrict: "A",
                        require: "?ngModel",
                        link: function(scope, elm, attr, ctrl) {
                            if (ctrl) {
                                var maxlength = -1;
                                attr.$observe("maxlength", function(value) {
                                    var intVal = toInt(value);
                                    maxlength = isNumberNaN(intVal) ? -1 : intVal, ctrl.$validate()
                                }), ctrl.$validators.maxlength = function(modelValue, viewValue) {
                                    return maxlength < 0 || ctrl.$isEmpty(viewValue) || viewValue.length <= maxlength
                                }
                            }
                        }
                    }
                },
                minlengthDirective = function() {
                    return {
                        restrict: "A",
                        require: "?ngModel",
                        link: function(scope, elm, attr, ctrl) {
                            if (ctrl) {
                                var minlength = 0;
                                attr.$observe("minlength", function(value) {
                                    minlength = toInt(value) || 0, ctrl.$validate()
                                }), ctrl.$validators.minlength = function(modelValue, viewValue) {
                                    return ctrl.$isEmpty(viewValue) || viewValue.length >= minlength
                                }
                            }
                        }
                    }
                };
            return window.angular.bootstrap ? void(window.console && console.log("WARNING: Tried to load angular more than once.")) : (bindJQuery(), publishExternalAPI(angular), angular.module("ngLocale", [], ["$provide", function($provide) {
                function getDecimals(n) {
                    n += "";
                    var i = n.indexOf(".");
                    return i == -1 ? 0 : n.length - i - 1
                }

                function getVF(n, opt_precision) {
                    var v = opt_precision;
                    void 0 === v && (v = Math.min(getDecimals(n), 3));
                    var base = Math.pow(10, v),
                        f = (n * base | 0) % base;
                    return {
                        v: v,
                        f: f
                    }
                }
                var PLURAL_CATEGORY = {
                    ZERO: "zero",
                    ONE: "one",
                    TWO: "two",
                    FEW: "few",
                    MANY: "many",
                    OTHER: "other"
                };
                $provide.value("$locale", {
                    DATETIME_FORMATS: {
                        AMPMS: ["AM", "PM"],
                        DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        ERANAMES: ["Before Christ", "Anno Domini"],
                        ERAS: ["BC", "AD"],
                        FIRSTDAYOFWEEK: 6,
                        MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        STANDALONEMONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        WEEKENDRANGE: [5, 6],
                        fullDate: "EEEE, MMMM d, y",
                        longDate: "MMMM d, y",
                        medium: "MMM d, y h:mm:ss a",
                        mediumDate: "MMM d, y",
                        mediumTime: "h:mm:ss a",
                        short: "M/d/yy h:mm a",
                        shortDate: "M/d/yy",
                        shortTime: "h:mm a"
                    },
                    NUMBER_FORMATS: {
                        CURRENCY_SYM: "$",
                        DECIMAL_SEP: ".",
                        GROUP_SEP: ",",
                        PATTERNS: [{
                            gSize: 3,
                            lgSize: 3,
                            maxFrac: 3,
                            minFrac: 0,
                            minInt: 1,
                            negPre: "-",
                            negSuf: "",
                            posPre: "",
                            posSuf: ""
                        }, {
                            gSize: 3,
                            lgSize: 3,
                            maxFrac: 2,
                            minFrac: 2,
                            minInt: 1,
                            negPre: "-¤",
                            negSuf: "",
                            posPre: "¤",
                            posSuf: ""
                        }]
                    },
                    id: "en-us",
                    localeID: "en_US",
                    pluralCat: function(n, opt_precision) {
                        var i = 0 | n,
                            vf = getVF(n, opt_precision);
                        return 1 == i && 0 == vf.v ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER
                    }
                })
            }]), void jqLite(window.document).ready(function() {
                angularInit(window.document, bootstrap)
            }))
        }(window), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>')
    }, {}],
    11: [function(require, module, exports) {
        require("./angular"), module.exports = angular
    }, {
        "./angular": 10
    }],
    12: [function(require, module, exports) {
        (function(global) {
            (function() {
                function addMapEntry(map, pair) {
                    return map.set(pair[0], pair[1]), map
                }

                function addSetEntry(set, value) {
                    return set.add(value), set
                }

                function apply(func, thisArg, args) {
                    switch (args.length) {
                        case 0:
                            return func.call(thisArg);
                        case 1:
                            return func.call(thisArg, args[0]);
                        case 2:
                            return func.call(thisArg, args[0], args[1]);
                        case 3:
                            return func.call(thisArg, args[0], args[1], args[2])
                    }
                    return func.apply(thisArg, args)
                }

                function arrayAggregator(array, setter, iteratee, accumulator) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length;) {
                        var value = array[index];
                        setter(accumulator, value, iteratee(value), array)
                    }
                    return accumulator
                }

                function arrayEach(array, iteratee) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length && iteratee(array[index], index, array) !== !1;);
                    return array
                }

                function arrayEachRight(array, iteratee) {
                    for (var length = null == array ? 0 : array.length; length-- && iteratee(array[length], length, array) !== !1;);
                    return array
                }

                function arrayEvery(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length;)
                        if (!predicate(array[index], index, array)) return !1;
                    return !0
                }

                function arrayFilter(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length;) {
                        var value = array[index];
                        predicate(value, index, array) && (result[resIndex++] = value)
                    }
                    return result
                }

                function arrayIncludes(array, value) {
                    var length = null == array ? 0 : array.length;
                    return !!length && baseIndexOf(array, value, 0) > -1
                }

                function arrayIncludesWith(array, value, comparator) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length;)
                        if (comparator(value, array[index])) return !0;
                    return !1
                }

                function arrayMap(array, iteratee) {
                    for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length;) result[index] = iteratee(array[index], index, array);
                    return result
                }

                function arrayPush(array, values) {
                    for (var index = -1, length = values.length, offset = array.length; ++index < length;) array[offset + index] = values[index];
                    return array
                }

                function arrayReduce(array, iteratee, accumulator, initAccum) {
                    var index = -1,
                        length = null == array ? 0 : array.length;
                    for (initAccum && length && (accumulator = array[++index]); ++index < length;) accumulator = iteratee(accumulator, array[index], index, array);
                    return accumulator
                }

                function arrayReduceRight(array, iteratee, accumulator, initAccum) {
                    var length = null == array ? 0 : array.length;
                    for (initAccum && length && (accumulator = array[--length]); length--;) accumulator = iteratee(accumulator, array[length], length, array);
                    return accumulator
                }

                function arraySome(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length;)
                        if (predicate(array[index], index, array)) return !0;
                    return !1
                }

                function asciiToArray(string) {
                    return string.split("")
                }

                function asciiWords(string) {
                    return string.match(reAsciiWord) || []
                }

                function baseFindKey(collection, predicate, eachFunc) {
                    var result;
                    return eachFunc(collection, function(value, key, collection) {
                        if (predicate(value, key, collection)) return result = key, !1
                    }), result
                }

                function baseFindIndex(array, predicate, fromIndex, fromRight) {
                    for (var length = array.length, index = fromIndex + (fromRight ? 1 : -1); fromRight ? index-- : ++index < length;)
                        if (predicate(array[index], index, array)) return index;
                    return -1
                }

                function baseIndexOf(array, value, fromIndex) {
                    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex)
                }

                function baseIndexOfWith(array, value, fromIndex, comparator) {
                    for (var index = fromIndex - 1, length = array.length; ++index < length;)
                        if (comparator(array[index], value)) return index;
                    return -1
                }

                function baseIsNaN(value) {
                    return value !== value
                }

                function baseMean(array, iteratee) {
                    var length = null == array ? 0 : array.length;
                    return length ? baseSum(array, iteratee) / length : NAN
                }

                function baseProperty(key) {
                    return function(object) {
                        return null == object ? undefined : object[key]
                    }
                }

                function basePropertyOf(object) {
                    return function(key) {
                        return null == object ? undefined : object[key]
                    }
                }

                function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
                    return eachFunc(collection, function(value, index, collection) {
                        accumulator = initAccum ? (initAccum = !1, value) : iteratee(accumulator, value, index, collection)
                    }), accumulator
                }

                function baseSortBy(array, comparer) {
                    var length = array.length;
                    for (array.sort(comparer); length--;) array[length] = array[length].value;
                    return array
                }

                function baseSum(array, iteratee) {
                    for (var result, index = -1, length = array.length; ++index < length;) {
                        var current = iteratee(array[index]);
                        current !== undefined && (result = result === undefined ? current : result + current)
                    }
                    return result
                }

                function baseTimes(n, iteratee) {
                    for (var index = -1, result = Array(n); ++index < n;) result[index] = iteratee(index);
                    return result
                }

                function baseToPairs(object, props) {
                    return arrayMap(props, function(key) {
                        return [key, object[key]];
                    })
                }

                function baseUnary(func) {
                    return function(value) {
                        return func(value)
                    }
                }

                function baseValues(object, props) {
                    return arrayMap(props, function(key) {
                        return object[key]
                    })
                }

                function cacheHas(cache, key) {
                    return cache.has(key)
                }

                function charsStartIndex(strSymbols, chrSymbols) {
                    for (var index = -1, length = strSymbols.length; ++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1;);
                    return index
                }

                function charsEndIndex(strSymbols, chrSymbols) {
                    for (var index = strSymbols.length; index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1;);
                    return index
                }

                function countHolders(array, placeholder) {
                    for (var length = array.length, result = 0; length--;) array[length] === placeholder && ++result;
                    return result
                }

                function escapeStringChar(chr) {
                    return "\\" + stringEscapes[chr]
                }

                function getValue(object, key) {
                    return null == object ? undefined : object[key]
                }

                function hasUnicode(string) {
                    return reHasUnicode.test(string)
                }

                function hasUnicodeWord(string) {
                    return reHasUnicodeWord.test(string)
                }

                function iteratorToArray(iterator) {
                    for (var data, result = []; !(data = iterator.next()).done;) result.push(data.value);
                    return result
                }

                function mapToArray(map) {
                    var index = -1,
                        result = Array(map.size);
                    return map.forEach(function(value, key) {
                        result[++index] = [key, value]
                    }), result
                }

                function overArg(func, transform) {
                    return function(arg) {
                        return func(transform(arg))
                    }
                }

                function replaceHolders(array, placeholder) {
                    for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length;) {
                        var value = array[index];
                        value !== placeholder && value !== PLACEHOLDER || (array[index] = PLACEHOLDER, result[resIndex++] = index)
                    }
                    return result
                }

                function setToArray(set) {
                    var index = -1,
                        result = Array(set.size);
                    return set.forEach(function(value) {
                        result[++index] = value
                    }), result
                }

                function setToPairs(set) {
                    var index = -1,
                        result = Array(set.size);
                    return set.forEach(function(value) {
                        result[++index] = [value, value]
                    }), result
                }

                function strictIndexOf(array, value, fromIndex) {
                    for (var index = fromIndex - 1, length = array.length; ++index < length;)
                        if (array[index] === value) return index;
                    return -1
                }

                function strictLastIndexOf(array, value, fromIndex) {
                    for (var index = fromIndex + 1; index--;)
                        if (array[index] === value) return index;
                    return index
                }

                function stringSize(string) {
                    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string)
                }

                function stringToArray(string) {
                    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string)
                }

                function unicodeSize(string) {
                    for (var result = reUnicode.lastIndex = 0; reUnicode.test(string);) ++result;
                    return result
                }

                function unicodeToArray(string) {
                    return string.match(reUnicode) || []
                }

                function unicodeWords(string) {
                    return string.match(reUnicodeWord) || []
                }
                var undefined, VERSION = "4.17.2",
                    LARGE_ARRAY_SIZE = 200,
                    CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
                    FUNC_ERROR_TEXT = "Expected a function",
                    HASH_UNDEFINED = "__lodash_hash_undefined__",
                    MAX_MEMOIZE_SIZE = 500,
                    PLACEHOLDER = "__lodash_placeholder__",
                    CLONE_DEEP_FLAG = 1,
                    CLONE_FLAT_FLAG = 2,
                    CLONE_SYMBOLS_FLAG = 4,
                    COMPARE_PARTIAL_FLAG = 1,
                    COMPARE_UNORDERED_FLAG = 2,
                    WRAP_BIND_FLAG = 1,
                    WRAP_BIND_KEY_FLAG = 2,
                    WRAP_CURRY_BOUND_FLAG = 4,
                    WRAP_CURRY_FLAG = 8,
                    WRAP_CURRY_RIGHT_FLAG = 16,
                    WRAP_PARTIAL_FLAG = 32,
                    WRAP_PARTIAL_RIGHT_FLAG = 64,
                    WRAP_ARY_FLAG = 128,
                    WRAP_REARG_FLAG = 256,
                    WRAP_FLIP_FLAG = 512,
                    DEFAULT_TRUNC_LENGTH = 30,
                    DEFAULT_TRUNC_OMISSION = "...",
                    HOT_COUNT = 800,
                    HOT_SPAN = 16,
                    LAZY_FILTER_FLAG = 1,
                    LAZY_MAP_FLAG = 2,
                    LAZY_WHILE_FLAG = 3,
                    INFINITY = 1 / 0,
                    MAX_SAFE_INTEGER = 9007199254740991,
                    MAX_INTEGER = 1.7976931348623157e308,
                    NAN = NaN,
                    MAX_ARRAY_LENGTH = 4294967295,
                    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
                    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1,
                    wrapFlags = [
                        ["ary", WRAP_ARY_FLAG],
                        ["bind", WRAP_BIND_FLAG],
                        ["bindKey", WRAP_BIND_KEY_FLAG],
                        ["curry", WRAP_CURRY_FLAG],
                        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
                        ["flip", WRAP_FLIP_FLAG],
                        ["partial", WRAP_PARTIAL_FLAG],
                        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
                        ["rearg", WRAP_REARG_FLAG]
                    ],
                    argsTag = "[object Arguments]",
                    arrayTag = "[object Array]",
                    asyncTag = "[object AsyncFunction]",
                    boolTag = "[object Boolean]",
                    dateTag = "[object Date]",
                    domExcTag = "[object DOMException]",
                    errorTag = "[object Error]",
                    funcTag = "[object Function]",
                    genTag = "[object GeneratorFunction]",
                    mapTag = "[object Map]",
                    numberTag = "[object Number]",
                    nullTag = "[object Null]",
                    objectTag = "[object Object]",
                    promiseTag = "[object Promise]",
                    proxyTag = "[object Proxy]",
                    regexpTag = "[object RegExp]",
                    setTag = "[object Set]",
                    stringTag = "[object String]",
                    symbolTag = "[object Symbol]",
                    undefinedTag = "[object Undefined]",
                    weakMapTag = "[object WeakMap]",
                    weakSetTag = "[object WeakSet]",
                    arrayBufferTag = "[object ArrayBuffer]",
                    dataViewTag = "[object DataView]",
                    float32Tag = "[object Float32Array]",
                    float64Tag = "[object Float64Array]",
                    int8Tag = "[object Int8Array]",
                    int16Tag = "[object Int16Array]",
                    int32Tag = "[object Int32Array]",
                    uint8Tag = "[object Uint8Array]",
                    uint8ClampedTag = "[object Uint8ClampedArray]",
                    uint16Tag = "[object Uint16Array]",
                    uint32Tag = "[object Uint32Array]",
                    reEmptyStringLeading = /\b__p \+= '';/g,
                    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
                    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                    reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
                    reUnescapedHtml = /[&<>"']/g,
                    reHasEscapedHtml = RegExp(reEscapedHtml.source),
                    reHasUnescapedHtml = RegExp(reUnescapedHtml.source),
                    reEscape = /<%-([\s\S]+?)%>/g,
                    reEvaluate = /<%([\s\S]+?)%>/g,
                    reInterpolate = /<%=([\s\S]+?)%>/g,
                    reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                    reIsPlainProp = /^\w*$/,
                    reLeadingDot = /^\./,
                    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                    reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
                    reHasRegExpChar = RegExp(reRegExpChar.source),
                    reTrim = /^\s+|\s+$/g,
                    reTrimStart = /^\s+/,
                    reTrimEnd = /\s+$/,
                    reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
                    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
                    reSplitDetails = /,? & /,
                    reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
                    reEscapeChar = /\\(\\)?/g,
                    reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                    reFlags = /\w*$/,
                    reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
                    reIsBinary = /^0b[01]+$/i,
                    reIsHostCtor = /^\[object .+?Constructor\]$/,
                    reIsOctal = /^0o[0-7]+$/i,
                    reIsUint = /^(?:0|[1-9]\d*)$/,
                    reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                    reNoMatch = /($^)/,
                    reUnescapedString = /['\n\r\u2028\u2029\\]/g,
                    rsAstralRange = "\\ud800-\\udfff",
                    rsComboMarksRange = "\\u0300-\\u036f",
                    reComboHalfMarksRange = "\\ufe20-\\ufe2f",
                    rsComboSymbolsRange = "\\u20d0-\\u20ff",
                    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
                    rsDingbatRange = "\\u2700-\\u27bf",
                    rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff",
                    rsMathOpRange = "\\xac\\xb1\\xd7\\xf7",
                    rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
                    rsPunctuationRange = "\\u2000-\\u206f",
                    rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                    rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                    rsVarRange = "\\ufe0e\\ufe0f",
                    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange,
                    rsApos = "['’]",
                    rsAstral = "[" + rsAstralRange + "]",
                    rsBreak = "[" + rsBreakRange + "]",
                    rsCombo = "[" + rsComboRange + "]",
                    rsDigits = "\\d+",
                    rsDingbat = "[" + rsDingbatRange + "]",
                    rsLower = "[" + rsLowerRange + "]",
                    rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]",
                    rsFitz = "\\ud83c[\\udffb-\\udfff]",
                    rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")",
                    rsNonAstral = "[^" + rsAstralRange + "]",
                    rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                    rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                    rsUpper = "[" + rsUpperRange + "]",
                    rsZWJ = "\\u200d",
                    rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")",
                    rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")",
                    rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?",
                    rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?",
                    reOptMod = rsModifier + "?",
                    rsOptVar = "[" + rsVarRange + "]?",
                    rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*",
                    rsOrdLower = "\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)",
                    rsOrdUpper = "\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)",
                    rsSeq = rsOptVar + reOptMod + rsOptJoin,
                    rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq,
                    rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")",
                    reApos = RegExp(rsApos, "g"),
                    reComboMark = RegExp(rsCombo, "g"),
                    reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"),
                    reUnicodeWord = RegExp([rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")", rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")", rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower, rsUpper + "+" + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join("|"), "g"),
                    reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]"),
                    reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                    contextProps = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
                    templateCounter = -1,
                    typedArrayTags = {};
                typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0, typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
                var cloneableTags = {};
                cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0, cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
                var deburredLetters = {
                        "À": "A",
                        "Á": "A",
                        "Â": "A",
                        "Ã": "A",
                        "Ä": "A",
                        "Å": "A",
                        "à": "a",
                        "á": "a",
                        "â": "a",
                        "ã": "a",
                        "ä": "a",
                        "å": "a",
                        "Ç": "C",
                        "ç": "c",
                        "Ð": "D",
                        "ð": "d",
                        "È": "E",
                        "É": "E",
                        "Ê": "E",
                        "Ë": "E",
                        "è": "e",
                        "é": "e",
                        "ê": "e",
                        "ë": "e",
                        "Ì": "I",
                        "Í": "I",
                        "Î": "I",
                        "Ï": "I",
                        "ì": "i",
                        "í": "i",
                        "î": "i",
                        "ï": "i",
                        "Ñ": "N",
                        "ñ": "n",
                        "Ò": "O",
                        "Ó": "O",
                        "Ô": "O",
                        "Õ": "O",
                        "Ö": "O",
                        "Ø": "O",
                        "ò": "o",
                        "ó": "o",
                        "ô": "o",
                        "õ": "o",
                        "ö": "o",
                        "ø": "o",
                        "Ù": "U",
                        "Ú": "U",
                        "Û": "U",
                        "Ü": "U",
                        "ù": "u",
                        "ú": "u",
                        "û": "u",
                        "ü": "u",
                        "Ý": "Y",
                        "ý": "y",
                        "ÿ": "y",
                        "Æ": "Ae",
                        "æ": "ae",
                        "Þ": "Th",
                        "þ": "th",
                        "ß": "ss",
                        "Ā": "A",
                        "Ă": "A",
                        "Ą": "A",
                        "ā": "a",
                        "ă": "a",
                        "ą": "a",
                        "Ć": "C",
                        "Ĉ": "C",
                        "Ċ": "C",
                        "Č": "C",
                        "ć": "c",
                        "ĉ": "c",
                        "ċ": "c",
                        "č": "c",
                        "Ď": "D",
                        "Đ": "D",
                        "ď": "d",
                        "đ": "d",
                        "Ē": "E",
                        "Ĕ": "E",
                        "Ė": "E",
                        "Ę": "E",
                        "Ě": "E",
                        "ē": "e",
                        "ĕ": "e",
                        "ė": "e",
                        "ę": "e",
                        "ě": "e",
                        "Ĝ": "G",
                        "Ğ": "G",
                        "Ġ": "G",
                        "Ģ": "G",
                        "ĝ": "g",
                        "ğ": "g",
                        "ġ": "g",
                        "ģ": "g",
                        "Ĥ": "H",
                        "Ħ": "H",
                        "ĥ": "h",
                        "ħ": "h",
                        "Ĩ": "I",
                        "Ī": "I",
                        "Ĭ": "I",
                        "Į": "I",
                        "İ": "I",
                        "ĩ": "i",
                        "ī": "i",
                        "ĭ": "i",
                        "į": "i",
                        "ı": "i",
                        "Ĵ": "J",
                        "ĵ": "j",
                        "Ķ": "K",
                        "ķ": "k",
                        "ĸ": "k",
                        "Ĺ": "L",
                        "Ļ": "L",
                        "Ľ": "L",
                        "Ŀ": "L",
                        "Ł": "L",
                        "ĺ": "l",
                        "ļ": "l",
                        "ľ": "l",
                        "ŀ": "l",
                        "ł": "l",
                        "Ń": "N",
                        "Ņ": "N",
                        "Ň": "N",
                        "Ŋ": "N",
                        "ń": "n",
                        "ņ": "n",
                        "ň": "n",
                        "ŋ": "n",
                        "Ō": "O",
                        "Ŏ": "O",
                        "Ő": "O",
                        "ō": "o",
                        "ŏ": "o",
                        "ő": "o",
                        "Ŕ": "R",
                        "Ŗ": "R",
                        "Ř": "R",
                        "ŕ": "r",
                        "ŗ": "r",
                        "ř": "r",
                        "Ś": "S",
                        "Ŝ": "S",
                        "Ş": "S",
                        "Š": "S",
                        "ś": "s",
                        "ŝ": "s",
                        "ş": "s",
                        "š": "s",
                        "Ţ": "T",
                        "Ť": "T",
                        "Ŧ": "T",
                        "ţ": "t",
                        "ť": "t",
                        "ŧ": "t",
                        "Ũ": "U",
                        "Ū": "U",
                        "Ŭ": "U",
                        "Ů": "U",
                        "Ű": "U",
                        "Ų": "U",
                        "ũ": "u",
                        "ū": "u",
                        "ŭ": "u",
                        "ů": "u",
                        "ű": "u",
                        "ų": "u",
                        "Ŵ": "W",
                        "ŵ": "w",
                        "Ŷ": "Y",
                        "ŷ": "y",
                        "Ÿ": "Y",
                        "Ź": "Z",
                        "Ż": "Z",
                        "Ž": "Z",
                        "ź": "z",
                        "ż": "z",
                        "ž": "z",
                        "Ĳ": "IJ",
                        "ĳ": "ij",
                        "Œ": "Oe",
                        "œ": "oe",
                        "ŉ": "'n",
                        "ſ": "s"
                    },
                    htmlEscapes = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;"
                    },
                    htmlUnescapes = {
                        "&amp;": "&",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&#39;": "'"
                    },
                    stringEscapes = {
                        "\\": "\\",
                        "'": "'",
                        "\n": "n",
                        "\r": "r",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    freeParseFloat = parseFloat,
                    freeParseInt = parseInt,
                    freeGlobal = "object" == typeof global && global && global.Object === Object && global,
                    freeSelf = "object" == typeof self && self && self.Object === Object && self,
                    root = freeGlobal || freeSelf || Function("return this")(),
                    freeExports = "object" == typeof exports && exports && !exports.nodeType && exports,
                    freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module,
                    moduleExports = freeModule && freeModule.exports === freeExports,
                    freeProcess = moduleExports && freeGlobal.process,
                    nodeUtil = function() {
                        try {
                            return freeProcess && freeProcess.binding && freeProcess.binding("util")
                        } catch (e) {}
                    }(),
                    nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
                    nodeIsDate = nodeUtil && nodeUtil.isDate,
                    nodeIsMap = nodeUtil && nodeUtil.isMap,
                    nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
                    nodeIsSet = nodeUtil && nodeUtil.isSet,
                    nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray,
                    asciiSize = baseProperty("length"),
                    deburrLetter = basePropertyOf(deburredLetters),
                    escapeHtmlChar = basePropertyOf(htmlEscapes),
                    unescapeHtmlChar = basePropertyOf(htmlUnescapes),
                    runInContext = function runInContext(context) {
                        function lodash(value) {
                            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                                if (value instanceof LodashWrapper) return value;
                                if (hasOwnProperty.call(value, "__wrapped__")) return wrapperClone(value)
                            }
                            return new LodashWrapper(value)
                        }

                        function baseLodash() {}

                        function LodashWrapper(value, chainAll) {
                            this.__wrapped__ = value, this.__actions__ = [], this.__chain__ = !!chainAll, this.__index__ = 0, this.__values__ = undefined
                        }

                        function LazyWrapper(value) {
                            this.__wrapped__ = value, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = MAX_ARRAY_LENGTH, this.__views__ = []
                        }

                        function lazyClone() {
                            var result = new LazyWrapper(this.__wrapped__);
                            return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), result
                        }

                        function lazyReverse() {
                            if (this.__filtered__) {
                                var result = new LazyWrapper(this);
                                result.__dir__ = -1, result.__filtered__ = !0
                            } else result = this.clone(), result.__dir__ *= -1;
                            return result
                        }

                        function lazyValue() {
                            var array = this.__wrapped__.value(),
                                dir = this.__dir__,
                                isArr = isArray(array),
                                isRight = dir < 0,
                                arrLength = isArr ? array.length : 0,
                                view = getView(0, arrLength, this.__views__),
                                start = view.start,
                                end = view.end,
                                length = end - start,
                                index = isRight ? end : start - 1,
                                iteratees = this.__iteratees__,
                                iterLength = iteratees.length,
                                resIndex = 0,
                                takeCount = nativeMin(length, this.__takeCount__);
                            if (!isArr || arrLength < LARGE_ARRAY_SIZE || arrLength == length && takeCount == length) return baseWrapperValue(array, this.__actions__);
                            var result = [];
                            outer: for (; length-- && resIndex < takeCount;) {
                                index += dir;
                                for (var iterIndex = -1, value = array[index]; ++iterIndex < iterLength;) {
                                    var data = iteratees[iterIndex],
                                        iteratee = data.iteratee,
                                        type = data.type,
                                        computed = iteratee(value);
                                    if (type == LAZY_MAP_FLAG) value = computed;
                                    else if (!computed) {
                                        if (type == LAZY_FILTER_FLAG) continue outer;
                                        break outer
                                    }
                                }
                                result[resIndex++] = value
                            }
                            return result
                        }

                        function Hash(entries) {
                            var index = -1,
                                length = null == entries ? 0 : entries.length;
                            for (this.clear(); ++index < length;) {
                                var entry = entries[index];
                                this.set(entry[0], entry[1])
                            }
                        }

                        function hashClear() {
                            this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0
                        }

                        function hashDelete(key) {
                            var result = this.has(key) && delete this.__data__[key];
                            return this.size -= result ? 1 : 0, result
                        }

                        function hashGet(key) {
                            var data = this.__data__;
                            if (nativeCreate) {
                                var result = data[key];
                                return result === HASH_UNDEFINED ? undefined : result
                            }
                            return hasOwnProperty.call(data, key) ? data[key] : undefined
                        }

                        function hashHas(key) {
                            var data = this.__data__;
                            return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key)
                        }

                        function hashSet(key, value) {
                            var data = this.__data__;
                            return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value, this
                        }

                        function ListCache(entries) {
                            var index = -1,
                                length = null == entries ? 0 : entries.length;
                            for (this.clear(); ++index < length;) {
                                var entry = entries[index];
                                this.set(entry[0], entry[1])
                            }
                        }

                        function listCacheClear() {
                            this.__data__ = [], this.size = 0
                        }

                        function listCacheDelete(key) {
                            var data = this.__data__,
                                index = assocIndexOf(data, key);
                            if (index < 0) return !1;
                            var lastIndex = data.length - 1;
                            return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, !0
                        }

                        function listCacheGet(key) {
                            var data = this.__data__,
                                index = assocIndexOf(data, key);
                            return index < 0 ? undefined : data[index][1]
                        }

                        function listCacheHas(key) {
                            return assocIndexOf(this.__data__, key) > -1
                        }

                        function listCacheSet(key, value) {
                            var data = this.__data__,
                                index = assocIndexOf(data, key);
                            return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this
                        }

                        function MapCache(entries) {
                            var index = -1,
                                length = null == entries ? 0 : entries.length;
                            for (this.clear(); ++index < length;) {
                                var entry = entries[index];
                                this.set(entry[0], entry[1])
                            }
                        }

                        function mapCacheClear() {
                            this.size = 0, this.__data__ = {
                                hash: new Hash,
                                map: new(Map || ListCache),
                                string: new Hash
                            }
                        }

                        function mapCacheDelete(key) {
                            var result = getMapData(this, key).delete(key);
                            return this.size -= result ? 1 : 0, result
                        }

                        function mapCacheGet(key) {
                            return getMapData(this, key).get(key)
                        }

                        function mapCacheHas(key) {
                            return getMapData(this, key).has(key)
                        }

                        function mapCacheSet(key, value) {
                            var data = getMapData(this, key),
                                size = data.size;
                            return data.set(key, value), this.size += data.size == size ? 0 : 1, this
                        }

                        function SetCache(values) {
                            var index = -1,
                                length = null == values ? 0 : values.length;
                            for (this.__data__ = new MapCache; ++index < length;) this.add(values[index])
                        }

                        function setCacheAdd(value) {
                            return this.__data__.set(value, HASH_UNDEFINED), this
                        }

                        function setCacheHas(value) {
                            return this.__data__.has(value)
                        }

                        function Stack(entries) {
                            var data = this.__data__ = new ListCache(entries);
                            this.size = data.size
                        }

                        function stackClear() {
                            this.__data__ = new ListCache, this.size = 0
                        }

                        function stackDelete(key) {
                            var data = this.__data__,
                                result = data.delete(key);
                            return this.size = data.size, result
                        }

                        function stackGet(key) {
                            return this.__data__.get(key)
                        }

                        function stackHas(key) {
                            return this.__data__.has(key)
                        }

                        function stackSet(key, value) {
                            var data = this.__data__;
                            if (data instanceof ListCache) {
                                var pairs = data.__data__;
                                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) return pairs.push([key, value]), this.size = ++data.size, this;
                                data = this.__data__ = new MapCache(pairs)
                            }
                            return data.set(key, value), this.size = data.size, this
                        }

                        function arrayLikeKeys(value, inherited) {
                            var isArr = isArray(value),
                                isArg = !isArr && isArguments(value),
                                isBuff = !isArr && !isArg && isBuffer(value),
                                isType = !isArr && !isArg && !isBuff && isTypedArray(value),
                                skipIndexes = isArr || isArg || isBuff || isType,
                                result = skipIndexes ? baseTimes(value.length, String) : [],
                                length = result.length;
                            for (var key in value) !inherited && !hasOwnProperty.call(value, key) || skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)) || result.push(key);
                            return result
                        }

                        function arraySample(array) {
                            var length = array.length;
                            return length ? array[baseRandom(0, length - 1)] : undefined
                        }

                        function arraySampleSize(array, n) {
                            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length))
                        }

                        function arrayShuffle(array) {
                            return shuffleSelf(copyArray(array))
                        }

                        function assignInDefaults(objValue, srcValue, key, object) {
                            return objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) ? srcValue : objValue
                        }

                        function assignMergeValue(object, key, value) {
                            (value === undefined || eq(object[key], value)) && (value !== undefined || key in object) || baseAssignValue(object, key, value)
                        }

                        function assignValue(object, key, value) {
                            var objValue = object[key];
                            hasOwnProperty.call(object, key) && eq(objValue, value) && (value !== undefined || key in object) || baseAssignValue(object, key, value)
                        }

                        function assocIndexOf(array, key) {
                            for (var length = array.length; length--;)
                                if (eq(array[length][0], key)) return length;
                            return -1
                        }

                        function baseAggregator(collection, setter, iteratee, accumulator) {
                            return baseEach(collection, function(value, key, collection) {
                                setter(accumulator, value, iteratee(value), collection)
                            }), accumulator
                        }

                        function baseAssign(object, source) {
                            return object && copyObject(source, keys(source), object)
                        }

                        function baseAssignIn(object, source) {
                            return object && copyObject(source, keysIn(source), object)
                        }

                        function baseAssignValue(object, key, value) {
                            "__proto__" == key && defineProperty ? defineProperty(object, key, {
                                configurable: !0,
                                enumerable: !0,
                                value: value,
                                writable: !0
                            }) : object[key] = value
                        }

                        function baseAt(object, paths) {
                            for (var index = -1, length = paths.length, result = Array(length), skip = null == object; ++index < length;) result[index] = skip ? undefined : get(object, paths[index]);
                            return result
                        }

                        function baseClamp(number, lower, upper) {
                            return number === number && (upper !== undefined && (number = number <= upper ? number : upper), lower !== undefined && (number = number >= lower ? number : lower)), number
                        }

                        function baseClone(value, bitmask, customizer, key, object, stack) {
                            var result, isDeep = bitmask & CLONE_DEEP_FLAG,
                                isFlat = bitmask & CLONE_FLAT_FLAG,
                                isFull = bitmask & CLONE_SYMBOLS_FLAG;
                            if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), result !== undefined) return result;
                            if (!isObject(value)) return value;
                            var isArr = isArray(value);
                            if (isArr) {
                                if (result = initCloneArray(value), !isDeep) return copyArray(value, result)
                            } else {
                                var tag = getTag(value),
                                    isFunc = tag == funcTag || tag == genTag;
                                if (isBuffer(value)) return cloneBuffer(value, isDeep);
                                if (tag == objectTag || tag == argsTag || isFunc && !object) {
                                    if (result = isFlat || isFunc ? {} : initCloneObject(value), !isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value))
                                } else {
                                    if (!cloneableTags[tag]) return object ? value : {};
                                    result = initCloneByTag(value, tag, baseClone, isDeep)
                                }
                            }
                            stack || (stack = new Stack);
                            var stacked = stack.get(value);
                            if (stacked) return stacked;
                            stack.set(value, result);
                            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys,
                                props = isArr ? undefined : keysFunc(value);
                            return arrayEach(props || value, function(subValue, key) {
                                props && (key = subValue, subValue = value[key]), assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
                            }), result
                        }

                        function baseConforms(source) {
                            var props = keys(source);
                            return function(object) {
                                return baseConformsTo(object, source, props)
                            }
                        }

                        function baseConformsTo(object, source, props) {
                            var length = props.length;
                            if (null == object) return !length;
                            for (object = Object(object); length--;) {
                                var key = props[length],
                                    predicate = source[key],
                                    value = object[key];
                                if (value === undefined && !(key in object) || !predicate(value)) return !1
                            }
                            return !0
                        }

                        function baseDelay(func, wait, args) {
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return setTimeout(function() {
                                func.apply(undefined, args)
                            }, wait)
                        }

                        function baseDifference(array, values, iteratee, comparator) {
                            var index = -1,
                                includes = arrayIncludes,
                                isCommon = !0,
                                length = array.length,
                                result = [],
                                valuesLength = values.length;
                            if (!length) return result;
                            iteratee && (values = arrayMap(values, baseUnary(iteratee))), comparator ? (includes = arrayIncludesWith, isCommon = !1) : values.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = !1, values = new SetCache(values));
                            outer: for (; ++index < length;) {
                                var value = array[index],
                                    computed = null == iteratee ? value : iteratee(value);
                                if (value = comparator || 0 !== value ? value : 0, isCommon && computed === computed) {
                                    for (var valuesIndex = valuesLength; valuesIndex--;)
                                        if (values[valuesIndex] === computed) continue outer;
                                    result.push(value)
                                } else includes(values, computed, comparator) || result.push(value)
                            }
                            return result
                        }

                        function baseEvery(collection, predicate) {
                            var result = !0;
                            return baseEach(collection, function(value, index, collection) {
                                return result = !!predicate(value, index, collection)
                            }), result
                        }

                        function baseExtremum(array, iteratee, comparator) {
                            for (var index = -1, length = array.length; ++index < length;) {
                                var value = array[index],
                                    current = iteratee(value);
                                if (null != current && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) var computed = current,
                                    result = value
                            }
                            return result
                        }

                        function baseFill(array, value, start, end) {
                            var length = array.length;
                            for (start = toInteger(start), start < 0 && (start = -start > length ? 0 : length + start), end = end === undefined || end > length ? length : toInteger(end), end < 0 && (end += length), end = start > end ? 0 : toLength(end); start < end;) array[start++] = value;
                            return array
                        }

                        function baseFilter(collection, predicate) {
                            var result = [];
                            return baseEach(collection, function(value, index, collection) {
                                predicate(value, index, collection) && result.push(value)
                            }), result
                        }

                        function baseFlatten(array, depth, predicate, isStrict, result) {
                            var index = -1,
                                length = array.length;
                            for (predicate || (predicate = isFlattenable), result || (result = []); ++index < length;) {
                                var value = array[index];
                                depth > 0 && predicate(value) ? depth > 1 ? baseFlatten(value, depth - 1, predicate, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value)
                            }
                            return result
                        }

                        function baseForOwn(object, iteratee) {
                            return object && baseFor(object, iteratee, keys)
                        }

                        function baseForOwnRight(object, iteratee) {
                            return object && baseForRight(object, iteratee, keys)
                        }

                        function baseFunctions(object, props) {
                            return arrayFilter(props, function(key) {
                                return isFunction(object[key])
                            })
                        }

                        function baseGet(object, path) {
                            path = castPath(path, object);
                            for (var index = 0, length = path.length; null != object && index < length;) object = object[toKey(path[index++])];
                            return index && index == length ? object : undefined
                        }

                        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
                            var result = keysFunc(object);
                            return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
                        }

                        function baseGetTag(value) {
                            return null == value ? value === undefined ? undefinedTag : nullTag : (value = Object(value), symToStringTag && symToStringTag in value ? getRawTag(value) : objectToString(value))
                        }

                        function baseGt(value, other) {
                            return value > other
                        }

                        function baseHas(object, key) {
                            return null != object && hasOwnProperty.call(object, key)
                        }

                        function baseHasIn(object, key) {
                            return null != object && key in Object(object)
                        }

                        function baseInRange(number, start, end) {
                            return number >= nativeMin(start, end) && number < nativeMax(start, end)
                        }

                        function baseIntersection(arrays, iteratee, comparator) {
                            for (var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = 1 / 0, result = []; othIndex--;) {
                                var array = arrays[othIndex];
                                othIndex && iteratee && (array = arrayMap(array, baseUnary(iteratee))), maxLength = nativeMin(array.length, maxLength), caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined
                            }
                            array = arrays[0];
                            var index = -1,
                                seen = caches[0];
                            outer: for (; ++index < length && result.length < maxLength;) {
                                var value = array[index],
                                    computed = iteratee ? iteratee(value) : value;
                                if (value = comparator || 0 !== value ? value : 0, !(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
                                    for (othIndex = othLength; --othIndex;) {
                                        var cache = caches[othIndex];
                                        if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) continue outer
                                    }
                                    seen && seen.push(computed), result.push(value)
                                }
                            }
                            return result
                        }

                        function baseInverter(object, setter, iteratee, accumulator) {
                            return baseForOwn(object, function(value, key, object) {
                                setter(accumulator, iteratee(value), key, object)
                            }), accumulator
                        }

                        function baseInvoke(object, path, args) {
                            path = castPath(path, object), object = parent(object, path);
                            var func = null == object ? object : object[toKey(last(path))];
                            return null == func ? undefined : apply(func, object, args)
                        }

                        function baseIsArguments(value) {
                            return isObjectLike(value) && baseGetTag(value) == argsTag
                        }

                        function baseIsArrayBuffer(value) {
                            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag
                        }

                        function baseIsDate(value) {
                            return isObjectLike(value) && baseGetTag(value) == dateTag
                        }

                        function baseIsEqual(value, other, bitmask, customizer, stack) {
                            return value === other || (null == value || null == other || !isObject(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack))
                        }

                        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                            var objIsArr = isArray(object),
                                othIsArr = isArray(other),
                                objTag = arrayTag,
                                othTag = arrayTag;
                            objIsArr || (objTag = getTag(object), objTag = objTag == argsTag ? objectTag : objTag), othIsArr || (othTag = getTag(other), othTag = othTag == argsTag ? objectTag : othTag);
                            var objIsObj = objTag == objectTag,
                                othIsObj = othTag == objectTag,
                                isSameTag = objTag == othTag;
                            if (isSameTag && isBuffer(object)) {
                                if (!isBuffer(other)) return !1;
                                objIsArr = !0, objIsObj = !1
                            }
                            if (isSameTag && !objIsObj) return stack || (stack = new Stack), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
                            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                                var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"),
                                    othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
                                if (objIsWrapped || othIsWrapped) {
                                    var objUnwrapped = objIsWrapped ? object.value() : object,
                                        othUnwrapped = othIsWrapped ? other.value() : other;
                                    return stack || (stack = new Stack), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
                                }
                            }
                            return !!isSameTag && (stack || (stack = new Stack), equalObjects(object, other, bitmask, customizer, equalFunc, stack))
                        }

                        function baseIsMap(value) {
                            return isObjectLike(value) && getTag(value) == mapTag
                        }

                        function baseIsMatch(object, source, matchData, customizer) {
                            var index = matchData.length,
                                length = index,
                                noCustomizer = !customizer;
                            if (null == object) return !length;
                            for (object = Object(object); index--;) {
                                var data = matchData[index];
                                if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return !1
                            }
                            for (; ++index < length;) {
                                data = matchData[index];
                                var key = data[0],
                                    objValue = object[key],
                                    srcValue = data[1];
                                if (noCustomizer && data[2]) {
                                    if (objValue === undefined && !(key in object)) return !1
                                } else {
                                    var stack = new Stack;
                                    if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
                                    if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) return !1
                                }
                            }
                            return !0
                        }

                        function baseIsNative(value) {
                            if (!isObject(value) || isMasked(value)) return !1;
                            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
                            return pattern.test(toSource(value))
                        }

                        function baseIsRegExp(value) {
                            return isObjectLike(value) && baseGetTag(value) == regexpTag
                        }

                        function baseIsSet(value) {
                            return isObjectLike(value) && getTag(value) == setTag
                        }

                        function baseIsTypedArray(value) {
                            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
                        }

                        function baseIteratee(value) {
                            return "function" == typeof value ? value : null == value ? identity : "object" == typeof value ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value)
                        }

                        function baseKeys(object) {
                            if (!isPrototype(object)) return nativeKeys(object);
                            var result = [];
                            for (var key in Object(object)) hasOwnProperty.call(object, key) && "constructor" != key && result.push(key);
                            return result
                        }

                        function baseKeysIn(object) {
                            if (!isObject(object)) return nativeKeysIn(object);
                            var isProto = isPrototype(object),
                                result = [];
                            for (var key in object)("constructor" != key || !isProto && hasOwnProperty.call(object, key)) && result.push(key);
                            return result
                        }

                        function baseLt(value, other) {
                            return value < other
                        }

                        function baseMap(collection, iteratee) {
                            var index = -1,
                                result = isArrayLike(collection) ? Array(collection.length) : [];
                            return baseEach(collection, function(value, key, collection) {
                                result[++index] = iteratee(value, key, collection)
                            }), result
                        }

                        function baseMatches(source) {
                            var matchData = getMatchData(source);
                            return 1 == matchData.length && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function(object) {
                                return object === source || baseIsMatch(object, source, matchData)
                            }
                        }

                        function baseMatchesProperty(path, srcValue) {
                            return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(toKey(path), srcValue) : function(object) {
                                var objValue = get(object, path);
                                return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG)
                            }
                        }

                        function baseMerge(object, source, srcIndex, customizer, stack) {
                            object !== source && baseFor(source, function(srcValue, key) {
                                if (isObject(srcValue)) stack || (stack = new Stack), baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                                else {
                                    var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : undefined;
                                    newValue === undefined && (newValue = srcValue), assignMergeValue(object, key, newValue)
                                }
                            }, keysIn)
                        }

                        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                            var objValue = object[key],
                                srcValue = source[key],
                                stacked = stack.get(srcValue);
                            if (stacked) return void assignMergeValue(object, key, stacked);
                            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined,
                                isCommon = newValue === undefined;
                            if (isCommon) {
                                var isArr = isArray(srcValue),
                                    isBuff = !isArr && isBuffer(srcValue),
                                    isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                                newValue = srcValue, isArr || isBuff || isTyped ? isArray(objValue) ? newValue = objValue : isArrayLikeObject(objValue) ? newValue = copyArray(objValue) : isBuff ? (isCommon = !1, newValue = cloneBuffer(srcValue, !0)) : isTyped ? (isCommon = !1, newValue = cloneTypedArray(srcValue, !0)) : newValue = [] : isPlainObject(srcValue) || isArguments(srcValue) ? (newValue = objValue, isArguments(objValue) ? newValue = toPlainObject(objValue) : (!isObject(objValue) || srcIndex && isFunction(objValue)) && (newValue = initCloneObject(srcValue))) : isCommon = !1
                            }
                            isCommon && (stack.set(srcValue, newValue), mergeFunc(newValue, srcValue, srcIndex, customizer, stack), stack.delete(srcValue)), assignMergeValue(object, key, newValue)
                        }

                        function baseNth(array, n) {
                            var length = array.length;
                            if (length) return n += n < 0 ? length : 0, isIndex(n, length) ? array[n] : undefined
                        }

                        function baseOrderBy(collection, iteratees, orders) {
                            var index = -1;
                            iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));
                            var result = baseMap(collection, function(value, key, collection) {
                                var criteria = arrayMap(iteratees, function(iteratee) {
                                    return iteratee(value)
                                });
                                return {
                                    criteria: criteria,
                                    index: ++index,
                                    value: value
                                }
                            });
                            return baseSortBy(result, function(object, other) {
                                return compareMultiple(object, other, orders)
                            })
                        }

                        function basePick(object, paths) {
                            return object = Object(object), basePickBy(object, paths, function(value, path) {
                                return hasIn(object, path)
                            })
                        }

                        function basePickBy(object, paths, predicate) {
                            for (var index = -1, length = paths.length, result = {}; ++index < length;) {
                                var path = paths[index],
                                    value = baseGet(object, path);
                                predicate(value, path) && baseSet(result, castPath(path, object), value)
                            }
                            return result
                        }

                        function basePropertyDeep(path) {
                            return function(object) {
                                return baseGet(object, path)
                            }
                        }

                        function basePullAll(array, values, iteratee, comparator) {
                            var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
                                index = -1,
                                length = values.length,
                                seen = array;
                            for (array === values && (values = copyArray(values)), iteratee && (seen = arrayMap(array, baseUnary(iteratee))); ++index < length;)
                                for (var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
                                    (fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1;) seen !== array && splice.call(seen, fromIndex, 1), splice.call(array, fromIndex, 1);
                            return array
                        }

                        function basePullAt(array, indexes) {
                            for (var length = array ? indexes.length : 0, lastIndex = length - 1; length--;) {
                                var index = indexes[length];
                                if (length == lastIndex || index !== previous) {
                                    var previous = index;
                                    isIndex(index) ? splice.call(array, index, 1) : baseUnset(array, index)
                                }
                            }
                            return array
                        }

                        function baseRandom(lower, upper) {
                            return lower + nativeFloor(nativeRandom() * (upper - lower + 1))
                        }

                        function baseRange(start, end, step, fromRight) {
                            for (var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length); length--;) result[fromRight ? length : ++index] = start, start += step;
                            return result
                        }

                        function baseRepeat(string, n) {
                            var result = "";
                            if (!string || n < 1 || n > MAX_SAFE_INTEGER) return result;
                            do n % 2 && (result += string), n = nativeFloor(n / 2), n && (string += string); while (n);
                            return result
                        }

                        function baseRest(func, start) {
                            return setToString(overRest(func, start, identity), func + "")
                        }

                        function baseSample(collection) {
                            return arraySample(values(collection))
                        }

                        function baseSampleSize(collection, n) {
                            var array = values(collection);
                            return shuffleSelf(array, baseClamp(n, 0, array.length))
                        }

                        function baseSet(object, path, value, customizer) {
                            if (!isObject(object)) return object;
                            path = castPath(path, object);
                            for (var index = -1, length = path.length, lastIndex = length - 1, nested = object; null != nested && ++index < length;) {
                                var key = toKey(path[index]),
                                    newValue = value;
                                if (index != lastIndex) {
                                    var objValue = nested[key];
                                    newValue = customizer ? customizer(objValue, key, nested) : undefined, newValue === undefined && (newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {})
                                }
                                assignValue(nested, key, newValue), nested = nested[key]
                            }
                            return object
                        }

                        function baseShuffle(collection) {
                            return shuffleSelf(values(collection))
                        }

                        function baseSlice(array, start, end) {
                            var index = -1,
                                length = array.length;
                            start < 0 && (start = -start > length ? 0 : length + start), end = end > length ? length : end, end < 0 && (end += length), length = start > end ? 0 : end - start >>> 0, start >>>= 0;
                            for (var result = Array(length); ++index < length;) result[index] = array[index + start];
                            return result
                        }

                        function baseSome(collection, predicate) {
                            var result;
                            return baseEach(collection, function(value, index, collection) {
                                return result = predicate(value, index, collection), !result
                            }), !!result
                        }

                        function baseSortedIndex(array, value, retHighest) {
                            var low = 0,
                                high = null == array ? low : array.length;
                            if ("number" == typeof value && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                                for (; low < high;) {
                                    var mid = low + high >>> 1,
                                        computed = array[mid];
                                    null !== computed && !isSymbol(computed) && (retHighest ? computed <= value : computed < value) ? low = mid + 1 : high = mid
                                }
                                return high
                            }
                            return baseSortedIndexBy(array, value, identity, retHighest)
                        }

                        function baseSortedIndexBy(array, value, iteratee, retHighest) {
                            value = iteratee(value);
                            for (var low = 0, high = null == array ? 0 : array.length, valIsNaN = value !== value, valIsNull = null === value, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined; low < high;) {
                                var mid = nativeFloor((low + high) / 2),
                                    computed = iteratee(array[mid]),
                                    othIsDefined = computed !== undefined,
                                    othIsNull = null === computed,
                                    othIsReflexive = computed === computed,
                                    othIsSymbol = isSymbol(computed);
                                if (valIsNaN) var setLow = retHighest || othIsReflexive;
                                else setLow = valIsUndefined ? othIsReflexive && (retHighest || othIsDefined) : valIsNull ? othIsReflexive && othIsDefined && (retHighest || !othIsNull) : valIsSymbol ? othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol) : !othIsNull && !othIsSymbol && (retHighest ? computed <= value : computed < value);
                                setLow ? low = mid + 1 : high = mid
                            }
                            return nativeMin(high, MAX_ARRAY_INDEX)
                        }

                        function baseSortedUniq(array, iteratee) {
                            for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length;) {
                                var value = array[index],
                                    computed = iteratee ? iteratee(value) : value;
                                if (!index || !eq(computed, seen)) {
                                    var seen = computed;
                                    result[resIndex++] = 0 === value ? 0 : value
                                }
                            }
                            return result
                        }

                        function baseToNumber(value) {
                            return "number" == typeof value ? value : isSymbol(value) ? NAN : +value
                        }

                        function baseToString(value) {
                            if ("string" == typeof value) return value;
                            if (isArray(value)) return arrayMap(value, baseToString) + "";
                            if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
                            var result = value + "";
                            return "0" == result && 1 / value == -INFINITY ? "-0" : result
                        }

                        function baseUniq(array, iteratee, comparator) {
                            var index = -1,
                                includes = arrayIncludes,
                                length = array.length,
                                isCommon = !0,
                                result = [],
                                seen = result;
                            if (comparator) isCommon = !1, includes = arrayIncludesWith;
                            else if (length >= LARGE_ARRAY_SIZE) {
                                var set = iteratee ? null : createSet(array);
                                if (set) return setToArray(set);
                                isCommon = !1, includes = cacheHas, seen = new SetCache
                            } else seen = iteratee ? [] : result;
                            outer: for (; ++index < length;) {
                                var value = array[index],
                                    computed = iteratee ? iteratee(value) : value;
                                if (value = comparator || 0 !== value ? value : 0, isCommon && computed === computed) {
                                    for (var seenIndex = seen.length; seenIndex--;)
                                        if (seen[seenIndex] === computed) continue outer;
                                    iteratee && seen.push(computed), result.push(value)
                                } else includes(seen, computed, comparator) || (seen !== result && seen.push(computed), result.push(value))
                            }
                            return result
                        }

                        function baseUnset(object, path) {
                            return path = castPath(path, object), object = parent(object, path), null == object || delete object[toKey(last(path))]
                        }

                        function baseUpdate(object, path, updater, customizer) {
                            return baseSet(object, path, updater(baseGet(object, path)), customizer)
                        }

                        function baseWhile(array, predicate, isDrop, fromRight) {
                            for (var length = array.length, index = fromRight ? length : -1;
                                (fromRight ? index-- : ++index < length) && predicate(array[index], index, array););
                            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
                        }

                        function baseWrapperValue(value, actions) {
                            var result = value;
                            return result instanceof LazyWrapper && (result = result.value()), arrayReduce(actions, function(result, action) {
                                return action.func.apply(action.thisArg, arrayPush([result], action.args))
                            }, result)
                        }

                        function baseXor(arrays, iteratee, comparator) {
                            var length = arrays.length;
                            if (length < 2) return length ? baseUniq(arrays[0]) : [];
                            for (var index = -1, result = Array(length); ++index < length;)
                                for (var array = arrays[index], othIndex = -1; ++othIndex < length;) othIndex != index && (result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator));
                            return baseUniq(baseFlatten(result, 1), iteratee, comparator)
                        }

                        function baseZipObject(props, values, assignFunc) {
                            for (var index = -1, length = props.length, valsLength = values.length, result = {}; ++index < length;) {
                                var value = index < valsLength ? values[index] : undefined;
                                assignFunc(result, props[index], value)
                            }
                            return result
                        }

                        function castArrayLikeObject(value) {
                            return isArrayLikeObject(value) ? value : []
                        }

                        function castFunction(value) {
                            return "function" == typeof value ? value : identity
                        }

                        function castPath(value, object) {
                            return isArray(value) ? value : isKey(value, object) ? [value] : stringToPath(toString(value))
                        }

                        function castSlice(array, start, end) {
                            var length = array.length;
                            return end = end === undefined ? length : end, !start && end >= length ? array : baseSlice(array, start, end)
                        }

                        function cloneBuffer(buffer, isDeep) {
                            if (isDeep) return buffer.slice();
                            var length = buffer.length,
                                result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                            return buffer.copy(result), result
                        }

                        function cloneArrayBuffer(arrayBuffer) {
                            var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
                            return new Uint8Array(result).set(new Uint8Array(arrayBuffer)), result
                        }

                        function cloneDataView(dataView, isDeep) {
                            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
                        }

                        function cloneMap(map, isDeep, cloneFunc) {
                            var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
                            return arrayReduce(array, addMapEntry, new map.constructor)
                        }

                        function cloneRegExp(regexp) {
                            var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
                            return result.lastIndex = regexp.lastIndex, result
                        }

                        function cloneSet(set, isDeep, cloneFunc) {
                            var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
                            return arrayReduce(array, addSetEntry, new set.constructor)
                        }

                        function cloneSymbol(symbol) {
                            return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {}
                        }

                        function cloneTypedArray(typedArray, isDeep) {
                            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
                        }

                        function compareAscending(value, other) {
                            if (value !== other) {
                                var valIsDefined = value !== undefined,
                                    valIsNull = null === value,
                                    valIsReflexive = value === value,
                                    valIsSymbol = isSymbol(value),
                                    othIsDefined = other !== undefined,
                                    othIsNull = null === other,
                                    othIsReflexive = other === other,
                                    othIsSymbol = isSymbol(other);
                                if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1;
                                if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1
                            }
                            return 0
                        }

                        function compareMultiple(object, other, orders) {
                            for (var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length; ++index < length;) {
                                var result = compareAscending(objCriteria[index], othCriteria[index]);
                                if (result) {
                                    if (index >= ordersLength) return result;
                                    var order = orders[index];
                                    return result * ("desc" == order ? -1 : 1)
                                }
                            }
                            return object.index - other.index
                        }

                        function composeArgs(args, partials, holders, isCurried) {
                            for (var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried; ++leftIndex < leftLength;) result[leftIndex] = partials[leftIndex];
                            for (; ++argsIndex < holdersLength;)(isUncurried || argsIndex < argsLength) && (result[holders[argsIndex]] = args[argsIndex]);
                            for (; rangeLength--;) result[leftIndex++] = args[argsIndex++];
                            return result
                        }

                        function composeArgsRight(args, partials, holders, isCurried) {
                            for (var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried; ++argsIndex < rangeLength;) result[argsIndex] = args[argsIndex];
                            for (var offset = argsIndex; ++rightIndex < rightLength;) result[offset + rightIndex] = partials[rightIndex];
                            for (; ++holdersIndex < holdersLength;)(isUncurried || argsIndex < argsLength) && (result[offset + holders[holdersIndex]] = args[argsIndex++]);
                            return result
                        }

                        function copyArray(source, array) {
                            var index = -1,
                                length = source.length;
                            for (array || (array = Array(length)); ++index < length;) array[index] = source[index];
                            return array
                        }

                        function copyObject(source, props, object, customizer) {
                            var isNew = !object;
                            object || (object = {});
                            for (var index = -1, length = props.length; ++index < length;) {
                                var key = props[index],
                                    newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
                                newValue === undefined && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue)
                            }
                            return object
                        }

                        function copySymbols(source, object) {
                            return copyObject(source, getSymbols(source), object)
                        }

                        function copySymbolsIn(source, object) {
                            return copyObject(source, getSymbolsIn(source), object)
                        }

                        function createAggregator(setter, initializer) {
                            return function(collection, iteratee) {
                                var func = isArray(collection) ? arrayAggregator : baseAggregator,
                                    accumulator = initializer ? initializer() : {};
                                return func(collection, setter, getIteratee(iteratee, 2), accumulator)
                            }
                        }

                        function createAssigner(assigner) {
                            return baseRest(function(object, sources) {
                                var index = -1,
                                    length = sources.length,
                                    customizer = length > 1 ? sources[length - 1] : undefined,
                                    guard = length > 2 ? sources[2] : undefined;
                                for (customizer = assigner.length > 3 && "function" == typeof customizer ? (length--, customizer) : undefined, guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = length < 3 ? undefined : customizer, length = 1), object = Object(object); ++index < length;) {
                                    var source = sources[index];
                                    source && assigner(object, source, index, customizer)
                                }
                                return object
                            })
                        }

                        function createBaseEach(eachFunc, fromRight) {
                            return function(collection, iteratee) {
                                if (null == collection) return collection;
                                if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
                                for (var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
                                    (fromRight ? index-- : ++index < length) && iteratee(iterable[index], index, iterable) !== !1;);
                                return collection
                            }
                        }

                        function createBaseFor(fromRight) {
                            return function(object, iteratee, keysFunc) {
                                for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--;) {
                                    var key = props[fromRight ? length : ++index];
                                    if (iteratee(iterable[key], key, iterable) === !1) break
                                }
                                return object
                            }
                        }

                        function createBind(func, bitmask, thisArg) {
                            function wrapper() {
                                var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                                return fn.apply(isBind ? thisArg : this, arguments)
                            }
                            var isBind = bitmask & WRAP_BIND_FLAG,
                                Ctor = createCtor(func);
                            return wrapper
                        }

                        function createCaseFirst(methodName) {
                            return function(string) {
                                string = toString(string);
                                var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined,
                                    chr = strSymbols ? strSymbols[0] : string.charAt(0),
                                    trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
                                return chr[methodName]() + trailing
                            }
                        }

                        function createCompounder(callback) {
                            return function(string) {
                                return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "")
                            }
                        }

                        function createCtor(Ctor) {
                            return function() {
                                var args = arguments;
                                switch (args.length) {
                                    case 0:
                                        return new Ctor;
                                    case 1:
                                        return new Ctor(args[0]);
                                    case 2:
                                        return new Ctor(args[0], args[1]);
                                    case 3:
                                        return new Ctor(args[0], args[1], args[2]);
                                    case 4:
                                        return new Ctor(args[0], args[1], args[2], args[3]);
                                    case 5:
                                        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                                    case 6:
                                        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                                    case 7:
                                        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
                                }
                                var thisBinding = baseCreate(Ctor.prototype),
                                    result = Ctor.apply(thisBinding, args);
                                return isObject(result) ? result : thisBinding
                            }
                        }

                        function createCurry(func, bitmask, arity) {
                            function wrapper() {
                                for (var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper); index--;) args[index] = arguments[index];
                                var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
                                if (length -= holders.length, length < arity) return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
                                var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                                return apply(fn, this, args)
                            }
                            var Ctor = createCtor(func);
                            return wrapper
                        }

                        function createFind(findIndexFunc) {
                            return function(collection, predicate, fromIndex) {
                                var iterable = Object(collection);
                                if (!isArrayLike(collection)) {
                                    var iteratee = getIteratee(predicate, 3);
                                    collection = keys(collection), predicate = function(key) {
                                        return iteratee(iterable[key], key, iterable)
                                    }
                                }
                                var index = findIndexFunc(collection, predicate, fromIndex);
                                return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
                            }
                        }

                        function createFlow(fromRight) {
                            return flatRest(function(funcs) {
                                var length = funcs.length,
                                    index = length,
                                    prereq = LodashWrapper.prototype.thru;
                                for (fromRight && funcs.reverse(); index--;) {
                                    var func = funcs[index];
                                    if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                                    if (prereq && !wrapper && "wrapper" == getFuncName(func)) var wrapper = new LodashWrapper([], (!0))
                                }
                                for (index = wrapper ? index : length; ++index < length;) {
                                    func = funcs[index];
                                    var funcName = getFuncName(func),
                                        data = "wrapper" == funcName ? getData(func) : undefined;
                                    wrapper = data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func)
                                }
                                return function() {
                                    var args = arguments,
                                        value = args[0];
                                    if (wrapper && 1 == args.length && isArray(value) && value.length >= LARGE_ARRAY_SIZE) return wrapper.plant(value).value();
                                    for (var index = 0, result = length ? funcs[index].apply(this, args) : value; ++index < length;) result = funcs[index].call(this, result);
                                    return result
                                }
                            })
                        }

                        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
                            function wrapper() {
                                for (var length = arguments.length, args = Array(length), index = length; index--;) args[index] = arguments[index];
                                if (isCurried) var placeholder = getHolder(wrapper),
                                    holdersCount = countHolders(args, placeholder);
                                if (partials && (args = composeArgs(args, partials, holders, isCurried)), partialsRight && (args = composeArgsRight(args, partialsRight, holdersRight, isCurried)), length -= holdersCount, isCurried && length < arity) {
                                    var newHolders = replaceHolders(args, placeholder);
                                    return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length)
                                }
                                var thisBinding = isBind ? thisArg : this,
                                    fn = isBindKey ? thisBinding[func] : func;
                                return length = args.length, argPos ? args = reorder(args, argPos) : isFlip && length > 1 && args.reverse(), isAry && ary < length && (args.length = ary), this && this !== root && this instanceof wrapper && (fn = Ctor || createCtor(fn)), fn.apply(thisBinding, args)
                            }
                            var isAry = bitmask & WRAP_ARY_FLAG,
                                isBind = bitmask & WRAP_BIND_FLAG,
                                isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
                                isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
                                isFlip = bitmask & WRAP_FLIP_FLAG,
                                Ctor = isBindKey ? undefined : createCtor(func);
                            return wrapper
                        }

                        function createInverter(setter, toIteratee) {
                            return function(object, iteratee) {
                                return baseInverter(object, setter, toIteratee(iteratee), {})
                            }
                        }

                        function createMathOperation(operator, defaultValue) {
                            return function(value, other) {
                                var result;
                                if (value === undefined && other === undefined) return defaultValue;
                                if (value !== undefined && (result = value), other !== undefined) {
                                    if (result === undefined) return other;
                                    "string" == typeof value || "string" == typeof other ? (value = baseToString(value), other = baseToString(other)) : (value = baseToNumber(value), other = baseToNumber(other)), result = operator(value, other)
                                }
                                return result
                            }
                        }

                        function createOver(arrayFunc) {
                            return flatRest(function(iteratees) {
                                return iteratees = arrayMap(iteratees, baseUnary(getIteratee())), baseRest(function(args) {
                                    var thisArg = this;
                                    return arrayFunc(iteratees, function(iteratee) {
                                        return apply(iteratee, thisArg, args)
                                    })
                                })
                            })
                        }

                        function createPadding(length, chars) {
                            chars = chars === undefined ? " " : baseToString(chars);
                            var charsLength = chars.length;
                            if (charsLength < 2) return charsLength ? baseRepeat(chars, length) : chars;
                            var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
                            return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join("") : result.slice(0, length)
                        }

                        function createPartial(func, bitmask, thisArg, partials) {
                            function wrapper() {
                                for (var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func; ++leftIndex < leftLength;) args[leftIndex] = partials[leftIndex];
                                for (; argsLength--;) args[leftIndex++] = arguments[++argsIndex];
                                return apply(fn, isBind ? thisArg : this, args)
                            }
                            var isBind = bitmask & WRAP_BIND_FLAG,
                                Ctor = createCtor(func);
                            return wrapper
                        }

                        function createRange(fromRight) {
                            return function(start, end, step) {
                                return step && "number" != typeof step && isIterateeCall(start, end, step) && (end = step = undefined), start = toFinite(start), end === undefined ? (end = start, start = 0) : end = toFinite(end), step = step === undefined ? start < end ? 1 : -1 : toFinite(step), baseRange(start, end, step, fromRight)
                            }
                        }

                        function createRelationalOperation(operator) {
                            return function(value, other) {
                                return "string" == typeof value && "string" == typeof other || (value = toNumber(value), other = toNumber(other)), operator(value, other)
                            }
                        }

                        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
                            var isCurry = bitmask & WRAP_CURRY_FLAG,
                                newHolders = isCurry ? holders : undefined,
                                newHoldersRight = isCurry ? undefined : holders,
                                newPartials = isCurry ? partials : undefined,
                                newPartialsRight = isCurry ? undefined : partials;
                            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG, bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG), bitmask & WRAP_CURRY_BOUND_FLAG || (bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG));
                            var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity],
                                result = wrapFunc.apply(undefined, newData);
                            return isLaziable(func) && setData(result, newData), result.placeholder = placeholder, setWrapToString(result, func, bitmask)
                        }

                        function createRound(methodName) {
                            var func = Math[methodName];
                            return function(number, precision) {
                                if (number = toNumber(number), precision = nativeMin(toInteger(precision), 292)) {
                                    var pair = (toString(number) + "e").split("e"),
                                        value = func(pair[0] + "e" + (+pair[1] + precision));
                                    return pair = (toString(value) + "e").split("e"), +(pair[0] + "e" + (+pair[1] - precision))
                                }
                                return func(number)
                            }
                        }

                        function createToPairs(keysFunc) {
                            return function(object) {
                                var tag = getTag(object);
                                return tag == mapTag ? mapToArray(object) : tag == setTag ? setToPairs(object) : baseToPairs(object, keysFunc(object))
                            }
                        }

                        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
                            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
                            if (!isBindKey && "function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            var length = partials ? partials.length : 0;
                            if (length || (bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG), partials = holders = undefined), ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0), arity = arity === undefined ? arity : toInteger(arity), length -= holders ? holders.length : 0, bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
                                var partialsRight = partials,
                                    holdersRight = holders;
                                partials = holders = undefined
                            }
                            var data = isBindKey ? undefined : getData(func),
                                newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
                            if (data && mergeData(newData, data), func = newData[0], bitmask = newData[1], thisArg = newData[2], partials = newData[3], holders = newData[4], arity = newData[9] = null == newData[9] ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0), !arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG) && (bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)), bitmask && bitmask != WRAP_BIND_FLAG) result = bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG ? createCurry(func, bitmask, arity) : bitmask != WRAP_PARTIAL_FLAG && bitmask != (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG) || holders.length ? createHybrid.apply(undefined, newData) : createPartial(func, bitmask, thisArg, partials);
                            else var result = createBind(func, bitmask, thisArg);
                            var setter = data ? baseSetData : setData;
                            return setWrapToString(setter(result, newData), func, bitmask)
                        }

                        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
                            var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                                arrLength = array.length,
                                othLength = other.length;
                            if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
                            var stacked = stack.get(array);
                            if (stacked && stack.get(other)) return stacked == other;
                            var index = -1,
                                result = !0,
                                seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined;
                            for (stack.set(array, other), stack.set(other, array); ++index < arrLength;) {
                                var arrValue = array[index],
                                    othValue = other[index];
                                if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
                                if (compared !== undefined) {
                                    if (compared) continue;
                                    result = !1;
                                    break
                                }
                                if (seen) {
                                    if (!arraySome(other, function(othValue, othIndex) {
                                            if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex)
                                        })) {
                                        result = !1;
                                        break
                                    }
                                } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack)) {
                                    result = !1;
                                    break
                                }
                            }
                            return stack.delete(array), stack.delete(other), result
                        }

                        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
                            switch (tag) {
                                case dataViewTag:
                                    if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
                                    object = object.buffer, other = other.buffer;
                                case arrayBufferTag:
                                    return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other)));
                                case boolTag:
                                case dateTag:
                                case numberTag:
                                    return eq(+object, +other);
                                case errorTag:
                                    return object.name == other.name && object.message == other.message;
                                case regexpTag:
                                case stringTag:
                                    return object == other + "";
                                case mapTag:
                                    var convert = mapToArray;
                                case setTag:
                                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                                    if (convert || (convert = setToArray), object.size != other.size && !isPartial) return !1;
                                    var stacked = stack.get(object);
                                    if (stacked) return stacked == other;
                                    bitmask |= COMPARE_UNORDERED_FLAG, stack.set(object, other);
                                    var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                                    return stack.delete(object), result;
                                case symbolTag:
                                    if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other)
                            }
                            return !1
                        }

                        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                            var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                                objProps = keys(object),
                                objLength = objProps.length,
                                othProps = keys(other),
                                othLength = othProps.length;
                            if (objLength != othLength && !isPartial) return !1;
                            for (var index = objLength; index--;) {
                                var key = objProps[index];
                                if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return !1
                            }
                            var stacked = stack.get(object);
                            if (stacked && stack.get(other)) return stacked == other;
                            var result = !0;
                            stack.set(object, other), stack.set(other, object);
                            for (var skipCtor = isPartial; ++index < objLength;) {
                                key = objProps[index];
                                var objValue = object[key],
                                    othValue = other[key];
                                if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
                                if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                                    result = !1;
                                    break
                                }
                                skipCtor || (skipCtor = "constructor" == key)
                            }
                            if (result && !skipCtor) {
                                var objCtor = object.constructor,
                                    othCtor = other.constructor;
                                objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor) && (result = !1)
                            }
                            return stack.delete(object), stack.delete(other), result
                        }

                        function flatRest(func) {
                            return setToString(overRest(func, undefined, flatten), func + "")
                        }

                        function getAllKeys(object) {
                            return baseGetAllKeys(object, keys, getSymbols)
                        }

                        function getAllKeysIn(object) {
                            return baseGetAllKeys(object, keysIn, getSymbolsIn)
                        }

                        function getFuncName(func) {
                            for (var result = func.name + "", array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0; length--;) {
                                var data = array[length],
                                    otherFunc = data.func;
                                if (null == otherFunc || otherFunc == func) return data.name
                            }
                            return result
                        }

                        function getHolder(func) {
                            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
                            return object.placeholder
                        }

                        function getIteratee() {
                            var result = lodash.iteratee || iteratee;
                            return result = result === iteratee ? baseIteratee : result, arguments.length ? result(arguments[0], arguments[1]) : result
                        }

                        function getMapData(map, key) {
                            var data = map.__data__;
                            return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map
                        }

                        function getMatchData(object) {
                            for (var result = keys(object), length = result.length; length--;) {
                                var key = result[length],
                                    value = object[key];
                                result[length] = [key, value, isStrictComparable(value)]
                            }
                            return result
                        }

                        function getNative(object, key) {
                            var value = getValue(object, key);
                            return baseIsNative(value) ? value : undefined
                        }

                        function getRawTag(value) {
                            var isOwn = hasOwnProperty.call(value, symToStringTag),
                                tag = value[symToStringTag];
                            try {
                                value[symToStringTag] = undefined;
                                var unmasked = !0
                            } catch (e) {}
                            var result = nativeObjectToString.call(value);
                            return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result
                        }

                        function getView(start, end, transforms) {
                            for (var index = -1, length = transforms.length; ++index < length;) {
                                var data = transforms[index],
                                    size = data.size;
                                switch (data.type) {
                                    case "drop":
                                        start += size;
                                        break;
                                    case "dropRight":
                                        end -= size;
                                        break;
                                    case "take":
                                        end = nativeMin(end, start + size);
                                        break;
                                    case "takeRight":
                                        start = nativeMax(start, end - size)
                                }
                            }
                            return {
                                start: start,
                                end: end
                            }
                        }

                        function getWrapDetails(source) {
                            var match = source.match(reWrapDetails);
                            return match ? match[1].split(reSplitDetails) : []
                        }

                        function hasPath(object, path, hasFunc) {
                            path = castPath(path, object);
                            for (var index = -1, length = path.length, result = !1; ++index < length;) {
                                var key = toKey(path[index]);
                                if (!(result = null != object && hasFunc(object, key))) break;
                                object = object[key]
                            }
                            return result || ++index != length ? result : (length = null == object ? 0 : object.length, !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object)))
                        }

                        function initCloneArray(array) {
                            var length = array.length,
                                result = array.constructor(length);
                            return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, result.input = array.input), result
                        }

                        function initCloneObject(object) {
                            return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object))
                        }

                        function initCloneByTag(object, tag, cloneFunc, isDeep) {
                            var Ctor = object.constructor;
                            switch (tag) {
                                case arrayBufferTag:
                                    return cloneArrayBuffer(object);
                                case boolTag:
                                case dateTag:
                                    return new Ctor((+object));
                                case dataViewTag:
                                    return cloneDataView(object, isDeep);
                                case float32Tag:
                                case float64Tag:
                                case int8Tag:
                                case int16Tag:
                                case int32Tag:
                                case uint8Tag:
                                case uint8ClampedTag:
                                case uint16Tag:
                                case uint32Tag:
                                    return cloneTypedArray(object, isDeep);
                                case mapTag:
                                    return cloneMap(object, isDeep, cloneFunc);
                                case numberTag:
                                case stringTag:
                                    return new Ctor(object);
                                case regexpTag:
                                    return cloneRegExp(object);
                                case setTag:
                                    return cloneSet(object, isDeep, cloneFunc);
                                case symbolTag:
                                    return cloneSymbol(object)
                            }
                        }

                        function insertWrapDetails(source, details) {
                            var length = details.length;
                            if (!length) return source;
                            var lastIndex = length - 1;
                            return details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex], details = details.join(length > 2 ? ", " : " "), source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n")
                        }

                        function isFlattenable(value) {
                            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol])
                        }

                        function isIndex(value, length) {
                            return length = null == length ? MAX_SAFE_INTEGER : length, !!length && ("number" == typeof value || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length
                        }

                        function isIterateeCall(value, index, object) {
                            if (!isObject(object)) return !1;
                            var type = typeof index;
                            return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value)
                        }

                        function isKey(value, object) {
                            if (isArray(value)) return !1;
                            var type = typeof value;
                            return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object));
                        }

                        function isKeyable(value) {
                            var type = typeof value;
                            return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value
                        }

                        function isLaziable(func) {
                            var funcName = getFuncName(func),
                                other = lodash[funcName];
                            if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) return !1;
                            if (func === other) return !0;
                            var data = getData(other);
                            return !!data && func === data[0]
                        }

                        function isMasked(func) {
                            return !!maskSrcKey && maskSrcKey in func
                        }

                        function isPrototype(value) {
                            var Ctor = value && value.constructor,
                                proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
                            return value === proto
                        }

                        function isStrictComparable(value) {
                            return value === value && !isObject(value)
                        }

                        function matchesStrictComparable(key, srcValue) {
                            return function(object) {
                                return null != object && (object[key] === srcValue && (srcValue !== undefined || key in Object(object)))
                            }
                        }

                        function memoizeCapped(func) {
                            var result = memoize(func, function(key) {
                                    return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key
                                }),
                                cache = result.cache;
                            return result
                        }

                        function mergeData(data, source) {
                            var bitmask = data[1],
                                srcBitmask = source[1],
                                newBitmask = bitmask | srcBitmask,
                                isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG),
                                isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
                            if (!isCommon && !isCombo) return data;
                            srcBitmask & WRAP_BIND_FLAG && (data[2] = source[2], newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG);
                            var value = source[3];
                            if (value) {
                                var partials = data[3];
                                data[3] = partials ? composeArgs(partials, value, source[4]) : value, data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4]
                            }
                            return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgsRight(partials, value, source[6]) : value, data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6]), value = source[7], value && (data[7] = value), srcBitmask & WRAP_ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, data
                        }

                        function mergeDefaults(objValue, srcValue, key, object, source, stack) {
                            return isObject(objValue) && isObject(srcValue) && (stack.set(srcValue, objValue), baseMerge(objValue, srcValue, undefined, mergeDefaults, stack), stack.delete(srcValue)), objValue
                        }

                        function nativeKeysIn(object) {
                            var result = [];
                            if (null != object)
                                for (var key in Object(object)) result.push(key);
                            return result
                        }

                        function objectToString(value) {
                            return nativeObjectToString.call(value)
                        }

                        function overRest(func, start, transform) {
                            return start = nativeMax(start === undefined ? func.length - 1 : start, 0),
                                function() {
                                    for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length;) array[index] = args[start + index];
                                    index = -1;
                                    for (var otherArgs = Array(start + 1); ++index < start;) otherArgs[index] = args[index];
                                    return otherArgs[start] = transform(array), apply(func, this, otherArgs)
                                }
                        }

                        function parent(object, path) {
                            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1))
                        }

                        function reorder(array, indexes) {
                            for (var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array); length--;) {
                                var index = indexes[length];
                                array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined
                            }
                            return array
                        }

                        function setWrapToString(wrapper, reference, bitmask) {
                            var source = reference + "";
                            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
                        }

                        function shortOut(func) {
                            var count = 0,
                                lastCalled = 0;
                            return function() {
                                var stamp = nativeNow(),
                                    remaining = HOT_SPAN - (stamp - lastCalled);
                                if (lastCalled = stamp, remaining > 0) {
                                    if (++count >= HOT_COUNT) return arguments[0]
                                } else count = 0;
                                return func.apply(undefined, arguments)
                            }
                        }

                        function shuffleSelf(array, size) {
                            var index = -1,
                                length = array.length,
                                lastIndex = length - 1;
                            for (size = size === undefined ? length : size; ++index < size;) {
                                var rand = baseRandom(index, lastIndex),
                                    value = array[rand];
                                array[rand] = array[index], array[index] = value
                            }
                            return array.length = size, array
                        }

                        function toKey(value) {
                            if ("string" == typeof value || isSymbol(value)) return value;
                            var result = value + "";
                            return "0" == result && 1 / value == -INFINITY ? "-0" : result
                        }

                        function toSource(func) {
                            if (null != func) {
                                try {
                                    return funcToString.call(func)
                                } catch (e) {}
                                try {
                                    return func + ""
                                } catch (e) {}
                            }
                            return ""
                        }

                        function updateWrapDetails(details, bitmask) {
                            return arrayEach(wrapFlags, function(pair) {
                                var value = "_." + pair[0];
                                bitmask & pair[1] && !arrayIncludes(details, value) && details.push(value)
                            }), details.sort()
                        }

                        function wrapperClone(wrapper) {
                            if (wrapper instanceof LazyWrapper) return wrapper.clone();
                            var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
                            return result.__actions__ = copyArray(wrapper.__actions__), result.__index__ = wrapper.__index__, result.__values__ = wrapper.__values__, result
                        }

                        function chunk(array, size, guard) {
                            size = (guard ? isIterateeCall(array, size, guard) : size === undefined) ? 1 : nativeMax(toInteger(size), 0);
                            var length = null == array ? 0 : array.length;
                            if (!length || size < 1) return [];
                            for (var index = 0, resIndex = 0, result = Array(nativeCeil(length / size)); index < length;) result[resIndex++] = baseSlice(array, index, index += size);
                            return result
                        }

                        function compact(array) {
                            for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length;) {
                                var value = array[index];
                                value && (result[resIndex++] = value)
                            }
                            return result
                        }

                        function concat() {
                            var length = arguments.length;
                            if (!length) return [];
                            for (var args = Array(length - 1), array = arguments[0], index = length; index--;) args[index - 1] = arguments[index];
                            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1))
                        }

                        function drop(array, n, guard) {
                            var length = null == array ? 0 : array.length;
                            return length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, n < 0 ? 0 : n, length)) : []
                        }

                        function dropRight(array, n, guard) {
                            var length = null == array ? 0 : array.length;
                            return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, baseSlice(array, 0, n < 0 ? 0 : n)) : []
                        }

                        function dropRightWhile(array, predicate) {
                            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0, !0) : []
                        }

                        function dropWhile(array, predicate) {
                            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0) : []
                        }

                        function fill(array, value, start, end) {
                            var length = null == array ? 0 : array.length;
                            return length ? (start && "number" != typeof start && isIterateeCall(array, value, start) && (start = 0, end = length), baseFill(array, value, start, end)) : []
                        }

                        function findIndex(array, predicate, fromIndex) {
                            var length = null == array ? 0 : array.length;
                            if (!length) return -1;
                            var index = null == fromIndex ? 0 : toInteger(fromIndex);
                            return index < 0 && (index = nativeMax(length + index, 0)), baseFindIndex(array, getIteratee(predicate, 3), index)
                        }

                        function findLastIndex(array, predicate, fromIndex) {
                            var length = null == array ? 0 : array.length;
                            if (!length) return -1;
                            var index = length - 1;
                            return fromIndex !== undefined && (index = toInteger(fromIndex), index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)), baseFindIndex(array, getIteratee(predicate, 3), index, !0)
                        }

                        function flatten(array) {
                            var length = null == array ? 0 : array.length;
                            return length ? baseFlatten(array, 1) : []
                        }

                        function flattenDeep(array) {
                            var length = null == array ? 0 : array.length;
                            return length ? baseFlatten(array, INFINITY) : []
                        }

                        function flattenDepth(array, depth) {
                            var length = null == array ? 0 : array.length;
                            return length ? (depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(array, depth)) : []
                        }

                        function fromPairs(pairs) {
                            for (var index = -1, length = null == pairs ? 0 : pairs.length, result = {}; ++index < length;) {
                                var pair = pairs[index];
                                result[pair[0]] = pair[1]
                            }
                            return result
                        }

                        function head(array) {
                            return array && array.length ? array[0] : undefined
                        }

                        function indexOf(array, value, fromIndex) {
                            var length = null == array ? 0 : array.length;
                            if (!length) return -1;
                            var index = null == fromIndex ? 0 : toInteger(fromIndex);
                            return index < 0 && (index = nativeMax(length + index, 0)), baseIndexOf(array, value, index)
                        }

                        function initial(array) {
                            var length = null == array ? 0 : array.length;
                            return length ? baseSlice(array, 0, -1) : []
                        }

                        function join(array, separator) {
                            return null == array ? "" : nativeJoin.call(array, separator)
                        }

                        function last(array) {
                            var length = null == array ? 0 : array.length;
                            return length ? array[length - 1] : undefined
                        }

                        function lastIndexOf(array, value, fromIndex) {
                            var length = null == array ? 0 : array.length;
                            if (!length) return -1;
                            var index = length;
                            return fromIndex !== undefined && (index = toInteger(fromIndex), index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)), value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, !0)
                        }

                        function nth(array, n) {
                            return array && array.length ? baseNth(array, toInteger(n)) : undefined
                        }

                        function pullAll(array, values) {
                            return array && array.length && values && values.length ? basePullAll(array, values) : array
                        }

                        function pullAllBy(array, values, iteratee) {
                            return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array
                        }

                        function pullAllWith(array, values, comparator) {
                            return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array
                        }

                        function remove(array, predicate) {
                            var result = [];
                            if (!array || !array.length) return result;
                            var index = -1,
                                indexes = [],
                                length = array.length;
                            for (predicate = getIteratee(predicate, 3); ++index < length;) {
                                var value = array[index];
                                predicate(value, index, array) && (result.push(value), indexes.push(index))
                            }
                            return basePullAt(array, indexes), result
                        }

                        function reverse(array) {
                            return null == array ? array : nativeReverse.call(array)
                        }

                        function slice(array, start, end) {
                            var length = null == array ? 0 : array.length;
                            return length ? (end && "number" != typeof end && isIterateeCall(array, start, end) ? (start = 0, end = length) : (start = null == start ? 0 : toInteger(start), end = end === undefined ? length : toInteger(end)), baseSlice(array, start, end)) : []
                        }

                        function sortedIndex(array, value) {
                            return baseSortedIndex(array, value)
                        }

                        function sortedIndexBy(array, value, iteratee) {
                            return baseSortedIndexBy(array, value, getIteratee(iteratee, 2))
                        }

                        function sortedIndexOf(array, value) {
                            var length = null == array ? 0 : array.length;
                            if (length) {
                                var index = baseSortedIndex(array, value);
                                if (index < length && eq(array[index], value)) return index
                            }
                            return -1
                        }

                        function sortedLastIndex(array, value) {
                            return baseSortedIndex(array, value, !0)
                        }

                        function sortedLastIndexBy(array, value, iteratee) {
                            return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), !0)
                        }

                        function sortedLastIndexOf(array, value) {
                            var length = null == array ? 0 : array.length;
                            if (length) {
                                var index = baseSortedIndex(array, value, !0) - 1;
                                if (eq(array[index], value)) return index
                            }
                            return -1
                        }

                        function sortedUniq(array) {
                            return array && array.length ? baseSortedUniq(array) : []
                        }

                        function sortedUniqBy(array, iteratee) {
                            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : []
                        }

                        function tail(array) {
                            var length = null == array ? 0 : array.length;
                            return length ? baseSlice(array, 1, length) : []
                        }

                        function take(array, n, guard) {
                            return array && array.length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, 0, n < 0 ? 0 : n)) : []
                        }

                        function takeRight(array, n, guard) {
                            var length = null == array ? 0 : array.length;
                            return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, baseSlice(array, n < 0 ? 0 : n, length)) : []
                        }

                        function takeRightWhile(array, predicate) {
                            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !1, !0) : []
                        }

                        function takeWhile(array, predicate) {
                            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : []
                        }

                        function uniq(array) {
                            return array && array.length ? baseUniq(array) : []
                        }

                        function uniqBy(array, iteratee) {
                            return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : []
                        }

                        function uniqWith(array, comparator) {
                            return comparator = "function" == typeof comparator ? comparator : undefined, array && array.length ? baseUniq(array, undefined, comparator) : []
                        }

                        function unzip(array) {
                            if (!array || !array.length) return [];
                            var length = 0;
                            return array = arrayFilter(array, function(group) {
                                if (isArrayLikeObject(group)) return length = nativeMax(group.length, length), !0
                            }), baseTimes(length, function(index) {
                                return arrayMap(array, baseProperty(index))
                            })
                        }

                        function unzipWith(array, iteratee) {
                            if (!array || !array.length) return [];
                            var result = unzip(array);
                            return null == iteratee ? result : arrayMap(result, function(group) {
                                return apply(iteratee, undefined, group)
                            })
                        }

                        function zipObject(props, values) {
                            return baseZipObject(props || [], values || [], assignValue)
                        }

                        function zipObjectDeep(props, values) {
                            return baseZipObject(props || [], values || [], baseSet)
                        }

                        function chain(value) {
                            var result = lodash(value);
                            return result.__chain__ = !0, result
                        }

                        function tap(value, interceptor) {
                            return interceptor(value), value
                        }

                        function thru(value, interceptor) {
                            return interceptor(value)
                        }

                        function wrapperChain() {
                            return chain(this)
                        }

                        function wrapperCommit() {
                            return new LodashWrapper(this.value(), this.__chain__)
                        }

                        function wrapperNext() {
                            this.__values__ === undefined && (this.__values__ = toArray(this.value()));
                            var done = this.__index__ >= this.__values__.length,
                                value = done ? undefined : this.__values__[this.__index__++];
                            return {
                                done: done,
                                value: value
                            }
                        }

                        function wrapperToIterator() {
                            return this
                        }

                        function wrapperPlant(value) {
                            for (var result, parent = this; parent instanceof baseLodash;) {
                                var clone = wrapperClone(parent);
                                clone.__index__ = 0, clone.__values__ = undefined, result ? previous.__wrapped__ = clone : result = clone;
                                var previous = clone;
                                parent = parent.__wrapped__
                            }
                            return previous.__wrapped__ = value, result
                        }

                        function wrapperReverse() {
                            var value = this.__wrapped__;
                            if (value instanceof LazyWrapper) {
                                var wrapped = value;
                                return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), wrapped.__actions__.push({
                                    func: thru,
                                    args: [reverse],
                                    thisArg: undefined
                                }), new LodashWrapper(wrapped, this.__chain__)
                            }
                            return this.thru(reverse)
                        }

                        function wrapperValue() {
                            return baseWrapperValue(this.__wrapped__, this.__actions__)
                        }

                        function every(collection, predicate, guard) {
                            var func = isArray(collection) ? arrayEvery : baseEvery;
                            return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), func(collection, getIteratee(predicate, 3))
                        }

                        function filter(collection, predicate) {
                            var func = isArray(collection) ? arrayFilter : baseFilter;
                            return func(collection, getIteratee(predicate, 3))
                        }

                        function flatMap(collection, iteratee) {
                            return baseFlatten(map(collection, iteratee), 1)
                        }

                        function flatMapDeep(collection, iteratee) {
                            return baseFlatten(map(collection, iteratee), INFINITY)
                        }

                        function flatMapDepth(collection, iteratee, depth) {
                            return depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(map(collection, iteratee), depth)
                        }

                        function forEach(collection, iteratee) {
                            var func = isArray(collection) ? arrayEach : baseEach;
                            return func(collection, getIteratee(iteratee, 3))
                        }

                        function forEachRight(collection, iteratee) {
                            var func = isArray(collection) ? arrayEachRight : baseEachRight;
                            return func(collection, getIteratee(iteratee, 3))
                        }

                        function includes(collection, value, fromIndex, guard) {
                            collection = isArrayLike(collection) ? collection : values(collection), fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
                            var length = collection.length;
                            return fromIndex < 0 && (fromIndex = nativeMax(length + fromIndex, 0)), isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1
                        }

                        function map(collection, iteratee) {
                            var func = isArray(collection) ? arrayMap : baseMap;
                            return func(collection, getIteratee(iteratee, 3))
                        }

                        function orderBy(collection, iteratees, orders, guard) {
                            return null == collection ? [] : (isArray(iteratees) || (iteratees = null == iteratees ? [] : [iteratees]), orders = guard ? undefined : orders, isArray(orders) || (orders = null == orders ? [] : [orders]), baseOrderBy(collection, iteratees, orders))
                        }

                        function reduce(collection, iteratee, accumulator) {
                            var func = isArray(collection) ? arrayReduce : baseReduce,
                                initAccum = arguments.length < 3;
                            return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach)
                        }

                        function reduceRight(collection, iteratee, accumulator) {
                            var func = isArray(collection) ? arrayReduceRight : baseReduce,
                                initAccum = arguments.length < 3;
                            return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight)
                        }

                        function reject(collection, predicate) {
                            var func = isArray(collection) ? arrayFilter : baseFilter;
                            return func(collection, negate(getIteratee(predicate, 3)))
                        }

                        function sample(collection) {
                            var func = isArray(collection) ? arraySample : baseSample;
                            return func(collection)
                        }

                        function sampleSize(collection, n, guard) {
                            n = (guard ? isIterateeCall(collection, n, guard) : n === undefined) ? 1 : toInteger(n);
                            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
                            return func(collection, n)
                        }

                        function shuffle(collection) {
                            var func = isArray(collection) ? arrayShuffle : baseShuffle;
                            return func(collection)
                        }

                        function size(collection) {
                            if (null == collection) return 0;
                            if (isArrayLike(collection)) return isString(collection) ? stringSize(collection) : collection.length;
                            var tag = getTag(collection);
                            return tag == mapTag || tag == setTag ? collection.size : baseKeys(collection).length
                        }

                        function some(collection, predicate, guard) {
                            var func = isArray(collection) ? arraySome : baseSome;
                            return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), func(collection, getIteratee(predicate, 3))
                        }

                        function after(n, func) {
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return n = toInteger(n),
                                function() {
                                    if (--n < 1) return func.apply(this, arguments)
                                }
                        }

                        function ary(func, n, guard) {
                            return n = guard ? undefined : n, n = func && null == n ? func.length : n, createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n)
                        }

                        function before(n, func) {
                            var result;
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return n = toInteger(n),
                                function() {
                                    return --n > 0 && (result = func.apply(this, arguments)), n <= 1 && (func = undefined), result
                                }
                        }

                        function curry(func, arity, guard) {
                            arity = guard ? undefined : arity;
                            var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                            return result.placeholder = curry.placeholder, result
                        }

                        function curryRight(func, arity, guard) {
                            arity = guard ? undefined : arity;
                            var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                            return result.placeholder = curryRight.placeholder, result
                        }

                        function debounce(func, wait, options) {
                            function invokeFunc(time) {
                                var args = lastArgs,
                                    thisArg = lastThis;
                                return lastArgs = lastThis = undefined, lastInvokeTime = time, result = func.apply(thisArg, args)
                            }

                            function leadingEdge(time) {
                                return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result
                            }

                            function remainingWait(time) {
                                var timeSinceLastCall = time - lastCallTime,
                                    timeSinceLastInvoke = time - lastInvokeTime,
                                    result = wait - timeSinceLastCall;
                                return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result
                            }

                            function shouldInvoke(time) {
                                var timeSinceLastCall = time - lastCallTime,
                                    timeSinceLastInvoke = time - lastInvokeTime;
                                return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait
                            }

                            function timerExpired() {
                                var time = now();
                                return shouldInvoke(time) ? trailingEdge(time) : void(timerId = setTimeout(timerExpired, remainingWait(time)))
                            }

                            function trailingEdge(time) {
                                return timerId = undefined, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = undefined, result)
                            }

                            function cancel() {
                                timerId !== undefined && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = undefined
                            }

                            function flush() {
                                return timerId === undefined ? result : trailingEdge(now())
                            }

                            function debounced() {
                                var time = now(),
                                    isInvoking = shouldInvoke(time);
                                if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
                                    if (timerId === undefined) return leadingEdge(lastCallTime);
                                    if (maxing) return timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime)
                                }
                                return timerId === undefined && (timerId = setTimeout(timerExpired, wait)), result
                            }
                            var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0,
                                leading = !1,
                                maxing = !1,
                                trailing = !0;
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, maxing = "maxWait" in options, maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = cancel, debounced.flush = flush, debounced
                        }

                        function flip(func) {
                            return createWrap(func, WRAP_FLIP_FLAG)
                        }

                        function memoize(func, resolver) {
                            if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError(FUNC_ERROR_TEXT);
                            var memoized = function() {
                                var args = arguments,
                                    key = resolver ? resolver.apply(this, args) : args[0],
                                    cache = memoized.cache;
                                if (cache.has(key)) return cache.get(key);
                                var result = func.apply(this, args);
                                return memoized.cache = cache.set(key, result) || cache, result
                            };
                            return memoized.cache = new(memoize.Cache || MapCache), memoized
                        }

                        function negate(predicate) {
                            if ("function" != typeof predicate) throw new TypeError(FUNC_ERROR_TEXT);
                            return function() {
                                var args = arguments;
                                switch (args.length) {
                                    case 0:
                                        return !predicate.call(this);
                                    case 1:
                                        return !predicate.call(this, args[0]);
                                    case 2:
                                        return !predicate.call(this, args[0], args[1]);
                                    case 3:
                                        return !predicate.call(this, args[0], args[1], args[2])
                                }
                                return !predicate.apply(this, args)
                            }
                        }

                        function once(func) {
                            return before(2, func)
                        }

                        function rest(func, start) {
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return start = start === undefined ? start : toInteger(start), baseRest(func, start)
                        }

                        function spread(func, start) {
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return start = start === undefined ? 0 : nativeMax(toInteger(start), 0), baseRest(function(args) {
                                var array = args[start],
                                    otherArgs = castSlice(args, 0, start);
                                return array && arrayPush(otherArgs, array), apply(func, this, otherArgs)
                            })
                        }

                        function throttle(func, wait, options) {
                            var leading = !0,
                                trailing = !0;
                            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                            return isObject(options) && (leading = "leading" in options ? !!options.leading : leading, trailing = "trailing" in options ? !!options.trailing : trailing), debounce(func, wait, {
                                leading: leading,
                                maxWait: wait,
                                trailing: trailing
                            })
                        }

                        function unary(func) {
                            return ary(func, 1)
                        }

                        function wrap(value, wrapper) {
                            return partial(castFunction(wrapper), value)
                        }

                        function castArray() {
                            if (!arguments.length) return [];
                            var value = arguments[0];
                            return isArray(value) ? value : [value]
                        }

                        function clone(value) {
                            return baseClone(value, CLONE_SYMBOLS_FLAG)
                        }

                        function cloneWith(value, customizer) {
                            return customizer = "function" == typeof customizer ? customizer : undefined, baseClone(value, CLONE_SYMBOLS_FLAG, customizer)
                        }

                        function cloneDeep(value) {
                            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
                        }

                        function cloneDeepWith(value, customizer) {
                            return customizer = "function" == typeof customizer ? customizer : undefined, baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer)
                        }

                        function conformsTo(object, source) {
                            return null == source || baseConformsTo(object, source, keys(source))
                        }

                        function eq(value, other) {
                            return value === other || value !== value && other !== other
                        }

                        function isArrayLike(value) {
                            return null != value && isLength(value.length) && !isFunction(value)
                        }

                        function isArrayLikeObject(value) {
                            return isObjectLike(value) && isArrayLike(value)
                        }

                        function isBoolean(value) {
                            return value === !0 || value === !1 || isObjectLike(value) && baseGetTag(value) == boolTag
                        }

                        function isElement(value) {
                            return isObjectLike(value) && 1 === value.nodeType && !isPlainObject(value)
                        }

                        function isEmpty(value) {
                            if (null == value) return !0;
                            if (isArrayLike(value) && (isArray(value) || "string" == typeof value || "function" == typeof value.splice || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
                            var tag = getTag(value);
                            if (tag == mapTag || tag == setTag) return !value.size;
                            if (isPrototype(value)) return !baseKeys(value).length;
                            for (var key in value)
                                if (hasOwnProperty.call(value, key)) return !1;
                            return !0
                        }

                        function isEqual(value, other) {
                            return baseIsEqual(value, other)
                        }

                        function isEqualWith(value, other, customizer) {
                            customizer = "function" == typeof customizer ? customizer : undefined;
                            var result = customizer ? customizer(value, other) : undefined;
                            return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result
                        }

                        function isError(value) {
                            if (!isObjectLike(value)) return !1;
                            var tag = baseGetTag(value);
                            return tag == errorTag || tag == domExcTag || "string" == typeof value.message && "string" == typeof value.name && !isPlainObject(value)
                        }

                        function isFinite(value) {
                            return "number" == typeof value && nativeIsFinite(value)
                        }

                        function isFunction(value) {
                            if (!isObject(value)) return !1;
                            var tag = baseGetTag(value);
                            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
                        }

                        function isInteger(value) {
                            return "number" == typeof value && value == toInteger(value)
                        }

                        function isLength(value) {
                            return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
                        }

                        function isObject(value) {
                            var type = typeof value;
                            return null != value && ("object" == type || "function" == type)
                        }

                        function isObjectLike(value) {
                            return null != value && "object" == typeof value
                        }

                        function isMatch(object, source) {
                            return object === source || baseIsMatch(object, source, getMatchData(source))
                        }

                        function isMatchWith(object, source, customizer) {
                            return customizer = "function" == typeof customizer ? customizer : undefined, baseIsMatch(object, source, getMatchData(source), customizer)
                        }

                        function isNaN(value) {
                            return isNumber(value) && value != +value
                        }

                        function isNative(value) {
                            if (isMaskable(value)) throw new Error(CORE_ERROR_TEXT);
                            return baseIsNative(value)
                        }

                        function isNull(value) {
                            return null === value
                        }

                        function isNil(value) {
                            return null == value
                        }

                        function isNumber(value) {
                            return "number" == typeof value || isObjectLike(value) && baseGetTag(value) == numberTag
                        }

                        function isPlainObject(value) {
                            if (!isObjectLike(value) || baseGetTag(value) != objectTag) return !1;
                            var proto = getPrototype(value);
                            if (null === proto) return !0;
                            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
                            return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString
                        }

                        function isSafeInteger(value) {
                            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER
                        }

                        function isString(value) {
                            return "string" == typeof value || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag
                        }

                        function isSymbol(value) {
                            return "symbol" == typeof value || isObjectLike(value) && baseGetTag(value) == symbolTag
                        }

                        function isUndefined(value) {
                            return value === undefined
                        }

                        function isWeakMap(value) {
                            return isObjectLike(value) && getTag(value) == weakMapTag
                        }

                        function isWeakSet(value) {
                            return isObjectLike(value) && baseGetTag(value) == weakSetTag
                        }

                        function toArray(value) {
                            if (!value) return [];
                            if (isArrayLike(value)) return isString(value) ? stringToArray(value) : copyArray(value);
                            if (symIterator && value[symIterator]) return iteratorToArray(value[symIterator]());
                            var tag = getTag(value),
                                func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
                            return func(value)
                        }

                        function toFinite(value) {
                            if (!value) return 0 === value ? value : 0;
                            if (value = toNumber(value), value === INFINITY || value === -INFINITY) {
                                var sign = value < 0 ? -1 : 1;
                                return sign * MAX_INTEGER
                            }
                            return value === value ? value : 0
                        }

                        function toInteger(value) {
                            var result = toFinite(value),
                                remainder = result % 1;
                            return result === result ? remainder ? result - remainder : result : 0
                        }

                        function toLength(value) {
                            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0
                        }

                        function toNumber(value) {
                            if ("number" == typeof value) return value;
                            if (isSymbol(value)) return NAN;
                            if (isObject(value)) {
                                var other = "function" == typeof value.valueOf ? value.valueOf() : value;
                                value = isObject(other) ? other + "" : other
                            }
                            if ("string" != typeof value) return 0 === value ? value : +value;
                            value = value.replace(reTrim, "");
                            var isBinary = reIsBinary.test(value);
                            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value
                        }

                        function toPlainObject(value) {
                            return copyObject(value, keysIn(value))
                        }

                        function toSafeInteger(value) {
                            return baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
                        }

                        function toString(value) {
                            return null == value ? "" : baseToString(value)
                        }

                        function create(prototype, properties) {
                            var result = baseCreate(prototype);
                            return null == properties ? result : baseAssign(result, properties)
                        }

                        function findKey(object, predicate) {
                            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn)
                        }

                        function findLastKey(object, predicate) {
                            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight)
                        }

                        function forIn(object, iteratee) {
                            return null == object ? object : baseFor(object, getIteratee(iteratee, 3), keysIn)
                        }

                        function forInRight(object, iteratee) {
                            return null == object ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn)
                        }

                        function forOwn(object, iteratee) {
                            return object && baseForOwn(object, getIteratee(iteratee, 3))
                        }

                        function forOwnRight(object, iteratee) {
                            return object && baseForOwnRight(object, getIteratee(iteratee, 3))
                        }

                        function functions(object) {
                            return null == object ? [] : baseFunctions(object, keys(object))
                        }

                        function functionsIn(object) {
                            return null == object ? [] : baseFunctions(object, keysIn(object))
                        }

                        function get(object, path, defaultValue) {
                            var result = null == object ? undefined : baseGet(object, path);
                            return result === undefined ? defaultValue : result
                        }

                        function has(object, path) {
                            return null != object && hasPath(object, path, baseHas)
                        }

                        function hasIn(object, path) {
                            return null != object && hasPath(object, path, baseHasIn)
                        }

                        function keys(object) {
                            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
                        }

                        function keysIn(object) {
                            return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object)
                        }

                        function mapKeys(object, iteratee) {
                            var result = {};
                            return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
                                baseAssignValue(result, iteratee(value, key, object), value)
                            }), result
                        }

                        function mapValues(object, iteratee) {
                            var result = {};
                            return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
                                baseAssignValue(result, key, iteratee(value, key, object))
                            }), result
                        }

                        function omitBy(object, predicate) {
                            return pickBy(object, negate(getIteratee(predicate)))
                        }

                        function pickBy(object, predicate) {
                            if (null == object) return {};
                            var props = arrayMap(getAllKeysIn(object), function(prop) {
                                return [prop]
                            });
                            return predicate = getIteratee(predicate), basePickBy(object, props, function(value, path) {
                                return predicate(value, path[0])
                            })
                        }

                        function result(object, path, defaultValue) {
                            path = castPath(path, object);
                            var index = -1,
                                length = path.length;
                            for (length || (length = 1, object = undefined); ++index < length;) {
                                var value = null == object ? undefined : object[toKey(path[index])];
                                value === undefined && (index = length, value = defaultValue), object = isFunction(value) ? value.call(object) : value
                            }
                            return object
                        }

                        function set(object, path, value) {
                            return null == object ? object : baseSet(object, path, value)
                        }

                        function setWith(object, path, value, customizer) {
                            return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseSet(object, path, value, customizer)
                        }

                        function transform(object, iteratee, accumulator) {
                            var isArr = isArray(object),
                                isArrLike = isArr || isBuffer(object) || isTypedArray(object);
                            if (iteratee = getIteratee(iteratee, 4), null == accumulator) {
                                var Ctor = object && object.constructor;
                                accumulator = isArrLike ? isArr ? new Ctor : [] : isObject(object) && isFunction(Ctor) ? baseCreate(getPrototype(object)) : {}
                            }
                            return (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
                                return iteratee(accumulator, value, index, object)
                            }), accumulator
                        }

                        function unset(object, path) {
                            return null == object || baseUnset(object, path)
                        }

                        function update(object, path, updater) {
                            return null == object ? object : baseUpdate(object, path, castFunction(updater))
                        }

                        function updateWith(object, path, updater, customizer) {
                            return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseUpdate(object, path, castFunction(updater), customizer)
                        }

                        function values(object) {
                            return null == object ? [] : baseValues(object, keys(object))
                        }

                        function valuesIn(object) {
                            return null == object ? [] : baseValues(object, keysIn(object))
                        }

                        function clamp(number, lower, upper) {
                            return upper === undefined && (upper = lower, lower = undefined), upper !== undefined && (upper = toNumber(upper), upper = upper === upper ? upper : 0), lower !== undefined && (lower = toNumber(lower), lower = lower === lower ? lower : 0), baseClamp(toNumber(number), lower, upper)
                        }

                        function inRange(number, start, end) {
                            return start = toFinite(start), end === undefined ? (end = start, start = 0) : end = toFinite(end), number = toNumber(number), baseInRange(number, start, end)
                        }

                        function random(lower, upper, floating) {
                            if (floating && "boolean" != typeof floating && isIterateeCall(lower, upper, floating) && (upper = floating = undefined), floating === undefined && ("boolean" == typeof upper ? (floating = upper, upper = undefined) : "boolean" == typeof lower && (floating = lower, lower = undefined)), lower === undefined && upper === undefined ? (lower = 0, upper = 1) : (lower = toFinite(lower), upper === undefined ? (upper = lower, lower = 0) : upper = toFinite(upper)), lower > upper) {
                                var temp = lower;
                                lower = upper, upper = temp
                            }
                            if (floating || lower % 1 || upper % 1) {
                                var rand = nativeRandom();
                                return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper)
                            }
                            return baseRandom(lower, upper)
                        }

                        function capitalize(string) {
                            return upperFirst(toString(string).toLowerCase())
                        }

                        function deburr(string) {
                            return string = toString(string), string && string.replace(reLatin, deburrLetter).replace(reComboMark, "")
                        }

                        function endsWith(string, target, position) {
                            string = toString(string), target = baseToString(target);
                            var length = string.length;
                            position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
                            var end = position;
                            return position -= target.length, position >= 0 && string.slice(position, end) == target
                        }

                        function escape(string) {
                            return string = toString(string), string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string
                        }

                        function escapeRegExp(string) {
                            return string = toString(string), string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string
                        }

                        function pad(string, length, chars) {
                            string = toString(string), length = toInteger(length);
                            var strLength = length ? stringSize(string) : 0;
                            if (!length || strLength >= length) return string;
                            var mid = (length - strLength) / 2;
                            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars)
                        }

                        function padEnd(string, length, chars) {
                            string = toString(string), length = toInteger(length);
                            var strLength = length ? stringSize(string) : 0;
                            return length && strLength < length ? string + createPadding(length - strLength, chars) : string
                        }

                        function padStart(string, length, chars) {
                            string = toString(string), length = toInteger(length);
                            var strLength = length ? stringSize(string) : 0;
                            return length && strLength < length ? createPadding(length - strLength, chars) + string : string
                        }

                        function parseInt(string, radix, guard) {
                            return guard || null == radix ? radix = 0 : radix && (radix = +radix), nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0)
                        }

                        function repeat(string, n, guard) {
                            return n = (guard ? isIterateeCall(string, n, guard) : n === undefined) ? 1 : toInteger(n), baseRepeat(toString(string), n)
                        }

                        function replace() {
                            var args = arguments,
                                string = toString(args[0]);
                            return args.length < 3 ? string : string.replace(args[1], args[2])
                        }

                        function split(string, separator, limit) {
                            return limit && "number" != typeof limit && isIterateeCall(string, separator, limit) && (separator = limit = undefined), (limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0) ? (string = toString(string), string && ("string" == typeof separator || null != separator && !isRegExp(separator)) && (separator = baseToString(separator), !separator && hasUnicode(string)) ? castSlice(stringToArray(string), 0, limit) : string.split(separator, limit)) : []
                        }

                        function startsWith(string, target, position) {
                            return string = toString(string), position = baseClamp(toInteger(position), 0, string.length), target = baseToString(target), string.slice(position, position + target.length) == target
                        }

                        function template(string, options, guard) {
                            var settings = lodash.templateSettings;
                            guard && isIterateeCall(string, options, guard) && (options = undefined), string = toString(string), options = assignInWith({}, options, settings, assignInDefaults);
                            var isEscaping, isEvaluating, imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
                                importsKeys = keys(imports),
                                importsValues = baseValues(imports, importsKeys),
                                index = 0,
                                interpolate = options.interpolate || reNoMatch,
                                source = "__p += '",
                                reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g"),
                                sourceURL = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
                            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                                return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), escapeValue && (isEscaping = !0, source += "' +\n__e(" + escapeValue + ") +\n'"), evaluateValue && (isEvaluating = !0, source += "';\n" + evaluateValue + ";\n__p += '"), interpolateValue && (source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"), index = offset + match.length, match
                            }), source += "';\n";
                            var variable = options.variable;
                            variable || (source = "with (obj) {\n" + source + "\n}\n"), source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
                            var result = attempt(function() {
                                return Function(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues)
                            });
                            if (result.source = source, isError(result)) throw result;
                            return result
                        }

                        function toLower(value) {
                            return toString(value).toLowerCase()
                        }

                        function toUpper(value) {
                            return toString(value).toUpperCase()
                        }

                        function trim(string, chars, guard) {
                            if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrim, "");
                            if (!string || !(chars = baseToString(chars))) return string;
                            var strSymbols = stringToArray(string),
                                chrSymbols = stringToArray(chars),
                                start = charsStartIndex(strSymbols, chrSymbols),
                                end = charsEndIndex(strSymbols, chrSymbols) + 1;
                            return castSlice(strSymbols, start, end).join("")
                        }

                        function trimEnd(string, chars, guard) {
                            if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrimEnd, "");
                            if (!string || !(chars = baseToString(chars))) return string;
                            var strSymbols = stringToArray(string),
                                end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
                            return castSlice(strSymbols, 0, end).join("")
                        }

                        function trimStart(string, chars, guard) {
                            if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrimStart, "");
                            if (!string || !(chars = baseToString(chars))) return string;
                            var strSymbols = stringToArray(string),
                                start = charsStartIndex(strSymbols, stringToArray(chars));
                            return castSlice(strSymbols, start).join("")
                        }

                        function truncate(string, options) {
                            var length = DEFAULT_TRUNC_LENGTH,
                                omission = DEFAULT_TRUNC_OMISSION;
                            if (isObject(options)) {
                                var separator = "separator" in options ? options.separator : separator;
                                length = "length" in options ? toInteger(options.length) : length, omission = "omission" in options ? baseToString(options.omission) : omission
                            }
                            string = toString(string);
                            var strLength = string.length;
                            if (hasUnicode(string)) {
                                var strSymbols = stringToArray(string);
                                strLength = strSymbols.length
                            }
                            if (length >= strLength) return string;
                            var end = length - stringSize(omission);
                            if (end < 1) return omission;
                            var result = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
                            if (separator === undefined) return result + omission;
                            if (strSymbols && (end += result.length - end), isRegExp(separator)) {
                                if (string.slice(end).search(separator)) {
                                    var match, substring = result;
                                    for (separator.global || (separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g")), separator.lastIndex = 0; match = separator.exec(substring);) var newEnd = match.index;
                                    result = result.slice(0, newEnd === undefined ? end : newEnd)
                                }
                            } else if (string.indexOf(baseToString(separator), end) != end) {
                                var index = result.lastIndexOf(separator);
                                index > -1 && (result = result.slice(0, index))
                            }
                            return result + omission
                        }

                        function unescape(string) {
                            return string = toString(string), string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string
                        }

                        function words(string, pattern, guard) {
                            return string = toString(string), pattern = guard ? undefined : pattern, pattern === undefined ? hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string) : string.match(pattern) || []
                        }

                        function cond(pairs) {
                            var length = null == pairs ? 0 : pairs.length,
                                toIteratee = getIteratee();
                            return pairs = length ? arrayMap(pairs, function(pair) {
                                if ("function" != typeof pair[1]) throw new TypeError(FUNC_ERROR_TEXT);
                                return [toIteratee(pair[0]), pair[1]]
                            }) : [], baseRest(function(args) {
                                for (var index = -1; ++index < length;) {
                                    var pair = pairs[index];
                                    if (apply(pair[0], this, args)) return apply(pair[1], this, args)
                                }
                            })
                        }

                        function conforms(source) {
                            return baseConforms(baseClone(source, CLONE_DEEP_FLAG))
                        }

                        function constant(value) {
                            return function() {
                                return value
                            }
                        }

                        function defaultTo(value, defaultValue) {
                            return null == value || value !== value ? defaultValue : value
                        }

                        function identity(value) {
                            return value
                        }

                        function iteratee(func) {
                            return baseIteratee("function" == typeof func ? func : baseClone(func, CLONE_DEEP_FLAG))
                        }

                        function matches(source) {
                            return baseMatches(baseClone(source, CLONE_DEEP_FLAG))
                        }

                        function matchesProperty(path, srcValue) {
                            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG))
                        }

                        function mixin(object, source, options) {
                            var props = keys(source),
                                methodNames = baseFunctions(source, props);
                            null != options || isObject(source) && (methodNames.length || !props.length) || (options = source, source = object, object = this, methodNames = baseFunctions(source, keys(source)));
                            var chain = !(isObject(options) && "chain" in options && !options.chain),
                                isFunc = isFunction(object);
                            return arrayEach(methodNames, function(methodName) {
                                var func = source[methodName];
                                object[methodName] = func, isFunc && (object.prototype[methodName] = function() {
                                    var chainAll = this.__chain__;
                                    if (chain || chainAll) {
                                        var result = object(this.__wrapped__),
                                            actions = result.__actions__ = copyArray(this.__actions__);
                                        return actions.push({
                                            func: func,
                                            args: arguments,
                                            thisArg: object
                                        }), result.__chain__ = chainAll, result
                                    }
                                    return func.apply(object, arrayPush([this.value()], arguments))
                                })
                            }), object
                        }

                        function noConflict() {
                            return root._ === this && (root._ = oldDash), this
                        }

                        function noop() {}

                        function nthArg(n) {
                            return n = toInteger(n), baseRest(function(args) {
                                return baseNth(args, n)
                            })
                        }

                        function property(path) {
                            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path)
                        }

                        function propertyOf(object) {
                            return function(path) {
                                return null == object ? undefined : baseGet(object, path)
                            }
                        }

                        function stubArray() {
                            return []
                        }

                        function stubFalse() {
                            return !1
                        }

                        function stubObject() {
                            return {}
                        }

                        function stubString() {
                            return ""
                        }

                        function stubTrue() {
                            return !0
                        }

                        function times(n, iteratee) {
                            if (n = toInteger(n), n < 1 || n > MAX_SAFE_INTEGER) return [];
                            var index = MAX_ARRAY_LENGTH,
                                length = nativeMin(n, MAX_ARRAY_LENGTH);
                            iteratee = getIteratee(iteratee), n -= MAX_ARRAY_LENGTH;
                            for (var result = baseTimes(length, iteratee); ++index < n;) iteratee(index);
                            return result
                        }

                        function toPath(value) {
                            return isArray(value) ? arrayMap(value, toKey) : isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)))
                        }

                        function uniqueId(prefix) {
                            var id = ++idCounter;
                            return toString(prefix) + id
                        }

                        function max(array) {
                            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined
                        }

                        function maxBy(array, iteratee) {
                            return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined
                        }

                        function mean(array) {
                            return baseMean(array, identity)
                        }

                        function meanBy(array, iteratee) {
                            return baseMean(array, getIteratee(iteratee, 2))
                        }

                        function min(array) {
                            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined
                        }

                        function minBy(array, iteratee) {
                            return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined
                        }

                        function sum(array) {
                            return array && array.length ? baseSum(array, identity) : 0
                        }

                        function sumBy(array, iteratee) {
                            return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0
                        }
                        context = null == context ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
                        var Array = context.Array,
                            Date = context.Date,
                            Error = context.Error,
                            Function = context.Function,
                            Math = context.Math,
                            Object = context.Object,
                            RegExp = context.RegExp,
                            String = context.String,
                            TypeError = context.TypeError,
                            arrayProto = Array.prototype,
                            funcProto = Function.prototype,
                            objectProto = Object.prototype,
                            coreJsData = context["__core-js_shared__"],
                            funcToString = funcProto.toString,
                            hasOwnProperty = objectProto.hasOwnProperty,
                            idCounter = 0,
                            maskSrcKey = function() {
                                var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                                return uid ? "Symbol(src)_1." + uid : ""
                            }(),
                            nativeObjectToString = objectProto.toString,
                            objectCtorString = funcToString.call(Object),
                            oldDash = root._,
                            reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                            Buffer = moduleExports ? context.Buffer : undefined,
                            Symbol = context.Symbol,
                            Uint8Array = context.Uint8Array,
                            allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
                            getPrototype = overArg(Object.getPrototypeOf, Object),
                            objectCreate = Object.create,
                            propertyIsEnumerable = objectProto.propertyIsEnumerable,
                            splice = arrayProto.splice,
                            spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
                            symIterator = Symbol ? Symbol.iterator : undefined,
                            symToStringTag = Symbol ? Symbol.toStringTag : undefined,
                            defineProperty = function() {
                                try {
                                    var func = getNative(Object, "defineProperty");
                                    return func({}, "", {}), func
                                } catch (e) {}
                            }(),
                            ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
                            ctxNow = Date && Date.now !== root.Date.now && Date.now,
                            ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout,
                            nativeCeil = Math.ceil,
                            nativeFloor = Math.floor,
                            nativeGetSymbols = Object.getOwnPropertySymbols,
                            nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
                            nativeIsFinite = context.isFinite,
                            nativeJoin = arrayProto.join,
                            nativeKeys = overArg(Object.keys, Object),
                            nativeMax = Math.max,
                            nativeMin = Math.min,
                            nativeNow = Date.now,
                            nativeParseInt = context.parseInt,
                            nativeRandom = Math.random,
                            nativeReverse = arrayProto.reverse,
                            DataView = getNative(context, "DataView"),
                            Map = getNative(context, "Map"),
                            Promise = getNative(context, "Promise"),
                            Set = getNative(context, "Set"),
                            WeakMap = getNative(context, "WeakMap"),
                            nativeCreate = getNative(Object, "create"),
                            metaMap = WeakMap && new WeakMap,
                            realNames = {},
                            dataViewCtorString = toSource(DataView),
                            mapCtorString = toSource(Map),
                            promiseCtorString = toSource(Promise),
                            setCtorString = toSource(Set),
                            weakMapCtorString = toSource(WeakMap),
                            symbolProto = Symbol ? Symbol.prototype : undefined,
                            symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
                            symbolToString = symbolProto ? symbolProto.toString : undefined,
                            baseCreate = function() {
                                function object() {}
                                return function(proto) {
                                    if (!isObject(proto)) return {};
                                    if (objectCreate) return objectCreate(proto);
                                    object.prototype = proto;
                                    var result = new object;
                                    return object.prototype = undefined, result
                                }
                            }();
                        lodash.templateSettings = {
                            escape: reEscape,
                            evaluate: reEvaluate,
                            interpolate: reInterpolate,
                            variable: "",
                            imports: {
                                _: lodash
                            }
                        }, lodash.prototype = baseLodash.prototype, lodash.prototype.constructor = lodash, LodashWrapper.prototype = baseCreate(baseLodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = baseCreate(baseLodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, ListCache.prototype.set = listCacheSet, MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, SetCache.prototype.add = SetCache.prototype.push = setCacheAdd, SetCache.prototype.has = setCacheHas, Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, Stack.prototype.has = stackHas, Stack.prototype.set = stackSet;
                        var baseEach = createBaseEach(baseForOwn),
                            baseEachRight = createBaseEach(baseForOwnRight, !0),
                            baseFor = createBaseFor(),
                            baseForRight = createBaseFor(!0),
                            baseSetData = metaMap ? function(func, data) {
                                return metaMap.set(func, data), func
                            } : identity,
                            baseSetToString = defineProperty ? function(func, string) {
                                return defineProperty(func, "toString", {
                                    configurable: !0,
                                    enumerable: !1,
                                    value: constant(string),
                                    writable: !0
                                })
                            } : identity,
                            castRest = baseRest,
                            clearTimeout = ctxClearTimeout || function(id) {
                                return root.clearTimeout(id)
                            },
                            createSet = Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY ? function(values) {
                                return new Set(values)
                            } : noop,
                            getData = metaMap ? function(func) {
                                return metaMap.get(func)
                            } : noop,
                            getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray,
                            getSymbolsIn = nativeGetSymbols ? function(object) {
                                for (var result = []; object;) arrayPush(result, getSymbols(object)), object = getPrototype(object);
                                return result
                            } : stubArray,
                            getTag = baseGetTag;
                        (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) && (getTag = function(value) {
                            var result = baseGetTag(value),
                                Ctor = result == objectTag ? value.constructor : undefined,
                                ctorString = Ctor ? toSource(Ctor) : "";
                            if (ctorString) switch (ctorString) {
                                case dataViewCtorString:
                                    return dataViewTag;
                                case mapCtorString:
                                    return mapTag;
                                case promiseCtorString:
                                    return promiseTag;
                                case setCtorString:
                                    return setTag;
                                case weakMapCtorString:
                                    return weakMapTag
                            }
                            return result
                        });
                        var isMaskable = coreJsData ? isFunction : stubFalse,
                            setData = shortOut(baseSetData),
                            setTimeout = ctxSetTimeout || function(func, wait) {
                                return root.setTimeout(func, wait)
                            },
                            setToString = shortOut(baseSetToString),
                            stringToPath = memoizeCapped(function(string) {
                                var result = [];
                                return reLeadingDot.test(string) && result.push(""), string.replace(rePropName, function(match, number, quote, string) {
                                    result.push(quote ? string.replace(reEscapeChar, "$1") : number || match)
                                }), result
                            }),
                            difference = baseRest(function(array, values) {
                                return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0)) : []
                            }),
                            differenceBy = baseRest(function(array, values) {
                                var iteratee = last(values);
                                return isArrayLikeObject(iteratee) && (iteratee = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0), getIteratee(iteratee, 2)) : []
                            }),
                            differenceWith = baseRest(function(array, values) {
                                var comparator = last(values);
                                return isArrayLikeObject(comparator) && (comparator = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0), undefined, comparator) : []
                            }),
                            intersection = baseRest(function(arrays) {
                                var mapped = arrayMap(arrays, castArrayLikeObject);
                                return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : []
                            }),
                            intersectionBy = baseRest(function(arrays) {
                                var iteratee = last(arrays),
                                    mapped = arrayMap(arrays, castArrayLikeObject);
                                return iteratee === last(mapped) ? iteratee = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : []
                            }),
                            intersectionWith = baseRest(function(arrays) {
                                var comparator = last(arrays),
                                    mapped = arrayMap(arrays, castArrayLikeObject);
                                return comparator = "function" == typeof comparator ? comparator : undefined, comparator && mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : []
                            }),
                            pull = baseRest(pullAll),
                            pullAt = flatRest(function(array, indexes) {
                                var length = null == array ? 0 : array.length,
                                    result = baseAt(array, indexes);
                                return basePullAt(array, arrayMap(indexes, function(index) {
                                    return isIndex(index, length) ? +index : index
                                }).sort(compareAscending)), result
                            }),
                            union = baseRest(function(arrays) {
                                return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0))
                            }),
                            unionBy = baseRest(function(arrays) {
                                var iteratee = last(arrays);
                                return isArrayLikeObject(iteratee) && (iteratee = undefined), baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0), getIteratee(iteratee, 2))
                            }),
                            unionWith = baseRest(function(arrays) {
                                var comparator = last(arrays);
                                return comparator = "function" == typeof comparator ? comparator : undefined, baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0), undefined, comparator)
                            }),
                            without = baseRest(function(array, values) {
                                return isArrayLikeObject(array) ? baseDifference(array, values) : []
                            }),
                            xor = baseRest(function(arrays) {
                                return baseXor(arrayFilter(arrays, isArrayLikeObject))
                            }),
                            xorBy = baseRest(function(arrays) {
                                var iteratee = last(arrays);
                                return isArrayLikeObject(iteratee) && (iteratee = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2))
                            }),
                            xorWith = baseRest(function(arrays) {
                                var comparator = last(arrays);
                                return comparator = "function" == typeof comparator ? comparator : undefined, baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator)
                            }),
                            zip = baseRest(unzip),
                            zipWith = baseRest(function(arrays) {
                                var length = arrays.length,
                                    iteratee = length > 1 ? arrays[length - 1] : undefined;
                                return iteratee = "function" == typeof iteratee ? (arrays.pop(), iteratee) : undefined, unzipWith(arrays, iteratee)
                            }),
                            wrapperAt = flatRest(function(paths) {
                                var length = paths.length,
                                    start = length ? paths[0] : 0,
                                    value = this.__wrapped__,
                                    interceptor = function(object) {
                                        return baseAt(object, paths)
                                    };
                                return !(length > 1 || this.__actions__.length) && value instanceof LazyWrapper && isIndex(start) ? (value = value.slice(start, +start + (length ? 1 : 0)), value.__actions__.push({
                                    func: thru,
                                    args: [interceptor],
                                    thisArg: undefined
                                }), new LodashWrapper(value, this.__chain__).thru(function(array) {
                                    return length && !array.length && array.push(undefined), array
                                })) : this.thru(interceptor)
                            }),
                            countBy = createAggregator(function(result, value, key) {
                                hasOwnProperty.call(result, key) ? ++result[key] : baseAssignValue(result, key, 1)
                            }),
                            find = createFind(findIndex),
                            findLast = createFind(findLastIndex),
                            groupBy = createAggregator(function(result, value, key) {
                                hasOwnProperty.call(result, key) ? result[key].push(value) : baseAssignValue(result, key, [value])
                            }),
                            invokeMap = baseRest(function(collection, path, args) {
                                var index = -1,
                                    isFunc = "function" == typeof path,
                                    result = isArrayLike(collection) ? Array(collection.length) : [];
                                return baseEach(collection, function(value) {
                                    result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args)
                                }), result
                            }),
                            keyBy = createAggregator(function(result, value, key) {
                                baseAssignValue(result, key, value)
                            }),
                            partition = createAggregator(function(result, value, key) {
                                result[key ? 0 : 1].push(value)
                            }, function() {
                                return [
                                    [],
                                    []
                                ]
                            }),
                            sortBy = baseRest(function(collection, iteratees) {
                                if (null == collection) return [];
                                var length = iteratees.length;
                                return length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1]) ? iteratees = [] : length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2]) && (iteratees = [iteratees[0]]), baseOrderBy(collection, baseFlatten(iteratees, 1), [])
                            }),
                            now = ctxNow || function() {
                                return root.Date.now()
                            },
                            bind = baseRest(function(func, thisArg, partials) {
                                var bitmask = WRAP_BIND_FLAG;
                                if (partials.length) {
                                    var holders = replaceHolders(partials, getHolder(bind));
                                    bitmask |= WRAP_PARTIAL_FLAG
                                }
                                return createWrap(func, bitmask, thisArg, partials, holders)
                            }),
                            bindKey = baseRest(function(object, key, partials) {
                                var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
                                if (partials.length) {
                                    var holders = replaceHolders(partials, getHolder(bindKey));
                                    bitmask |= WRAP_PARTIAL_FLAG
                                }
                                return createWrap(key, bitmask, object, partials, holders)
                            }),
                            defer = baseRest(function(func, args) {
                                return baseDelay(func, 1, args)
                            }),
                            delay = baseRest(function(func, wait, args) {
                                return baseDelay(func, toNumber(wait) || 0, args)
                            });
                        memoize.Cache = MapCache;
                        var overArgs = castRest(function(func, transforms) {
                                transforms = 1 == transforms.length && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
                                var funcsLength = transforms.length;
                                return baseRest(function(args) {
                                    for (var index = -1, length = nativeMin(args.length, funcsLength); ++index < length;) args[index] = transforms[index].call(this, args[index]);
                                    return apply(func, this, args)
                                })
                            }),
                            partial = baseRest(function(func, partials) {
                                var holders = replaceHolders(partials, getHolder(partial));
                                return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders)
                            }),
                            partialRight = baseRest(function(func, partials) {
                                var holders = replaceHolders(partials, getHolder(partialRight));
                                return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders)
                            }),
                            rearg = flatRest(function(func, indexes) {
                                return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes)
                            }),
                            gt = createRelationalOperation(baseGt),
                            gte = createRelationalOperation(function(value, other) {
                                return value >= other
                            }),
                            isArguments = baseIsArguments(function() {
                                return arguments
                            }()) ? baseIsArguments : function(value) {
                                return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee")
                            },
                            isArray = Array.isArray,
                            isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer,
                            isBuffer = nativeIsBuffer || stubFalse,
                            isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate,
                            isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap,
                            isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp,
                            isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet,
                            isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray,
                            lt = createRelationalOperation(baseLt),
                            lte = createRelationalOperation(function(value, other) {
                                return value <= other
                            }),
                            assign = createAssigner(function(object, source) {
                                if (isPrototype(source) || isArrayLike(source)) return void copyObject(source, keys(source), object);
                                for (var key in source) hasOwnProperty.call(source, key) && assignValue(object, key, source[key])
                            }),
                            assignIn = createAssigner(function(object, source) {
                                copyObject(source, keysIn(source), object)
                            }),
                            assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
                                copyObject(source, keysIn(source), object, customizer)
                            }),
                            assignWith = createAssigner(function(object, source, srcIndex, customizer) {
                                copyObject(source, keys(source), object, customizer)
                            }),
                            at = flatRest(baseAt),
                            defaults = baseRest(function(args) {
                                return args.push(undefined, assignInDefaults), apply(assignInWith, undefined, args)
                            }),
                            defaultsDeep = baseRest(function(args) {
                                return args.push(undefined, mergeDefaults), apply(mergeWith, undefined, args)
                            }),
                            invert = createInverter(function(result, value, key) {
                                result[value] = key
                            }, constant(identity)),
                            invertBy = createInverter(function(result, value, key) {
                                hasOwnProperty.call(result, value) ? result[value].push(key) : result[value] = [key]
                            }, getIteratee),
                            invoke = baseRest(baseInvoke),
                            merge = createAssigner(function(object, source, srcIndex) {
                                baseMerge(object, source, srcIndex)
                            }),
                            mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
                                baseMerge(object, source, srcIndex, customizer)
                            }),
                            omit = flatRest(function(object, paths) {
                                var result = {};
                                if (null == object) return result;
                                var isDeep = !1;
                                paths = arrayMap(paths, function(path) {
                                    return path = castPath(path, object), isDeep || (isDeep = path.length > 1), path
                                }), copyObject(object, getAllKeysIn(object), result), isDeep && (result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG));
                                for (var length = paths.length; length--;) baseUnset(result, paths[length]);
                                return result
                            }),
                            pick = flatRest(function(object, paths) {
                                return null == object ? {} : basePick(object, paths)
                            }),
                            toPairs = createToPairs(keys),
                            toPairsIn = createToPairs(keysIn),
                            camelCase = createCompounder(function(result, word, index) {
                                return word = word.toLowerCase(), result + (index ? capitalize(word) : word)
                            }),
                            kebabCase = createCompounder(function(result, word, index) {
                                return result + (index ? "-" : "") + word.toLowerCase()
                            }),
                            lowerCase = createCompounder(function(result, word, index) {
                                return result + (index ? " " : "") + word.toLowerCase()
                            }),
                            lowerFirst = createCaseFirst("toLowerCase"),
                            snakeCase = createCompounder(function(result, word, index) {
                                return result + (index ? "_" : "") + word.toLowerCase()
                            }),
                            startCase = createCompounder(function(result, word, index) {
                                return result + (index ? " " : "") + upperFirst(word)
                            }),
                            upperCase = createCompounder(function(result, word, index) {
                                return result + (index ? " " : "") + word.toUpperCase()
                            }),
                            upperFirst = createCaseFirst("toUpperCase"),
                            attempt = baseRest(function(func, args) {
                                try {
                                    return apply(func, undefined, args)
                                } catch (e) {
                                    return isError(e) ? e : new Error(e)
                                }
                            }),
                            bindAll = flatRest(function(object, methodNames) {
                                return arrayEach(methodNames, function(key) {
                                    key = toKey(key), baseAssignValue(object, key, bind(object[key], object))
                                }), object
                            }),
                            flow = createFlow(),
                            flowRight = createFlow(!0),
                            method = baseRest(function(path, args) {
                                return function(object) {
                                    return baseInvoke(object, path, args)
                                }
                            }),
                            methodOf = baseRest(function(object, args) {
                                return function(path) {
                                    return baseInvoke(object, path, args)
                                }
                            }),
                            over = createOver(arrayMap),
                            overEvery = createOver(arrayEvery),
                            overSome = createOver(arraySome),
                            range = createRange(),
                            rangeRight = createRange(!0),
                            add = createMathOperation(function(augend, addend) {
                                return augend + addend
                            }, 0),
                            ceil = createRound("ceil"),
                            divide = createMathOperation(function(dividend, divisor) {
                                return dividend / divisor
                            }, 1),
                            floor = createRound("floor"),
                            multiply = createMathOperation(function(multiplier, multiplicand) {
                                return multiplier * multiplicand
                            }, 1),
                            round = createRound("round"),
                            subtract = createMathOperation(function(minuend, subtrahend) {
                                return minuend - subtrahend
                            }, 0);
                        return lodash.after = after, lodash.ary = ary, lodash.assign = assign, lodash.assignIn = assignIn, lodash.assignInWith = assignInWith, lodash.assignWith = assignWith, lodash.at = at, lodash.before = before, lodash.bind = bind, lodash.bindAll = bindAll, lodash.bindKey = bindKey, lodash.castArray = castArray, lodash.chain = chain, lodash.chunk = chunk, lodash.compact = compact, lodash.concat = concat, lodash.cond = cond, lodash.conforms = conforms, lodash.constant = constant, lodash.countBy = countBy, lodash.create = create, lodash.curry = curry, lodash.curryRight = curryRight, lodash.debounce = debounce, lodash.defaults = defaults, lodash.defaultsDeep = defaultsDeep, lodash.defer = defer, lodash.delay = delay, lodash.difference = difference, lodash.differenceBy = differenceBy, lodash.differenceWith = differenceWith, lodash.drop = drop, lodash.dropRight = dropRight, lodash.dropRightWhile = dropRightWhile, lodash.dropWhile = dropWhile, lodash.fill = fill, lodash.filter = filter, lodash.flatMap = flatMap, lodash.flatMapDeep = flatMapDeep, lodash.flatMapDepth = flatMapDepth, lodash.flatten = flatten, lodash.flattenDeep = flattenDeep, lodash.flattenDepth = flattenDepth, lodash.flip = flip, lodash.flow = flow, lodash.flowRight = flowRight, lodash.fromPairs = fromPairs, lodash.functions = functions, lodash.functionsIn = functionsIn, lodash.groupBy = groupBy, lodash.initial = initial, lodash.intersection = intersection, lodash.intersectionBy = intersectionBy, lodash.intersectionWith = intersectionWith, lodash.invert = invert, lodash.invertBy = invertBy, lodash.invokeMap = invokeMap, lodash.iteratee = iteratee, lodash.keyBy = keyBy, lodash.keys = keys, lodash.keysIn = keysIn, lodash.map = map, lodash.mapKeys = mapKeys, lodash.mapValues = mapValues, lodash.matches = matches, lodash.matchesProperty = matchesProperty, lodash.memoize = memoize, lodash.merge = merge, lodash.mergeWith = mergeWith, lodash.method = method, lodash.methodOf = methodOf, lodash.mixin = mixin, lodash.negate = negate, lodash.nthArg = nthArg, lodash.omit = omit, lodash.omitBy = omitBy, lodash.once = once, lodash.orderBy = orderBy, lodash.over = over, lodash.overArgs = overArgs, lodash.overEvery = overEvery, lodash.overSome = overSome, lodash.partial = partial, lodash.partialRight = partialRight, lodash.partition = partition, lodash.pick = pick, lodash.pickBy = pickBy, lodash.property = property, lodash.propertyOf = propertyOf, lodash.pull = pull, lodash.pullAll = pullAll, lodash.pullAllBy = pullAllBy, lodash.pullAllWith = pullAllWith, lodash.pullAt = pullAt, lodash.range = range, lodash.rangeRight = rangeRight, lodash.rearg = rearg, lodash.reject = reject, lodash.remove = remove, lodash.rest = rest, lodash.reverse = reverse, lodash.sampleSize = sampleSize, lodash.set = set, lodash.setWith = setWith, lodash.shuffle = shuffle, lodash.slice = slice, lodash.sortBy = sortBy, lodash.sortedUniq = sortedUniq, lodash.sortedUniqBy = sortedUniqBy, lodash.split = split, lodash.spread = spread, lodash.tail = tail, lodash.take = take, lodash.takeRight = takeRight, lodash.takeRightWhile = takeRightWhile, lodash.takeWhile = takeWhile, lodash.tap = tap, lodash.throttle = throttle, lodash.thru = thru, lodash.toArray = toArray, lodash.toPairs = toPairs, lodash.toPairsIn = toPairsIn, lodash.toPath = toPath, lodash.toPlainObject = toPlainObject, lodash.transform = transform, lodash.unary = unary, lodash.union = union, lodash.unionBy = unionBy, lodash.unionWith = unionWith, lodash.uniq = uniq, lodash.uniqBy = uniqBy, lodash.uniqWith = uniqWith, lodash.unset = unset, lodash.unzip = unzip, lodash.unzipWith = unzipWith, lodash.update = update, lodash.updateWith = updateWith, lodash.values = values, lodash.valuesIn = valuesIn, lodash.without = without, lodash.words = words, lodash.wrap = wrap, lodash.xor = xor, lodash.xorBy = xorBy, lodash.xorWith = xorWith, lodash.zip = zip, lodash.zipObject = zipObject, lodash.zipObjectDeep = zipObjectDeep, lodash.zipWith = zipWith, lodash.entries = toPairs, lodash.entriesIn = toPairsIn, lodash.extend = assignIn, lodash.extendWith = assignInWith, mixin(lodash, lodash), lodash.add = add, lodash.attempt = attempt, lodash.camelCase = camelCase, lodash.capitalize = capitalize, lodash.ceil = ceil, lodash.clamp = clamp, lodash.clone = clone, lodash.cloneDeep = cloneDeep, lodash.cloneDeepWith = cloneDeepWith, lodash.cloneWith = cloneWith, lodash.conformsTo = conformsTo, lodash.deburr = deburr, lodash.defaultTo = defaultTo, lodash.divide = divide, lodash.endsWith = endsWith, lodash.eq = eq, lodash.escape = escape, lodash.escapeRegExp = escapeRegExp, lodash.every = every, lodash.find = find, lodash.findIndex = findIndex, lodash.findKey = findKey, lodash.findLast = findLast, lodash.findLastIndex = findLastIndex, lodash.findLastKey = findLastKey, lodash.floor = floor, lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = forIn, lodash.forInRight = forInRight, lodash.forOwn = forOwn, lodash.forOwnRight = forOwnRight, lodash.get = get, lodash.gt = gt, lodash.gte = gte, lodash.has = has, lodash.hasIn = hasIn, lodash.head = head, lodash.identity = identity, lodash.includes = includes, lodash.indexOf = indexOf, lodash.inRange = inRange, lodash.invoke = invoke, lodash.isArguments = isArguments, lodash.isArray = isArray, lodash.isArrayBuffer = isArrayBuffer, lodash.isArrayLike = isArrayLike, lodash.isArrayLikeObject = isArrayLikeObject, lodash.isBoolean = isBoolean,
                            lodash.isBuffer = isBuffer, lodash.isDate = isDate, lodash.isElement = isElement, lodash.isEmpty = isEmpty, lodash.isEqual = isEqual, lodash.isEqualWith = isEqualWith, lodash.isError = isError, lodash.isFinite = isFinite, lodash.isFunction = isFunction, lodash.isInteger = isInteger, lodash.isLength = isLength, lodash.isMap = isMap, lodash.isMatch = isMatch, lodash.isMatchWith = isMatchWith, lodash.isNaN = isNaN, lodash.isNative = isNative, lodash.isNil = isNil, lodash.isNull = isNull, lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isObjectLike = isObjectLike, lodash.isPlainObject = isPlainObject, lodash.isRegExp = isRegExp, lodash.isSafeInteger = isSafeInteger, lodash.isSet = isSet, lodash.isString = isString, lodash.isSymbol = isSymbol, lodash.isTypedArray = isTypedArray, lodash.isUndefined = isUndefined, lodash.isWeakMap = isWeakMap, lodash.isWeakSet = isWeakSet, lodash.join = join, lodash.kebabCase = kebabCase, lodash.last = last, lodash.lastIndexOf = lastIndexOf, lodash.lowerCase = lowerCase, lodash.lowerFirst = lowerFirst, lodash.lt = lt, lodash.lte = lte, lodash.max = max, lodash.maxBy = maxBy, lodash.mean = mean, lodash.meanBy = meanBy, lodash.min = min, lodash.minBy = minBy, lodash.stubArray = stubArray, lodash.stubFalse = stubFalse, lodash.stubObject = stubObject, lodash.stubString = stubString, lodash.stubTrue = stubTrue, lodash.multiply = multiply, lodash.nth = nth, lodash.noConflict = noConflict, lodash.noop = noop, lodash.now = now, lodash.pad = pad, lodash.padEnd = padEnd, lodash.padStart = padStart, lodash.parseInt = parseInt, lodash.random = random, lodash.reduce = reduce, lodash.reduceRight = reduceRight, lodash.repeat = repeat, lodash.replace = replace, lodash.result = result, lodash.round = round, lodash.runInContext = runInContext, lodash.sample = sample, lodash.size = size, lodash.snakeCase = snakeCase, lodash.some = some, lodash.sortedIndex = sortedIndex, lodash.sortedIndexBy = sortedIndexBy, lodash.sortedIndexOf = sortedIndexOf, lodash.sortedLastIndex = sortedLastIndex, lodash.sortedLastIndexBy = sortedLastIndexBy, lodash.sortedLastIndexOf = sortedLastIndexOf, lodash.startCase = startCase, lodash.startsWith = startsWith, lodash.subtract = subtract, lodash.sum = sum, lodash.sumBy = sumBy, lodash.template = template, lodash.times = times, lodash.toFinite = toFinite, lodash.toInteger = toInteger, lodash.toLength = toLength, lodash.toLower = toLower, lodash.toNumber = toNumber, lodash.toSafeInteger = toSafeInteger, lodash.toString = toString, lodash.toUpper = toUpper, lodash.trim = trim, lodash.trimEnd = trimEnd, lodash.trimStart = trimStart, lodash.truncate = truncate, lodash.unescape = unescape, lodash.uniqueId = uniqueId, lodash.upperCase = upperCase, lodash.upperFirst = upperFirst, lodash.each = forEach, lodash.eachRight = forEachRight, lodash.first = head, mixin(lodash, function() {
                                var source = {};
                                return baseForOwn(lodash, function(func, methodName) {
                                    hasOwnProperty.call(lodash.prototype, methodName) || (source[methodName] = func)
                                }), source
                            }(), {
                                chain: !1
                            }), lodash.VERSION = VERSION, arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
                                lodash[methodName].placeholder = lodash
                            }), arrayEach(["drop", "take"], function(methodName, index) {
                                LazyWrapper.prototype[methodName] = function(n) {
                                    var filtered = this.__filtered__;
                                    if (filtered && !index) return new LazyWrapper(this);
                                    n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
                                    var result = this.clone();
                                    return filtered ? result.__takeCount__ = nativeMin(n, result.__takeCount__) : result.__views__.push({
                                        size: nativeMin(n, MAX_ARRAY_LENGTH),
                                        type: methodName + (result.__dir__ < 0 ? "Right" : "")
                                    }), result
                                }, LazyWrapper.prototype[methodName + "Right"] = function(n) {
                                    return this.reverse()[methodName](n).reverse()
                                }
                            }), arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
                                var type = index + 1,
                                    isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
                                LazyWrapper.prototype[methodName] = function(iteratee) {
                                    var result = this.clone();
                                    return result.__iteratees__.push({
                                        iteratee: getIteratee(iteratee, 3),
                                        type: type
                                    }), result.__filtered__ = result.__filtered__ || isFilter, result
                                }
                            }), arrayEach(["head", "last"], function(methodName, index) {
                                var takeName = "take" + (index ? "Right" : "");
                                LazyWrapper.prototype[methodName] = function() {
                                    return this[takeName](1).value()[0]
                                }
                            }), arrayEach(["initial", "tail"], function(methodName, index) {
                                var dropName = "drop" + (index ? "" : "Right");
                                LazyWrapper.prototype[methodName] = function() {
                                    return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1)
                                }
                            }), LazyWrapper.prototype.compact = function() {
                                return this.filter(identity)
                            }, LazyWrapper.prototype.find = function(predicate) {
                                return this.filter(predicate).head()
                            }, LazyWrapper.prototype.findLast = function(predicate) {
                                return this.reverse().find(predicate)
                            }, LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
                                return "function" == typeof path ? new LazyWrapper(this) : this.map(function(value) {
                                    return baseInvoke(value, path, args)
                                })
                            }), LazyWrapper.prototype.reject = function(predicate) {
                                return this.filter(negate(getIteratee(predicate)))
                            }, LazyWrapper.prototype.slice = function(start, end) {
                                start = toInteger(start);
                                var result = this;
                                return result.__filtered__ && (start > 0 || end < 0) ? new LazyWrapper(result) : (start < 0 ? result = result.takeRight(-start) : start && (result = result.drop(start)), end !== undefined && (end = toInteger(end), result = end < 0 ? result.dropRight(-end) : result.take(end - start)), result)
                            }, LazyWrapper.prototype.takeRightWhile = function(predicate) {
                                return this.reverse().takeWhile(predicate).reverse()
                            }, LazyWrapper.prototype.toArray = function() {
                                return this.take(MAX_ARRAY_LENGTH)
                            }, baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                                var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
                                    isTaker = /^(?:head|last)$/.test(methodName),
                                    lodashFunc = lodash[isTaker ? "take" + ("last" == methodName ? "Right" : "") : methodName],
                                    retUnwrapped = isTaker || /^find/.test(methodName);
                                lodashFunc && (lodash.prototype[methodName] = function() {
                                    var value = this.__wrapped__,
                                        args = isTaker ? [1] : arguments,
                                        isLazy = value instanceof LazyWrapper,
                                        iteratee = args[0],
                                        useLazy = isLazy || isArray(value),
                                        interceptor = function(value) {
                                            var result = lodashFunc.apply(lodash, arrayPush([value], args));
                                            return isTaker && chainAll ? result[0] : result
                                        };
                                    useLazy && checkIteratee && "function" == typeof iteratee && 1 != iteratee.length && (isLazy = useLazy = !1);
                                    var chainAll = this.__chain__,
                                        isHybrid = !!this.__actions__.length,
                                        isUnwrapped = retUnwrapped && !chainAll,
                                        onlyLazy = isLazy && !isHybrid;
                                    if (!retUnwrapped && useLazy) {
                                        value = onlyLazy ? value : new LazyWrapper(this);
                                        var result = func.apply(value, args);
                                        return result.__actions__.push({
                                            func: thru,
                                            args: [interceptor],
                                            thisArg: undefined
                                        }), new LodashWrapper(result, chainAll)
                                    }
                                    return isUnwrapped && onlyLazy ? func.apply(this, args) : (result = this.thru(interceptor), isUnwrapped ? isTaker ? result.value()[0] : result.value() : result)
                                })
                            }), arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
                                var func = arrayProto[methodName],
                                    chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru",
                                    retUnwrapped = /^(?:pop|shift)$/.test(methodName);
                                lodash.prototype[methodName] = function() {
                                    var args = arguments;
                                    if (retUnwrapped && !this.__chain__) {
                                        var value = this.value();
                                        return func.apply(isArray(value) ? value : [], args)
                                    }
                                    return this[chainName](function(value) {
                                        return func.apply(isArray(value) ? value : [], args)
                                    })
                                }
                            }), baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                                var lodashFunc = lodash[methodName];
                                if (lodashFunc) {
                                    var key = lodashFunc.name + "",
                                        names = realNames[key] || (realNames[key] = []);
                                    names.push({
                                        name: methodName,
                                        func: lodashFunc
                                    })
                                }
                            }), realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
                                name: "wrapper",
                                func: undefined
                            }], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, LazyWrapper.prototype.value = lazyValue, lodash.prototype.at = wrapperAt, lodash.prototype.chain = wrapperChain, lodash.prototype.commit = wrapperCommit, lodash.prototype.next = wrapperNext, lodash.prototype.plant = wrapperPlant, lodash.prototype.reverse = wrapperReverse, lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue, lodash.prototype.first = lodash.prototype.head, symIterator && (lodash.prototype[symIterator] = wrapperToIterator), lodash
                    },
                    _ = runInContext();
                "function" == typeof define && "object" == typeof define.amd && define.amd ? (root._ = _, define(function() {
                    return _
                })) : freeModule ? ((freeModule.exports = _)._ = _, freeExports._ = _) : root._ = _
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    13: [function(require, module, exports) {
        var _ = require("lodash"),
            angular = require("angular"),
            uiRouter = require("angular-ui-router");
        require("angular-scroll"), angular.module("transdatosWeb", [uiRouter, "duScroll"]).constant("_", _).run(["$document", "$rootScope", function($document, $rootScope) {
            var animatedRoutes = ["about", "contact", "home", "services", "solutions"];
            $rootScope.$on("$stateChangeSuccess", function(event, toState) {
                _.includes(animatedRoutes, toState.name) && $document.scrollTopAnimated(0)
            })
        }]), require("./transdatos/controllers"), require("./transdatos/directives"), require("./transdatos/routes"), angular.module("towerWeb", [uiRouter, "ngAnimate", "duScroll"]).constant("_", _), require("./tower/controllers"), require("./tower/directives"), require("./tower/routes"), lightbox && lightbox.option({
            albumLabel: "Imagen %1 de %2"
        })
    }, {
        "./tower/controllers": 14,
        "./tower/directives": 15,
        "./tower/routes": 16,
        "./transdatos/controllers": 17,
        "./transdatos/directives": 18,
        "./transdatos/routes": 19,
        angular: 11,
        "angular-scroll": 8,
        "angular-ui-router": 9,
        lodash: 12
    }],
    14: [function(require, module, exports) {
        var angular = require("angular"),
            app = angular.module("towerWeb"),
            TowerController = require("../../../components/tower/tower");
        app.controller("TowerController", TowerController)
    }, {
        "../../../components/tower/tower": 6,
        angular: 11
    }],
    15: [function(require, module, exports) {
        var angular = require("angular"),
            app = angular.module("towerWeb"),
            BackToTopDirective = require("../../directives/back-to-top/back-to-top"),
            HeroSliderDirective = require("../../directives/hero-slider/hero-slider"),
            ModalDirective = require("../../directives/modal/modal");
        app.directive("backToTop", BackToTopDirective), app.directive("heroSlider", HeroSliderDirective), app.directive("modal", ModalDirective)
    }, {
        "../../directives/back-to-top/back-to-top": 20,
        "../../directives/hero-slider/hero-slider": 21,
        "../../directives/modal/modal": 22,
        angular: 11
    }],
    16: [function(require, module, exports) {
        var angular = require("angular"),
            app = angular.module("towerWeb");
        app.config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/tower"), $stateProvider.state("tower", {
                controller: "TowerController",
                templateUrl: "components/tower/tower.html",
                url: "/tower",
                onEnter: function($rootScope) {
                    $rootScope.title = "@Tower"
                }
            })
        })
    }, {
        angular: 11
    }],
    17: [function(require, module, exports) {
        var angular = require("angular"),
            app = angular.module("transdatosWeb"),
            AboutController = require("../../../components/about/about"),
            ContactController = require("../../../components/contact/contact"),
            HomeController = require("../../../components/home/home"),
            ServicesController = require("../../../components/services/services"),
            SolutionsController = require("../../../components/solutions/solutions");
        app.controller("AboutController", AboutController), app.controller("ContactController", ContactController), app.controller("HomeController", HomeController), app.controller("ServicesController", ServicesController), app.controller("SolutionsController", SolutionsController)
    }, {
        "../../../components/about/about": 1,
        "../../../components/contact/contact": 2,
        "../../../components/home/home": 3,
        "../../../components/services/services": 4,
        "../../../components/solutions/solutions": 5,
        angular: 11
    }],
    18: [function(require, module, exports) {
        var angular = require("angular"),
            app = angular.module("transdatosWeb"),
            BackToTopDirective = require("../../directives/back-to-top/back-to-top"),
            HeroSliderDirective = require("../../directives/hero-slider/hero-slider"),
            TabNavigationDirective = require("../../directives/tab-navigation/tab-navigaton");
        app.directive("backToTop", BackToTopDirective), app.directive("heroSlider", HeroSliderDirective), app.directive("tabNavigation", TabNavigationDirective)
    }, {
        "../../directives/back-to-top/back-to-top": 20,
        "../../directives/hero-slider/hero-slider": 21,
        "../../directives/tab-navigation/tab-navigaton": 23,
        angular: 11
    }],
    19: [function(require, module, exports) {
        var angular = require("angular"),
            app = angular.module("transdatosWeb");
        app.config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home"), $urlRouterProvider.when("/about", "/about/about-us"), $urlRouterProvider.when("/contact", "/contact/questions"), $urlRouterProvider.when("/services", "/services/networking"), $urlRouterProvider.when("/solutions", "/solutions/engineering"), $stateProvider.state("about", {
                controller: "AboutController",
                templateUrl: "components/about/about.html",
                url: "/about"
            }).state("about.about-us", {
                templateUrl: "components/about/sub-sections/about-us.html",
                url: "/about-us",
                onEnter: function($rootScope) {
                    $rootScope.title = "Sobre Nosotros", $rootScope.description = "Transdatos es una empresa de capitales locales creada hace 25 años con el objetivo de ofrecer servicios de telecomunicaciones de alta calidad para el mercado regional."
                }
            }).state("about.csr", {
                templateUrl: "components/about/sub-sections/csr.html",
                url: "/csr",
                onEnter: function($rootScope) {
                    $rootScope.title = "RSE", $rootScope.description = "Ofrecemos pasantías para jóvenes profesionales y cursos abiertos a la comunidad en general, participando además activamente en organizaciones intermedias de carácter público/privadas."
                }
            }).state("about.history", {
                templateUrl: "components/about/sub-sections/history.html",
                url: "/history",
                onEnter: function($rootScope) {
                    $rootScope.title = "Historia", $rootScope.description = "Iniciamos nuestras actividades en el año 1993, a partir de la creación de nuestra primera red sobre cables de cobre y radioenlaces digitales de acceso a sub-nodos, con Nodo Central ubicado en el Palacio Minetti de la ciudad de Rosario."
                }
            }).state("contact", {
                controller: "ContactController",
                templateUrl: "components/contact/contact.html",
                url: "/contact"
            }).state("contact.questions", {
                templateUrl: "components/contact/sub-sections/questions.html",
                url: "/questions",
                onEnter: function($rootScope) {
                    $rootScope.title = "Consultas", $rootScope.description = "Hacenos llegar tus consultas!"
                }
            }).state("contact.work-with-us", {
                templateUrl: "components/contact/sub-sections/work-with-us.html",
                url: "/work-with-us",
                onEnter: function($rootScope) {
                    $rootScope.title = "Trabajá con nosotros", $rootScope.description = "Envianos tu CV y sumate a nuestro equipo!"
                }
            }).state("home", {
                controller: "HomeController",
                templateUrl: "components/home/home.html",
                url: "/home",
                onEnter: function($rootScope) {
                    $rootScope.title = "Home", $rootScope.description = "Con 25 años de experiencia, Transdatos se consolida como una empresa líder en el mercado regional de telecomunicaciones, brindando soluciones integrales en Redes, Ingeniería, Construcción y Mantenimiento."
                }
            }).state("services", {
                controller: "ServicesController",
                templateUrl: "components/services/services.html",
                url: "/services"
            }).state("services.buildings", {
                templateUrl: "components/services/sub-sections/buildings.html",
                url: "/buildings",
                onEnter: function($rootScope) {
                    $rootScope.title = "Servicios - Construcciones", $rootScope.description = "Realizamos un asesoramiento integral en la construcción de redes certificadas: gestionamos permisos, además de la ejecución, puesta en marcha y certificación final."
                }
            }).state("services.engineering", {
                templateUrl: "components/services/sub-sections/engineering.html",
                url: "/engineering",
                onEnter: function($rootScope) {
                    $rootScope.title = "Servicios - Ingeniería", $rootScope.description = "Nuestro equipo de profesionales y metodologías de trabajo validadas durante años, garantizan un proceso de diseño confiable en todas sus etapas. Optimizamos nuestras soluciones adecuándolas a los requerimientos de nuestros clientes."
                }
            }).state("services.maintenance", {
                templateUrl: "components/services/sub-sections/maintenance.html",
                url: "/maintenance",
                onEnter: function($rootScope) {
                    $rootScope.title = "Servicios - Mantenimiento", $rootScope.description = "Nuestra mesa de ayuda técnica especializada se encuentra disposición de nuestros clientes 24hsx7d para realizar un diagnóstico que proporcione la solución más óptima para sus requerimientos."
                }
            }).state("services.networking", {
                templateUrl: "components/services/sub-sections/networking.html",
                url: "/networking",
                onEnter: function($rootScope) {
                    $rootScope.title = "Servicios - Redes", $rootScope.description = "Contamos con nuestra propia red vinculada a los principales Carriers Nacionales e Internacionales, desde la que brindamos servicios customizados con acceso permanente y SLA que garantizan estabilidad y disponibilidad del servicio."
                }
            }).state("solutions", {
                controller: "SolutionsController",
                templateUrl: "components/solutions/solutions.html",
                url: "/solutions",
                onEnter: function($rootScope) {
                    $rootScope.description = "Nuestro expertise, sustentado en más de 25 años de trayectoria, nos permiten brindar soluciones tecnológicas complejas adecuadas para cada cliente."
                }
            }).state("solutions.engineering", {
                templateUrl: "components/solutions/sub-sections/engineering.html",
                url: "/engineering",
                onEnter: function($rootScope) {
                    $rootScope.title = "Soluciones - Industrias y Empresas de Servicios"
                }
            }).state("solutions.pymes", {
                templateUrl: "components/solutions/sub-sections/pymes.html",
                url: "/pymes",
                onEnter: function($rootScope) {
                    $rootScope.title = "Soluciones - Pymes y Profesionales"
                }
            }).state("solutions.telcos", {
                templateUrl: "components/solutions/sub-sections/telcos.html",
                url: "/telcos",
                onEnter: function($rootScope) {
                    $rootScope.title = "Soluciones - Telcos"
                }
            })
        })
    }, {
        angular: 11
    }],
    20: [function(require, module, exports) {
        var BackToTopDirective = function($document) {
            return {
                scope: {
                    tower: "=tower"
                },
                link: function($scope) {
                    var classes = ["back-to-top"];
                    $scope.tower && classes.push("back-to-top_tower"), $scope.classes = classes.join(" "), $scope.scrollToTop = function() {
                        $document.scrollTopAnimated(0)
                    }
                },
                restrict: "E",
                template: '<button ng-class="classes" type="button" ng-click="scrollToTop()">Volver arriba</button>'
            }
        };
        module.exports = BackToTopDirective
    }, {}],
    21: [function(require, module, exports) {
        var helpers = require("../../helpers/helpers"),
            HeroSlider = function() {
                return {
                    link: function($scope) {
                        $scope.currentImage = 1, $scope.currentPosition = 0, $scope.heroSliderItemsElement = document.querySelector(".hero-slider--items"), $scope.showNextImage = function() {
                            if ($scope.currentImage === $scope.heroSliderItems.length) {
                                $scope.currentImage = 1;
                                var newPosition = 100 * $scope.heroSliderItems.length - 100;
                                helpers.setVendorPrefixes($scope.heroSliderItemsElement, "Transform", "translateX(-" + ($scope.currentPosition -= newPosition) + "%)")
                            } else $scope.currentImage += 1, helpers.setVendorPrefixes($scope.heroSliderItemsElement, "Transform", "translateX(-" + ($scope.currentPosition += 100) + "%)")
                        }, $scope.showPreviousImage = function() {
                            if (1 === $scope.currentImage) {
                                $scope.currentImage = $scope.heroSliderItems.length;
                                var newPosition = 100 * $scope.heroSliderItems.length - 100;
                                helpers.setVendorPrefixes($scope.heroSliderItemsElement, "Transform", "translateX(-" + ($scope.currentPosition += newPosition) + "%)")
                            } else $scope.currentImage -= 1, helpers.setVendorPrefixes($scope.heroSliderItemsElement, "Transform", "translateX(-" + ($scope.currentPosition -= 100) + "%)")
                        }
                    },
                    restrict: "E",
                    scope: {
                        heroSliderItems: "="
                    },
                    templateUrl: "shared/directives/hero-slider/hero-slider.html"
                }
            };
        module.exports = HeroSlider
    }, {
        "../../helpers/helpers": 24
    }],
    22: [function(require, module, exports) {
        var ModalDirective = function($document) {
            return {
                scope: {
                    modalControl: "="
                },
                link: function($scope, elem) {
                    $scope.height = $(document).height(), $scope.closeModal = function() {
                        $scope.modalControl.modalOpen = !1
                    }, $scope.avoidCloseModal = function(event) {
                        event.preventDefault(), event.stopPropagation()
                    }, $scope.goToContactForm = function() {
                        $scope.closeModal();
                        var contactElem = angular.element(document.querySelector("#contacto"));
                        $document.scrollToElementAnimated(contactElem)
                    }
                },
                restrict: "E",
                template: '<div class="modal-container" ng-show="modalControl.modalOpen" style="height: {{height}}px" ng-click="closeModal()"><div class="modal" ng-show="modalControl.modalOpen" ng-click="avoidCloseModal($event)"><button class="modal--close-btn" type="button" ng-click="closeModal()">X</button><div ng-include="modalControl.templateUrl"></div></div></div>'
            }
        };
        module.exports = ModalDirective
    }, {}],
    23: [function(require, module, exports) {
        var TabNavigationDirective = function() {
            return {
                link: function($scope, element, attributes) {
                    $scope.getTabClassName = function() {
                        return {
                            "tab-navigation": !0,
                            "tab-navigation_secondary": "secondary" === attributes.navigationType,
                            "tab-navigation_tertiary": "tertiary" === attributes.navigationType,
                            "tab-navigation_quaternary": "quaternary" === attributes.navigationType
                        }
                    }
                },
                restrict: "E",
                scope: {
                    navigationItems: "=",
                    navigationType: "@"
                },
                templateUrl: "shared/directives/tab-navigation/tab-navigation.html"
            }
        };
        module.exports = TabNavigationDirective
    }, {}],
    24: [function(require, module, exports) {
        var helperFunctions = {
            setVendorPrefixes: function(element, property, value) {
                element.style["moz" + property] = value, element.style["ms" + property] = value, element.style["o" + property] = value, element.style["webkit" + property] = value
            }
        };
        module.exports = helperFunctions
    }, {}]
}, {}, [13]);
//# sourceMappingURL=app.js.map


