import { IGameObject } from './gameObject';

export type Callback = (...args: any[]) => void;

export type CachedObjectPropertiesKey = keyof IGameObject;

export interface CachedObjectProperties extends Record<CachedObjectPropertiesKey, any> {}

export interface IGameEngine {
  gameObjects: IGameObject[];
  gameObjectsCache: Map<string, CachedObjectProperties>;
  readonly fps: number;
  resizeCanvas: (width: number, height: number) => void;
  clearGameObjects: () => void;
  addGameObject: (gameObject: IGameObject | IGameObject[]) => void;
  render: Callback;
  update: Callback;
  registerUpdate: (callback: Callback) => void
  schedule: <T extends Callback>(callback: T, delay: number) => void ;
  cancelSchedule: (intervalId: number) => void;
  cancelAllSchedules: Callback;
  startGameLoop: () => number;
  renderInView: (element: HTMLElement) => void;
}

