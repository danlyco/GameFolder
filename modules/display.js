import { Game } from './game.js'
import { Event } from './event.js'

class DisplayManager {
    constructor() {
       
    }

    init() {
        let $gameBoard = $('tbody');
        let numberRowCol = Math.floor(Math.sqrt(Game.board.tiles.length));
        for (let y = 0; y < numberRowCol; ++y) {
            let $row = $('<tr></tr>').css({
                transform: 'translateY(' + (19 * y) + 'px)'
            }).addClass('row-' + y).appendTo($gameBoard);
            for (let x = 0; x < numberRowCol; ++x) {
                let $col = $('<td></td>').css({
                    transform: 'translateX(' + (19 * x) + 'px)'
                }).addClass('col-' + x).appendTo($row);
                let $tile = $('<div></div>').addClass('block').addClass('tile-' + (x + numberRowCol * y)).appendTo($col);
                $('<div></div>').addClass('block--' + Game.board.tiles[x + numberRowCol * y]._type.toLowerCase()).appendTo($tile);
            }
        }
        console.log(Game.players[0].char);
        $('.tile-' + Game.players[0].char.getTile()).find('div').removeAttr('class').addClass('block--player');
    }

    remove() {

    }

    refresh() {
        console.log('banana');
    }
}

let Display = new DisplayManager;

Display.init();

export {
    Display
}