import { Component } from '@angular/core';
import { Note } from './types/note-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public noteList: Note[] = [
    {
      title: "Title placeholder",
      content: "Content placeholder blalala"
    }
  ]
  
  constructor() {
  }
}
