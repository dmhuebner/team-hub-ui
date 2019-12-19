import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { ConfigService } from '../../../shared/services/config.service';
import Project from '../interfaces/project.interface';
import { WebsocketService } from './websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import ProjectsStatusOverview from '../interfaces/projects-status-overview.interface';

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
    userTurnedOffProjectMonitor = false;

    constructor(private http: HttpClient,
                private configService: ConfigService,
                private wsService: WebsocketService,
                private snackBar: MatSnackBar) {
        const {projectsMonitorSubject, stopProjectsMonitorSubject, projectsMonitorCountdown$} = wsService.connect();

        this.projectsMonitorSocketSubject = projectsMonitorSubject;
        this.projectsStatusMonitor$ = this.projectsMonitorSocketSubject.asObservable().pipe(
            tap(projectsStatus => this.openNotification(projectsStatus)),
            shareReplay(1)
        );

        this.stopProjectsMonitorSubject = stopProjectsMonitorSubject;
        this.stopProjectsMonitor$ = this.stopProjectsMonitorSubject.asObservable().pipe(shareReplay(1));

        this.projectsMonitorCountdown$ = projectsMonitorCountdown$.pipe(shareReplay(1));
    }

    startMonitoring(projects: Project[], intervalLength) {
        console.log('Started monitoring projects - [see Debug logs for details]');
        this.projectsMonitorOn = true;
        this.projectsMonitorSocketSubject.next({projects, intervalLength});
        this.userTurnedOffProjectMonitor = false;
    }

    stopMonitoring() {
        console.log('Stopped monitoring projects');
        this.projectsMonitorOn = false;
        this.stopProjectsMonitorSubject.next(true);
        this.userTurnedOffProjectMonitor = true;
    }

    private openNotification(projectsStatus: ProjectsStatusOverview) {
        let msg = 'STATUS UPDATE';
        const warning = Object.values(projectsStatus).some(status => status.warning);
        const down = Object.values(projectsStatus).every(status => !status.up);
        let statusClass = 'snackbar-status-update-up';
        if (warning && !down) {
            statusClass = 'snackbar-status-update-warning';
            msg += ' - Something is down 😯';
        } else if (down) {
            statusClass = 'snackbar-status-update-down';
            msg += ' - All projects are down!! 😭';
        } else {
            msg += ' - Projects are Up 👍';
        }
        this.snackBar.open(msg, null, {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['snackbar-status-update', statusClass]
        });
    }


}
