var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
Map.addLayer(gfc2014);

//for the year 2000:
Map.addLayer(gfc2014, {bands: ['treecover2000']}, 'treecover2000');

//vegetation=green,loss=red, gain=blue
Map.addLayer(
    gfc2014, {bands: ['last_b50', 'last_b40', 'last_b30']}, 'false color');