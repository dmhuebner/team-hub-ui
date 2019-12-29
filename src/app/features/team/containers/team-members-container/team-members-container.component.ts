import { Component, Input, OnInit } from '@angular/core';
import TeamMember from '../../../../shared/interfaces/team-member.interface';

@Component({
  selector: 'app-team-members-container',
  templateUrl: './team-members-container.component.html',
  styleUrls: ['./team-members-container.component.scss']
})
export class TeamMembersContainerComponent implements OnInit {

  @Input() teamMembers: TeamMember[];

  constructor() { }

  ngOnInit() {
  }

}
