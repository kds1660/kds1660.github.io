var winArray = [];
var tabNumber = 5;
var tabNumber = 5;
var winNumber = 3;
var itemNum = {zero: 0, cross: 1};


function initArray(tabNumber) {

    for (var i = 0; i < tabNumber; i++) {
        winArray[i] = [];

        for (var j = 0; j < tabNumber; j++) {
            winArray[i][j] = 0;
        }
    }
}

function initCrossCircle() {
    var cross = new CreateItem(itemNum.cross);
    cross.setDrag();
    var circle = new CreateItem(itemNum.zero);
    circle.setDrag();
    document.getElementsByClassName('circleFrame')[0].appendChild(circle.firstDiv);
    document.getElementsByClassName('crossFrame')[0].appendChild(cross.firstDiv);
}

new CreateField(tabNumber, winNumber);
initArray(tabNumber);
initCrossCircle();

function clearButton() {
    var dragStartText = "event.dataTransfer.setData('text/plain',event.target.id)";
    var elements = document.getElementsByClassName('clone');
    var circle1 = document.getElementById("firstYellowCircle");
    var cross1 = document.getElementById("firstYellowCross");
    var activeDetect = document.getElementsByClassName('active')[0];
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    //clear array
    initArray(tabNumber);

    if (activeDetect) activeDetect.classList.remove('active');

    circle1.setAttribute('ondragstart', dragStartText);
    cross1.setAttribute('ondragstart', dragStartText);
    circle1.setAttribute('draggable', 'true');
    cross1.setAttribute('draggable', 'true');
}




