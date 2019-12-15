import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ConfigService } from '../../../shared/services/config.service';
import Project from '../interfaces/project.interface';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {

    private projectsMonitorSocketSubject: Subject<any>;
    projectsStatusMonitor$: Observable<any>;
    projectsMonitorOn = false;

    constructor(private http: HttpClient,
                private configService: ConfigService,
                private wsService: WebsocketService) {
        this.projectsMonitorSocketSubject = wsService.connect();
        this.projectsStatusMonitor$ = this.projectsMonitorSocketSubject.asObservable().pipe(shareReplay(1));
    }

    startMonitoring(projects: Project[], intervalLength) {
        console.log('Start monitoring:\n', projects, intervalLength);
        this.projectsMonitorOn = true;
        this.projectsMonitorSocketSubject.next({projects, intervalLength});
    }


}
