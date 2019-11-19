import { Game } from './game.js'

class EventManager {
    constructor () {
         // Event
         $(document).bind('keydown', (function (e) {
            var code = e.keyCode || e.which;
            if (code == 38) {
                Game.players[0].char.moveTop();
            }
        }));
        $(document).on('click', '.block', function () {
            console.log('oui');
            let tileNumber = this.classList[1].split('tile-')[1];
            let tilePos = Game.board.tiles[tileNumber].getPos().split(', ');
            Game.players[0].char.setTile(parseInt(tilePos[0]), parseInt(tilePos[1]));
        });
    }
}

let Event = new EventManager;

export { Event }