import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/projects.interface';
import { ProjectStatusService } from '../../services/project-status.service';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss']
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {

  @Input() projectsConfig: Project[];

  statusOverview: StatusOverview;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private statusService: ProjectStatusService) { }

  ngOnInit() {
    this.getAllHealthChecks(this.projectsConfig).forEach(hc => {
      hc.pipe(takeUntil(this.unsubscribe$)).subscribe();
    });
    this.statusService.statusOverview$.pipe(takeUntil(this.unsubscribe$)).subscribe(statusOverview => this.statusOverview = statusOverview);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  getProjectStatusObj(projectName: string): ProjectStatus {
    console.log('statusOverview', this.statusOverview);
    const projectStatusObj = this.statusOverview.projectStatuses.find(status => status.name === projectName);
    return projectStatusObj || {name: projectName, pathsChecked: [], up: null};
  }

  getDependencyStatuses(projectName: string, dependencyStatuses = {}) {
    const project = this.projectsConfig.find(proj => proj.name === projectName);
    if (project && project.dependencies && project.dependencies.length) {
      project.dependencies.forEach(dep => {
        if (dep.name) {
          dependencyStatuses[dep.name] = this.getProjectStatusObj(dep.name);
          if (dep.dependencies && dep.dependencies.length) {
            this.getDependencyStatuses(dep.name, dependencyStatuses);
          }
        } else {
          console.error('The dependency does not have a "name" property', dep);
        }
      });
      console.log('dependencyStatuses', dependencyStatuses);
      return dependencyStatuses;
    }
  }

  private getAllHealthChecks(projectsConfig: Project[], healthCheckCalls = []) {
    projectsConfig.forEach(projConfig => {
      healthCheckCalls.push(this.statusService.getHealthCheckStatus(projConfig.name, projConfig.healthCheck));
      if (projConfig.dependencies && projConfig.dependencies.length) {
        this.getAllHealthChecks(projConfig.dependencies, healthCheckCalls);
      }
    });
    return healthCheckCalls;
  }

}
