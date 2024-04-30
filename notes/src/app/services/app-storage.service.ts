import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, first, firstValueFrom } from 'rxjs';

/** Service for managing storage operations within the application.
    Another advantage of this service is to ensure that @ionic/storage is created only once - 
    achieved by registering this service as a singleton (providedIn: 'root').
 */
@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _ionicStorage!: Storage;

  // Subject to notify and get updates for the storage initialization.
  private initCompletedSubject$ = new BehaviorSubject<boolean>(false);

  // Get the ionic storage instance that are used to interact with the browser/mobile storage system.
  private async getIonicStorage(): Promise<Storage> {
    // Proceed once the initialization is completed.
    await firstValueFrom(this.initCompletedSubject$.pipe(first(v => v)))
    return this._ionicStorage;
  }

  constructor(ionicStorage: Storage) 
  {
    // Initialize the Ionic storage, store the instance, and then send an initialization update.
    ionicStorage.create().then(ionicStorageInstance => {
      this._ionicStorage = ionicStorageInstance;
      this.initCompletedSubject$.next(true);
    })
  }

  public async set(key: string, value: any) {
    (await this.getIonicStorage()).set(key, value);
  }

  public async get(key: string) {
    return (await this.getIonicStorage()).get(key);
  }
}
