import { Node } from 'cc';

export interface IGameModel {
    getPlayerX(): number;
    setPlayerX(x: number): void;
    isStickGrowing(): boolean;
    setStickGrowing(growing: boolean): void;
    getStickAngle(): number;
    setStickAngle(angle: number): void;
    getStartColumn(): { x: number; width: number };
    getNextColumn(): { x: number; width: number };
    setNextColumnX(x: number): void;
    reset(): void;
}

export interface IGameView {
    stickNode: Node | null;
    updatePlayer(x: number): void;
    createStick(startX: number, startY: number): void;
    updateStick(scaleY: number, angle: number): void;
    updateColumns(startX: number, startWidth: number, nextX: number, nextWidth: number): void;
    showStartScreen(): void;
    hideStartScreen(): void;
    showPlayScreen(): void;
    dropStick(callback: (stick: Node) => void): void;
    randomPosition: number;
    animateInitialSetup(startColumnX: number, playerX: number, nextColumnX: number): void;
    setupNextColumn(): void;
    hidePlayScreen(): void;
    showGameOverScreen(): void;
    hideGameOverScreen(): void;
    animateNewColumn(targetX: number): void;
    getGrowthSpeed(): number;
}