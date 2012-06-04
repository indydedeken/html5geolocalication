<?php
	$PARAM_hote='XXXXXXXXXXXX'; 
	$PARAM_port='3306';
	$PARAM_nom_bd='XXXX';
	$PARAM_utilisateur='XXXXX';
	$PARAM_mot_passe='XXX';
	
	try {
		$db = new PDO('mysql:host='.$PARAM_hote.';port='.$PARAM_port.';dbname='.$PARAM_nom_bd, $PARAM_utilisateur, $PARAM_mot_passe);
	} catch(Exception $e) {
		die('Erreur : '.$e->getMessage());
	}
	
?>