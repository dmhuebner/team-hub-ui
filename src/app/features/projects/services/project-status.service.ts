import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import HealthCheck from '../../../shared/interfaces/health-check.interface';
import { catchError, take, takeLast, tap } from 'rxjs/operators';
import ProjectStatus from '../../../shared/interfaces/project-status.interface';
import StatusOverview from '../../../shared/interfaces/status-overview.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {

    private statusOverviewSubject: BehaviorSubject<StatusOverview> = new BehaviorSubject<StatusOverview>(this.initStatusOverview());
    statusOverview$: Observable<StatusOverview> = this.statusOverviewSubject.asObservable();

    constructor(private http: HttpClient) { }

    getHealthCheckStatus(projectName, healthCheck: HealthCheck): Observable<any> {
        return this.http.get(healthCheck.path, {observe: 'response'}).pipe(
            tap(healthCheckResp => {
                this.setProjectStatus(projectName, healthCheck, healthCheckResp);
            }),
            catchError(errResp => {
                this.setProjectStatus(projectName, healthCheck, errResp);
                throw errResp;
            })
        );
    }

    initStatusOverview(): StatusOverview {
        return {
            up: false,
            upPercent: 0,
            timeSinceLastDown: new Date(),
            projectStatuses: []
        };
    }

    updateProjectStatus(project: ProjectStatus) {
        this.statusOverview$.pipe(take(1)).subscribe(statusOverview => {
            const projectToUpdate = statusOverview.projectStatuses.find(proj => proj.name === project.name);
            if (projectToUpdate) {
                projectToUpdate.up = project.up;
                projectToUpdate.pathsChecked = project.pathsChecked;
            } else {
                statusOverview.projectStatuses.push(project);
            }
            this.statusOverviewSubject.next(statusOverview);
        });
    }

    setProjectStatus(projectName: string, healthCheck: HealthCheck, healthCheckResponse) {
        const projectStatus = {
            name: projectName,
            pathsChecked: [healthCheckResponse.url],
            up: healthCheck.successStatuses.includes(healthCheckResponse.status)
        };
        this.updateProjectStatus(projectStatus);
    }


}
