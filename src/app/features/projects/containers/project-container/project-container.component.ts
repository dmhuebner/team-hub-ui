import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Project from '../../../../shared/interfaces/project.interface';
import { ProjectConfigService } from '../../services/project-config.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProjectStatusService } from '../../services/project-status.service';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss']
})
export class ProjectContainerComponent implements OnInit, OnDestroy {

  project: Project;
  projectsConfig: Project[];
  statusOverview: StatusOverview;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute,
              private projectsConfigService: ProjectConfigService,
              private statusService: ProjectStatusService) { }

  ngOnInit() {
    this.statusService.statusOverview$.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe(statusOverview => this.statusOverview = statusOverview);

    this.projectsConfigService.projectsConfig$.pipe(
        tap(projects => this.projectsConfig = projects),
        map(projects => this.getProject(projects)),
        tap(project => this.project = project),
        switchMap(() => this.statusService.statusMonitorOn$),
        takeUntil(this.unsubscribe$)
    ).subscribe((monitorIsOn) => {
      if (!monitorIsOn) {
        this.statusService.getAllHealthChecks(this.projectsConfig).forEach(hc => hc.pipe(takeUntil(this.unsubscribe$)).subscribe());
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  // TODO this code is duplicated from ProjectsContainer :(
  getProjectStatusObj(projectName: string): ProjectStatus {
    const projectStatusObj = this.statusOverview.projectStatuses.find(status => status.name === projectName);
    return projectStatusObj || {name: projectName, pathsChecked: [], up: null};
  }

  private getProject(projects: Project[]) {
    const routeParams = this.route.snapshot.paramMap.keys;
    const dependencyList = routeParams.map(param => this.route.snapshot.paramMap.get(param));
    const rootProject = projects.find(proj => proj.name === this.route.snapshot.paramMap.get('dep'));

    if (rootProject) {
      return dependencyList.reduce((proj, currentRoute, i) => {
        if (proj && proj.dependencies && proj.dependencies.length && i > 0) {
          return proj.dependencies.find(dep => dep.name === currentRoute);
        } else {
          return proj;
        }
      }, rootProject);
    }
  }

}
