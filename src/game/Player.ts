import { ImageGameObject } from '../engine';
import { ICreateImageGameObject, IGameObject } from '../engine/types';
import { GameObjectCategory } from './enums';
// import ImageGameObject from '../engine/ImageGameObject';

class Player extends ImageGameObject {
  constructor({
    type,
    imgUrl,
    positionX,
    positionY,
    width,
    height,
    name,
    opacity,
    renderLayer,
  }: ICreateImageGameObject) {
    super({
      type,
      imgUrl,
      positionX,
      positionY,
      width,
      height,
      name,
      opacity,
      renderLayer,
    });
    this.type = GameObjectCategory.Player;
  }

  move = (): void => {
    this.updateProperties({
      velocityY: -6
    })
  }
}

export interface IPlayer extends IGameObject {
  move: () => void;
}

export default Player;
