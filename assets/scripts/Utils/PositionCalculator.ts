export class PositionCalculator {
    static generateRandomWidth(prefabColumnWidth: number): number {
        const minWidth = prefabColumnWidth / 3;
        const maxWidth = prefabColumnWidth * 2;
        return Math.random() * (maxWidth - minWidth) + minWidth;
    }

    static calculateNextColumnPosition(startColumnRightEdge: number, minGap: number, columnWidth: number, canvasWidth: number): number {
        const minPosition = startColumnRightEdge + minGap + columnWidth / 2;
        const maxPosition = canvasWidth / 2 - columnWidth / 2;
        return Math.max(minPosition, Math.random() * (maxPosition - minPosition) + minPosition);
    }
}