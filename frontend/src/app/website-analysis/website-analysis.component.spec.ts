import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAnalysisComponent } from './website-analysis.component';

describe('WebsiteAnalysisComponent', () => {
  let component: WebsiteAnalysisComponent;
  let fixture: ComponentFixture<WebsiteAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebsiteAnalysisComponent]
    });
    fixture = TestBed.createComponent(WebsiteAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
