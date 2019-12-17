import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcheckStatusListItemComponent } from './healthcheck-status-list-item.component';

describe('HealthcheckStatusListItemComponent', () => {
  let component: HealthcheckStatusListItemComponent;
  let fixture: ComponentFixture<HealthcheckStatusListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcheckStatusListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcheckStatusListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
