describe("Мир", function() {
    tabNumber = 25;
    stoneNumber = 20;
    plantsNumber = 10;
    animalNumber = 10;
    it("сетка создается", function() {
        initArray(tabNumber);
        return worldArray;
        var start = worldArray[0][0];
        var middle = worldArray[25][25];
        var end = worldArray[50][50];
        assert.equal(start, '#');
        assert.equal(middle, 0);
        assert.equal(end, '#');
    });

    it('обьекты размещаются', function () {
        addObjects(tabNumber, plantsNumber, '*');
        addObjects(tabNumber, animalNumber, 'o');
        var count = 0;
        for (var i = 0; i < tabNumber; i++) {
            for (var j = 0; j < tabNumber; j++) {
                if (typeof worldArray[i][j] === 'object') {count++}
            }
            }
        assert.equal(count , plantsNumber+animalNumber);
        });

    it('направления определяются', function () {

        var testCow = new Cow;
        testCow.setCoords(1,2);
        assert.equal(testCow.direction.n.x , 1);
        assert.equal(testCow.direction.e.y , 2);
    });

    it('растения никуда не торопятся', function () {

        var testPlant = new Plant;
        assert.equal(testPlant.action , 'stop');
    });

    it('животные двигаются', function () {

        var testCow2 = new Cow;
        assert.equal(testCow2.action , 'move');
    });

    it('животные растут', function () {

        var testCow3 = new Cow;
        testCow3.energy = 500;
        testCow3.setCoords(1,2);
        worldArray[testCow3.direction.n.x][testCow3.direction.n.x] = 0;
        testCow3.actionSelect();
        assert.equal(testCow3.action , 'grow');
    });
});
