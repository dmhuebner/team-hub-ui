import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import ProjectStatus from '../../interfaces/project-status.interface';

@Component({
  selector: 'app-project-dependencies',
  templateUrl: './project-dependencies.component.html',
  styleUrls: ['./project-dependencies.component.scss']
})
export class ProjectDependenciesComponent implements OnInit {

  constructor() { }

  @Input() dependencies: Project[];
  @Input() projectsStatus: ProjectStatus;

  ngOnInit() {
  }

}
