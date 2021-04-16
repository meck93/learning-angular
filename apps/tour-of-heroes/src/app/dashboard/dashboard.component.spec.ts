import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HEROES } from '../../../testing/mock-heroes';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../heroes/hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService: Partial<HeroService>;

  beforeEach(async () => {
    mockHeroService = { getHeroes: jest.fn(() => of(HEROES)) };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'heroes/:id', component: HeroDetailComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual(
      'Top Heroes'
    );
  });

  it('should display 4 links', async () => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  });
});
