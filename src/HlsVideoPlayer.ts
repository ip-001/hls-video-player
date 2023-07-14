import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import Hls from 'hls.js';

import { HlsVideoPlayerStyles } from './hls-video-player.styles.js';

export class HlsVideoPlayer extends LitElement {
  @property({ type: String })
  name!: string;

  @property({ type: String })
  src!: string;

  firstUpdated() {
    const player = this.shadowRoot!.querySelector('video');

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.src);
      hls.attachMedia(player!);
    } else if (player!.canPlayType('application/vnd.apple.mpegurl')) {
      player!.src = this.src;
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

  static styles = HlsVideoPlayerStyles;
}
