/*
 * jquery.hold.js - jQuery plugin for anti-spaghetti-style code
 * Author Oleg Taranov aka Kujbor
 * Copyright (C) 2013: CubeComp Development
 */
define("jquery.hold", ["jquery"], function() {

    "use strict";

    $.hold = function(checkerFunc, handlerFunc, that, delay, limit) {

        if (checkerFunc) {

            var check = function() {

                try {
                    return $.proxy(checkerFunc, that ? that : this)();
                }
                catch (e) {
                    return false;
                }
            };

            var current = 0;

            limit = limit ? limit : 10000;

            (function checker() {

                if (++current > limit) {
                    console.error("Limit is reached");
                    return false;
                }

                if (check()) {
                    $.proxy(handlerFunc, that ? that : this)();
                } else {
                    window.setTimeout(checker, delay);
                }
            })();

        } else {

            window.setTimeout(function() {
                $.proxy(handlerFunc, that ? that : this)();
            }, delay);
        }
    };

});
