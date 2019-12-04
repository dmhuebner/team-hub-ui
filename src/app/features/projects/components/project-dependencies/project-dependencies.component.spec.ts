import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDependenciesComponent } from './project-dependencies.component';

describe('ProjectDependenciesComponent', () => {
  let component: ProjectDependenciesComponent;
  let fixture: ComponentFixture<ProjectDependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
