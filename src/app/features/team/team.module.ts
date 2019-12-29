import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkListContainerComponent } from './containers/link-list-container/link-list-container.component';
import { TeamContainerComponent } from './containers/team-container/team-container.component';
import { TeamMembersContainerComponent } from './containers/team-members-container/team-members-container.component';

@NgModule({
  declarations: [
    LinkListContainerComponent,
    TeamContainerComponent,
    TeamMembersContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      TeamContainerComponent
  ]
})
export class TeamModule { }
