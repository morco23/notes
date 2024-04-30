import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { AppStorageService } from './app-storage.service';

describe(AppStorageService.name, () => {
  let service: AppStorageService;
  let mockedIonicStorage: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    mockedIonicStorage = jasmine.createSpyObj('TestStorage', ['create', 'get', 'set']);
    TestBed.configureTestingModule({
      providers : [
        {
           provide: Storage,
           useValue: mockedIonicStorage
        }
    ]});

    mockedIonicStorage.create.and.resolveTo(mockedIonicStorage);
    service = TestBed.inject(AppStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get values', async () => {
    let keySet: string = "";
    let valueSet: string = "";
    let keyGet: string = "";
    let valueGet: string = "";

    const expectedKey = "TEST_KEY";
    const expectedValue = "TEST_VALUE";

    mockedIonicStorage.set.and.callFake(async (key, value) => {
      keySet = key;
      valueSet = value;
    });

    mockedIonicStorage.get.and.callFake(async (key) => {
      keyGet = key;
      return valueSet;
    });

    service.set(expectedKey, expectedValue);
    valueGet = await service.get(expectedKey);

    expect(keySet).toBe(expectedKey);
    expect(keyGet).toBe(expectedKey);
    expect(valueSet).toBe(expectedValue);
    expect(valueGet).toBe(expectedValue);
  })
});
