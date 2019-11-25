import {
    Game
} from './game.js'

class EventManager {
    constructor() {
        $(document).on('click', 'td', function () {
            let numberRowCol = Math.floor(Math.sqrt(Game.board.tiles.length));
            let tileNumber = $(this).find('.block')[0].classList[1].split('tile-')[1];
            let tilePos = Game.board.tiles[tileNumber].getPos();

            console.log(Game.board.tiles[tileNumber]._reachable);
            if(Game.board.tiles[tileNumber]._reachable == 1){
                Game.players[Game.activePlayer].char.move(parseInt(tilePos[0]),parseInt(tilePos[1]));
                $('.block--player__adam:eq(0)').css('-webkit-animation-play-state', 'running');
            }
        });
    }

}

let Event = new EventManager;

export {
    Event
}