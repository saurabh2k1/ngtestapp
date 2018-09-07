import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../_services';
import { Message, AlertType } from '../_models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() id: string;
  messages: Message[] = [];
  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessage(this.id).subscribe((message: Message) => {
      if (!message.message) {
        this.messages = [];
        return;
      }
      this.messages.push(message);
    });
  }

  removeMessage(message: Message){
    this.messages = this.messages.filter(x => x !== message);
  }

  cssClass(message: Message) {
    if(!message) {
      return;
    }

    switch (message.type) {
      case AlertType.Success: 
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }

}
