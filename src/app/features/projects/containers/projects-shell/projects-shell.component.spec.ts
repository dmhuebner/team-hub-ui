import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsShellComponent } from './projects-shell.component';

describe('ProjectsShellComponent', () => {
  let component: ProjectsShellComponent;
  let fixture: ComponentFixture<ProjectsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
