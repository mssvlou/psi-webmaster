import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Website, RatingStatus, RatingResult, Page } from '../website';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatChipListbox, MatChipListboxChange, MatChipOption, MatChipSelectionChange } from '@angular/material/chips';
import { EXAMPLE_SITES } from '../MOCKSITES';
import { WebsiteService } from '../website.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements AfterViewInit {
  displayedColumns = ['websiteURL','addedDate','lastRated','ratingStatus'];
  dataSource: MatTableDataSource<Website>;
  websites: Website[] = []
  
  websitePattern = "^(http|https|ftp|smtp):\/\/[^\/]+\/?$"
  siteFormControl = new FormControl('', [Validators.required, Validators.pattern(this.websitePattern)]);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private webService: WebsiteService,
    ) {
    this.dataSource = new MatTableDataSource<Website>(this.websites); //hook to db instead
  }

  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  // generate predicate used to filter
  ngOnInit(): void {
    this.filterValues.ratingStatus = ["TO_BE_RATED","BEING_RATED","RATED","ERROR"];
    this.applyFilter();
    this.getWebsites();
  }

  /**URL input */
  input: string = '';

  /**load in websites */
  getWebsites():void{
    this.webService.getWebsites()
      .subscribe((res: Website[]) => {
        this.websites = res;
        this.dataSource = new MatTableDataSource<Website>(this.websites);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      });
  }


  /** Set up statuses ref for filter */
  ratingStatus = RatingStatus;
  statuses():Array<string>{
    var statuses = Object.keys(this.ratingStatus)
    return statuses;
  }

  /** Set up filters */
  statusFilter = new FormControl('');
  filterValues: any = { //the filter that changes and tracks what data needs to be filtered
    ratingStatus: '',
  }


  private createFilter(): (site: Website, filter: any) => boolean {
    let filterFunction = function (site: Website ,filter: string[]): boolean {
      const rowRating: string = site.ratingStatus.toLocaleLowerCase();
      const ratings: string[] = filter.map((str) => RatingStatus[str as keyof typeof RatingStatus]);//JSON.parse(filter).ratingStatus;
      // console.log("row:" + rowRating + "    ratings:" + ratings);
      return ratings.some((rating) => rating === rowRating);
    }

    return filterFunction;
  }


  // TODO: one button clear all
  clearFilter() {
    this.statusFilter.setValue('');
  }

  setFilter(event:MatChipListboxChange){
    var listbox: MatChipOption | MatChipOption[] = event.source.selected;

    let chipOpts : MatChipOption[];
    if (listbox instanceof MatChipOption){
      chipOpts = [listbox];
    }else{
      chipOpts = listbox;
    }

    const values : String[] = chipOpts.map((opt) => opt.value);
    
    this.filterValues.ratingStatus = values;
    this.applyFilter();
  }
  
  applyFilter(){
    this.dataSource.filter = this.filterValues.ratingStatus;
    // console.log("applfyFilter: " + this.dataSource.filter);
  }

  
  submit(input: string) {
    if(this.isSite(input)) {
      var newSite : Website = {
        _id: '',
        websiteURL: input,
        addedDate: new Date(),
        ratingStatus: RatingStatus.TO_BE_RATED,
        moniteredPages: [],
        ratedTotal:0,
        failedAssertionsTotal:0,
        failedAAATotal:0,
        failedAATotal:0,
        failedATotal:0,
        commonErrors:[]
      };
      this.webService.addWebsite(newSite).subscribe((site: Website) => {
          newSite._id = site._id;
        });
      this.dataSource.data.push(newSite);
      this.dataSource.data = this.dataSource.data;
      this.dataSource.connect();
    }
  }

  isSite(input:string):boolean{
    return (input.startsWith("https://") || input.startsWith("http://"));
  }
}