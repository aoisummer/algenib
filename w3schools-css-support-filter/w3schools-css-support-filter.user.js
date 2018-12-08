// ==UserScript==
// @name         W3schools CSS Browser Support Filter
// @namespace    https://github.com/aoisummer/algenib/tree/master/w3schools-css-support-filter
// @version      0.1.0
// @description  Filter CSS property by browser version.
// @author       aoi
// @match        https://www.w3schools.com/cssref/css3_browsersupport.asp
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    var browserList = ['Edge', 'Firefox', 'Chrome', 'Safari', 'Opera'];
    var renderBrowsers = function (browserList) {
        var h = [];
        browserList.forEach(function (browser) {
            h.push('<option value="' + browser + '">' + browser + '</option>');
        });
        return h.join('');
    };
    var rows = document.querySelectorAll('#main .w3-table-all.bsReference tr');
    var el1 = document.querySelector('#main .w3-responsive');
    var el = document.createElement('div');
    el.innerHTML = '<span>Filter: </span><select id="filter-browser" style="height:1.75em;">' + renderBrowsers(browserList) + '</select><input id="filter-version" size="4" placeholder="Ver" style="height:1.75em;" />';
    el.id = 'filter';
    el.style.cssText = 'text-align:right;';
    el1.parentNode.insertBefore(el, el1);

    var browserEl = document.querySelector('#filter-browser');
    var versionEl = document.querySelector('#filter-version');
    var filterTable = function () {
        var browser = browserEl.value;
        var version = Number(versionEl.value);

        rows.forEach(function (row) {
            if (row.querySelector('.bsProperty strong') || row.querySelector('th')) {
                return;
            }
            if (isNaN(version) || version === 0) {
                row.style.opacity = 1;
            } else {
                var _el = row.querySelector('.bs' + browser) || row.querySelector('.bsPre' + browser) || row.querySelector('.bsNo' + browser);

                if (_el) {
                    var _val = Number(_el.textContent);
                    if (_val === 0 || _val > version) {
                        row.style.opacity = .2;
                    } else {
                        row.style.opacity = 1;
                    }
                } else {
                    row.style.opacity = .2;
                }
            }
        });
    };
    versionEl.addEventListener('input', filterTable, false);
    browserEl.addEventListener('change', filterTable, false);
})();