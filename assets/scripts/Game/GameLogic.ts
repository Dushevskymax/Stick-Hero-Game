import { _decorator, Component, Node, tween, Vec2, Vec3, UITransform, RigidBody2D, RigidBodyComponent, director, instantiate, Prefab } from 'cc';
import { PlayerState } from '../Player/PlayerState';
const { ccclass, property } = _decorator;

@ccclass('GameLogic')
export class GameLogic extends Component {

    @property(Node)
    player: Node;

    @property(Node)
    startColumn: Node;

    @property(Prefab)
    nextColumn: Prefab;

    isGameRunning = false;
    playerState: PlayerState = PlayerState.WAITING;

    start() {
        this.resetGame();
    }

    public startGame() {
        this.isGameRunning = true;
        this.generateColumn();
        this.prepareStartPosition();
    }

    public resetGame() {
        this.isGameRunning = false;
        this.playerState = PlayerState.WAITING;
    }

    private prepareStartPosition() {
        const targetColumnX = -300;
        this.animateNodeToPosition(this.startColumn, targetColumnX);
    
        const targetPlayerX = this.calculatePlayerPosition(targetColumnX);
        this.animateNodeToPosition(this.player, targetPlayerX);
    }

    private animateNodeToPosition(node: Node, targetX: number) {
        const currentPos = node.position;
        tween(node)
            .to(0.4, { position: new Vec3(targetX, currentPos.y, 0) })
            .start();
    }

    private calculatePlayerPosition(columnX: number): number {
        const columnWidth = this.startColumn.getComponent(UITransform).width;
        const columnRightEdgeX = columnX + columnWidth / 2;
        const offset = -40;
        return columnRightEdgeX + offset;
    }


    private generateColumn() {
        const canvas = director.getScene().getChildByName("Canvas");
        const newColumn = instantiate(this.nextColumn); 
        newColumn.setParent(canvas);
    
        const uiTransform = newColumn.getComponent(UITransform);
        const canvasWidth = canvas.getComponent(UITransform).width;
       
        const randomWidth = Math.random() * (200 - 20) + 20;
        uiTransform.width = randomWidth;
    
        const startColumnRightEdgeX = this.startColumn.position.x + this.startColumn.getComponent(UITransform).width / 2;
        const screenRightX = canvasWidth / 2;
    
        const minDistance = 100;
        const minTargetX = startColumnRightEdgeX + minDistance;
    
        const maxTargetX = screenRightX - randomWidth / 2;  
    
        const targetX = Math.random() * (maxTargetX - minTargetX) + minTargetX;
        const y = this.startColumn.position.y;
    
        const offscreenX = screenRightX + randomWidth;
        newColumn.setPosition(offscreenX, y, 0);
    
        tween(newColumn)
            .to(0.4, { position: new Vec3(targetX, y, 0) })
            .start();
    }
    
    public jump() {
        let body = this.player.getComponent(RigidBody2D);
        body.applyLinearImpulseToCenter(new Vec2(0, 100), true);
        this.generateColumn();
    }

    update(deltaTime: number) {
      
    }

    
}


