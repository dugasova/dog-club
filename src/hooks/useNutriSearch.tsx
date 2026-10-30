import { useReducer, useEffect } from 'react';
import { initialState, reducer } from '../store/search/reducer';
import type { CardData } from '../types';
import { SearchActionType } from '../store/search/action';

export default function useNutriSearch(list: CardData[]) {
  const [stateSearch, dispatchSearch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (stateSearch.search.length >= 3) {
      dispatchSearch({
        type: SearchActionType.LIST_SEARCH,
        payload: { list, value: stateSearch.search },
      });
    } else {
      dispatchSearch({ type: SearchActionType.LIST_SEARCH_SET, payload: list });
    }
  }, [stateSearch.search, list]);

  return { stateSearch, dispatchSearch };
}
