import { _decorator, Component, Node, Prefab, input, Input, director, UITransform } from 'cc';
import { IGameModel, IGameView } from './Interfaces';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { AnimationHelper } from './AnimationHelper';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab) playerPrefab: Prefab = null;
    @property(Prefab) stickPrefab: Prefab = null;
    @property(Prefab) columnPrefab: Prefab = null;
    @property(Node) startScreen: Node = null;
    @property(GameView) gameView: GameView = null;

    private model: IGameModel = new GameModel();
    private view: IGameView | null = null;
    private isPlaying: boolean = false;
    private growthSpeed: number = 2.5;
    private maxHeight: number = 1000;
    private currentScaleY: number = 0;
    private isRetry: boolean = false;

    start() {
        this.view = this.gameView;
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.isRetry = false;

        // Инициализируем только модель, сцена уже настроена в GameView.start
        this.model.reset();
        const canvasWidth = this.view!.getCanvasWidth();
        const startColumnWidth = this.view!.getStartColumnNode()!.getComponent(UITransform)!.width;
        const playerWidth = this.view!.getPlayerNode()!.getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth / 2;
        const playerX = startColumnX + playerWidth / 4;

        this.model.setStartColumnX(startColumnX);
        this.model.setPlayerX(playerX);
    }

    private resetGame() {
        this.isPlaying = false;
        this.model.reset();
        this.view!.resetScene();
        const canvasWidth = this.view!.getCanvasWidth();
        const startColumnWidth = this.view!.getStartColumnNode()!.getComponent(UITransform)!.width;
        const playerWidth = this.view!.getPlayerNode()!.getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth / 2;
        const playerX = startColumnX + playerWidth / 4;

        this.model.setStartColumnX(startColumnX);
        this.model.setPlayerX(playerX);

        if (this.isRetry) {
            this.view!.setupNextColumn();
            const nextColumnX = this.view!.randomPosition - canvasWidth;
            this.model.setNextColumnX(nextColumnX);
            this.view!.updateColumns(startColumnX, nextColumnX);
            this.view!.updatePlayer(playerX, true);
        }

        this.view!.showStartScreen();
    }

    onStartButton() {
        this.isPlaying = true;
        this.view!.showPlayScreen();

        const canvasWidth = this.view!.getCanvasWidth();
        const startColumnWidth = this.view!.getStartColumnNode()!.getComponent(UITransform)!.width;
        const playerWidth = this.view!.getPlayerNode()!.getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth / 2;
        const playerX = startColumnX + playerWidth / 4;

        let nextColumnX: number;
        if (!this.isRetry) {
            this.view!.setupNextColumn();
            nextColumnX = this.view!.randomPosition - canvasWidth;
            this.model.setStartColumnX(startColumnX);
            this.model.setPlayerX(playerX);
            this.model.setNextColumnX(nextColumnX);
            this.view!.animateInitialSetup(startColumnX, playerX, nextColumnX);
        } else {
            nextColumnX = this.model.getNextColumnX();
        }
    }

    onRetryButtonPressed() {
        this.isRetry = true;
        this.resetGame();
        this.onStartButton();
    }

    private onTouchStart() {
        if (!this.isPlaying || this.model.isStickGrowing()) return;
        this.model.setStickGrowing(true);
        this.currentScaleY = 0;
        const startColumnX = this.model.getStartColumnX();
        const startColumnWidth = this.view!.getStartColumnNode()!.getComponent(UITransform)!.width;
        const startColumnHeight = this.view!.getStartColumnNode()!.getComponent(UITransform)!.height;
        const startX = startColumnX + startColumnWidth / 2;
        const startY = this.view!.getStartColumnNode()!.position.y + startColumnHeight / 2;
        this.view!.createStick(startX, startY);
        this.view!.updateStick(this.currentScaleY, this.model.getStickAngle());
    }

    private onTouchEnd() {
        if (!this.isPlaying || !this.model.isStickGrowing()) return;
        this.model.setStickGrowing(false);
        this.view!.dropStick(false, (stick) => this.checkResult(stick));
    }

    private checkResult(stick: Node) {
        try {
            const startColumn = this.view!.getStartColumnNode()!;
            const nextColumn = this.view!.getNextColumnNode()!;
            const player = this.view!.getPlayerNode()!;

            const startTransform = startColumn.getComponent(UITransform)!;
            const nextTransform = nextColumn.getComponent(UITransform)!;
            const stickTransform = stick.getComponent(UITransform)!;

            const startPos = startColumn.position;
            const nextPos = nextColumn.position;

            const startRightX = startPos.x + startTransform.width / 2;
            const stickLength = stickTransform.height * stick.scale.y;
            const stickEndX = startRightX + stickLength;

            const nextLeftX = nextPos.x - nextTransform.width / 2;
            const nextRightX = nextPos.x + nextTransform.width / 2;

            if (stickEndX >= nextLeftX && stickEndX <= nextRightX) {
                const playerWidth = player.getComponent(UITransform)!.width;
                const playerX = nextPos.x + playerWidth / 4;
                this.model.setPlayerX(playerX);
                this.view!.updatePlayer(playerX);
            } else {
                (this.view as GameView).animatePlayerToStickEnd(stickEndX, () => {
                    AnimationHelper.animatePlayerFall(player, () => {
                        this.isPlaying = false;
                        this.view!.showGameOverScreen();
                    });
                });
            }
        } catch (error) {
            console.error("Ошибка в checkResult:", error);
            this.isPlaying = false;
            this.view!.showGameOverScreen();
        }
    }

    update(deltaTime: number) {
        if (!this.isPlaying || !this.model.isStickGrowing() || !this.view!.stickNode) return;

        const stickTransform = this.view!.stickNode.getComponent(UITransform)!;
        const maxScaleY = this.maxHeight / stickTransform.height;
        const growthSpeed = (this.view as GameView).getGrowthSpeed();

        this.currentScaleY += this.growthSpeed * deltaTime;
        if (this.currentScaleY >= maxScaleY) {
            this.currentScaleY = maxScaleY;
            this.model.setStickGrowing(false);
            this.view!.dropStick(false, (stick) => this.checkResult(stick));
        }

        this.view!.updateStick(this.currentScaleY, this.model.getStickAngle());
    }
}