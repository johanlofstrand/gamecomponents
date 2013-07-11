
Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },
    
  // Locate this entity at the given position on the grid
    at: function(x, y) {
      if (x === undefined && y === undefined) {
        return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
      } else {
        this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
        return this;
      }
    }
});

Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    },
});

Crafty.c('Loppan', {
    _direction: 0,
    _hv:1,
    _enterFrame: function() {
        
        this._hv = Math.floor(Math.random()*this._h/2) + this._h; 
        if (this.y == this._hv) {
            this._direction = 1;     //Let it go down instead  
        }
        else if (this.y == Game.height) {
            this.destroy();
            //Crafty.trigger('lostLoppa', this);
        }
        if (this._direction == 0) {
            this.y -=1;
        }
        else {
            this.y +=1;
        }
        var animation_speed = 64;
        this.animate('LoppanInOut', animation_speed, -1);
        if (Crafty.frame() % 4 == 0) {
            this.rotation+=1;
        }
    },
    init: function() {
        this.requires('Actor,spr_loppan,SpriteAnimation')
        .animate('LoppanInOut',  0, 0, 1)  //Setup of sprite animation. Eg: name, x, y, no of images in anim after that that pos (in this case it's three sprite images for moving up)
        this.bind('EnterFrame', this._enterFrame);
    },
    
    hit: function() {  //called when Player collides
        this.destroy();
        Crafty.trigger('hitLoppa',this);
    }
});

Crafty.c('ScoreBoard', {
    
    init: function() {
        this.requires('2D,DOM,Text')
        .attr({x:0, y:0})
        .text('Score: ')
    },
});

Crafty.c('PlayerCharacter', {

    init: function() {
        var speed = 4;
        this.requires('Actor,Fourway,Collision,spr_player')
        .fourway(speed)
        .stopOnSolids()
        .onHit('Loppan', this.hitLoppan)
    },
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);
        return this;
    },
    hitLoppan: function(data) {
        var loppan = data[0].obj;
        loppan.hit();
    }
});
  