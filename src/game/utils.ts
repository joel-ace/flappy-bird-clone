import Player from './Player';
import { GameObjectFactory } from '../engine';
import { GameObjectTypes } from '../engine/enums';
import { IGameObject } from '../engine/types';
import { SOIL_HEIGHT } from './constants';
import { Plane, GameObjectCategory, RenderLayer } from './enums';

import airplaneImage from '../assets/images/airplane.png';
import backgroundImage from '../assets/images/background.jpg';
import cloudImage from '../assets/images/cloud.png';
import soilImage from '../assets/images/soil.jpg';

export const createGameObjects = (width: number, height: number): Record<string, IGameObject> => {
  const background = GameObjectFactory.createGameObject(GameObjectTypes.Image, {
    type: GameObjectCategory.Cosmetic,
    imgUrl: backgroundImage,
    positionX: 0,
    positionY: 0,
    width: width,
    height: height,
    renderLayer: RenderLayer.Background
  });

  const player = new Player({
    type: GameObjectCategory.Player,
    imgUrl: airplaneImage,
    positionX: 70,
    positionY: (height * 0.5) - (Plane.Height * 0.5),
    width: Plane.Width,
    height: Plane.Height,
    renderLayer: RenderLayer.One
  });

  const soil = GameObjectFactory.createGameObject(GameObjectTypes.Image, {
    type: GameObjectCategory.Cosmetic,
    imgUrl: soilImage,
    positionX: 0,
    positionY: height - SOIL_HEIGHT,
    width: width,
    height: SOIL_HEIGHT,
    renderLayer: RenderLayer.One
  });

  const cloud = GameObjectFactory.createGameObject(GameObjectTypes.Image, {
    type: GameObjectCategory.Cosmetic,
    imgUrl: cloudImage,
    positionX: 160,
    positionY: 89,
    width: 160,
    height: 89,
    renderLayer: RenderLayer.Three,
    opacity: 0.2
  });

  const score = GameObjectFactory.createGameObject(GameObjectTypes.Text, {
    text: "Score: 0",
    fontWeight: 'bold',
    fontSize: 30,
    fontFace: 'monospace',
    color: 'white',
    positionX: width - 200,
    positionY: 50,
    renderLayer: RenderLayer.One,
    type: GameObjectCategory.Cosmetic,
  });

  const rectangleBg = GameObjectFactory.createGameObject(GameObjectTypes.Rectangle, {
    color: 'black',
    width: width < 400 ? width - 20 : 450,
    height: 250,
    positionX: (width / 2) - ((width < 400 ? width - 20 : 450) / 2),
    positionY: ((height - SOIL_HEIGHT) / 2) - 100,
    opacity: 0.8,
    renderLayer: RenderLayer.One,
    type: GameObjectCategory.Cosmetic,
  });

  const gameStateText = GameObjectFactory.createGameObject(GameObjectTypes.Text, {
    text: "Start Game",
    fontWeight: 'bold',
    fontSize: 50,
    fontFace: 'monospace',
    color: 'white',
    positionX: width / 2,
    positionY: ((height - SOIL_HEIGHT) / 2) - 29,
    renderLayer: RenderLayer.One,
    type: GameObjectCategory.Cosmetic,
  });

  const infoText = GameObjectFactory.createGameObject(GameObjectTypes.Text, {
    text: 'Tap screen, click the left mouse button, or hit the "Space" or "Arrow Up" keys to start game',
    fontWeight: 'normal',
    fontSize: 20,
    fontFace: 'monospace',
    maxWidth: width < 400 ? width - 100 : 400,
    alignCenter: true,
    color: 'white',
    positionX: width / 2,
    positionY: ((height - SOIL_HEIGHT) / 2) - 10,
    renderLayer: RenderLayer.One,
    type: GameObjectCategory.Cosmetic,
  });

  return { background, player, soil, cloud, score, infoText, gameStateText, rectangleBg };
}
