import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators ,ValidationErrors} from '@angular/forms';
import { CandidatureDetails } from '../_models';
import { MessageService } from 'primeng/components/common/messageservice';
import { AlertService } from '../_services';
import {ClientService} from '../client/client.service'

export const EMAIL_PATTERN = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
@Component({
  selector: 'add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  providers: [MessageService]
})

export class AddCandidateComponent implements OnInit {
  currentStepUI: string   ="ui-steps-item ui-state-highlight ui-steps-current";
  nextStepUI:    string   ="ui-steps-item ui-state-default";

  CandidatureDetails: FormGroup;
  model: CandidatureDetails;
  activeIndex: number = 0;
  showFormErrors:boolean=false;
  step1Css: string=this.currentStepUI;
  step2Css: string=this.nextStepUI;
  step3Css: string=this.nextStepUI;
  step4Css: string=this.nextStepUI;
  interviewStatusList: string[] =["Scheduled","In progress", "Selected","Not selected"];
  finalStatusList: string[] =["Yet to screen", "Screening in Progress", "Interviews in Progress","Offer in Progress","Offer Released","Joined"];
  locationList: string[]=[];
  clientList: string[]=[];
  statusList:string[] =["Shortlisted","Not shortlisted"];
  mohList: string[]=["Permanent","Contract"];
  profileStatusList: string[] =["Active","Inactive"];
  selectedCandidate:CandidatureDetails;

  constructor(
    private fb: FormBuilder,
    private candidatureDetailsService: CandidatureDetailsService,
    private messageService: MessageService,
    private router: Router,
    private alertService: AlertService,
    private clientService: ClientService) {
    // this.objectKeys = Object.keys;

  }

  ngOnInit() {
    this.activeIndex = 1;
    this.CandidatureDetails = this.fb.group({

      //Personal details
      candidateName: ['', [Validators.required]],
      contactNo: ['', [Validators.required, Validators.minLength(10),Validators.pattern('[1-9]{1}[0-9]{9}')]],
      emailId: ['', [Validators.required,Validators.pattern(EMAIL_PATTERN)]],
	    currentLocation: [''],
	    positionLocation: [''],
	    preferredLocation: [''],
      totalExperience: [''],
      relevantExperience: [''],
      noticePeriod: ['',[Validators.required, Validators.max(90)]],
      ctc: ['',[Validators.required]],
      ectc: [''],
	    roleOfResponsibilities: ['', [Validators.required]],
      vendorName: [''],
    //Interview details
      modeOfHiring: ['',[Validators.required]],
      profileSharedDate: [''],
      screeningStatus: [''],
      screeningDate: [''],
      screeningDoneBy: [''],
      firstRoundStatus: [''],
      firstRoundDate: [''],
      firstRoundTakenBy: [''],
      secondRoundStatus: [''],
      secondRoundDate: [''],
      secondRoundTakenBy: [''],
      finalRoundStatus: [''],
      finalRoundDate: [''],
      finalRoundTakenBy: [''],
      //HR round details
      hrOrPnStageRound: [''],
      hrOrPnStageStatus: [''],
      hrOrPnStageDate: [''],
      candidatureStatus: [''],
      finalStatus: [''],
      status: [''],
      description: [''],
      offerRollOutDate: [''],
      joiningDate: [''],
      joiningStatus: [''],
	  //Other
      nhrId: [''],
      comments: [''],
      action: [''],
      actionPending: [''],
      client: [''],
     // profile: [''],
     // lastUpdateDate: [''], 
      profileStatus:[''],
     // statusUpdatedDate:[''],
      expectedJoiningDate:[''],
      finalTechSelectionDate:['']
    })
this.locationList = ["Bangalore", "Chennai", "Gurgaon", "Hyderabad", "Noida", "Pune", "Other"];
//this.clientList=["Dell","Unilever","EMC","Other"];
this.getAllClients();


}

getAllClients(){
  this.clientService.getAllCients().subscribe(data => {
   data.forEach(client=>{
    this.clientList.push(client.clientName);
    if(!this.locationList.includes(client.location))
        this.locationList.push(client.location);
   })
  })
}
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
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

    return pattern;
  }

  addCandidate() {
    this.messageService.clear();
    this.selectedCandidate = this.CandidatureDetails.value;
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }
  onConfirm() {
    this.messageService.clear('c');
    this.candidatureDetailsService.saveCandidature(this.CandidatureDetails.value).subscribe(
      data => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Candidate added successfully.' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong. Operation failed.' });
      });
   // this.alertService.success('Candidate Added successfully', true);
   // this.router.navigate(['/home']);   
   }
   
   onReject() {
    this.messageService.clear('c');
    this.selectedCandidate = null;
   }
   // convenience getter for easy access to form fields
   get f() { return this.CandidatureDetails.controls; }

  isFormValid(form:FormGroup): boolean{
    if (form.invalid) {
      // console.log("Form is Invalid");
      // Object.keys(form.controls).forEach(key => {

      //   const controlErrors: ValidationErrors = form.get(key).errors;
      //   if (controlErrors != null) {
      //         Object.keys(controlErrors).forEach(keyError => {
      //           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      //         });
      //       }
      //     });

      return false;
  }
    return true;
  }

  changeStep(step:number){
    window.scroll(0,0);
    if(this.isFormValid(this.CandidatureDetails)){
      this.showFormErrors=false;
    }else{
      this.showFormErrors=true;
     return;
    }     
    this.step1Css=this.nextStepUI;
    this.step2Css=this.nextStepUI;
    this.step3Css=this.nextStepUI;
    this.step4Css=this.nextStepUI;
    this.activeIndex=step;
    switch(step){
      case 1: this.step1Css=this.currentStepUI;
           break;
      case 2: this.step2Css=this.currentStepUI;
           break;
      case 3: this.step3Css=this.currentStepUI;
           break;
      case 4: this.step4Css=this.currentStepUI;
           break;
    }
  }
}