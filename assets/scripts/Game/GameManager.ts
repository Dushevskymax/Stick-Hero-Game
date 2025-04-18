import { _decorator, Component, Node, input, Input} from 'cc';
import { GameState } from './GameState';
import { GameLogic} from './GameLogic'; 
import { ScreenManager} from '../UI/ScreenManager'; 

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(ScreenManager)
    screenManager: ScreenManager;

    @property(GameLogic)
    gameLogic: GameLogic; 

    private currentState: GameState = GameState.STARTSCREEN;

    public setGameState(state: GameState) {
        this.currentState = state;
    
        const stateActions = {
            [GameState.STARTSCREEN]: () => this.gameLogic.resetGame(),
            [GameState.PLAYSCREEN]: () => this.gameLogic.startGame(),
            [GameState.GAMEOVERSCREEN]: () => {/* пока пусто */},
        };

        stateActions[state]?.();
        
        this.screenManager.onGameStateChanged(state);

    }
    
    public onStartButtonPressed() {
        this.setGameState(GameState.PLAYSCREEN);
    }

    public onRetryButtonPressed() {
        this.setGameState(GameState.PLAYSCREEN); 
    }

    public onGameOver() {
        this.setGameState(GameState.GAMEOVERSCREEN);
    }

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        // setTimeout(()=>{
        //     this.GameOverScreen.active = true
        // }, 3000);

        this.setGameState(GameState.STARTSCREEN);
    }

    onTouchStart() {
        if (this.currentState !== GameState.PLAYSCREEN) return;
        this.gameLogic.jump();  
    }

    update(deltaTime: number) {
       
    }
}