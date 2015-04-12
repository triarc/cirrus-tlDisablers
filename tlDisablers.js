var mod = angular.module("tlDisablers", []);
mod.directive("tlAjaxDisable", [
    '$parse',
    function ($parse) { return function (scope, element, attrs) {
        restrict: 'A', 'Click Mousedown Mouseup Mouseover Mouseout Mousemove Mouseenter Mouseleave Keydown Keyup Keypress Submit Focus Blur Copy Cut Paste'.split(' ').forEach(function (action) {
            var fn = $parse(attrs["ng" + action]);
            if (angular.isFunction(fn) && fn !== angular.noop) {
                action = action.toLowerCase();
                element.unbind(action).bind(action, function () {
                    var promise = fn(scope, { $event: event });
                    if (Triarc.hasNoValue(promise)) {
                        element.prop("disabled", true);
                        promise.finally(function () {
                            element.prop("disabled", false);
                        });
                    }
                });
            }
        });
    }; }
]);
