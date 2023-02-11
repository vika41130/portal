import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterPageComponent } from './pages/user.register/user.register.page.component';
import { DetailPageComponent } from './pages/user.detail/user.detail.page.component';
import { UserDetailComponent } from './components/user.detail/user.detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RegisterPageComponent,
    DetailPageComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class UserModule { }
