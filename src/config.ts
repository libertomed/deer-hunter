import Tutorial from "./scene/Tutorial";
import Load from './scene/Load';
import HUD from "./scene/Hud";
import ResultsScreen from './scene/ResultsScreen';
const Config = {
    type:               Phaser.AUTO,
    backgroundColor:    '#125555',
    width:              640,
    height:             360,
    scene:              [Load, Tutorial, HUD, ResultsScreen],
    parent:             "canvas",
};

export default Config;