import { IGameModel } from './Interfaces';

export class GameModel implements IGameModel {
    private playerX: number = 0;
    private stickLength: number = 0;
    private stickGrowing: boolean = false;
    private stickAngle: number = 0;
    private startColumn = { x: 0, width: 50 };
    private nextColumn = { x: 150, width: 50 };

    getPlayerX(): number {
        return this.playerX;
    }

    setPlayerX(x: number): void {
        this.playerX = x;
    }

    getStickLength(): number {
        return this.stickLength;
    }

    setStickLength(length: number): void {
        this.stickLength = length;
    }

    isStickGrowing(): boolean {
        return this.stickGrowing;
    }

    setStickGrowing(growing: boolean): void {
        this.stickGrowing = growing;
    }

    getStickAngle(): number {
        return this.stickAngle;
    }

    setStickAngle(angle: number): void {
        this.stickAngle = angle;
    }

    getStartColumn(): { x: number; width: number } {
        return this.startColumn;
    }

    getNextColumn(): { x: number; width: number } {
        return this.nextColumn;
    }

    reset(): void {
        this.playerX = 0;
        this.stickLength = 0;
        this.stickGrowing = false;
        this.stickAngle = 0;
        this.startColumn = { x: 0, width: 50 };
        this.nextColumn = { x: 150, width: 50 };
    }
}