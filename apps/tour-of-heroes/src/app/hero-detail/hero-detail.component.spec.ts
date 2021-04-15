import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: Partial<HeroService>;

  beforeEach(async () => {
    mockHeroService = { getHero: jest.fn(() => of(HEROES[0])) };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '11' }) } },
        },
        { provide: HeroService, useValue: mockHeroService },
      ],
      imports: [HttpClientTestingModule],
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.hero).toBeDefined();
    expect(component.hero?.id).toBe(11);
    expect(component.hero?.name).toBe('Dr Nice');
  });
});
