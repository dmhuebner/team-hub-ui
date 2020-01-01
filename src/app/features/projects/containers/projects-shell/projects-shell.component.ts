import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import { ProjectConfigService } from '../../services/project-config.service';
import LoginForToken from '../../../../shared/interfaces/login-for-token.interface';

@Component({
  selector: 'app-projects-shell',
  templateUrl: './projects-shell.component.html',
  styleUrls: ['./projects-shell.component.scss']
})
export class ProjectsShellComponent implements OnInit, OnChanges {

  @Input() projectsConfig: Project[];
  @Input() intervalLength: number;
  @Input() loginForTokenConfig: LoginForToken;

  constructor(private projectConfigService: ProjectConfigService) { }

  ngOnInit() {
    this.projectConfigService.updateConfig({
      projects: this.projectsConfig,
      intervalLength: this.intervalLength,
      loginForToken: this.loginForTokenConfig
    });
  }

  ngOnChanges() {
    this.projectConfigService.updateConfig({
      projects: this.projectsConfig,
      intervalLength: this.intervalLength,
      loginForToken: this.loginForTokenConfig
    });
  }
}
