function CreateItem(crossCirle) {
    var dragStartText = "event.dataTransfer.setData('text/plain',event.target.id)";

    this.circle = +!crossCirle;
    this.cross = crossCirle;

    this.firstDiv = document.createElement('div');

    if (this.cross) {
        this.firstDiv.id = "firstYellowCross";
        this.firstDiv.classList.add('cross')
    } else {
        this.firstDiv.id = "firstYellowCircle";
        this.firstDiv.classList.add('circle')
    }

    this.setDrag = function () {
        this.firstDiv.setAttribute('ondragstart', dragStartText);
        this.firstDiv.setAttribute('ondragstart', dragStartText);
        this.firstDiv.setAttribute('draggable', 'true');
    };

    this.removeDrag = function () {
        this.firstDiv.removeAttribute('ondragstart');
        this.firstDiv.removeAttribute('draggable');
        this.firstDiv.classList.add('clone');
    };

    function makeDroppable(e) {
        e.preventDefault();
    }

    return this;
}
