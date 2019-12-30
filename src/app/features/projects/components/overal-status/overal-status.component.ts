import { Component, Input, OnChanges, OnInit } from '@angular/core';
import ProjectStatus from '../../interfaces/project-status.interface';

@Component({
  selector: 'app-overal-status',
  templateUrl: './overal-status.component.html',
  styleUrls: ['./overal-status.component.scss']
})
export class OveralStatusComponent implements OnInit, OnChanges {

  @Input() projectStatuses: ProjectStatus[];
  up: boolean;
  warning: boolean;
  down: boolean;
  statusText: string;

  constructor() { }

  ngOnInit() {
    if (this.projectStatuses) {
      this.updateStatusOverview(this.projectStatuses);
    }

  }

  ngOnChanges() {
    if (this.projectStatuses) {
      this.updateStatusOverview(this.projectStatuses);
    }
  }

  private updateStatusOverview(projectStatuses: ProjectStatus[]) {
    this.down = projectStatuses.every(status => !status.up);
    this.warning = projectStatuses.some(status => status.up && status.warning);
    if (this.down) {
      this.statusText = 'All projects down!';
    } else if (!this.down && this.warning) {
      this.statusText = 'Something is down...';
    } else if (!this.down && !this.warning) {
      this.statusText = 'All Projects are up!';
    }
  }

}
