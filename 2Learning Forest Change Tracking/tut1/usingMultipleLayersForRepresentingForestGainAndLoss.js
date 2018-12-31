var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
Map.addLayer(gfc2014);

//for the year 2000:
Map.addLayer(gfc2014, {bands: ['treecover2000']}, 'treecover2000');

//vegetation=green,loss=red, gain=blue
Map.addLayer(
    gfc2014, {bands: ['last_b50', 'last_b40', 'last_b30']}, 'false color');
    
    
    //satellite data  default for loss, increase
    
    Map.addLayer(gfc2014, {
  bands: ['loss', 'treecover2000', 'gain'],
  max: [1, 255, 1]
}, 'forest cover, loss, gain');


//making the image a better quality, by assigning the pallete properly
//until now, colors were orange bcaus ethe red mixes iwth green
Map.addLayer(gfc2014.mask(gfc2014), {
  bands: ['treecover2000'],
  palette: ['000000', '00FF00'],
  max: 100
}, 'forest cover masked');


//setting different bands of tree gain etc to different images and representing iall together ass a combination of the bands.
var treeCover = gfc2014.select(['treecover2000']);
var lossImage = gfc2014.select(['loss']);
var gainImage = gfc2014.select(['gain']);

// Add the tree cover layer in green.
Map.addLayer(treeCover.updateMask(treeCover),
    {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover');

// Add the loss layer in red.
Map.addLayer(lossImage.updateMask(lossImage),
            {palette: ['FF0000']}, 'Loss');

// Add the gain layer in blue.
Map.addLayer(gainImage.updateMask(gainImage),
            {palette: ['0000FF']}, 'Gain');