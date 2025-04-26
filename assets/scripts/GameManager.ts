import { _decorator, Component, Node, Prefab, input, Input, UITransform } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { PositionCalculator } from './PositionCalculator';
import { AnimationHelper } from './AnimationHelper';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    playerPrefab: Prefab = null;

    @property(Prefab) 
    stickPrefab: Prefab = null;

    @property(Prefab)
    columnPrefab: Prefab = null;

    @property(Node) 
    startScreen: Node = null;
    
    @property(GameView) 
    gameView: GameView = null;

    private model: GameModel = new GameModel();
    private view: GameView | null = null;
    private isPlaying: boolean = false;
    private currentScaleY: number = 0;
    @property({ type: Boolean }) isRetry: boolean = false;
    private isTransitioning: boolean = false;

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

        const { startColumnX, playerX } = this.calculateInitialPositions();
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

        const { startColumnX, playerX } = this.calculateInitialPositions();

        if (!this.isRetry) {
            this.view.setupNextColumn(startColumnX);
            const nextColumnX = this.view.randomPosition;
            this.model.setStartColumnX(startColumnX);
            this.model.setPlayerX(playerX);
            this.model.setNextColumnX(nextColumnX);
            if (this.view.getStartColumnNode() && this.view.getPlayerNode() && this.view.getNextColumnNode()) {
                this.view.animateInitialSetup(startColumnX, playerX, nextColumnX);
            } else {
                console.error("Cannot animate initial setup: one of the nodes is null");
            }
        }

        this.view.updateScoreDisplay(this.model.getScore());
    }

    onRetryButtonPressed() {
        this.isRetry = true;
        this.resetGame();
        this.onStartButton();
    }

    private calculateInitialPositions(): { startColumnX: number, playerX: number } {
        const startColumnX = -this.view!.getCanvasWidth() / 2 + this.getNodeWidth(this.view!.getStartColumnNode()!) / 2;
        const playerX = startColumnX + this.getNodeWidth(this.view!.getPlayerNode()!) / 4;
        return { startColumnX, playerX };
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

            this.view!.animatePlayerToStickEnd(stickEndX, () => {
                const landed = this.checkStickLanding(stickEndX, nextColumn);
                if (landed) {
                    this.handleSuccess(player, nextColumn);
                } else {
                    this.handleFailure(player);
                }
            });
        } catch (error) {
            console.error("Ошибка в checkResult:", error);
            this.isPlaying = false;
            this.view!.showGameOverScreen(this.model.getScore());
        }
    }

    private checkStickLanding(stickEndX: number, nextColumn: Node): boolean {
        const nextLeftX = nextColumn.position.x - this.getNodeWidth(nextColumn) / 2;
        const nextRightX = nextColumn.position.x + this.getNodeWidth(nextColumn) / 2;
        return stickEndX >= nextLeftX && stickEndX <= nextRightX;
    }

    private handleSuccess(player: Node, nextColumn: Node) {
        const playerX = nextColumn.position.x + this.getNodeWidth(player) / 4;
        this.view!.updatePlayer(playerX, false);

        const newStartColumnX = -this.view!.getCanvasWidth() / 2 + this.getNodeWidth(nextColumn) / 2;
        const offset = nextColumn.position.x - newStartColumnX;
        const newPlayerX = playerX - offset;

        this.isTransitioning = true;
        this.view!.stickNode?.destroy();
        this.view!.stickNode = null;

        this.view!.getStartColumnNode()!.removeFromParent();
        this.view!.getStartColumnNode()!.destroy();

        this.view!.updateColumnReferences(nextColumn, null);
        this.view!.setupNextColumn(newStartColumnX);
        const newNextColumnX = this.view!.randomPosition;
        this.model.setNextColumnX(newNextColumnX);

        this.view!.animateSceneShift(0, newStartColumnX, newPlayerX, newNextColumnX, () => {
            this.model.setStartColumnX(newStartColumnX);
            this.model.setPlayerX(newPlayerX);
            this.model.incrementScore();
            this.view!.updateScoreDisplay(this.model.getScore());
            this.isTransitioning = false;
        });
    }

    private handleFailure(player: Node) {
        AnimationHelper.animatePlayerFall(player, () => {
            this.isPlaying = false;
            this.view!.showGameOverScreen(this.model.getScore());
        });
    }

    update(deltaTime: number) {
        if (!this.isPlaying || !this.model.isStickGrowing() || !this.view?.stickNode) return;

        const stick = this.view.stickNode;
        const maxScaleY = 1000 / this.getNodeHeight(stick);
        const growthSpeed = this.view.getGrowthSpeed();
        this.currentScaleY += growthSpeed * deltaTime;

        if (this.currentScaleY >= maxScaleY) {
            this.currentScaleY = maxScaleY;
            this.model.setStickGrowing(false);
            this.view.dropStick(false, (stick) => this.checkResult(stick));
        }

        this.view.updateStick(this.currentScaleY, this.model.getStickAngle());
    }

    private getNodeWidth(node: Node): number {
        return node.getComponent(UITransform)!.width;
    }

    private getNodeHeight(node: Node): number {
        return node.getComponent(UITransform)!.height;
    }
}