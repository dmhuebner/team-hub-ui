import { Component, Input, OnInit } from '@angular/core';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';
import { ProjectStatusService } from '../../services/project-status.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  @Input() projectStatus: ProjectStatus;
  @Input() dependencyStatuses: ProjectStatus;
  @Input() statusOverview: StatusOverview;
  @Input() small: boolean;

  constructor(public statusService: ProjectStatusService) { }

  ngOnInit() {
  }

  dependencyDown(): boolean {
    if (this.dependencyStatuses) {
      return Object.values(this.dependencyStatuses).some(depStatus => {
        // @ts-ignore
        return !depStatus.up;
      });
    }
  }

}
