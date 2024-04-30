import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { NotesService } from '../services/notes.service';
import { BehaviorSubject } from 'rxjs';
import { Note } from './types/note-data';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoteComponent } from './note/note.component';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const noteServiceMock: jasmine.SpyObj<NotesService> = jasmine.createSpyObj('NotesService', ['getNotesObservable']);
  const notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject([] as Note[]);
  const NOTE1_TITLE = "note1_title";
  const NOTE1_CONTENT = "note1_content";
  const NOTE2_TITLE = "note2_title";
  const NOTE2_CONTENT = "note2_content";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePage,
        NoteComponent
      ],
      imports: [IonicModule.forRoot()],
      providers: [
        { 
          provide: NotesService,
          useValue: noteServiceMock
        }
      ]
    }).compileComponents();

    noteServiceMock.getNotesObservable.and.returnValue(notesSubject.asObservable());
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notes', async () => {
    notesSubject.next([
      { title: NOTE1_TITLE, content: NOTE1_CONTENT },
      { title: NOTE2_TITLE, content: NOTE2_CONTENT },
    ]);

    fixture.detectChanges();
    const notesElement: DebugElement[] = fixture.debugElement.queryAll(By.css('note'));
    expect(notesElement).toHaveSize(2);
  });
});
