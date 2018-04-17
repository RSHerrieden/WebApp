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

function setOption(selectElement, value) { // https://stackoverflow.com/a/4324207/7142167
    return [...selectElement.options].some((option, index) => {
        console.log(option, index);
        if (option.value === value) {
            selectElement.selectedIndex = index;
            return true;
        }
    });
}

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sammstag", "Sonntag"];
function refresh() {
    let url = "proxy.php?" + $.param({class: schoolclass});
    $.getJSON(url, function (data) {
        if (data.replacements === undefined) {
            return;
        }
        let date = new Date((data.date.seconds)*1000);
        let planDate = "Vertretungen für "+days[date.getDay()-1]+", " + data.date.string;
        let planWeek = " - " + "Woche " + data.week;
        if (data.week === "") {
            planWeek = " - ? Woche";
        }
        $(".planDate").each(function() {
            $(this).html(planDate);
        });
        $(".planWeek").each(function() {
            $(this).html(planWeek);
        });
        let replacementsTable = document.getElementById("replacementsTable");
        replacementsTable.innerHTML = "";
        if (data.amount.replacements >= 1) {
            $.each(data.replacements, function (i, val) {
                let row = replacementsTable.insertRow();
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);

                cell1.innerText = val.schoolclass;
                cell2.innerText = val.schoolhour + ". Stunde";
                cell3.innerText = val.schoolsubject;
                if (val.schoolsubject === "") {
                    cell3.className = "icon-arrow-right";
                }
                cell4.innerText = val.schoolroom;
                cell5.className = "icon-check";
                if (val.dropped === 1) {
                    cell5.className = "icon-close";
                }
            });
        } else {
            let row = replacementsTable.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            cell1.innerText = "Heute";
            cell2.innerText = "keine";
            if (schoolclass === "") {
                cell3.innerText = "";
                cell4.innerText = "Vertretungen";
                cell5.innerText = "";
            } else {
                cell3.innerText = "";
                cell4.innerText = "Vertretungen";
                cell5.innerText = "für Klasse " + schoolclass.replace(/%/i, "");
            }
        }

        let notificationsTable = document.getElementById("notificationsTable");
        notificationsTable.innerHTML = "";

        if (data.amount.notifications >= 1) {
            $.each(data.notifications, function (i, val) {
                let row = notificationsTable.insertRow();
                let cell1 = row.insertCell(0);
                cell1.innerHTML = val.content;
                cell1.className = "center";
            });
        } else {
            let row = notificationsTable.insertRow();
            let cell1 = row.insertCell(0);
            cell1.innerHTML = "Heute keine Mitteilungen";
            cell1.className = "center";
        }
    });
}
