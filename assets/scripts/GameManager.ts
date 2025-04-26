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
    private isTransitioning: boolean = false;
    private lastDestroyedColumn: Node | null = null;

    start() {
        console.log("GameManager start called");
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.isRetry = false;
        this.model.reset();
    }

    private resetGame() {
        this.isPlaying = false;
        this.model.reset();
        this.view!.resetScene();

        if (!this.view) {
            console.error("View is null in resetGame");
            return;
        }

        const canvasWidth = this.view.getCanvasWidth();
        const startColumnWidth = this.view.getStartColumnNode()!.getComponent(UITransform)!.width;
        const playerWidth = this.view.getPlayerNode()!.getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth / 2;
        const playerX = startColumnX + playerWidth / 4;

        this.model.setStartColumnX(startColumnX);
        this.model.setPlayerX(playerX);

        if (this.isRetry) {
            this.view.setupNextColumn(true);
            const nextColumnX = this.view.randomPosition - canvasWidth;
            this.model.setNextColumnX(nextColumnX);
            this.view.getStartColumnNode()!.setPosition(startColumnX, this.view.getStartColumnNode()!.position.y, 0);
            this.view.getNextColumnNode()!.setPosition(nextColumnX, this.view.getNextColumnNode()!.position.y, 0);
            this.view.updatePlayer(playerX, true);
        }

        this.view.showStartScreen();
    }

    onStartButton() {
        console.log("onStartButton called");

        if (!this.view) {
            if (!this.gameView) {
                console.error("gameView is not assigned in the editor! Please assign GameView component in Cocos Creator.");
                return;
            }
            this.view = this.gameView;
        }

        this.isPlaying = true;
        this.view.showPlayScreen();

        const canvasWidth = this.view.getCanvasWidth();
        const startColumnWidth = this.view.getStartColumnNode()!.getComponent(UITransform)!.width;
        const playerWidth = this.view.getPlayerNode()!.getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth / 2;
        const playerX = startColumnX + playerWidth / 4;

        let nextColumnX: number;
        if (!this.isRetry) {
            this.view.setupNextColumn();
            nextColumnX = this.view.randomPosition - canvasWidth;
            this.model.setStartColumnX(startColumnX);
            this.model.setPlayerX(playerX);
            this.model.setNextColumnX(nextColumnX);
            this.view.animateInitialSetup(startColumnX, playerX, nextColumnX);
        } else {
            nextColumnX = this.model.getNextColumnX();
        }
    }

    onRetryButtonPressed() {
        console.log("onRetryButtonPressed called");
        this.isRetry = true;
        this.resetGame();
        this.onStartButton();
    }

    private onTouchStart() {
        if (!this.isPlaying || this.model.isStickGrowing() || this.isTransitioning) return;
        const startColumnNode = this.view?.getStartColumnNode();
        if (!startColumnNode) {
            console.error("Start column node is null in onTouchStart");
            return;
        }
        this.model.setStickGrowing(true);
        this.currentScaleY = 0;
        const startColumnX = this.model.getStartColumnX();
        const startColumnWidth = startColumnNode.getComponent(UITransform)!.width;
        const startColumnHeight = startColumnNode.getComponent(UITransform)!.height;
        const startX = startColumnX + startColumnWidth / 2;
        const startY = startColumnNode.position.y + startColumnHeight / 2;
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

            (this.view as GameView).animatePlayerToStickEnd(stickEndX, () => {
                const nextLeftX = nextPos.x - nextTransform.width / 2;
                const nextRightX = nextPos.x + nextTransform.width / 2;

                if (stickEndX >= nextLeftX && stickEndX <= nextRightX) {
                    const playerWidth = player.getComponent(UITransform)!.width;
                    const playerX = nextPos.x + playerWidth / 4;
                    this.view!.updatePlayer(playerX, false);

                    const canvasWidth = this.view!.getCanvasWidth();
                    const nextColumnWidth = nextColumn.getComponent(UITransform)!.width;
                    const newStartColumnX = -canvasWidth / 2 + nextColumnWidth / 2;
                    const offset = nextPos.x - newStartColumnX;
                    const newPlayerX = playerX - offset;

                    this.isTransitioning = true;

                    if (this.view!.stickNode) {
                        this.view!.stickNode.destroy();
                        this.view!.stickNode = null;
                    }

                    console.log("Attempting to destroy old startColumn");
                    startColumn.removeFromParent(); 
                    startColumn.destroy();
                    this.lastDestroyedColumn = startColumn; 

                   
                    this.view!.updateColumnReferences(nextColumn, null);

                    this.view!.setupNextColumn();
                    const newNextColumnX = this.view!.randomPosition - canvasWidth;
                    this.model.setNextColumnX(newNextColumnX);

                    (this.view as GameView).animateSceneShift(0, newStartColumnX, newPlayerX, newNextColumnX, () => {
                        this.model.setStartColumnX(newStartColumnX);
                        this.model.setPlayerX(newPlayerX);
                        this.isTransitioning = false;
                    });
                } else {
                    AnimationHelper.animatePlayerFall(player, () => {
                        this.isPlaying = false;
                        this.view!.showGameOverScreen();
                    });
                }
            });
        } catch (error) {
            console.error("Ошибка в checkResult:", error);
            this.isPlaying = false;
            this.view!.showGameOverScreen();
        }
    }

    update(deltaTime: number) {
        if (this.lastDestroyedColumn) {
            if (this.lastDestroyedColumn.isValid) {
                console.error("Old startColumn is still valid in update!");
            } else {
                console.log("Old startColumn successfully destroyed in update");
                this.lastDestroyedColumn = null; 
            }
        }

        if (!this.isPlaying || !this.model.isStickGrowing() || !this.view?.stickNode) return;

        const stickTransform = this.view.stickNode.getComponent(UITransform)!;
        const maxScaleY = this.maxHeight / stickTransform.height;
        const growthSpeed = (this.view as GameView).getGrowthSpeed();

        this.currentScaleY += this.growthSpeed * deltaTime;
        if (this.currentScaleY >= maxScaleY) {
            this.currentScaleY = maxScaleY;
            this.model.setStickGrowing(false);
            this.view.dropStick(false, (stick) => this.checkResult(stick));
        }

        this.view.updateStick(this.currentScaleY, this.model.getStickAngle());
    }
}