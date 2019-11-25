import { Game } from './game.js'
import { Event } from './event.js'

class DisplayManager {
    constructor() {
        for(let player of Game.players){
            player.char.onChange(() => this.refresh());
        }

    }

    init() {
        let $gameBoard = $('tbody');
        let numberRowCol = Math.floor(Math.sqrt(Game.board.tiles.length));
        for (let y = 0; y < numberRowCol; ++y) {
            let $row = $('<tr></tr>').css({
                transform: 'translateY(' + (19 * y) + 'px)'
            }).addClass('row-' + y).appendTo($gameBoard);
            for (let x = 0; x < numberRowCol; ++x) {
                let tileNumber = x + numberRowCol * y;
                let $col = $('<td></td>').css({
                    transform: 'translateX(' + (19 * x) + 'px)'
                }).addClass('col-' + x).appendTo($row);
                let $tile = $('<div></div>').addClass('block').addClass('tile-' + (tileNumber)).appendTo($col);
                let $block = $('<div></div>').addClass('block--' + Game.board.tiles[tileNumber]._type.toLowerCase()).appendTo($tile);
                if(Game.board.tiles[tileNumber].isEmpty()){
                    if(Game.board.tiles[tileNumber]._hasItem[0] == 1){
                        $block.addClass('item').addClass('item--' + Game.items[Game.board.tiles[tileNumber]._hasItem[1]].name.toLowerCase());
                        $('<div></div>').addClass('tooltiptext').html('<h1>' + Game.items[Game.board.tiles[tileNumber]._hasItem[1]].name + '</h1><br />' + '<p>' + Game.items[Game.board.tiles[tileNumber]._hasItem[1]].desc + '</p>').appendTo($block);
                }
                }
                if (Game.board.tiles[tileNumber].isObstacle()){
                    $block.addClass('block--obstacle__' + Game.board.tiles[tileNumber]._model.toLowerCase())
                }
                Game.getPossibleMoves();
                if(Game.board.tiles[tileNumber].reachable === 1) {
                    $('.tile-' + tileNumber).addClass('block--possibleMove');
                }else{
                    $('.tile-' + tileNumber).removeClass('block--possibleMove')
                }
            }
        }
        $('.tile-' + Game.players[0].char.getTile()).find('div').removeAttr('class').addClass('block--player').addClass('block--player__adam');
        $('.tile-' + Game.players[1].char.getTile()).find('div').removeAttr('class').addClass('block--player');
        // if($(body).find('.block--possibleMove').length == 0)
        //     Game.playerSpawn();
        this.interface();

    }


    remove() {
        let $gameBoard = $('tbody tr');
        $gameBoard.remove();

    }

    interface(){
        for(let i = 0; i < Game.players.length; ++i){
            $('.interface--player__' + (i+1) +'__equipedItem:eq(0)').addClass('item--' + Game.players[i].char.equipedItem.name.toLowerCase());
        }

        $('.interface--healthbar__overlay').css({
            width: `${Game.players[0].char._health}%` 
        }).text(`${Game.players[0].char._health}/100`);
    }
    refresh() {
        this.remove();
        this.init();
    }
}

let Display = new DisplayManager;
Game.playerSpawn();
Game.itemSpawn();



Display.init();

export {
    Display
}