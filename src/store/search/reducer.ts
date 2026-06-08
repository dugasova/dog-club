import { LIST_SEARCH, LIST_SEARCH_SET, SEARCH_SET } from './action';
import type { CardData } from '../../types';

export type SearchState = {
  search: string;
  searchList: CardData[];
}

const initialState: SearchState = {
  search: ``,
  searchList: [] as CardData[],
}

const reducer = (state: SearchState = initialState, {type, payload}: {type: string, payload: any}) => {
  switch(type) {
    case SEARCH_SET:
      return {...state, search: payload}
    case LIST_SEARCH_SET:
      return{...state, searchList:payload as CardData[]}
    case LIST_SEARCH:
      return {
        ...state,
        searchList: ( payload.list as CardData[]).filter((item: CardData) =>
          item.desc.toLowerCase().includes(payload.value.toLowerCase())
        ),
      };
      default:
        return state
  }
}

export {reducer, initialState}