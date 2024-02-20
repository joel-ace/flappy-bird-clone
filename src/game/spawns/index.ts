import { Layout } from '../enums';
import { SpawnItem } from '../../engine';
import { ISpawnItem, IPubSub } from '../../engine/types';
import ColumnSpan from './ColumnSpan';
import { BUILDING_SPAWNS, COLUMN_SPAWNS } from './constants';

export const createInitialGameSpawns = (eventBus: IPubSub): Record<string, ISpawnItem> => {
  const buildingSpawn = new SpawnItem(BUILDING_SPAWNS, eventBus);
  buildingSpawn.spawnInitialItem({ positionX: Layout.Width/2 });

  const columnSpawn = new ColumnSpan(COLUMN_SPAWNS, eventBus);
  columnSpawn.spawnInitialItem();

  return { buildingSpawn, columnSpawn }
};
