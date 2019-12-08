import { Component, Input, OnInit } from '@angular/core';
import ProjectsStatus from '../../interfaces/projects-status.interface';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  @Input() projectStatus: ProjectsStatus;
  @Input() small: boolean;

  constructor() { }

  ngOnInit() {
  }

}
