import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../../messages/service/message.service';
import { Hero } from '../shared/hero.model';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, MessageService],
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

  describe('getHeroes', () => {
    it('should return heroes', () => {
      // ensure 10 heroes are fetched
      service.getHeroes().subscribe((heroes) => {
        // TODO: ask @fueg why this test passes even though it clearly receives wrong data
        expect(heroes.length).toBe(10);
      }, fail);

      // check that a GET request was performed
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });

    it('should turn 404 into a user-friendly error', () => {
      service
        .getHeroes()
        .subscribe((heroes) => expect(heroes).toEqual([]), fail);

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      // Respond with 404 error
      req.flush('Invalid request parameters', {
        status: 404,
        statusText: 'Bad Request',
      });
    });
  });

  describe('getHero by ID', () => {
    it('should return hero', () => {
      const id = 11;
      // ensure first hero is fetched
      service.getHero(id).subscribe((hero) => {
        // TODO: ask @fueg why this test passes even though it clearly receives wrong data
        expect(hero.id).toEqual(id);
        expect(hero.name).toEqual('Dr Nice');
      });

      // check that a GET request was performed
      const req = httpTestingController.expectOne(`api/heroes/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush({ id: 12, name: 'Dr Nice' });
    });

    it('should turn 404 into a user-friendly error', () => {
      const id = 11;
      service.getHero(id).subscribe((response) => {
        expect(response).toBeNull();
        expect(response).toBeUndefined();
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
    it('should add a single Hero', () => {
      const mockHero = { name: 'Tester' } as Hero;

      service.addHero(mockHero).subscribe((response) => {
        expect(response).toEqual(mockHero);
      }, fail);

      // Receive POST request
      const req = httpTestingController.expectOne(`api/heroes`);
      expect(req.request.method).toEqual('POST');

      // Respond with the created hero
      req.flush({ id: 21, name: 'Tester' });
    });

    it('should fail gracefully on error', () => {
      const mockHero = (null as unknown) as Hero;
      service.addHero(mockHero).subscribe((response) => {
        expect(response).toBeUndefined();
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
