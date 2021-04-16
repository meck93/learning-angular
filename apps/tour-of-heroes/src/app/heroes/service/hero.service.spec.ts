import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MessageService } from '../../messages/service/message.service';
import { Hero } from '../shared/hero.model';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  const mockHeroes: Hero[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
  ];
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes (with Spy)', (done) => {
    const mockHttpClient = { get: jest.fn(() => of(mockHeroes)) };
    service = new HeroService(mockHttpClient as any, new MessageService());

    service.getHeroes().subscribe(
      (heroes) => {
        // TODO: ask @fueg why this test passes even though it clearly receives wrong data
        expect(heroes.length).toBe(2);
        done(); // this is important -> otherwise the test is useless
      },
      (error) => fail(error)
    );
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  describe('getHeroes (with Mock)', () => {
    it('should return heroes', (done) => {
      // ensure 2 heroes are fetched
      service.getHeroes().subscribe(
        (heroes) => {
          // TODO: ask @fueg why this test passes even though it clearly receives wrong data
          expect(heroes.length).toBe(2);
          done(); // this is important -> otherwise the test is useless
        },
        (error) => fail(error)
      );

      // check that a GET request was performed
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      req.flush(mockHeroes);
    });

    it('should turn 404 into a user-friendly error', (done) => {
      const msg = 'Deliberate 404';
      service.getHeroes().subscribe(
        (heroes) => {
          expect(heroes).toEqual([]);
          done();
        },
        () => fail("shouldn't error")
      );

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      // Respond with 404 error
      req.flush(msg, {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });

  describe('getHero by ID', () => {
    it('should return hero', (done) => {
      const id = 11;
      // ensure first hero is fetched
      service.getHero(id).subscribe((hero) => {
        expect(hero.id).toEqual(id);
        expect(hero.name).toEqual('Dr Nice');
        done();
      });

      // check that a GET request was performed
      const req = httpTestingController.expectOne(`api/heroes/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush({ id: 11, name: 'Dr Nice' });
    });

    it('should turn 404 into a user-friendly error', (done) => {
      const id = 11;
      service.getHero(id).subscribe((response) => {
        expect(response).toBeUndefined();
        done();
      }, fail);

      const req = httpTestingController.expectOne(`api/heroes/${id}`);
      expect(req.request.method).toEqual('GET');

      // Respond with 404 error
      req.flush('Invalid request parameters', {
        status: 404,
        statusText: 'Bad Request',
      });
    });
  });

  describe('addHero', () => {
    it('should add a single Hero', (done) => {
      const mockHero = { name: 'Tester' } as Hero;

      service.addHero(mockHero).subscribe((createdHero) => {
        expect(createdHero).toBeDefined();
        expect(createdHero.name).toEqual(mockHero.name);
        done();
      }, fail);

      // Receive POST request
      const req = httpTestingController.expectOne(`api/heroes`);
      expect(req.request.method).toEqual('POST');

      // Respond with the created hero
      req.flush({ id: 21, name: 'Tester' });
    });

    it('should fail gracefully on error', (done) => {
      const mockHero = (null as unknown) as Hero;
      service.addHero(mockHero).subscribe((response) => {
        expect(response).toBeUndefined();
        done();
      }, fail);

      // Receive POST request
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('POST');

      // Respond with 404 error
      req.flush('Invalid request parameters', {
        status: 404,
        statusText: 'Bad Request',
      });
    });
  });
});
