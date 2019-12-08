import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Socket = SocketIOClient.Socket;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket; // socket that connects to team-hub-api socket server

  constructor() { }

  connect(): Subject<MessageEvent> {
    this.socket = io(environment.websocket_url);

    const msgToClientObservable = new Observable(observer => {
      this.socket.on('msgToClient', data => {
        console.log('Received message from team-hub-api server');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const msgToClientObserver = {
      next: (data: any) => {
        console.log('msgToServer Sent: ', data);
        this.socket.emit('msgToServer', JSON.stringify(data));
      }
    };

    return Subject.create(msgToClientObserver, msgToClientObservable);
  }
}
