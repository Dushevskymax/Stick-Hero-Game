import { _decorator, Component, Node, UITransform, Vec3, director, tween, instantiate, Prefab} from 'cc';
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

    private playerNode: Node | null = null;
    private stickNode: Node | null = null;
    private startColumnNode: Node | null = null;
    private nextColumnNode: Node | null = null;
    private canvasHeight: number = 0;
    private canvasWidth: number = 0;
    private canvasBottomY: number = 0;
    private columnHeight: number = 0;
    private randomPosition: number = 0;

    start() {
        this.setupScene();
        this.showStartScreen();
    }

    private setupScene() {
        const canvas = director.getScene().getChildByName("Canvas")
        const canvasHeight = canvas.getComponent(UITransform)!.height;
        const canvasWidth = canvas.getComponent(UITransform)!.width;
        const canvasBottomY = -canvasHeight/2;
       
        this.startColumnNode = instantiate(this.columnPrefab);
        this.startColumnNode.setParent(canvas);
        const columnHeight = this.startColumnNode.getComponent(UITransform)!.height;
        this.startColumnNode.setPosition(0, canvasBottomY + columnHeight/2, 0);
        console.log(`Стартовый столб: x:${this.startColumnNode.position.x} y:${this.startColumnNode.position.y}`)
        this.startColumnNode.setSiblingIndex(-10);

        this.playerNode = instantiate(this.playerPrefab)
        this.playerNode.setParent(canvas);
        const playerHeight = this.playerNode.getComponent(UITransform)!.height;
        this.playerNode.setPosition(0, canvasBottomY + columnHeight + playerHeight/2 , 0);
        console.log(`Игрок: x:${this.playerNode.position.x} y:${this.playerNode.position.y}`)
        this.playerNode.setSiblingIndex(-11);
    }

    private setupNextColumn() {
        const canvas = director.getScene().getChildByName("Canvas")
        const canvasHeight = canvas.getComponent(UITransform)!.height;
        const canvasWidth = canvas.getComponent(UITransform)!.width;
        const canvasBottomY = -canvasHeight / 2;
        
        this.nextColumnNode = instantiate(this.columnPrefab);
        this.nextColumnNode.setParent(canvas);
        const columnHeight = this.startColumnNode.getComponent(UITransform)!.height;
        const columnWidth = this.startColumnNode.getComponent(UITransform)!.width;
        const minWidth = columnWidth / 3;
        const maxWidth = columnWidth * 2;
        const randomWidth =  Math.random() * (maxWidth - minWidth) + minWidth; 
        const minPosition = canvasWidth/2 + 1.5*columnWidth;
        const maxPosition = 1.5*canvasWidth - randomWidth/2;
        const randomPosition = Math.random() * (maxPosition - minPosition) + minPosition;
        console.log(`Рандомная ширина: ${randomWidth}`)
        console.log(`Минимальная позиция: ${minPosition}`)
        console.log(`Максимальная позиция: ${maxPosition}`)
        
        this.nextColumnNode.setPosition(randomPosition , canvasBottomY + columnHeight/2 , 0);
        console.log(`Следующая колонна: x:${randomPosition} y:${this.playerNode.position.y}`);
        this.randomPosition = randomPosition;
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
            console.log(`Куда сдвинулся начальный столб: ${startColumnX}`)
            console.log(`Куда сдвинулся игрок столб: ${playerX}`)
            console.log(`Куда сдвинулся следующий столб: ${nextColumnX}`)
    }

    animateNewColumn(targetX: number) {
        console.log(`Выполняю анимэйт`)
        if (this.nextColumnNode) {
            tween(this.nextColumnNode)
                .to(0.3, { position: new Vec3(targetX, this.nextColumnNode.position.y, 0) })
                .start();
        }
        setTimeout(()=>{
            console.log(`Куда сдвинулся: ${targetX} `)
        },400)
    }

    updatePlayer(x: number): void {
        if (this.playerNode) {
            tween(this.playerNode)
                .to(0.5, { position: new Vec3(x, this.playerNode.position.y, 0) })
                .start();
        }
    }

    updateStick(length: number, angle: number): void {
        if (!this.stickNode) {
            this.stickNode = instantiate(this.stickPrefab);
            this.stickNode.setParent(this.node);
            const startColumnTransform = this.startColumnNode!.getComponent(UITransform)!;
            const startX = this.startColumnNode!.position.x + startColumnTransform.width / 2;
            const startY = this.startColumnNode!.position.y + startColumnTransform.height / 2;
            this.stickNode.setPosition(startX, startY, 0);
            this.stickNode.getComponent(UITransform)!.anchorY = 0;
        }
        this.stickNode.setScale(new Vec3(1, length / 100, 1));
        this.stickNode.angle = angle;
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

    public onRetryButtonPressed() {
        this.showPlayScreen();
        this.hideGameOverScreen();
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

    update(deltaTime: number) {
        
    }
}


