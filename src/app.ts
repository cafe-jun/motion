import { TextSectionInput } from './component/dialog/input/text-input.js';
import { InputDialog } from './component/dialog/dialog.js';
import { Component } from './component/base.js';
import { ImageComponent } from './component/page/item/image.js';
import { NoteComponent } from './component/page/item/note.js';
import { TodoComponent } from './component/page/item/todo.js';
import { VideoComponent } from './component/page/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './component/page/page.js';
import { MediaSectionInput } from './component/dialog/input/media-input.js';

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListenr(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListenr(() => {
                const image = new ImageComponent(inputSection.title, inputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
        });
        const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListenr(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListenr(() => {
                const image = new VideoComponent(inputSection.title, inputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
        });
        const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListenr(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListenr(() => {
                const image = new NoteComponent(inputSection.title, inputSection.body);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
        });
        const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListenr(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListenr(() => {
                const image = new TodoComponent(inputSection.title, inputSection.body);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
        });
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
