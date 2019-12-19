import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Project from '../../interfaces/project.interface';
import { ProjectConfigService } from '../../services/project-config.service';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProjectStatusService } from '../../services/project-status.service';
import { Location } from '@angular/common';
import ProjectStatus from '../../interfaces/project-status.interface';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss']
})
export class ProjectContainerComponent implements OnInit, OnDestroy {

  project: Project;
  projectsConfig: Project[];
  intervalLength: number;
  projectsStatus: ProjectStatus;
  unsubscribe$ = new Subject<boolean>();
  dependencyNavRef: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private projectsConfigService: ProjectConfigService,
              public statusService: ProjectStatusService) { }

  ngOnInit() {
    this.projectsConfigService.projectsConfig$.pipe(
        tap(projectsConfig => {
          this.projectsConfig = projectsConfig.projects;
          this.intervalLength = projectsConfig.intervalLength;
          if (!this.statusService.projectsMonitorOn && !this.statusService.userTurnedOffProjectMonitor) {
            this.statusService.startMonitoring(this.projectsConfig, this.intervalLength);
          }
        }),
        map(projectsConfig => this.getProject(projectsConfig.projects)),
        tap(project => this.project = project),
        switchMap(() => this.getProjectStatus()),
        takeUntil(this.unsubscribe$)
    ).subscribe(statusOverview => this.projectsStatus = statusOverview);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  goBack() {
    this.router.navigate(['projects']);
  }

  navigateToProject(navPaths) {
    return this.router.navigate(navPaths);
  }

  stopMonitoringProjects() {
    this.statusService.stopMonitoring();
    this.unsubscribe$.next(true);
  }

  startMonitoringProjects() {
    this.statusService.startMonitoring(this.projectsConfig, this.intervalLength);
    this.subscribeToProjectsMonitor();
  }

  private subscribeToProjectsMonitor() {
    this.statusService.projectsStatusMonitor$.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  private getProject(projects: Project[]) {
    const routeParams = this.route.snapshot.paramMap.keys;
    const dependencyList = routeParams.map(param => this.route.snapshot.paramMap.get(param));
    this.dependencyNavRef = dependencyList.slice(0, dependencyList.length - 1);
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

  private getProjectStatus(): Observable<ProjectStatus> {
    return this.statusService.projectsStatusMonitor$.pipe(
        map(statusOverview => {
          const routeParams = this.route.snapshot.paramMap.keys;
          const dependencyList = routeParams.map(param => this.route.snapshot.paramMap.get(param));
          return dependencyList.reduce((status, dep, i) => {
            if (dependencyList.length > i + 1) {
              return status[dep].dependencies;
            } else {
              return status[dep];
            }
          }, statusOverview);
        }),
        takeUntil(this.unsubscribe$)
    );
  }

}
