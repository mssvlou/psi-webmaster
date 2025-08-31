import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Website, RatingStatus, RatingResult, Page, ErrorElement} from '../website';
import { WebsiteService } from '../website.service';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent {
  constructor(
    private route: ActivatedRoute,
    private websiteService: WebsiteService,
    private location: Location,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.websiteService.getWebsiteById(id)
      .subscribe(website => {
        this.website = website;
        this.count = this.getCount()
        this.stats = this.calculateStats();
        this.errorData = this.calculateError();
        console.log(this.website.commonErrors);
        this.websitePattern = `^${this.website.websiteURL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`;
        // console.log(this.websitePattern);
        // console.log("ngOnInit: " + website.moniteredPages[0]._id + " "+ website.moniteredPages[0].pageURL);
      });
  }

  website!: Website;
  input: string = '';
  websitePattern:string = '';
  siteFormControl = new FormControl('', [Validators.required]);
  count: number[] = [0,0,0,0,0]
  stats: number[] = [0,0,0,0,0]

  errorData: ErrorElement[] = []

  showSpinner = false;
  disableButtons = false;

  submit(input : string) {
    if(input.startsWith(this.website.websiteURL)) {
      var newPage : Page = {
        _id: '',
        websiteURL: this.website.websiteURL,
        pageURL: input,
        rating: RatingResult.NONE,
      };
      this.websiteService.addPageToWebsite(newPage,this.website._id).subscribe((page: Page) => {
        newPage._id = page._id;
      });
      this.website.moniteredPages.push(newPage); // if this isnt pushed, its not triggered
    }
  }
  
  delete() {
    if(this.website.moniteredPages.length > 0) {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if(result === 'ok'){
          this.deleteSelected(this.website.moniteredPages);
          this.deleteAndGoBack();
        }
      });
    } else
      this.deleteAndGoBack();
  }

  private deleteAndGoBack(){
    this.websiteService.deleteWebsite(this.website).subscribe(() => {
      this.goBack();
    });
  }

  //called by emiter
  deleteSelected(selection:Page[]):void{
    this.websiteService.deletePages(this.website,selection).subscribe((pages: Page[]) => {
      pages.forEach(page => {
        const index = this.website.moniteredPages.indexOf(page);
        this.website.moniteredPages.splice(index);
      })
    });
  }

  evaluateSelected(selection: Page[]) {
    this.showSpinner = true;
    this.disableButtons = true;

    // change evaluation to in rating
    this.website.ratingStatus = RatingStatus.BEING_RATED;
    // refresh probably?

    this.websiteService.evaluatePages(this.website,selection).subscribe(() => {
      this.websiteService.getWebsiteById(this.website._id)
      .subscribe(website => {
        this.website = website;
        console.log("last ratingStatus:" + website.ratingStatus);
        console.log("last rated:" + website.lastRated);
        console.log("monitered page eval date:" + website.moniteredPages[0].lastRated);
        
        this.stats = this.calculateStats();
        console.log("this.stats: " + this.stats);

        this.errorData = this.calculateError();
        console.log("this.errorData: " + this.errorData);

      });

      this.showSpinner = false;
      this.disableButtons = false;

      const snackBarRef = this.snackbar.open('Evaluation completed!','',{
        duration: 2000
      });
      
      snackBarRef.onAction().subscribe(() => {
        console.log('snackbar action triggered'); // TODO: remove this in case we don't add an action
      });
    });
  }

  checkForErrorsIn(formControl: AbstractControl) {
    throw new Error('Method not implemented.');
  }

  goBack(): void {
    this.location.back();
  }
  getCount() : number[]{
    const count= [
      this.website.failedAssertionsTotal,
      this.website.failedAAATotal,
      this.website.failedAATotal,
      this.website.failedATotal,
      this.website.ratedTotal
    ];
    return count

  }

  calculateStats(): number[] {
    const stats= [
      this.website.failedAssertionsTotal/this.website.ratedTotal*100,
      this.website.failedAAATotal/this.website.ratedTotal*100,
      this.website.failedAATotal/this.website.ratedTotal*100,
      this.website.failedATotal/this.website.ratedTotal*100,
      (this.website.ratedTotal-this.website.failedAssertionsTotal)/this.website.ratedTotal*100
    ];
    return stats
  }

  calculateError(): ErrorElement[]{
    return this.website.commonErrors.map((errorName, index) => ({
        rank: index + 1,
        errorName: errorName,
    }));
  }
}
