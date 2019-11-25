class Observable {
    constructor() {
        this._listeners = [];
    }

    initProperties() {
        for (let key of Object.keys(this)) {
            const value = this[key];
            if (['_listeners', 'dispatch'].includes(key)) continue;
            Object.defineProperty(this, key, {
                get: () => this[`_${key}`],
                set: (newValue) => {
                    this[`_${key}`] = newValue;
                    this.dispatch()
                }
            })

            if (value instanceof Observable) {
                this[key].onChange(this.dispatch.bind(this))
            }
        }
    }

    // onchange
    onChange(listener) {
        this._listeners.push(listener);
    }

    dispatch() {
        for (let listener of this._listeners) {
            if (typeof listener === 'function') listener(this)
        }
    }
}

class Positionable extends Observable {
    constructor(x, y) {
        super();
        this._x = x;
        this._y = y;
    }

    setTile(x, y) {
        this._x = x;
        this._y = y;
    }
}



class Tile extends Positionable {
    constructor(x, y) {
        super(x, y);
        this._hasPlayer = 0;
    }

    getPos() {
        return [this._x, this._y];
    }

    isObstacle() {
        if (this instanceof Obstacle) {
            return true;
        }
    }

    isEmpty() {
        if (this instanceof EmptyTile) {
            return true;
        }
    }

    hasPlayer() {
        for (let player of Game.players) {
            if (this._x == player.char._x && this._y == player.char._y) {
                return true;
            }
        }
    }
}

class EmptyTile extends Tile {
    constructor(x, y) {
        super(x, y);
        this._type = 'Empty';
        this._reachable = 1;
        this._hasItem = [0];
    }
    set reachable(newVal) {
        this._reachable = newVal;
    }

    get reachable() {
        return this._reachable;
    }
}

class Escape extends Tile {
    constructor(x, y) {
        super(x, y);
        this._type = 'Escape';
    }
}

class Obstacle extends Tile {
    constructor(x, y) {
        super(x, y);
        this._type = 'Obstacle';
        this._reachable = 0;
    }
}

class Barrel extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this._model = 'Barrel';
    }
}
class BarbedWire extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this._model = 'BarbedWire';

    }
}
class Woodbox extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this._model = 'Woodbox';

    }
}

class PlayerCase extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this._model = 'Barrel';

    }
}


class Board {
    constructor(maxTiles) {
        this.tiles = [];
        this.lineOfTiles = Math.floor(Math.sqrt(maxTiles));
        for (let y = 0; y < this.lineOfTiles; ++y) {
            for (let x = 0; x < this.lineOfTiles; ++x) {
                let randomTileGenerator = Math.random();
                if (randomTileGenerator < 0.8) {
                    this.tiles.push(new EmptyTile(x, y))
                } else {
                    let randomObstacleGenerator = Math.random();
                    
                    if (randomObstacleGenerator < 0.33) {
                        this.tiles.push(new Barrel(x, y))
                    } else if (randomObstacleGenerator < 0.66) {
                        this.tiles.push(new BarbedWire(x, y))

                    } else if (randomObstacleGenerator <= 1) {
                        this.tiles.push(new Woodbox(x, y))
                    }
                }
            }
        }
    }

    getTile(x, y) {
        for (let elem of this.tiles) {
            if (elem._x == x && elem._y == y) {
                return elem;
            }
        }
    }

}



class Movable extends Positionable {
    constructor(x, y) {
        super(x, y);
        this.steps = [];
    }

    move(x, y) {
        console.info(this._x);
        console.info(x);
        if (this._x != x) {
            this.movementPoint -= Math.abs((x - this._x));
            console.log('PM :' + this.movementPoint);
        } else if (this._y != y) {
            this.movementPoint -= Math.abs((y - this._y));

        }
        this.setTile(x, y)
    }

}


// Character superclass

class Character extends Movable {
    constructor(x, y) {
        super(x, y);
        this._equipedItem = {}; 
        this.initProperties();
    }

    get movementPoint() {
        return this._movementPoint
    }
    set movementPoint(newVal) {
        this._movementPoint = newVal
    }

    get equipedItem() {
        return this._equipedItem
    }
    set equipedItem(newVal) {
        this._equipedItem = Game.items[newVal];
    }

