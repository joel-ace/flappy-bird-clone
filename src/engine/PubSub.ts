import { IPubSub, Callback } from './types';

class PubSub implements IPubSub {
   #subscribers: { [event: string]: Callback[] } = {};

  subscribe = (event: string, callback: Callback): void => {
    if (!this.#subscribers[event]) {
      this.#subscribers[event] = [];
    }
    this.#subscribers[event].push(callback);
  }

  unsubscribe = (event: string, callback: Callback): void => {
    if (this.#subscribers[event]) {
      this.#subscribers[event] = this.#subscribers[event].filter(subscriber => subscriber !== callback);
    }
  }

  unsubscribeAll = (event: string): void => {
    if (this.#subscribers[event]) {
      delete this.#subscribers[event];
    }
  }

  publish = (event: string, data: any): void => {
    if (this.#subscribers[event]) {
      this.#subscribers[event].forEach(callback => {
        callback(data);
      });
    }
  }
};

export default PubSub;
