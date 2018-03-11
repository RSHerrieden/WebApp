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
$(".menuRefresh").on("click", function (e) {
    e.preventDefault();
    refresh();
});
$(".button-collapse").sideNav({
    closeOnClick: true,
    draggable: true
});

$("#settingsModalSave").on("click", function (e) {
    e.preventDefault();
    schoolclass = $("#schoolclass").val();
    localStorage.schoolclass = schoolclass;
    autoreload = $("#autoRefreshInterval").val();
    localStorage.autoreload = autoreload;
    if (autoreload > 0) {
        clearInterval(autoRefresh);
        var autoRefresh = setInterval(refresh, autoreload * 1000);
    } else {
        clearInterval(autoRefresh)
    }
    refresh();
});


$(window).on("load", function () {
    window.applicationCache.addEventListener('updateready', function (e) {
        window.applicationCache.swapCache();
        if (confirm('Juhu! Eine neue Version ist verfügbar. Möchtest du sie laden?')) {
            window.location.reload();
        }
    }, false);
    let $tabs = $('.tabs');
    if ($tabs.length) {
        $tabs.tabs({'swipeable': false});
    }
    if (!typeof(localStorage)) {
        alert("There are missing dependencies. This page might won't work properly!")
    } else {
        if (typeof localStorage.schoolclass !== 'undefined') {
            schoolclass = localStorage.schoolclass;
            $("#schoolclass").val(schoolclass);
        }
        if (typeof localStorage.autoreload !== 'undefined') {
            autoreload = localStorage.autoreload;
            $("#autoRefreshInterval").val(autoreload);
        }
    }
    $('select').material_select();
    $('.modal').modal();
    $("#lastModify").html("File Date: " + document.lastModified);
    refresh();
    if (autoreload > 0) {
        var autoRefresh = setInterval(refresh, autoreload * 1000);
    }
});
