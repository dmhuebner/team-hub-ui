import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dependency-nav',
  templateUrl: './dependency-nav.component.html',
  styleUrls: ['./dependency-nav.component.scss']
})
export class DependencyNavComponent implements OnInit {

  @Input() dependencyNavRef: string[];
  @Input() currentProjectName: string;
  @Output() navigatedToProject = new EventEmitter<string[]>();
  @Output() navigatedBack = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  navigateToProject(projectName: string, index: number) {
    const navPaths: string[] = ['projects', ...this.dependencyNavRef].slice(0, index + 2);
    this.navigatedToProject.emit(navPaths);
  }

  navigateBack() {
    this.navigatedBack.emit(true);
  }

}
