import { IGameObject } from './gameObject';

export type Callback = (...args: any[]) => void;

export type CachedObjectPropertiesKey = keyof IGameObject;

export interface CachedObjectProperties extends Record<CachedObjectPropertiesKey, any> {}

export interface IGameEngine {
  gameObjects: IGameObject[];
  gameObjectsCache: Map<CachedObjectPropertiesKey, CachedObjectProperties>;
  clearGameObjects: () => void;
  addGameObject: (gameObject: IGameObject | IGameObject[]) => void;
  render: Callback;
  update: Callback;
  registerUpdate: (callback: Callback) => void
  schedule: <T extends Callback>(callback: T, delay: number) => void ;
  cancelSchedule: (intervalId: number) => void;
  cancelAllSchedules: Callback;
  startGameLoop: () => number;
  stopGameLoop: (requestID: number) => void;
  restartGameLoop: () => number;
  renderInView: (element: HTMLElement) => void
}

