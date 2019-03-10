

window.onload = init;

let view = {
    displayMessage: function (msg) {
        let massageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
};

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,
    ships: [{locations: ["10", "11", "12"], hits: ["", "", ""]},
            {locations: ["24", "34", "44"], hits: ["", "", ""]},
            {locations: ["06", "16", "26"], hits: ["", "", ""]}],
    fire: function (guess) {
        for (i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!!!");
                if (this.isSunk(ship)){
                    view.displayMessage("Корабль потоплен");
                    this.shipSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed");
        return false;
    },
    isSunk: function(ship){
        for (i = 0; i < this.shipLength; i++){
            if (ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true
    }
};

let controller = {
    guesses: 0,
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location){
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipSunk === model.numShips){
                view.displayMessage("Потоплены все коробли, выстрелов произведено: " + this.guesses);

            }
        }
    }
};

function parseGuess(guess){
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2){
        view.displayMessage("ERR! неверные значения (много параметров)");
    } else {
        let firstChar = guess.charAt(0).toUpperCase();
        let row = alphabet.indexOf(firstChar);
        console.log(row);
        let column = guess.charAt(1);
        console.log(column);
        if (isNaN(row) || isNaN(column)){
            view.displayMessage("ERR! неверные значения (ошибочный параметры)");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
            view.displayMessage("ERR данный выходят за пределы поля!")
        } else {
            console.log(row + column);
            return row + column;
        }
        return null;
    }
}

function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;

    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}
function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
}
function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13){
        fireButton.click();
        return false;
    }
}

/*controller.processGuess("A0");
controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");*/

/*model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");
view.displayMessage("Tap tap");
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");*/





























