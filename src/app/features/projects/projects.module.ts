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
import { MsToMinPipe } from './pipes/ms-to-min.pipe';
import { TimerPipe } from './pipes/timer.pipe';
import { MonitorInfoComponent } from './components/monitor-info/monitor-info.component';

@NgModule({
  declarations: [
      ProjectsContainerComponent,
      ProjectListItemComponent,
      ProjectContainerComponent,
      ProjectsShellComponent,
      ProjectDetailsComponent,
      ProjectDependenciesComponent,
      ProjectStatusComponent,
      MsToMinPipe,
      TimerPipe,
      MonitorInfoComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        ProjectsRoutingModule,
        MatIconModule,
        MatButtonModule,
    ],
  exports: [
      ProjectsShellComponent
  ]
})
export class ProjectsModule { }
