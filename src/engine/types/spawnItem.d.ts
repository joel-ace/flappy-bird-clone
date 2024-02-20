import {
  IGameObject,
  IGameObjectPosition,
  IGameObjectSize,
  IGameObjectPhysic
} from './gameObject';

export interface IGameProperties extends IGameObjectPhysic, IGameObjectSize {};

export type Spawn = (position: Partial<IGameObjectPosition>) => void;

export interface ISpawnItem {
  spawn: Spawn;
  spawnInitialItem: Spawn;
  getSpawnItem: () => IGameObject | IGameObject[];
}
