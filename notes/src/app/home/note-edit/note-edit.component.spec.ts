import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { NoteEditComponent } from './note-edit.component';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../types/note-data';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;
  const noteServiceMock: jasmine.SpyObj<NotesService> = jasmine.createSpyObj('NoteService', ['saveNote']);
  const modalControllerMock: jasmine.SpyObj<ModalController> = jasmine.createSpyObj('NoteService', ['dismiss']);

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
        },
        {
          provide: ModalController,
          useValue: modalControllerMock
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
      return Promise.resolve();
    })
    
    modalControllerMock.dismiss.and.callFake(() => {
      done();
      return Promise.resolve(true);
    })
    fixture.debugElement.query(By.css('.save_btn')).nativeElement.click();
  });

  it('should close when clicking on the cancel button', (done: DoneFn) => {
    modalControllerMock.dismiss.and.callFake(() => {
      done();
      return Promise.resolve(true);
    })

    const cancelBtn = fixture.debugElement.query(By.css('.cancel_btn'));
    expect(cancelBtn).toBeTruthy();

    cancelBtn.nativeElement.click();
  })
});
