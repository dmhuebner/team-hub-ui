import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectContainerComponent } from './containers/project-container/project-container.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsShellComponent } from './containers/projects-shell/projects-shell.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectDependenciesComponent } from './components/project-dependencies/project-dependencies.component';
import { ProjectStatusComponent } from './components/project-status/project-status.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SecToMinPipe } from './pipes/sec-to-min.pipe';
import { TimerPipe } from './pipes/timer.pipe';
import { MonitorInfoComponent } from './components/monitor-info/monitor-info.component';
import { DependencyNavComponent } from './components/dependency-nav/dependency-nav.component';
import { HealthcheckStatusListItemComponent } from './components/healthcheck-status-list-item/healthcheck-status-list-item.component';
import { DependencyVisualizationComponent } from './components/dependency-visualization/dependency-visualization.component';
import { DependencyVisContainerComponent } from './containers/dependency-vis-container/dependency-vis-container.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectLinksComponent } from './components/project-links/project-links.component';
import { JsonParsePipe } from './pipes/json-parse.pipe';
import { SuccessResponseBodyComponent } from './components/success-response-body/success-response-body.component';
import { OveralStatusComponent } from './components/overal-status/overal-status.component';

@NgModule({
  declarations: [
      ProjectsContainerComponent,
      ProjectListItemComponent,
      ProjectContainerComponent,
      ProjectsShellComponent,
      ProjectDetailsComponent,
      ProjectDependenciesComponent,
      ProjectStatusComponent,
      SecToMinPipe,
      TimerPipe,
      MonitorInfoComponent,
      DependencyNavComponent,
      HealthcheckStatusListItemComponent,
      DependencyVisualizationComponent,
      DependencyVisContainerComponent,
      ProjectLinksComponent,
      JsonParsePipe,
      SuccessResponseBodyComponent,
      OveralStatusComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        ProjectsRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
    ],
  exports: [
      ProjectsShellComponent
  ]
})
export class ProjectsModule { }
