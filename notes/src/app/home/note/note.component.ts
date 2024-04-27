import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../types/note-data';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent  implements OnInit {
  @Input()
  public note!: Note;
  
  constructor() { }

  ngOnInit() {}
}
