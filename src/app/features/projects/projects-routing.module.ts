import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectContainerComponent } from './containers/project-container/project-container.component';

export const projectsRoutes: Routes = [
  { path: '', component: ProjectsContainerComponent },
  { path: ':dep', component: ProjectContainerComponent },
  { path: ':dep/:dep2', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4/:dep5', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4/:dep5/:dep6', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4/:dep5/:dep6/:dep7', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4/:dep5/:dep6/:dep7/:dep8', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4/:dep5/:dep6/:dep7/:dep8/:dep9', component: ProjectContainerComponent },
  { path: ':dep/:dep2/:dep3/:dep4/:dep5/:dep6/:dep7/:dep8/:dep9/:dep10', component: ProjectContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
