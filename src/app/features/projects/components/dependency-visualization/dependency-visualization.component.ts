import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';

@Component({
  selector: 'app-dependency-visualization',
  templateUrl: './dependency-visualization.component.html',
  styleUrls: ['./dependency-visualization.component.scss']
})
export class DependencyVisualizationComponent implements OnInit {

  @Input() projectConfig: Project;
  @Input() dependencyDiagram: any;

  constructor() { }

  ngOnInit() {
  }

}
