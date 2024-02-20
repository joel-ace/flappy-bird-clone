import GameObject from './GameObject';
import { GameEngineEvents } from './enums';
import {
  IPubSub,
  IGameObject,
  ISpawnItem,
  IGameObjectPosition,
  ICreateGameObject,
  IGameProperties
} from './types';

class SpawnItem implements ISpawnItem {
  protected spawnObjectProps: ICreateGameObject[];
  #eventBus: IPubSub;

  constructor(spawnObjectProps: ICreateGameObject[], eventBus: IPubSub) {
    this.spawnObjectProps = spawnObjectProps;
    this.#eventBus = eventBus;
  }

  protected getSpawnObject = (): IGameObject[]  => {
    return this.spawnObjectProps.map((objectProps) => new GameObject({ ...objectProps }));
  }

  protected updateGameObjectPosition = (spawnObject: IGameObject, position?: Partial<IGameObjectPosition>): void => {
    spawnObject.updateProperties({
      positionX: position?.positionX ?? spawnObject.positionX,
      positionY: position?.positionY ?? spawnObject.positionY
    });
  }

  protected registerSpawnObjectCallback = (spawnObject: IGameObject) => (gameProperties: IGameProperties): void => {
    spawnObject.updateProperties({
      positionX: spawnObject.positionX + gameProperties.velocityX
    });
  };

  protected registerSpawnItemUpdate = (spawnObject: IGameObject) => (): void => {
    this.#eventBus.publish(GameEngineEvents.RegisterObjectUpdate, {
      object: spawnObject,
      updateCallback: this.registerSpawnObjectCallback(spawnObject)
    });
  }

  getSpawnItem = (): IGameObject | IGameObject[] => {
    const spawnObjects = this.getSpawnObject();
    if (spawnObjects.length === 1) {
      return spawnObjects[0];
    }
    return spawnObjects[Math.floor(Math.random() * spawnObjects.length)];
  }

  spawnInitialItem = (position?: Partial<IGameObjectPosition>): void => {
    const initialSpawnItem = this.getSpawnItem() as IGameObject;
    this.updateGameObjectPosition(initialSpawnItem, position);
    this.#eventBus.publish(GameEngineEvents.AddGameObject, initialSpawnItem);
    this.#eventBus.subscribe(GameEngineEvents.GameStarted, this.registerSpawnItemUpdate(initialSpawnItem));
  }

  spawn = (position?: Partial<IGameObjectPosition>): void => {
    const spawnedItem = this.getSpawnItem() as IGameObject;
    this.updateGameObjectPosition(spawnedItem, position);
    this.#eventBus.publish(GameEngineEvents.AddGameObject, spawnedItem);
    this.registerSpawnItemUpdate(spawnedItem)();
  }
}

export default SpawnItem;
