// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   style: "mapbox://styles/mapbox/streets-v12",
//   center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//   zoom: 9, // starting zoom
// });

// const marker1 = new mapboxgl.Marker()
//         .setLngLat(coordinates)
//         .addTo(map);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: "map",
	center: listing.geometry.coordinates,
	style: 'mapbox://styles/mapbox/standard',
	zoom: 9,
});

const marker1 = new mapboxgl.Marker({ color: "red" })
	.setLngLat(listing.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25}).setHTML(
			`<h3>${listing.title}</h3> <p>Exact location will be provided after booking.</p>`
		)
	)
	.addTo(map);
