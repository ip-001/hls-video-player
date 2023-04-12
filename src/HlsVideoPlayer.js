import { html, css, LitElement } from 'lit';
import Hls from 'hls.js';

export class HlsVideoPlayer extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      grid-template-areas:
        'video'
        'info ';
      box-sizing: border-box;
    }

    video {
      grid-area: video;
      width: 100%;
      height: auto;
      box-sizing: border-box;
    }

    main {
      grid-area: info;
      width: 100%;
      height: auto;
      padding: 1.25rem 0;
      box-sizing: border-box;
    }

    h6 {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 1.25rem;
      letter-spacing: 0.15px;
      margin: 0;
      color: black;
    }

    span {
      font-family: 'Roboto', sans-serif;
      font-size: 0.75rem;
      font-weight: 400;
      display: block;
      padding: 0.5rem 0.125rem;
      padding-bottom: 0.125rem;
      color: var(--secondary-color);
    }
  `;

  static properties = {
    name: { type: String },
    src: { type: String },
  };

  firstUpdated() {
    const player = this.shadowRoot.querySelector('video');

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.src);
      hls.attachMedia(player);
    } else if (player.canPlayType('application/vnd.apple.mpegurl')) {
      player.src = this.src;
    }
  }

  render() {
    return html`
      <video controls controlsList="nodownload">
        Your device does not support playing HTTP Live Streaming (HLS) videos.
      </video>

      <main>
        <h6>${this.name}</h6>
        <span>video</span>
      </main>
    `;
  }
}
