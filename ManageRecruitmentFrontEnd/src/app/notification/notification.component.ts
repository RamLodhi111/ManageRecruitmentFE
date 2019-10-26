import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { NotificationService } from './notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [MessageService]
})
export class NotificationComponent implements OnInit {

 approvalColumns: String[]=[];
 approvalList: any;
 index:number;
 space: String;
 message: String;
 msg:String;
 eventType:string;
 currentUser:any;
 userDetail:any;

  constructor(private notificationService: NotificationService, private messageService:MessageService) { }

  ngOnInit() {
    this.loadAllApprovals();
    this.index=1;
    this.space="   ";
    this.userDetail={
      username:"",
      password:"",
      role:""
    }
   // console.log("message is "+this.message);
  }

  private loadAllApprovals(){
    this.notificationService.loadAllApprovals().subscribe(response=>{
     // console.log("Response is :: "+JSON.stringify(response));
      this.approvalList=response;
    })
  }

  private updateApprovalStatus(user:any){
    this.notificationService.updateApprovalStatus(user).subscribe(response=>{
        //console.log("Response is :: "+JSON.stringify(response));
    })

    if(user.status="Approved"){
        this.userDetail.username= user.username;
        this.userDetail.password= atob(user.password);
        this.userDetail.role= user.role;

      //console.log("Approved:: "+JSON.stringify(this.userDetail));
       this.notificationService.approveUser(this.userDetail).subscribe(response=>{
        
        })
    }
  }
  triggerApprovalEvent(event:string, user: any) {
    this.message=null;
   // console.log("in showConfirm :: ")
    this.messageService.clear();
    this.eventType = event;
    this.currentUser = user;
   this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:`${event} the request?`, detail:'Confirm to proceed'});
    
   }
   
   onConfirm() {
    this.messageService.clear('c');
    if(this.eventType=="Approve"){
      this.currentUser.status="Approved";
      this.msg="msg-approved";
    
    }else{
     this.currentUser.status="Rejected";
     this.msg="msg-rejected";
    }
    this.message=`Registration request is ${this.currentUser.status} for ${this.currentUser.username}`;
    this.currentUser.approver= sessionStorage.getItem('authenticaterUser');
    //console.log("Message :: "+this.message);
    //console.log(JSON.stringify(this.currentUser));
    this.updateApprovalStatus(this.currentUser);
   
   }
   
   onReject() {
    this.messageService.clear('c');
    this.currentUser = null;
    this.eventType = null;
   }
   

   chaneRole(user:any,role:string):void{
    user.role=role;
   }


}
