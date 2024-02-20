export enum Layout {
  Width = 760,
  Height = 760,
}

export enum Plane {
  Width = 80,
  Height = 40,
}

export enum Column {
  Width = 60,
  Height = 640,
}

export enum SpawnObjectTypes {
  Building = 'Building',
  Column = 'Column',
}

export enum GameObjectTypes {
  Player = 'Player',
  Obstacle = 'Obstacle',
  Cosmetic = 'Cosmetic',
  BonusZone = 'BonusZone',
}

export enum RenderLayer {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Background = 1000,
}

export enum GameEvents {
  AddGameObject = 'AddGameObject',
  RegisterObjectUpdate = 'RegisterObjectUpdate',
  GameOver = 'GameOver',
  StartGame = 'StartGame',
  GameStarted = 'GameStarted',
  GameInitialized = 'GameInitialized',
}
