import { Callback } from './gameEngine';

export type SubscriptionMethod = (event: string, callback: Callback) => void;

export interface IPubSub {
  subscribe: SubscriptionMethod;
  unsubscribe: SubscriptionMethod;
  unsubscribeAll: (event: string) => void;
  publish: (event: string, data: any) => void;
};
