import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDiaryPageRoutingModule } from './create-diary-routing.module';

import { CreateDiaryPage } from './create-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateDiaryPageRoutingModule
  ],
  declarations: [CreateDiaryPage]
})
export class CreateDiaryPageModule {}
