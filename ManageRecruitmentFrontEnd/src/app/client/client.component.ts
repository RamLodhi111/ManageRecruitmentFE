import { USER_ROLE } from './../_services/jwtauth-services.service';
import { CheckboxModule } from 'primeng/checkbox';
import { AlertService } from './../_services/alert.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AddClient } from './../_models/addClient';
import { ClientService } from './client.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private clients: AddClient[];
  cols: any[];
  private selectedClients: AddClient[];
  addClientForm: FormGroup;
  loading = false;
  submitted = false;
  isAdmin = false;
  add_client: boolean = false;
  isButtonDisabled: boolean = true;
  userAcess:String;
  isEditale: boolean = false;
  clientOpts: string = "Add Client";
  locationList: string[] = [];
  contractMechanismList:string[] = ["Permanent","Contract"];
  // filteredClients: Observable<string[]>;
  // clientNames: string[] = new Array;


  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {



    this.clientService.getAllCients().subscribe(data => {
      this.clients = data;

      // var L = this.clients.length;
      // for (var i = 0; i < L; i++) {
      //   var obj = this.clients[i];
      //   this.clientNames.push(obj.clientName);
      // }
    //console.log(this.clientNames);
    })

    this.cols = [

      { field: 'clientName', header: 'Client Name' },
      { field: 'contractMechanism', header: 'Contract Mechanism' },
      { field: 'leadName', header: 'Lead Name' },
      { field: 'location', header: 'Location' },
      { field: 'skill', header: 'Skill' },
      { field: 'target', header: 'Target' }

    ];

    this.addClientForm = this.formBuilder.group({
      clientName: ['', [Validators.required]],
      leadName: ['', [Validators.required]],
      location: ['', [Validators.required]],
      skill: ['', [Validators.required,]],
      contractMechanism: ['', [Validators.required]],
      target: ['', [Validators.required]],

    });

    // this.filteredClients = this.addClientForm.controls['clientName'].valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    //console.log('filter after >> '+JSON.stringify(this.filteredClients));
    this.locationList = ["Bangalore", "Chennai", "Gurgaon", "Noida", "Pune", "Hyderabad", "Other"];

    this.userAcess = sessionStorage.getItem(USER_ROLE);
    if(this.userAcess==='ROLE_ADMIN')
        this.isAdmin=true;  

  }



  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.clientNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  deleteClients() {
    if (this.selectedClients == undefined || this.selectedClients.length <= 0) {
      this.alertService.error('Please Select atleast one record to delete', true);
    }
    else {
      if (this.selectedClients.length > 1) {
        this.clientService.deleteClients(this.selectedClients).subscribe(clientsFromService => {
          this.clients = clientsFromService;
          this.addClientForm.reset();
          this.selectedClients = [];
          this.alertService.success('Clients Deleted successfully', false);
          this.router.navigate(['/client']);
        })
      }
      else if (this.selectedClients.length == 1) {
        this.clientService.deleteClient(this.selectedClients[0].id).subscribe(clientsFromService => {
          this.clients = clientsFromService;
          this.addClientForm.reset();
          this.selectedClients = [];
          this.alertService.success('Client Deleted successfully', false);
          this.router.navigate(['/client']);
        });
      }

    }

  }

  addClient(clientOpts) {
    if (clientOpts == "Add Client") {
      this.submitted = false;
      if (this.addClientForm.invalid) {
        return;
      }
      this.clientService.addClient(this.addClientForm.value).subscribe(
        data => {
          this.alertService.success('Client Added successful', false);
          this.add_client = false;
          this.clients = data;
          this.router.navigate(['/client']);
        },
        error => {
          this.add_client = false;
          this.alertService.error(error);
          this.loading = false;
          this.router.navigate(['/client']);
        });
    } else if (clientOpts = "Update Client") {
      this.submitted = true;
      if (this.addClientForm.invalid) {
        return;
      }
      var val = this.addClientForm.getRawValue().clientName;
      this.addClientForm.controls.clientName.setValue(val);
      this.clientService.updateClient(this.addClientForm.value).subscribe(
        data => {
          this.alertService.success(val + ' :: Client Updated successful', false);
          this.selectedClients = [];
          this.add_client = false;
          this.clients = data;
          this.router.navigate(['/client']);
        },
        error => {
          this.alertService.error(error);
          this.add_client = false;
          this.loading = false;
          this.router.navigate(['/client']);
        });
    }
  }

  toggleAddClient() {
    this.alertService.clearAlert();
    this.isEditale = false;
    this.addClientForm.reset();
    this.add_client = true;
    this.addClientForm.reset();
    this.clientOpts = "Add Client";
  }

  onRowSelect() {
    if (this.selectedClients.length > 1) {
      this.isButtonDisabled = false;
    }
  }
  onRowUnSelect() {
    if (this.selectedClients.length <= 1) {
      this.isButtonDisabled = true;
    }
  }

  CancelAddClient() {
    this.alertService.clearAlert();
    this.selectedClients = [];
    this.add_client = false;
  }

  toggleEditClient() {
    if (this.selectedClients == undefined || this.selectedClients.length <= 0) {
      this.alertService.error('Please Select atleast one record to edit', false);
      this.router.navigate(['/client']);
    }
    else {
      this.alertService.clearAlert();
      this.clientOpts = "Update Client";

      this.isEditale = true;
      var client = this.selectedClients[0];
      this.addClientForm = this.formBuilder.group({
        clientName: client.clientName,
        leadName: client.leadName,
        location: client.location,
        skill: client.skill,
        contractMechanism: client.contractMechanism,
        target: client.target

      })
      // this.addClientForm.controls['clientName'].disable({onlySelf: true});
      this.add_client = true;
    }
  }

}
