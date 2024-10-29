import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
   {
      path: "",
      redirectTo: "dashboard/dashboard-vendedor",
      pathMatch: "full",
   },
   /*{
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },*/
   {
      path: "producto-list",
      canActivate: [authGuard],
      loadChildren: () =>
         import("./pages/producto/producto-list/producto-list.module").then(
            (m) => m.ProductoListPageModule,
         ),
   },
   {
      path: "preventa-form",
      canActivate: [authGuard],
      loadChildren: () =>
         import("./pages/preventa/preventa-form/preventa-form.module").then(
            (m) => m.PreventaFormPageModule,
         ),
   },
   {
      path: "preventa-list",
      canActivate: [authGuard],
      loadChildren: () =>
         import("./pages/preventa/preventa-list/preventa-list.module").then(
            (m) => m.PreventaListPageModule,
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
      path: "dashboard/dashboard-vendedor",
      canActivate: [authGuard],
      loadChildren: () =>
         import(
            "./pages/dashboard/dashboard-vendedor/dashboard-vendedor.module"
         ).then((m) => m.DashboardVendedorPageModule),
   },
   {
      path: "preventa-detail",
      loadChildren: () =>
         import("./pages/preventa/preventa-detail/preventa-detail.module").then(
            (m) => m.PreventaDetailPageModule,
         ),
   },
   {
      path: "preventa-detail/:id",
      loadChildren: () =>
         import("./pages/preventa/preventa-detail/preventa-detail.module").then(
            (m) => m.PreventaDetailPageModule,
         ),
   },
   {
      path: "proveedor-detail",
      loadChildren: () =>
         import(
            "./pages/producto/proveedor-detail/proveedor-detail.module"
         ).then((m) => m.ProveedorDetailPageModule),
   },
   {
      path: "cliente-list",
      loadChildren: () =>
         import("./pages/cliente/cliente-list/cliente-list.module").then(
            (m) => m.ClienteListPageModule,
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
      path: "producto-list-card",
      loadChildren: () =>
         import(
            "./pages/producto/producto-list-card/producto-list-card.module"
         ).then((m) => m.ProductoListCardPageModule),
   },
   {
      path: "compra-form",
      loadChildren: () =>
         import("./pages/compra/compra-form/compra-form.module").then(
            (m) => m.CompraFormPageModule,
         ),
   },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   ],
   exports: [RouterModule],
})
export class AppRoutingModule {}
