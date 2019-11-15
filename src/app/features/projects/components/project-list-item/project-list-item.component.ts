import { Component, Input, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/project.interface';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

  @Input() project: Project;
  @Input() projectStatus: ProjectStatus;
  @Input() dependencyStatuses;

  constructor() { }

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
