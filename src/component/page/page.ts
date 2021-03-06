import { BaseComponent, Component } from '../base.js';
export interface Composable {
    addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;
}
type SectionContainerConstructor = {
    new (): SectionContainer;
};
type OnCloseListener = () => void;

export class PageItemComponent extends BaseComponent<HTMLElement> implements Composable, SectionContainer {
    private closeListener?: OnCloseListener;
    constructor() {
        super(`<li draggable="true" class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="span close">X</button>
                    </div>
                </li>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const pageItem = this.element.querySelector('.page-item')! as HTMLLIElement;
        this.element.addEventListener('dragstart', (event: DragEvent) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event: DragEvent) => {
            this.onDragEnd(event);
        });
    }

    onDragStart(event: DragEvent) {
        console.log('dragstart', event);
    }
    onDragEnd(event: DragEvent) {
        console.log('dragend', event);
    }
    addChild(child: Component) {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);
    }
    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }
}

// class DarkPageComponent extends BaseComponent<HTMLElement> implements SectionContainer {
//     setOnCloseListener(listener: OnCloseListener): void {}
// }

// class AnimationPageComponent extends BaseComponent<HTMLElement> implements SectionContainer {
//     setOnCloseListener(listener: OnCloseListener): void {}
// }

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super('<ul class="page"></ul>');
        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        });
    }
    onDragOver(event: DragEvent) {
        event.preventDefault();
        console.log('onDragOver');
    }
    onDrop(event: DragEvent) {
        event.preventDefault();
        console.log('onDrop');
    }
    addChild(section: Component) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}
