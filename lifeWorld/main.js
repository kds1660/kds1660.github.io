var timer;
var tabNumber=25;
var wold;
var iter=0;
document.getElementById("play").style.display='none';

function startPause(chk) {

    if (chk) {
        timer=setInterval(wold.turn,300);
        event.target.style.display='none';
    }else if (timer) {
        clearInterval(timer);
        document.getElementById("buttonStart").style.display='';
    }
}

function generateWorld() {
    iter=0;
    document.getElementById("play").style.display='';
    document.getElementById("checker").innerHTML='';
    document.getElementById("myWrapper").innerHTML='';
    tabNumber = +document.getElementById("widhtHeigth").value;
    var stoneNumber = document.getElementById("stoneNumber").value||20;
    var plantsNumber = document.getElementById("plantsNumber").value||10;
    var animalNumber = document.getElementById("animalNumber").value||10;

    initArray(tabNumber);

    addObjects(tabNumber, stoneNumber, '#');
    addObjects(tabNumber, plantsNumber, '*');
    addObjects(tabNumber, animalNumber, 'o');
    wold = new world();
    new visualWorld(wold.worldArray);
}


