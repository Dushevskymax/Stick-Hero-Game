import { Node } from 'cc';

export interface IGameModel {
    getPlayerX(): number;
    setPlayerX(x: number): void;
    isStickGrowing(): boolean;
    setStickGrowing(growing: boolean): void;
    getStickAngle(): number;
    setStickAngle(angle: number): void;
    getStartColumnX(): number;
    setStartColumnX(x: number): void;
    getNextColumnX(): number;
    setNextColumnX(x: number): void;
    getScore(): number;
    incrementScore(): void;
    reset(): void;
}

export interface IGameView {
    stickNode: Node | null;
    randomPosition: number;
    updatePlayer(x: number, instant?: boolean): void;
    createStick(startX: number, startY: number): void;
    updateStick(scaleY: number, angle: number): void;
    updateColumnReferences(newStartColumn: Node, newNextColumn: Node | null): void;
    animateSceneShift(oldStartX: number, newStartX: number, playerX: number, nextX: number, callback?: () => void): void;
    showStartScreen(): void;
    showPlayScreen(): void;
    showGameOverScreen(score: number): void;
    dropStick(instant: boolean, callback: (stick: Node) => void): void;
    animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number): void;
    setupNextColumn(futureStartColumnX?: number): void;
    getGrowthSpeed(): number;
    getStartColumnNode(): Node | null;
    getNextColumnNode(): Node | null;
    getPlayerNode(): Node | null;
    getCanvasWidth(): number;
    resetScene(): void;
    animatePlayerToStickEnd(stickEndX: number, callback: () => void): void;
    updateScoreDisplay(score: number): void;
}