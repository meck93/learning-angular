import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HeroService } from './service/hero.service';
import { Hero } from './shared/hero.model';
import { GetHeroes } from './store/heroes.actions';
import { HeroesState } from './store/heroes.reducer';

@Component({
  selector: 'nx-app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  subscription: Subscription = this.store.subscribe(
    (state) => (this.heroes = (state.heroes as any).heroes)
  );

  constructor(
    private heroService: HeroService,
    private readonly store: Store<HeroesState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetHeroes());
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe();

    // THIS IS AN UGLY HACK AND SHOULD BE REPLACED with an appropriate action that adds a hero (and then provides the updated state)
    this.store.dispatch(new GetHeroes());
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
