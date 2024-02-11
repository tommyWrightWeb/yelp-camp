// Setting up Mapbox access token
mapboxgl.accessToken = mapToken;

// Creating a new map instance
const map = new mapboxgl.Map({
    container: 'map', // HTML element ID for the map container
    style: 'mapbox://styles/mapbox/light-v10', // Map style
    center: campground.geometry.coordinates, // Center coordinates [lng, lat]
    zoom: 10 // Zoom level
});

// Adding navigation control to the map
map.addControl(new mapboxgl.NavigationControl());

// Adding a marker to the map for the campground
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates) // Marker position
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Popup options
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>` // Popup content
            )
    )
    .addTo(map); // Adding the marker to the map
