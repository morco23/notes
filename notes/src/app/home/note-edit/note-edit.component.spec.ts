import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteEditComponent } from './note-edit.component';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../types/note-data';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;
  const noteServiceMock: jasmine.SpyObj<NotesService> = jasmine.createSpyObj('NoteService', ['saveNote']);
  const NOTE_TITLE = "note_title";
  const NOTE_CONTENT = "note_content";

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteEditComponent ],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { 
          provide: NotesService,
          useValue: noteServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save note', (done: DoneFn) => {
    const noteToSave: Note = { title: NOTE_TITLE, content: NOTE_CONTENT };
    component.note = noteToSave;

    noteServiceMock.saveNote.and.callFake((note) => {
      expect(note).toBeTruthy();
      done();
      return Promise.resolve();
    })

    fixture.debugElement.query(By.css('ion-button')).nativeElement.click();
  });
});
