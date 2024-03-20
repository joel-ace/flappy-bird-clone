import {
  IGameEngine,
  IGameProperties,
  IPubSub,
  IGameObject,
} from '../engine/types';
import { createGameObjects } from './utils';
import { GameEvents, GameObjectCategory } from './enums';
import { IPlayer } from './Player';

class Game implements IGame {
  velocityX;
  velocityY;
  fallSpeed; 
  score;
  player;
  properties;
  isGameRunning;
  isGameOver;
  cacheProperties;
  #gameObjects: Record<string, any>;
  #eventBus;
  #gameEngine;

  constructor(properties: IExtendedGameProperties, gameEngine: IGameEngine, eventBus: IPubSub) {
    this.velocityX = -2;
    this.velocityY = -3;
    this.fallSpeed = 0.05;
    this.properties = properties;
    this.cacheProperties = { ...properties };
    this.score = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.player = null as unknown as IPlayer;
    this.#gameObjects = {};
    this.#eventBus = eventBus;
    this.#gameEngine = gameEngine;
    this.#addSubscriptions();
    this.initialize();
  }

  initialize = () => {
    const { background, player, soil, score, infoText, gameStateText, rectangleBg } = createGameObjects(
      this.properties.width,
      this.properties.height
    );
    this.#gameObjects = { background, player, soil, score, infoText, gameStateText, rectangleBg };
    this.player = player as IPlayer;
    this.score = 0;
    this.properties = { ...this.cacheProperties };

    infoText.updateProperties({
      positionX: (this.properties.width / 2) - (infoText.width / 2),
    });

    gameStateText.updateProperties({
      positionX: (this.properties.width / 2) - (gameStateText.width / 2),
    });

    this.#gameEngine.addGameObject([background, player, soil, rectangleBg, infoText, gameStateText, score]);

    this.#eventBus.publish(GameEvents.GameInitialized, {
      gameProperties: this.properties,
      player: this.player
    });
  }

  getGameObjects = () => {
    return this.#gameObjects;
  }

  startGame = () => {
    this.isGameOver = false;
    this.isGameRunning = true;

    this.#gameObjects.infoText.setRerender(false);
    this.#gameObjects.rectangleBg.setRerender(false);
    this.#gameObjects.gameStateText.setRerender(false);

    this.#eventBus.publish(GameEvents.GameStarted, {
      gameProperties: this.properties,
      player: this.player
    });
  }

  restartGame = () => {
    this.#gameEngine.clearGameObjects();
    this.initialize();
    this.startGame();
  }

  stopGame = () => {
    this.isGameOver = true;
    this.isGameRunning = false;
    this.properties.fallSpeed = 0;
    this.properties.velocityX = 0;
    this.properties.velocityY = 0;
    this.#gameEngine.cancelAllSchedules();

    this.#eventBus.publish(GameEvents.GameOver, {
      player: this.player,
      gameProperties: this.properties
    });

    this.#gameObjects.gameStateText.updateProperties({ text: 'Game Over' });

    this.#gameObjects.score.updateProperties({
      text: `Score: ${this.score}`,
      positionX: (this.properties.width / 2) - (this.#gameObjects.score.width / 2),
      positionY: (this.properties.height / 2) + (this.#gameObjects.rectangleBg.height/2) - this.#gameObjects.score.width/2
    });

    this.#gameObjects.infoText.setRerender(true);
    this.#gameObjects.rectangleBg.setRerender(true);
    this.#gameObjects.gameStateText.setRerender(true);
  }

  addGameObject = (objects: IGameObject | IGameObject[]): void => {
    this.#gameEngine.addGameObject(objects);
  }

  #addSubscriptions = () => {
    this.#eventBus.subscribe(GameEvents.RegisterObjectUpdate, this.#processUpdateEvent);
    this.#eventBus.subscribe(GameEvents.AddGameObject, this.#gameEngine.addGameObject);
  }

  #checkCollision = (player: IGameObject, obstacle: IGameObject): boolean => {
    return (
      player.positionX < obstacle.positionX + obstacle.width &&
      player.positionX + player.width > obstacle.positionX &&
      player.positionY < obstacle.positionY + obstacle.height &&
      player.positionY + player.height > obstacle.positionY
    );
  }

  #updateScore = (player: IGameObject, obstacle: IGameObject) => {
    if (
      obstacle.type === GameObjectCategory.Obstacle &&
      player.positionX > obstacle.positionX + obstacle.width &&
      !obstacle.hasExited()
    ) {
      this.score += 0.5;
      obstacle.setHasExited(true);
    }
  }

  hasCollision = (): boolean => {
    for (let i = 0; i < this.#gameEngine.gameObjects.length; i++) {
      const obstacle = this.#gameEngine.gameObjects[i];

      this.#updateScore(this.player, obstacle);
      if (obstacle.type === GameObjectCategory.Obstacle && this.#checkCollision(this.player, obstacle)){
        return true;
      }
    };

    this.#gameObjects.score.updateProperties({
      text: `Score: ${this.score}`
    });

    return false;
  }
  
  #processUpdateEvent = (updateData: any): void => {
    const { objects, updateCallback } = updateData;

    if (objects) {
      this.#gameEngine.addGameObject(objects);
    }

    this.registerUpdate(() => updateCallback(this.properties));
  }

  registerUpdate = (updateCallback: (properties: IExtendedGameProperties) => void): void => {
    this.#gameEngine.registerUpdate(() => updateCallback(this.properties));
  }

  schedule = (callback: (...args: any[]) => void, delay: number): void => {
    this.#gameEngine.schedule(callback, delay);
  }

  cancelAllSchedules = (): void => {
    this.#gameEngine.cancelAllSchedules();
  }

  renderCanvasInDiv = (element: HTMLElement): void => {
    this.#gameEngine.renderInView(element);
  }

  handleUserEvents = (event: KeyboardEvent | PointerEvent ) => {
    if (event instanceof KeyboardEvent && (event.code !== 'Space' && event.code !== 'ArrowUp')) {
      return;
    }

    if (this.isGameRunning) {
      this.player.move();
    } else if (this.isGameOver) {
      this.restartGame();
    } else {
      this.startGame();
    }    
  }

  handleCanvasResize = (event: Event) => {
    const currentTarget = event.currentTarget as Window;
    const width = currentTarget.innerWidth;
    const height = currentTarget.innerHeight;
    this.properties.width = this.cacheProperties.width = width;
    this.properties.height = this.cacheProperties.height = height;

    this.#gameObjects.background.updateProperties({ width, height });
    this.#gameObjects.soil.updateProperties({ width });

    this.#gameEngine.resizeCanvas(width, height);
  }
}

export interface IExtendedGameProperties extends IGameProperties {
  fallSpeed: number;
}

export interface IRegisterUpdateCallbackPayload {
  player: IPlayer,
  gameProperties: IExtendedGameProperties
}

export interface IGame {
  velocityX: number;
  velocityY: number;
  fallSpeed: number;
  player: IPlayer;
  score: number;
  properties: IGameProperties;
  isGameRunning: boolean;
  renderCanvasInDiv: (element: HTMLElement) => void;
  startGame: () => void;
  restartGame: () => void;
  addGameObject: (object: IGameObject | IGameObject[]) => void;
  schedule: (callback: (...args: any[]) => void, delay: number) => void ;
  cancelAllSchedules: () => void;
  registerUpdate: (updateCallback: (properties: IExtendedGameProperties) => void) => void;
}

export default Game;
