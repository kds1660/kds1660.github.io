var worldArray = [];
var wrapper = document.getElementById('myWrapper');


function initArray(tabNumber) {

    for (var i = 0; i < tabNumber + 1; i++) {
        worldArray[i] = [];

        for (var j = 0; j < tabNumber + 1; j++) {

            if (i === 0 || i === tabNumber) {
                worldArray[i][j] = '#';
            } else {
                worldArray[i][j] = 0;
            }

            if (j === 0 || j === tabNumber) {
                worldArray[i][j] = '#';
            }
        }
    }
}

function visualWorld(fieldWidth) {
    this.fieldWidth = tabNumber + 1;
    this.myTable = document.createElement('table');
    this.myTable.setAttribute('id', 'myTab');

    for (var i = 0; i < this.fieldWidth; i++) {
        var newRow = this.myTable.insertRow(i);

        for (var j = 0; j < this.fieldWidth; j++) {
            var newCell = newRow.insertCell(j);
            var newDiv = document.createElement('div');
            if (typeof worldArray[i][j] === 'object' && worldArray[i][j].type === 'plant') {
                newDiv.classList.add('plant')
            }

            if (worldArray[i][j] === '#') {
                newDiv.classList.add('stone')
            }

            if (typeof worldArray[i][j] === 'object' && worldArray[i][j].type === 'vegetarians') {
                newDiv.classList.add('animal')
            }

            newCell.appendChild(newDiv);
        }
    }
    wrapper.appendChild(this.myTable);
}

function addObjects(tabNumber, number, name) {
    var obj = {};

    for (var i = 0; i < number; i++) {
        var x = Math.floor(Math.random() * tabNumber);
        var y = Math.floor(Math.random() * tabNumber);

        if (typeof worldArray[x][y] === 'object' || worldArray[x][y] === '#') {
            i--;
        } else {

            if (name === '*') {
                obj = new Plant;
            } else if (name === 'o') {
                obj = new Cow;
            }

            if (obj.setCoords) {
                worldArray[x][y] = obj;
            } else worldArray[x][y] = '#'
        }
    }
}

function world() {
    this.worldArray = worldArray;
    this.turnObjects = [];
    this.turn = function () {
        this.turnObjects = [];
        iter++;
        document.getElementById("checker").innerHTML=iter;

        for (var i = 0; i < this.worldArray.length; i++) {

            for (var j = 0; j < this.worldArray.length; j++) {
                if (typeof worldArray[i][j] === "object") {
                    worldArray[i][j].i = i;
                    worldArray[i][j].j = j;
                    this.turnObjects.push(worldArray[i][j]);
                }
            }
        }


        for (var i = 0; i < this.turnObjects.length; i++) {
            this.turnObjects[i].turn(this.turnObjects[i].i, this.turnObjects[i].j);

            if (this.turnObjects[i].action === 'grow' && this.turnObjects[i].direction) {
                this.turnObjects[i].energy-=50;
                var newDiv = document.createElement('div');

                if (this.turnObjects[i].type === 'plant') {
                    newDiv.classList.add('plant');
                    worldArray[this.turnObjects[i].direction.x][this.turnObjects[i].direction.y] = new Plant;
                } else {
                    worldArray[this.turnObjects[i].direction.x][this.turnObjects[i].direction.y] = new Cow;
                    newDiv.classList.add('animal');
                }
                document.getElementById('myTab').rows[this.turnObjects[i].direction.x].cells[this.turnObjects[i].direction.y].innerHTML = '';
                document.getElementById('myTab').rows[this.turnObjects[i].direction.x].cells[this.turnObjects[i].direction.y].appendChild(newDiv);
            }

            if (this.turnObjects[i].energy < 0 && this.turnObjects[i].direction) {
                document.getElementById('myTab').rows[this.turnObjects[i].i].cells[this.turnObjects[i].j].innerHTML = '';
                worldArray[this.turnObjects[i].i][this.turnObjects[i].j] = 0;

            } else if (this.turnObjects[i].action === 'move' && this.turnObjects[i].direction) {
                var destination = this.turnObjects[i].direction;
                var energy = this.turnObjects[i].energy;
                worldArray[this.turnObjects[i].i][this.turnObjects[i].j] = 0;
                worldArray[destination.x][destination.y] = new Cow;
                worldArray[destination.x][destination.y].energy = energy;

                var newDiv = document.createElement('div');
                newDiv.classList.add('animal');
                document.getElementById('myTab').rows[destination.x].cells[destination.y].appendChild(newDiv);
                document.getElementById('myTab').rows[this.turnObjects[i].i].cells[this.turnObjects[i].j].innerHTML = '';

            } else if (this.turnObjects[i].action === 'eat' && this.turnObjects[i].eatdestination) {
                var destination = this.turnObjects[i].eatdestination;
                var energy = this.turnObjects[i].energy;
                energy += 50;
                worldArray[this.turnObjects[i].i][this.turnObjects[i].j] = 0;
                worldArray[destination.x][destination.y] = new Cow;
                worldArray[destination.x][destination.y].energy = energy;

                var newDiv = document.createElement('div');
                newDiv.classList.add('animal');
                document.getElementById('myTab').rows[destination.x].cells[destination.y].innerHTML = '';
                document.getElementById('myTab').rows[destination.x].cells[destination.y].appendChild(newDiv);
                document.getElementById('myTab').rows[this.turnObjects[i].i].cells[this.turnObjects[i].j].innerHTML = '';
            }
        }
        this.turnObjects = [];
    }
}

