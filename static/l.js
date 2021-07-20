// geojson from earthquake.usgs.gov website 
var quake_url = "/sqlmap"; 
  
d3.json(quake_url).then(function(response) {
    console.log(response);
    console.log(response[0].lat)
    var quakemarkers = []
    //set up a new marker for each item with a for loop
    for (var i = 0; i < response.length; i++) { 
        // Listing the coordinates 
        quakemarkers.push(
        // Add circles to map
        L.marker([response[i].long, response[i].lat])
        .bindPopup("<h1>" + response[i].university_name + "</h1>")
        );
    console.log(response[i].university_name)
    console.log([response[i].long, response[i].lat])
    var cityLayer = L.layerGroup(quakemarkers);
    }
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
        Universities: cityLayer
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


    