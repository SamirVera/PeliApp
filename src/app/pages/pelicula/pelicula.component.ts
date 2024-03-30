import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';
import { PosterPipe } from '../../pipes/poster.pipe';
import { StarRatingModule } from 'angular-star-rating';
import { CastSlideshowComponent } from '../../components/cast-slideshow/cast-slideshow.component';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  standalone: true,
  imports: [PosterPipe, CommonModule, StarRatingModule, CastSlideshowComponent],
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula!: MovieResponse;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)

    ]).subscribe(([pelicula, cast]) => {

      if (!pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.pelicula = pelicula;
      this.cast = cast.filter(actor => actor.profile_path !== null);
    });



    // this.peliculasService.getPeliculaDetalle( id ).subscribe( movie => {
    // if ( !movie ) {
    //   this.router.navigateByUrl('/home');
    //   return;
    // }
    // this.pelicula = movie;
    // });

    // this.peliculasService.getCast( id ).subscribe( cast => {
    //   console.log(cast)
    //   this.cast = cast.filter( actor => actor.profile_path !== null );
    // });



  }

  onRegresar() {
    this.location.back();
  }

}
