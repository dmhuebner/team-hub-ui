import { Component, Input, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/projects.interface';
import { ProjectStatusService } from '../../services/project-status.service';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss']
})
export class ProjectsContainerComponent implements OnInit {

  @Input() projectsConfig: Project[];

  statusOverview: StatusOverview;

  constructor(private statusService: ProjectStatusService) { }

  ngOnInit() {
    const healthCheckCalls = this.projectsConfig.map(projConfig => {
      return this.statusService.getHealthCheckStatus(projConfig.name, projConfig.healthCheck);
    });
    forkJoin(healthCheckCalls).subscribe((hcResponse => {
        console.log('success');
        console.log(hcResponse);
      }),
      (err) => {
        if (err.status === 200) {
          // CORS
        }
        console.log(err);
      }
    );
    this.statusService.statusOverview$.subscribe(statusOverview => this.statusOverview = statusOverview);
  }

  getProjectStatusObj(projectName: string): ProjectStatus {
    const projectStatusObj = this.statusOverview.projectStatuses.find(status => status.name === projectName);
    return projectStatusObj || {name: projectName, pathsChecked: [], up: null};
  }

}
