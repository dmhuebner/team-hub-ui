import { Component, Input, OnInit } from '@angular/core';
import ProjectStatus from '../../interfaces/project-status.interface';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  @Input() projectStatus: ProjectStatus;
  @Input() size: 'small' | 'medium' | 'large';

  constructor() { }

  ngOnInit() {
  }

}
