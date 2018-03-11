<?php
/**
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

error_reporting(E_ALL);

/**
 * Created by PhpStorm.
 * User: user
 * Date: 10.03.18
 * Time: 12:19
 */

function startsWith($haystack, $needle)
{
    return substr($haystack, 0, strlen($needle)) === $needle;
}

$class = "";
if (isset($_GET["class"])) {
    $class = "?class=" . $_GET["class"];
}

$url = "https://rsh.noah-seefried.de/v1.0/" . $class;
$curl = curl_init($url);
//https://www.joe0.com/2017/03/06/how-to-anonymize-traffic-programmatically-by-using-phpcurl-and-tor-network/
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 120);
curl_setopt($curl, CURLOPT_MAXREDIRS, 20);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_COOKIESESSION, true);
$response = curl_exec($curl);
$contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
header("Content-Type: " . $contentType);
curl_close($curl);
echo $response;