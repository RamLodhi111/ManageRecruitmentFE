import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpResponse, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExceptionModel } from '../../_models'


@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  selectedFiles: FileList;
  UploadError: boolean = false;
  currentFileUpload: File;
  currentSelectedFile: string = "Choose candidates excel";
  model:ExceptionModel;
  errMessage:string;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private uploadService: UploadFileService, private router: Router) {

  }

  ngOnInit() { }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0) {
      this.currentSelectedFile = event.target.files[0].name;
    }
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(res => {
     /* console.log("In subscribe method");
      console.table(res); */

     
      if (res.type === HttpEventType.UploadProgress ) {
        this.progress.percentage = Math.round(100 * res.loaded / res.total);
       /* console.log('************ after cal loaded %  *************');
        console.log(this.progress.percentage);  */
       } else if (res instanceof HttpResponse) {
        // console.log('File is completely uploaded!');
         this.router.navigate(['/home']);
       }
      
    },error =>{
      console.log(error); 
      this.errMessage= error;
      this.UploadError = true;
      this.currentFileUpload= null;
      this.currentSelectedFile="Choose Valid Excel";
      //console.log(error);
      //this.router.navigate(['/home']);
    });
   // this.selectedFiles = undefined;
  }

  /*upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(res => {
      console.log("In subscribe method");
      console.table(res); 
      if (res.type === HttpEventType.UploadProgress) {
        if(res.status == 400){
        this.statusCode = res.status;
        }
        this.progress.percentage = Math.round(100 * res.loaded / res.total);
        // console.log('************ after cal loaded %  *************');
        // console.log(this.progress.percentage);  
       } else if (res instanceof HttpResponse) {
        // console.log('File is completely uploaded!');
         this.router.navigate(['/home']);
       }
    },error =>{

      //this.progress.percentage =0 ;
      if(this.statusCode===400){
      this.UploadError = true;
      this.currentSelectedFile="Choose candidates excel";
      
      console.log('Error in the Upload File.');
    }else{
      this.router.navigate(['/home']);
    }
    //  alert(error.httpErrorCode);
      //console.log(error);
     // 
    });
    this.selectedFiles = undefined;
  }*/

}
