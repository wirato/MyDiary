import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDiaryPage } from './create-diary.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDiaryPageRoutingModule {}
