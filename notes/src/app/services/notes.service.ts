import { Injectable } from '@angular/core';
import { Note } from '../home/types/note-data';
import { AppStorageService } from './app-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

/** Represents service that holds state of displayed notes with options to add, edit, and remove notes. */
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  public static STORAGE_KEY = "notes";

  constructor(private appStorage: AppStorageService) 
  {
    // Retrieve the saved notes from the application storage.
    this.appStorage.get(NotesService.STORAGE_KEY).then(notes => this.notesSubject.next(notes ?? []));
  }

  /** Save note - can be a new note or editing an existing one. */
  public async saveNote(note: Note) {
    const notes = this.notesSubject.value;

    const newNote = !note.noteId;
    if (newNote) {
      note.noteId = crypto.randomUUID();
      notes.push(note);
    } else {
      const existNote = notes.find(n => n.noteId == note.noteId);
      if (existNote) {
        existNote.content = note.content;
        existNote.title = note.title;
      }
    }

    this.appStorage.set(NotesService.STORAGE_KEY, notes);
    this.notesSubject.next(notes);
  }

  /** Remove note by its id. */
  public async removeNote(noteId: string) {
    const notes = this.notesSubject.value;
    notes.splice(notes.findIndex(n => n.noteId == noteId));
    this.notesSubject.next(notes);
  }

  /** Note observable to get updates when notes list are updated. */
  public getNotesObservable() {
    return this.notesSubject.asObservable();
  }
}
