import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HEROES } from '../../../../testing/mock-heroes';
import { HeroService } from '../service/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: Partial<HeroService>;
  let spy: jest.SpyInstance;

  beforeEach(async () => {
    mockHeroService = { getHero: jest.fn(() => of(HEROES[0])) };
    spy = jest.spyOn(mockHeroService, 'getHero');

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '11' }),
            queryParams: of({ name: 'Dr Nice' }),
            fragment: of('mock-fragment'),
          },
        },
        { provide: HeroService, useValue: mockHeroService },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // check mocked service call
    expect(spy).toHaveBeenCalledTimes(1);

    // check that the hero is the expected one
    expect(component.hero).toBeDefined();
    expect(component.hero?.id).toBe(11);
    expect(component.hero?.name).toBe('Dr Nice');
  });
});
