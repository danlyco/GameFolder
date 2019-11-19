import { Display } from './display.js'


class Observable {
    constructor () {
    }

    addListener (fn) {
    }

    // onchange
    onChange () {
        console.log('banana');
    }
}

class Positionable extends Observable {
    constructor (x, y) {
        super();
        this._x = x;
        this._y = y;
    }

    get x () { return this._x }
    set x (newVal) { this._x = newVal }

    get y () { return this._y }
    set y (newVal) { this._y = newVal }
}



class Tile extends Positionable {
    constructor (x, y, type) {
        super(x,y);
        this.tileTypes = [ 'Empty', 'Obstacle', 'Player', 'Escape' ];
        this._type = this.tileTypes[type];
    }

    set type (newVal) {
        this._type = newVal;
    }
    getPos () {
        return '' + this.x + ', '+ this.y;
    }
}



class Board {
    constructor (maxTiles) {
        this.tiles = [];
        let lineOfTiles = Math.floor(Math.sqrt(maxTiles));

        for ( let y = 0; y < lineOfTiles; ++y ) {
            for ( let x = 0; x < lineOfTiles; ++x ) {
                if ( Math.random() < 0.9 ) {
                    this.tiles.push(new Tile(x,y,0))
                }
                else {
                    this.tiles.push(new Tile(x,y,1))
                }
            }
        }
    }

    getTile (x,y) {
        for ( let elem of this.tiles) {
            if (elem.x == x && elem.y == y) {
                return elem;
            }
        }
    }
}



class Movable extends Positionable {
    constructor (x,y) {
        super(x,y);
        this.steps = [];
    }

    moveTop (val) {
        if ( this._y > 0 ) {
            this._y--;
            console.log(this);
        }
    }

    moveBottom (val) {
        if ( this._y < 6 ) {
            this._y++;
        }
    }

    moveLeft (val) {
        if ( this._x > 0 ) {
            this._x--;
        }
    }

    moveRight (val) {
        if ( this._x < 6 ) {
            this._x++;
        }
    }

}


// Character superclass

class Character extends Movable {
    constructor (x,y) {
        super(x,y);
        this._equipedItem = 0;
        this._movementPoint = 3;
}

    get movementPoint () { return this._movementPoint }
    set movementPoint (newVal) { this._movementPoint = newVal }

    get equipedItem () { return this._equipedItem }
    set equipedItem (newVal) { this._equipedItem = newVal }

    getTile(){
        return this.x + this.y * Math.floor(Math.sqrt(Game.board.tiles.length));
    }

    setTile(x,y){
        this.x = x;
        this.y = y;

    }

}




class Survivor extends Character {
    constructor (x,y) {
        super(x,y);

    }
}




class Chaser extends Character {
    constructor (x,y) {
        super(x,y);
        this.movementPoint = 2;

    }
}

// Logic

class Player {
    constructor (number, desiredChar) {
        this.number = number;
        if ( desiredChar == 1 ) {
            this.char = new Survivor(4,3);
        }
        else {
            this.char = new Chaser(2,1);
        }
    }
}

class Item {
    constructor (name, type, amount, targetChar) {
        this.itemsType = [ 'Damage', 'Healing', 'Mover', 'Boost' ];
        this.name = name;
        this.type = this.itemsType[type];
        this.amount = amount;
        this.targetChar = targetChar;
    }
}

class GameManager {
    constructor () {
        this.players = [
            new Player(1,1), new Player(2,2)
        ];
        this.items = [
            new Item( 'Machette', 0, 20, 2 ),
            new Item( 'Hachoir', 0, 10, 2 ),
            new Item( 'Piege', 0, 15, 2 ),
            new Item( 'Grappin', 2, 1, 2 ),
            new Item( 'Skate', 3, 1, 1 ),
            new Item( 'Lance-pierre', 2, 1, 1 ),
            new Item( 'Bandages', 1, 10, 1 ),
        ];
        this.turn = 1;
        this.board = new Board(49);
    }
} 
let Game = new GameManager();
export { Game }