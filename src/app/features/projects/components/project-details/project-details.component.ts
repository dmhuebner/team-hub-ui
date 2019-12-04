import { Component, Input, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/project.interface';
import { DomSanitizer } from '@angular/platform-browser';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;
  @Input() projectStatus: ProjectStatus;
  @Input() statusOverview: StatusOverview;
  @Input() dependencyStatuses;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
