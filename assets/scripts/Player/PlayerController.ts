import { _decorator, Component, Node, Vec3, tween, UITransform } from 'cc';
import { PlayerState } from './PlayerState';
import { GameLogic } from '../Game/GameLogic';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property(Node)
    player: Node;  

    @property(GameLogic)
    gameLogic: GameLogic;

    private currentState: PlayerState = PlayerState.WAITING; 

    public setState(state: PlayerState): void {
        this.currentState = state;
        switch(state) {
            case PlayerState.WAITING:
                this.handleWaiting();
                break;
            case PlayerState.MOVING:
                this.handleMoving();
                break;
            case PlayerState.FALLING:
                this.handleFalling();
                break;
        }
    }

    private handleWaiting(): void {
        
    }

    private handleMoving(): void {
       
    }

    private handleFalling(): void {

    }

    private onCompleteMoving(): void {
        this.setState(PlayerState.WAITING);
    }

    public startWalking(): void {
        this.setState(PlayerState.MOVING);  
    }

    public startFalling(): void {
        this.setState(PlayerState.FALLING); 
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


