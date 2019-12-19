import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import DepDiagramConfig from '../../interfaces/dep-diagram-config.interface';
import { DepDiagramService } from '../../services/dep-diagram.service';

@Component({
  selector: 'app-dependency-visualization',
  templateUrl: './dependency-visualization.component.html',
  styleUrls: ['./dependency-visualization.component.scss']
})
export class DependencyVisualizationComponent implements OnInit {

  @Input() projectConfig: Project;
  @Input() dependencyDiagram: DepDiagramConfig[];

  constructor(private depDiagramService: DepDiagramService) { }

  ngOnInit() {
  }

  navigate(projectDepDiagram: DepDiagramConfig) {
    this.depDiagramService.navRequestSubject.next(projectDepDiagram);
    this.depDiagramService.navRequestSubject.next(null);
  }

}
