import { SpawnItem } from '../../engine';
import { IPubSub, IGameObject, ICreateGameObject } from '../../engine/types';
import { GameEvents, Layout } from '../enums';

class ColumnSpan extends SpawnItem {
  protected eventBus: IPubSub;

  constructor(spawnObjectProps: ICreateGameObject[], eventBus: IPubSub) {
    super(spawnObjectProps, eventBus);
    this.eventBus = eventBus;
  }

  #addSpawnObjectToGame = (): Record<string, IGameObject> => {
    const columns = this.getSpawnItem() as IGameObject[];
    const [topColumn, bottomColumn] = columns;
    const positionY = Math.floor(Layout.Height/4 + Math.random() * (Layout.Height/2 - Layout.Height/4));

    this.updateGameObjectPosition(topColumn, { positionY:  -positionY });
    this.updateGameObjectPosition(bottomColumn, { positionY: bottomColumn.height - positionY + 150 });

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
