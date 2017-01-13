import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Base from './common/Base';
import PixiHelper from '../sources/PixiHelper';
import path from 'path';

class Pixi extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.PixiHelper = new PixiHelper(this.rendererView);
    this.renderer = this.PixiHelper.renderer;
    const s = path.resolve(__dirname, '..', 'assets', '1.mp4');
    var texture = PIXI.Texture.fromVideo(s);
    // var texture = PIXI.Texture.fromVideo('http://pixijs.github.io/examples/required/assets/testVideo.mp4');
    // create a new Sprite using the video texture (yes it's that easy)
    var videoSprite = new PIXI.Sprite(texture);
    videoSprite.width = 1920;
    videoSprite.height = 1080;

    this.PixiHelper.addChild(videoSprite);
    this.PixiHelper.addResizeItem(videoSprite);
    this.PixiHelper.animate();
  }

  render() {
    return (
      <div
        ref={view=> this.rendererView = view}
      >
      </div>
    )
  }
}

export default Pixi;
