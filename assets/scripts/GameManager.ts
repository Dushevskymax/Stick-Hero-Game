import { _decorator, Component, Node, Prefab, input, Input } from 'cc';
import { IGameModel, IGameView } from './Interfaces';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { AnimationHelper } from './AnimationHelper';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Prefab) 
    playerPrefab: Prefab;

    @property(Prefab)
    stickPrefab: Prefab;
    
    @property(Prefab)
    columnPrefab: Prefab;

    @property(Node)
    startScreen: Node;

    @property(GameView)
    gameView: GameView;

    private model: IGameModel = new GameModel();
    private view: IGameView | null = null;
    private isPlaying: boolean = false;

    start() {
        this.view = this.getComponent(GameView)!;
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.resetGame();
    }

    private resetGame() {
        this.isPlaying = false;
        this.view!.updateColumns(
            this.model.getStartColumn().x,
            this.model.getStartColumn().width,
            this.model.getNextColumn().x,
            this.model.getNextColumn().width
        );
        this.view!.updatePlayer(this.model.getPlayerX());
        this.view!.showStartScreen();
    }

    onStartButton() {
        this.isPlaying = true;
        this.view!.hideStartScreen();
    }

    private onTouchStart() {
        if (!this.isPlaying) return;
        if (!this.model.isStickGrowing()) {
            this.model.setStickGrowing(true);
        }
    }

    private onTouchEnd() {
        if (!this.isPlaying) return;
        if (this.model.isStickGrowing()) {
            this.model.setStickGrowing(false);
            this.model.setStickAngle(-90);
            this.view!.updateStick(this.model.getStickLength(), this.model.getStickAngle());
            AnimationHelper.animateStickDrop(this.view!['stickNode']!, () => this.checkResult());
        }
    }

    private checkResult() {
        const stickLength = this.model.getStickLength();
        const startColumn = this.model.getStartColumn();
        const nextColumn = this.model.getNextColumn();
        const stickStartX = startColumn.x + startColumn.width / 2;
        const stickEndX = stickStartX + stickLength;
        const nextColumnLeft = nextColumn.x - nextColumn.width / 2;
        const nextColumnRight = nextColumn.x + nextColumn.width / 2;

        if (stickEndX >= nextColumnLeft && stickEndX <= nextColumnRight) {
            this.model.setPlayerX(nextColumn.x);
            this.view!.updatePlayer(nextColumn.x);
        } else {
            AnimationHelper.animatePlayerFall(this.view!['playerNode']!, () => {
                this.isPlaying = false;
                this.view!.showStartScreen();
            });
        }
    }

    
    update(deltaTime: number) {
        if (this.model.isStickGrowing()) {
            const newLength = this.model.getStickLength() + 300 * deltaTime;
            this.model.setStickLength(newLength);
            this.view!.updateStick(newLength, this.model.getStickAngle());
        }
    }
}


