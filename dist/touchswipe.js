// https://github.com/scriptex/touchsweep
export class TouchSweep {
    constructor(element = document.body, threshold = 40) {
        this.unbind = () => {
            this.element.removeEventListener('touchstart', this.onStart, false);
            this.element.removeEventListener('touchend', this.onEnd, false);
        };
        this.onStart = (event) => {
            this.coords.startX = event.changedTouches[0].screenX;
            this.coords.startY = event.changedTouches[0].screenY;
        };
        this.onEnd = (event) => {
            this.coords.endX = event.changedTouches[0].screenX;
            this.coords.endY = event.changedTouches[0].screenY;
            this.dispatch();
        };
        this.bind = () => {
            this.element.addEventListener('touchstart', this.onStart, false);
            this.element.addEventListener('touchend', this.onEnd, false);
        };
        this.getEventName = () => {
            const threshold = this.threshold;
            const { startX, startY, endX, endY } = this.coords;
            if (endX < startX && Math.abs(endY - startY) < threshold) {
                return 'swipeleft';
            }
            if (endX > startX && Math.abs(endX - startX) > threshold) {
                return 'swiperight';
            }
            if (endY < startY && Math.abs(endX - startX) < threshold) {
                return 'swipeup';
            }
            if (endY > startY && Math.abs(endY - startY) > threshold) {
                return 'swipedown';
            }
            if (endY === startY && endX === startX) {
                return 'tap';
            }
            return '';
        };
        this.dispatch = () => {
            const eventName = this.getEventName();
            if (!eventName) {
                return;
            }
            const event = new CustomEvent(eventName, {
                detail: { eventName }
            });
            this.element.dispatchEvent(event);
        };
        this.element = element;
        this.threshold = threshold;
        this.coords = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        };
        this.bind();
        return this;
    }
}
