import { _decorator, Component, Node, UITransform, Vec3, director, tween, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property(Node)
    startScreen: Node;

    @property(Node)
    playScreen: Node;

    @property(Node)
    gameOverScreen: Node;

    @property(Prefab)
    playerPrefab: Prefab;

    @property(Prefab)
    stickPrefab: Prefab;
    
    @property(Prefab)
    columnPrefab: Prefab;

    @property
    private growthSpeed = 0;

    @property
    private maxHeight = 1000;

    private playerNode: Node | null = null;
    public stickNode: Node | null = null;
    private startColumnNode: Node | null = null;
    private nextColumnNode: Node | null = null;
    private canvasHeight: number = 0;
    private canvasWidth: number = 0;
    private canvasBottomY: number = 0;
    private columnHeight: number = 0;
    public randomPosition: number = 0;

    public getGrowthSpeed(): number {
        return this.growthSpeed;
    }

    start() {
        this.setupScene();
        this.showStartScreen();
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
        console.log(`Стартовый столб: x:${this.startColumnNode.position.x} y:${this.startColumnNode.position.y}`);
        this.startColumnNode.setSiblingIndex(-11);

        this.playerNode = instantiate(this.playerPrefab);
        this.playerNode.setParent(canvas);
        const playerHeight = this.playerNode.getComponent(UITransform)!.height;
        this.playerNode.setPosition(0, this.canvasBottomY + this.columnHeight + playerHeight / 2, 0);
        console.log(`Игрок: x:${this.playerNode.position.x} y:${this.playerNode.position.y}`);
        this.playerNode.setSiblingIndex(-12);
    }

    public setupNextColumn() {
        const canvas = director.getScene().getChildByName("Canvas");
        const canvasHeight = canvas.getComponent(UITransform)!.height;
        const canvasWidth = canvas.getComponent(UITransform)!.width;
        this.canvasBottomY = -canvasHeight / 2;
        this.nextColumnNode = instantiate(this.columnPrefab);
        this.nextColumnNode.setParent(canvas);
        const columnHeight = this.startColumnNode.getComponent(UITransform)!.height;
        const columnWidth = this.startColumnNode.getComponent(UITransform)!.width;
        const minWidth = columnWidth / 3;
        const maxWidth = columnWidth * 2;
        const randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;
        this.nextColumnNode.getComponent(UITransform).width = randomWidth;
        const minPosition = canvasWidth / 2 + 1.5 * columnWidth;
        const maxPosition = 1.5 * canvasWidth - randomWidth / 2;
        this.randomPosition = Math.random() * (maxPosition - minPosition) + minPosition;

        console.log(`Рандомная ширина: ${randomWidth}`);
        console.log(`Минимальная позиция: ${minPosition}`);
        console.log(`Максимальная позиция: ${maxPosition}`);

        this.nextColumnNode.setPosition(this.randomPosition, this.canvasBottomY + columnHeight / 2, 0);
        this.nextColumnNode.setSiblingIndex(-13);
        console.log(`Следующая колонна: x:${this.randomPosition} y:${this.nextColumnNode.position.y}`);
    }

    animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number) {
        tween(this.startColumnNode!)
            .to(0.3, { position: new Vec3(startColumnX, this.startColumnNode!.position.y, 0) })
            .start();
        tween(this.playerNode!)
            .to(0.3, { position: new Vec3(playerX, this.playerNode!.position.y, 0) })
            .start();
        tween(this.nextColumnNode!)
            .to(0.3, { position: new Vec3(nextColumnX, this.nextColumnNode!.position.y, 0) })
            .start();
        console.log(`Куда сдвинулся начальный столб: ${startColumnX}`);
        console.log(`Куда сдвинулся игрок: ${playerX}`);
        console.log(`Куда сдвинулся следующий столб: ${nextColumnX}`);
    }

    animateNewColumn(targetX: number) {
        console.log(`Выполняю анимэйт`);
        if (this.nextColumnNode) {
            tween(this.nextColumnNode)
                .to(0.3, { position: new Vec3(targetX, this.nextColumnNode.position.y, 0) })
                .start();
        }
        setTimeout(() => {
            console.log(`Куда сдвинулся: ${targetX}`);
        }, 400);
    }

    updatePlayer(x: number): void {
        if (this.playerNode) {
            tween(this.playerNode)
                .to(0.8, { position: new Vec3(x, this.playerNode.position.y, 0) })
                .start();
        }
    }

    createStick(startX: number, startY: number): void {
        if (!this.stickNode) {
            this.stickNode = instantiate(this.stickPrefab);
            const canvas = director.getScene().getChildByName("Canvas");
            this.stickNode.setParent(canvas);
            this.stickNode.setPosition(startX, startY, 0);
            console.log(`Позиция точки старта палки: x:${startX} y:${startY}`);
            this.stickNode.getComponent(UITransform)!.anchorY = 0;
            this.stickNode.setScale(new Vec3(1, 0, 1));
           
        }
    }

    updateStick(scaleY: number, angle: number): void {
        if (this.stickNode) {
            this.stickNode.setScale(new Vec3(1, scaleY, 1));
            this.stickNode.angle = angle;
        }
    }

    dropStick(callback: (stick: Node) => void): void {
        if (!this.stickNode) return;
        console.log("Палка упала епта");
        const stick = this.stickNode;
        tween(stick)
            .to(0.25, { angle: -90 })
            .call(() => {
                this.stickNode = null; 
                callback(stick);
            })
            .start();
    }

    updateColumns(startX: number, startWidth: number, nextX: number, nextWidth: number): void {
        if (this.startColumnNode) {
            this.startColumnNode.setPosition(startX, this.startColumnNode.position.y, 0);
            this.startColumnNode.getComponent(UITransform)!.width = startWidth;
        }
        if (this.nextColumnNode) {
            this.nextColumnNode.setPosition(nextX, this.nextColumnNode.position.y, 0);
            this.nextColumnNode.getComponent(UITransform)!.width = nextWidth;
        }
    }

    public onStartButtonPressed() {
        this.showPlayScreen();
        this.setupNextColumn();
        const canvas = director.getScene().getChildByName("Canvas");
        const canvasWidth = canvas.getComponent(UITransform)!.width;
        const startColumnWidth = this['startColumnNode'].getComponent(UITransform)!.width;
        const playerWidth = this['playerNode'].getComponent(UITransform)!.width;
        const startColumnX = -canvasWidth / 2 + startColumnWidth;
        const playerX = startColumnX + playerWidth / 4;
        const nextColumnX = this.randomPosition - canvasWidth;
        this.animateInitialSetup(startColumnX, playerX, nextColumnX);
    }

    showStartScreen(): void {
        this.startScreen.active = true;
        this.playScreen.active = false;
        this.gameOverScreen.active = false;
        console.log('Активен стартовый экран');
    }

    hideStartScreen(): void {
        this.startScreen.active = false;
    }

    showPlayScreen(): void {
        this.playScreen.active = true;
        this.startScreen.active = false;
        this.gameOverScreen.active = false;
        console.log('Активен игровой экран');
    }

    hidePlayScreen(): void {
        this.playScreen.active = false;
    }

    showGameOverScreen(): void {
        this.gameOverScreen.active = true;
        this.startScreen.active = false;
        this.playScreen.active = false;
        console.log('Активен конечный экран');
    }

    hideGameOverScreen(): void {
        this.gameOverScreen.active = false;
    }

}