    getTile() {
        return this._x + (this._y * Math.floor(Math.sqrt(Game.board.tiles.length)));

    }

    setTile(x, y) {
        if (this._x != undefined && this._y != undefined)
            Game.board.getTile(this._x, this._y)._hasPlayer = 0;
        super.setTile(x, y);
        let newTile = Game.board.getTile(x, y);
        newTile._hasPlayer = 1;
        if(newTile._hasItem[0] == 1){
            let item = Game.items[newTile._hasItem[1]];
            const charType = [Survivor, Chaser];
            if(this instanceof charType[item.targetChar - 1]){
                this.equipItem(newTile._hasItem[1]);
                newTile._hasItem = [0];
                console.info(this.equipedItem);
            }
        }

    }

    move(x, y) {
        super.move(x, y);
        this.setTile(x, y);
    }

    equipItem(newItem){
        this.equipedItem = newItem;
    }
}




class Survivor extends Character {
    constructor(x, y) {
        super(x, y);
        this._movementPoint = 3;
        this._equipedItem = {name: 'Poings'}; 
        this._health = 50;
    }

}




class Chaser extends Character {
    constructor(x, y) {
        super(x, y);
        this._movementPoint = 2;
        this._equipedItem = {name: 'Planche'}; 

    }
}

// Logic

class Player {
    constructor(number, desiredChar) {
        this.number = number;
        if (desiredChar == 1) {
            this.char = new Survivor(4, 3);
        } else {
            this.char = new Chaser(2, 1);
        }
    }
}

class Item {
    constructor(name, type, amount, targetChar) {
        this.itemsType = ['Damage', 'Healing', 'Mover', 'Boost'];
        this.name = name;
        this.type = this.itemsType[type];
        this.amount = amount;
        this.targetChar = targetChar;
        switch (type) {
            case 0:
                this.desc = `Occasionne ${this.amount} de dommages.`;
                break;
            case 1:
                this.desc = `Soigne ${this.amount} de points de vie.`;
                break;
            case 2:
                switch (targetChar) {
                    case 1:
                        this.desc = `Repousse de ${this.amount} case.`;
                        break;
                    case 2:
                        this.desc = `Attire de ${this.amount} case.`;
                        break;
                    default:
                        console.error('Le personnage ciblé est incorrect');
                        break;
                };
                break;
            case 3:
                this.desc = `Augmente de ${this.amount} les points de mouvement du personnage.`
                break;
            default:
                console.error('Le type d\'item est incorrect');
        }
    }
}

class GameManager {
    constructor() {
        this.players = [
            new Player(1, 1), new Player(2, 2)
        ];
        this.items = [
            new Item('Machette', 0, 20, 2),
            new Item('Hachoir', 0, 10, 2),
            new Item('Piege', 0, 15, 2),
            new Item('Grappin', 2, 1, 2),
            new Item('Skate', 3, 1, 1),
            new Item('Lance-pierre', 2, 1, 1),
            new Item('Bandages', 1, 10, 1),
        ];
        this.turn = 1;
        this.totalTurn = 0;
        this.board = new Board(54);
        this.activePlayer = 0;
        
    }

    playerSpawn() {
        for (let elem of this.players) {
            let randomTile = Math.floor(Math.random() * this.board.tiles.length);
            while (this.board.tiles[randomTile].reachable === 0 || this.board.tiles[randomTile] instanceof Obstacle) {
                randomTile = Math.floor(Math.random() * this.board.tiles.length);
            }
            console.info(this.board.tiles[randomTile].reachable);
            elem.char.setTile(this.board.tiles[randomTile].getPos()[0], this.board.tiles[randomTile].getPos()[1]);
            this.board.tiles[randomTile].reachable = 0;

        }
    }

    itemSpawn() {
        for (let i = 0; i < 8; ++i) {
            let randomTile = Math.floor(Math.random() * this.board.tiles.length);
            while (this.board.tiles[randomTile] instanceof Obstacle) {
                randomTile = Math.floor(Math.random() * this.board.tiles.length);
            }
            while (this.board.tiles[randomTile]._hasPlayer == 1) {
                randomTile = Math.floor(Math.random() * this.board.tiles.length);
            }

            let randomItem = Math.floor(Math.random() * this.items.length);
            this.board.tiles[randomTile]._hasItem = [1, randomItem];
        }
    }

