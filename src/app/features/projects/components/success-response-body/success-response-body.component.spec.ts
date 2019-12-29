import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessResponseBodyComponent } from './success-response-body.component';

describe('SuccessResponseBodyComponent', () => {
  let component: SuccessResponseBodyComponent;
  let fixture: ComponentFixture<SuccessResponseBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessResponseBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessResponseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
