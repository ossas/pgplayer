import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Base from './Base';
import PixiHelper from '../../sources/PixiHelper';

class Pixi extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.PixiHelper = new PixiHelper(this.rendererView);

    // create the root of the scene graph
    const basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 30;
    basicText.y = 90;
    this.PixiHelper.setDragTarget(basicText);
    this.PixiHelper.addChild(basicText);

    const style = {
      fontFamily: '나눔고딕',
      fontSize: '36px',
      fontWeight: 'bold',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    };

    const richText = new PIXI.Text('플레이어 테스트\n두번째 줄', style);
    richText.x = 30;
    richText.y = 180;
    this.PixiHelper.setDragTarget(richText);
    this.PixiHelper.addChild(richText);
    // start animating
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
