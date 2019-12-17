import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyNavComponent } from './dependency-nav.component';

describe('DependencyNavComponent', () => {
  let component: DependencyNavComponent;
  let fixture: ComponentFixture<DependencyNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
