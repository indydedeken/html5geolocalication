if(navigator.geolocation) {
			
	/* retourne un nombre à deux chiffres */
	function formatZero(number) {
		if(number < 10)
			return "0" + number;
		else 
			return number;
	}
	
	/***************************************************/
	/* fonction en cas de succes de la geolocalisation */
	/***************************************************/
	function positionSucces(e) {
		var ts = new Date();
		
		var accuracy = e.coords.accuracy;
		var latitude = e.coords.latitude;
		var longitude = e.coords.longitude;
		var altitude = e.coords.altitude;
		var timestamp = parseInt(ts.getTime()/1000);
		
		var texte = "";
		texte += "Avec une précision à " + accuracy + "m près, ";
		texte += "tu es à " + latitude.toFixed(4) + ", " + longitude.toFixed(4) + "\n";
		
		if(timestamp != null) {
			var moment = new Date();
			
			var year = moment.getFullYear();
			var month = moment.getMonth() + 1;
			var day = moment.getDate();
			var hours = formatZero(moment.getHours());
			var minutes = formatZero(moment.getMinutes());
			var seconds = formatZero(moment.getSeconds());
		
			texte += "Nous sommes le " + day + "/" + month + "/" + year + ".\n";
			texte += "Il est " + hours + ":" + minutes;
		}
		
		// ajout des données au formulaire
		$('form[name="geoloc"]').submit(function(event) {
			event.preventDefault();
		
			document.getElementById("accuracy").value = accuracy;
			document.getElementById("latitude").value = latitude;
			document.getElementById("longitude").value = longitude;
			document.getElementById("altitude").value = altitude;
			document.getElementById("timestamp").value = timestamp;
			
			this.submit();
		});
		
		// variables pour l'itinéraire
		var directionsDisplay = new google.maps.DirectionsRenderer( { draggable: true } );
		var directionsService = new google.maps.DirectionsService();
		
		// options de la MAP
		var myOptions = {
			zoom: 10,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.MEDIUM},
			center: new google.maps.LatLng(latitude, longitude),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		// creation de la MAP
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		// activation de l'itineraire
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById("directionsPanel"));
		
		// ajout d'un markeur		
		var latlng = new google.maps.LatLng(latitude, longitude);
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: texte
		});
		map.panTo(latlng);
		
		// point d'arrivée
		var dest_lat = latitude + 0.39563;
		var dest_lng = longitude + 0.5;
		
		// calcul du trajet
		calcRoute(latitude, longitude, dest_lat, dest_lng);
		
		// calcul de la distance
		google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
			totalDistance(directionsDisplay.directions);
		});
		
		
		/********************/
		/* calcul du trajet */
		/********************/
		function calcRoute(org_lat, org_lng, dest_lat, dest_lng) {
			var request = {
				origin: new google.maps.LatLng(org_lat, org_lng),
				destination: new google.maps.LatLng(dest_lat, dest_lng),
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
		}
		
		/*************************/
		/* calcul de la distance */
		/*************************/
		function totalDistance(result) {	
			var total = 0;
			var myroute = result.routes[0];
			for (i = 0; i < myroute.legs.length; i++) {
				total += myroute.legs[i].distance.value;
			}
			total = total / 1000.
			document.getElementById("km").innerHTML = "Trajet de " + total.toFixed(2) + "km";
		}
		
	}
	
	/**************************************************/
	/* fonction en cas d'erreur de la geolocalisation */
	/**************************************************/
	function positionError(error) {
		
		if(error.code == 3) 
			document.getElementById("infoGeo").innerHTML = "There is too long !";
		else if(error.code == 2)
			document.getElementById("infoGeo").innerHTML = "Access denied !";
		else if(error.code == 1)
			document.getElementById("infoGeo").innerHTML = "Your position is unavailable !";
		
		$('form[name="geoloc"]').css("display", "none");
	}
	
	/********************************/
	/* option de la geolocalisation */
	/********************************/
	var positionOptions = {
		maximumAge: 60000, // cache de 60 sec
		enableHighAccuracy: false,
		timeout: 30000 // 30 sec d'attente
	};
	
	// appel à la geolocalisation
	navigator.geolocation.getCurrentPosition(positionSucces, positionError, positionOptions);

} else {
  alert("no support");
}
