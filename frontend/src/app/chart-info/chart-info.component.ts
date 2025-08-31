import { Component, ViewChild } from "@angular/core";
import { ApexDataLabels, ApexLegend, ApexTitleSubtitle, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  labels: any;
  // title: ApexTitleSubtitle;
  legend: ApexLegend;
};

@Component({
  selector: 'app-chart-info',
  templateUrl: './chart-info.component.html',
  styleUrls: ['./chart-info.component.css']
})
export class ChartInfoComponent {
  @ViewChild("chart") chart: ChartComponent = {} as ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "pie",
        foreColor: "#fff",
        width: 400,
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "16px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold"
        }
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      // title: {
      //   text: "My First Angular Chart"
      // },
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 500
      //       },
      //       legend: {
      //         position: "bottom"
      //       }
      //     }
      //   }
      // ]
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontWeight: 500,
      },
    };
  }
}
