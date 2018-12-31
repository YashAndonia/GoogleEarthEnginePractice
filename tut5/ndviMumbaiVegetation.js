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
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');

// Display the result.
Map.centerObject(image, 9);
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI image');

/* OR YOU DO THIS:
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
*/