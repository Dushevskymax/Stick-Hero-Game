import { Node, tween, Vec3 } from 'cc';

export class AnimationHelper {
    static animateNodes(parent: Node, movements: { node: Node; x: number }[], callback?: () => void) {
        const validMovements = movements.filter(({ node }) => node && node.isValid);
        if (validMovements.length === 0) {
            callback?.();
            return;
        }
        const tweens = validMovements.map(({ node, x }) =>
            tween(node).to(0.3, { position: new Vec3(x, node.position.y, 0) })
        );
        tween(parent).parallel(...tweens).call(callback ?? (() => {})).start();
    }

    static animateNodePosition(node: Node, x: number, y: number, duration: number, callback?: () => void) {
        if (!node || !node.isValid) {
            callback?.();
            return;
        }
        const action = tween(node).to(duration, { position: new Vec3(x, y, 0) });
        if (callback) {
            action.call(callback);
        }
        action.start();
    }

    static animateStickDrop(stick: Node, callback: (stick: Node) => void) {
        if (!stick || !stick.isValid) {
            callback(stick);
            return;
        }
        tween(stick).to(0.25, { angle: -90 }).call(() => callback(stick)).start();
    }

    static animatePlayerFall(player: Node, callback: () => void) {
        if (!player || !player.isValid) {
            callback();
            return;
        }
        tween(player)
            .to(0.5, { position: new Vec3(player.position.x, player.position.y - 500, 0) })
            .call(callback)
            .start();
    }
}