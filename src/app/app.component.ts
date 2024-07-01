import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { TokenService } from './services/auth/token.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    //{ title: 'Productos (inactivo)', url: '/producto-list', icon: 'albums' },
    { title: 'Preventas', url: '/preventa-form', icon: 'checkmark-done' },
    //{ title: 'Preventas List', url: '/preventa-list', icon: 'checkmark-done' },
    //{ title: 'Ventas (inactivo)', url: '/preventa-form-2', icon: 'checkmark-done' },
    //{ title: 'Compras (inactivo)', url: '/preventa-form-3', icon: 'checkmark-done' },
    //{ title: 'Clientes (inactivo)', url: '/preventa-form-4', icon: 'checkmark-done' },
    //{ title: 'Proveedores (inactivo)', url: '/preventa-form-5', icon: 'checkmark-done' },
    //{ title: 'Mi cuenta (inactivo)', url: '/preventa-form-6', icon: 'person' },

    /*{ title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },*/
  ];
  public labels = [];
  constructor(
    private storage: Storage,
    private storageService: StorageService,
    private tokenService:TokenService,
    private router: Router,
    private menu: MenuController
  ) {}
  
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async closeSession() {
    await this.storageService.get("usuario");   
    await this.storageService.remove("usuario");
    //await this.storageService.clear();

    this.tokenService.removeToken();    

    await this.menu.close();
    this.router.navigate(['/login']);
  }

}
