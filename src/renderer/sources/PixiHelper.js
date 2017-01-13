let _renderer, _stage;
const resizeComponent = [];

class PixiHelper {
  constructor(view) {
    _renderer = PIXI.autoDetectRenderer(256, 256, { backgroundColor: 0xffffff });
    _renderer.autoResize = true;
    _renderer.resize(window.innerWidth, window.innerHeight);
    resizeComponent.push(_renderer);
    view.appendChild(_renderer.view);

    _stage = new PIXI.Container();

    // bind
    this.animate = this.animate.bind(this);

    if(window) {
      window.onresize = this.handleResizeWindow
    }
  }

  handleResizeWindow() {
    console.log(window.innerHeight, window.innerWidth);
    resizeComponent.forEach((component) => {
      if('resize' in component) {
        component.resize(window.innerWidth, window.innerHeight);
      } else {
        component.width = window.innerWidth;
        component.height = window.innerHeight;
      }
    });
  }

  get renderer() {
    return _renderer;
  }

  addChild(child) {
    _stage.addChild(child);
  }

  addResizeItem(item) {
    resizeComponent.push(item);
  }

  animate() {
    if (_stage) {
      requestAnimationFrame(this.animate);
      _renderer.render(_stage);
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
