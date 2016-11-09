function MainMenu() {
    var thisForMain = this;
    this.inputText = document.getElementById('myInput').value;

    this.CreateElementFactory = function () {
        prepareCheckBox.call(this);
        prepareAddItem.call(this);
        prepareDelItem.call(this);
        prepareEditItem.call(this);
        prepareRecycle.call(this);
        prepareSpan.call(this);
        prepareUpDown.call(this);

        function prepareCheckBox() {
            firstChekBox = document.createElement("input");
            firstChekBox.classList.add('chekBox');
            firstChekBox.type = 'checkbox';
            this.firstChekBox = firstChekBox;
        }

        function prepareAddItem() {
            firstDiv = document.createElement("div");
            firstDiv.classList.add('addItem');
            firstDiv.onclick = function () {
                addSecondInput(event)
            };
            this.firstDiv = firstDiv;
        }

        function prepareDelItem() {
            secondDiv = document.createElement("div");
            secondDiv.classList.add('removeItem');
            secondDiv.onclick = function () {
                var targElem = event.target.parentNode.lastChild.lastChild;
                var delElem = event.target.parentNode.lastChild;

                if ((targElem) && (targElem.classList.contains('second')
                    || targElem.classList.contains('third'))) {
                    delElem.removeChild(delElem.lastChild);
                }
            };
            this.secondDiv = secondDiv;
        }


        function prepareEditItem() {
            thirdDiv = document.createElement("div");
            thirdDiv.classList.add('editItem');
            this.thirdDiv = thirdDiv;
        }

        function prepareRecycle() {
            closediv = document.createElement("div");
            closediv.classList.add('close');
            closediv.onclick = function () {
                var div = event.target.parentElement;
                div.style.opacity = '1';
                var id = setInterval(function () {
                    frameOpacity(id, div, 0)
                }, 40);
            };
            this.closediv = closediv;
        }

        function prepareSpan() {
            firstSpan = document.createElement("span");
            firstSpan.innerHTML = thisForMain.inputText;
            this.firstSpan = firstSpan;
        }

        function prepareUpDown() {
            //вверх
            fourthDivTop = document.createElement("a");
            fourthDivTop.classList.add('scrollTop');
            fourthDivTop.onclick = function () {
                thisForMain.upDownElement(event)
            };

            //вниз
            fourthDivBottom = document.createElement("a");
            fourthDivBottom.classList.add('scrollBottom');
            fourthDivBottom.onclick = function () {
                thisForMain.upDownElement(event)
            };

            //контейнер вверх/вниз
            fourthDiv = document.createElement("div");
            fourthDiv.classList.add('topBottom');

            this.fourthDivTop = fourthDivTop;
            this.fourthDivBottom = fourthDivBottom;
            this.fourthDiv = fourthDiv;
        }

        //вложенный UL
        this.firstUL = document.createElement("ul");

        function addSecondInput(event) {
            var secondInput = document.getElementById('addSecondItem');

            if (!secondInput) {
                event = event.target.parentNode;
                var max = 17;

                if (event.classList.contains('second')) max = 9;
                createSecondElement();
            } else {
                secondInput.parentNode.removeChild(secondInput);
            }

            function createSecondElement() {
                //создать вложенный элемент ввода
                var firstDiv = document.createElement("div");
                firstDiv.id = 'addSecondItem';
                var secondFocus = firstDiv.appendChild(TextForSecondElement(max));
                firstDiv.appendChild(buttonForSecondElement());
                event.appendChild(firstDiv);
                secondFocus.focus();
                secondFocus.onkeyup = function (event) {

                    if (event.keyCode === 13) {
                        document.getElementById('addSecondButton').onclick(event)
                    }
                }
            }

            function TextForSecondElement(max) {
                //поле ввода вложенного
                var firstInput = document.createElement("input");
                firstInput.type = 'text';
                firstInput.id = 'secondInput';
                firstInput.onkeyup = function maxInputSize(event) {

                    if (event.target.value.length > max) {
                        event.target.value = event.target.value.substring(0, max);
                    }
                };
                return firstInput;

            }

            function buttonForSecondElement() {
                //кнопка добавить вложенного
                secondInput = document.createElement("input");
                secondInput.type = 'button';
                secondInput.value = 'add';
                secondInput.id = 'addSecondButton'
                secondInput.onclick = function secondInputCreateElem(event) {
                    var inputText = document.getElementById('secondInput').value;

                    if (inputText === '') {
                        alert('Не введено содержимое')
                    } else {

                        if (event.target.parentNode.parentNode.classList.contains('first')) {
                            var newElement = new thisForMain.CreateElementFactory();
                            newElement = thisForMain.insertToDom.call(newElement, 'second');
                            addEvent(newElement);
                        }
                        else if (event.target.parentNode.parentNode.classList.contains('second')) {
                            var newElement = new thisForMain.CreateElementFactory();
                            newElement = thisForMain.insertToDom.call(newElement, 'third');
                            addEvent(newElement);
                        }

                        newElement.getElementsByTagName('span')[0].innerHTML = inputText;

                        var id = setInterval(function () {
                            frameOpacity(id, newElement, 1)
                        }, 40);

                        if (document.getElementById('secondInput')) {
                            event.target.parentNode.parentNode.removeChild(document.getElementById('addSecondItem'));
                        }
                    }
                };
                return secondInput;
            }
        }
    };

    this.insertToDom = function (main) {
        var target = event.target.parentNode.parentNode;
        firstLi = document.createElement("li");
        firstLi.classList.add(main);
        firstLi.style.opacity = '0';
        this.fourthDiv.appendChild(this.fourthDivTop);
        this.fourthDiv.appendChild(this.fourthDivBottom);
        delete this.fourthDivTop;
        delete this.fourthDivBottom;

        if (main === 'third') {
            delete this.firstDiv;
            delete this.secondDiv;
        }

        for (elementPart in this) {
            firstLi.appendChild(this[elementPart]);
            delete this[elementPart];
        }

        if (target.classList.contains('first') || target.classList.contains('second')) target = target.getElementsByTagName('ul')[0];
        return target.appendChild(firstLi);
    };

    this.upDownElement = function (event) {
        var lockElem = event.target.parentNode.parentNode;

        if (lockElem.previousSibling && event.target.classList.contains('scrollTop')) {
            targetElement = lockElem;
            lockElem = lockElem.previousSibling;
        } else if (lockElem.nextSibling && event.target.classList.contains('scrollBottom')) {
            var targetElement = lockElem.nextSibling;
        }

        if (targetElement && lockElem && lockElem.classList && !lockElem.classList.contains('removeItem')) {
            var id = setInterval(frame, 20);
            var pos1 = 0;

            function frame() {

                if (pos1 < 39) {
                    lockElem.style.top = +pos1 + 'px';
                    targetElement.style.top = -pos1 + 'px';
                    pos1++;
                } else {
                    lockElem.style.top = -0 + 'px';
                    targetElement.style.top = +0 + 'px';
                    clearInterval(id);
                    lockElem.parentNode.insertBefore(targetElement.parentNode.removeChild(targetElement), lockElem);
                }
            }
        }
    }

    function addEvent(node) {
        var listEdit = node.getElementsByClassName('editItem');
        var thisSpan = listEdit[0].parentElement.getElementsByTagName('span')[0];
        var chek = node.getElementsByTagName('input');

        chek[0].addEventListener('click', function () {
            chek[0].parentNode.classList.toggle('checked');

            for (var i = 0; i < chek.length; i++) {

                if (chek[i].checked !== chek[0].checked) {
                    chek[i].parentNode.classList.toggle('checked');
                }
                chek[i].checked = chek[0].checked;
            }
        });

        node.addEventListener('click', function (event) {
            event.cancelBubble = true;

            function addEvents(event) {
                var chek = event.target.getElementsByTagName('input');

                if (event.target.classList.contains('first')
                    || event.target.classList.contains('second')
                    || event.target.classList.contains('third')) {
                    chek[0].checked = !chek[0].checked;
                    chek[0].parentNode.classList.toggle('checked');

                    for (var i = 0; i < chek.length; i++) {

                        if (chek[i].checked !== chek[0].checked) {
                            chek[i].parentNode.classList.toggle('checked');
                        }
                        chek[i].checked = chek[0].checked;
                    }
                }
            }

            addEvents(event);
        });

        //редактирование имени по щелчку на нем
        thisSpan.addEventListener('click', function (event) {
            (event.target.isContentEditable) ? event.target.contentEditable = false : event.target.contentEditable = true;
            event.target.focus();
        });

        node.addEventListener('keypress', function (event) {
            var max;

            if (event.target.parentNode.classList.contains('first')) {
                max = 27;
            } else if (event.target.parentNode.classList.contains('second')) {
                max = 17;
            } else max = 8;

            if (event.keyCode === 13) {
                event.preventDefault();
                event.target.contentEditable = false;
            }

            if (event.target.innerHTML.length > max) {
                event.preventDefault();
            }
        });

        //кнопка редактирования
        listEdit[0].addEventListener('click', function (event) {

            if (event.target.parentNode.classList.contains('first')) {
                chek.checked = false;
                event.target.parentNode.classList.remove('checked');
            }

            (thisSpan.isContentEditable) ? thisSpan.contentEditable = false : thisSpan.contentEditable = true;
            thisSpan.focus();
        });
    }

    function frameOpacity(interval, element, upDown) {
        var step;

        if (upDown === 1) {
            step = 0.1
        } else {
            step = -0.1
        }

        if ((upDown) && +element.style.opacity > upDown || (!upDown) && +element.style.opacity < upDown) {
            clearInterval(interval);

            if (!upDown) element.parentNode.removeChild(element);

        } else {
            element.style.opacity = +element.style.opacity + step;
        }
    }

    if (this.inputText === '') {
        alert('Не введено содержимое')
    } else {
        var newElement = new this.CreateElementFactory();
        newElement = this.insertToDom.call(newElement, 'first');

        var id = setInterval(function () {
            frameOpacity(id, newElement, 1)
        }, 40);
        addEvent(newElement);
        document.getElementById('myInput').value = '';
    }

}
function mainEnter(event) {
    if (event.keyCode === 13) {
        new MainMenu()
    }
}