    nextTurn() {
        // TODO select first player based on character
        // set active player each turn
        // first player is the one with Adam
        this.turn++;
        if (this.turn % 2 == 0) {
            this.totalTurn = turn / 2;
        }
    }

    getPossibleMoves() {
        this.removePossibleMoves();
        let activePlayerChar = this.players[this.activePlayer].char;
        this.possibleBottomMovesTiles = [];
        this.possibleTopMovesTiles = [];
        this.possibleLeftMovesTiles = [];
        this.possibleRightMovesTiles = [];
        this.possibleMovesIterator = [this.possibleBottomMovesTiles, this.possibleRightMovesTiles, this.possibleLeftMovesTiles, this.possibleTopMovesTiles];
        for (let elem of this.possibleMovesIterator) {
            for (let i = 1; i <= activePlayerChar.movementPoint; i++) {
                if (elem[i - 1] instanceof Obstacle || elem[i - 2] instanceof Obstacle)
                    continue;
                if (elem[i - 1] instanceof EmptyTile && elem[i - 1]._hasPlayer == 1 || elem[i - 2] instanceof EmptyTile && elem[i - 2]._hasPlayer == 1)
                    continue;
                switch (elem) {
                    case this.possibleBottomMovesTiles:
                        elem[i] = this.board.getTile(activePlayerChar._x, activePlayerChar._y + i);
                        break;
                    case this.possibleTopMovesTiles:
                        elem[i] = this.board.getTile(activePlayerChar._x, activePlayerChar._y - i);
                        break;
                    case this.possibleLeftMovesTiles:
                        elem[i] = this.board.getTile(activePlayerChar._x - i, activePlayerChar._y);
                        break;
                    case this.possibleRightMovesTiles:
                        elem[i] = this.board.getTile(activePlayerChar._x + i, activePlayerChar._y);
                        break;
                }
            }
        }
        // for (let i = 1; i <= activePlayerChar.movementPoint; i++){
        //     if( this.possibleBottomMovesTiles[i-1] instanceof Obstacle || this.possibleBottomMovesTiles[i-2] instanceof Obstacle)
        //         continue;
        //         this.possibleBottomMovesTiles[i] = this.board.getTile(activePlayerChar._x, activePlayerChar._y + i);
        // }
        // for (let i = 1; i <= activePlayerChar.movementPoint; i++){
        //     if( this.possibleTopMovesTiles[i-1] instanceof Obstacle || this.possibleTopMovesTiles[i-2] instanceof Obstacle)
        //         continue;
        //         this.possibleTopMovesTiles[i] = this.board.getTile(activePlayerChar._x, activePlayerChar._y - i);
        // }
        // for (let i = 1; i <= activePlayerChar.movementPoint; i++){
        //     if( this.possibleRightMovesTiles[i-1] instanceof Obstacle || this.possibleRightMovesTiles[i-2] instanceof Obstacle)
        //         continue;
        //         this.possibleRightMovesTiles[i] = this.board.getTile(activePlayerChar._x + i, activePlayerChar._y);
        // }
        // for (let i = 1; i <= activePlayerChar.movementPoint; i++){
        //     if( this.possibleLeftMovesTiles[i-1] instanceof Obstacle || this.possibleLeftMovesTiles[i-2] instanceof Obstacle)
        //         continue;
        //         this.possibleLeftMovesTiles[i] = this.board.getTile(activePlayerChar._x - i, activePlayerChar._y);
        // }
        this.possibleMovesTiles = [...this.possibleBottomMovesTiles, ...this.possibleLeftMovesTiles, ...this.possibleRightMovesTiles, ...this.possibleTopMovesTiles];

        for (let tile of this.possibleMovesTiles) {
            if (tile instanceof EmptyTile)
                if (tile._hasPlayer != 1) {
                    tile.reachable = 1;
                }
        };
    }

    removePossibleMoves() {
        for (let tile in this.board.tiles) {
            if (this.board.tiles[tile].reachable == 1) {
                this.board.tiles[tile].reachable = 0;
            }
        }
    }
}
let Game = new GameManager();
export {
    Game
}