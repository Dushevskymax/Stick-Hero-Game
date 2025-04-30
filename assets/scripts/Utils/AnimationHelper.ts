import { Node, tween, Vec3 } from 'cc';

import { ErrorHandler } from './ErrorHandler';

export class AnimationHelper {
  static animateNodes(parent: Node, movements: { node: Node; x: number }[], callback?: () => void): void {
    const validMovements = movements.filter(({ node }) => node && node.isValid);
    if (validMovements.length === 0) {
      ErrorHandler.handleError(
        () => { throw new Error('No valid nodes to animate'); },
        () => callback?.()
      );
      return;
    }
    const tweens = validMovements.map(({ node, x }) =>
      tween(node).to(0.3, { position: new Vec3(x, node.position.y, 0) })
    );
    tween(parent).parallel(...tweens).call(callback ?? (() => {})).start();
  }

  static animateNodePosition(node: Node, x: number, y: number, duration: number, callback?: () => void): void {
    ErrorHandler.handleError(
      () => {
        if (!node || !node.isValid) throw new Error('Node is invalid or null');
        const action = tween(node).to(duration, { position: new Vec3(x, y, 0) });
        if (callback) {
          action.call(callback);
        }
        action.start();
      },
      () => callback?.()
    );
  }

  static animateStickDrop(stick: Node, callback: (stick: Node) => void): void {
    ErrorHandler.handleError(
      () => {
        if (!stick || !stick.isValid) throw new Error('Stick node is invalid or null');
        tween(stick).to(0.25, { angle: -90 }).call(() => callback(stick)).start();
      },
      () => callback(stick)
    );
  }

  static animatePlayerFall(player: Node, callback: () => void): void {
    ErrorHandler.handleError(
      () => {
        if (!player || !player.isValid) throw new Error('Player node is invalid or null');
        tween(player)
          .to(0.5, { position: new Vec3(player.position.x, player.position.y - 500, 0) })
          .call(callback)
          .start();
      },
      callback
    );
  }
}