import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage-angular";

@Injectable({
   providedIn: "root",
})
export class StorageService {
   private _storage: Storage | null = null;
   private storageSub = new BehaviorSubject<boolean>(false);

   constructor(private storage: Storage) {
      this.init();
   }

   async init() {
      // If using, define drivers here: await this.storage.defineDriver(/*...*/);
      const storage = await this.storage.create();
      this._storage = storage;
   }

   watchStorage(): BehaviorSubject<boolean> {
      return this.storageSub;
   }

   // Create and expose methods that users of this service can
   // call, for example:
   public async set(key: string, value: any) {
      await this._storage?.set(key, value);
      this.storageSub.next(true);
   }

   public async get(key: string) {
      return await this._storage?.get(key);
   }

   // Remover un valor
   async remove(key: string) {
      await this.storage.remove(key);
      this.storageSub.next(true);
   }

   // Limpiar todo el almacenamiento
   async clear() {
      await this.storage.clear();
      this.storageSub.next(true);
   }

   async getAll() {
      const result: any[] = [];
      this.storage.forEach(async (value, key) => {
         result.push({ value, key });
      });

      return result;
   }
}
