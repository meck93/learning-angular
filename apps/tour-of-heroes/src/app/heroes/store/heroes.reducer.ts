import { Action, createReducer, on } from '@ngrx/store';
import { Hero } from '../shared/hero.model';
import * as HeroesActions from './heroes.actions';

export interface HeroesState {
  heroes: Hero[];
  test: boolean;
}

export const initialState: HeroesState = {
  heroes: [],
  test: false,
};

const heroesReducer = createReducer(
  initialState,
  on(HeroesActions.addHero, (state: HeroesState, hero: Hero) => ({
    ...state,
    heroes: [...state.heroes, hero],
  })),
  on(HeroesActions.getHeroesSuccess, (state: HeroesState, { payload }) => ({
    ...state,
    heroes: [...payload.heroes],
  }))
);

export function reducer(state: HeroesState | undefined, action: Action) {
  return heroesReducer(state, action);
}
