import { RenderLayer } from '../enums';
import { Callback } from './gameEngine';

export interface IGameObjectPosition {
  positionX: number;
  positionY: number;
}

export interface IGameObjectPhysic {
  velocityX: number;
  velocityY: number;
}

export interface IGameObjectSize {
  width: number,
  height: number,
}

export interface IGameObject extends IGameObjectPosition, IGameObjectPhysic, Readonly<IGameObjectSize> {
  readonly type: string;
  readonly name: string;
  reRender: boolean;
  renderLayer: number;
  draw: (context: CanvasRenderingContext2D) => void;
  updateProperties: (properties: Partial<IGameObjectProperties>) => void
  setHasEntered: (value: boolean) => void;
  setHasExited: (value: boolean) => void;
  hasEntered: Callback;
  hasExited: () => boolean;
  setRerender(shoudRerender: boolean): void
}

export interface ICreateGameObject extends IGameObjectPosition, IGameObjectSize {
  name?: string,
  type: string,
  imgUrl: string,
  renderLayer?: RenderLayer
  opacity?: number;
};

export interface IGameObjectProperties extends Partial<IGameObjectPosition>, Partial<IGameObjectPhysic> {};
