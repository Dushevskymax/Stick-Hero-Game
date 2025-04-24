import { _decorator, Component, Node, Prefab, input, Input, director, UITransform } from 'cc';
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
    private growthSpeed: number = 2.5;
    private maxHeight: number = 1000;
    private currentScaleY: number = 0;

    start() {
        this.view = this.gameView;
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.resetGame();
    }

    private resetGame() {
        this.isPlaying = false;
        this.model.reset();
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
        this.view!.showPlayScreen();
        this.view!.setupNextColumn();
        const canvas = director.getScene().getChildByName("Canvas");
        const canvasWidth = canvas.getComponent(UITransform)!.width;
        const startColumnWidth = this.view!['startColumnNode'].getComponent(UITransform)!.width;
        const playerWidth = this.view!['playerNode'].getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth / 2;
        const randomPosition = this.view!.randomPosition;
        const playerX = startColumnX + playerWidth / 4;
        const nextColumnX = randomPosition - canvasWidth;

        this.model.getStartColumn().x = startColumnX;
        this.model.setPlayerX(playerX);
        this.model.setNextColumnX(nextColumnX);

        this.view!.animateInitialSetup(startColumnX, playerX, nextColumnX);
    }

    public onRetryButtonPressed() {
        this.view!.showPlayScreen();
    }

    private onTouchStart() {
        if (!this.isPlaying) return;
        if (!this.model.isStickGrowing()) {
            this.model.setStickGrowing(true);
            this.currentScaleY = 0;
            const startColumn = this.model.getStartColumn();
            const startColumnWidth = this.view!['startColumnNode'].getComponent(UITransform)!.width;
            const startColumnHeight = this.view!['startColumnNode'].getComponent(UITransform)!.height;
            const startX = startColumn.x + startColumnWidth / 2;
            const startY = this.view!['startColumnNode'].position.y + startColumnHeight / 2;
            this.view!.createStick(startX, startY);
            this.view!.updateStick(this.currentScaleY, this.model.getStickAngle());
        }
    }

    private onTouchEnd() {
        if (!this.isPlaying) return;
        if (this.model.isStickGrowing()) {
            this.model.setStickGrowing(false);
            this.view!.dropStick((stick) => this.checkResult(stick));
        }
    }

    private checkResult(stick: Node) {
        try {
            const startColumn = this.view!['startColumnNode'];
            const nextColumn = this.view!['nextColumnNode'];

            const startTransform = startColumn.getComponent(UITransform);
            const nextTransform = nextColumn.getComponent(UITransform);
            const stickTransform = stick.getComponent(UITransform);

            const startPos = startColumn.position;
            const nextPos = nextColumn.position;

            const startRightX = startPos.x + startTransform.width / 2;
            const stickLength = stickTransform.height * stick.scale.y;
            const stickEndX = startRightX + stickLength;

            const nextLeftX = nextPos.x - nextTransform.width / 2;
            const nextRightX = nextPos.x + nextTransform.width / 2;

            console.log(`Проверка результата: startRightX=${startRightX}, stickLength=${stickLength}, stickEndX=${stickEndX}, nextLeftX=${nextLeftX}, nextRightX=${nextRightX}`);

            if (stickEndX >= nextLeftX && stickEndX <= nextRightX) {
                const playerWidth = this.view!['playerNode'].getComponent(UITransform)!.width;
                const playerX = nextPos.x + playerWidth / 4;
                this.model.setPlayerX(playerX);
                this.view!.updatePlayer(playerX);
            } else {
                AnimationHelper.animatePlayerFall(this.view!['playerNode']!, () => {
                    this.isPlaying = false;
                    this.view!.showGameOverScreen();
                });
            }
        } catch (error) {
            console.error("Ошибка в checkResult:", error);
            this.isPlaying = false;
            this.view!.showGameOverScreen();
        }
    }

    update(deltaTime: number) {
        if (!this.isPlaying) return;

        if (this.model.isStickGrowing() && this.view!.stickNode) {
            const stickTransform = this.view!.stickNode.getComponent(UITransform);
            const maxScaleY = this.maxHeight / stickTransform.height;
            const growthSpeed = (this.view as GameView).getGrowthSpeed();

            this.currentScaleY += this.growthSpeed * deltaTime;
            if (this.currentScaleY >= maxScaleY) {
                this.currentScaleY = maxScaleY;
                this.model.setStickGrowing(false);
                this.view!.dropStick((stick) => this.checkResult(stick));
            }

            this.view!.updateStick(this.currentScaleY, this.model.getStickAngle());
        }
    }
}