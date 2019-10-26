import { SummaryDataClient } from './../_models/summaryDataClient';
import { ChartData } from './../_models/chartData';
import { Component, OnInit } from '@angular/core';

import { CandidatureDetails } from './../_models/candidatureDetails';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { first } from 'rxjs/operators';
import { chart } from '../_models/chart';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  constructor(private candidatureDetailsService : CandidatureDetailsService,
    private messageService:MessageService,private router: Router){
     
  }
  
  public value:string="Client";
  chartRawData: chart;
  cols: any[];
  summaryDataClientArray: SummaryDataClient[] = [];
  summaryDataTestArray:SummaryDataClient[] = [];
  summaryDataTestArray2:SummaryDataClient[] = [];
  candidatureDetailsArray:CandidatureDetails[]=[];
  showSubTable:boolean;
  showSummaryTable:boolean;
  showChart:boolean;
  public checkboxselect:string;
  public pie_chartLabels: Array<String> = [];
  public pie_chartDatasets: Array<any> = [];
  public pie_chartType: string = 'bar';
  public pie_chartColors: Array<any> = [];
 

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
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
        formatter: Math.round
      }
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 15
    }
    },
    scales: {
    yAxes: [{
         ticks: {
            max: 0,
            stepSize:2
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

  ngOnInit(){
    this.showSummaryTable=true;
    this.showSubTable=false;
    this.cols = [
      // { field: 'contactNo', header: 'ID' },
       { field: 'roleOfResponsibilities', header: 'ROLE' },
       { field: 'candidateName', header: 'CANDIDATE NAME' },
       { field: 'contactNo', header: 'CONTACT NO' }
   ];
   this.showChart = true;
   this.loadAllChartDetails('client');
   this.pie_chartType='bar';
   this.checkboxselect='client';
    
  }
  onRadioSelect(e,valuePassed) {
    if(e.target.checked){
        this.showSubTable=false;
        this.value=valuePassed;
        this.loadAllChartDetails(valuePassed);
        this.showChart = true;
        this.showSummaryTable=true;
        this.checkboxselect=valuePassed;
        
    }
 }


 displaySubTable(rowPassed:any,colSelected:any){
  
  this.candidatureDetailsService.getCandidaturesSecondaryChart(this.value,rowPassed,colSelected).pipe(first()).subscribe(candidatureFromService => { 
  this.candidatureDetailsArray = candidatureFromService; 
  this.showSubTable= true ;
  });
 }

    loadAllChartDetails(criteria : string) {
      this.pie_chartLabels.length=0;
      this.pie_chartDatasets.length=0;

      
       this.candidatureDetailsService.getCandidaturesChart(criteria).subscribe(candidatureFromService => { 
       this.pie_chartLabels=candidatureFromService.chartLabels;
       this.pie_chartDatasets=candidatureFromService.chartDatasets;
       this.barChartOptions.scales.yAxes[0].ticks.max=parseInt(candidatureFromService.yaxisScale);
       });
}

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

onRowSelect(event) {
  let slugified_data = JSON.stringify(event.data);
  let passable_data = "";
  if(slugified_data) {
      passable_data = btoa(slugified_data);
      this.router.navigate(['/profile/' +  passable_data]);
  }
  
}


  
  

}
