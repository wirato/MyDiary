import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryListPageRoutingModule } from './diary-list-routing.module';

import { DiaryListPage } from './diary-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiaryListPageRoutingModule
  ],
  declarations: [DiaryListPage]
})
export class DiaryListPageModule {}
