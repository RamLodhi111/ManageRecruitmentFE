import { Component, OnInit,ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import 'chartjs-plugin-datalabels';
import {SelectItem} from 'primeng/api';
import {IEmployee} from 'node_modules/ng2-org-chart/src/employee';
import {TreeNode} from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { first } from 'rxjs/operators';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [`
  .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
    padding: 0;
    border: 0 none;
    height: 50%;
}

.node-header,.node-content {
    padding: .4em .4em;
}

.node-header {
    background-color: #7E7E7E;
    color: #ffffff;
    font-size:8pt;
}

.node-content {
    background-color: #FAE716;
    text-align: center;
    border: 1px solid #7E7E7E;
    font: {
      weight:'bold',
      size:8
    }
}

.node-content img {
    border-radius: 50%;
}

.ui-organizationchart-node-content.department-cfo {
    background-color: #7E7E7E;
    color: #ffffff;
}

.ui-organizationchart-node-content.department-coo {
    background-color: #7E7E7E;
    color: #ffffff;
}

.ui-organizationchart-node-content.department-cto {
    background-color: #7E7E7E;
    color: #ffffff;
}

.ui-person .ui-node-toggler {
    color: #7E7E7E !important;
}

.department-cto .ui-node-toggler {
    color: #7E7E7E !important;
}
.chart__wrapper {
  display: block;
  border: 1px solid #c8c8c8;
  padding: 30px 10px;
}

p-progressSpinner {
  opacity: 0.3;
}
    `],
    encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ReportsComponent implements OnInit {

    data: TreeNode[];
    checked2: boolean = false;;
    cols: any[];
  cities1: SelectItem[];
    
    cities2: City[];

    selectedCity1: City;
    
    selectedCity2: City;

  constructor(private candidatureDetailsService : CandidatureDetailsService,
    private messageService:MessageService,private router: Router,private ref: ChangeDetectorRef) { 

  //An array of cities
  this.cities2 = [
      {name: 'Client', code: 'client'},
      {name: 'Location', code: 'location'}
  ];
  }
  yaxisscale =0;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 0
      }
  },
    plugins: {
      datalabels: {
        display: function(context) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
       },
        color: '#000000',
        font: {
          weight:'bold',
          size:12
        },
        align:'end',
        anchor:'end', 
        padding: {top: 1},
        formatter: Math.round
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 10
    }
    },
    scales: {
    yAxes: [{
         ticks: {
            max: 0
        }
        

    }]
}
  };
  public backgroundColor= [
  {
       backgroundColor: '#FAE716'
     },
     {
       backgroundColor: '#79D2C5'
     },
     {
       backgroundColor: '#7E7E7E'
     },
     {
        backgroundColor: '#C1B2C3'
      },
      {
        backgroundColor: '#3B5572'
      }
   ];
  public barChartLabels = [];
  public barChartyAxisID = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 28, 30, 29, 56, 17, 19], label: 'Series C'},
    // {data: [19, 29, 39, 0, 58, 19, 21], label: 'Series D'}
  ];

  handleChange(e) {
    this.barChartData.length=0;
    this.barChartLabels.length=0;
        this.candidatureDetailsService.getCandidaturesReports(e.value.code).subscribe(candidatureFromService => { 
            this.data=candidatureFromService;
       
              });
      
          this.candidatureDetailsService.getCandidaturesReportsBarGraph(e.value.code).subscribe(candidatureFromService => { 
          this.barChartData=candidatureFromService.chartDatasets;
          this.barChartLabels=candidatureFromService.chartLabels;
          this.barChartOptions.scales.yAxes[0].ticks.max=candidatureFromService.yaxisScale;
             
          }); 
}

  ngOnInit() {
    this.cols = [
        // { field: 'contactNo', header: 'ID' },
         { field: 'roleOfResponsibilities', header: 'FIELD' },
         { field: 'candidateName', header: 'COUNT' }
     ];

     this.candidatureDetailsService.getCandidaturesReports('client').subscribe(candidatureFromService => { 
      this.data=candidatureFromService;
 
        });

    this.candidatureDetailsService.getCandidaturesReportsBarGraph('client').subscribe(candidatureFromService => { 
    this.barChartData=candidatureFromService.chartDatasets;
    this.barChartLabels=candidatureFromService.chartLabels;
    this.barChartOptions.scales.yAxes[0].ticks.max=candidatureFromService.yaxisScale;
       
    });

  }

  onNodeSelect(event) {
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
}

}
