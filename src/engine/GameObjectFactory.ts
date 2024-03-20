import RectangleGameObject from './RectangleGameObject';
import ImageGameObject from './ImageGameObject';
import TextGameObject from './TextGameObject';
import { IGameObjectFactory, CreateGameObjecReturnType } from './types';
import { GameObjectTypes } from './enums';

const GameObjectMap = {
  [GameObjectTypes.Rectangle]: RectangleGameObject,
  [GameObjectTypes.Image]: ImageGameObject,
  [GameObjectTypes.Text]: TextGameObject,
};

class GameObjectFactory implements IGameObjectFactory {
  createGameObject = <T extends GameObjectTypes>(type: T, options: any): CreateGameObjecReturnType<T> => {
    const GameObjectClass = GameObjectMap[type];
  
    if (!GameObjectClass) {
      throw new Error(`Unknown game object type: ${type}`);
    }

    return new GameObjectClass(options) as CreateGameObjecReturnType<T>;
  }
}

export default new GameObjectFactory();
