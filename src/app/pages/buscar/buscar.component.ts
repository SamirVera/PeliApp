import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

import { Movie } from '../../interfaces/cartelera-response';
import { PeliculasPosterGridComponent } from '../../components/peliculas-poster-grid/peliculas-poster-grid.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  standalone: true,
  imports: [PeliculasPosterGridComponent],
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[] = [];

  constructor(  private activatedRoute: ActivatedRoute,
                private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      
      this.texto = params['texto'];

      this.peliculasService.buscarPeliculas( params['texto'] ).subscribe( movies => {
        this.movies = movies;
      })
    })

  }

}
