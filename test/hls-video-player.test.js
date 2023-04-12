import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../hls-video-player.js';

describe('HlsVideoPlayer', () => {
  it('can set name via attribute', async () => {
    const el = await fixture(html` <hls-video-player
      name="test name"
      src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    >
    </hls-video-player>`);

    expect(el.name).to.equal('test name');
  });
});
