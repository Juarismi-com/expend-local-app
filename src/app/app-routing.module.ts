import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
   {
      path: "producto-list",
      canActivate: [authGuard],
      loadChildren: () =>
         import("./pages/producto/producto-list/producto-list.module").then(
            (m) => m.ProductoListPageModule,
         ),
   },

   {
      path: "login",
      loadChildren: () =>
         import("./pages/auth/login-form/login-form.module").then(
            (m) => m.LoginFormPageModule,
         ),
   },
   {
      path: "geo-simple",
      loadChildren: () =>
         import("./pages/common/geo/geo-simple/geo-simple.module").then(
            (m) => m.GeoSimplePageModule,
         ),
   },

   {
      path: "about-us",
      loadChildren: () =>
         import("./pages/about-us/about-us.module").then(
            (m) => m.AboutUsPageModule,
         ),
   },
  {
    path: 'pago-list',
    loadChildren: () => import('./pages/pago/pago-list/pago-list.module').then( m => m.PagoListPageModule)
  },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   ],
   exports: [RouterModule],
})
export class AppRoutingModule {}
