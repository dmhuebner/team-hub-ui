import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
      ProjectsContainerComponent,
      ProjectListItemComponent,
  ],
  imports: [
      CommonModule,
      HttpClientModule
  ],
  exports: [
      ProjectsContainerComponent
  ]
})
export class ProjectsModule { }
