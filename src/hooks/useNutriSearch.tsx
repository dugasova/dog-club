import { useReducer, useEffect } from 'react';
import { initialState, reducer, type NutriCard } from '../store/search/reducer';
import { actionCreator } from '../store/store';
import { LIST_SEARCH, LIST_SEARCH_SET } from '../store/search/action';

export default function useNutriSearch(list: NutriCard[]) {
  const [stateSearch, dispatchSearch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (stateSearch.search.length >= 3) {
      dispatchSearch(actionCreator(LIST_SEARCH, { list, value: stateSearch.search }))
    } else {

      dispatchSearch(actionCreator(LIST_SEARCH_SET, list))
    }
  }, [stateSearch.search, list])


  return { stateSearch, dispatchSearch }
}