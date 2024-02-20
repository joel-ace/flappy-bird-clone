import { GameObject } from '../engine';
import { ICreateGameObject, IGameObject } from '../engine/types';
import { GameObjectTypes } from './enums';

class Player extends GameObject {
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
  }: ICreateGameObject) {
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
    this.type = GameObjectTypes.Player;

    this.move = this.move.bind(this);
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
