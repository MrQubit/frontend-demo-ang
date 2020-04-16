import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

const router: Routes = [
  {path: 'auth', component: AuthComponent}
];


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
