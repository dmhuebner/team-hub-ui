import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OveralStatusComponent } from './overal-status.component';

describe('OveralStatusComponent', () => {
  let component: OveralStatusComponent;
  let fixture: ComponentFixture<OveralStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OveralStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OveralStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
