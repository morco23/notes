import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../types/note-data';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {
  public note!: Note;

  constructor(private notesService: NotesService,
              private modalCtrl: ModalController
  ) { }
  
  ngOnInit(): void {
    if (this.note) {
      // A note object sent to this edit component popup is also displayed,
      // so we want to copy it to prevent any impact on the displayed instance,
      // which shares the same reference.
      this.note = structuredClone(this.note);
    } else {
      this.note = { title: "", content: "" };
    }
  }

  protected async saveNote() {
    await this.notesService.saveNote(this.note);
    await this.modalCtrl.dismiss();
  }

  protected async cancel() {
    await this.modalCtrl.dismiss();
  }

  protected async delete() {
    await this.notesService.deleteNote(this.note.noteId as string);
    await this.modalCtrl.dismiss();
  }
}
