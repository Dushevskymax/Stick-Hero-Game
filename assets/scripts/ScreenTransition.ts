import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenTransition')
export class ScreenTransition extends Component {

    @property(Node) 
    targetScreen: Node; 

    @property(Node) 
    currentScreen: Node;

    @property(Node)
    transitionButton: Node;

    public onTransition: () => void = () => {};

    start() {
        if (this.transitionButton) {
            this.transitionButton.on(Node.EventType.TOUCH_END, this.transition, this);
        }
    }

    private transition() {
        if (!this.targetScreen || !this.currentScreen) return;

        this.targetScreen.active = true;
        this.currentScreen.active = false;

        this.onTransition();
    }
}
