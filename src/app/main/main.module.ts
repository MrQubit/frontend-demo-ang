import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../api.service';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFormComponent } from './movie-form/movie-form.component';


const router: Routes = [
  {path: 'movies', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
  providers: [
   ApiService
  ]
})
export class MainModule { }
