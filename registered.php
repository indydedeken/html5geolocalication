<?php 
	/*
	 * Page qui enregistrer en DB le checkin
	 * récupère les variables, enregistre puis affiche une image
	 * sinon, affiche une iframe de youtube
	 *
	 */
	
	include_once("./php/applications.php");
?>
<!DOCTYPE HTML>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Géolocalisation - HTML5 / Registered</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div style="width: 100%">
		<?php 
		extract($_POST);
		
		if(isset($latitude) && $latitude != 0 && isset($longitude) && $longitude != 0 && isset($altitude) && isset($accuracy) && isset($timestamp) && $timestamp != 0) {
			
			// pour utiliser les commit / rollback
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			try {
				
				$db->beginTransaction();
				
				$query = $db->prepare("INSERT INTO position VALUES ('', :lat, :lon, :alt, :acc, :time, :ip)");
				$query->bindParam(":lat", $latitude);
				$query->bindParam(":lon", $longitude);
				$query->bindParam(":alt", $altitude);
				$query->bindParam(":acc", $accuracy, PDO::PARAM_INT);
				$query->bindParam(":time", substr($timestamp, 0, 10), PDO::PARAM_STR, 10);
				$query->bindParam(":ip", $_SERVER["REMOTE_ADDR"]);
				$query->execute();
				
				// si Ok, alors commit()
				$db->commit();
				$insert = true;
				
			} catch (Exception $e) {
				// si Exception, alors rollback()
				$db->rollBack();	
				echo $e->getMessage();
				$insert = false;
			}
			
			$db = NULL;
			
			if($insert == true) {
			?>
			
				<p style="font-size:36px; width: 100%; text-align:center; vertical-align:middle">
					Check-in !!
					<br>
					<a href="http://dev.indydedeken.fr/geolocalisation" title="retour">
						<img src="http://vancouver.franceolympique.com/vancouver/fichiers/album/8/829.jpg" alt="Et voilà...">
					</a>
				</p>
			<?php
			}
		
		} else {
		?>
			<p style="font-size:36px; width: 100%; text-align:center; margin: auto; margin-top:40px">
				<strong>STOP IT !</strong><br>
				Don't come here without your localisation !
				<br><br><br><br>
				<q><a href="http://dev.indydedeken.fr/geolocalisation" title="retour">Please, baby come back...</a></q><br>
				<iframe width="300" height="250" src="http://www.youtube.com/embed/ZKUZLWbycJI?rel=0" frameborder="0" allowfullscreen></iframe>
			</p>
		<?php
		}
		?>
	</div>
</body>
</html>