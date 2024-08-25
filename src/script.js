
var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//Variables de puntuación 
var score = 0;
var scoreText;

//GAME OVER Variable
var gameOver = false;
var Metalmusic = false;
var Ghostmusic = false;
var Flymusic = false;
var Starmusic = false;
var Noon = false;
var Night = false;
var Rain = false;
var Air = false;
var Air2 = false;


var Char1 = true;
var Char2 = false;
var Char3 = false;

var TempChar1 = false;
var TempChar2 = false;
var TempChar3 = false;

var CheckChar1 = false;
var CheckChar2 = false;
var CheckChar3 = false;

var Boost = false;
var Cooldown = false;


var game = new Phaser.Game(config);


function preload(){
    this.load.image('sky_noon', 'assets/background/noon.png');
    this.load.image('sky_night', 'assets/background/night.png');
    this.load.image('cloudy', 'assets/background/cloudy.png');
    this.load.image('windy', 'assets/background/windy.png');
    this.load.image('rain_drop', 'assets/background/raindrop.png');
    this.load.image('air', 'assets/background/air.png');
    this.load.image('air2', 'assets/background/air2.png');
    this.load.spritesheet('star_night_anim', 'assets/background/star_night_anim.png', {frameWidth: 11, frameHeight: 11});
    this.load.image('rain_clouds', 'assets/background/rain_clouds.png');
    this.load.image('cloud_noon', 'assets/background/cloud_noon.png');
    this.load.image('cloud_noon2', 'assets/background/cloud_noon2.png');

    this.load.image('ground1', 'assets/platforms/platform.png');
    this.load.image('ground1_bg', 'assets/platforms/platform1_bg.png');
    this.load.image('ground1_bg1', 'assets/platforms/platform1_bg1.png');
    this.load.image('ground1_night', 'assets/platforms/platform_night.png');
    this.load.image('ground1_night1', 'assets/platforms/platform_night1.png');
    this.load.image('ground1_night_bg', 'assets/platforms/platform1_night_bg.png');
    this.load.image('ground1_night_bg1', 'assets/platforms/platform1_night_bg1.png');
    this.load.image('ground2', 'assets/platforms/platform2.png');
    this.load.image('ground2_bg', 'assets/platforms/platform2_bg.png');
    this.load.image('gameover', 'assets/misc/game_over_text.png');
    this.load.image('bruh', 'assets/misc/bruh_text.png');
    this.load.spritesheet('star', 'assets/misc/star.png', {frameWidth: 25, frameHeight: 24});
    this.load.spritesheet('bomb', 'assets/misc/bomb.png', {frameWidth: 28, frameHeight: 28});
    this.load.spritesheet('bomb_red', 'assets/misc/bomb_red.png', {frameWidth: 28, frameHeight: 28});
    this.load.spritesheet('boom', 'assets/misc/bomb_explosion.png', {frameWidth: 56, frameHeight: 56});
    this.load.spritesheet('star_boom', 'assets/misc/star_explosion.png', {frameWidth: 25, frameHeight: 73});
    this.load.spritesheet('metalic_box', 'assets/misc/metal/metal_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('metalic_box_squish', 'assets/misc/metal/metal_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('ghostic_box', 'assets/misc/ghost/ghost_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('ghostic_box_squish', 'assets/misc/ghost/ghost_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('starstic_box', 'assets/misc/star/star_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('starstic_box_squish', 'assets/misc/star/star_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('stars_S', 'assets/misc/star/stars.png',{frameWidth: 48, frameHeight: 48});
    this.load.spritesheet('flystic_box', 'assets/misc/fly/fly_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('flystic_box_squish', 'assets/misc/fly/fly_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('boost_cloud', 'assets/misc/fly/boost_cloud.png',{frameWidth: 41, frameHeight: 30});
    this.load.spritesheet('char_change', 'assets/misc/chaotix.png',{frameWidth: 30, frameHeight: 30});


    this.load.spritesheet('dude', 'assets/hoots/dude_up.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('dude_death', 'assets/hoots/dude_death.png', {frameWidth: 50, frameHeight: 54});
    this.load.spritesheet('jump_left', 'assets/hoots/jump_left.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_right', 'assets/hoots/jump_right.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_front', 'assets/hoots/jump_front.png', {frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('fall', 'assets/hoots/fall.png', {frameWidth: 34, frameHeight: 50});
    this.load.spritesheet('fall_left', 'assets/hoots/fall_left.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('fall_right', 'assets/hoots/fall_right.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('dude_crouch', 'assets/hoots/dude_down.png', {frameWidth: 36, frameHeight: 39});
    this.load.spritesheet('run_left', 'assets/hoots/run_left.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('run_right', 'assets/hoots/run_right.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('fastrun_left', 'assets/hoots/fastrun_left.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('fastrun_right', 'assets/hoots/fastrun_right.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('skidd_left', 'assets/hoots/skidd_left.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_right', 'assets/hoots/skidd_right.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_turn_left', 'assets/hoots/skidd_turn_left.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('skidd_turn_right', 'assets/hoots/skidd_turn_right.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('twirl', 'assets/hoots/twirl.png',{frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('twirl_down', 'assets/hoots/twirldown.png',{frameWidth: 34, frameHeight: 55});

    this.load.spritesheet('dude_m', 'assets/hoots/metal/dude_up.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('jump_left_m', 'assets/hoots/metal/jump_left.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_right_m', 'assets/hoots/metal/jump_right.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_front_m', 'assets/hoots/metal/jump_front.png', {frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('fall_m', 'assets/hoots/metal/fall.png', {frameWidth: 34, frameHeight: 50});
    this.load.spritesheet('fall_left_m', 'assets/hoots/metal/fall_left.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('fall_right_m', 'assets/hoots/metal/fall_right.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('dude_crouch_m', 'assets/hoots/metal/dude_down.png', {frameWidth: 36, frameHeight: 39});
    this.load.spritesheet('run_left_m', 'assets/hoots/metal/run_left.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('run_right_m', 'assets/hoots/metal/run_right.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('skidd_left_m', 'assets/hoots/metal/skidd_left.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_right_m', 'assets/hoots/metal/skidd_right.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_turn_left_m', 'assets/hoots/metal/skidd_turn_left.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('skidd_turn_right_m', 'assets/hoots/metal/skidd_turn_right.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('twirl_m', 'assets/hoots/metal/twirl.png',{frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('twirl_down_m', 'assets/hoots/metal/twirldown.png',{frameWidth: 34, frameHeight: 55});





    this.load.spritesheet('goobert', 'assets/goob/dude_up.png', {frameWidth: 32, frameHeight: 41});
    this.load.spritesheet('goobert_death', 'assets/goob/dude_death.png', {frameWidth: 50, frameHeight: 54});
    this.load.spritesheet('goobert_jump_left', 'assets/goob/jump_left.png', {frameWidth: 22, frameHeight: 44});
    this.load.spritesheet('goobert_jump_right', 'assets/goob/jump_right.png', {frameWidth: 22, frameHeight: 44});
    this.load.spritesheet('goobert_jump_front', 'assets/goob/jump_front.png', {frameWidth: 28, frameHeight: 44});
    this.load.spritesheet('goobert_fall', 'assets/goob/fall_front.png', {frameWidth: 28, frameHeight: 36});
    this.load.spritesheet('goobert_fall_left', 'assets/goob/fall_left.png', {frameWidth: 25, frameHeight: 36});
    this.load.spritesheet('goobert_fall_right', 'assets/goob/fall_right.png', {frameWidth: 25, frameHeight: 36});
    this.load.spritesheet('goobert_crouch', 'assets/goob/dude_down.png', {frameWidth: 32, frameHeight: 36});
    this.load.spritesheet('goobert_run_left', 'assets/goob/run_left.png', {frameWidth: 32, frameHeight: 41});
    this.load.spritesheet('goobert_run_right', 'assets/goob/run_right.png', {frameWidth: 32, frameHeight: 41});
    this.load.spritesheet('goobert_fastrun_left', 'assets/goob/fastrun_left.png', {frameWidth: 28, frameHeight: 41});
    this.load.spritesheet('goobert_fastrun_right', 'assets/goob/fastrun_right.png', {frameWidth: 28, frameHeight: 41});
    this.load.spritesheet('goobert_skidd_left', 'assets/goob/skidd_left.png', {frameWidth: 31, frameHeight: 39});
    this.load.spritesheet('goobert_skidd_right', 'assets/goob/skidd_right.png', {frameWidth: 31, frameHeight: 39});
    this.load.spritesheet('goobert_skidd_turn_left', 'assets/goob/skidd_turn_left.png', {frameWidth: 26, frameHeight: 39});
    this.load.spritesheet('goobert_skidd_turn_right', 'assets/goob/skidd_turn_right.png', {frameWidth: 26, frameHeight: 39});
    this.load.spritesheet('goobert_float_left', 'assets/goob/floaty_left.png',{frameWidth: 36, frameHeight: 40});
    this.load.spritesheet('goobert_float_right', 'assets/goob/floaty_right.png',{frameWidth: 36, frameHeight: 40});

    this.load.spritesheet('goobert_m', 'assets/goob/metal/dude_up.png', {frameWidth: 32, frameHeight: 41});
    this.load.spritesheet('goobert_jump_left_m', 'assets/goob/metal/jump_left.png', {frameWidth: 22, frameHeight: 44});
    this.load.spritesheet('goobert_jump_right_m', 'assets/goob/metal/jump_right.png', {frameWidth: 22, frameHeight: 44});
    this.load.spritesheet('goobert_jump_front_m', 'assets/goob/metal/jump_front.png', {frameWidth: 28, frameHeight: 44});
    this.load.spritesheet('goobert_fall_m', 'assets/goob/metal/fall_front.png', {frameWidth: 28, frameHeight: 36});
    this.load.spritesheet('goobert_fall_left_m', 'assets/goob/metal/fall_left.png', {frameWidth: 25, frameHeight: 36});
    this.load.spritesheet('goobert_fall_right_m', 'assets/goob/metal/fall_right.png', {frameWidth: 25, frameHeight: 36});
    this.load.spritesheet('goobert_crouch_m', 'assets/goob/metal/dude_down.png', {frameWidth: 32, frameHeight: 36});
    this.load.spritesheet('goobert_run_left_m', 'assets/goob/metal/run_left.png', {frameWidth: 32, frameHeight: 41});
    this.load.spritesheet('goobert_run_right_m', 'assets/goob/metal/run_right.png', {frameWidth: 32, frameHeight: 41});
    this.load.spritesheet('goobert_skidd_left_m', 'assets/goob/metal/skidd_left.png', {frameWidth: 31, frameHeight: 39});
    this.load.spritesheet('goobert_skidd_right_m', 'assets/goob/metal/skidd_right.png', {frameWidth: 31, frameHeight: 39});
    this.load.spritesheet('goobert_skidd_turn_left_m', 'assets/goob/metal/skidd_turn_left.png', {frameWidth: 26, frameHeight: 39});
    this.load.spritesheet('goobert_skidd_turn_right_m', 'assets/goob/metal/skidd_turn_right.png', {frameWidth: 26, frameHeight: 39});
    this.load.spritesheet('goobert_floaty_left_m', 'assets/goob/metal/floaty_left.png',{frameWidth: 36, frameHeight: 40});
    this.load.spritesheet('goobert_floaty_right_m', 'assets/goob/metal/floaty_right.png',{frameWidth: 36, frameHeight: 40});




    this.load.spritesheet('ende', 'assets/ende/dude_up.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_death', 'assets/ende/dude_death.png', {frameWidth: 38, frameHeight: 44});
    this.load.spritesheet('ende_jump_fall_left', 'assets/ende/jump_fall_left.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_right', 'assets/ende/jump_fall_right.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_front', 'assets/ende/jump_fall_front.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_fly_left', 'assets/ende/jump_fall_fly_left.png', {frameWidth: 32, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_fly_right', 'assets/ende/jump_fall_fly_right.png', {frameWidth: 32, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_fly_front', 'assets/ende/jump_fall_fly_front.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_run_left', 'assets/ende/run_left.png', {frameWidth: 31, frameHeight: 42});
    this.load.spritesheet('ende_run_right', 'assets/ende/run_right.png', {frameWidth: 31, frameHeight: 42});
    this.load.spritesheet('ende_skidd_left', 'assets/ende/skidd_left.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_skidd_right', 'assets/ende/skidd_right.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_skidd_turn_left', 'assets/ende/skidd_turn_left.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_skidd_turn_right', 'assets/ende/skidd_turn_right.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_boost_left', 'assets/ende/boost_left.png',{frameWidth: 44, frameHeight: 28});
    this.load.spritesheet('ende_boost_right', 'assets/ende/boost_right.png',{frameWidth: 44, frameHeight: 28});
    this.load.spritesheet('ende_boost_up', 'assets/ende/boost_up.png', {frameWidth: 38, frameHeight: 44});

    this.load.spritesheet('ende_m', 'assets/ende/metal/dude_up.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_death_m', 'assets/ende/metal/dude_death.png', {frameWidth: 38, frameHeight: 44});
    this.load.spritesheet('ende_jump_fall_left_m', 'assets/ende/metal/jump_fall_left.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_right_m', 'assets/ende/metal/jump_fall_right.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_front_m', 'assets/ende/metal/jump_fall_front.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_fly_left_m', 'assets/ende/metal/jump_fall_fly_left.png', {frameWidth: 32, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_fly_right_m', 'assets/ende/metal/jump_fall_fly_right.png', {frameWidth: 32, frameHeight: 42});
    this.load.spritesheet('ende_jump_fall_fly_front_m', 'assets/ende/metal/jump_fall_fly_front.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_run_left_m', 'assets/ende/metal/run_left.png', {frameWidth: 31, frameHeight: 42});
    this.load.spritesheet('ende_run_right_m', 'assets/ende/metal/run_right.png', {frameWidth: 31, frameHeight: 42});
    this.load.spritesheet('ende_skidd_left_m', 'assets/ende/metal/skidd_left.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_skidd_right_m', 'assets/ende/metal/skidd_right.png', {frameWidth: 35, frameHeight: 42});
    this.load.spritesheet('ende_skidd_turn_left_m', 'assets/ende/metal/skidd_turn_left.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_skidd_turn_right_m', 'assets/ende/metal/skidd_turn_right.png', {frameWidth: 36, frameHeight: 42});
    this.load.spritesheet('ende_boost_left_m', 'assets/ende/metal/boost_left.png',{frameWidth: 44, frameHeight: 28});
    this.load.spritesheet('ende_boost_right_m', 'assets/ende/metal/boost_right.png',{frameWidth: 44, frameHeight: 28});
    this.load.spritesheet('ende_boost_up_m', 'assets/ende/metal/boost_up.png', {frameWidth: 38, frameHeight: 44});

    this.load.spritesheet('ende_boosting_right', 'assets/ende/boosting_right.png', {frameWidth: 64, frameHeight: 48});
    this.load.spritesheet('ende_boosting_left', 'assets/ende/boosting_left.png', {frameWidth: 64, frameHeight: 48});
    this.load.spritesheet('ende_boosting_up', 'assets/ende/boosting_up.png', {frameWidth: 48, frameHeight: 64});





    this.load.audio('jump_sfx', 'assets/mp3/jump.mp3');
    this.load.audio('jump_sfx_m', 'assets/mp3/jump_metal.mp3');
    this.load.audio('hitbomb_sfx', 'assets/mp3/hit_bomb.mp3');
    this.load.audio('block_break', 'assets/mp3/blockbreak.mp3');
    this.load.audio('music_metal_intro', 'assets/mp3/metal_intro.mp3');
    this.load.audio('music_metal', 'assets/mp3/metal_loop.mp3');
    this.load.audio('music_fly_intro', 'assets/mp3/fly_intro.mp3');
    this.load.audio('music_fly', 'assets/mp3/fly_loop.mp3');
    this.load.audio('music_metal_fly', 'assets/mp3/metalfly.mp3');
    this.load.audio('music_star', 'assets/mp3/invincible.mp3');
    this.load.audio('music_star_M', 'assets/mp3/invincible_M.mp3');
    this.load.audio('music_star_F', 'assets/mp3/invincible_F.mp3');
    this.load.audio('music_star_M_F', 'assets/mp3/invincible_M_F.mp3');
    this.load.audio('music_noon', 'assets/mp3/noon_loop.mp3');
    this.load.audio('music_noon_intro', 'assets/mp3/noon_intro.mp3');
    this.load.audio('music_night', 'assets/mp3/night_loop.mp3');
    this.load.audio('music_night_intro', 'assets/mp3/night_intro.mp3');
    this.load.audio('bruh_theme', 'assets/mp3/bruh.mp3');
    this.load.audio('gameover_theme', 'assets/mp3/game_over.mp3');
    this.load.audio('appear_sfx', 'assets/mp3/Appear.mp3');
    this.load.audio('disappear_sfx', 'assets/mp3/Disappear.mp3');
    this.load.audio('star_get_sfx', 'assets/mp3/star_get.mp3');
    this.load.audio('airjump_sfx', 'assets/mp3/jump_air.mp3');
    this.load.audio('airjump_m_sfx', 'assets/mp3/jump_air_m.mp3');
    this.load.audio('skidd_sfx', 'assets/mp3/skidd.mp3');
    this.load.audio('rain_sfx', 'assets/mp3/rain_sfx.mp3');
    this.load.audio('air_sfx', 'assets/mp3/air_sfx.mp3');
    this.load.audio('pity', 'assets/mp3/i_pity_you.mp3');
    this.load.audio('pipe', 'assets/mp3/pipe.mp3');
    this.load.audio('floaty', 'assets/mp3/floaty.mp3');
    this.load.audio('floaty_m', 'assets/mp3/floaty_m.mp3');
    this.load.audio('swap', 'assets/mp3/swap.mp3');
    this.load.audio('temp_swap', 'assets/mp3/temp_swap.mp3');
    this.load.audio('boost', 'assets/mp3/boost.mp3');
    this.load.audio('poof', 'assets/mp3/poof.mp3');


}

function create(){
 
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    
    this.jumpSFX = this.sound.add('jump_sfx');
    this.jumpMSFX = this.sound.add('jump_sfx_m');
    this.airjumpSFX = this.sound.add('airjump_sfx');
    this.airjumpMSFX = this.sound.add('airjump_m_sfx');
    this.starCollect = this.sound.add('star_get_sfx');
    this.skiddSFX = this.sound.add('skidd_sfx');
    this.rainSFX = this.sound.add('rain_sfx');
    this.airSFX = this.sound.add('air_sfx');
    this.floatSFX = this.sound.add('floaty');
    this.floatMSFX = this.sound.add('floaty_m');
    this.boostSFX = this.sound.add('boost');
    this.sound.add('hitbomb_sfx');
    this.sound.add('block_break');
    this.sound.add('appear_sfx');
    this.sound.add('disappear_sfx');
    this.sound.add('pity');
    this.sound.add('pipe');
    this.Swap = this.sound.add('swap');
    this.tempSwap = this.sound.add('temp_swap');



    this.noontheme = this.sound.add('music_noon');
    this.noontheme.intro = this.sound.add('music_noon_intro');

    this.nighttheme = this.sound.add('music_night');
    this.nighttheme.intro = this.sound.add('music_night_intro');

    this.metalTheme = this.sound.add('music_metal');
    this.metalTheme.intro = this.sound.add('music_metal_intro');

    this.flyTheme = this.sound.add('music_fly');
    this.flyTheme.intro = this.sound.add('music_fly_intro');

    this.MetalFlyTheme = this.sound.add('music_metal_fly');

    this.starTheme = this.sound.add('music_star');
    this.starMTheme = this.sound.add('music_star_M');
    this.starFTheme = this.sound.add('music_star_F');
    this.starMFTheme = this.sound.add('music_star_M_F');

    this.bruhtheme = this.sound.add('bruh_theme');
    this.gameOvertheme = this.sound.add('gameover_theme');



    var BgTime = Phaser.Math.Between(1, 2)
   
    if(BgTime == 1){

        this.add.image(750, 300, 'sky_noon');
        this.noontheme.intro.play();
        Noon = true

    }

    else if(BgTime == 2){

        this.add.image(750, 300, 'sky_night');
        this.nighttheme.intro.play();
        Night = true

    };
    //Clouds
    this.noonClouds = this.physics.add.group({
        key: 'cloud_noon',
        quantity: 10,
    });

    this.noonClouds2 = this.physics.add.group({
        key: 'cloud_noon2',
        quantity: 10
    });


    this.nightstars = this.physics.add.group({
        key: 'star_night_anim',
        quantity: 50
    });

    this.anims.create({

        key: 'star_night_anims',
        frames: this.anims.generateFrameNumbers('star_night_anim', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });



    const { x, y } = this.physics.world.bounds;

    if(Noon){

        this.nightstars.setVisible(false);
        for (const nooncloud of this.noonClouds.getChildren())
        {
            nooncloud.setRandomPosition(x, y);
        };

    for (const nooncloud2 of this.noonClouds2.getChildren())
        {
            nooncloud2.setRandomPosition(x, y);
        };
    }

    else if(Night){
        this.noonClouds.setVisible(false);
        this.noonClouds2.setVisible(false);
        for (const starnight of this.nightstars.getChildren())
        {
            starnight.setRandomPosition(x, y);
            starnight.anims.play('star_night_anims');
        };

    };


    this.add.image(750, 592, 'ground2_bg');

    var r_platform1 = Phaser.Math.Between(1, 2)
    var r_platform2 = Phaser.Math.Between(1, 2)
    var r_platform3 = Phaser.Math.Between(1, 2)
    var r_platform4 = Phaser.Math.Between(1, 2)


    if (Noon && !Night){
        if (r_platform1 == 1){
        this.add.image(600, 382, 'ground1_bg');
        }
        else if (r_platform1 == 2){
            this.add.image(600, 380, 'ground1_bg1');    
        };

        if (r_platform2 == 1){
            this.add.image(1390, 353, 'ground1_bg');
            }
        else if (r_platform2 == 2){
             this.add.image(1390, 351, 'ground1_bg1');    
        };
 
        if (r_platform3 == 1){
            this.add.image(750, 202, 'ground1_bg');
            }
        else if (r_platform3 == 2){
             this.add.image(750, 200, 'ground1_bg1');    
        };

        if (r_platform4 == 1){
            this.add.image(50, 232, 'ground1_bg');
            }
        else if (r_platform4 == 2){
            this.add.image(50, 230, 'ground1_bg1');   
        };
    }
    else if (Night && !Noon){
        if (r_platform1 == 1){
        this.add.image(600, 382, 'ground1_night_bg');
        }
        else if (r_platform1 == 2){
            this.add.image(600, 382, 'ground1_night_bg1');    
        };

        if (r_platform2 == 1){
            this.add.image(1390, 351, 'ground1_night_bg');
            }
        else if (r_platform2 == 2){
             this.add.image(1390, 351, 'ground1_night_bg1');    
        };
 
        if (r_platform3 == 1){
            this.add.image(750, 202, 'ground1_night_bg');
            }
        else if (r_platform3 == 2){
             this.add.image(750, 202, 'ground1_night_bg1');    
        };

        if (r_platform4 == 1){
            this.add.image(50, 232, 'ground1_night_bg');
            }
        else if (r_platform4 == 2){
            this.add.image(50, 232, 'ground1_night_bg1');   
        };
    }

    mainplatform = this.physics.add.staticGroup();

    mainplatform.create(750, 610, 'ground2');
    
    platforms = this.physics.add.staticGroup();

    if(Noon){
        platforms.create(600, 400, 'ground1');
        platforms.create(50, 250, 'ground1');
        platforms.create(750, 220, 'ground1');
        platforms.create(1390, 370, 'ground1');
    }
    else if (Night){
        if (r_platform1 == 1){
            platforms.create(600, 400, 'ground1_night');
            }
            else if (r_platform1 == 2){
                platforms.create(600, 400, 'ground1_night1');  
            };
    
            if (r_platform2 == 1){
                platforms.create(1390, 370, 'ground1_night');
                }
            else if (r_platform2 == 2){
                platforms.create(1390, 370, 'ground1_night1'); 
            };
     
            if (r_platform3 == 1){
                platforms.create(750, 220, 'ground1_night');
                }
            else if (r_platform3 == 2){
                platforms.create(750, 220, 'ground1_night1');   
            };
    
            if (r_platform4 == 1){
                platforms.create(50, 250, 'ground1_night');
                }
            else if (r_platform4 == 2){
                platforms.create(50, 250, 'ground1_night1'); 
            };
    }
    
    player = this.physics.add.sprite(100, 330, 'dude');

    player.setCollideWorldBounds(true);
    this.physics.world.setBoundsCollision(true, true, false, false) 
    player.setBounce(-0.8);
    



    this.anims.create({

        key: 'star_movement',
        frames: this.anims.generateFrameNumbers('star', {start: 0, end: 3}),
        frameRate: 5,
        repeat: -1
    });

    //Hoots' movement

    this.anims.create({

        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'leftrunning',
        frames: this.anims.generateFrameNumbers('run_left', {start: 3, end: 0}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'leftfastrunning',
        frames: this.anims.generateFrameNumbers('fastrun_left', {start: 3, end: 0}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'leftskidd',
        frames: this.anims.generateFrameNumbers('skidd_left', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'leftturnskidd',
        frames: this.anims.generateFrameNumbers('skidd_turn_left', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        
        key: 'left_crouch',
        frames: this.anims.generateFrameNumbers('dude_crouch', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'jumpleft',
        frames: this.anims.generateFrameNumbers('jump_left', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'crouch',
        frames: [{key: 'dude_crouch', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'jumpfront',
        frames: this.anims.generateFrameNumbers('jump_front', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallfront',
        frames: this.anims.generateFrameNumbers('fall', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallleft',
        frames: this.anims.generateFrameNumbers('fall_left', {start: 1, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallright',
        frames: this.anims.generateFrameNumbers('fall_right', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'right_crouch',
        frames: this.anims.generateFrameNumbers('dude_crouch', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'jumpright',
        frames: this.anims.generateFrameNumbers('jump_right', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'rightrunning',
        frames: this.anims.generateFrameNumbers('run_right', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'rightfastrunning',
        frames: this.anims.generateFrameNumbers('fastrun_right', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'rightskidd',
        frames: this.anims.generateFrameNumbers('skidd_right', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'rightturnskidd',
        frames: this.anims.generateFrameNumbers('skidd_turn_right', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'superfall',
        frames: this.anims.generateFrameNumbers('twirl_down', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({

        key: 'springtwirl',
        frames: this.anims.generateFrameNumbers('twirl', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({

        key: 'death',
        frames: this.anims.generateFrameNumbers('dude_death', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
//
//
//
//Metal __
//        |
//        |
//        V


    this.anims.create({

        key: 'left_m',
        frames: this.anims.generateFrameNumbers('dude_m', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        
        key: 'left_crouch_m',
        frames: this.anims.generateFrameNumbers('dude_crouch_m', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'leftrunning_m',
        frames: this.anims.generateFrameNumbers('run_left_m', {start: 3, end: 0}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'jumpleft_m',
        frames: this.anims.generateFrameNumbers('jump_left_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'leftskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_left_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'leftturnskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_turn_left_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'rightskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_right_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'rightturnskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_turn_right_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'turn_m',
        frames: [{key: 'dude_m', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'crouch_m',
        frames: [{key: 'dude_crouch_m', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'jumpfront_m',
        frames: this.anims.generateFrameNumbers('jump_front_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallfront_m',
        frames: this.anims.generateFrameNumbers('fall_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallleft_m',
        frames: this.anims.generateFrameNumbers('fall_left_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallright_m',
        frames: this.anims.generateFrameNumbers('fall_right_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({

        key: 'right_m',
        frames: this.anims.generateFrameNumbers('dude_m', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'rightrunning_m',
        frames: this.anims.generateFrameNumbers('run_right_m', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'right_crouch_m',
        frames: this.anims.generateFrameNumbers('dude_crouch_m', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'jumpright_m',
        frames: this.anims.generateFrameNumbers('jump_right_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'superfall_m',
        frames: this.anims.generateFrameNumbers('twirl_down_m', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({

        key: 'springtwirl_m',
        frames: this.anims.generateFrameNumbers('twirl_m', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });


    //Goobert moves

    this.anims.create({

        key: 'goob_left',
        frames: this.anims.generateFrameNumbers('goobert', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_leftrunning',
        frames: this.anims.generateFrameNumbers('goobert_run_left', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_leftfastrunning',
        frames: this.anims.generateFrameNumbers('goobert_fastrun_left', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_leftskidd',
        frames: this.anims.generateFrameNumbers('goobert_skidd_left', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_leftturnskidd',
        frames: this.anims.generateFrameNumbers('goobert_skidd_turn_left', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        
        key: 'goob_left_crouch',
        frames: this.anims.generateFrameNumbers('goobert_crouch', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_jumpleft',
        frames: this.anims.generateFrameNumbers('goobert_jump_left', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_turn',
        frames: [{key: 'goobert', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'goob_crouch',
        frames: [{key: 'goobert_crouch', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'goob_jumpfront',
        frames: this.anims.generateFrameNumbers('goobert_jump_front', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_fallfront',
        frames: this.anims.generateFrameNumbers('goobert_fall', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_fallleft',
        frames: this.anims.generateFrameNumbers('goobert_fall_left', {start: 1, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_fallright',
        frames: this.anims.generateFrameNumbers('goobert_fall_right', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_right',
        frames: this.anims.generateFrameNumbers('goobert', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_right_crouch',
        frames: this.anims.generateFrameNumbers('goobert_crouch', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_jumpright',
        frames: this.anims.generateFrameNumbers('goobert_jump_right', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_rightrunning',
        frames: this.anims.generateFrameNumbers('goobert_run_right', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_rightfastrunning',
        frames: this.anims.generateFrameNumbers('goobert_fastrun_right', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_rightskidd',
        frames: this.anims.generateFrameNumbers('goobert_skidd_right', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_rightturnskidd',
        frames: this.anims.generateFrameNumbers('goobert_skidd_turn_right', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });


    this.anims.create({

        key: 'goob_float_left',
        frames: this.anims.generateFrameNumbers('goobert_float_left', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_float_right',
        frames: this.anims.generateFrameNumbers('goobert_float_right', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_death',
        frames: this.anims.generateFrameNumbers('goobert_death', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });


    //Metal!!

    this.anims.create({

        key: 'goob_left_m',
        frames: this.anims.generateFrameNumbers('goobert_m', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_leftrunning_m',
        frames: this.anims.generateFrameNumbers('goobert_run_left_m', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_leftskidd_m',
        frames: this.anims.generateFrameNumbers('goobert_skidd_left_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_leftturnskidd_m',
        frames: this.anims.generateFrameNumbers('goobert_skidd_turn_left_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        
        key: 'goob_left_crouch_m',
        frames: this.anims.generateFrameNumbers('goobert_crouch_m', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_jumpleft_m',
        frames: this.anims.generateFrameNumbers('goobert_jump_left_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_turn_m',
        frames: [{key: 'goobert_m', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'goob_crouch_m',
        frames: [{key: 'goobert_crouch_m', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'goob_jumpfront_m',
        frames: this.anims.generateFrameNumbers('goobert_jump_front_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_fallfront_m',
        frames: this.anims.generateFrameNumbers('goobert_fall_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_fallleft_m',
        frames: this.anims.generateFrameNumbers('goobert_fall_left_m', {start: 1, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_fallright_m',
        frames: this.anims.generateFrameNumbers('goobert_fall_right_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_right_m',
        frames: this.anims.generateFrameNumbers('goobert_m', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_right_crouch_m',
        frames: this.anims.generateFrameNumbers('goobert_crouch_m', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_jumpright_m',
        frames: this.anims.generateFrameNumbers('goobert_jump_right_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_rightrunning_m',
        frames: this.anims.generateFrameNumbers('goobert_run_right_m', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_rightskidd_m',
        frames: this.anims.generateFrameNumbers('goobert_skidd_right_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'goob_rightturnskidd_m',
        frames: this.anims.generateFrameNumbers('goobert_skidd_turn_right_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });


    this.anims.create({

        key: 'goob_float_left_m',
        frames: this.anims.generateFrameNumbers('goobert_floaty_left_m', {start: 0, end: 3}),
        frameRate: 30,
        repeat: -1
    });

    this.anims.create({

        key: 'goob_float_right_m',
        frames: this.anims.generateFrameNumbers('goobert_floaty_right_m', {start: 0, end: 3}),
        frameRate: 30,
        repeat: -1
    });



//Endeé moves!

this.anims.create({

    key: 'ende_left',
    frames: this.anims.generateFrameNumbers('ende', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
});
this.anims.create({

    key: 'ende_leftrunning',
    frames: this.anims.generateFrameNumbers('ende_run_left', {start: 0, end: 3}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_leftskidd',
    frames: this.anims.generateFrameNumbers('ende_skidd_left', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});
this.anims.create({

    key: 'ende_leftturnskidd',
    frames: this.anims.generateFrameNumbers('ende_skidd_turn_left', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_jumpleft',
    frames: [{key: 'ende_jump_fall_left', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_jumpleft_fly',
    frames: [{key: 'ende_jump_fall_fly_left', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_turn',
    frames: [{key: 'ende', frame: 4}],
    frameRate: 20,
});

this.anims.create({

    key: 'ende_jumpfront',
    frames: [{key: 'ende_jump_fall_front', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_jumpfront_fly',
    frames: [{key: 'ende_jump_fall_fly_front', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_fallfront',
    frames: [{key: 'ende_jump_fall_front', frame: 1}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_fallfront_fly',
    frames: [{key: 'ende_jump_fall_fly_front', frame: 1}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_fallleft',
    frames: [{key: 'ende_jump_fall_left', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_fallleft_fly',
    frames: [{key: 'ende_jump_fall_fly_left', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_fallright',
    frames: [{key: 'ende_jump_fall_right', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_fallright_fly',
    frames: [{key: 'ende_jump_fall_fly_right', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_right',
    frames: this.anims.generateFrameNumbers('ende', {start: 5, end: 8}),
    frameRate: 10,
    repeat: -1
});

this.anims.create({

    key: 'ende_jumpright',
    frames: [{key: 'ende_jump_fall_right', frame: 0}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_jumpright_fly',
    frames: [{key: 'ende_jump_fall_fly_right', frame: 0}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_rightrunning',
    frames: this.anims.generateFrameNumbers('ende_run_right', {start: 0, end: 3}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_rightskidd',
    frames: this.anims.generateFrameNumbers('ende_skidd_right', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});
this.anims.create({

    key: 'ende_rightturnskidd',
    frames: this.anims.generateFrameNumbers('ende_skidd_turn_right', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_boost_left',
    frames: this.anims.generateFrameNumbers('ende_boost_left', {start: 0, end: 1}),
    frameRate: 20,
    repeat: -1
});

this.anims.create({

    key: 'ende_boost_right',
    frames: this.anims.generateFrameNumbers('ende_boost_right', {start: 0, end: 1}),
    frameRate: 20,
    repeat: -1
});

this.anims.create({

    key: 'ende_boost_up',
    frames: this.anims.generateFrameNumbers('ende_boost_up', {start: 0, end: 1}),
    frameRate: 20,
    repeat: -1
});


//METAL!

this.anims.create({

    key: 'ende_left_m',
    frames: this.anims.generateFrameNumbers('ende_m', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
});
this.anims.create({

    key: 'ende_leftrunning_m',
    frames: this.anims.generateFrameNumbers('ende_run_left_m', {start: 0, end: 3}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_leftskidd_m',
    frames: this.anims.generateFrameNumbers('ende_skidd_left_m', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});
this.anims.create({

    key: 'ende_leftturnskidd_m',
    frames: this.anims.generateFrameNumbers('ende_skidd_turn_left_m', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_jumpleft_m',
    frames: [{key: 'ende_jump_fall_left_m', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_jumpleft_fly_m',
    frames: [{key: 'ende_jump_fall_fly_left_m', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_turn_m',
    frames: [{key: 'ende_m', frame: 4}],
    frameRate: 20,
});

this.anims.create({

    key: 'ende_jumpfront_m',
    frames: [{key: 'ende_jump_fall_front_m', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_jumpfront_fly_m',
    frames: [{key: 'ende_jump_fall_fly_front_m', frame: 0}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_fallfront_m',
    frames: [{key: 'ende_jump_fall_front_m', frame: 1}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_fallfront_fly_m',
    frames: [{key: 'ende_jump_fall_fly_front_m', frame: 1}],
    frameRate: 10,

});

this.anims.create({

    key: 'ende_fallleft_m',
    frames: [{key: 'ende_jump_fall_left_m', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_fallleft_fly_m',
    frames: [{key: 'ende_jump_fall_fly_left_m', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_fallright_m',
    frames: [{key: 'ende_jump_fall_right_m', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_fallright_fly_m',
    frames: [{key: 'ende_jump_fall_fly_right_m', frame: 1}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_right_m',
    frames: this.anims.generateFrameNumbers('ende_m', {start: 5, end: 8}),
    frameRate: 10,
    repeat: -1
});

this.anims.create({

    key: 'ende_jumpright_m',
    frames: [{key: 'ende_jump_fall_right_m', frame: 0}],
    frameRate: 10,
});

this.anims.create({

    key: 'ende_jumpright_fly_m',
    frames: [{key: 'ende_jump_fall_fly_right_m', frame: 0}],
    frameRate: 10,
});
this.anims.create({

    key: 'ende_rightrunning_m',
    frames: this.anims.generateFrameNumbers('ende_run_right_m', {start: 0, end: 3}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_rightskidd_m',
    frames: this.anims.generateFrameNumbers('ende_skidd_right_m', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});
this.anims.create({

    key: 'ende_rightturnskidd_m',
    frames: this.anims.generateFrameNumbers('ende_skidd_turn_right_m', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});


this.anims.create({

    key: 'ende_boost_left_m',
    frames: this.anims.generateFrameNumbers('ende_boost_left_m', {start: 0, end: 1}),
    frameRate: 20,
    repeat: -1
});

this.anims.create({

    key: 'ende_boost_right_m',
    frames: this.anims.generateFrameNumbers('ende_boost_right_m', {start: 0, end: 1}),
    frameRate: 20,
    repeat: -1
});

this.anims.create({

    key: 'ende_boost_up_m',
    frames: this.anims.generateFrameNumbers('ende_boost_up_m', {start: 0, end: 1}),
    frameRate: 20,
    repeat: -1
});

this.anims.create({

    key: 'ende_death',
    frames: this.anims.generateFrameNumbers('ende_death', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});

this.anims.create({

    key: 'ende_death_m',
    frames: this.anims.generateFrameNumbers('ende_death_m', {start: 0, end: 1}),
    frameRate: 15,
    repeat: -1
});


//Boost effect

    this.rightBoost = this.add.sprite(0, 0, 'ende_boosting_right').setVisible(false);

    this.anims.create({

        key: 'boost_right',
        frames: this.anims.generateFrameNumbers('ende_boosting_right', {start: 0, end: 4}),
        frameRate: 30,
        repeat: -1,

    });

    this.leftBoost = this.add.sprite(0, 0, 'ende_boosting_left').setVisible(false);

    this.anims.create({

        key: 'boost_left',
        frames: this.anims.generateFrameNumbers('ende_boosting_left', {start: 0, end: 4}),
        frameRate: 30,
        repeat: -1,
    });

    this.upBoost = this.add.sprite(0, 0, 'ende_boosting_up').setVisible(false);

    this.anims.create({

        key: 'boost_up',
        frames: this.anims.generateFrameNumbers('ende_boosting_up', {start: 0, end: 4}),
        frameRate: 30,
        repeat: -1,
    });


    

    
    player.body.setGravityY(300);
  
    this.physics.add.collider(player, platforms, null, (player) => { return player.body.velocity.y >= 0 });
    this.physics.add.collider(player, mainplatform);

    
    cursors = this.input.keyboard.createCursorKeys();


    stars =  this.physics.add.group({

        key: 'star',
        repeat: 15,
        setXY: {x: 12, y:0, stepX: 70}
    });

    //Star
    this.anims.create({

        key: 'star_movement',
        frames: this.anims.generateFrameNumbers('star', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });


    //Blocks

    this.anims.create({

        key: 'metalicblock',
        frames: this.anims.generateFrameNumbers('metalic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({

        key: 'ghosticblock',
        frames: this.anims.generateFrameNumbers('ghostic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({

        key: 'flysticblock',
        frames: this.anims.generateFrameNumbers('flystic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({

        key: 'starsticblock',
        frames: this.anims.generateFrameNumbers('starstic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({

        key: 'chaotixbox',
        frames: this.anims.generateFrameNumbers('char_change', {start: 0, end: 5}),
        frameRate: 20,
        repeat: -1
    });

    this.squishM = this.add.sprite(0, 0, 'metalic_box_squish').setVisible(false);

    this.anims.create({

        key: 'metalicblock_squish',
        frames: this.anims.generateFrameNumbers('metalic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.squishG = this.add.sprite(0, 0, 'ghostic_box_squish').setVisible(false);

    this.anims.create({

        key: 'ghosticblock_squish',
        frames: this.anims.generateFrameNumbers('ghostic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.squishF = this.add.sprite(0, 0, 'flystic_box_squish').setVisible(false);

    this.anims.create({

        key: 'flysticblock_squish',
        frames: this.anims.generateFrameNumbers('flystic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    
    this.squishS = this.add.sprite(0, 0, 'starstic_box_squish').setVisible(false);

    this.anims.create({

        key: 'starsticblock_squish',
        frames: this.anims.generateFrameNumbers('starstic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    invStars = this.add.sprite(0, 0, 'stars_S').setVisible(false);

    this.anims.create({

        key: 'stars_effect',
        frames: this.anims.generateFrameNumbers('stars_S', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
        showOnStart: true,
    });

    this.flyBoost = this.add.sprite(0, 0, 'boost_cloud').setVisible(false);

    this.anims.create({

        key: 'fly_boost',
        frames: this.anims.generateFrameNumbers('boost_cloud', {start: 0, end: 2}),
        frameRate: 15,
        showOnStart: true,
        hideOnComplete: true
    });

    //Bomb
    this.anims.create({

        key: 'bomb_movement',
        frames: this.anims.generateFrameNumbers('bomb', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'bomb_movement_r',
        frames: this.anims.generateFrameNumbers('bomb_red', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
 
 
    //kaboom? (Yes Rico, kaboom!)  
    
    this.explosion = this.add.sprite(0, 0, 'boom').setVisible(false);

    this.anims.create({

        key: 'explode',
        frames: this.anims.generateFrameNumbers('boom', {start: 0, end: 3}),
        frameRate: 10,
        repeat: 2,
        showOnStart: true,
        hideOnComplete: true
    });

    this.starExplosion = this.add.sprite(0, 0, 'boom').setVisible(false);

    this.anims.create({

        key: 'star_explode',
        frames: this.anims.generateFrameNumbers('star_boom', {start: 0, end: 3}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.anims.create({

        key: 'explode_final',
        frames: this.anims.generateFrameNumbers('boom', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1,
    });

    


    stars.children.iterate(function(child){
        child.setBounce(0.9);
        child.setVelocityX(Phaser.Math.FloatBetween(-200, 200), 20);
        child.setCollideWorldBounds(true);
        child.anims.play('star_movement', true);

        
    });

    this.physics.add.collider(stars, platforms, null, () => { return Ghostmusic == false});
    this.physics.add.collider(stars, mainplatform);

    this.physics.add.overlap(player, stars, collectStar, (player, stars) =>
        {
            this.starCollect.play();
            this.starExplosion.copyPosition(stars).play('star_explode');
        });


    scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#ff0000'});

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms, null, () => { return Ghostmusic == false});
    this.physics.add.collider(bombs, mainplatform);
    this.physics.add.collider(bombs, bombs, null, () => { return Ghostmusic == false});

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    metalboxes = this.physics.add.staticGroup();

        this.physics.add.collider(player, metalboxes, (player, _metalboxes) =>
            {
                if ((player.body.touching.up && _metalboxes.body.touching.down || player.body.touching.down && cursors.down.isDown) && !gameOver)
                    {
                        this.noontheme.pause();
                        this.noontheme.intro.pause();
                        this.nighttheme.pause();
                        this.nighttheme.intro.pause();
                        this.sound.play('block_break');
                        if (!Flymusic){
                            if(!Starmusic){
                            this.metalTheme.intro.play();
                            };
                            player.body.setGravityY(400);
                        }
                        else if (Flymusic){
                            player.body.setGravityY(300);
                        };
                        Metalmusic = true;
                        if(!Starmusic){
                        };
                        this.squishM.copyPosition(_metalboxes).play('metalicblock_squish');
                        _metalboxes.destroy();
                        this.time.delayedCall(48000, () =>
                            {
                                player.setTint(0x42ef00);
                            
                            })
                        this.time.delayedCall(50000, () =>
                            {
                                if(!Starmusic){
                                this.metalTheme.pause();
                                this.metalTheme.intro.pause();
                                };
                                player.clearTint();
                                Metalmusic = false;
                                if(!Flymusic){
                                    if(!Starmusic){
                                    this.MetalFlyTheme.pause();
                                    if (Noon){
                                        this.noontheme.intro.play();
                                    }
                                    else if (Night){
                                        this.nighttheme.intro.play();
                                    }
                                    
                                    };
                                    player.body.setGravityY(300);
                                }
                                else if(Flymusic){
                                    if(!Starmusic){
                                    this.MetalFlyTheme.pause();
                                    this.flyTheme.intro.play();
                                    };
                                    player.body.setGravityY(100);
                                }                       
                            });
                    };
    
            });
        this.physics.add.collider(bombs, metalboxes, null, () => { return Ghostmusic == false});
        this.physics.add.collider(stars, metalboxes, null, () => { return Ghostmusic == false});
   
    ghostboxes = this.physics.add.staticGroup();

    this.physics.add.collider(player, ghostboxes, (player, _ghostboxes) =>
        {
            if ((player.body.touching.up && _ghostboxes.body.touching.down || player.body.touching.down && cursors.down.isDown) && !gameOver)
                {
                    this.sound.play('block_break');
                    this.squishG.copyPosition(_ghostboxes).play('ghosticblock_squish');
                    _ghostboxes.destroy();

                    this.time.delayedCall(600, () =>
                        {
                            if (!gameOver){
                            this.sound.play('disappear_sfx');
                            };
                        Ghostmusic = true;
                    });
                    this.time.delayedCall(5800, () =>
                        {
                            if (!gameOver){
                                this.sound.play('disappear_sfx');
                                };
                        })
                    this.time.delayedCall(7000, () =>
                        {
                            Ghostmusic = false;
                            if (!gameOver){
                            this.sound.play('appear_sfx');
                            };
                        });
                };
    
        });
    this.physics.add.collider(bombs, ghostboxes, null, () => { return Ghostmusic == false});
    this.physics.add.collider(stars, ghostboxes, null, () => { return Ghostmusic == false});


    flyboxes = this.physics.add.staticGroup();

    this.physics.add.collider(player, flyboxes, (player, _flyboxes) =>
        {
            if ((player.body.touching.up && _flyboxes.body.touching.down || player.body.touching.down && cursors.down.isDown) && !gameOver)
                {
                    this.noontheme.pause();
                    this.noontheme.intro.pause();
                    this.nighttheme.pause();
                    this.nighttheme.intro.pause();
                    this.sound.play('block_break');
                    Flymusic = true;
                    this.squishF.copyPosition(_flyboxes).play('flysticblock_squish');
                    _flyboxes.destroy();
                    if (!Metalmusic){
                        if(!Starmusic){
                            this.flyTheme.intro.play();
                        };
                        player.body.setGravityY(100);
                    }
                    else if (Metalmusic){
                        player.body.setGravityY(300);
                    }
                    this.time.delayedCall(48000, () =>
                        {
                            player.setTint(0xff0042);
                        
                        })
                    this.time.delayedCall(50000, () =>
                        {
                            player.clearTint();
                            this.flyTheme.pause();
                            this.flyTheme.intro.pause();
                            if(!Metalmusic){
                                Flymusic = false;
                                if(!Starmusic){
                                this.MetalFlyTheme.pause();
                                if (Noon){
                                    this.noontheme.intro.play();
                                }
                                else if (Night){
                                    this.nighttheme.intro.play();
                                }
                                };
                                player.body.setGravityY(300);
                            }
                            else if(Metalmusic){
                                Flymusic = false;
                                if(!Starmusic){
                                this.MetalFlyTheme.pause();
                                this.metalTheme.intro.play();
                                };
                                player.body.setGravityY(400);
                            };       
                        });
                };

        });
    this.physics.add.collider(bombs, flyboxes, null, () => { return Ghostmusic == false});
    this.physics.add.collider(stars, flyboxes, null, () => { return Ghostmusic == false});



starboxes = this.physics.add.staticGroup();

this.physics.add.collider(player, starboxes, (player, _starboxes) =>
    {
        if ((player.body.touching.up && _starboxes.body.touching.down || player.body.touching.down && cursors.down.isDown) && !gameOver)
            {
                this.noontheme.pause();
                this.noontheme.intro.pause();
                this.nighttheme.pause();
                this.nighttheme.intro.pause();
                this.flyTheme.intro.pause();
                this.flyTheme.pause();
                this.metalTheme.intro.pause();
                this.metalTheme.pause();
                this.MetalFlyTheme.pause();
                this.sound.play('block_break');
                invStars.setVisible(true);
                invStars.anims.play('stars_effect');
                Starmusic = true;
                if(!Metalmusic){
                };
                this.squishS.copyPosition(_starboxes).play('starsticblock_squish');
                _starboxes.destroy();
                this.time.delayedCall(48000, () =>
                    {
                        player.setTint(0xffe739);
                    
                    })
                this.time.delayedCall(50000, () =>
                    {

                        player.clearTint();
                        Starmusic = false;
                        invStars.setVisible(false);
                        if(!Metalmusic){
                        };

                        if(!Flymusic && !Metalmusic){
                            this.starTheme.pause();
                            this.starFTheme.pause();
                            this.starMTheme.pause();
                            this.starMFTheme.pause();
                            if (Noon){
                                this.noontheme.intro.play();
                            }
                            else if (Night){
                                this.nighttheme.intro.play();
                            }
                        }
                        else if(Flymusic && !Metalmusic){
                            this.starTheme.pause();
                            this.starFTheme.pause();
                            this.starMTheme.pause();
                            this.starMFTheme.pause();
                            this.flyTheme.intro.play();
                        } 
                        else if(!Flymusic && Metalmusic){
                            this.starTheme.pause();
                            this.starFTheme.pause();
                            this.starMTheme.pause();
                            this.starMFTheme.pause();
                            this.metalTheme.intro.play();
                        };  
                                         
                    });
            };

    });
this.physics.add.collider(bombs, starboxes, null, () => { return Ghostmusic == false});
this.physics.add.collider(stars, starboxes, null, () => { return Ghostmusic == false});


chaotixboxes = this.physics.add.staticGroup();

this.physics.add.collider(player, chaotixboxes, (player, _chaotixboxes) =>
    {
        if ((player.body.touching.up && _chaotixboxes.body.touching.down || player.body.touching.down && cursors.down.isDown) && !gameOver)
            {
                this.sound.play('poof');
                this.flyBoost.copyPosition(_chaotixboxes).play('fly_boost');
                _chaotixboxes.destroy();
                var RandomChange = Phaser.Math.Between(1, 2)

                this.time.delayedCall(600, () =>
                {
                    this.flyBoost.copyPosition(player).play('fly_boost')
                    this.tempSwap.play()
                

                    if(Char1){
                        CheckChar1 = true
                        Char1 = false
                        if(RandomChange == 1){
                            TempChar2 = true
                        }
                        else if(RandomChange == 2){
                            TempChar3 = true
                        }

                    }
                    else if (Char2){
                        CheckChar2 = true
                        Char2 = false
                        if(RandomChange == 1){
                            TempChar1 = true
                        }
                        else if(RandomChange == 2){
                            TempChar3 = true
                        }
                    }

                    else if (Char3){
                        CheckChar3 = true
                        Char3 = false
                        if(RandomChange == 1){
                            TempChar2 = true
                        }
                        else if(RandomChange == 2){
                            TempChar1 = true
                        }
                    
                    }
                })

                this.time.delayedCall(50000, () =>
                    {
                        this.flyBoost.copyPosition(player).play('fly_boost')
                        this.tempSwap.play()

                        if(CheckChar1){
                            CheckChar1 = false
                            Char1 = true
                            TempChar2 = false
                            TempChar3 = false
    
                        }
                        else if (CheckChar2){
                            CheckChar2 = false
                            Char2 = true
                            TempChar1 = false
                            TempChar3 = false
                        }
    
                        else if (CheckChar3){
                            CheckChar3 = false
                            Char3 = true
                            TempChar2 = false
                            TempChar1 = false
                        
                        }
                    })

            };

    });
this.physics.add.collider(bombs, chaotixboxes, null, () => { return Ghostmusic == false});
this.physics.add.collider(stars, chaotixboxes, null, () => { return Ghostmusic == false});

bruh_screen = this.add.image(750, 300, 'bruh').setVisible(false);

var Weather = Phaser.Math.Between(1, 5);

this.rain = this.physics.add.group({
    key: 'rain_drop',
    quantity: 250,
    visible: false
});

this.air = this.physics.add.group({
    key: 'air',
    quantity: 250,
    visible: false
});

this.air2 = this.physics.add.group({
    key: 'air2',
    quantity: 250,
    visible: false
});


if(Weather == 2 || Weather == 5){
    for (const rainmove of this.rain.getChildren())
        {
            rainmove.setRandomPosition(x, y);
            this.rain.setVisible(true);
            this.noonClouds.setVisible(false);
            this.noonClouds2.setVisible(false);
            this.nightstars.setVisible(false);
            Rain = true
        }
        this.add.image(750, 300, 'cloudy');
        this.add.image(750, -20, 'rain_clouds');
    }

    if(Weather == 3 || Weather == 5){
        var airPOS = Phaser.Math.Between(1, 2);
        if(airPOS == 1){
            for (const airmove of this.air.getChildren())
                {
                    airmove.setRandomPosition(x, y);

                    this.air.setVisible(true);
                    this.physics.world.gravity.x = 100;
                    Air = true
                }
            }
        else if(airPOS == 2){
            for (const air2move of this.air2.getChildren())
                {
                    air2move.setRandomPosition(x, y);

                    this.air2.setVisible(true);
                    this.physics.world.gravity.x = -100;
                    Air2 = true
                }
            }  
            this.add.image(750, 300, 'windy');
        }


    
}

function update(){

    Phaser.Display.Align.In.Center(this.upBoost, player)
    Phaser.Display.Align.In.Center(this.leftBoost, player)
    Phaser.Display.Align.In.Center(this.rightBoost, player)

    if(!TempChar1 && !TempChar2 && !TempChar3){

        if(key1.isDown){
            this.flyBoost.copyPosition(player).play('fly_boost')
            if(player.body.touching.down){
                player.setVelocityY(-100)
            }
            if(!this.tempSwap.isPlaying){
                this.tempSwap.play()
            }
            Char1 = true
            Char2 = false
            Char3 = false
        }
        else if(key2.isDown){
            if(player.body.touching.down){
                player.setVelocityY(-100)
            }
            this.flyBoost.copyPosition(player).play('fly_boost')
            if(!this.tempSwap.isPlaying){
                this.tempSwap.play()
            }
            Char1 = false
            Char2 = true
            Char3 = false
        }
        else if(key3.isDown){
            if(player.body.touching.down){
                player.setVelocityY(-100)
            }
            this.flyBoost.copyPosition(player).play('fly_boost')
            if(!this.tempSwap.isPlaying){
                this.tempSwap.play()
            }
            Char1 = false
            Char2 = false
            Char3 = true
        }
    }
    else if (TempChar1 || TempChar2 || TempChar3){
        if(key1.isDown || key2.isDown || key3.isDown){
            if(!this.Swap.isPlaying){
                this.Swap.play()
            }
        }
    }

if(Char1 || TempChar1){
    this.rightBoost.setVisible(false);
    this.leftBoost.setVisible(false);
    this.upBoost.setVisible(false);

    if(gameOver){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('death', true);
    }
    else if(!Metalmusic && !gameOver){

    player.setMaxVelocity(600, 5000)
    player.body.setGravityX(0);
   
        if(cursors.right.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.left.isDown){
        if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
            if(!Rain){
                player.setAccelerationX(600);
            }
            else if (Rain){
                player.setAccelerationX(300);
            };
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }
        

        else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){

            if (!keyS.isDown){
                if(!Starmusic){
                    player.setVelocityX(160);
                    player.setAccelerationX(0);
                }
                else if(Starmusic){
            player.setAccelerationX(160);
                }

            }
            else if (keyS.isDown){ 
         
                if(Starmusic){
                player.setAccelerationX(600);

                }
                else if(!Starmusic){
                    player.setVelocityX(300);
                    player.setAccelerationX(300);
                };
            }
        };

        if (player.body.velocity.x >= 1 && player.body.velocity.x <= 249){
            player.anims.play('right', true)
        }
        else if(player.body.velocity.x >= 250 && player.body.velocity.x <= 549){
            player.anims.play('rightrunning', true);
        }

        else if(player.body.velocity.x >= 550){
            player.anims.play('rightfastrunning', true);
        }
        else if(player.body.velocity.x <= -191){
            player.anims.play('leftskidd', true);
        }
        else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -1){
            player.anims.play('leftturnskidd', true);
        };

    }else if(cursors.left.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.right.isDown){
        if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
            if(!Rain){
                player.setAccelerationX(-600);
            }
            else if (Rain){
                player.setAccelerationX(-300);
            }
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){

            if (!keyS.isDown){
                if(!Starmusic){
                    player.setVelocityX(-160);
                    player.setAccelerationX(0);
                }
                else if(Starmusic){
            player.setAccelerationX(-160);
                }

            }
            else if (keyS.isDown){ 
         
                if(Starmusic){
                player.setAccelerationX(-600);

                }
                else if(!Starmusic){
                    player.setVelocityX(-300);
                    player.setAccelerationX(-300);
                };
            }
        };

        if (player.body.velocity.x <= -1 && player.body.velocity.x >= -249){
            player.anims.play('left', true)
        }
        else if(player.body.velocity.x <= -250 && player.body.velocity.x >= -549){
            player.anims.play('leftrunning', true);
        }

        else if(player.body.velocity.x <= -550){
            player.anims.play('leftfastrunning', true);
        }
        else if(player.body.velocity.x >= 191){
            player.anims.play('rightskidd', true);
        }
        else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 1){
            player.anims.play('rightturnskidd', true);
        };
  
    } else if(cursors.right.isDown && cursors.down.isDown && player.body.touching.down){
        player.setVelocityX(0);
        player.setVelocityX(80);
        player.anims.play('right_crouch', true);   

    } else if(cursors.left.isDown && cursors.down.isDown && player.body.touching.down){
        player.setVelocityX(0);
        player.setVelocityX(-80);
        player.anims.play('left_crouch', true);   

    } else if (cursors.left.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){
        if(player.body.velocity.y <= -2 && !Flymusic){
            player.anims.play('jumpleft', true);
        }
        else if(player.body.velocity.y <= -2 && Flymusic){
            player.anims.play('springtwirl', true);
        }
        else if(player.body.velocity.y >= 10){
            player.anims.play('fallleft', true);
        };
        if(!Starmusic){
            player.setVelocityX(-160);
            player.setAccelerationX(0);
        }
        else if(Starmusic){
            player.setAccelerationX(-600);   
        };
    
    } else if(cursors.right.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){

        if(player.body.velocity.y <= -2 && !Flymusic){
            player.anims.play('jumpright', true);
        }
        else if(player.body.velocity.y <= -2 && Flymusic){
            player.anims.play('springtwirl', true);
        }
        else if(player.body.velocity.y >= 10){
            player.anims.play('fallright', true);
        };
        if(!Starmusic){
        player.setVelocityX(160);
        player.setAccelerationX(0);
        }
        else if(Starmusic){
            player.setAccelerationX(600);   
        };

        
    } else if(!cursors.down.isDown && !keyA.isDown && !cursors.space.isDown && !player.body.touching.down){
        if(player.body.velocity.y <= -2 && !Flymusic){
            player.anims.play('jumpfront', true);
        }
        else if(player.body.velocity.y <= -2 && Flymusic){
            player.anims.play('springtwirl', true);
        }
        else if(player.body.velocity.y >= 2){
            player.anims.play('fallfront', true);
        };

        if(!Starmusic){
        player.setVelocityX(0);
        };
        player.setAccelerationX(0);

    } else if(keyA.isDown && !player.body.touching.down){
        player.anims.play('superfall', true);
        player.setVelocityY (900);
        player.setAccelerationX(0);

    }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown && cursors.down.isDown){
        player.setVelocityX(0);
        player.setAccelerationX(0);
        player.anims.play('crouch', true);

    }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown){
        player.setSize(32, 51)
        if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
            if(!Rain){
                player.setAccelerationX(-600);
            }
            else if (Rain){
                player.setAccelerationX(-300);
            }
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
        }
        if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
            if(!Rain){
                player.setAccelerationX(600);
            }
            else if (Rain){
                player.setAccelerationX(300);
            }
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
            };
        }

        if(player.body.velocity.x <= -191){
            player.anims.play('leftskidd', true);
        }
        else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -161){
            player.anims.play('leftturnskidd', true);
        }

        else if(player.body.velocity.x >= 191){
            player.anims.play('rightskidd', true);
        }
        else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 161){
            player.anims.play('rightturnskidd', true);
        }
           
        else if((player.body.velocity.x >= -160 || player.body.velocity.x <= 160 || player.body.velocity.x == 0)){
        player.setVelocityX(0);
        player.setAccelerationX(0);
        player.setAccelerationY(0);
        player.anims.play('turn', true);
            if (this.jumpSFX.isPlaying || this.airjumpSFX.isPlaying || this.jumpSFX.isPlaying && this.airjumpSFX.isPlaying){
                this.jumpSFX.pause();
                this.airjumpSFX.pause();
            };
        }

    }

    if((keyD.isDown || cursors.up.isDown) && player.body.touching.down && !gameOver){
        player.setVelocityY(-490);
        this.jumpSFX.play();
        this.flyBoost.copyPosition(player).play('fly_boost');

    }

    else if((keyD.isDown || cursors.up.isDown) && !player.body.touching.down && !gameOver && Flymusic && player.body.velocity.y > 200){
        player.setVelocityY(-500);
        this.flyBoost.copyPosition(player).play('fly_boost');
        this.airjumpSFX.play();

    };
    if(!player.body.touching.down && (!(keyD.isDown || cursors.up.isDown) || player.body.velocity.y >= 10) && !gameOver && !Flymusic){
        player.setAccelerationY(900)
    }
    else if(!player.body.touching.down && (keyD.isDown || cursors.up.isDown) && !gameOver){
        player.setAccelerationY(0)
    }
    else if(player.body.touching.down && !gameOver){
        player.setAccelerationY(0)

    }

    }

else if(Metalmusic && !gameOver){
    player.setMaxVelocity(400, 5000)

    if(Air){
        player.body.setGravityX(-100)
    }
    else if(Air2){
        player.body.setGravityX(100)
    }
    
    if(cursors.right.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.left.isDown){
        if(player.body.velocity.x >= -400 && player.body.velocity.x <= -121){
            player.setAccelerationX(900);
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(player.body.velocity.x <= 120 || player.body.velocity.x >= -120 || player.body.velocity.x == 0){

            if (!keyS.isDown){
                if(!Starmusic){
                    player.setVelocityX(120);
                    player.setAccelerationX(0);
                }
                else if(Starmusic){
            player.setAccelerationX(120);
                }

            }
            else if (keyS.isDown){ 
         
                if(Starmusic){
                player.setAccelerationX(400);

                }
                else if(!Starmusic){
                    player.setVelocityX(200);
                    player.setAccelerationX(200);
                };
            }
        };

        if (player.body.velocity.x >= 1 && player.body.velocity.x <= 249){
            player.anims.play('right_m', true)
        }
        else if(player.body.velocity.x >= 250){
            player.anims.play('rightrunning_m', true);
        }

        else if(player.body.velocity.x <= -191){
            player.anims.play('leftskidd_m', true);
        }
        else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -1){
            player.anims.play('leftturnskidd_m', true);
        };

    }else if(cursors.left.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.right.isDown){
        if(player.body.velocity.x <= 400 && player.body.velocity.x >= 121){
            player.setAccelerationX(-900);
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(player.body.velocity.x <= 120 || player.body.velocity.x >= -120 || player.body.velocity.x == 0){

            if (!keyS.isDown){
                if(!Starmusic){
                    player.setVelocityX(-120);
                    player.setAccelerationX(0);
                }
                else if(Starmusic){
            player.setAccelerationX(-120);
                }

            }
            else if (keyS.isDown){ 
         
                if(Starmusic){
                player.setAccelerationX(-400);

                }
                else if(!Starmusic){
                    player.setVelocityX(-200);
                    player.setAccelerationX(-200);
                };
            }
        };

        if (player.body.velocity.x <= -1 && player.body.velocity.x >= -249){
            player.anims.play('left_m', true)
        }
        else if(player.body.velocity.x <= -250){
            player.anims.play('leftrunning_m', true);
        }

        else if(player.body.velocity.x >= 191){
            player.anims.play('rightskidd_m', true);
        }
        else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 1){
            player.anims.play('rightturnskidd_m', true);
        };
  
    } else if(cursors.right.isDown && cursors.down.isDown && player.body.touching.down){
        player.setVelocityX(80);
        player.anims.play('right_crouch_m', true);   

    } else if(cursors.left.isDown && cursors.down.isDown && player.body.touching.down){
        player.setVelocityX(-80);
        player.anims.play('left_crouch_m', true);   

    } else if (cursors.left.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){
        if(player.body.velocity.y <= -2 && !Flymusic){
            player.anims.play('jumpleft_m', true);
        }
        else if(player.body.velocity.y <= -2 && Flymusic){
            player.anims.play('springtwirl_m', true);
        }
        else if(player.body.velocity.y >= 10){
            player.anims.play('fallleft_m', true);
        };
        if(!Starmusic){
            player.setVelocityX(-160);
            player.setAccelerationX(0);
        }
        else if(Starmusic){
            player.setAccelerationX(-400);   
        };
    
    } else if(cursors.right.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){

        if(player.body.velocity.y <= -2 && !Flymusic){
            player.anims.play('jumpright_m', true);
        }
        else if(player.body.velocity.y <= -2 && Flymusic){
            player.anims.play('springtwirl_m', true);
        }
        else if(player.body.velocity.y >= 10){
            player.anims.play('fallright_m', true);
        };
        if(!Starmusic){
        player.setVelocityX(160);
        player.setAccelerationX(0);
        }
        else if(Starmusic){
            player.setAccelerationX(400);   
        };

        
    } else if(!cursors.down.isDown && !keyA.isDown && !cursors.space.isDown && !player.body.touching.down){
        if(player.body.velocity.y <= -2 && !Flymusic){
            player.anims.play('jumpfront_m', true);
        }
        else if(player.body.velocity.y <= -2 && Flymusic){
            player.anims.play('springtwirl_m', true);
        }
        else if(player.body.velocity.y >= 2){
            player.anims.play('fallfront_m', true);
        };

        if(!Starmusic){
        player.setVelocityX(0);
        };
        player.setAccelerationX(0);

    } else if(keyA.isDown && !player.body.touching.down){
        player.anims.play('superfall_m', true);
        player.setVelocityY (900);
        player.setAccelerationX(0);

    }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown && cursors.down.isDown){
        player.setVelocityX(0);
        player.setAccelerationX(0);
        player.anims.play('crouch_m', true);

    }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown){

        if(player.body.velocity.x <= 400 && player.body.velocity.x >= 121){
            player.setAccelerationX(-900);
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
        }
        if(player.body.velocity.x >= -400 && player.body.velocity.x <= -121){
            player.setAccelerationX(900);
            player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
            };
        }

        if(player.body.velocity.x <= -191){
            player.anims.play('leftskidd_m', true);
        }
        else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -121){
            player.anims.play('leftturnskidd_m', true);
        }

        else if(player.body.velocity.x >= 191){
            player.anims.play('rightskidd_m', true);
        }
        else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 121){
            player.anims.play('rightturnskidd_m', true);
        }
           
        else if((player.body.velocity.x >= -120 || player.body.velocity.x <= 120 || player.body.velocity.x == 0)){
        player.setVelocityX(0);
        player.setAccelerationX(0);
        player.setAccelerationY(0);
        player.anims.play('turn_m', true);
            if (this.jumpMSFX.isPlaying || this.airjumpMSFX.isPlaying || this.jumpMSFX.isPlaying && this.airjumpMSFX.isPlaying){
                this.jumpMSFX.pause();
                this.airjumpMSFX.pause();
            };
        }

    }


    if((keyD.isDown || cursors.up.isDown) && player.body.touching.down && !gameOver){
        player.setVelocityY(-500);
        this.jumpMSFX.play();
        this.flyBoost.copyPosition(player).play('fly_boost');

    }

    else if((keyD.isDown || cursors.up.isDown) && !player.body.touching.down && !gameOver && Flymusic && player.body.velocity.y > 200){
        player.setVelocityY(-450);
        this.flyBoost.copyPosition(player).play('fly_boost');
        this.airjumpMSFX.play();

    };

    if(!player.body.touching.down && (!(keyD.isDown || cursors.up.isDown) || player.body.velocity.y >= 10) && !gameOver && !Flymusic){
        player.setAccelerationY(1200)
    }
    else if(!player.body.touching.down && (keyD.isDown || cursors.up.isDown) && !gameOver){
        player.setAccelerationY(0)
    }
    else if(player.body.touching.down && !gameOver){
        player.setAccelerationY(0)
    }
};

if(!cursors.down.isDown){
    player.setSize(32, 51)
}
else if (cursors.down.isDown){
    player.setSize(32, 39)

}
}

else if (Char2 || TempChar2){
    this.rightBoost.setVisible(false);
    this.leftBoost.setVisible(false);
    this.upBoost.setVisible(false);

    if(gameOver){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('goob_death', true);
    }

    else if(!Metalmusic && !gameOver){

        player.setMaxVelocity(600, 5000)
        player.body.setGravityX(0);
       
            if(cursors.right.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.left.isDown){
            if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
                if(!Rain){
                    player.setAccelerationX(600);
                }
                else if (Rain){
                    player.setAccelerationX(300);
                };
                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(160);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(160);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(600);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(300);
                        player.setAccelerationX(300);
                    };
                }
            };
    
            if (player.body.velocity.x >= 1 && player.body.velocity.x <= 249){
                player.anims.play('goob_right', true)
            }
            else if(player.body.velocity.x >= 250 && player.body.velocity.x <= 549){
                player.anims.play('goob_rightrunning', true);
            }
    
            else if(player.body.velocity.x >= 550){
                player.anims.play('goob_rightfastrunning', true);
            }
            else if(player.body.velocity.x <= -191){
                player.anims.play('goob_leftskidd', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -1){
                player.anims.play('goob_leftturnskidd', true);
            };
    
        }else if(cursors.left.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.right.isDown){
            if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
                if(!Rain){
                    player.setAccelerationX(-600);
                }
                else if (Rain){
                    player.setAccelerationX(-300);
                }

                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(-160);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(-160);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(-600);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(-300);
                        player.setAccelerationX(-300);
                    };
                }
            };
    
            if (player.body.velocity.x <= -1 && player.body.velocity.x >= -249){
                player.anims.play('goob_left', true)
            }
            else if(player.body.velocity.x <= -250 && player.body.velocity.x >= -549){
                player.anims.play('goob_leftrunning', true);
            }
    
            else if(player.body.velocity.x <= -550){
                player.anims.play('goob_leftfastrunning', true);
            }
            else if(player.body.velocity.x >= 191){
                player.anims.play('goob_rightskidd', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 1){
                player.anims.play('goob_rightturnskidd', true);
            };
      
        } else if(cursors.right.isDown && cursors.down.isDown && player.body.touching.down){
            player.setVelocityX(80);
            player.anims.play('goob_right_crouch', true);   
    
        } else if(cursors.left.isDown && cursors.down.isDown && player.body.touching.down){
            player.setVelocityX(-80);
            player.anims.play('goob_left_crouch', true);   
    
        } else if (cursors.left.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){
            if(player.body.velocity.y <= -2){
                player.anims.play('goob_jumpleft', true);
            }
            else if(player.body.velocity.y >= 10){
                player.anims.play('goob_fallleft', true);
            };
            if(!Starmusic){
                player.setVelocityX(-160);
                player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(-600);   
            };
        
        } else if(cursors.right.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){
    
            if(player.body.velocity.y <= -2 ){
                player.anims.play('goob_jumpright', true);
            }
            else if(player.body.velocity.y >= 10){
                player.anims.play('goob_fallright', true);
            };
            if(!Starmusic){
            player.setVelocityX(160);
            player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(600);   
            };
    
            
        } else if(!cursors.down.isDown && !keyA.isDown && !cursors.space.isDown && !player.body.touching.down){
            if(player.body.velocity.y <= -2){
                player.anims.play('goob_jumpfront', true);
            }
            else if(player.body.velocity.y >= 2){
                player.anims.play('goob_fallfront', true);
            };
    
            if(!Starmusic){
            player.setVelocityX(0);
            };
            player.setAccelerationX(0);
    
        } else if(keyA.isDown && !player.body.touching.down && !Cooldown){
                if(player.body.velocity.x <= 50 && player.body.velocity.x >= -50){
                    player.setVelocityX(Phaser.Math.Between(160, -160))
                }
                if(!Flymusic){
                    player.setAccelerationY(-2000);
                    this.time.delayedCall(500, () =>
                        {
                            player.setAccelerationY(900)
                            Cooldown = true
                        })
                }
                else if (Flymusic){
                    player.setAccelerationY(-2300);
                    this.time.delayedCall(600, () =>
                        {
                            player.setAccelerationY(900)
                            Cooldown = true
                        })
                }

                if(player.body.velocity.x >= 1 || cursors.right.isDown){
                    player.anims.play('goob_float_right', true);
                }
                else if (player.body.velocity.x <= -1 || cursors.left.isDown){
                    player.anims.play('goob_float_left', true) ; 
                }

                if(!this.floatSFX.isPlaying){
                    this.floatSFX.play();
                }
    
        }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown && cursors.down.isDown){
            player.setVelocityX(0);
            player.setAccelerationX(0);
            player.anims.play('goob_crouch', true);
    
        }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown){
    
            if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
                if(!Rain){
                    player.setAccelerationX(-600);
                }
                else if (Rain){
                    player.setAccelerationX(-300);
                }
                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                    };
            }
            if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
                if(!Rain){
                    player.setAccelerationX(600);
                }
                else if (Rain){
                    player.setAccelerationX(300);
                }
                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                };
            }
    
            if(player.body.velocity.x <= -191){
                player.anims.play('goob_leftskidd', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -161){
                player.anims.play('goob_leftturnskidd', true);
            }
    
            else if(player.body.velocity.x >= 191){
                player.anims.play('goob_rightskidd', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 161){
                player.anims.play('goob_rightturnskidd', true);
            }
               
            else if((player.body.velocity.x >= -160 || player.body.velocity.x <= 160 || player.body.velocity.x == 0)){
            player.setVelocityX(0);
            player.setAccelerationX(0);
            player.anims.play('goob_turn', true);
                if (this.jumpSFX.isPlaying || this.airjumpSFX.isPlaying || this.jumpSFX.isPlaying && this.airjumpSFX.isPlaying){
                    this.jumpSFX.pause();
                    this.airjumpSFX.pause();
                };
            }
    
        }
    
        if((keyD.isDown || cursors.up.isDown) && player.body.touching.down && !gameOver){
            player.setVelocityY(-490);
            this.jumpSFX.play();
            this.flyBoost.copyPosition(player).play('fly_boost');
    
        }
    
        else if((keyD.isDown || cursors.up.isDown) && !player.body.touching.down && !gameOver && Flymusic && player.body.velocity.y > 200){
            player.setVelocityY(-300);
            this.flyBoost.copyPosition(player).play('fly_boost');
            this.airjumpSFX.play();
    
        };
        if(!player.body.touching.down && (!(keyD.isDown || cursors.up.isDown) || player.body.velocity.y >= 10) && !gameOver && !keyA.isDown){
            player.setAccelerationY(900)
            this.floatSFX.pause();
        }
        else if(!player.body.touching.down && (keyD.isDown || cursors.up.isDown) && !gameOver && !keyA.isDown){
            player.setAccelerationY(0)
            this.floatSFX.pause();
        }
        else if(player.body.touching.down && !gameOver && !keyA.isDown){
            player.setAccelerationY(0)
            this.floatSFX.pause();
        }
    }
    else if(Metalmusic && !gameOver){

        player.setMaxVelocity(600, 5000)
        if(Air){
            player.body.setGravityX(-100)
        }
        else if(Air2){
            player.body.setGravityX(100)
        }
       
            if(cursors.right.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.left.isDown){
            if(player.body.velocity.x >= -400 && player.body.velocity.x <= -121){

                player.setAccelerationX(900);
                
                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 120 || player.body.velocity.x >= -120 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(120);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(120);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(400);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(200);
                        player.setAccelerationX(200);
                    };
                }
            };
    
            if (player.body.velocity.x >= 1 && player.body.velocity.x <= 249){
                player.anims.play('goob_right_m', true)
            }
            else if(player.body.velocity.x >= 250){
                player.anims.play('goob_rightrunning_m', true);
            }
    
            else if(player.body.velocity.x <= -191){
                player.anims.play('goob_leftskidd_m', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -1){
                player.anims.play('goob_leftturnskidd_m', true);
            };
    
        }else if(cursors.left.isDown && !cursors.down.isDown && !keyD.isDown && player.body.touching.down && !cursors.right.isDown){
            if(player.body.velocity.x <= 400 && player.body.velocity.x >= 121){
                player.setAccelerationX(-900);

                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 120 || player.body.velocity.x >= -120 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(-120);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(-120);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(-400);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(-200);
                        player.setAccelerationX(-200);
                    };
                }
            };
    
            if (player.body.velocity.x <= -1 && player.body.velocity.x >= -249){
                player.anims.play('goob_left_m', true)
            }
            else if(player.body.velocity.x <= -250){
                player.anims.play('goob_leftrunning_m', true);
            }
    
            else if(player.body.velocity.x >= 191){
                player.anims.play('goob_rightskidd_m', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 1){
                player.anims.play('goob_rightturnskidd_m', true);
            };
      
        } else if(cursors.right.isDown && cursors.down.isDown && player.body.touching.down){
            player.setVelocityX(80);
            player.anims.play('goob_right_crouch_m', true);   
    
        } else if(cursors.left.isDown && cursors.down.isDown && player.body.touching.down){
            player.setVelocityX(-80);
            player.anims.play('goob_left_crouch_m', true);   
    
        } else if (cursors.left.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){
            if(player.body.velocity.y <= -2){
                player.anims.play('goob_jumpleft_m', true);
            }
            else if(player.body.velocity.y >= 10){
                player.anims.play('goob_fallleft_m', true);
            };
            if(!Starmusic){
                player.setVelocityX(-160);
                player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(-400);   
            };
        
        } else if(cursors.right.isDown && !cursors.down.isDown && !keyA.isDown && !player.body.touching.down){
    
            if(player.body.velocity.y <= -2 ){
                player.anims.play('goob_jumpright_m', true);
            }
            else if(player.body.velocity.y >= 10){
                player.anims.play('goob_fallright_m', true);
            };
            if(!Starmusic){
            player.setVelocityX(160);
            player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(600);   
            };
    
            
        } else if(!cursors.down.isDown && !keyA.isDown && !cursors.space.isDown && !player.body.touching.down){
            if(player.body.velocity.y <= -2){
                player.anims.play('goob_jumpfront_m', true);
            }
            else if(player.body.velocity.y >= 2){
                player.anims.play('goob_fallfront_m', true);
            };
    
            if(!Starmusic){
            player.setVelocityX(0);
            };
            player.setAccelerationX(0);
    
        } else if(keyA.isDown && !player.body.touching.down && !Cooldown){
                if(player.body.velocity.x <= 50 && player.body.velocity.x >= -50){
                    player.setVelocityX(Phaser.Math.Between(160, -160))
                }
                if(!Flymusic){
                    player.setAccelerationY(-2000);
                    this.time.delayedCall(500, () =>
                        {
                            player.setAccelerationY(900)
                            Cooldown = true
                        })
                }
                else if (Flymusic){
                    player.setAccelerationY(-2300);
                    this.time.delayedCall(600, () =>
                        {
                            player.setAccelerationY(900)
                            Cooldown = true
                        })
                }

                if(player.body.velocity.x >= 1 || cursors.right.isDown){
                    player.anims.play('goob_float_right_m', true);
                }
                else if (player.body.velocity.x <= -1 || cursors.left.isDown){
                    player.anims.play('goob_float_left_m', true) ; 
                }
                if (!this.floatMSFX.isPlaying){
                    this.floatMSFX.play();
                }

    
        }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown && cursors.down.isDown){
            player.setVelocityX(0);
            player.setAccelerationX(0);
            player.anims.play('goob_crouch_m', true);
    
        }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown){
    
            if(player.body.velocity.x <= 400 && player.body.velocity.x >= 121){
                player.setAccelerationX(-900);

                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                    };
            }
            if(player.body.velocity.x >= -400 && player.body.velocity.x <= -121){
                
                player.setAccelerationX(900);

                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                };
            }
    
            if(player.body.velocity.x <= -191){
                player.anims.play('goob_leftskidd_m', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -121){
                player.anims.play('goob_leftturnskidd_m', true);
            }
    
            else if(player.body.velocity.x >= 191){
                player.anims.play('goob_rightskidd_m', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 121){
                player.anims.play('goob_rightturnskidd_m', true);
            }
               
            else if((player.body.velocity.x >= -120 || player.body.velocity.x <= 120 || player.body.velocity.x == 0)){
            player.setVelocityX(0);
            player.setAccelerationX(0);
            player.anims.play('goob_turn_m', true);
                if (this.jumpSFX.isPlaying || this.airjumpSFX.isPlaying || this.jumpSFX.isPlaying && this.airjumpSFX.isPlaying){
                    this.jumpSFX.pause();
                    this.airjumpSFX.pause();
                };
            }
    
        }
    
        if((keyD.isDown || cursors.up.isDown) && player.body.touching.down && !gameOver){
            player.setVelocityY(-500);
            this.jumpMSFX.play();
            this.flyBoost.copyPosition(player).play('fly_boost');
    
        }
    
        else if((keyD.isDown || cursors.up.isDown) && !player.body.touching.down && !gameOver && Flymusic && player.body.velocity.y > 200){
            player.setVelocityY(-300);
            this.flyBoost.copyPosition(player).play('fly_boost');
            this.airjumpMSFX.play();
    
        };
        if(!player.body.touching.down && (!(keyD.isDown || cursors.up.isDown) || player.body.velocity.y >= 10) && !gameOver && !keyA.isDown){
            player.setAccelerationY(1200)
            this.floatMSFX.pause();
        }
        else if(!player.body.touching.down && (keyD.isDown || cursors.up.isDown) && !gameOver && !keyA.isDown){
            player.setAccelerationY(0)
            this.floatMSFX.pause();
        }
        else if(player.body.touching.down && !gameOver && !keyA.isDown){
            player.setAccelerationY(0)
            this.floatMSFX.pause();
        }
    }
    if(!cursors.down.isDown){
        player.setSize(32, 41)
    }
    else if(cursors.down.isDown){
        player.setSize(28, 36)
    }
}

else if (Char3 || TempChar3){

    player.setSize(32, 41)
    if(gameOver){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('ende_death', true);
        this.rightBoost.setVisible(false);
        this.leftBoost.setVisible(false);
        this.upBoost.setVisible(false);
    }

    else if(!Metalmusic && !gameOver){

        player.setMaxVelocity(600, 1000)
        player.body.setGravityX(0);
       
            if(cursors.right.isDown && !keyD.isDown && player.body.touching.down && !cursors.left.isDown){
            if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
                if(!Rain){
                    player.setAccelerationX(800);
                }
                else if (Rain){
                    player.setAccelerationX(500);
                };
                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(160);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(160);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(600);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(300);
                        player.setAccelerationX(300);
                    };
                }
            };
    
            if (player.body.velocity.x >= 1 && player.body.velocity.x <= 249){
                player.anims.play('ende_right', true)
            }
            else if(player.body.velocity.x >= 250){
                player.anims.play('ende_rightrunning', true);
            }
    
            else if(player.body.velocity.x <= -191){
                player.anims.play('ende_leftskidd', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -1){
                player.anims.play('ende_leftturnskidd', true);
            };
    
        }else if(cursors.left.isDown && !keyD.isDown && player.body.touching.down && !cursors.right.isDown){
            if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
                if(!Rain){
                    player.setAccelerationX(-800);
                }
                else if (Rain){
                    player.setAccelerationX(-500);
                }

                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(-160);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(-160);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(-600);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(-300);
                        player.setAccelerationX(-300);
                    };
                }
            };
    
            if (player.body.velocity.x <= -1 && player.body.velocity.x >= -249){
                player.anims.play('ende_left', true)
            }
            else if(player.body.velocity.x <= -250){
                player.anims.play('ende_leftrunning', true);
            }
            else if(player.body.velocity.x >= 191){
                player.anims.play('ende_rightskidd', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 1){
                player.anims.play('ende_rightturnskidd', true);
            };
      
        } else if (cursors.left.isDown && !keyA.isDown && !player.body.touching.down){

            if(!Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpleft', true);
                }
                else if(player.body.velocity.y >= 10){
                    player.anims.play('ende_fallleft', true);
                };
            }
 
            else if(Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpleft_fly', true);
                }
                else if(player.body.velocity.y >= -1){
                    player.anims.play('ende_fallleft_fly', true);
                };
            };

            if(!Starmusic){
                player.setVelocityX(-160);
                player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(-600);   
            };
        
        } else if(cursors.right.isDown && !keyA.isDown && !player.body.touching.down){
    
            if(!Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpright', true);
                }
                else if(player.body.velocity.y >= 10){
                    player.anims.play('ende_fallright', true);
                };
            }
 
            else if(Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpright_fly', true);
                }
                else if(player.body.velocity.y >= -1){
                    player.anims.play('ende_fallright_fly', true);
                };
            };
            
            if(!Starmusic){
            player.setVelocityX(160);
            player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(600);   
            };
    
            
        } else if(!keyA.isDown && !cursors.space.isDown && !player.body.touching.down){
            if(!Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpfront', true);
                }
                else if(player.body.velocity.y >= 10){
                    player.anims.play('ende_fallfront', true);
                };
            }
 
            else if(Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpfront_fly', true);
                }
                else if(player.body.velocity.y >= -1){
                    player.anims.play('ende_fallfront_fly', true);
                };
            };
    
            if(!Starmusic){
            player.setVelocityX(0);
            };
            player.setAccelerationX(0);


            

        
    
        } else if(keyA.isDown && !player.body.touching.down && !Cooldown){

                Boost = true

                if((!cursors.left.isDown && !cursors.right.isDown)){
                    player.setVelocityY(-500);
                }
                else if(!cursors.left.isDown && cursors.right.isDown){
                    player.setVelocityX(500);
                    if (cursors.up.isDown && !cursors.down.isDown){
                        player.setVelocityY(-200);
                    }
                    else if (!cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(200);
                    }
                    else if(!cursors.up.isDown && !cursors.down.isDown || cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(0); 
                    }

                }
                else if(cursors.left.isDown && !cursors.right.isDown){
                    player.setVelocityX(-500);
                    if (cursors.up.isDown && !cursors.down.isDown){
                        player.setVelocityY(-200);
                    }
                    else if (!cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(200);
                    }
                    else if(!cursors.up.isDown && !cursors.down.isDown || cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(0); 
                    }
                }

                if(!this.boostSFX.isPlaying){
                    this.boostSFX.play();
                }

                if(player.body.velocity.y <= -400 && player.body.velocity.x > -50 && player.body.velocity.x < 50){
                    player.anims.play('ende_boost_up', true);
                }
                else if(player.body.velocity.x < -50 && player.body.velocity.y >= -400){
                    player.anims.play('ende_boost_left', true);

                }
                else if(player.body.velocity.x > 50 && player.body.velocity.y >= -400){
                    player.anims.play('ende_boost_right', true);
                }

                    this.time.delayedCall(300, () =>
                        {
                            player.setVelocity(0, 0)
                            this.boostSFX.stop()
                            Boost = false
                            Cooldown = true
                        })



            
        }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown){
    
            if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
                if(!Rain){
                    player.setAccelerationX(-800);
                }
                else if (Rain){
                    player.setAccelerationX(-500);
                }
                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                    };
            }
            if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
                if(!Rain){
                    player.setAccelerationX(800);
                }
                else if (Rain){
                    player.setAccelerationX(500);
                }
                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                };
            }
    
            if(player.body.velocity.x <= -191){
                player.anims.play('ende_leftskidd', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -161){
                player.anims.play('ende_leftturnskidd', true);
            }
    
            else if(player.body.velocity.x >= 191){
                player.anims.play('ende_rightskidd', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 161){
                player.anims.play('ende_rightturnskidd', true);
            }
               
            else if((player.body.velocity.x >= -160 || player.body.velocity.x <= 160 || player.body.velocity.x == 0)){
            player.setVelocityX(0);
            player.setAccelerationX(0);
            player.anims.play('ende_turn', true);
                if (this.jumpSFX.isPlaying || this.airjumpSFX.isPlaying || this.jumpSFX.isPlaying && this.airjumpSFX.isPlaying){
                    this.jumpSFX.pause();
                    this.airjumpSFX.pause();
                };
            }
    
        }
    
        if((keyD.isDown || cursors.up.isDown) && player.body.touching.down && !gameOver){
            player.setVelocityY(-490);
            this.jumpSFX.play();
            this.flyBoost.copyPosition(player).play('fly_boost');
    
        }
    
        else if((keyD.isDown || cursors.up.isDown) && !player.body.touching.down && !gameOver && Flymusic && player.body.velocity.y > 1 && !Cooldown){
            player.setVelocityY(-300);
            this.flyBoost.copyPosition(player).play('fly_boost');
            this.airjumpSFX.play();
    
        };
        if(!player.body.touching.down && (!(keyD.isDown || cursors.up.isDown) || player.body.velocity.y >= 10) && !gameOver && !keyA.isDown && !Cooldown){
            player.setAccelerationY(900)
            this.floatSFX.pause();
        }
        else if(!player.body.touching.down && (keyD.isDown || cursors.up.isDown) && !gameOver && !keyA.isDown || Cooldown){
            player.setAccelerationY(0)
            this.floatSFX.pause();
        }
        else if(player.body.touching.down && !gameOver && !keyA.isDown){
            player.setAccelerationY(0)
            this.floatSFX.pause();
        }

        if (Boost){
            if(player.body.velocity.y <= -400 && player.body.velocity.x > -50 && player.body.velocity.x < 50){
                this.upBoost.anims.play('boost_up', true).setVisible(true);
            }
            else if(player.body.velocity.x < -50 && player.body.velocity.y >= -400){
                this.leftBoost.anims.play('boost_left', true).setVisible(true);

            }
            else if(player.body.velocity.x > 50 && player.body.velocity.y >= -400){
                this.rightBoost.anims.play('boost_right', true).setVisible(true);
            }
        }
        else if (!Boost){
            this.rightBoost.setVisible(false);
            this.leftBoost.setVisible(false);
            this.upBoost.setVisible(false);
        }

        if(Cooldown){
            player.anims.play('ende_death', true);
        
        }


    }

    else if(Metalmusic && !gameOver){

        player.setMaxVelocity(600, 1000)
        player.body.setGravityX(0);
       
            if(cursors.right.isDown && !keyD.isDown && player.body.touching.down && !cursors.left.isDown){
            if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
                if(!Rain){
                    player.setAccelerationX(800);
                }
                else if (Rain){
                    player.setAccelerationX(500);
                };
                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(160);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(160);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(600);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(300);
                        player.setAccelerationX(300);
                    };
                }
            };
    
            if (player.body.velocity.x >= 1 && player.body.velocity.x <= 249){
                player.anims.play('ende_right_m', true)
            }
            else if(player.body.velocity.x >= 250){
                player.anims.play('ende_rightrunning_m', true);
            }
    
            else if(player.body.velocity.x <= -191){
                player.anims.play('ende_leftskidd_m', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -1){
                player.anims.play('ende_leftturnskidd_m', true);
            };
    
        }else if(cursors.left.isDown && !keyD.isDown && player.body.touching.down && !cursors.right.isDown){
            if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
                if(!Rain){
                    player.setAccelerationX(-800);
                }
                else if (Rain){
                    player.setAccelerationX(-500);
                }

                if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
            }
    
            else if(player.body.velocity.x <= 160 || player.body.velocity.x >= -160 || player.body.velocity.x == 0){
    
                if (!keyS.isDown){
                    if(!Starmusic){
                        player.setVelocityX(-160);
                        player.setAccelerationX(0);
                    }
                    else if(Starmusic){
                player.setAccelerationX(-160);
                    }
    
                }
                else if (keyS.isDown){ 
             
                    if(Starmusic){
                    player.setAccelerationX(-600);
    
                    }
                    else if(!Starmusic){
                        player.setVelocityX(-300);
                        player.setAccelerationX(-300);
                    };
                }
            };
    
            if (player.body.velocity.x <= -1 && player.body.velocity.x >= -249){
                player.anims.play('ende_left_m', true)
            }
            else if(player.body.velocity.x <= -250){
                player.anims.play('ende_leftrunning_m', true);
            }
            else if(player.body.velocity.x >= 191){
                player.anims.play('ende_rightskidd_m', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 1){
                player.anims.play('ende_rightturnskidd_m', true);
            };
      
        } else if (cursors.left.isDown && !keyA.isDown && !player.body.touching.down){

            if(!Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpleft_m', true);
                }
                else if(player.body.velocity.y >= 10){
                    player.anims.play('ende_fallleft_m', true);
                };
            }
 
            else if(Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpleft_fly_m', true);
                }
                else if(player.body.velocity.y >= -1){
                    player.anims.play('ende_fallleft_fly_m', true);
                };
            };

            if(!Starmusic){
                player.setVelocityX(-160);
                player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(-600);   
            };
        
        } else if(cursors.right.isDown && !keyA.isDown && !player.body.touching.down){
    
            if(!Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpright_m', true);
                }
                else if(player.body.velocity.y >= 10){
                    player.anims.play('ende_fallright_m', true);
                };
            }
 
            else if(Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpright_fly_m', true);
                }
                else if(player.body.velocity.y >= -1){
                    player.anims.play('ende_fallright_fly_m', true);
                };
            };
            
            if(!Starmusic){
            player.setVelocityX(160);
            player.setAccelerationX(0);
            }
            else if(Starmusic){
                player.setAccelerationX(600);   
            };
    
            
        } else if(!keyA.isDown && !cursors.space.isDown && !player.body.touching.down){
            if(!Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpfront_m', true);
                }
                else if(player.body.velocity.y >= 10){
                    player.anims.play('ende_fallfront_m', true);
                };
            }
 
            else if(Flymusic){
                if(player.body.velocity.y <= -2){
                    player.anims.play('ende_jumpfront_fly_m', true);
                }
                else if(player.body.velocity.y >= -1){
                    player.anims.play('ende_fallfront_fly_m', true);
                };
            };
    
            if(!Starmusic){
            player.setVelocityX(0);
            };
            player.setAccelerationX(0);


            

        
    
        } else if(keyA.isDown && !player.body.touching.down && !Cooldown){

                Boost = true

                if((!cursors.left.isDown && !cursors.right.isDown)){
                    player.setVelocityY(-500);
                }
                else if(!cursors.left.isDown && cursors.right.isDown){
                    player.setVelocityX(500);
                    if (cursors.up.isDown && !cursors.down.isDown){
                        player.setVelocityY(-200);
                    }
                    else if (!cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(200);
                    }
                    else if(!cursors.up.isDown && !cursors.down.isDown || cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(0); 
                    }

                }
                else if(cursors.left.isDown && !cursors.right.isDown){
                    player.setVelocityX(-500);
                    if (cursors.up.isDown && !cursors.down.isDown){
                        player.setVelocityY(-200);
                    }
                    else if (!cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(200);
                    }
                    else if(!cursors.up.isDown && !cursors.down.isDown || cursors.up.isDown && cursors.down.isDown){
                        player.setVelocityY(0); 
                    }
                }

                if(!this.boostSFX.isPlaying){
                    this.boostSFX.play();
                }

                if(player.body.velocity.y <= -400 && player.body.velocity.x > -50 && player.body.velocity.x < 50){
                    player.anims.play('ende_boost_up_m', true);
                }
                else if(player.body.velocity.x < -50 && player.body.velocity.y >= -400){
                    player.anims.play('ende_boost_left_m', true);

                }
                else if(player.body.velocity.x > 50 && player.body.velocity.y >= -400){
                    player.anims.play('ende_boost_right_m', true);
                }

                    this.time.delayedCall(400, () =>
                        {
                            player.setVelocity(0, 0)
                            this.boostSFX.stop()
                            Boost = false
                            Cooldown = true
                        })



            
        }else if(player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown){
    
            if(player.body.velocity.x <= 600 && player.body.velocity.x >= 161){
                if(!Rain){
                    player.setAccelerationX(-800);
                }
                else if (Rain){
                    player.setAccelerationX(-500);
                }
                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                    };
            }
            if(player.body.velocity.x >= -600 && player.body.velocity.x <= -161){
                if(!Rain){
                    player.setAccelerationX(800);
                }
                else if (Rain){
                    player.setAccelerationX(500);
                }
                if(!this.skiddSFX.isPlaying){
                    this.skiddSFX.play();
                };
            }
    
            if(player.body.velocity.x <= -191){
                player.anims.play('ende_leftskidd_m', true);
            }
            else if(player.body.velocity.x >= -190 && player.body.velocity.x <= -161){
                player.anims.play('ende_leftturnskidd_m', true);
            }
    
            else if(player.body.velocity.x >= 191){
                player.anims.play('ende_rightskidd_m', true);
            }
            else if(player.body.velocity.x <= 190 && player.body.velocity.x >= 161){
                player.anims.play('ende_rightturnskidd_m', true);
            }
               
            else if((player.body.velocity.x >= -160 || player.body.velocity.x <= 160 || player.body.velocity.x == 0)){
            player.setVelocityX(0);
            player.setAccelerationX(0);
            player.anims.play('ende_turn_m', true);
                if (this.jumpSFX.isPlaying || this.airjumpSFX.isPlaying || this.jumpSFX.isPlaying && this.airjumpSFX.isPlaying){
                    this.jumpSFX.pause();
                    this.airjumpSFX.pause();
                };
            }
    
        }
    
        if((keyD.isDown || cursors.up.isDown) && player.body.touching.down && !gameOver){
            player.setVelocityY(-490);
            this.jumpMSFX.play();
            this.flyBoost.copyPosition(player).play('fly_boost');
    
        }
    
        else if((keyD.isDown || cursors.up.isDown) && !player.body.touching.down && !gameOver && Flymusic && player.body.velocity.y > 1 && !Cooldown){
            player.setVelocityY(-300);
            this.flyBoost.copyPosition(player).play('fly_boost');
            this.airjumpMSFX.play();
    
        };
        if(!player.body.touching.down && (!(keyD.isDown || cursors.up.isDown) || player.body.velocity.y >= 10) && !gameOver && !keyA.isDown && !Cooldown){
            player.setAccelerationY(900)
            this.floatSFX.pause();
        }
        else if(!player.body.touching.down && (keyD.isDown || cursors.up.isDown) && !gameOver && !keyA.isDown || Cooldown){
            player.setAccelerationY(0)
            this.floatSFX.pause();
        }
        else if(player.body.touching.down && !gameOver && !keyA.isDown){
            player.setAccelerationY(0)
            this.floatSFX.pause();
        }

        if (Boost){
            if(player.body.velocity.y <= -400 && player.body.velocity.x > -50 && player.body.velocity.x < 50){
                this.upBoost.anims.play('boost_up', true).setVisible(true);
            }
            else if(player.body.velocity.x < -50 && player.body.velocity.y >= -400){
                this.leftBoost.anims.play('boost_left', true).setVisible(true);

            }
            else if(player.body.velocity.x > 50 && player.body.velocity.y >= -400){
                this.rightBoost.anims.play('boost_right', true).setVisible(true);
            }
        }
        else if (!Boost){
            this.rightBoost.setVisible(false);
            this.leftBoost.setVisible(false);
            this.upBoost.setVisible(false);
        }

        if(Cooldown){
            player.anims.play('ende_death_m', true);
        
        }


    }

}

if(player.body.touching.down){
    Cooldown = false
}

    if (!this.noontheme.isPlaying && !this.noontheme.intro.isPlaying && !this.nighttheme.isPlaying && !this.nighttheme.intro.isPlaying && 
        !gameOver && !Metalmusic && !Flymusic && !Starmusic){

        if (Noon){
            this.noontheme.play();
        }
        else if (Night){
            this.nighttheme.play();    
        }
    }
    else if (Metalmusic && !gameOver && !Flymusic && !Starmusic){

        if (this.metalTheme.isPlaying){
            this.metalTheme.intro.pause();
        };

        if (!this.metalTheme.isPlaying && !this.metalTheme.intro.isPlaying && !this.starTheme.isPlaying){
            this.metalTheme.play();
        }

    }
    else if (Flymusic && !gameOver && !Metalmusic && !Starmusic){

        if (this.flyTheme.isPlaying){
            this.flyTheme.intro.pause();
        };
    

        if (!this.flyTheme.isPlaying && !this.flyTheme.intro.isPlaying && !this.starTheme.isPlaying){
            this.flyTheme.play();
        }

    }
    else if (Flymusic && Metalmusic && !Starmusic && !gameOver){
        this.flyTheme.pause();
        this.flyTheme.intro.pause();
        this.metalTheme.pause();
        this.metalTheme.intro.pause();
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

        this.time.delayedCall(600, () =>
            {
            if (!this.MetalFlyTheme.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying && !this.starTheme.isPlaying){
                this.MetalFlyTheme.play();
            }
        });

    }
    else if (!this.noontheme.isPlaying && Starmusic && !gameOver){

            invStars.copyPosition(player);
            this.MetalFlyTheme.pause();

        if (!Metalmusic && Flymusic){
            this.starTheme.pause();
            this.starMTheme.pause();
            this.starMFTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starFTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starFTheme.play();
                }
            });
        }
        else if (Metalmusic && !Flymusic){
            this.starTheme.pause();
            this.starFTheme.pause();
            this.starMFTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starMTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starMTheme.play();

                }
            });
        }
        else if (!Metalmusic && !Flymusic){
            this.starFTheme.pause();
            this.starMTheme.pause();
            this.starMFTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starTheme.play();

                }
            });
        }
        else if (Metalmusic && Flymusic){
            this.starFTheme.pause();
            this.starMTheme.pause();
            this.starTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starMFTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starMFTheme.play();

                }
            });
        }

    }
    else if (!Starmusic && !gameOver){
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

    }
    else if (gameOver && player.y < 610 && player.y > -300){

        this.metalTheme.pause();
        this.metalTheme.intro.pause();
        this.flyTheme.pause();
        this.flyTheme.intro.pause();
        this.noontheme.pause();
        this.noontheme.intro.pause();
        this.nighttheme.pause();
        this.nighttheme.intro.pause();
        this.MetalFlyTheme.pause();
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

        this.physics.pause();
     
        gameOver = true;

        if (!this.gameOvertheme.isPlaying){
            
            this.gameOvertheme.play();
        };
    }
    else if ((player.y >= 610 || player.y <= -300) && gameOver){

        this.metalTheme.pause();
        this.metalTheme.intro.pause();
        this.flyTheme.pause();
        this.flyTheme.intro.pause();
        this.noontheme.pause();
        this.noontheme.intro.pause();
        this.nighttheme.pause();
        this.nighttheme.intro.pause();
        this.MetalFlyTheme.pause();
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

        if (!this.bruhtheme.isPlaying){
            
            this.bruhtheme.play();
        };

    };

    if (player.y >= 610 || player.y <= -300){

        bruh_screen.setVisible(true);
        this.physics.pause();

        gameOver = true
    }

    if(Ghostmusic && !gameOver){
    bombs.setAlpha(0.7);
    stars.setAlpha(0.7);
    }
    else if(Ghostmusic == false || gameOver){
        bombs.setAlpha(1);
        stars.setAlpha(1);
    }

    this.physics.world.wrap(this.noonClouds, 100);

    this.physics.world.wrap(this.noonClouds2, 100);
    if(Air){
        this.noonClouds.setVelocity(100, -50);
        this.noonClouds2.setVelocity(100, -50);
    }
    else if(Air2){
        this.noonClouds.setVelocity(-100, -50);
        this.noonClouds2.setVelocity(-100, -50);
    }
    else if(!Air && !Air2){
            this.noonClouds.setVelocity(50, 50);
            this.noonClouds2.setVelocity(50, 50);
        
    }

    if(!this.rainSFX.isPlaying && !gameOver && Rain){
        this.rainSFX.play();
    }

    if(!this.airSFX.isPlaying && !gameOver && (Air || Air2)){
        this.airSFX.play();
    }

    this.physics.world.wrap(this.nightstars, 0);
    this.nightstars.setVelocity(10, -20);

    this.physics.world.wrap(this.rain, 0);
    this.rain.setVelocity(700, 700);

    this.physics.world.wrap(this.air, 0);
    this.air.setVelocity(1000, -500);

    this.physics.world.wrap(this.air2, 0);
    this.air2.setVelocity(-1000, -500);


}

    
    
    



function collectStar(player, star){
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: '+score);

    if(stars.countActive(true) == 0 ){
        stars.children.iterate(function(child){
            child.enableBody(true, (Phaser.Math.Between(10, 1450)), 0, true, true);
            child.setBounce(0.9);
            child.setVelocityX(Phaser.Math.FloatBetween(-200, 200), 20);
            child.setCollideWorldBounds(true);

        });

        var StarRandom = Phaser.Math.Between(1, 10);


        var Xmetal = Phaser.Math.Between(100, 1400);
        var Ymetal = Phaser.Math.Between(100, 450);

        var Xghost = Phaser.Math.Between(100, 1400);
        var Yghost = Phaser.Math.Between(100, 450);

        var Xfly = Phaser.Math.Between(100, 1400);
        var Yfly = Phaser.Math.Between(100, 450);

        var Xstar = Phaser.Math.Between(100, 1400);
        var Ystar = Phaser.Math.Between(100, 450);

        var Xchaotix = Phaser.Math.Between(100, 1400);
        var Ychaotix = Phaser.Math.Between(100, 450);

        if (!Metalmusic && metalboxes.countActive(true) == 0 && 
        (StarRandom == 1 || StarRandom == 2 || StarRandom == 3 || StarRandom == 5 || StarRandom == 7)){

            var metalbox = metalboxes.create(Xmetal, Ymetal, 'metalic_box');
            metalbox.anims.play('metalicblock', true);
        };

        if (!Ghostmusic && ghostboxes.countActive(true) == 0 && 
        (StarRandom == 2 || StarRandom == 3 || StarRandom == 4 || StarRandom == 6 || StarRandom == 8)){

            var ghostbox = ghostboxes.create(Xghost, Yghost, 'ghostic_box');
            ghostbox.anims.play('ghosticblock', true);
        };

        if (!Flymusic && flyboxes.countActive(true) == 0 &&
        (StarRandom == 1 || StarRandom == 3 || StarRandom == 6 || StarRandom == 9)){

            var flybox = flyboxes.create(Xfly, Yfly, 'flystic_box');
            flybox.anims.play('flysticblock', true);
        };

        if (!Starmusic && starboxes.countActive(true) == 0 && 
        (StarRandom == 3 || StarRandom == 1 || StarRandom == 4)){

            var starbox = starboxes.create(Xstar, Ystar, 'starstic_box');
            starbox.anims.play('starsticblock', true);
        };

        if (!TempChar1 && !TempChar2 && !TempChar3 && chaotixboxes.countActive(true) == 0 && 
        (StarRandom == 3 || StarRandom == 10)){

            var chaotixbox = chaotixboxes.create(Xchaotix, Ychaotix, 'char_change');
            chaotixbox.anims.play('chaotixbox', true);
        }


        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0,400);

        var bomb = bombs.create(x, 16, 'bomb');

        var bombColor = Phaser.Math.Between(5, 10);
        if(bombColor <= 5 || bombs.countActive(true) <= 1){
            bomb.anims.play('bomb_movement_r', true);
        }
        else if(bombColor >= 6 && bombs.countActive(true) >= 2){
            bomb.anims.play('bomb_movement', true);
        }

        bomb.setCollideWorldBounds(true);
        bomb.setBounce(1);

        if(!Char3){
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            if(Air){
                bomb.body.setGravityX(-50)
                bomb.setVelocityX(Phaser.Math.Between(-150, 250))
            }
            else if(Air2){
                bomb.body.setGravityX(50)
                bomb.setVelocityX(Phaser.Math.Between(-250, 150))
            };
            if(Ghostmusic){
                bomb.setAlpha(0.5);
            }
        }

        else if(Char3){
            bomb.setVelocity(Phaser.Math.Between(-500, 500), 20);
            if(Air){
                bomb.body.setGravityX(-50)
                bomb.setVelocityX(Phaser.Math.Between(-250, 350))
            }
            else if(Air2){
                bomb.body.setGravityX(50)
                bomb.setVelocityX(Phaser.Math.Between(-350, 250))
            };
            if(Ghostmusic){
                bomb.setAlpha(0.5);
            }
        }
    }

}


function hitBomb(player, bomb){

    if(Boost || Metalmusic || Starmusic){
        this.sound.play('hitbomb_sfx');
        if (Starmusic || Flymusic || Metalmusic){
            score += 50;
            scoreText.setText('Score: '+score);
        }
        this.explosion.copyPosition(bomb).play('explode');
        bomb.destroy();
    }
    else if(!Boost && !Starmusic && !Metalmusic){

        bomb.anims.play('explode_final', true);
        var PITY = Phaser.Math.Between(1, 3);
        if (PITY == 3){
            this.sound.play('pity');
            this.sound.play('hitbomb_sfx');  
        }
        else if (PITY == 2){
            this.sound.play('pipe'); 
        }
        else if (PITY == 1){
            this.sound.play('hitbomb_sfx');   
        };
        this.physics.pause();
        this.add.image(750, 300, 'gameover', true);
   
        gameOver = true;
    }
    
}