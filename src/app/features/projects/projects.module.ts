import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectContainerComponent } from './containers/project-container/project-container.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsShellComponent } from './containers/projects-shell/projects-shell.component';

@NgModule({
  declarations: [
      ProjectsContainerComponent,
      ProjectListItemComponent,
      ProjectContainerComponent,
      ProjectsShellComponent
  ],
  imports: [
      CommonModule,
      HttpClientModule,
      ProjectsRoutingModule
  ],
  exports: [
      ProjectsShellComponent
  ]
})
export class ProjectsModule { }
