import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HeroService } from '../heroes/service/hero.service';
import { Hero } from '../heroes/shared/hero.model';

@Component({
  selector: 'nx-app-dashboard',
  template: `
    <h2>Top Heroes</h2>
    <div class="heroes-menu">
      <a *ngFor="let hero of heroes" routerLink="/heroes/{{ hero.id }}">
        {{ hero.name }}
      </a>
    </div>

    <nx-app-hero-search></nx-app-hero-search>
  `,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];

  private subscription!: Subscription;

  constructor(private heroService: HeroService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    const customObservable: Observable<number> = new Observable(
      (subscriber) => {
        let count = -2;
        setInterval(() => {
          subscriber.next(count);
          if (count === 3) {
            subscriber.complete();
          }
          if (count > 3) {
            subscriber.error(new Error('Count is greater than 3!'));
          }
          count++;
        }, 1000);
      }
    );

    this.subscription = customObservable
      .pipe(
        tap((data: number) => console.log('data = ', data)),
        filter((data: number) => data >= 0),
        map((data: number) => `We're currently in Round ${data + 1}!`)
      )
      .subscribe(
        (data) => {
          console.log('dashboard.component.ts 40 data:', data);
        },
        (error) => {
          console.error('dashboard.component.ts 45 error:', error);
        },
        () => {
          console.log('dashboard.component.ts 52 completed!');
        }
      );

    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
