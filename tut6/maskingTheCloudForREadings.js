var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');// Get the least cloudy image in 2015.

// Map a function over the Landsat 8 TOA collection to add an NDVI band.
var withNDVI = l8.map(function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
});


/*
// Create a chart.
var chart = ui.Chart.image.series({
  imageCollection: withNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'NDVI over time'});

// Display the chart in the console.
print(chart);

*/


//masking the variances due to cloouds and then calculating

var cloudlessNDVI = l8.map(function(image) {
  // Get a cloud score in [0, 100].
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');

  // Create a mask of cloudy pixels from an arbitrary threshold.
  var mask = cloud.lte(20);

  // Compute NDVI.
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');

  // Return the masked image with an NDVI band.
  return image.addBands(ndvi).updateMask(mask);
});

print(ui.Chart.image.series({
  imageCollection: cloudlessNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'Cloud-masked NDVI over time'}));




