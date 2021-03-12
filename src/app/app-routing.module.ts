import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'diary-list',
    pathMatch: 'full'
  },
  {
    path: 'diary/:senddetail',
    loadChildren: () => import('./diary/diary.module').then( m => m.DiaryPageModule)
  },
  {
    path: 'create-diary',
    loadChildren: () => import('./create-diary/create-diary.module').then( m => m.CreateDiaryPageModule)
  },
  {
    path: 'diary-list',
    loadChildren: () => import('./diary-list/diary-list.module').then( m => m.DiaryListPageModule)
  },
  {
    path: 'edit-diary/:sendEdit',
    loadChildren: () => import('./edit-diary/edit-diary.module').then( m => m.EditDiaryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
