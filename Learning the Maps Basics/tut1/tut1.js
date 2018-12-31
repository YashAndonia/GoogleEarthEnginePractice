 //Instantiate an image with the Image constructor.
var image = ee.Image('CGIAR/SRTM90_V4');
print('SRTM image',image);
// Zoom to a location.
Map.setCenter(-112.8598, 36.2841, 9); // Center on the Grand Canyon.

Map.addLayer(image, {min: 0, max: 3000, palette: ['blue', 'green', 'red']},'custom palette');