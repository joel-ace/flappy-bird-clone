import { ALLOWED_UPDATE_FIELDS } from './constants';
import { RenderLayer } from './enums';
import {
  IGameObject,
  ICreateGameObject,
  IGameObjectProperties,
} from './types';

class GameObject implements IGameObject {
  name;
  positionX;
  positionY;
  velocityX;
  velocityY;
  width;
  height;
  type;
  opacity;
  reRender = true;
  renderLayer;
  #hasEntered = false;
  #hasExited;

  constructor({
    type,
    positionX,
    positionY,
    width,
    height,
    name,
    opacity,
    renderLayer
  }: ICreateGameObject){
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.width = width;
    this.height = height;
    this.opacity = opacity ?? 1;
    this.renderLayer = renderLayer ?? RenderLayer.One;
    this.name = name ?? this.#generateName();
    this.#hasExited = false;
  }

  #generateName(): string {
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${this.type}_${randomSuffix}_${Date.now()}`;
  }

  updateProperties(properties: Partial<IGameObjectProperties>): void {
    Object.entries(properties).forEach(([key, value]) => {
      if (!(ALLOWED_UPDATE_FIELDS as Record<string, boolean>)[key]) {
        return;
      }

      if (value !== undefined) {
        this[key as keyof IGameObjectProperties] = value;
      }
    });
  }

  draw(_context: CanvasRenderingContext2D) {}

  setHasEntered(value: boolean): boolean { 
    return this.#hasEntered = value
  }

  setHasExited(value: boolean) { 
    this.#hasExited = value;
  }

  hasEntered(): boolean { 
    return this.#hasEntered
  }

  hasExited(): boolean { 
    return this.#hasExited;
  }

  setRerender(shoudRerender: boolean): void { 
    this.reRender = shoudRerender;
  }
}

export default GameObject;
