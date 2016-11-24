var tabNumber = 25;
var stoneNumber = 20;
var plantsNumber = 10;
var animalNumber = 10;
initArray(tabNumber);

addObjects(tabNumber, stoneNumber, '#');
addObjects(tabNumber, plantsNumber, '*');
addObjects(tabNumber, animalNumber, 'o');

var wold = new world();
new visualWorld(wold.worldArray);
