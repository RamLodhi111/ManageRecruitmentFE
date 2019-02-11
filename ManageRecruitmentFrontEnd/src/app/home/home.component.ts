﻿import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { MdbTablePaginationComponent,MdbTableService } from 'angular-bootstrap-md';
import { Component, Input,OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormBuilder,FormControl,AbstractControl,Validators} from '@angular/forms';
import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { UserService } from '../_services';

import {ExcelService} from '../_services/excel.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [MessageService]
})
export class HomeComponent implements OnInit {
    
    cols: any[];
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    candidatures: CandidatureDetails[] = [];
    candidature: CandidatureDetails ;
    selectedCandidature: CandidatureDetails;
    fromButtonValue:string;
    newCandidature: boolean;
    add_candidate:boolean=true;
    CandidatureDetails:FormGroup;
    


    constructor(
        private fb:FormBuilder,
        private candidatureDetailsService: CandidatureDetailsService,
        private tableService:MdbTableService, 
        private cdRef: ChangeDetectorRef,
        private excelService:ExcelService,
        private messageService:MessageService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.objectKeys = Object.keys;
       
    }

    ngOnInit() {
        this.CandidatureDetails=this.fb.group({
           
            roleOfResponsibilities:['',[Validators.required]],
            positionLocation:[''],
            candidateName:['',[Validators.required]],
            contactNo:['',[Validators.required,this.validatePhoneNum.bind(this)]],
            emailId:['',[Validators.required,this.validateEmail.bind(this)]],
            totalExperience:[''],
            relevantExperience:[''],
            noticePeriod:[''],
            ctc:[''],
            ectc:[''],
            currentLocation:[''],
            preferredLocation:[''],
            modeOfHiring:[''],
            vendorName:[''],
            profileSharedDate:[''],
            screeningStatus:[''],
            screeningDate:[''],
            screeningDoneBy:[''],
            firstRoundStatus:[''],
            firstRoundDate:[''],
            firstRoundTakenBy:[''],
            secondRoundStatus:[''],
            secondRoundDate:[''],
            secondRoundTakenBy:[''],
            finalRoundStatus:[''],
            finalRoundDate:[''],
            finalRoundTakenBy:[''],
            hrOrPnStageRound:[''],
            hrOrPnStageStatus:[''],
            hrOrPnStageDate:[''],
            candidatureStatus:[''],
            finalStatus:[''],
            status:[''],
            description:[''],
            offerRollOutDate:[''],
            joiningDate:[''],
            joiningStatus:[''],
            nhrId:[''],
            comments:[''],
            action:[''],
            actionPending:[''],
            client:[''],
            profile:[''],
            lastUpdateDate:['']
            
        })



        this.loadAllCandidatureDetails();
        this.cols = [
           // { field: 'contactNo', header: 'ID' },
            { field: 'roleOfResponsibilities', header: 'ROLE' },
            { field: 'candidateName', header: 'CANDIDATE NAME' },
            { field: 'contactNo', header: 'CONTACT NO' },
            { field: 'emailId', header: 'EMAIL-ID' },
            { field: 'status', header: 'STATUS' }
            
        ];


              
    }

    validatePhoneNum(control: AbstractControl) {
        const pattern = /^([0-9\.]+)$/;
  
        if (!control.value.match(pattern)) {
          return { invalidEmail: true };
        }
  
        return null;
      }

    validateEmail(control: AbstractControl) {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  
        if (!control.value.match(pattern)) {
          return { invalidEmail: true };
        }
  
        return null;
      }

    onRowSelect(event) {
        let slugified_data = JSON.stringify(event.data);
       // console.log("Sandeep "+event.data);
        let passable_data = "";
        if(slugified_data) {
            passable_data = btoa(slugified_data);
            this.router.navigate(['/profile/' +  passable_data]);
        }
        
    }

     
    private loadAllCandidatureDetails() {
        
        // FOR DEMO PURPOSE
     //this.candidatures = [{"id":"5bff9282816fdf03003b9a81","roleOfResponsibilities":"Lead Full stack Developer (.Net)","positionLocation":"NCR","candidateName":"Bhanu Pratap Verma","contactNo":"9911695811","emailId":"vermabhanu009@gmail.com","totalExperience":"8.4 Yrs.","relevantExperience":"5","noticePeriod":"3 Months","currentLocation":"Noida","preferredLocation":"Bangalore","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Rejected/Not Shortlisted","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/13/18"},{"id":"5bff9282816fdf03003b9a82","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Laldhari","contactNo":"9512121211","emailId":"laldhari@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"},{"id":"5bffdb686e4c0e37cba4fd73","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Rajasekar","contactNo":"9512121212","emailId":"raj@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"},{"id":"5bffdbb36e4c0e37cba4fd8a","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Virat","contactNo":"9512121215","emailId":"virat@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"}];
        
        // INTERACTING WITH ACTUAL BACKEND
           this.candidatureDetailsService.getCandidatures().pipe(first()).subscribe(candidatureFromService => { 
           this.candidatures = candidatureFromService; 

           });
    }

    exportAsXLSX():void {
        this.excelService.exportAsExcelFile(this.candidatures, 'Supply');
     }

     toggleAddState(){
        this.add_candidate=!this.add_candidate;
    }

    DisplayOnConsole():void{
        
        //console.log(this.CandidatureDetails);
        console.log("Candidate Details Start");

       let addCandidate:String=JSON.parse(JSON.stringify(this.CandidatureDetails.value));
       console.log(addCandidate);
       console.log("Candidate Details End");
        this.candidatureDetailsService.saveCandidature(addCandidate).subscribe(res => {
             console.log("In subscribe method");
             console.table(res); 
        }
        )
    }
     

    

    
}