import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyVisContainerComponent } from './dependency-vis-container.component';

describe('DependencyVisContainerComponent', () => {
  let component: DependencyVisContainerComponent;
  let fixture: ComponentFixture<DependencyVisContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyVisContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyVisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
