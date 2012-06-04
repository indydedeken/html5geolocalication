<?php 
	include_once("./php/applications.php");
?>
<!DOCTYPE HTML>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Géolocalisation - HTML5 / Home</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script src="js/script.js"></script>
</head>
<body>

<div id="map_canvas"></div>

<div class="checkin">
	<form name="geoloc" action="./registered.php" method="post">
		<input id="latitude" name="latitude" type="hidden" value="">
		<input id="longitude" name="longitude" type="hidden" value="">
		<input id="altitude" name="altitude" type="hidden" value="">
		<input id="accuracy" name="accuracy" type="hidden" value="">
		<input id="timestamp" name="timestamp" type="hidden" value="">
		
		<input class="yellow" id="send" name="checkin" type="submit" value="Check-in">
	</form>
</div>

<div class="part">
	<div id="infoGeo"></div>
	<div id="km"></div>
</div>

</body>
</html>
