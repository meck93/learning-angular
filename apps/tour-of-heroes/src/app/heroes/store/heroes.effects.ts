import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HeroService } from '../service/hero.service';
import { getHeroes, GetHeroesSuccess } from './heroes.actions';

@Injectable({
  providedIn: 'root',
})
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  getHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getHeroes),
      switchMap(() =>
        this.heroService.getHeroes().pipe(
          tap((heroes) => console.log('heroes:', heroes)),
          map((heroes) => new GetHeroesSuccess({ heroes })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
