var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var spatialFiltered = l8.filterBounds(geometry);
print('spatialFiltered', spatialFiltered);

var temporalFiltered = spatialFiltered.filterDate('2015-01-01', '2015-12-31');
print('temporalFiltered', temporalFiltered);
// This will sort from least to most cloudy.
var sorted = temporalFiltered.sort('CLOUD_COVER');

// Get the first (least cloudy) image.
var scene = ee.Image(sorted.first());
Map.centerObject(scene, 9);
Map.addLayer(scene, {}, 'default RGB');
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(scene, visParams, 'true-color composite');

//results in viewing of all the clouds!
var landsat2016 = l8.filterDate('2016-01-01', '2016-12-31');
Map.addLayer(landsat2016, visParams, 'l8 collection');//