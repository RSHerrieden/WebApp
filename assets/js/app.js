/*
 * WebApp RSHerrieden replacement plan
 * Copyright (C) 2018  Moritz Fromm and Noah Seefried
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

let schoolclass = "";
let autoreload = 900;

$("#refresh").on("click", function (r) {
    refresh();
});

$(window).on("load", function () {
    window.applicationCache.addEventListener('updateready', function (e) {
        window.applicationCache.swapCache();
        if (confirm('Juhu! Eine neue Version ist vefügbar. Möchtest du sie laden?')) {
            window.location.reload();
        }
    }, false);
    if (!typeof(localStorage)) {
        alert("there are missing dependencies. This page might won't work properly!")
    } else {
        if (typeof localStorage.schoolclass !== 'undefined') {
            schoolclass = localStorage.schoolclass;
        }
        if (typeof localStorage.autoreload !== 'undefined') {
            autoreload = localStorage.autoreload;
        }
    }
    $("#lastModify").html("File Date: " + document.lastModified);
    console.debug(document.lastModified);
    refresh();
    if (autoreload > 0) {
        var reload = setInterval(function () {
            refresh();
        }, autoreload * 1000)
    }
});