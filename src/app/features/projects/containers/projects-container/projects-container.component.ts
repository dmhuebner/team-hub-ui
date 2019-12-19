import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import { ProjectStatusService } from '../../services/project-status.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectConfigService } from '../../services/project-config.service';
import ProjectsStatusOverview from '../../interfaces/projects-status-overview.interface';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss']
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {

  @Input() projectsConfig: Project[];
  @Input() intervalLength: number;

  projectsStatusOverview: ProjectsStatusOverview;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(public statusService: ProjectStatusService,
              private projectConfigService: ProjectConfigService) { }

  ngOnInit() {
    if (!this.projectsConfig) {
      this.projectConfigService.projectsConfig$.pipe(
          takeUntil(this.unsubscribe$)
      ).subscribe((config) => {
        this.projectsConfig = config.projects;
        this.intervalLength = config.intervalLength;
        if (!this.statusService.projectsMonitorOn && !this.statusService.userTurnedOffProjectMonitor) {
          this.statusService.startMonitoring(this.projectsConfig, this.intervalLength);
        }
      });
    }

    this.subscribeToProjectsMonitor();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
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
    ).subscribe(msgToClient => {
      console.debug('Projects Statuses', msgToClient);
      this.projectsStatusOverview = msgToClient;
    });
  }

}
