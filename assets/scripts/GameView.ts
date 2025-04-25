import { _decorator, Component, Node, UITransform, Vec3, director, tween, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property(Node) startScreen: Node = null;
    @property(Node) playScreen: Node = null;
    @property(Node) gameOverScreen: Node = null;
    @property(Prefab) playerPrefab: Prefab = null;
    @property(Prefab) stickPrefab: Prefab = null;
    @property(Prefab) columnPrefab: Prefab = null;
    @property({ type: Number }) growthSpeed: number = 0;
    @property({ type: Number }) maxHeight: number = 1000;

    private playerNode: Node | null = null;
    public stickNode: Node | null = null;
    private startColumnNode: Node | null = null;
    private nextColumnNode: Node | null = null;
    private canvasHeight: number = 0;
    private canvasWidth: number = 0;
    private canvasBottomY: number = 0;
    private columnHeight: number = 0;
    public randomPosition: number = 0;

    start() {
        this.startScreen.setSiblingIndex(10);
        this.playScreen.setSiblingIndex(11);
        this.gameOverScreen.setSiblingIndex(12);

        this.setupScene();
        this.showStartScreen();
    }

    public resetScene() {
        [this.startColumnNode, this.nextColumnNode, this.playerNode, this.stickNode].forEach(node => {
            if (node) {
                node.destroy();
            }
        });
        this.startColumnNode = this.nextColumnNode = this.playerNode = this.stickNode = null;
        this.setupScene();
    }

    private setupScene() {
        const canvas = director.getScene().getChildByName("Canvas");
        this.canvasHeight = canvas.getComponent(UITransform)!.height;
        this.canvasWidth = canvas.getComponent(UITransform)!.width;
        this.canvasBottomY = -this.canvasHeight / 2;

        this.startColumnNode = instantiate(this.columnPrefab);
        this.startColumnNode.setParent(canvas);
        this.columnHeight = this.startColumnNode.getComponent(UITransform)!.height;
        this.startColumnNode.setPosition(0, this.canvasBottomY + this.columnHeight / 2, 0);
        this.startColumnNode.setSiblingIndex(2); 

        this.playerNode = instantiate(this.playerPrefab);
        this.playerNode.setParent(canvas);
        const playerHeight = this.playerNode.getComponent(UITransform)!.height;
        this.playerNode.setPosition(0, this.canvasBottomY + this.columnHeight + playerHeight / 2, 0);
        this.playerNode.setSiblingIndex(4);
    }

    public setupNextColumn() {
        const canvas = director.getScene().getChildByName("Canvas");
        const canvasHeight = canvas.getComponent(UITransform)!.height;
        const canvasWidth = canvas.getComponent(UITransform)!.width;
        this.canvasBottomY = -canvasHeight / 2;

        if (this.nextColumnNode) {
            this.nextColumnNode.destroy();
            this.nextColumnNode = null;
        }

        this.nextColumnNode = instantiate(this.columnPrefab);
        this.nextColumnNode.setParent(canvas);
        const columnHeight = this.startColumnNode!.getComponent(UITransform)!.height;
        const columnWidth = this.startColumnNode!.getComponent(UITransform)!.width;
        const minWidth = columnWidth / 3;
        const maxWidth = columnWidth * 2;
        const randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;
        this.nextColumnNode.getComponent(UITransform)!.width = randomWidth;
        const minPosition = canvasWidth / 2 + 1.5 * columnWidth;
        const maxPosition = 1.5 * canvasWidth - randomWidth / 2;
        this.randomPosition = Math.random() * (maxPosition - minPosition) + minPosition;

        this.nextColumnNode.setPosition(this.randomPosition, this.canvasBottomY + columnHeight / 2, 0);
        this.nextColumnNode.setSiblingIndex(2); 
    }

    animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number) {
        tween(this.startColumnNode!).to(0.3, { position: new Vec3(startColumnX, this.startColumnNode!.position.y, 0) }).start();
        tween(this.playerNode!).to(0.3, { position: new Vec3(playerX, this.playerNode!.position.y, 0) }).start();
        tween(this.nextColumnNode!).to(0.3, { position: new Vec3(nextColumnX, this.nextColumnNode!.position.y, 0) }).start();
    }

    animateNewColumn(targetX: number) {
        if (this.nextColumnNode) {
            tween(this.nextColumnNode).to(0.3, { position: new Vec3(targetX, this.nextColumnNode.position.y, 0) }).start();
        }
    }

    updatePlayer(x: number) {
        if (this.playerNode) {
            tween(this.playerNode).to(0.8, { position: new Vec3(x, this.playerNode.position.y, 0) }).start();
        }
    }

    createStick(startX: number, startY: number) {
        if (this.stickNode) return;
        this.stickNode = instantiate(this.stickPrefab);
        const canvas = director.getScene().getChildByName("Canvas");
        this.stickNode.setParent(canvas);
        this.stickNode.setPosition(startX, startY, 0);
        this.stickNode.getComponent(UITransform)!.anchorY = 0;
        this.stickNode.setScale(new Vec3(1, 0, 1));
        this.stickNode.setSiblingIndex(3); 
    }

    updateStick(scaleY: number, angle: number) {
        if (this.stickNode) {
            this.stickNode.setScale(new Vec3(1, scaleY, 1));
            this.stickNode.angle = angle;
        }
    }

    private dropStickInstant(stick: Node, callback: (stick: Node) => void) {
        stick.angle = -90;
        this.stickNode = null;
        callback(stick);
    }

    private dropStickAnimated(stick: Node, callback: (stick: Node) => void) {
        tween(stick)
            .to(0.25, { angle: -90 })
            .call(() => {
                this.stickNode = null;
                callback(stick);
            })
            .start();
    }

    dropStick(instant: boolean, callback: (stick: Node) => void) {
        if (!this.stickNode) return;
        const stick = this.stickNode;
        if (instant) {
            this.dropStickInstant(stick, callback);
        } else {
            this.dropStickAnimated(stick, callback);
        }
    }

    animatePlayerToStickEnd(stickEndX: number, callback: () => void) {
        if (!this.playerNode) return;
        tween(this.playerNode)
            .to(0.4, { position: new Vec3(stickEndX, this.playerNode.position.y, 0) })
            .call(callback)
            .start();
    }

    updateColumns(startX: number, nextX: number) {
        if (this.startColumnNode) {
            this.startColumnNode.setPosition(startX, this.startColumnNode.position.y, 0);
        }
        if (this.nextColumnNode) {
            this.nextColumnNode.setPosition(nextX, this.nextColumnNode.position.y, 0);
        }
    }

    public onStartButtonPressed() {
        this.showPlayScreen();
        this.setupNextColumn();
        const canvasWidth = this.getCanvasWidth();
        const startColumnWidth = this.getStartColumnNode()!.getComponent(UITransform)!.width;
        const playerWidth = this.getPlayerNode()!.getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth;
        const playerX = startColumnX + playerWidth / 4;
        const nextColumnX = this.randomPosition - canvasWidth;
        this.animateInitialSetup(startColumnX, playerX, nextColumnX);
    }

    showStartScreen() {
        this.startScreen.active = true;
        this.playScreen.active = false;
        this.gameOverScreen.active = false;
    }

    showPlayScreen() {
        this.playScreen.active = true;
        this.startScreen.active = false;
        this.gameOverScreen.active = false;
    }

    showGameOverScreen() {
        this.gameOverScreen.active = true;
        this.startScreen.active = false;
        this.playScreen.active = false;
    }

    public getGrowthSpeed(): number {
        return this.growthSpeed;
    }

    public getStartColumnNode(): Node | null {
        return this.startColumnNode;
    }

    public getNextColumnNode(): Node | null {
        return this.nextColumnNode;
    }

    public getPlayerNode(): Node | null {
        return this.playerNode;
    }

    public getCanvasWidth(): number {
        return this.canvasWidth;
    }
}