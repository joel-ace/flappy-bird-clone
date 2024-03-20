import GameObject from './GameObject';
import { ICreateTextGameObject, IGameObjectProperties } from './types';

class TextGameObject extends GameObject {
  fontSize: number;
  fontFace: string;
  fontWeight: string;
  color: string;
  text: string;
  maxWidth: number;
  alignCenter: boolean; 

  constructor({
    fontSize = 20,
    fontFace = 'Arial',
    color = 'black',
    fontWeight = 'normal',
    text = "Text",
    alignCenter,
    maxWidth,
    type,
    positionX,
    positionY,
    width,
    height,
    renderLayer
  }: ICreateTextGameObject){
    super({
      type,
      positionX,
      positionY,
      width,
      height,
      renderLayer,
    });

    this.fontSize = fontSize;
    this.fontFace = fontFace;
    this.color = color;
    this.text = text;
    this.maxWidth = maxWidth;
    this.fontWeight = fontWeight;
    this.alignCenter = alignCenter;
    this.width = this.maxWidth ? this.maxWidth : width || (this.fontSize * 0.6 * this.text.length);
    this.height = this.fontSize + 8;
  }

  updateProperties(properties: Partial<UpdateTextObjectPropertiesPayload>): void {
    Object.entries(properties).forEach(([key, value]) => {
      if (value !== undefined) {
        (this as any)[key as keyof UpdateTextObjectPropertiesPayload] = value;
      }
    });
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFace}`;

    if (!this.maxWidth) {
      this.width = context.measureText(this.text).width;
      context.fillText(this.text, this.positionX, this.positionY);
      return;
    }

    const words = this.text.split(' ');
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = context.measureText(testLine);
      let textWidth = metrics.width;

      if (textWidth > this.maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
      } else {
          line = testLine;
      }
    }

    lines.push(line);

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trim();
      let positionX = this.positionX;
      if (this.alignCenter) {
        positionX = this.positionX + (this.maxWidth - context.measureText(line).width) / 2;
      }

      context.fillText(line, positionX, this.positionY + (j * this.fontSize + 8));
    }
  }
}

type UpdateTextObjectPropertiesPayload = IGameObjectProperties & { text: string };

export default TextGameObject;
