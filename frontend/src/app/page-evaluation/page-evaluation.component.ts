import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Website, RatingStatus, RatingResult, Page, ErrorElement, QWAssertion, AffectedElement} from '../website';
import { WebsiteService } from '../website.service';
import { Location } from '@angular/common';
import { MatChipListboxChange, MatChipOption } from '@angular/material/chips';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-evaluation',
  templateUrl: './page-evaluation.component.html',
  styleUrls: ['./page-evaluation.component.css']
})
export class PageEvaluationComponent {

  page!: Page;
  assertions!: QWAssertion[];

  passedPercentage!: number;
  warningPercentage!: number;
  failedPercentage!: number;
  notApplicablePercentage!: number;
  items!: [1,2,3,4,5];

  constructor(
    private route: ActivatedRoute,
    private websiteService: WebsiteService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.websiteService.getPageEvaluationById(id)
      .subscribe(page => {
        this.page = page;
        this.assertions = page.assertions ?? [];
        //this.filteredAssertions = this.assertions;
        this.applyFilter();

        this.passedPercentage = this.calculatePercentage(this.page?.totalPassed ?? 0);
        this.warningPercentage = this.calculatePercentage(this.page?.totalWarning ?? 0);
        this.failedPercentage = this.calculatePercentage(this.page?.totalFailed ?? 0);
        this.notApplicablePercentage = this.calculatePercentage(this.page?.totalNotApplicable ?? 0);
      });
  }

  private calculatePercentage(tests : number): number {
    const totalTests = this.page?.totalTests ?? 1;
    return (tests/totalTests) * 100;
  }

  goBack(): void {
    this.location.back();
  }

  modules = ['act', 'wcag'];
  results = ['passed', 'warning', 'failed', 'not applicable'];
  levels = ['A', 'AA', 'AAA'];

  selectedModules: String[] = this.modules;
  selectedResults: String[] = this.results;
  selectedLevels: String[] = this.levels;

  filteredAssertions: QWAssertion[] = [];

  setFilter(event:MatChipListboxChange, filterType: string) {
    var listbox: MatChipOption | MatChipOption[] = event.source.selected;

    let chipOpts : MatChipOption[];
    if (listbox instanceof MatChipOption)
      chipOpts = [listbox];
    else
      chipOpts = listbox;

    const values : String[] = chipOpts.map((opt) => opt.value);
    if (filterType === 'module')
      this.selectedModules = values;
    else if (filterType === 'result')
      this.selectedResults = values;
    else if (filterType === 'level')
      this.selectedLevels = values;

    this.applyFilter();
  }

  applyFilter() {
    this.filteredAssertions = this.assertions.filter(assertion => {
      return this.selectedModules.includes(assertion.module) &&
        this.selectedResults.includes(assertion.outcome) &&
        assertion.levels.some(level => this.selectedLevels.includes(level));
    });
  }

  
}