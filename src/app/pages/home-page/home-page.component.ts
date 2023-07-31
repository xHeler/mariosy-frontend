import { Component } from '@angular/core';
import { Marios } from '../../core/models/marios.model';
import { Employee } from '../../core/models/employee.model';
import { MariosReaction } from '../../core/enums/marios-reaction.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
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
}
