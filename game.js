class GameManager {
    constructor () {
        this.players = [];
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

class Observable {
    
    constructor () {
        for ( let key in this ) {
            Object.defineProperty ( this, key, {
                get: function () { return this.key },
                set: function (newVal) { this.key = newVal; this.onChange() }
            } );
        }
    }

    // onchange
    onChange () {
        Display.refresh();
    }

}

class Positionable extends Observable {
    constructor ({x, y}) {
        this._x = x;
        this._y = y;
    }
}

class Tile extends Positionable {
    constructor (x, y, type) {
        super(x,y);
        this._type = type;
    }

    get position () {
        return { x: this._x, y: this._y}
    }

}

class Board {
    constructor (maxTiles) {
        this.tiles = [];
        let lineOfTiles = Math.floor(Math.sqrt(maxTiles));
        for ( let y = 0; y < lineOfTiles; ++y ) {
            for ( let x = 0; x < lineOfTiles; ++x ) {
                this.tiles.push(new Tile(x,y,0))
            }
        }
    }

    getTile (x,y) {
        for ( let elem of this.tiles) {
            if (elem._x == x && elem._y == y) {
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

    }

    moveBottom (val) {

    }

    moveLeft (val) {

    }

    moveRight (val) {

    }

}

class Character extends Movable {
    constructor (x,y) {
        super(x,y);
        this.equipedItem = 0;
        this.movementPoint = 3;
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

class Player {
    constructor (number, char) {
        this.number = number;
        if ( char == 1 ) {
            this.char = new Survivor(x,y);
        }
        else {
            this.char = new Chaser(x,y);
        }
    }
}

class Item {
    constructor (name, type, amount, targetChar) {
        this.itemsType = [ 'Damage', 'Healing', 'Mover', 'Boost' ];
        this.name = name;
        this.type = itemsType[type];
        this.amount = amount;
        this.targetChar = targetChar;
    }
}
