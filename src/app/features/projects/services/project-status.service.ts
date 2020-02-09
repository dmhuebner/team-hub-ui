import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
    projectsMonitorOnSubject = new BehaviorSubject(false);
    projectsMonitorOn$ = this.projectsMonitorOnSubject.asObservable();

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
        this.stopProjectsMonitor$ = this.stopProjectsMonitorSubject.asObservable().pipe(
            shareReplay(1)
        );

        this.projectsMonitorCountdown$ = projectsMonitorCountdown$.pipe(
            tap(monitorCount => {
                if (monitorCount === null) {
                    this.projectsMonitorOnSubject.next(false);
                } else {
                    this.projectsMonitorOnSubject.next(true);
                }
            }),
            shareReplay(1)
        );
    }

    startMonitoring(projects: Project[], intervalLength, loginForToken) {
        console.log('Monitoring projects - [see Debug logs for details]');
        this.projectsMonitorSocketSubject.next({projects, intervalLength, loginForToken});
    }

    stopMonitoring() {
        console.log('Stopped monitoring projects');
        this.stopProjectsMonitorSubject.next(true);
    }

    private openNotification(projectsStatus: ProjectsStatusOverview) {
        if (projectsStatus) {
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


}
