export interface IGameModel {
    getPlayerX(): number;
    setPlayerX(x: number): void;
    getStickLength(): number;
    setStickLength(length: number): void;
    isStickGrowing(): boolean;
    setStickGrowing(growing: boolean): void;
    getStickAngle(): number;
    setStickAngle(angle: number): void;
    getStartColumn(): { x: number; width: number };
    getNextColumn(): { x: number; width: number };
    reset(): void;
}

export interface IGameView {
    updatePlayer(x: number): void;
    updateStick(length: number, angle: number): void;
    updateColumns(startX: number, startWidth: number, nextX: number, nextWidth: number): void;
    showStartScreen(): void;
    hideStartScreen(): void;
    showPlayScreen(): void;
    hidePlayScreen(): void;
    showGameOverScreen(): void;
    hideGameOverScreen(): void;
}