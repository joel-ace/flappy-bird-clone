import Player from './Player';
import GameObject  from '../engine/GameObject';
import { IGameObject } from '../engine/types';
import { DEFAULT_GAME_PROPERTIES, SOIL_HEIGHT } from './constants';
import { Layout, Plane, GameObjectTypes, RenderLayer } from './enums';

import airplaneImage from '../assets/images/airplane.png';
import backgroundImage from '../assets/images/background.jpg';
import cloudImage from '../assets/images/cloud.png';
import soilImage from '../assets/images/soil.jpg';

export const createGameObjects = (): Record<string, IGameObject> => {
  const background = new GameObject({
    type: GameObjectTypes.Cosmetic,
    imgUrl: backgroundImage,
    positionX: 0,
    positionY: 0,
    width: DEFAULT_GAME_PROPERTIES.width,
    height: DEFAULT_GAME_PROPERTIES.height,
    renderLayer: RenderLayer.Background
  });

  const player = new Player({
    type: GameObjectTypes.Player,
    imgUrl: airplaneImage,
    positionX: 70,
    positionY: (DEFAULT_GAME_PROPERTIES.height/2) - (Plane.Height/2),
    width: Plane.Width,
    height: Plane.Height,
    renderLayer: RenderLayer.One
  });

  const soil = new GameObject({
    type: GameObjectTypes.Cosmetic,
    imgUrl: soilImage,
    positionX: 0,
    positionY: Layout.Height - SOIL_HEIGHT,
    width: Layout.Width,
    height: SOIL_HEIGHT,
    renderLayer: RenderLayer.One
  });

  const cloud = new GameObject({
    type: GameObjectTypes.Cosmetic,
    imgUrl: cloudImage,
    positionX: 160,
    positionY: 89,
    width: 160,
    height: 89,
    renderLayer: RenderLayer.Three,
    opacity: 0.2
  });

  return { background, player, soil, cloud };
}
