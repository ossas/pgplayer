let renderer, stage;

class PixiHelper {
  constructor(view) {

    renderer = PIXI.autoDetectRenderer(256, 256, { backgroundColor: 0xffffff });
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);
    view.appendChild(renderer.view);

    stage = new PIXI.Container();

    // bind
    this.animate = this.animate.bind(this);
  }

  addChild(child) {
    stage.addChild(child);
  }

  animate() {
    if (stage) {
      requestAnimationFrame(this.animate);
      renderer.render(stage);
    }
  }

  onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }

  setDragTarget(target) {
    target.interactive = true;
    target.buttonMode = true;
    target.anchor.set(0.5);

    target
    // events for drag start
      .on('mousedown', this.onDragStart)
      .on('touchstart', this.onDragStart)
      // events for drag end
      .on('mouseup', this.onDragEnd)
      .on('mouseupoutside', this.onDragEnd)
      .on('touchend', this.onDragEnd)
      .on('touchendoutside', this.onDragEnd)
      // events for drag move
      .on('mousemove', this.onDragMove)
      .on('touchmove', this.onDragMove);
  }
}

export default PixiHelper;
