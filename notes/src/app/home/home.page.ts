import { Component } from '@angular/core';
import { Note } from './types/note-data';
import { ModalController } from '@ionic/angular';
import { NoteEditComponent } from './note-edit/note-edit.component';

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
  
  constructor(private modalCtrl: ModalController) {
  }

  protected async addNewNote() {
    const modal = await this.modalCtrl.create({
      component: NoteEditComponent,
    });
    modal.present();
  }
}
