import { Component, Input, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/project.interface';
import ProjectStatus from '../../../../shared/interfaces/project-status.interface';
import StatusOverview from '../../../../shared/interfaces/status-overview.interface';

@Component({
  selector: 'app-project-dependencies',
  templateUrl: './project-dependencies.component.html',
  styleUrls: ['./project-dependencies.component.scss']
})
export class ProjectDependenciesComponent implements OnInit {

  constructor() { }

  @Input() dependencies: Project[];
  @Input() statusOverview: StatusOverview;

  ngOnInit() {
  }

  getProjectStatusObj(projectName: string): ProjectStatus {
    const projectStatusObj = this.statusOverview.projectStatuses.find(status => status.name === projectName);
    return projectStatusObj || {name: projectName, pathsChecked: [], up: null};
  }

  getDependencyStatuses(projectName: string, dependencyStatuses = {}) {
    const project = this.dependencies.find(proj => proj.name === projectName);
    if (project && project.dependencies && project.dependencies.length) {
      project.dependencies.forEach(dep => {
        if (dep.name) {
          dependencyStatuses[dep.name] = this.getProjectStatusObj(dep.name);
          if (dep.dependencies && dep.dependencies.length) {
            this.getDependencyStatuses(dep.name, dependencyStatuses);
          }
        } else {
          console.error('The dependency does not have a "name" property', dep);
        }
      });
      // console.log('dependencyStatuses', dependencyStatuses);
      return dependencyStatuses;
    }
  }

}
