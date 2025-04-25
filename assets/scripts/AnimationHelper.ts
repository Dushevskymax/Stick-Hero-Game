import { Node, tween, Vec3 } from 'cc';

export class AnimationHelper {
    static animateStickDrop(node: Node, callback: () => void): void {
        tween(node)
            .to(0.4, { angle: -90 })
            .call(callback)
            .start();
    }

    static animatePlayerFall(node: Node, callback: () => void): void {
        tween(node)
            .to(0.5, { position: new Vec3(node.position.x, node.position.y - 500, 0) })
            .call(callback)
            .start();
    }
}