import { BaseComponent } from './../../base.js';
export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`<section class="video">
                    <div class="video_player"><iframe class="video__iframe"></iframe></div>
                    <h3 class="video__title"></h3>
                </section>`);

        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        iframe.src = this.convertToEmbededURL(url); // url -> videoId -> embed
        iframe.width = '420';
        iframe.height = '315';
        const titleElement = this.element.querySelector('.video__title')! as HTMLHeadElement;
        titleElement.textContent = title;
    }
    // iput
    // 정규표현식 Regex
    private convertToEmbededURL(url: string): string {
        const regExp =
            /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        console.log(match);
        const videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}