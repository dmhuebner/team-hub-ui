import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Socket = SocketIOClient.Socket;
import WebsocketMessages from '../interfaces/websocket-messages.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket; // socket that connects to team-hub-api socket server

  constructor() { }

  connect(): WebsocketMessages {
    this.socket = io(environment.websocket_url);

    const monitorObservable = new Observable(observer => {
      this.socket.on('msgToClient:monitor', data => {
        console.debug('Received message from team-hub-api server: msgToClient:monitor');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const monitorObserver = {
      next: (data: any) => {
        console.debug('msgToServer Sent: ', data);
        this.socket.emit('msgToServer:monitor', JSON.stringify(data));
      }
    };

    const stopMonitorObservable = new Observable(observer => {
      this.socket.on('msgToClient:stopMonitor', (data: string) => {
        console.debug('Received message from team-hub-api server: stopMonitor\n', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const stopMonitorObserver = {
      next: (data: boolean) => {
        console.debug('msgToServer:stopMonitor Sent: ', data);
        this.socket.emit('msgToServer:stopMonitor', JSON.stringify(data));
      }
    };

    const monitorCountdownObservable = new Observable(observer => {
      this.socket.on('msgToClient:monitorCountdown', (data: number) => {
        // console.debug('msgToClient:monitorCountdown\n', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const monitorCountdownObserver = {
      next: data => {}
    };

    return {
      projectsMonitorSubject: Subject.create(monitorObserver, monitorObservable),
      stopProjectsMonitorSubject: Subject.create(stopMonitorObserver, stopMonitorObservable),
      projectsMonitorCountdown$: Subject.create(monitorCountdownObserver, monitorCountdownObservable).asObservable(),
    };
  }
}
