import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import Project from '../../interfaces/project.interface';
import ProjectStatus from '../../interfaces/project-status.interface';
import DepDiagramConfig from '../../interfaces/dep-diagram-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DepDiagramService } from '../../services/dep-diagram.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dependency-vis-container',
  templateUrl: './dependency-vis-container.component.html',
  styleUrls: ['./dependency-vis-container.component.scss']
})
export class DependencyVisContainerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() projectConfig: Project;
  @Input() projectStatus: ProjectStatus;
  dependencyDiagram: DepDiagramConfig[] = [];
  unsubscribe$ = new Subject<boolean>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private depDiagramService: DepDiagramService) { }

  ngOnInit() {
    this.dependencyDiagram = this.createDepDiagram(this.projectConfig, this.projectStatus);
    this.depDiagramService.navRequest$.pipe(
        filter(depDiagram => !!depDiagram),
        takeUntil(this.unsubscribe$)
    ).subscribe(depDiagram => {
      this.navigateToProject(depDiagram);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dependencyDiagram = this.createDepDiagram(this.projectConfig, this.projectStatus);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  navigateToProject(depDiagram: DepDiagramConfig) {
    const currentParams = this.activatedRoute.snapshot.paramMap.keys.map(param => this.activatedRoute.snapshot.paramMap.get(param));
    this.router.navigate([
      'projects',
      ...currentParams.slice(0, currentParams.length - 1),
      ...depDiagram.trace,
      depDiagram.name
    ]);
  }

  private createDepDiagram(projectConfig: Project, projectStatus: ProjectStatus, trace?: string[], diagramArray = []): any {
    if (projectConfig.dependencies && projectConfig.dependencies.length) {
      projectConfig.dependencies.forEach((dep) => {
        trace = trace ? [...trace] : [];
        if (trace[trace.length - 1] !== projectConfig.name) {
          trace.push(projectConfig.name);
        }
        if (dep.dependencies && dep.dependencies.length) {
          const statusText = this.getStatusText(projectStatus.dependencies[dep.name]);
          diagramArray.push({
            name: dep.name,
            statusText,
            trace,
            deps: this.createDepDiagram(dep, projectStatus.dependencies[dep.name], trace)
          });
        } else {
          const statusText = this.getStatusText(projectStatus.dependencies[dep.name]);
          diagramArray.push({
            name: dep.name,
            statusText,
            trace,
          });
        }
      });
    }
    return diagramArray;
  }

  private getStatusText(projectStatus: ProjectStatus) {
    let statusText = '';

    if (projectStatus.up && !projectStatus.warning) {
      statusText = 'up';
    }

    if (projectStatus.up && projectStatus.warning) {
      statusText = 'warning';
    }

    if (!projectStatus.up) {
      statusText = 'down';
    }

    return statusText;
  }

}
