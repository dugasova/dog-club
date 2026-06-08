import { LIST_SEARCH, LIST_SEARCH_SET, SEARCH_SET } from './action';

export type NutriCard = {
  id: number;
  raiting: number; // Changed to be a required number
  price: number;
  code: string;
  desc: string;
  imsrcOfImg: string;
}

export type SearchState = {
  search: string;
  searchList: NutriCard[];
}

const initialState: SearchState = {
  search: ``,
  searchList: [] as NutriCard[],
}

const reducer = (state: SearchState = initialState, {type, payload}: {type: string, payload: any}) => {
  switch(type) {
    case SEARCH_SET:
      return {...state, search: payload}
    case LIST_SEARCH_SET:
      return{...state, searchList:payload as NutriCard[]}
    case LIST_SEARCH:
      return {
        ...state,
        searchList: ( payload.list as NutriCard[]).filter((item: NutriCard) =>
          item.desc.toLowerCase().includes(payload.value.toLowerCase())
        ),
      };
      default:
        return state
  }
}

export {reducer, initialState}