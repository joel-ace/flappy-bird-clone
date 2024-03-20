import { SpawnItem } from '../../engine';
import { IPubSub, IGameObject, ICreateGameObject, IGameProperties } from '../../engine/types';
import { SOIL_HEIGHT } from '../constants';
import { GameEvents } from '../enums';

class ColumnSpan extends SpawnItem {
  protected eventBus: IPubSub;
  #gameProperties;

  constructor(
    spawnObjectProps: ICreateGameObject[],
    gameProperties: IGameProperties,
    eventBus: IPubSub
  ) {
    super(spawnObjectProps, eventBus);
    this.eventBus = eventBus;
    this.#gameProperties = gameProperties;
  }

  #addSpawnObjectToGame = (): Record<string, IGameObject> => {
    const columns = this.getSpawnItem() as IGameObject[];
    const [topColumn, bottomColumn] = columns;

    const availableHeight = this.#gameProperties.height - SOIL_HEIGHT;
    const minPosition = availableHeight * 0.25;
    const maxPosition = availableHeight * 0.75;

    const positionY = (Math.random() * (maxPosition - minPosition) + minPosition) - topColumn.height;

    this.updateGameObjectPosition(topColumn, { positionY: positionY });
    this.updateGameObjectPosition(bottomColumn, { positionY: bottomColumn.height + positionY + 150 });

    this.eventBus.publish(GameEvents.AddGameObject, [topColumn, bottomColumn]);
    return { topColumn, bottomColumn };
  }

  getSpawnItem = (): IGameObject[] => {
    return this.getSpawnObject();
  }

  spawnInitialItem = (): void => {
    const { topColumn, bottomColumn } = this.#addSpawnObjectToGame();

    this.eventBus.subscribe(GameEvents.GameStarted, this.registerSpawnItemUpdate(topColumn));
    this.eventBus.subscribe(GameEvents.GameStarted, this.registerSpawnItemUpdate(bottomColumn));
  }

  spawn = (): void => {
    const { topColumn, bottomColumn } = this.#addSpawnObjectToGame();

    this.registerSpawnItemUpdate(topColumn)();
    this.registerSpawnItemUpdate(bottomColumn)();
  }
}

export default ColumnSpan;
