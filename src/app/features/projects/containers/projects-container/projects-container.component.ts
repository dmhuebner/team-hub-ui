import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import { ProjectStatusService } from '../../services/project-status.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProjectConfigService } from '../../services/project-config.service';
import ProjectsStatusOverview from '../../interfaces/projects-status-overview.interface';
import ProjectStatus from '../../interfaces/project-status.interface';
import LoginForToken from '../../../../shared/interfaces/login-for-token.interface';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss']
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {

  @Input() projectsConfig: Project[];
  @Input() intervalLength: number;
  @Input() loginForToken: LoginForToken;

  projectsStatusOverview: ProjectsStatusOverview;
  projectStatuses: ProjectStatus[];
  unsubscribe$: Subject<boolean> = new Subject();
  projectsMonitorOn: boolean;

  constructor(public statusService: ProjectStatusService,
              private projectConfigService: ProjectConfigService) { }

  ngOnInit() {
    if (!this.projectsConfig) {
      this.projectConfigService.projectsConfig$.pipe(
          tap(config => {
            this.projectsConfig = config.projects;
            this.intervalLength = config.intervalLength;
            this.loginForToken = config.loginForToken;
          }),
          switchMap(() => this.statusService.projectsMonitorOn$),
          takeUntil(this.unsubscribe$)
      ).subscribe(projMonitorOn => {
        if (this.projectsConfig && this.intervalLength && !this.projectsMonitorOn && projMonitorOn) {
          this.statusService.startMonitoring(this.projectsConfig, this.intervalLength, this.loginForToken);
        }
        this.projectsMonitorOn = projMonitorOn;
      });
    }

    this.subscribeToProjectsMonitor();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  stopMonitoringProjects() {
    this.statusService.stopMonitoring();
    this.projectsMonitorOn = false;
  }

  startMonitoringProjects() {
    this.statusService.startMonitoring(this.projectsConfig, this.intervalLength, this.loginForToken);
    this.projectsMonitorOn = true;
  }

  private subscribeToProjectsMonitor() {
    this.statusService.projectsStatusMonitor$.pipe(
        takeUntil(this.unsubscribe$)
    ).subscribe(msgToClient => {
      console.debug('Projects Statuses', msgToClient);
      this.projectsStatusOverview = msgToClient;
      this.projectStatuses = Object.values(this.projectsStatusOverview);
    });
  }

}
