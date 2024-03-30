import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera-response';
import { PosterPipe } from '../../pipes/poster.pipe';
import { CommonModule } from '@angular/common';
import { StarRating, StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  standalone: true,
  imports: [ PosterPipe, CommonModule, StarRatingModule],
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies!: Movie[];

  constructor( private router: Router ) { }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/pelicula', movie.id ]);
  }

}
