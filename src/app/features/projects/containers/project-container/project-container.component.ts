import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Project from '../../../../shared/interfaces/project.interface';
import { ProjectConfigService } from '../../services/project-config.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss']
})
export class ProjectContainerComponent implements OnInit, OnDestroy {

  project: Project;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute,
              private projectsConfigService: ProjectConfigService) { }

  ngOnInit() {
    this.projectsConfigService.projectsConfig$.pipe(
        map(projects => {
          return projects.find(proj => proj.name === this.route.snapshot.paramMap.get('name'));
        }),
        takeUntil(this.unsubscribe$)
    ).subscribe((project) => this.project = project);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

}
