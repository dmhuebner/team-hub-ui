import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import ProjectsStatus from '../../interfaces/projects-status.interface';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

  @Input() project: Project;
  @Input() projectStatus: ProjectsStatus;

  constructor() { }

  ngOnInit() {
  }

}
