Game = {
    
    //Grid som definierar tiles.
    map_grid: {
        width: 39,
        height: 25,
        tile: {
            width: 16,
            height: 16
            
        }
    },
    
    
    
    //game screen witdth (=gridbredd * tilestorlek)
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    
   
    start: function() {
        Crafty.init(Game.width(),Game.height());
        Crafty.background("url('assets/background630x400.png')");
        Crafty.scene('Loading');    
    }
}

$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'black', 'text-align': 'center' }
