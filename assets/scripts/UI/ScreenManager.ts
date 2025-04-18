import { _decorator, Component, Node } from 'cc';
import { GameState } from '../Game/GameState';
const { ccclass, property } = _decorator;

@ccclass('ScreenManager')
export class ScreenManager extends Component {

    @property(Node)
    startScreen: Node;

    @property(Node)
    playScreen: Node;

    @property(Node)
    gameOverScreen: Node;

    private currentState: GameState = GameState.STARTSCREEN;

    public onGameStateChanged(state: GameState) {
        this.startScreen.active = (state === GameState.STARTSCREEN);
        this.playScreen.active = (state === GameState.PLAYSCREEN);
        this.gameOverScreen.active = (state === GameState.GAMEOVERSCREEN);
    }
    
    start() {
        this.onGameStateChanged(GameState.STARTSCREEN);
    }

    update(deltaTime: number) {
        
    }
}


