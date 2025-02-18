import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { CommonModule } from '@angular/common';
import { PeliculasPosterGridComponent } from '../../components/peliculas-poster-grid/peliculas-poster-grid.component';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [SlideshowComponent, CommonModule, PeliculasPosterGridComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = []
  public moviesSlideshow: Movie[] = []

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      // TODO: llamar el servicio
      if (this.peliculasService.cargando) { return; }

      this.peliculasService.getCartelera().subscribe(movies => {
        this.movies.push(...movies);
      });
    }


  }


  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.peliculasService.getCartelera()
      .subscribe(movies => {
        // console.log(resp.results);
        this.movies = movies;
        this.moviesSlideshow = movies;
      })

  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }

}
