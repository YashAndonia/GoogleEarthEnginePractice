// Load the SRTM image.
var srtm = ee.Image('CGIAR/SRTM90_V4');

// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm);

// Display the result.
Map.setCenter(-112.8598, 36.2841, 9); // Center on the Grand Canyon.
//Map.addLayer(slope, {min: 0, max :80, palette:['white','black']},  'slope');
// Get the aspect (in degrees).
var aspect = ee.Terrain.aspect(srtm);

// Convert to radians, compute the sin of the aspect.
var sinImage = aspect.divide(180).multiply(Math.PI).sin();

// Display the result.
Map.addLayer(sinImage, {min: -1, max: 1}, 'sin');