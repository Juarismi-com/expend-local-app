import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
   {
      path: "producto-list",
      canActivate: [authGuard],
      loadChildren: () =>
         import(
            "./pages/maquina-expendedora/producto/producto-list/producto-list.module"
         ).then((m) => m.ProductoListPageModule),
   },

   {
      path: "login",
      loadChildren: () =>
         import("./pages/auth/login-form/login-form.module").then(
            (m) => m.LoginFormPageModule,
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
      path: "maquina-expendedora-list",
      loadChildren: () =>
         import(
            "./pages/maquina-expendedora/maquina-expendedora-list/maquina-expendedora-list.module"
         ).then((m) => m.MaquinaExpendedoraListPageModule),
   },
   {
      path: "maquina-expendedora-list/:uuid",
      loadChildren: () =>
         import(
            "./pages/maquina-expendedora/maquina-expendedora-detail/maquina-expendedora-detail.module"
         ).then((m) => m.MaquinaExpendedoraDetailPageModule),
   },
   {
      path: "venta-list",
      loadChildren: () =>
         import(
            "./pages/maquina-expendedora/venta-list/venta-list.module"
         ).then((m) => m.VentaListPageModule),
   },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   ],
   exports: [RouterModule],
})
export class AppRoutingModule {}
