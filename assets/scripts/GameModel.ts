import { IGameModel } from './Interfaces';

export class GameModel implements IGameModel {
    private playerX: number = 0;
    private stickGrowing: boolean = false;
    private stickAngle: number = 0;
    private startColumnX: number = 0;
    private nextColumnX: number = 0;

    getPlayerX(): number {
        return this.playerX;
    }

    setPlayerX(x: number): void {
        this.playerX = x;
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

    getStartColumnX(): number {
        return this.startColumnX;
    }

    setStartColumnX(x: number): void {
        this.startColumnX = x;
    }

    getNextColumnX(): number {
        return this.nextColumnX;
    }

    setNextColumnX(x: number): void {
        this.nextColumnX = x;
    }

    reset(): void {
        this.playerX = 0;
        this.stickGrowing = false;
        this.stickAngle = 0;
        this.startColumnX = 0;
        this.nextColumnX = 0;
    }
}