import GameObject from './GameObject';
import { ICreateImageGameObject } from './types';

class ImageGameObject extends GameObject {
  #imgUrl: string;
  #image;

  constructor({
    type,
    imgUrl,
    positionX,
    positionY,
    width,
    height,
    opacity,
    renderLayer
  }: ICreateImageGameObject){
    super({
      type,
      positionX,
      positionY,
      width,
      height,
      opacity,
      renderLayer,
    });

    this.#imgUrl = imgUrl;
    this.#image = this.#getImage()
  }

  #getImage(): HTMLImageElement {
    const image = new Image();
    image.src = this.#imgUrl;
    return image;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.opacity) {
      context.globalAlpha = this.opacity;
    }

    context.drawImage(
      this.#image,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    context.globalAlpha = 1;
  }
}

export default ImageGameObject;
