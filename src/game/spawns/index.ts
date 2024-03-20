import { SpawnItem } from '../../engine';
import { ISpawnItem, IPubSub, IGameProperties } from '../../engine/types';
import ColumnSpan from './ColumnSpan';
import { buildingSpawns, columnsSpawns } from './constants';

export const createInitialGameSpawns = (
  gameProperties: IGameProperties,
  eventBus: IPubSub
): Record<string, ISpawnItem> => {
  const buildingSpawn = new SpawnItem(
    buildingSpawns(gameProperties.width, gameProperties.height),
    eventBus
  );
  buildingSpawn.spawnInitialItem({ positionX: gameProperties.width/2 });

  const columnSpawn = new ColumnSpan(columnsSpawns(gameProperties.width), eventBus);
  columnSpawn.spawnInitialItem();

  return { buildingSpawn, columnSpawn }
};
