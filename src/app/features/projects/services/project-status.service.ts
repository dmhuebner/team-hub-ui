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

    projectsMonitorCountdown$: Observable<any>;

    private stopProjectsMonitorSubject: Subject<any>;
    stopProjectsMonitor$: Observable<any>;
    projectsMonitorOn = false;

    constructor(private http: HttpClient,
                private configService: ConfigService,
                private wsService: WebsocketService) {
        const {projectsMonitorSubject, stopProjectsMonitorSubject, projectsMonitorCountdown$} = wsService.connect();

        this.projectsMonitorSocketSubject = projectsMonitorSubject;
        this.projectsStatusMonitor$ = this.projectsMonitorSocketSubject.asObservable().pipe(shareReplay(1));

        this.stopProjectsMonitorSubject = stopProjectsMonitorSubject;
        this.stopProjectsMonitor$ = this.stopProjectsMonitorSubject.asObservable().pipe(shareReplay(1));

        this.projectsMonitorCountdown$ = projectsMonitorCountdown$.pipe(shareReplay(1));
    }

    startMonitoring(projects: Project[], intervalLength) {
        console.log('Start monitoring:\n', projects, intervalLength);
        this.projectsMonitorOn = true;
        this.projectsMonitorSocketSubject.next({projects, intervalLength});
    }

    stopMonitoring() {
        console.log('Stop monitoring projects');
        this.projectsMonitorOn = false;
        this.stopProjectsMonitorSubject.next(true);
    }


}
