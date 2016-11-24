function Direction(x, y) {
    this.x = x;
    this.y = y;
}

var directions = {}

function Animal() {
    this.direction = directions;
    this.type;
    this.energy = 100;
    this.position = {};
    this.direction = {};
    this.action = 'stop';
}


Animal.prototype.find = function () {
    if (Object.keys(this.direction).length === 0) {
        this.direction = 0;
    } else {

        for (key in this.direction) {
            if (worldArray[this.direction[key].x][this.direction[key].y] === '#') {
                delete this.direction[key];
            }
        }

        if (Object.keys(this.direction).length === 0) {
            this.direction = 0;
        }
    }
}

Animal.prototype.actionSelect = function () {
this.action='stop';
    if (this.type === 'plant') {

        if (this.energy < 500) this.energy += 50;

        if (this.energy > 200 && Object.keys(this.direction).length > 0) {
            this.action = 'grow';

            for (key in this.direction) {
                if (worldArray[this.direction[key].x][this.direction[key].y] !== 0) {
                    delete this.direction[key];
                }
            }
            if (Object.keys(this.direction).length === 0) this.direction = 0;
        }

        var randMove = Math.floor(Math.random() * (Object.keys(this.direction).length));
        var res = Object.keys(this.direction);

        if (this.action !== 'stop') {
            this.direction = this.direction[res[randMove]];
        } else this.direction = 0;


    } else if (this.type === 'vegetarians') {
       this.energy -= 10;

        if (Object.keys(this.direction).length > 0) {
            this.action = 'move';

            for (key in this.direction) {

                if (worldArray[this.direction[key].x][this.direction[key].y].type
                    &&worldArray[this.direction[key].x][this.direction[key].y].type==='plant') {
                    this.eatdestination={'x':this.direction[key].x,'y':this.direction[key].y}
                }

                if (worldArray[this.direction[key].x][this.direction[key].y] !== 0) {
                    delete this.direction[key];
                }
            }

           if (this.energy>100) {delete this.eatdestination}
            if (this.eatdestination)this.action='eat';

            if (Object.keys(this.direction).length === 0) this.direction = 0;

            var randMove = Math.floor(Math.random() * (Object.keys(this.direction).length));
            var res = Object.keys(this.direction);
            this.direction = this.direction[res[randMove]];

        }
        if (this.energy>100)this.action='grow';
    }
}

Animal.prototype.turn = function (i,j) {
    this.setCoords(i,j);
    this.find();
    this.actionSelect();
}


Animal.prototype.setCoords = function (x, y) {
    this.direction = directions;
    this.position = new Direction(x, y);
    this.direction.n = new Direction(x, y - 1);
    this.direction.nw = new Direction(x - 1, y - 1);
    this.direction.ne = new Direction(x + 1, y - 1);
    this.direction.w = new Direction(x - 1, y);
    this.direction.e = new Direction(x + 1, y);
    this.direction.s = new Direction(x, y + 1);
    this.direction.sw = new Direction(x - 1, y + 1);
    this.direction.se = new Direction(x + 1, y + 1);
}


Cow.prototype = Object.create(Animal.prototype);

function Cow() {
    Animal.call(this);
    this.type = 'vegetarians';
    this.action='move';
}

Plant.prototype = Object.create(Animal.prototype);

function Plant() {
    Animal.call(this);
    this.type = 'plant';
}


