// https://github.com/scriptex/touchsweep

export interface TouchCoordinates {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
}

export class TouchSweep {
	private coords: TouchCoordinates;
	private element: HTMLElement;
	private threshold: number;

	constructor(element: HTMLElement = document.body, threshold: number = 40) {
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

	public unbind = (): void => {
		this.element.removeEventListener('touchstart', this.onStart, false);
		this.element.removeEventListener('touchend', this.onEnd, false);
	};

	private onStart = (event: TouchEvent): void => {
		this.coords.startX = event.changedTouches[0].screenX;
		this.coords.startY = event.changedTouches[0].screenY;
	};

	private onEnd = (event: TouchEvent): void => {
		this.coords.endX = event.changedTouches[0].screenX;
		this.coords.endY = event.changedTouches[0].screenY;

		this.dispatch();
	};

	private bind = (): void => {
		this.element.addEventListener('touchstart', this.onStart, false);
		this.element.addEventListener('touchend', this.onEnd, false);
	};

	private getEventName = (): string => {
		const threshold: number = this.threshold;
		const { startX, startY, endX, endY }: TouchCoordinates = this.coords;

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

	private dispatch = (): void => {
		const eventName: string = this.getEventName();

		if (!eventName) {
			return;
		}

		const event: CustomEvent = new CustomEvent(eventName, {
			detail: { eventName }
		});

		this.element.dispatchEvent(event);
	};
}
