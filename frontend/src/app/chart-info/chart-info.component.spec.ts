import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInfoComponent } from './chart-info.component';

describe('ChartInfoComponent', () => {
  let component: ChartInfoComponent;
  let fixture: ComponentFixture<ChartInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartInfoComponent]
    });
    fixture = TestBed.createComponent(ChartInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
