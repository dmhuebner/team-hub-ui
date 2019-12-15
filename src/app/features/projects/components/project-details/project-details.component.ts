import { Component, Input, OnInit } from '@angular/core';
import Project from '../../interfaces/project.interface';
import { DomSanitizer } from '@angular/platform-browser';
import ProjectsStatus from '../../interfaces/projects-status.interface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;
  @Input() projectStatus: ProjectsStatus;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('projectDetails: projectStatus: ', this.projectStatus);
  }

}
