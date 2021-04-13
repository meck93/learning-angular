import { Component } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from './shared/hero.model';

@Component({
  selector: 'nx-app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  selectedHero?: Hero;
  heroes: Hero[] = HEROES;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
