import { PubSub, GameEngine } from "./engine";
import { ISpawnItem } from './engine/types';
import { Layout, GameEvents } from './game/enums';
import Game, { IExtendedGameProperties } from './game/Game';
import { createInitialGameSpawns } from './game/spawns';

import './assets/style/style.css';

const GAME_PROPERTIES = {
  velocityX: -2,
  velocityY: 0,
  fallSpeed: 0.4,
  width: Layout.Width,
  height: Layout.Height,
}

window.onload = () => {
  const SOIL_HEIGHT = 120;
  const root = document.getElementById('gameBody') as HTMLElement;

  const eventBus = new PubSub();

  let spawns = {} as Record<string, ISpawnItem> ;

  eventBus.subscribe(GameEvents.GameInitialized, () => {
    spawns = createInitialGameSpawns(eventBus);
  });

  const gameEngine = new GameEngine({ width: GAME_PROPERTIES.width, height: GAME_PROPERTIES.height});

  const game = new Game(GAME_PROPERTIES, gameEngine, eventBus);

  game.renderCanvasInDiv(root);

  eventBus.subscribe(GameEvents.GameStarted, ({ player }) => {

    game.registerUpdate((gameProperties: IExtendedGameProperties) => {
      const playerVelocityY = player.velocityY + gameProperties.fallSpeed;
      const dy = player.positionY + playerVelocityY;
      const topOfSoil = game.properties.height - SOIL_HEIGHT - player.height;
      const positionY = Math.max(0, Math.min(dy, topOfSoil));

      if (player.positionY >= topOfSoil || game.hasCollision()) {
        game.stopGame();
        return;
      }
  
      player.updateProperties({
        positionY: positionY < 0 ? 0 : positionY,
        velocityY: playerVelocityY
      });
    });

    const { buildingSpawn, columnSpawn } = spawns;

    game.schedule(buildingSpawn.spawn, 4000);
    game.schedule(columnSpawn.spawn, 3000);
  });

  eventBus.subscribe(GameEvents.GameOver, ({ player }) => {
    player.updateProperties({
      velocityY: 0
    });
  });

  document.addEventListener('pointerdown', game.handleUserEvents);
  document.addEventListener('keydown', game.handleUserEvents);
};
