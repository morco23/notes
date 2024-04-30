import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { AppStorageService } from './app-storage.service';
import { first, firstValueFrom, skip, skipWhile } from 'rxjs';
import { Note } from '../home/types/note-data';

describe('NotesService', () => {
  let service: NotesService;
  let appStorageMock: jasmine.SpyObj<AppStorageService>;
  const NOTE_TITLE = "note_title";
  const NOTE_CONTENT = "note_content";

  beforeEach(() => {
    appStorageMock = jasmine.createSpyObj('AppStorageService', ['get', 'set']);
    appStorageMock.get.and.resolveTo([]);

    TestBed.configureTestingModule({
      providers : [
      {
         provide: AppStorageService,
         useValue: appStorageMock
      }
    ]});
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a note and get updated notes list', (done: DoneFn) => {
    service.getNotesObservable().pipe(first(v => v?.length == 1)).subscribe(notes => {
      expect(notes[0].title).toBe(NOTE_TITLE);
      expect(notes[0].content).toBe(NOTE_CONTENT);
      expect(notes[0].noteId?.length).toBeTruthy();
      done();
    })
    
    service.saveNote({title: NOTE_TITLE, content: NOTE_CONTENT});
  });

  it('should edit a note', (done: DoneFn) => {
    const note: Note = { title: NOTE_TITLE, content: NOTE_CONTENT };
    service.saveNote(note);
    const noteId = note.noteId;

    service.getNotesObservable().pipe(first(notes => !!notes && !!notes[0].noteId?.length)).subscribe(notes => {
      expect(notes[0].title).toBe(NOTE_TITLE);
      expect(notes[0].content).toBe(NOTE_CONTENT);

      // when editing a note the ID should be the same after saving the note.
      expect(notes[0].noteId).toBe(noteId);
      done();
    })
    
    service.saveNote(note);
  });

  it('should remove a note and get updated notes list', async () => {
    const noteToSave: Note = {title: NOTE_TITLE, content: NOTE_CONTENT};
    await service.saveNote(noteToSave);
    await service.removeNote(noteToSave.noteId as string);
    
    const notesAfterRemoving = await firstValueFrom(service.getNotesObservable());
    expect(notesAfterRemoving).toHaveSize(0);
  });
});
