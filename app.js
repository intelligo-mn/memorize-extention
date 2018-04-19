! function() {
    "use strict";
    angular.module("MemorizeApp", [])
}(),
function() {
    "use strict";

    function memorizeFactory($http) {
        var factory = {};
        factory.loading = !1;
        var url = "https://jisho.techstar.cloud/api";
        return factory.get = function() {
            return factory.loading = !0, factory.promise = $http({
                url: url,
                method: "GET"
            }), factory.promise.then(function(response) {
                factory.loading = !1, factory.data = response.data
            }), factory.promise
        }, factory
    }
    angular.module("MemorizeApp").factory("memorizeFactory", memorizeFactory), memorizeFactory.$inject = ["$http"]
}(),
function() {
    "use strict";

    function mainController(memorizeFactory, $scope) {
        function setIndex(length) {
            var index = 0,
                firstTimeUse = void 0 === lastChangeDate,
                newDay = todayDate != lastChangeDate;
            return firstTimeUse || newDay ? (index = Math.floor(Math.random() * length), localStorage.lastChangeDate = (new Date).getDate(), localStorage.lastMemorizeIndex = index, index) : index = localStorage.lastMemorizeIndex
        }

        function applyColors() {
            var colorChanged = localStorage.colorChanged;
            "changed" == colorChanged ? (vm.bodyBackground = localStorage.savedHex, vm.wrapperBackground = localStorage.savedFrameColor, vm.border = "6px solid " + localStorage.savedFrameColor) : (vm.bodyBackground = "white", vm.wrapperBackground = "white", vm.border = "6px solid white")
        }

        function applyDisplay() {
            var duudlagaChanged = localStorage.duudlagaChanged,
                meaningChanged = localStorage.meaningChanged;
            switch (duudlagaChanged) {
                case "changed":
                    vm.duudlagaDisplay = localStorage.duudlagaDisplay;
                    break;
                default:
                    localStorage.duudlagaDisplay = "block", vm.duudlagaDisplay = "block"
            }
            switch (meaningChanged) {
                case "changed":
                    vm.meaningDisplay = localStorage.meaningDisplay;
                    break;
                default:
                    localStorage.meaningDisplay = "block", vm.meaningDisplay = "block"
            }
        }
        var vm = this;
        vm.memorizeFactory = memorizeFactory;
        var lastChangeDate = localStorage.lastChangeDate,
            todayDate = (new Date).getDate(),
            length = 0;
        memorizeFactory.get().then(function(response) {
            vm.memorizeList = response.data.memorize, length = response.data.memorize.length;
            var memorizeIndex = setIndex(length);
            vm.memorize = response.data.memorize[memorizeIndex];
            var memorizeLength = response.data.memorize[memorizeIndex].character.length;
            vm.charLength = {
                isOneChar: 1 == memorizeLength,
                isTwoChar: 2 == memorizeLength,
                isThreeChar: 3 == memorizeLength,
                isFourChar: 4 == memorizeLength
            }
        }), applyColors(), applyDisplay(), vm.updateColors = function() {
            applyColors(), $scope.$apply()
        }, vm.updateDisplay = function() {
            applyDisplay()
        }
    }
    angular.module("MemorizeApp").controller("mainController", mainController), mainController.$inject = ["memorizeFactory", "$scope"]
}(),
function() {
    "use strict";

    function footerInfo() {
        function link(scope, element, attrs) {
            var isToggled = !1;
            scope.toggleFooter = function() {
                isToggled ? (isToggled = !1, $(".mainView").css("margin-bottom", "0"), $(".info-icon").css("margin-bottom", "0"), $("footer").removeClass("show-footer"), $("footer").empty()) : (isToggled = !0, $(".mainView").css("margin-bottom", "9rem"), $(".info-icon").css("margin-bottom", "9rem"), $("footer").addClass("show-footer"), $("footer").append('<h2>Memorizeday</h2><div><p>Memorizeday replaces your new tab with a a new Memorize card. One new card every day. The selection is of regular/daily life words.</p><p>Thanks for using Memorizeday!</p> <a href="mailto:contact@memorizeday.com">contact@memorizeday.com</a></div><a class="twitter-link" href="https://www.twitter.com/memorizeday_app" target="_blank"><img src="img/twitter.png"></a>'))
            }
        }
        var directive = {
            scope: !0,
            templateUrl: "/app/directives/footerInfo.view.html",
            link: link
        };
        return directive
    }
    angular.module("MemorizeApp").directive("footerInfo", footerInfo), footerInfo.$inject = []
}(),
function() {
    "use strict";

    function nextMemorize() {
        function link(scope, element, attrs) {
            scope.setNewMemorize = function(memorizeList) {
                var newIndex = Math.floor(Math.random() * memorizeList.length);
                localStorage.lastChangeDate = (new Date).getDate(), localStorage.lastMemorizeIndex = newIndex;
                var memorizeLength = memorizeList[newIndex].character.length;
                scope.charLength.isOneChar = 1 == memorizeLength, scope.charLength.isTwoChar = 2 == memorizeLength, scope.charLength.isThreeChar = 3 == memorizeLength, scope.charLength.isFourChar = 4 == memorizeLength, $("#character").fadeOut(0, function() {
                    $("#character").text(memorizeList[newIndex].character).fadeIn(300)
                }), "block" == localStorage.duudlagaDisplay && $("#duudlaga").fadeOut(0, function() {
                    $("#duudlaga").text(memorizeList[newIndex].duudlaga).fadeIn(300)
                }), "block" == localStorage.meaningDisplay && $("#meaning").fadeOut(0, function() {
                    $("#meaning").text(memorizeList[newIndex].meanings).fadeIn(300)
                })
            }
        }
        var directive = {
            scope: {
                list: "=",
                charLength: "="
            },
            templateUrl: "/app/directives/nextMemorize.view.html",
            link: link
        };
        return directive
    }
    angular.module("MemorizeApp").directive("nextMemorize", nextMemorize), nextMemorize.$inject = []
}(),
function() {
    "use strict";

    function notification() {
        function link(scope, element, attrs) {
            localStorage.toggleNewsSeen ? scope.toggleNewsSeen = localStorage.toggleNewsSeen : (localStorage.toggleNewsSeen = "0", scope.toggleNewsSeen = localStorage.toggleNewsSeen), scope.toggleNewsUneen = function() {
                localStorage.toggleNewsSeen = "1", scope.toggleNewsSeen = localStorage.toggleNewsSeen
            }
        }
        var directive = {
            scope: {
                textColor: "=",
                buttonColor: "="
            },
            templateUrl: "/app/directives/notification.view.html",
            link: link
        };
        return directive
    }
    angular.module("MemorizeApp").directive("notification", notification), notification.$inject = []
}(),
function() {
    "use strict";

    function onboarding() {
        function link(scope, element, attrs) {
            localStorage.nextMemorizeSeen ? scope.nextMemorizeSeen = localStorage.nextMemorizeSeen : (localStorage.nextMemorizeSeen = "0", scope.nextMemorizeSeen = localStorage.nextMemorizeSeen), scope.nextMemorizeUnsee = function() {
                localStorage.nextMemorizeSeen = "1", scope.nextMemorizeSeen = localStorage.nextMemorizeSeen
            }
        }
        var directive = {
            scope: {
                textColor: "=",
                buttonColor: "="
            },
            templateUrl: "/app/directives/onboarding.view.html",
            link: link
        };
        return directive
    }
    angular.module("MemorizeApp").directive("onboarding", onboarding), onboarding.$inject = []
}(),
function() {
    "use strict";

    function settingsMenu(memorizeFactory) {
        function link(scope, element, attrs) {
            function hidePicker() {
                $("#picker-wrapper").removeClass("show-picker"), $(".picker").css("display", "none"), pickerIsToggled = !1
            }
            var menuIsToggled = !1;
            scope.memorizeFactory = memorizeFactory, scope.toggleSettingsMenu = function() {
                menuIsToggled ? ($("#settings-menu").css("display", "none"), menuIsToggled = !1, hidePicker(), $("#list-wrapper").removeClass("show-list")) : ($("#memorize-info").css("display", "block"), $("#settings-menu").css("display", "block"), menuIsToggled = !0)
            };
            var pickerIsToggled = !1;
            scope.toggleColorPicker = function() {
                pickerIsToggled ? hidePicker() : ($(".picker").css("display", "flex"), $("#picker-wrapper").addClass("show-picker"), $("#list-wrapper").removeClass("show-list"), $("#memorize-info").css("display", "none"), pickerIsToggled = !0)
            };
            var listIsToggled = !1;
            scope.toggleList = function() {
                listIsToggled ? ($("#list-wrapper").removeClass("show-list"), listIsToggled = !1) : ($("#list-wrapper").addClass("show-list"), $("#memorize-info").css("display", "none"), hidePicker(), listIsToggled = !0)
            }, scope.showMemorizeInfo = function() {
                $("#memorize-info").css("display", "block"), hidePicker()
            }
        }
        var directive = {
            link: link,
            templateUrl: "/app/directives/settingsMenu.view.html",
            scope: {
                updateColors: "=",
                updateDisplay: "="
            },
            controller: function($scope) {
                var vm = this;
                vm.updateColors = $scope.updateColors, vm.updateDisplay = $scope.updateDisplay
            }
        };
        return directive
    }
    angular.module("MemorizeApp").directive("settingsMenu", settingsMenu), settingsMenu.$inject = ["memorizeFactory"]
}(),
function() {
    "use strict";

    function toggleElt($timeout) {
        function link(scope, element, attrs, settingsMenuCtrl) {
            "block" == localStorage[scope.className + "Display"] && (scope.checked = !0), scope.toggle = function() {
                "block" == localStorage[scope.className + "Display"] ? (localStorage[scope.className + "Changed"] = "changed", localStorage[scope.className + "Display"] = "none", scope.checked = !1, settingsMenuCtrl.updateDisplay()) : "none" == localStorage[scope.className + "Display"] && (localStorage[scope.className + "Display"] = "block", scope.checked = !0, settingsMenuCtrl.updateDisplay())
            }
        }
        var directive = {
            link: link,
            require: "^settingsMenu",
            templateUrl: "/app/directives/toggleElt.view.html",
            scope: {
                className: "@"
            }
        };
        return directive
    }
    angular.module("MemorizeApp").directive("toggleElt", toggleElt), toggleElt.$inject = ["$timeout"]
}();
