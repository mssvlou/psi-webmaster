import { WebsiteService } from '../website.service';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from "@angular/core";
import { ErrorElement } from '../website';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ApexDataLabels,
  ApexLegend,
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexTitleSubtitle,
} from "ng-apexcharts";


@Component({
  selector: 'app-website-analysis',
  templateUrl: './website-analysis.component.html',
  styleUrls: ['./website-analysis.component.css']
})
export class WebsiteAnalysisComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild("chart") chart: ChartComponent = {} as ChartComponent;
  @Input() websiteName : string = '';
  @Input() stats: number[] = [];
  @Input() count: number[] = [];
  @Input() dataSource : ErrorElement[]= [];
  displayedColumns: string[] = ['rank','errorName'];

  failedAssertionsTotal: number = 0;
  failedAAATotal: number = 0;
  failedAATotal: number = 0;
  failedATotal: number = 0;
  ratedTotal: number = 0;

  failedAssertionsPercentage: number = 0;
  failedAAAPercentage: number = 0;
  failedAAPercentage: number = 0;
  failedAPercentage: number = 0;

  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: this.stats,
      chart: {
        foreColor: "#fff",
        height: 500,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          // offsetY: 0,
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 5,
            size: "40%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: true
            },
            value: {
              show: true
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Total page with error","Pages with 1+ AAA error",
                "Pages with 1+ AA error","Pages with 1+ A error",
                "Pages with no errors"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        // position: "top",
        offsetX: 100,
        offsetY: 100,
        horizontalAlign: 'center', 
        labels: {
          useSeriesColors: true,
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0,
        },
        // height: 100,
        // width: 500,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats']) {
      this.updateStats();
    }
  }


  public openPDF(): void {
    const margin = 10; // 10mm margin on all sides
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      // let fileWidth = 208;
      // let fileHeight = (canvas.height * fileWidth) / canvas.width;
      // const FILEURI = canvas.toDataURL('image/png');
      // let PDF = new jsPDF('p', 'mm', 'a4');
      // let position = 0;     
      // PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      // PDF.setTextColor(0,0,0);
      // // PDF.text(20, 40, 'This is red.');
      // PDF.save('website-report.pdf');

      let imgWidth = 208 - 2 * margin; // A4 width (210mm) minus left and right margins
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      
      // Center the image within the margins
      let positionX = margin;
      let positionY = margin;
  
      PDF.addImage(FILEURI, 'PNG', positionX, positionY, imgWidth, imgHeight);
      PDF.setTextColor(0, 0, 0);
      PDF.save('website-report.pdf');
    });
  }

  updateStats(): void {
    this.failedAssertionsTotal = this.count[0] || 0;
    this.failedAAATotal = this.count[1] || 0;
    this.failedAATotal = this.count[2] || 0;
    this.failedATotal = this.count[3] || 0;
    this.ratedTotal = this.count[4] || 0;

    this.failedAssertionsPercentage = this.calculatePercentage(this.failedAssertionsTotal, this.ratedTotal);
    this.failedAAAPercentage = this.calculatePercentage(this.failedAAATotal, this.ratedTotal);
    this.failedAAPercentage = this.calculatePercentage(this.failedAATotal, this.ratedTotal);
    this.failedAPercentage = this.calculatePercentage(this.failedATotal, this.ratedTotal);
  }

  calculatePercentage(failed: number, total: number): number {
    return total > 0 ? (failed / total) * 100 : 0;
  }

}


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  labels: any;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

// function calculatePercentage(count: number, total : number) {
//   return count / total
// }

