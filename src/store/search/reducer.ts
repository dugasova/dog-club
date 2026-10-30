import type { CardData } from '../../types';
import { SearchActionType } from './action';

export type SearchState = {
  search: string;
  searchList: CardData[];
};

export type SearchAction =
  | { type: typeof SearchActionType.SEARCH_SET; payload: string }
  | { type: typeof SearchActionType.LIST_SEARCH_SET; payload: CardData[] }
  | {
      type: typeof SearchActionType.LIST_SEARCH;
      payload: { list: CardData[]; value: string };
    };

export const initialState: SearchState = {
  search: '',
  searchList: [],
};

export const reducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionType.SEARCH_SET:
      return { ...state, search: action.payload };
    case SearchActionType.LIST_SEARCH_SET:
      return { ...state, searchList: action.payload };
    case SearchActionType.LIST_SEARCH: {
      const value = action.payload.value.toLowerCase();
      return {
        ...state,
        searchList: action.payload.list.filter((item) => item.desc.toLowerCase().includes(value)),
      };
    }
    default:
      return state;
  }
};
