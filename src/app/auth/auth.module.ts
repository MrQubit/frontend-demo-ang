import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


const router: Routes = [
  {path: 'auth', component: AuthComponent}
];


@NgModule({
  declarations: [AuthComponent],
  providers: [ CookieService ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
