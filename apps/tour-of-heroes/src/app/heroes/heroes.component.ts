import { Component, OnInit } from '@angular/core';
import { Hero } from './shared/hero.model';

@Component({
  selector: 'nx-app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  hero: Hero = { id: 1, name: 'Windstorm' };

  constructor() {}

  ngOnInit(): void {}
}
