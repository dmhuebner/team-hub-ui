import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Project from '../../../../shared/interfaces/project.interface';
import { ProjectConfigService } from '../../services/project-config.service';

@Component({
  selector: 'app-projects-shell',
  templateUrl: './projects-shell.component.html',
  styleUrls: ['./projects-shell.component.scss']
})
export class ProjectsShellComponent implements OnInit, OnChanges {

  @Input() projectsConfig: Project[];
  @Input() intervalLength: number;

  constructor(private projectConfigService: ProjectConfigService) { }

  ngOnInit() {
    this.projectConfigService.updateConfig({projects: this.projectsConfig, intervalLength: this.intervalLength});
  }

  ngOnChanges() {
    this.projectConfigService.updateConfig({projects: this.projectsConfig, intervalLength: this.intervalLength});
  }
}
