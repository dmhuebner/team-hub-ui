import { Component, Input, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/project.interface';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

  @Input() project: Project;
  @Input() projectStatus: ProjectStatus;
  @Input() dependencyStatuses;
  @Input() statusOverview: StatusOverview;

  constructor() { }

  ngOnInit() {
  }

}
