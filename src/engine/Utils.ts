import { CachedObjectProperties, CachedObjectPropertiesKey, IGameObject } from './types';

class Utils {
  static getClassProperties(gameObjectInstance: IGameObject): CachedObjectProperties{
    const objectWithoutMethods: Record<string, any> = {};
    const propertyNames = Object.getOwnPropertyNames(gameObjectInstance);

    for (const key of propertyNames) {
      if (typeof gameObjectInstance[key as keyof IGameObject] !== 'function') {
        objectWithoutMethods[key] = gameObjectInstance[key as keyof IGameObject];
      }
    }

    return objectWithoutMethods;
  }

  static hasPropertyUpdate(firstObject: CachedObjectProperties, secondObject: CachedObjectProperties): boolean {
    const keys1 = Object.keys(firstObject);
    const keys2 = Object.keys(secondObject);
  
    if (keys1.length !== keys2.length) {
      return true;
    }
  
    for (const key of keys1) {
      if (firstObject[key as keyof CachedObjectProperties] !== secondObject[key as keyof CachedObjectProperties]) {
        return true;
      }
    }
  
    return false;
  }

  static getObjectDiff(
    cachedObject: CachedObjectProperties,
    updatedObject: CachedObjectProperties
  ): Partial<CachedObjectProperties> | null {
    const diff: Partial<CachedObjectProperties> = {};
  
    const keys1 = Object.keys(cachedObject) as CachedObjectPropertiesKey[];
    const keys2 = Object.keys(updatedObject) as CachedObjectPropertiesKey[];
  
    const allKeys = new Set([...keys1, ...keys2]);

    for (const key of allKeys) {
      if (cachedObject[key] !== updatedObject[key]) {
        diff[key] = updatedObject[key];
      }
    }
  
    return Object.keys(diff).length === 0 ? null : diff;
  }
  
}

export default Utils;
