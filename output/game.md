# Global





* * *

## Class: Observable



## Class: Observable
Reactive class

### Observable.initProperties() 

Make object properties reactiveshould be called after properties initialization to make them reactive


### Observable.onChange() 

Add callback to be called when a reactive property is changed


### Observable.dispatch() 

Execute all callback listeners of an object when a reactive value is changed



## Class: Positionable



## Class: Positionable
Minimum is 0. Maximum is square root of class Board maxTiles - 1example : maxTiles = 49, maximum is 7 - 1 = 6


## Class: Tile



## Class: Tile


### Tile.getPos() 

Return an array of x Axis in index 0 and y Axis in index 1


### Tile.isObstacle() 

Bool, return true if tile is an obstacle


### Tile.isEmpty() 

Bool, return true if tile is empty


### Tile.hasPlayer() 

Bool, return true if tile has player in it



## Class: EmptyTile



## Class: EmptyTile



## Class: EmptyTile



## Class: Escape



## Class: Escape



## Class: Obstacle
Tile that cannot be reached


## Class: Obstacle



## Class: Obstacle



## Class: Barrel



## Class: Barrel



## Class: Barrel



## Class: BarbedWire



## Class: BarbedWire



## Class: BarbedWire



## Class: Woodbox



## Class: Woodbox



## Class: Woodbox



## Class: Board



## Class: Board
Create a board containing all tiles

### Board.getTile(x, y) 

Return tile object of given x Axis and Y Axis

**Parameters**

**x**: `Int`, Return tile object of given x Axis and Y Axis

**y**: `Int`, Return tile object of given x Axis and Y Axis


### Board.isPlayerNear(playerTile) 

Bool, return true if an adjacent tile of given tile has a player on it

**Parameters**

**playerTile**: `Int`, Should be index of Board class tiles[]



## Class: Movable



## Class: Movable



## Class: Character



## Class: Character
Create a character used by a playeras a pawn in a board game

### Character.getTile() 

Return the number of the character tileThe number is an index of tiles array from the Board class


### Character.getPos() 

Return x and y axis in an array


### Character.setTile(x, y) 

Change the character to another given position

**Parameters**

**x**: `Int`, new x axis

**y**: `Int`, new y axis


### Character.move(x, y) 

Move character to another tile with setTile and actualise the movement pointsusing super.move(x,y)

**Parameters**

**x**: `Int`, new x axis

**y**: `Int`, new y axis


### Character.checkItem(itemIndex, itemTile) 

Check if player can equip this item

**Parameters**

**itemIndex**: `Int`, item index in GameManager class items[]

**itemTile**: `Int`, tile where the item is


### Character.equipItem(itemIndex, itemTile) 

Equip item and remove it from the tile

**Parameters**

**itemIndex**: `Int`, item index in GameManager class items[]

**itemTile**: `Int`, tile where the item is



## Class: Survivor



## Class: Survivor



## Class: Chaser



## Class: Chaser



## Class: Player



## Class: Player



## Class: Item



## Class: Item



## Class: GameManager



## Class: GameManager


### GameManager.playerSpawn() 

Spawn both players accross the map in random positions


### GameManager.itemSpawn() 

Spawn random items from GameManager items[]


### GameManager.nextTurn(action) 

Get an action for the fight state

**Parameters**

**action**: `String`, attack || defend


### GameManager.getItemIndex(itemQuery) 

**Parameters**

**itemQuery**: `String`, Name of an item



## Class: SurvivalGameManager



## Class: SurvivalGameManager



## Class: VersusGameManager



## Class: VersusGameManager


### VersusGameManager.initProperties() 

Make object properties reactiveshould be called after properties initialization to make them reactive


### VersusGameManager.onChange() 

Add callback to be called when a reactive property is changed


### VersusGameManager.dispatch() 

Execute all callback listeners of an object when a reactive value is changed


### VersusGameManager.initProperties() 

Make object properties reactiveshould be called after properties initialization to make them reactive


### VersusGameManager.onChange() 

Add callback to be called when a reactive property is changed


### VersusGameManager.dispatch() 

Execute all callback listeners of an object when a reactive value is changed


### VersusGameManager.getPos() 

Return an array of x Axis in index 0 and y Axis in index 1


### VersusGameManager.isObstacle() 

Bool, return true if tile is an obstacle


### VersusGameManager.isEmpty() 

Bool, return true if tile is empty


### VersusGameManager.hasPlayer() 

Bool, return true if tile has player in it


### VersusGameManager.initProperties() 

Make object properties reactiveshould be called after properties initialization to make them reactive


### VersusGameManager.onChange() 

Add callback to be called when a reactive property is changed


### VersusGameManager.dispatch() 

Execute all callback listeners of an object when a reactive value is changed


### VersusGameManager.getPos() 

Return an array of x Axis in index 0 and y Axis in index 1


### VersusGameManager.isObstacle() 

Bool, return true if tile is an obstacle


### VersusGameManager.isEmpty() 

Bool, return true if tile is empty


### VersusGameManager.hasPlayer() 

Bool, return true if tile has player in it


### VersusGameManager.initProperties() 

Make object properties reactiveshould be called after properties initialization to make them reactive


### VersusGameManager.onChange() 

Add callback to be called when a reactive property is changed


### VersusGameManager.dispatch() 

Execute all callback listeners of an object when a reactive value is changed


### VersusGameManager.getPos() 

Return an array of x Axis in index 0 and y Axis in index 1


### VersusGameManager.isObstacle() 

Bool, return true if tile is an obstacle


### VersusGameManager.isEmpty() 

Bool, return true if tile is empty


### VersusGameManager.hasPlayer() 

Bool, return true if tile has player in it


### VersusGameManager.initProperties() 

Make object properties reactiveshould be called after properties initialization to make them reactive


### VersusGameManager.onChange() 

Add callback to be called when a reactive property is changed


### VersusGameManager.dispatch() 

Execute all callback listeners of an object when a reactive value is changed




* * *










