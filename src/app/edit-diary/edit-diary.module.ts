import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDiaryPageRoutingModule } from './edit-diary-routing.module';

import { EditDiaryPage } from './edit-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditDiaryPageRoutingModule
  ],
  declarations: [EditDiaryPage]
})
export class EditDiaryPageModule {}
