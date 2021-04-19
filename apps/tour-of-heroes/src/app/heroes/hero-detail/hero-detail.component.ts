import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../heroes/shared/hero.model';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'nx-app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.route.params.subscribe((params: Params) =>
      this.heroService
        .getHero(params['id'])
        .subscribe((hero) => (this.hero = hero))
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
