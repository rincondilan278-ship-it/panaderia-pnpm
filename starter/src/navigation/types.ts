
import type { Item } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: {
    item: Item;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
};
