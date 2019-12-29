import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';

@Component({
  selector: 'app-project-links',
  templateUrl: './project-links.component.html',
  styleUrls: ['./project-links.component.scss']
})
export class ProjectLinksComponent implements OnInit {

  @Input() projectConfig: Project

  constructor() { }

  ngOnInit() {
  }

}
