import { _decorator, Component, Node, input, Input, RigidBody2D, RigidBodyComponent, Vec2, Vec3, tween, UITransform} from 'cc';
import { ScreenTransition } from './ScreenTransition'; 

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node) 
    player: Node;

    @property(Node) 
    GameOverScreen: Node;

    @property(Node)
    startColumn: Node;

    @property(ScreenTransition)
    startToPlayTransition: ScreenTransition;

    isGameStarted = false;

    start() {
        input.on(Input.EventType.TOUCH_START, this.jump, this);
        // setTimeout(()=>{
        //     this.GameOverScreen.active = true
        // }, 3000)
        this.startToPlayTransition.onTransition = () => {
            this.isGameStarted = true;
            this.prepareStartPosition();
        };
    }

    private jump() {
    
        let body = this.player.getComponent(RigidBody2D);
        body.applyLinearImpulseToCenter(new Vec2(0, 100), true);
    }
 
    public prepareStartPosition() {
        const targetColumnX = -300;
        const currentColumnPos = this.startColumn.position;

        tween(this.startColumn)
        .to(0.4, { position: new Vec3(targetColumnX, currentColumnPos.y, 0) })
        .start();

        const columnWidth = this.startColumn.getComponent(UITransform).width;
        const columnRightEdgeX = targetColumnX + columnWidth / 2;
        const offset = -40; 
        const targetPlayerX = columnRightEdgeX + offset;

        const currentPlayerPos = this.player.position;

    tween(this.player)
        .to(0.4, { position: new Vec3(targetPlayerX, currentPlayerPos.y, 0) })
        .start();
    }

    update(deltaTime: number) {
        
    }
}


