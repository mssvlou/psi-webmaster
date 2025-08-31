import { AfterViewInit, Component, ViewChild, Input, OnChanges,
  SimpleChanges, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Website, RatingStatus, RatingResult, Page } from '../website';
import { SelectionModel } from '@angular/cdk/collections';
import { WebsiteService } from '../website.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnChanges {
  constructor(
    private websiteService: WebsiteService,
    private cdr : ChangeDetectorRef,
  ) {}
  @Input() monitoredPages: Page[] = [];
  @Input() showSpinner: boolean = false;
  @Input() disableButtons: boolean = false;
  @Output() emitDeleteSelected = new EventEmitter<Page[]>();
  @Output() emitEvaluateSelected = new EventEmitter<Page[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable,{static:true}) table!: MatTable<Page>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','websiteURL','lastRated','rating'];
  clickedRows = new Set<Page>();
  selection = new SelectionModel<Page>(true, []);

  ngOnInit(): void {
    this.table.dataSource = this.monitoredPages;
  }

  ngAfterViewChecked():void{
    // console.log("ngAfterViewChecked");
    //ref: https://angular.io/errors/NG0100
    setTimeout(() =>{ //running async -> not reccommended
    this.table.renderRows();
    },0);
    // this.cdr.detectChanges(); //manually trigger change detection
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("ngOnChanges" + this.monitoredPages);
    this.table.dataSource = this.monitoredPages;
    // console.log(changes);
  }
  
  deleteSelected(){
    this.emitDeleteSelected.emit(this.selection.selected);
    //emitting selection for website to handle
    this.selection.clear();
  }

  evaluateSelected() {
    this.emitEvaluateSelected.emit(this.selection.selected);
    this.selection.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.monitoredPages.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.monitoredPages);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Page): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`; //row ${row.position + 1}`;
  }
}
