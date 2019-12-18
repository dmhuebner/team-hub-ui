import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';

@Component({
  selector: 'app-dependency-vis-container',
  templateUrl: './dependency-vis-container.component.html',
  styleUrls: ['./dependency-vis-container.component.scss']
})
export class DependencyVisContainerComponent implements OnInit {

  @Input() projectConfig: Project;
  dependencyDiagram = [];

  constructor() { }

  ngOnInit() {
    this.dependencyDiagram = this.createDepDiagram(this.projectConfig);
  }

  private createDepDiagram(projectConfig: Project, diagramArray = []): any {
    if (projectConfig.dependencies && projectConfig.dependencies.length) {
      projectConfig.dependencies.forEach((dep) => {
        if (dep.dependencies && dep.dependencies.length) {
          diagramArray.push({name: dep.name, deps: this.createDepDiagram(dep, [])});
        } else {
          diagramArray.push({name: dep.name});
        }
      });
    }
    return diagramArray;
  }

}
