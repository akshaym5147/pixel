const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: false }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player, cursors, platforms;

function preload() {
  this.load.image('ground', 'https://labs.phaser.io/assets/platform.png');
  this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
  this.load.image('spike', 'https://labs.phaser.io/assets/sprites/platform.png'); // You can replace this with a spike image later
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();


//   const hurdle = this.physics.add.staticGroup();
//     hurdle.create(400, 500, 'ground').setScale(0.5).refreshBody();
//     this.physics.add.collider(player, hurdle, () => {
//     console.log('Game Over');
//     this.scene.pause(); // freeze game on collision
//     });
// Create the obstacle
const movingObstacle = this.physics.add.image(400, 500, 'spike');
movingObstacle.setImmovable(true);
movingObstacle.body.allowGravity = false;

// Move it left and right with tween
this.tweens.add({
  targets: movingObstacle,
  x: 600, // final position
  ease: 'Linear',
  duration: 2000,
  yoyo: true,
  repeat: -1 // loop forever
});

// Add collision
this.physics.add.collider(player, movingObstacle, () => {
  console.log('Hit moving obstacle!');
  this.scene.pause(); // game over effect
});

}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
