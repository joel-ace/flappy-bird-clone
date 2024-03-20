import { RenderLayer, GameObjectTypes } from '../enums';
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
  renderLayer?: RenderLayer
  opacity?: number;
};

export type CreateGameObjecReturnType<T extends GameObjectTypes> = (
  T extends GameObjectTypes.Rectangle ? RectangleGameObject :
  T extends GameObjectTypes.Image ? ImageGameObject :
  T extends GameObjectTypes.Text ? TextGameObject :
  IGameObject
);

export interface IGameObjectFactory {
  createGameObject: <T extends GameObjectTypes>(type: T, options: any) => CreateGameObjecReturnType<T>
}

export interface IGameObjectProperties extends Partial<IGameObjectPosition>, Partial<IGameObjectPhysic>, Partial<IGameObjectSize> {};

export interface ICreateRectangleGameObject extends ICreateGameObject {
  color: string;
}

export interface ICreateImageGameObject extends ICreateGameObject { imgUrl: string }

export interface ICreateTextGameObject extends ICreateGameObject {
  fontSize: number;
  fontFace: string;
  fontWeight: string;
  color: string;
  text: string;
  multiline: boolean;
  maxWidth: number;
  alignCenter: boolean;
}

