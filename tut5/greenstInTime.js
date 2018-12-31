var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');// Get the least cloudy image in 2015.
var image = ee.Image(
  l8.filterBounds(point)
    .filterDate('2015-01-01', '2015-12-31')
    .sort('CLOUD_COVER')
    .first()
);

// Compute the Normalized Difference Vegetation Index (NDVI).
var nir = image.select('B5');
var red = image.select('B4');
var ndvi =image.normalizedDifference(['B5', 'B4']).rename('NDVI');

// Display the result.
Map.centerObject(image, 9);
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI image');



//functin for the NDVI thing
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};

// Test the addNDVI function on a single image.
var ndvi = addNDVI(image).select('NDVI');


var withNDVI = l8.map(addNDVI);




//finding the greenest part:
// Make a "greenest" pixel composite.
var greenest = withNDVI.qualityMosaic('NDVI');

// Display the result.
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(greenest, visParams, 'Greenest pixel composite');