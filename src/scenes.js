Crafty.scene('Game', function() {
    this.occupied = new Array(Game.map_grid.width);
    for (var i=0; i<Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);
         for (var j=0; j<Game.map_grid.height; j++) {
             this.occupied[i][j] = false;
         }
    }
     
    this.player = Crafty.e('PlayerCharacter').at(5,5);
    this.occupied[this.player.at().x,this.player.at().y]=true;
    
    
    this.scoreBoard = Crafty.e('ScoreBoard');
    this.score=0;
    this.hitLoppan = this.bind('hitLoppa', function() {
        this.score++;
        this.scoreBoard.text('Score: ' + this.score)
    });

    this.antal_loppor=0;
    this.max_antal_loppor=100;
    
    this.loppa = Crafty.e('Loppan').at(6,Game.map_grid.height-1);
    this.antal_loppor++;
    
    this.bind('EnterFrame', function(data) {
        if (Math.floor(Math.random()*1000) > 989 && this.antal_loppor <= this.max_antal_loppor) {
            this.antal_loppor++;
            this.loppa = Crafty.e('Loppan').at(Math.floor(Math.random()*15+1),Game.map_grid.height-1);
        }
       
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
    
// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);
 
  // Load our sprite map image
  Crafty.load(['assets/sikte.png','assets/loppansprite1500a.png',], function(){
    // Once the image is loaded...
 
    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
   
    // Define the PC's sprite to be the first sprite in the third row of the
    //  animation sprite map
    
    
    Crafty.sprite('assets/sikte.png', {spr_player:[0,0,27,28]});
    
    
    //public this Crafty.sprite([Number tile, [Number tileh]], String url, Object map[, Number paddingX[, Number paddingY]])
    Crafty.sprite(39, 30, 'assets/loppansprite1500a.png', {
        spr_loppan: [0, 1], 
    }, 1, 2); //padding x, y 
 
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});
    

