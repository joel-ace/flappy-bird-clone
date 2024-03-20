import GameObject from './GameObject';
import { ICreateRectangleGameObject } from './types';

class RectangleGameObject extends GameObject {
  color: string;

  constructor({
    type,
    color,
    positionX,
    positionY,
    width,
    height,
    opacity,
    renderLayer,
  }: ICreateRectangleGameObject) {
    super({
      type,
      positionX,
      positionY,
      width,
      height,
      opacity,
      renderLayer,
    });
    this.color = color;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.opacity) {
      context.globalAlpha = this.opacity;
    }

    context.fillStyle = this.color;
    context.fillRect(this.positionX, this.positionY, this.width, this.height);

    context.globalAlpha = 1;
  }
}

export default RectangleGameObject;
