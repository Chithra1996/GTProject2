// geojson from earthquake.usgs.gov website 
var quake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"; 
  
d3.json(quake_url).then(function(response) {
    console.log(response);
    console.log(response.features);
    var quakemarkers = []
    //set up a new marker for each item with a for loop
    for (var i = 0; i < response.features.length; i++) { 
        var location = response.features[i].geometry; 
        var properties = response.features[i].properties;
        var color = "";
        if (location) { //and if you can unfurl location you pick the coordinates
        // Conditionals for earthquake depth
            if (location.coordinates[2] >= 90) {
                color = "#FF0D0D";
            }
            else if (location.coordinates[2] <= 89 && location.coordinates[2] >= 70) {
                color = "#FF4E11";
            }
            else if (location.coordinates[2] <= 69 && location.coordinates[2] >= 50) {
                color = "#FF8E15";
            }
            else if (location.coordinates[2] <= 49 && location.coordinates[2] >= 30) {
                color = "#FAB733";
            }
            
            else if (location.coordinates[2] <= 29 && location.coordinates[2] >= 10) {
                color = "#ACB334";
            }
            else {
                color = "#69B34C";
            }
        // Listing the coordinates 
        quakemarkers.push(
        // Add circles to map
        L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            color: "black",
            fillColor: color,
            // Adjust radius by 
            radius: properties.mag * 5
        }).bindPopup("<h1>" + properties.place + "</h1> <hr> <h3>Magnitude: " + properties.mag + "</h3>")
        );
        }
    }
    var cityLayer = L.layerGroup(quakemarkers);
    // Adding tile layer
    
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Only one base layer can be shown at a time
    var baseMaps = {
        Grayscale: light,
        Dark: dark
        };
    // Overlays that may be toggled on or off
    var overlayMaps = {
        Earthqueake: cityLayer
        };
    var myMap = L.map("map", {
        center: [40.7, -110],
        zoom: 6.2,
        layers:[light, cityLayer]
    });
    
    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    
    

});


    