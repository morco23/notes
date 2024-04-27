import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteComponent } from './note.component';
import { By } from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the note title and content', () => {
    const NOTE_TITLE = "Title placeholder";
    const NOTE_CONTENT = "Content placeholder blalala"
    component.note = {
      title: NOTE_TITLE,
      content: NOTE_CONTENT
    };

    fixture.detectChanges();
    const titleNativeElement: HTMLElement = fixture.debugElement.query(By.css('ion-card-title')).nativeElement;
    expect(titleNativeElement.textContent?.trim()).toBe(NOTE_TITLE);

    const contentNativeElement: HTMLElement = fixture.debugElement.query(By.css('ion-card-content')).nativeElement;
    expect(contentNativeElement.textContent?.trim()).toBe(NOTE_CONTENT);
  });
});
