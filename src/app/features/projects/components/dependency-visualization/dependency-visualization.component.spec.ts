import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyVisualizationComponent } from './dependency-visualization.component';

describe('DependencyVisualizationComponent', () => {
  let component: DependencyVisualizationComponent;
  let fixture: ComponentFixture<DependencyVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
