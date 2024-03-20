import { GameObjectCategory, Column, RenderLayer, Layout } from '../enums';
import { SOIL_HEIGHT } from '../constants';
import columnImage from '../../assets/images/column.png';
import columnButtomImage from '../../assets/images/column-bottom.png';
import buildingImage from '../../assets/images/building1.png';
import buildingImage2 from '../../assets/images/building2.png';
import buildingImage3 from '../../assets/images/building3.png';
import buildingImage4 from '../../assets/images/building4.png';
import buildingImage5 from '../../assets/images/building5.png';

export const COLUMNS = {
  type: GameObjectCategory.Obstacle,
  imgUrl: [columnImage, columnButtomImage],
  positionX: Layout.Width,
  positionY: 0,
  width: Column.Width,
  height: Column.Height,
  renderLayer: RenderLayer.Two
}

export const BUILDINGS = {
  type: GameObjectCategory.Cosmetic,
  imgUrl: [buildingImage, buildingImage2, buildingImage3, buildingImage4, buildingImage5],
  positionX: Layout.Width,
  positionY: [310, 345, 335, 150, 45],
  width: [320, 180, 320, 160, 160],
  height: [340, 300, 340, 500, 600],
  opacity: [0.2, 0.3, 0.15, 0.2, 0.2],
  renderLayer: RenderLayer.Four
}

export const buildingSpawns = (gameWidth: number, gameHeight: number) => BUILDINGS.imgUrl.map((image, index) => ({
  ...BUILDINGS,
  positionX: gameWidth,
  imgUrl: image,
  width: BUILDINGS.width[index],
  positionY: gameHeight - BUILDINGS.height[index] - SOIL_HEIGHT,
  height: BUILDINGS.height[index],
  opacity: BUILDINGS.opacity[index]
}));

export const columnsSpawns = (positionX: number) => COLUMNS.imgUrl.map((image) => ({
  ...COLUMNS,
  positionX,
  imgUrl: image
}));
