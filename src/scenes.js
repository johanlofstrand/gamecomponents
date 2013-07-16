Crafty.scene('Game', function() {
       
    this.occupied = new Array(Game.map_grid.width);
    for (var i=0; i<Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);
         for (var j=0; j<Game.map_grid.height; j++) {
             this.occupied[i][j] = false;
         }
    }
    
    /*Initialize player1*/
    var player1 = Crafty.e("Actor, PlayerCharacter");
    player1.at(10,10);
    player1.addComponent('Mouse');
    player1.onMouseDown = function(e) {
        console.log("eB" + e.mouseButton, "realX: " + e.realX, "realY", e.realY);
        player1.x = e.realX;
        player1.y = e.realY;
    };
    Crafty.addEvent(player1, Crafty.stage.elem, "mousedown", player1.onMouseDown);
    this.occupied[player1.at().x,player1.at().y]=true;
    
    /*Add the scoreboard*/
    this.scoreBoard = Crafty.e('ScoreBoard');
    this.score=0;
 
    /*Loppor... */
    this.antal_loppor=0;
    this.max_antal_loppor=7; //max amount on screen
    this.min_no_of_targets_on_scene=3;
    
    this.loppa = Crafty.e('Loppan').at(6,Game.map_grid.height-1);
    this.antal_loppor++;
    
    this.bind('EnterFrame', function(data) {
        if (this.antal_loppor < this.max_antal_loppor) {
            if (this.antal_loppor < this.min_no_of_targets_on_scene && this.frame() % 10) {
                this.antal_loppor++;
                this.loppa = Crafty.e('Loppan').at(Math.floor(Math.random()*Game.map_grid.width+1),Game.map_grid.height-1);
            }
        }
    });
    this.hitLoppan = this.bind('hitLoppa', function() {
        this.score++;
        this.antal_loppor--;
        this.scoreBoard.text('Score: ' + this.score)
    });

    
});

Crafty.scene('Victory', function() {
    Crafty.e('2D,DOM,Text')
    .attr({x:0, y:0})
    .text('Victory!');
    
    this.restart_game = this.bind('KeyDown', function() {
        Crafty.scene('Game');
    });
}, function() {
        this.unbind('KeyDown', this.restart_game);
});

Crafty.scene('Loading', function(){
    Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);
  
    Crafty.load(['assets/sikte2.png',
                'assets/loppansprite1500a.png',
                'assets/door_knock_3x.mp3',
                'assets/door_knock_3x.ogg',
                'assets/door_knock_3x.aac'],
                function(){
                    Crafty.sprite('assets/sikte2.png', {spr_player:[0,0,34,34]});  
                    //public this Crafty.sprite([Number tile, [Number tileh]], String url, Object map[, Number paddingX[, Number paddingY]])
                     Crafty.sprite(39, 30, 'assets/loppansprite1500a.png', {spr_loppan: [0, 1], }, 1, 2); //padding x, y 
        });
    
     // Define our sounds for later use
    Crafty.audio.add({
      knock: ['assets/door_knock_3x.mp3',   
              'assets/door_knock_3x.ogg',
              'assets/door_knock_3x.aac']
    });
    
    var img = Crafty.e("2D, DOM, Image").image("assets/startbild630x400.png");
    
    
    this.start_game = this.bind('KeyDown', function() {
        Crafty.scene('Game');    
    });
},
    function() {
      this.unbind('KeyDown', this.start_game);
    }
);
    

