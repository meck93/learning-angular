import { Action, createAction, props } from '@ngrx/store';
import { Hero } from '../shared/hero.model';

enum ActionsEnum {
  ADD_HERO = 'ADD_HERO',
  GET_HEROES = 'GET_HEROES',
  GET_HEROES_SUCCESS = 'GET_HEROES_SUCCESS',
}

export class AddHero implements Action {
  type = ActionsEnum.ADD_HERO;
}

export class GetHeroes implements Action {
  type = ActionsEnum.GET_HEROES;
}

export class GetHeroesSuccess implements Action {
  type = ActionsEnum.GET_HEROES_SUCCESS;

  constructor(public payload: { heroes: Hero[] }) {}
}

export const addHero = createAction(ActionsEnum.ADD_HERO, props<Hero>());
export const getHeroes = createAction(ActionsEnum.GET_HEROES);
export const getHeroesSuccess = createAction(
  ActionsEnum.GET_HEROES_SUCCESS,
  props<{ payload: { heroes: Hero[] } }>()
);
