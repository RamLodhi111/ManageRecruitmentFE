
import { Component, OnInit } from '@angular/core';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { CandidatureDetails } from '../_models';
import { first } from 'rxjs/operators';
import { chart } from '../_models/chart';
import { Summary } from '../_models/summary';
import { CandidateSummary } from '../_models/candidateSummary'
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summarylist: Summary[];
  public pie_chartType: string = 'bar';
  chartRawData: chart;

  public pie_chartLabels: Array<String> = [];
  public pie_chartDatasets: Array<any> = [];
  //Candidate summary
  candidatures: CandidatureDetails[] = [];
  candidateSummary: CandidateSummary[] = [];
  cols: any[];
  firstTableCols: any[];
  frozenTableCols: any[];
  clients: SelectItem[];
  locations: SelectItem[];
  status: SelectItem[];
  role : any[];
  selectedRole: string;

  constructor(private candidatureDetailsService: CandidatureDetailsService) {
  }

  ngOnInit() {
    /*this.candidatureDetailsService.getCandidaturesChart('client').pipe(first()).subscribe(candidatureFromService => { 
    this.chartRawData = candidatureFromService; 
    console.log('chartRawData ::' +this.chartRawData.chartDatasets[1].data);
    this.pie_chartLabels=this.chartRawData.chartLabels;
    this.pie_chartDatasets=this.chartRawData.chartDatasets;
    if(this.pie_chartLabels.length>0){
    this.showTable=true;
    }
    });*/

    this.candidatureDetailsService.getClientSummary().subscribe(
      data => {
        console.log(data);
        this.summarylist = data;

      },
      error => {
        console.log("Error", error);
      });
    //Candidature summary changes :: 
    this.loadAllCandidatureDetails();
    this.frozenTableCols=
    [
      { field: 'clientName', header: 'Client Name' }
    ]; 
    this.firstTableCols=
    [
      { field: 'leadName', header: 'Lead Name' },
      { field: 'location', header: 'Location' },
      { field: 'skill', header: 'Skill' },
      { field: 'contractMechanism', header: 'Status' },
      { field: 'target', header: 'Target' },
      { field: 'interviewInProgress', header: 'Interview InProgress' },
      { field: 'joined', header: 'Joined' },
      { field: 'offerInProgress', header: 'Offer InProgress' },
      { field: 'screeningInProgress', header: 'Screening InProgress' },
      { field: 'offerReleased', header: 'Offer Released' }
    ];

    this.cols = [
      { field: 'candidateName', header: 'Candidate Name' },
      { field: 'clientName', header: 'Client Name' },
      { field: 'skills', header: 'Skills' },
      { field: 'status', header: 'Status' },
      { field: 'emailId', header: 'Email id' },
      { field: 'location', header: 'Location' },
      { field: 'expectedToJoin', header: 'Expected to Join' },
      { field: 'finalTechSelection', header: 'Fnal Tech Selection' }
    ];
    this.clients = [
      { label: 'Dell', value: 'Dell' },
      { label: 'Unilever', value: 'Unilever' },
      { label: 'EMC', value: 'EMC' },
    ];

    this.locations = [
      { label: 'All', value: null },
      { label: 'Bangalore', value: 'Bangalore' },
      { label: 'Pune', value: 'Pune' },
      { label: 'Nioda', value: 'Noida' },
      { label: 'Gurgaon', value: 'Gurgaon' },
    ];
    this.status = [
      { label: 'All', value: null },
      //{ label:'Yet to screen', value:'Yet to screen'},
      { label: 'Offer In Progress', value: 'Offer In Progress' },
      { label: 'Offer Released', value: 'Offer Released' },
      { label: 'Joined', value: 'Joined' }
      // ,{ label:'Dropout', value:'Dropout'},
    ];

    this.role= [{name: 'Client', code: 'Client Status'},
    {name: 'Candidate', code: 'Candidate Status'}];
    this.selectedRole =this.role[0];

  }


  //Method to get entire candidate details from API
  private loadAllCandidatureDetails() {
    this.candidatureDetailsService.getCandidatures().pipe(first()).subscribe(candidatureFromService => {
      this.candidatures = candidatureFromService;
      this.candidatures.forEach(candidate => {
        if (candidate.status != '1st round scheduled') {
          let currentCandidate: CandidateSummary = {
            candidateName: candidate.candidateName,
            clientName: candidate.client,
            skills: candidate.roleOfResponsibilities,
            status: candidate.status,
            emailId: candidate.emailId,
            expectedToJoin: candidate.expectedJoiningDate,
            location: candidate.positionLocation,
            finalTechSelection: candidate.finalTechSelectionDate
          };
          this.candidateSummary.push(currentCandidate);
          //console.log("current candidate :: " + JSON.stringify(currentCandidate));
        }
      })
    });
  }


  public getColourCode(field: any,header:any): string {
    console.log(" colour code for "+header)
    let colourCode: string = "default";
    switch (field) {
      case 'Joined':
        colourCode = "joined";
        break;
      case 'Offer Released':
        colourCode = "OfferRelaesed";
        break;
      case 'Offer in Progress':
        colourCode = "OfferRelaesed";
        break;
      case 'InProgress':
        colourCode = "OfferInProgress";
        break;
      case 'YetToStart':
        colourCode = "Yet-to-start";
        break;
    }
    switch (header) {
      case 'Joined':
        colourCode = "joined";
        break;
      case 'Offer Released':
        colourCode = "OfferRelaesed";
        break;
      case 'Offer InProgress':
        colourCode = "OfferInProgress";
        break;
    }
    // console.log(" id returned :: "+colourCode);

    return colourCode;

  }

  public getColorCodeByDate(field: any, candidate:CandidateSummary): string {
     console.log(" colour code for by date "+field)
    let colourCode: string = "default";
    switch (field) {
      case 'Offer in Progress':
        colourCode = this.calculateDateDifference(candidate.finalTechSelection);
        break;

      default:
        colourCode =this.getColourCode(field,'');
    }
    console.log(" id returned :: "+colourCode);

    return colourCode;

  }

//Function to calculate the number of days difference in given date compared to current date
public calculateDateDifference(techSelectionDate: string): string{
 const diff = Math.abs(new Date().getTime() - new Date(techSelectionDate).getTime());
 const diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
  if(diffDays>=7)
    return "Yet-to-start";
  else 
   return "OfferRelaesed";
}


  //Changes end       
  public pie_chartClicked(e: any): void {
    console.log(e);
  }
  public pie_chartHovered(e: any): void {
    console.log("on hover " + e);

  }

} 
