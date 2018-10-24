import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClcFunnelComponent } from './clc-funnel.component';

describe('ClcFunnelComponent', () => {
  let component: ClcFunnelComponent;
  let fixture: ComponentFixture<ClcFunnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClcFunnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClcFunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
