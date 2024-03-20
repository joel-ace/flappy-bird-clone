import { SpawnItem } from '../../engine';
import { ISpawnItem, IPubSub, IGameProperties } from '../../engine/types';
import ColumnSpan from './ColumnSpawn';
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

  const columnSpawn = new ColumnSpan(columnsSpawns(gameProperties.width), gameProperties, eventBus);
  columnSpawn.spawnInitialItem();

  return { buildingSpawn, columnSpawn }
};
