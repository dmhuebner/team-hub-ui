import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListContainerComponent } from './link-list-container.component';

describe('LinkListContainerComponent', () => {
  let component: LinkListContainerComponent;
  let fixture: ComponentFixture<LinkListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
