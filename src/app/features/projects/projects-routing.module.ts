import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectContainerComponent } from './containers/project-container/project-container.component';

export const projectsRoutes: Routes = [
  { path: '', component: ProjectsContainerComponent },
  { path: ':name', component: ProjectContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
