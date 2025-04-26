import { _decorator, Component, Node, Prefab, input, Input, UITransform } from 'cc';
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
    private currentScaleY: number = 0;
    @property({ type: Boolean }) isRetry: boolean = false;
    private isTransitioning: boolean = false;
    private lastDestroyedColumn: Node | null = null;

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.isRetry = false;
        this.model.reset();
    }

    private resetGame() {
        this.isPlaying = false;
        this.model.reset();
        this.view!.resetScene();

        const startColumnX = -this.view!.getCanvasWidth() / 2 + this.getNodeWidth(this.view!.getStartColumnNode()!) / 2;
        const playerX = startColumnX + this.getNodeWidth(this.view!.getPlayerNode()!) / 4;

        this.model.setStartColumnX(startColumnX);
        this.model.setPlayerX(playerX);

        if (this.isRetry) {
            this.view!.setupNextColumn(startColumnX);
            this.model.setNextColumnX(this.view!.randomPosition);
            this.view!.getStartColumnNode()!.setPosition(startColumnX, this.view!.getStartColumnNode()!.position.y, 0);
            this.view!.getNextColumnNode()!.setPosition(this.view!.randomPosition, this.view!.getNextColumnNode()!.position.y, 0);
            this.view!.updatePlayer(playerX, true);
        }

        this.view!.showStartScreen();
    }

    onStartButton() {
        if (!this.view) {
            if (!this.gameView) throw new Error("gameView is not assigned!");
            this.view = this.gameView;
        }

        this.isPlaying = true;
        this.view.showPlayScreen();

        const startColumnX = -this.view.getCanvasWidth() / 2 + this.getNodeWidth(this.view.getStartColumnNode()!) / 2;
        const playerX = startColumnX + this.getNodeWidth(this.view.getPlayerNode()!) / 4;

        if (!this.isRetry) {
            this.view.setupNextColumn(startColumnX);
            const nextColumnX = this.view.randomPosition;
            this.model.setStartColumnX(startColumnX);
            this.model.setPlayerX(playerX);
            this.model.setNextColumnX(nextColumnX);
            this.view.animateInitialSetup(startColumnX, playerX, nextColumnX);
        }

        (this.view as GameView).updateScoreDisplay(this.model.getScore());
    }

    onRetryButtonPressed() {
        this.isRetry = true;
        this.resetGame();
        this.onStartButton();
    }

    private onTouchStart() {
        if (!this.isPlaying || this.model.isStickGrowing() || this.isTransitioning) return;
        const startColumn = this.view!.getStartColumnNode()!;
        this.model.setStickGrowing(true);
        this.currentScaleY = 0.1; 
        const startX = this.model.getStartColumnX() + this.getNodeWidth(startColumn) / 2;
        const startY = startColumn.position.y + this.getNodeHeight(startColumn) / 2;
        this.view!.createStick(startX, startY);
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

            const startRightX = startColumn.position.x + this.getNodeWidth(startColumn) / 2;
            const stickLength = this.getNodeHeight(stick) * stick.scale.y;
            const stickEndX = startRightX + stickLength;

            (this.view as GameView).animatePlayerToStickEnd(stickEndX, () => {
                const nextLeftX = nextColumn.position.x - this.getNodeWidth(nextColumn) / 2;
                const nextRightX = nextColumn.position.x + this.getNodeWidth(nextColumn) / 2;

                if (stickEndX >= nextLeftX && stickEndX <= nextRightX) {
                    const playerX = nextColumn.position.x + this.getNodeWidth(player) / 4;
                    this.view!.updatePlayer(playerX, false);

                    const newStartColumnX = -this.view!.getCanvasWidth() / 2 + this.getNodeWidth(nextColumn) / 2;
                    const offset = nextColumn.position.x - newStartColumnX;
                    const newPlayerX = playerX - offset;

                    this.isTransitioning = true;
                    this.view!.stickNode?.destroy();
                    this.view!.stickNode = null;

                    startColumn.removeFromParent();
                    startColumn.destroy();
                    this.lastDestroyedColumn = startColumn;

                    this.view!.updateColumnReferences(nextColumn, null);
                    this.view!.setupNextColumn(newStartColumnX);
                    const newNextColumnX = this.view!.randomPosition;
                    this.model.setNextColumnX(newNextColumnX);

                    (this.view as GameView).animateSceneShift(0, newStartColumnX, newPlayerX, newNextColumnX, () => {
                        this.model.setStartColumnX(newStartColumnX);
                        this.model.setPlayerX(newPlayerX);
                        this.model.incrementScore();
                        (this.view as GameView).updateScoreDisplay(this.model.getScore());
                        this.isTransitioning = false;
                    });
                } else {
                    AnimationHelper.animatePlayerFall(player, () => {
                        this.isPlaying = false;
                        this.view!.showGameOverScreen(this.model.getScore());
                    });
                }
            });
        } catch (error) {
            console.error("Ошибка в checkResult:", error);
            this.isPlaying = false;
            this.view!.showGameOverScreen(this.model.getScore());
        }
    }

    update(deltaTime: number) {
        if (this.lastDestroyedColumn) {
            console.log(this.lastDestroyedColumn.isValid
                ? "Old startColumn is still valid!"
                : "Old startColumn successfully destroyed");
            this.lastDestroyedColumn = null;
        }

        if (!this.isPlaying || !this.model.isStickGrowing() || !this.view?.stickNode) return;

        const stick = this.view.stickNode;
        const maxScaleY = 1000 / this.getNodeHeight(stick);
        const growthSpeed = (this.view as GameView).getGrowthSpeed();
        this.currentScaleY += growthSpeed * deltaTime;

        if (this.currentScaleY >= maxScaleY) {
            this.currentScaleY = maxScaleY;
            this.model.setStickGrowing(false);
            this.view.dropStick(false, (stick) => this.checkResult(stick));
        }

        this.view.updateStick(this.currentScaleY, this.model.getStickAngle());
        console.log(`Stick growth speed: ${growthSpeed}`);
    }

    private getNodeWidth(node: Node): number {
        return node.getComponent(UITransform)!.width;
    }

    private getNodeHeight(node: Node): number {
        return node.getComponent(UITransform)!.height;
    }
}