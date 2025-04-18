import { _decorator, Component, Node, input, Input} from 'cc';
import { GameState } from './GameState';
import { GameLogic} from './GameLogic'; 

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node) 
    StartScreen: Node;

    @property(Node) 
    PlayScreen: Node;

    @property(Node) 
    GameOverScreen: Node;

    @property(GameLogic)
    gameLogic: GameLogic; 

    private currentState: GameState = GameState.STARTSCREEN;

    public setGameState(state: GameState) {
        this.currentState = state;
    
        this.StartScreen.active = (state === GameState.STARTSCREEN);
        this.PlayScreen.active = (state === GameState.PLAYSCREEN);
        this.GameOverScreen.active = (state === GameState.GAMEOVERSCREEN);

        switch (state) {
            case GameState.STARTSCREEN:
                this.gameLogic.resetGame();
                break;
            case GameState.PLAYSCREEN:
                this.gameLogic.startGame();
                break;
            case GameState.GAMEOVERSCREEN:
                break;
        }
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