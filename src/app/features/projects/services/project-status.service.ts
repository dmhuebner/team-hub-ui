import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import HealthCheck from '../../../shared/interfaces/health-check.interface';
import { catchError, combineAll, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import ProjectStatus from '../../../shared/interfaces/project-status.interface';
import StatusOverview from '../../../shared/interfaces/status-overview.interface';
import { ConfigService } from '../../../shared/services/config.service';
import Project from '../../../shared/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {

    private statusOverviewSubject: BehaviorSubject<StatusOverview> = new BehaviorSubject<StatusOverview>(this.initStatusOverview());
    statusOverview$: Observable<StatusOverview> = this.statusOverviewSubject.asObservable();

    private statusMonitorOnSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    statusMonitorOn$: Observable<boolean> = this.statusMonitorOnSubject.asObservable();

    constructor(private http: HttpClient,
                private configService: ConfigService) { }

    initHealthCheckLoop(projectName, healthCheck: HealthCheck): Observable<any> {
        this.statusMonitorOnSubject.next(true);
        return this.configService.currentConfig$.pipe(
            map(config => config.team.checkProjectsEvery),
            switchMap((intervalLength) => {
                return interval(intervalLength).pipe(
                    startWith(this.getHealthCheckStatus(projectName, healthCheck)),
                    switchMap(() => this.getHealthCheckStatus(projectName, healthCheck))
                );
            }),
            shareReplay(1)
        );
    }

    getHealthCheckStatus(projectName, healthCheck: HealthCheck): Observable<any> {
        return this.http.get(healthCheck.path, {observe: 'response'}).pipe(
            tap(healthCheckResp => {
                this.setProjectStatus(projectName, healthCheck, healthCheckResp);
            }),
            catchError(errResp => {
                this.setProjectStatus(projectName, healthCheck, errResp);
                return of(errResp);
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

    getAllHealthChecks(projectsConfig: Project[], healthCheckCalls = []) {
        projectsConfig.forEach(projConfig => {
            healthCheckCalls.push(this.initHealthCheckLoop(projConfig.name, projConfig.healthCheck));
            if (projConfig.dependencies && projConfig.dependencies.length) {
                this.getAllHealthChecks(projConfig.dependencies, healthCheckCalls);
            }
        });
        return healthCheckCalls;
    }

    // TODO combine all into one?
    allHealthChecks$(projectsConfig: Project[]) {
        const healthCheckList = this.getAllHealthChecks(projectsConfig);
        return combineAll();
    }


}
