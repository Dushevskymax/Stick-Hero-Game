import { _decorator, Component, director, instantiate, Label, Node, Prefab, UITransform, Vec3 } from 'cc';

import { AnimationHelper } from '../Utils/AnimationHelper';
import { ErrorHandler } from '../Utils/ErrorHandler';
import { PositionCalculator } from '../Utils/PositionCalculator';

const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
  @property(Node)
  startScreen: Node = null;

  @property(Node)
  playScreen: Node = null;

  @property(Node)
  gameOverScreen: Node = null;

  @property(Prefab)
  playerPrefab: Prefab = null;

  @property(Prefab)
  stickPrefab: Prefab = null;

  @property(Prefab)
  columnPrefab: Prefab = null;

  @property({ type: Number, tooltip: '(units per second)' })
  growthSpeed: number = 2.5;

  @property(Label)
  scoreLabel: Label | null = null;

  @property(Label)
  currentScoreLabel: Label | null = null;

  private playerNode: Node | null = null;
  public stickNode: Node | null = null;
  private startColumnNode: Node | null = null;
  private nextColumnNode: Node | null = null;
  private canvasWidth: number = 0;
  private columnHeight: number = 0;
  private prefabColumnWidth: number = 0;
  public randomPosition: number = 0;

  start(): void {
    this.setScreenIndices();
    this.prefabColumnWidth = this.getNodeWidth(instantiate(this.columnPrefab));
    this.setupScene();
    this.showStartScreen();
    this.logNullLabels();
  }

  showStartScreen(): void {
    this.switchScreen('start');
    this.updateScoreLabel(this.currentScoreLabel, 0, 'start screen');
  }

  showPlayScreen(): void {
    this.switchScreen('play');
    this.updateScoreLabel(this.currentScoreLabel, 0, 'play screen');
  }

  showGameOverScreen(score: number): void {
    this.switchScreen('gameOver');
    this.updateScoreLabel(this.scoreLabel, score, 'game over screen', 'Score: ');
  }

  resetScene(): void {
    [this.startColumnNode, this.nextColumnNode, this.playerNode, this.stickNode].forEach(node => node?.destroy());
    this.startColumnNode = this.nextColumnNode = this.playerNode = this.stickNode = null;
    this.setupScene();
  }

  setupNextColumn(futureStartColumnX?: number): void {
    const canvas = this.getCanvas();
    this.nextColumnNode?.destroy();
    this.nextColumnNode = this.createNode(this.columnPrefab, canvas, 2);

    const randomWidth = PositionCalculator.generateRandomWidth(this.prefabColumnWidth);
    this.nextColumnNode.getComponent(UITransform)!.width = randomWidth;

    const startColumnX = futureStartColumnX ?? this.startColumnNode!.position.x;
    const startColumnRightEdge = startColumnX + this.getNodeWidth(this.startColumnNode!) / 2;
    const canvasBottomY = -this.getNodeHeight(canvas) / 2;

    this.randomPosition = PositionCalculator.calculateNextColumnPosition(
      startColumnRightEdge,
      this.prefabColumnWidth * 2,
      randomWidth,
      this.canvasWidth
    );

    const startX = this.canvasWidth / 2 + randomWidth / 2 + this.randomPosition;
    this.nextColumnNode.setPosition(startX, canvasBottomY + this.columnHeight / 2, 0);
  }

  animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number): void {
    AnimationHelper.animateNodes(this.node, [
      { node: this.startColumnNode!, x: startColumnX },
      { node: this.playerNode!, x: playerX },
      { node: this.nextColumnNode!, x: nextColumnX },
    ]);
  }

  animateSceneShift(oldStartX: number, newStartX: number, playerX: number, nextX: number, callback?: () => void): void {
    AnimationHelper.animateNodes(this.node, [
      { node: this.startColumnNode!, x: newStartX },
      { node: this.nextColumnNode!, x: nextX },
      { node: this.playerNode!, x: playerX },
    ], callback);
  }

  updatePlayer(x: number, instant: boolean = false): void {
    if (!this.playerNode) return;
    if (instant) {
      this.playerNode.setPosition(x, this.playerNode.position.y, 0);
    } else {
      AnimationHelper.animateNodePosition(this.playerNode, x, this.playerNode.position.y, 0.3);
    }
  }

  createStick(startX: number, startY: number): void {
    this.stickNode?.destroy();
    this.stickNode = this.createNode(this.stickPrefab, this.getCanvas(), 5);
    this.stickNode.setPosition(startX, startY, 0);
    this.stickNode.getComponent(UITransform)!.anchorY = 0;
    this.stickNode.setScale(new Vec3(1, 0.1, 1));
    this.stickNode.angle = 0;
    console.log(`Stick created at position: (${startX}, ${startY})`);
    console.log(`Canvas size: (${this.canvasWidth}, ${this.getNodeHeight(this.getCanvas())})`);
  }

  updateStick(scaleY: number, angle: number): void {
    if (this.stickNode) {
      this.stickNode.setScale(new Vec3(1, scaleY, 1));
      this.stickNode.angle = angle;
    }
  }

  dropStick(instant: boolean, callback: (stick: Node) => void): void {
    if (!this.stickNode) return;
    const stick = this.stickNode;
    if (instant) {
      stick.angle = -90;
      callback(stick);
    } else {
      AnimationHelper.animateStickDrop(stick, callback);
    }
  }

  animatePlayerToStickEnd(stickEndX: number, callback: () => void): void {
    if (this.playerNode) {
      AnimationHelper.animateNodePosition(this.playerNode, stickEndX, this.playerNode.position.y, 0.5, callback);
    }
  }

  updateColumnReferences(newStartColumn: Node, newNextColumn: Node | null): void {
    this.startColumnNode = newStartColumn;
    this.nextColumnNode = newNextColumn;
  }

  updateScoreDisplay(score: number): void {
    this.updateScoreLabel(this.currentScoreLabel, score, 'current score display');
  }

  getGrowthSpeed(): number {
    return this.growthSpeed;
  }

  getStartColumnNode(): Node | null {
    return this.startColumnNode;
  }

  getNextColumnNode(): Node | null {
    return this.nextColumnNode;
  }

  getPlayerNode(): Node | null {
    return this.playerNode;
  }

  getCanvasWidth(): number {
    return this.canvasWidth;
  }

  private setScreenIndices(): void {
    this.startScreen.setSiblingIndex(10);
    this.playScreen.setSiblingIndex(11);
    this.gameOverScreen.setSiblingIndex(12);
  }

  private logNullLabels(): void {
    ErrorHandler.handleError(
      () => {
        if (!this.currentScoreLabel) throw new Error('GameView: currentScoreLabel is not assigned!');
      },
      () => {}
    );
    ErrorHandler.handleError(
      () => {
        if (!this.scoreLabel) throw new Error('GameView: scoreLabel is not assigned!');
      },
      () => {}
    );
  }

  private setupScene(): void {
    const canvas = this.getCanvas();
    this.canvasWidth = this.getNodeWidth(canvas);
    const canvasBottomY = -this.getNodeHeight(canvas) / 2;

    this.startColumnNode = this.createNode(this.columnPrefab, canvas, 2);
    this.columnHeight = this.getNodeHeight(this.startColumnNode);
    this.startColumnNode.setPosition(0, canvasBottomY + this.columnHeight / 2, 0);

    this.playerNode = this.createNode(this.playerPrefab, canvas, 4);
    const playerHeight = this.getNodeHeight(this.playerNode);
    this.playerNode.setPosition(0, canvasBottomY + this.columnHeight + playerHeight / 2, 0);
  }

  private switchScreen(screen: 'start' | 'play' | 'gameOver'): void {
    this.startScreen.active = screen === 'start';
    this.playScreen.active = screen === 'play';
    this.gameOverScreen.active = screen === 'gameOver';
  }

  private updateScoreLabel(label: Label | null, score: number, context: string, prefix: string = ''): void {
    ErrorHandler.handleError(
      () => {
        if (!label) throw new Error(`GameView: ${context} label is null`);
        label.string = `${prefix}${score.toString()}`;
      },
      () => {}
    );
  }

  private getCanvas(): Node {
    return director.getScene().getChildByName('Canvas')!;
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