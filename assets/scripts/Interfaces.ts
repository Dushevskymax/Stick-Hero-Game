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
    reset(): void;
}

export interface IGameView {
    stickNode: Node | null;
    updatePlayer(x: number): void;
    createStick(startX: number, startY: number): void;
    updateStick(scaleY: number, angle: number): void;
    updateColumns(startX: number, nextX: number): void;
    showStartScreen(): void;
    showPlayScreen(): void;
    dropStick(callback: (stick: Node) => void): void;
    randomPosition: number;
    animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number): void;
    setupNextColumn(): void;
    showGameOverScreen(): void;
    animateNewColumn(targetX: number): void;
    getGrowthSpeed(): number;
    getStartColumnNode(): Node | null;
    getNextColumnNode(): Node | null;
    getPlayerNode(): Node | null;
    getCanvasWidth(): number;
    resetScene(): void;
}