import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { MdbTablePaginationComponent, MdbTableService } from 'angular-bootstrap-md';
import { Component, Input, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { UserService } from '../_services';

import { ExcelService } from '../_services/excel.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AlertService } from '../_services';
import { USER_ROLE } from '../_services/jwtauth-services.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None,

    providers: [MessageService]
})
export class HomeComponent implements OnInit {
    selectedValues: string[] = [];

    cols: any[];
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    candidatures: CandidatureDetails[] = [];
    candidature: CandidatureDetails;
    selectedCandidatures: CandidatureDetails[] = [];
    a: CandidatureDetails;
    fromButtonValue: string;
    newCandidature: boolean;
    add_candidate: boolean = true;
    CandidatureDetails: FormGroup;
    step;
    showFormError: boolean = false;
    isAdmin=false;
    filetrValue:string=null;



    constructor(
        private fb: FormBuilder,
        private candidatureDetailsService: CandidatureDetailsService,
        private tableService: MdbTableService,
        private cdRef: ChangeDetectorRef,
        private alertService: AlertService,
        private excelService: ExcelService,
        private messageService: MessageService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.objectKeys = Object.keys;

    }

    ngOnInit() {
        this.step = 1;
        this.CandidatureDetails = this.fb.group({

            roleOfResponsibilities: ['', [Validators.required]],
            positionLocation: [''],
            candidateName: ['', [Validators.required]],
            contactNo: ['', [Validators.required, this.validatePhoneNum.bind(this)]],
            emailId: ['', [Validators.required, this.validateEmail.bind(this)]],
            totalExperience: [''],
            relevantExperience: [''],
            noticePeriod: [''],
            ctc: [''],
            ectc: [''],
            currentLocation: [''],
            preferredLocation: [''],
            modeOfHiring: [''],
            vendorName: [''],
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
            nhrId: [''],
            comments: [''],
            action: [''],
            actionPending: [''],
            client: [''],
            profile: [''],
            lastUpdateDate: ['']

        })



        this.loadAllCandidatureDetails();
        this.cols = [
            // { field: 'contactNo', header: 'ID' },
            { field: 'roleOfResponsibilities', header: 'ROLE' },
            { field: 'candidateName', header: 'CANDIDATE NAME' },
            { field: 'contactNo', header: 'CONTACT NO' },
            { field: 'emailId', header: 'EMAIL-ID' },
            { field: 'finalStatus', header: 'STATUS'}

        ];
        if('ROLE_ADMIN'===sessionStorage.getItem(USER_ROLE))
            this.isAdmin=true; 

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
        let passable_data = "";
        if (slugified_data) {
            passable_data = btoa(slugified_data);
            this.router.navigate(['/profile/' + passable_data]);
        }

    }
    
    editCandidate(){
    if (this.selectedCandidatures.length >= 1) {
        let slugified_data = JSON.stringify(this.selectedCandidatures[0]);
        let passable_data = "";
        if (slugified_data) {
                 passable_data = btoa(slugified_data);
                 this.router.navigate(['/profile/' + passable_data]);
            }
         }
    }


    viewCandidate(data:any){
    
            let slugified_data = JSON.stringify(data);
            let passable_data = "";
            if (slugified_data) {
                     passable_data = btoa(slugified_data);
                     this.router.navigate(['/profile/' + passable_data]);
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

    exportAsXLSX(): void {
        this.excelService.exportAsExcelFile(this.candidatures, this.filetrValue,'Supply');
    }

    toggleAddState() {
        this.add_candidate = !this.add_candidate;
        this.router.navigate(['/addCandidate']);
    }

    DisplayOnConsole(): void {
        let addCandidate: String = JSON.parse(JSON.stringify(this.CandidatureDetails.value));
        this.candidatureDetailsService.saveCandidature(addCandidate).subscribe(res => { 
        }
        )
    }


    deleteCandidate() {
        //for multiple recorrd
        if (this.selectedCandidatures.length > 1) {
            this.candidatureDetailsService.deleteCandidate(this.selectedCandidatures).subscribe(candidateFromService => {
                this.candidatures = candidateFromService;
                this.selectedCandidatures = [];
                this.alertService.success('Record deleted successful', false);
            })
        }
        else if (this.selectedCandidatures.length == 1) {
            this.candidatureDetailsService.deleteCandidature(this.selectedCandidatures[0].id).subscribe(res => {
                 this.candidatures=res;
                this.selectedCandidatures = [];
                this.alertService.success('Record deleted successful', false);
            });
        }

    }


}