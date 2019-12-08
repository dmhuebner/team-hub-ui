import { Component, Input, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/project.interface';
import ProjectsStatus from '../../interfaces/projects-status.interface';

@Component({
  selector: 'app-project-dependencies',
  templateUrl: './project-dependencies.component.html',
  styleUrls: ['./project-dependencies.component.scss']
})
export class ProjectDependenciesComponent implements OnInit {

  constructor() { }

  @Input() dependencies: Project[];
  @Input() projectsStatus: ProjectsStatus;

  ngOnInit() {
  }

}
