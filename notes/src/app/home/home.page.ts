import { Component, OnInit } from '@angular/core';
import { Note } from './types/note-data';
import { ModalController } from '@ionic/angular';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public notes: Note[] = [];
  
  constructor(private modalCtrl: ModalController,
              private notesService: NotesService
  ) {
  }

  ngOnInit(): void {
    this.notesService.getNotesObservable().subscribe(notes => this.notes = notes);
  }
  
  protected addNewNote() {
    return this.openEditNoteModal();
  }

  protected editNote(note: Note) {
    return this.openEditNoteModal(note);
  }

  protected async openEditNoteModal(note: Note | null = null) {
    const modal = await this.modalCtrl.create({
      component: NoteEditComponent,
      componentProps: { note: note }
    });
    modal.present();
  }
}
