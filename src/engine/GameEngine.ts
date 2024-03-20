import Utils from  './Utils';
import { DEFAULT_CANVAS_SIZE } from './enums';
import {
  Callback,
  IGameEngine,
  IGameObject,
  IGameObjectSize,
  CachedObjectProperties,
} from './types';

class GameEngine implements IGameEngine{
  readonly fps: number;
  gameObjects;
  gameObjectsCache;
  #lastTimestamp: number;
  #updates: Callback[];
  #intervals;
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #bufferCanvas: HTMLCanvasElement;
  #bufferCanvasContext: CanvasRenderingContext2D;

  constructor({
    width = DEFAULT_CANVAS_SIZE.Width,
    height = DEFAULT_CANVAS_SIZE.Height
  }: IGameObjectSize) {
    this.gameObjects = [] as IGameObject[];
    this.gameObjectsCache = new Map<string, CachedObjectProperties>();
    this.fps = 120;

    this.#updates = [];
    this.#intervals = new Set<number>();

    const { mainCanvas, mainCanvascontext, bufferCanvas, bufferCanvasContext } = this.#init({ width, height });
    this.#canvas = mainCanvas;
    this.#context = mainCanvascontext;
    this.#bufferCanvas = bufferCanvas;
    this.#bufferCanvasContext = bufferCanvasContext;
    this.#lastTimestamp = 0;
  }

  #init = (canvasSize: IGameObjectSize): {
    mainCanvas: HTMLCanvasElement,
    mainCanvascontext: CanvasRenderingContext2D,
    bufferCanvas: HTMLCanvasElement,
    bufferCanvasContext: CanvasRenderingContext2D
  } => {
    const mainCanvas = this.#createCanvasElement(canvasSize.width, canvasSize.height);
    const mainCanvascontext = mainCanvas.getContext('2d') as CanvasRenderingContext2D;

    const bufferCanvas = this.#createCanvasElement(canvasSize.width, canvasSize.height);
    const bufferCanvasContext = bufferCanvas.getContext('2d') as CanvasRenderingContext2D;

    return {
      mainCanvas,
      mainCanvascontext,
      bufferCanvas,
      bufferCanvasContext
    }
  }

  renderInView = (element: HTMLElement): void => {
    element.appendChild(this.#canvas);
    this.startGameLoop();
  }

  #createCanvasElement = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  clearGameObjects = (): void => {
    this.gameObjects = [];
    this.#updates = [];
    this.gameObjectsCache.clear();
  }

  // TODO: find a way to cache updates or remove cache completely
  addGameObject = (object: IGameObject | IGameObject[]): void => {
    if (Array.isArray(object)) {
      this.gameObjects.push(...object);
      object.reduce((acc, item) => acc.set(item.name, Utils.getClassProperties(item)), this.gameObjectsCache);
    } else {
      this.gameObjects.push(object);
      this.gameObjectsCache.set(object.name, Utils.getClassProperties(object))
    }
  }

  resizeCanvas = (width: number, height: number): void => {
    this.#canvas.width = this.#bufferCanvas.width = width;
    this.#canvas.height = this.#bufferCanvas.height = height;
  }

  #clearCanvas = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, this.#canvas.width, this.#canvas.height - 120);
  }

  #sortGameObjectsByRenderLayer = (): IGameObject[] => {
    return [...this.gameObjects].sort((a, b) => {
      return b.renderLayer - a.renderLayer;
    });
  }

  schedule = (callback: Callback, delay: number): void => {
    const interval = setInterval(callback, delay);
    this.#intervals.add(interval);
  }

  cancelSchedule = (intervalId: number): void => {
    clearInterval(intervalId);
  }

  cancelAllSchedules = (): void => {
    Array.from(this.#intervals).forEach((intervalId) => {
      clearInterval(intervalId);
    });
  }

  #renderToBufferCanvas = (): void => {
    const sortedGameObjects = this.#sortGameObjectsByRenderLayer();
    this.#bufferCanvasContext.clearRect(0, 0, this.#canvas.width, this.#canvas.height - 120);
    for (const gameObject of sortedGameObjects) {
      if (gameObject.reRender) {
        gameObject.draw(this.#bufferCanvasContext);
      }
    }
  }

  #renderToMainCanvas = (): void => {
    this.#renderToBufferCanvas();
    this.#clearCanvas(this.#context);
    this.#context.drawImage(this.#bufferCanvas, 0, 0, this.#bufferCanvas.width, this.#bufferCanvas.height);
  }

  #removeOffscreenObjects = (): void => {
    this.gameObjects.forEach((gameObject, index) => {
      if (gameObject.positionX < -gameObject.width) {
        this.gameObjects.splice(index, 1);
        this.gameObjectsCache.delete(gameObject.name);
      }
    });
  }

  render = (): void => {
    this.#removeOffscreenObjects()
    this.#renderToMainCanvas();
  }

  update = (timestamp: any): void => {
    const deltaTime = timestamp - this.#lastTimestamp;

    requestAnimationFrame(this.update);

    if (deltaTime > 1000 / this.fps) {
      this.#updateGameObjects();
      this.render();
      this.#lastTimestamp = timestamp;
    }
  }

  registerUpdate = (callback: Callback): void => {
    this.#updates.push(callback);
  }

  #updateGameObjects = (): void => {
    for (let i = 0; i < this.#updates.length; i++) {
      this.#updates[i].call(this);
    }
  }

  // registerUpdate(object: IGameObject): void {
  //   const objectName = object.name as CachedObjectPropertiesKey;
  //   const cachedObject = this.gameObjectsCache.get(objectName) ?? {} as CachedObjectProperties;
  //   const updateClassProperty =  Utils.getClassProperties(object);
  //   const changes = Utils.getObjectDiff(cachedObject, updateClassProperty);

  //   if (changes) {
  //     object.setRerender(true);
  //     this.gameObjectsCache.set(objectName, updateClassProperty)
  //   } else {
  //     object.setRerender(false);
  //   }
  // }

  startGameLoop = (): number => {
    return requestAnimationFrame(this.update);
  }
}

export default GameEngine;
