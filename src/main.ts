import { Layout, Column, Plane } from './enums';
import cityBackground from './assets/images/city-background.png';
import airplaneImage from './assets/images/airplane.png';
import buildingImage from './assets/images/building1.png';
import buildingImage2 from './assets/images/building2.png';
import buildingImage3 from './assets/images/building3.png';
import buildingImage4 from './assets/images/building4.png';
import buildingImage5 from './assets/images/building5.png';
import columnImage from './assets/images/column.png';
import cloudImage from './assets/images/cloud.png';
import './assets/style/style.css';

const initialize = function (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  canvas.width  = Layout.Width;
  canvas.height = Layout.Height;

  const cityBackgroundImage = new Image();
  cityBackgroundImage.src = cityBackground;

  cityBackgroundImage.onload = () => {
    context.drawImage(cityBackgroundImage, 0, 0, canvas.width, canvas.height);
  };
}

window.onload = () => {
  const canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  context.fillRect(0, 0, 100, 100)

  initialize(canvas, context);

  const plane = new Image();
  plane.src = airplaneImage;
  plane.onload = function() {
    context.drawImage(plane, 50, (canvas.height/2) - 20, Plane.Width, Plane.Height);
  }

  const building = new Image();
  building.src = buildingImage;
  building.onload = function() {
    context.globalAlpha = 0.05;
    context.drawImage(building, 450, 340, 320, 340);
    context.globalAlpha = 1;
  }

  const building2 = new Image();
  building2.src = buildingImage2;
  building2.onload = function() {
    context.globalAlpha = 0.15;
    context.drawImage(building2, 160, 370, 180, 300);
    context.globalAlpha = 1;
  }

  const building3 = new Image();
  building3.src = buildingImage3;
  building3.onload = function() {
    context.globalAlpha = 0.025;
    context.drawImage(building3, 10, 360, 320, 340);
    context.globalAlpha = 1;
  }

  const building4 = new Image();
  building4.src = buildingImage4;
  building4.onload = function() {
    context.globalAlpha = 0.05;
    context.drawImage(building4, 450, 180, 160, 500);
    context.globalAlpha = 1;
  }

  const building5 = new Image();
  building5.src = buildingImage5;
  building5.onload = function() {
    context.globalAlpha = 0.05;
    context.drawImage(building5, 450, 80, 160, 600);
    context.globalAlpha = 1;
  }

  const column = new Image();
  column.src = columnImage;
  column.onload = function() {
    context.drawImage(column, 0, 0, Column.Width, Column.Height);
  }

  const cloud = new Image();
  cloud.src = cloudImage;
  cloud.onload = function() {
    context.globalAlpha = 0.2;
    context.drawImage(cloud, 160, 89, 160, 89);
    context.globalAlpha = 1;
  }
};
