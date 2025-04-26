import { _decorator, Component, Node, UITransform, Vec3, director, tween, instantiate, Prefab, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property(Node) startScreen: Node = null;
    @property(Node) playScreen: Node = null;
    @property(Node) gameOverScreen: Node = null;
    @property(Prefab) playerPrefab: Prefab = null;
    @property(Prefab) stickPrefab: Prefab = null;
    @property(Prefab) columnPrefab: Prefab = null;
    @property({ type: Number, tooltip: "Speed at which the stick grows (units per second)" }) growthSpeed: number = 2.5; // Умеренная скорость роста
    @property({ type: Number }) maxHeight: number = 1000;
    @property(Label) scoreLabel: Label | null = null;
    @property(Label) currentScoreLabel: Label | null = null;

    private playerNode: Node | null = null;
    public stickNode: Node | null = null;
    private startColumnNode: Node | null = null;
    private nextColumnNode: Node | null = null;
    private canvasWidth: number = 0;
    private canvasBottomY: number = 0;
    private columnHeight: number = 0;
    private prefabColumnWidth: number = 0;
    public randomPosition: number = 0;

    start() {
        this.setScreenIndices();
        this.prefabColumnWidth = this.getNodeWidth(instantiate(this.columnPrefab));
        this.setupScene();
        this.showStartScreen();
        this.logNullLabels();
    }

    private setScreenIndices() {
        this.startScreen.setSiblingIndex(10);
        this.playScreen.setSiblingIndex(11);
        this.gameOverScreen.setSiblingIndex(12);
    }

    private logNullLabels() {
        if (!this.currentScoreLabel) console.error("GameView: currentScoreLabel is not assigned!");
        if (!this.scoreLabel) console.error("GameView: scoreLabel is not assigned!");
    }

    public resetScene() {
        [this.startColumnNode, this.nextColumnNode, this.playerNode, this.stickNode].forEach(node => node?.destroy());
        this.startColumnNode = this.nextColumnNode = this.playerNode = this.stickNode = null;
        this.setupScene();
    }

    private setupScene() {
        const canvas = this.getCanvas();
        this.canvasWidth = this.getNodeWidth(canvas);
        this.canvasBottomY = -this.getNodeHeight(canvas) / 2;

        this.startColumnNode = this.createNode(this.columnPrefab, canvas, 2);
        this.columnHeight = this.getNodeHeight(this.startColumnNode);
        this.startColumnNode.setPosition(0, this.canvasBottomY + this.columnHeight / 2, 0);

        this.playerNode = this.createNode(this.playerPrefab, canvas, 4);
        const playerHeight = this.getNodeHeight(this.playerNode);
        this.playerNode.setPosition(0, this.canvasBottomY + this.columnHeight + playerHeight / 2, 0);
    }

    public setupNextColumn(futureStartColumnX?: number) {
        const canvas = this.getCanvas();
        this.nextColumnNode?.destroy();
        this.nextColumnNode = this.createNode(this.columnPrefab, canvas, 2);

        const randomWidth = this.generateRandomWidth();
        this.nextColumnNode.getComponent(UITransform)!.width = randomWidth;

        const startColumnX = futureStartColumnX ?? this.startColumnNode!.position.x;
        const startColumnRightEdge = startColumnX + this.getNodeWidth(this.startColumnNode!) / 2;
        const minGap = this.prefabColumnWidth * 2;

        const minPosition = startColumnRightEdge + minGap + randomWidth / 2;
        const maxPosition = this.canvasWidth / 2 - randomWidth / 2;
        this.randomPosition = Math.max(minPosition, Math.random() * (maxPosition - minPosition) + minPosition);

        const startX = this.canvasWidth / 2 + randomWidth / 2 + this.randomPosition;
        this.nextColumnNode.setPosition(startX, this.canvasBottomY + this.columnHeight / 2, 0);
    }

    private generateRandomWidth(): number {
        const minWidth = this.prefabColumnWidth / 3;
        const maxWidth = this.prefabColumnWidth * 2;
        return Math.random() * (maxWidth - minWidth) + minWidth;
    }

    animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number) {
        this.animateNodes([
            { node: this.startColumnNode!, x: startColumnX },
            { node: this.playerNode!, x: playerX },
            { node: this.nextColumnNode!, x: nextColumnX }
        ]);
    }

    animateSceneShift(_oldStartX: number, newStartX: number, playerX: number, nextX: number, callback?: () => void) {
        this.animateNodes([
            { node: this.startColumnNode!, x: newStartX },
            { node: this.nextColumnNode!, x: nextX },
            { node: this.playerNode!, x: playerX }
        ], callback);
    }

    private animateNodes(movements: { node: Node; x: number }[], callback?: () => void) {
        const tweens = movements.map(({ node, x }) =>
            tween(node).to(0.3, { position: new Vec3(x, node.position.y, 0) })
        );
        tween(this.node).parallel(...tweens).call(callback ?? (() => {})).start();
    }

    updatePlayer(x: number, instant: boolean = false) {
        if (!this.playerNode) return;
        instant
            ? this.playerNode.setPosition(x, this.playerNode.position.y, 0)
            : tween(this.playerNode).to(0.3, { position: new Vec3(x, this.playerNode.position.y, 0) }).start();
    }

    createStick(startX: number, startY: number) {
        this.stickNode?.destroy();
        this.stickNode = this.createNode(this.stickPrefab, this.getCanvas(), 5);
        this.stickNode.setPosition(startX, startY, 0);
        this.stickNode.getComponent(UITransform)!.anchorY = 0;
        this.stickNode.setScale(new Vec3(1, 0.1, 1));
        this.stickNode.angle = 0;
        console.log(`Stick created at position: (${startX}, ${startY})`);
        console.log(`Canvas size: (${this.canvasWidth}, ${this.getNodeHeight(this.getCanvas())})`);
    }

    updateStick(scaleY: number, angle: number) {
        if (this.stickNode) {
            this.stickNode.setScale(new Vec3(1, scaleY, 1));
            this.stickNode.angle = angle;
            console.log(`Stick updated - scaleY: ${scaleY}, angle: ${angle}`);
        }
    }

    dropStick(instant: boolean, callback: (stick: Node) => void) {
        if (!this.stickNode) return;
        const stick = this.stickNode;
        instant
            ? (stick.angle = -90, callback(stick))
            : tween(stick).to(0.25, { angle: -90 }).call(() => callback(stick)).start();
    }

    animatePlayerToStickEnd(stickEndX: number, callback: () => void) {
        if (this.playerNode) {
            tween(this.playerNode).to(0.5, { position: new Vec3(stickEndX, this.playerNode.position.y, 0) }).call(callback).start();
        }
    }

    updateColumnReferences(newStartColumn: Node, newNextColumn: Node | null) {
        this.startColumnNode = newStartColumn;
        this.nextColumnNode = newNextColumn;
    }

    public onStartButtonPressed() {
        this.showPlayScreen();
        const startColumnWidth = this.getNodeWidth(this.startColumnNode!);
        const playerWidth = this.getNodeWidth(this.playerNode!);
        const startColumnX = -this.canvasWidth / 2 + startColumnWidth / 2;
        const playerX = startColumnX + playerWidth / 4;

        this.setupNextColumn(startColumnX);
        this.animateInitialSetup(startColumnX, playerX, this.randomPosition);
    }

    showStartScreen() {
        this.setScreenVisibility(true, false, false);
        this.updateScoreLabel(this.currentScoreLabel, 0, "start screen");
    }

    showPlayScreen() {
        this.setScreenVisibility(false, true, false);
        this.updateScoreLabel(this.currentScoreLabel, 0, "play screen");
    }

    showGameOverScreen(score: number) {
        this.setScreenVisibility(false, false, true);
        this.updateScoreLabel(this.scoreLabel, score, "game over screen", `Score: `);
        console.log(`Game over screen displayed with score: ${score}`);
    }

    private setScreenVisibility(start: boolean, play: boolean, gameOver: boolean) {
        this.startScreen.active = start;
        this.playScreen.active = play;
        this.gameOverScreen.active = gameOver;
    }

    private updateScoreLabel(label: Label | null, score: number, context: string, prefix: string = "") {
        if (label) {
            label.string = `${prefix}${score.toString()}`;
            console.log(`GameView: ${context} score updated to: ${score}`);
        } else {
            console.warn(`GameView: ${context} label is null`);
        }
    }

    public updateScoreDisplay(score: number) {
        this.updateScoreLabel(this.currentScoreLabel, score, "current score display");
    }

    public getGrowthSpeed(): number { return this.growthSpeed; }
    public getStartColumnNode(): Node | null { return this.startColumnNode; }
    public getNextColumnNode(): Node | null { return this.nextColumnNode; }
    public getPlayerNode(): Node | null { return this.playerNode; }
    public getCanvasWidth(): number { return this.canvasWidth; }

    private getCanvas(): Node {
        return director.getScene().getChildByName("Canvas")!;
    }

    private getNodeWidth(node: Node): number {
        return node.getComponent(UITransform)!.width;
    }

    private getNodeHeight(node: Node): number {
        return node.getComponent(UITransform)!.height;
    }

    private createNode(prefab: Prefab, parent: Node, siblingIndex: number): Node {
        const node = instantiate(prefab);
        node.setParent(parent);
        node.setSiblingIndex(siblingIndex);
        return node;
    }
}