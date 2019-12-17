import { Component, Input, OnInit } from '@angular/core';
import ProjectStatus from '../../interfaces/project-status.interface';

@Component({
  selector: 'app-healthcheck-status-list-item',
  templateUrl: './healthcheck-status-list-item.component.html',
  styleUrls: ['./healthcheck-status-list-item.component.scss']
})
export class HealthcheckStatusListItemComponent implements OnInit {

  @Input() projectStatus: ProjectStatus;

  constructor() { }

  ngOnInit() {
  }

}
