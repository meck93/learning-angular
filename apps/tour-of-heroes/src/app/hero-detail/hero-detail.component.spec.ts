import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/shared/hero.model';
import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from './hero-detail.component';

@Component({ template: '<router-outlet></router-outlet>' })
class TestRootComponent {}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let router: Router;
  let rootFixture: ComponentFixture<TestRootComponent>;
  const fakeHeroes: ReadonlyArray<Hero> = [...HEROES];

  beforeEach(async () => {
    const fakeHeroService = {
      getHero(id: number) {
        const hero = [...fakeHeroes].find((h) => h.id === id);
        return of(hero);
      },
    } as Partial<HeroService>;

    TestBed.configureTestingModule({
      declarations: [TestRootComponent, HeroDetailComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'heroes/:id',
            component: HeroDetailComponent,
          },
        ]),
        FormsModule,
      ],
      providers: [
        {
          provide: HeroService,
          useValue: fakeHeroService,
        },
      ],
    });
    await TestBed.compileComponents();

    rootFixture = TestBed.createComponent(TestRootComponent);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // TODO: figure out how to check if the detail component is displayed correctly
    rootFixture.ngZone?.run(() => router.navigate(['detail', 11]));
  });
});
