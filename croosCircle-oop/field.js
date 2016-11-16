function CreateField(fieldWidth, itemsToWin) {
    var wrapper = document.getElementById('myWrapper');
    this.itemsToWin = itemsToWin || 3;
    this.fieldWidth = fieldWidth || 3;
    this.myTable = document.createElement('table');
    this.myTable.setAttribute('id', 'myTab');

    for (var i = 0; i < this.fieldWidth; i++) {
        var newRow = this.myTable.insertRow(i);

        for (var j = 0; j < this.fieldWidth; j++) {
            var newCell = newRow.insertCell(j);
            newCell.innerHTML = '<div class="box"></div>';
            newCell.ondrop = function (event) {
                dropImg(event)
            };
            newCell.ondragover = function (event) {
                event.preventDefault(event);
                event.preventDefault();

                makeDroppable(event)
            };

        }
    }

    dropImg = function (event) {
        event.preventDefault();
        //prevent adding element in box, if it already have element
        var data = event.dataTransfer.getData('text/plain');
        var moveElement = document.getElementById(data);
        var boxArea = event.target;
        var curCell = boxArea.parentNode.cellIndex;
        var curRow = boxArea.parentNode.parentNode.rowIndex;
        var curElement;

        if (data === 'firstYellowCircle') {
            curElement = new CreateItem(itemNum.zero);
            selectNextElement('firstYellowCross', 'firstYellowCircle');
        }

        if (data === 'firstYellowCross') {
            curElement = new CreateItem(itemNum.cross);
            selectNextElement('firstYellowCircle', 'firstYellowCross');
        }

        insertElement(event.target);

        winArray[curRow][curCell] = detectElementToArray(curElement);
        checkWin(winArray);

        function insertElement(target) {

            if (target.className === 'box' && moveElement) {

                for (var i = 1; i < tabNumber * tabNumber; i++) {

                    if (!document.getElementById(data + i)) {
                        curElement.firstDiv.id = curElement.firstDiv.id + i;
                        break;
                    }
                }

                curElement.removeDrag();
                boxArea.appendChild(curElement.firstDiv);
                curElement.firstDiv.classList.add('clone');
            }
        }

        function detectElementToArray() {

            if (curElement) {
                if (curElement.circle) {
                    return 'circle';
                } else {
                    return 'cross';
                }
            }

            return 0;
        }

        function selectNextElement(activate, deactivate) {
            var newDrag = "event.dataTransfer.setData('text/plain',event.target.id)";
            activate = document.getElementById(activate);
            deactivate = document.getElementById(deactivate);
            deactivate.parentNode.classList.remove('active');
            activate.parentNode.classList.add('active');
            deactivate.removeAttribute('ondragstart');
            deactivate.removeAttribute('draggable');
            activate.setAttribute('ondragstart', newDrag);
            activate.setAttribute('draggable', 'true');
        }
    };

    function checkWin(arrayElement) {

        function gorizontWin() {

            for (var i = 0; i < tabNumber; i++) {
                var tempGorizontal = 1;

                for (var j = 0; j < tabNumber; j++) {

                    if (arrayElement[i][j] === arrayElement[i][j + 1] && typeof arrayElement[i][j] == 'string') {
                        tempGorizontal++;

                        if (tempGorizontal === winNumber) {
                            alert(arrayElement[i][j] + ' WIN');
                            clearButton();
                        }
                    } else {
                        tempGorizontal = 1;
                    }
                }
            }
        }

        function verticalWin() {

            for (var i = 0; i < tabNumber; i++) {
                var tempVertical = 1;

                for (var j = 0; j < tabNumber; j++) {

                    if (j + 1 < tabNumber && arrayElement[j][i] === arrayElement[j + 1][i] && typeof arrayElement[j][i] == 'string') {
                        tempVertical++;

                        if (tempVertical === winNumber) {
                            alert(arrayElement[j][i] + ' WIN');
                            clearButton();
                        }
                    } else {
                        tempVertical = 1;
                    }
                }
            }
        }

        function diagonalWin(direction) {
            for (var i = 0; i < tabNumber; i++) {
                var tempDiagonal = 1;

                for (var j = 0; j < tabNumber; j++) {

                    for (var k = 1; k < tabNumber - 1; k++) {
                        var z = k * direction;

                        if (j + z >= 0 && i + Math.abs(z) < tabNumber && (z < 0 || (j + z) < tabNumber ) &&
                            arrayElement[i][j] === arrayElement[i + Math.abs(z)][j + z] &&
                            typeof arrayElement[i + Math.abs(z)][j + z] == 'string') {
                            tempDiagonal++;

                            if (tempDiagonal === winNumber) {
                                alert(arrayElement[i][j] + ' WIN');
                                clearButton();
                            }
                        } else {
                            tempDiagonal = 1;
                        }
                    }
                }
            }
        }

        diagonalWin(1);
        diagonalWin(-1);
        gorizontWin();
        verticalWin();
    }

    function makeDroppable(e) {
        e.preventDefault();
    }


    return wrapper.appendChild(this.myTable);

}