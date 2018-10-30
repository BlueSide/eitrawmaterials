import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsOfSupportChartComponent } from './results-of-support-chart.component';

describe('ResultsOfSupportChartComponent', () => {
  let component: ResultsOfSupportChartComponent;
  let fixture: ComponentFixture<ResultsOfSupportChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsOfSupportChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsOfSupportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
