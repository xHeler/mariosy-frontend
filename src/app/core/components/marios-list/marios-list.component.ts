import { Component, Input } from '@angular/core';
import { Marios } from './../../models/marios.model';
import { Employee } from './../../models/employee.model';
import { MariosReaction } from '../../enums/marios-reaction.enum';

@Component({
  selector: 'app-marios-list',
  templateUrl: './marios-list.component.html',
  styleUrls: ['./marios-list.component.scss'],
})
export class MariosListComponent {
  @Input() public label = '';

  mariosList: Marios[] = [];

  constructor() {
    this.generateMariosList();
  }

  exampleMarios: Marios = {
    senderId: 'sender123',
    receiversId: ['receiver456', 'receiver789'],
    title: 'Greetings',
    message: 'Hello team, I wanted to express my gratitude for your hard work!',
    reaction: MariosReaction.GOOD_JOB,
  };

  exampleEmployee: Employee = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  generateMariosList() {
    for (let i = 0; i < 20; i++) {
      const newMario: Marios = { ...this.exampleMarios };

      this.mariosList.push(newMario);
    }
  }
}
