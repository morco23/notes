import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../types/note-data';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent  implements OnInit {
  @Input()
  public note!: Note;
  
  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.note = { title: "", content: "" };
  }

  protected saveNote() {
    this.notesService.saveNote(this.note);
  }
}
