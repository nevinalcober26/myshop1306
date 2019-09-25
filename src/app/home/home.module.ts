import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Component
import { Home1Component } from './home1/home1.component';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
} from '@angular/material';
import 'hammerjs';

// Anguushop Lib
import { libModule } from '../lib/lib.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    libModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    Home1Component,
  ],
  exports: [Home1Component]
})
export class HomeModule { }
