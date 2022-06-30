import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieGame } from 'src/app/models/movie';
import { MovieService } from 'src/app/@core/services/movie.service';

@Component({
  selector: 'tnv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  constructor(private movieService: MovieService) { }
  
  movies = this.movieService.movies;

  ngOnInit(): void {
    for(let index = 0; index < 10; index++){
      this.movieService.getRandomMovie(index);
    }
  }
}
