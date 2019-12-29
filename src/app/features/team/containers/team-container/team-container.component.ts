import { Component, Input, OnInit } from '@angular/core';
import Team from '../../../../shared/interfaces/team.interface';

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss']
})
export class TeamContainerComponent implements OnInit {

  @Input() teamConfig: Team;

  constructor() { }

  ngOnInit() {
  }

}
