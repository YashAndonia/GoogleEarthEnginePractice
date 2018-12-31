// Load the SRTM image.
var srtm = ee.Image('CGIAR/SRTM90_V4');

// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm);

// Display the result.
Map.setCenter(-112.8598, 36.2841, 9); // Center on the Grand Canyon.
Map.addLayer(slope, {min: 0, max :80, palette:['white','black']},  'slope');