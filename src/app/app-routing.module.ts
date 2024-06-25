import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'preventa-form',
    pathMatch: 'full'
  },
  /*{
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },*/
  {
    path: 'producto-list',
    loadChildren: () => import('./pages/producto/producto-list/producto-list.module').then( m => m.ProductoListPageModule)
  },
  {
    path: 'preventa-form',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/preventa/preventa-form/preventa-form.module').then( m => m.PreventaFormPageModule)
  },
  {
    path: 'preventa-list',
    loadChildren: () => import('./pages/preventa/preventa-list/preventa-list.module').then( m => m.PreventaListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login-form/login-form.module').then( m => m.LoginFormPageModule)
  },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
