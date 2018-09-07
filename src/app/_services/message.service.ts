import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message, AlertType } from '../_models/message';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class MessageService {
  private subject = new Subject<Message>();
  private keepAfterRouteChange = false;

  constructor(private router: Router){
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getMessage(alertId?: string): Observable<any> {
    return this.subject.asObservable().filter((x: Message) => x.alertId === alertId);
  }

  success(message: string, keepAfterRouteChange: boolean = true) {
    this.message(new Message({message, type: AlertType.Success, keepAfterRouteChange}));
  }

  error(message: string, keepAfterRouteChange: boolean = true) {
    this.message(new Message({message, type: AlertType.Error, keepAfterRouteChange}));
  }

  info(message: string, keepAfterRouteChange: boolean = true) {
    this.message(new Message({message, type: AlertType.Info, keepAfterRouteChange}));
  }

  warn(message: string, keepAfterRouteChange: boolean = true) {
    this.message(new Message({message, type: AlertType.Warning, keepAfterRouteChange}));
  }
  
  message(message: Message) {
    this.keepAfterRouteChange = message.keepAfterRouteChange;
    this.subject.next(message);
  }

  
  clear(alertId?: string) {
    this.subject.next(new Message({ alertId }));

  }

}
