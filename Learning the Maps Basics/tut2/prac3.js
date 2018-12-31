// Load the SRTM image.
var srtm = ee.Image('CGIAR/SRTM90_V4');

// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm);


// Compute the mean elevation in the polygon.
//notice this is an auto function, plus the thing inside the function is a javascript object which follows the terms fo the function requirements.

var meanDict = srtm.reduceRegion({
  reducer: ee.Reducer.mean(),//type of statistice, here we ar3e getting the mean of the values in the hoghlight area
  geometry: geometry,
  scale: 90//1 pixel=how many meters irl
});


//Lastly, the return value of reduceRegion() is a dictionary in which keys are band names and values are the pixel statistics for the bands. The get() method on a dictionary returns the value corresponding to the key provided as an argument. In this case, the srtm image has one band, 'elevation', so the example code gets that statistic from the dictionary and prints it. 

// Get the mean from the dictionary and print it.
var mean = meanDict.get('elevation');
print('Mean elevation', mean);

var scale = srtm.projection().nominalScale();
print('SRTM scale in meters', scale);