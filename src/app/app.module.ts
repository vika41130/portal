import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NotFoundComponent } from './shares/components/not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './shares/header/header.component';

@NgModule({
	declarations: [
		AppComponent,
  		NotFoundComponent,
    	HeaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
