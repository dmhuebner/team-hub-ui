import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Socket = SocketIOClient.Socket;
import WebsocketMessages from '../interfaces/websocket-messages';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket; // socket that connects to team-hub-api socket server

  constructor() { }

  connect(): WebsocketMessages {
    this.socket = io(environment.websocket_url);

    const monitorObservable = new Observable(observer => {
      this.socket.on('msgToClient', data => {
        console.log('Received message from team-hub-api server');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const monitorObserver = {
      next: (data: any) => {
        console.log('msgToServer Sent: ', data);
        this.socket.emit('msgToServer', JSON.stringify(data));
      }
    };

    const stopMonitorObservable = new Observable(observer => {
      this.socket.on('msgToClient:stopMonitor', (data: string) => {
        console.log('Received message from team-hub-api server: stopMonitor\n', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const stopMonitorObserver = {
      next: (data: boolean) => {
        console.log('msgToServer:stopMonitor Sent: ', data);
        this.socket.emit('msgToServer:stopMonitor', JSON.stringify(data));
      }
    };

    return {
      projectsMonitorSubject: Subject.create(monitorObserver, monitorObservable),
      stopProjectsMonitorSubject: Subject.create(stopMonitorObserver, stopMonitorObservable),
    };
  }
}
