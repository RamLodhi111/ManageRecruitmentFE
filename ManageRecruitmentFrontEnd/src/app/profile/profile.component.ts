import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Mappings from './profile.mappings';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';
import { CandidatureDetails } from './../_models/candidatureDetails';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import {ClientService} from '../client/client.service'
import {FormGroup,FormBuilder,AbstractControl,Validators} from '@angular/forms';
import { USER_ROLE } from '../_services/jwtauth-services.service';
import {EMAIL_PATTERN} from '../add-candidate/add-candidate.component'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  id: string;
  private sub: any;
  profile: any;
  keys: string[];
  mapping_keys: string[];
  excludable_keys_in_display_mode: any;
  is_editable: boolean = false;
  fromButtonValue:string;
  selectedCandidature: CandidatureDetails;
  CandidatureDetails:FormGroup;
  candidateID:string;

  currentStepUI: string   ="ui-steps-item ui-state-highlight ui-steps-current";
  nextStepUI:    string   ="ui-steps-item ui-state-default";
  activeIndex: number = 0;
  showFormErrors:boolean=false;
  step1Css: string=this.nextStepUI;
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
  isAdmin=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatureDetailsService : CandidatureDetailsService,
    private messageService:MessageService,
    private fb:FormBuilder,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    
    this.excludable_keys_in_display_mode = ['candidateName', 'roleOfResponsibilities', 'totalExperience'];
    let snapshot = this.route.snapshot.paramMap.get('slug');
    this.profile = JSON.parse(atob(snapshot));
    this.candidateID = this.profile.id;
    delete this.profile.id;
    this.keys = Object.keys(this.profile);
   
    this.mapping_keys = Mappings;

    this.activeIndex = 2;
    this.step2Css=this.currentStepUI;

    this.CandidatureDetails=this.fb.group({
           
        roleOfResponsibilities:[this.profile['roleOfResponsibilities'],[Validators.required]],
        positionLocation:[this.profile['positionLocation']],
        candidateName:[this.profile['candidateName'],[Validators.required]],
        contactNo:[this.profile['contactNo'],[Validators.required,this.validatePhoneNum.bind(this)]],
        emailId:[this.profile['emailId'],[Validators.required,Validators.pattern(EMAIL_PATTERN)]],
        totalExperience:[this.profile['totalExperience']],
        relevantExperience:[this.profile['relevantExperience']],
        noticePeriod:[this.profile['noticePeriod'], [Validators.required,Validators.max(90)]],
        ctc:[this.profile['ctc']],
        ectc:[this.profile['expectedCTC']],
        currentLocation:[this.profile['currentLocation']],
        preferredLocation:[this.profile['preferredLocation']],
        modeOfHiring:[this.profile['modeOfHiring']],
        vendorName:[this.profile['source']],
        profileSharedDate:[this.d(this.profile['profileSharedDate'])],
        screeningStatus:[this.profile['screeningStatus']],
        screeningDate:[this.d(this.profile['screeningDate'])],
        screeningDoneBy:[this.profile['screeningDoneBy']],
        firstRoundStatus:[this.profile['firstRoundStatus']],
        firstRoundDate:[this.d(this.profile['firstRoundDate'])],
        firstRoundTakenBy:[this.profile['firstRoundTakenBy']],
        secondRoundStatus:[this.profile['secondRoundStatus']],
        secondRoundDate:[this.d(this.profile['secondRoundDate'])],
        secondRoundTakenBy:[this.profile['secondRoundTakenBy']],
        finalRoundStatus:[this.profile['finalRoundStatus']],
        finalRoundDate:[this.d(this.profile['finalRoundDate'])],
        finalRoundTakenBy:[this.profile['finalRoundTakenBy']],
        hrOrPnStageRound:[this.profile['hrOrPnStageRound']],
        hrOrPnStageStatus:[this.profile['hrOrPnStageStatus']],
        hrOrPnStageDate:[this.d(this.profile['hrOrPnStageDate'])],
        candidatureStatus:[this.profile['roleOfResponsibilities']],
        finalStatus:[this.profile['finalStatus']],
        status:[this.profile['status']],
        description:[this.profile['description']],
        offerRollOutDate:[this.profile['roleOfResponsibilities']],
        joiningDate:[this.d(this.profile['expectedJoiningDate'])],
        joiningStatus:[this.profile['roleOfResponsibilities']],
        nhrId:[this.profile['roleOfResponsibilities']],
        comments:[this.profile['roleOfResponsibilities']],
        action:[this.profile['roleOfResponsibilities']],
        actionPending:[this.profile['actionPending']],
        client:[this.profile['client']],
        profileStatus:[this.profile['profileStatus']],
        finalTechSelectionDate:[this.d(this.profile['finalTechSelectionDate'])]
    })
    this.locationList = ["Bangalore", "Chennai", "Gurgaon", "Hyderabad","Noida", "Pune", "Other"];
    this.getAllClients();
    //this.clientList=["Dell","Unilever","EMC","Other"];   

    if('ROLE_ADMIN'===sessionStorage.getItem(USER_ROLE))
            this.isAdmin=true;
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

  d(date: string):string{
    if(date=="") return
    const currentDate = new Date(date);
    return currentDate.toISOString().substring(0,10);
  }
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
    //console.log("Is form has errors :: "+this.showFormErrors)
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

  toggleEditState() {
    this.is_editable = !this.is_editable;
  }

  save() {
    this.candidatureDetailsService.updateCandidature(this.selectedCandidature)
         .pipe(first()).subscribe(
             data => {
                      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data updated successfully.'});
                     },
         error => {
             this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});
         });
         
        // this.router.navigate(['/home']);

}

delete() {
 this.candidatureDetailsService.deleteCandidature(this.selectedCandidature.id)
     .pipe(first())
     .subscribe(
         data => {
             this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data Deleted successfully.'});
             
         },
     error => {
         this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

     });

    //   this.router.navigate(['/home']);
     
}
showConfirm(frombutton:any,rowData:any) {
 this.messageService.clear();
 this.fromButtonValue = frombutton;
 this.selectedCandidature = this.CandidatureDetails.value;
 this.selectedCandidature.id=this.candidateID;
this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
 
}

onConfirm() {
 this.messageService.clear('c');
 if(this.fromButtonValue =='fromsave'){
     this.save();
    
 }else if(this.fromButtonValue == 'fromdelete'){
     this.delete();
 }

}

onReject() {
 this.messageService.clear('c');
 this.selectedCandidature = null;
 this.fromButtonValue = null;
}

validatePhoneNum(control: AbstractControl) {
    const pattern = /^([0-9\.]+)$/;
    if(null!=control.value){
            if (!control.value.match(pattern))
                 return { invalidEmail: true };
            else
                 return null;
        }
  }

validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!control.value.match(pattern)) {
      return { invalidEmail: true };
    }

    return null;
  }

}
