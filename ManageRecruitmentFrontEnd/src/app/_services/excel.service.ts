import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as Excel from "exceljs/dist/exceljs.min.js";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
let valuesArray: any[]=[];
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
constructor() { }

public exportAsExcelFile(json: any[],filterValue:string, excelFileName: string): void {
//Comment below 2 lines for formatted excel export 
  let updatedSheet:any[] =this.formatData(json,filterValue.toLocaleLowerCase());
  this.exportToExcel(updatedSheet,excelFileName);

  //Uncomment below to normal excel export 
  /* const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
     const workbook: XLSX.WorkBook = { Sheets: { 'Supply': worksheet }, SheetNames: ['Supply'] };
     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
     this.saveAsExcelFile(excelBuffer, excelFileName);*/
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}

private formatData(json:any[], filterValue:string): any[]{
  let id : number=1;
  let updatedSheet:any[] =[];
  let currentCandidate:string=null;
        for (let candidate of json) {
            let value : string = JSON.stringify(candidate).toLowerCase();
            if(value.includes(filterValue)){
                  candidate.id=String(id++);
                  currentCandidate = JSON.stringify(candidate);
                  currentCandidate =currentCandidate.replace("id", "SI No");
                  currentCandidate =currentCandidate.replace("roleOfResponsibilities", "Role");
                  valuesArray.push(Object.values(currentCandidate));
                  updatedSheet.push(JSON.parse(currentCandidate));
            }
         }

         return updatedSheet;
    }

exportToExcel(updatedSheet: any[], excelFileName: string)
  {

    const header: any[] = Object.keys(updatedSheet[0]);
    const keyName:string='key';
    let keys:any[] =[];
    header.forEach(key=>{
        var object={};
        object[keyName] =key;
        keys.push(object);
    });
    var workbook = new Excel.Workbook();
    workbook.creator = 'Ram';
    workbook.lastModifiedBy ='Ram';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet(excelFileName, { views: [{ state: 'frozen'}] })
    var sheet = workbook.getWorksheet(1);
    sheet.getRow(1).values = header;
   sheet.columns = keys;
    sheet.addRows(updatedSheet);

    sheet.getRow(1).font={
      name:'Arial',
      family:2,
      size:10,
      bold:true,
     // color:{argb:'FFFF99'}
    }
    sheet.getCell('B1').alignment={
      wraptext:true,
      vertical:'middle',
      horizontal:'left'
      }
      sheet.getCell('C1').alignment={
        wraptext:true,
        vertical:'middle',
        horizontal:'left'
        }
sheet.getCell('D1').alignment={
  wraptext:true,
  vertical:'middle',
  horizontal:'left'
}
sheet.getCell('E1').alignment={
  wraptext:true,
  vertical:'middle',
  horizontal:'left'
  }

    sheet.getRow(1).fill={
       type:'gradient',
       gradient:'angle',
       degree:0,
      stops:[
        {position:0,color:{argb:'d9f1fa'}},
        {position:0.5,color:{argb:'d9f1fa'}},
        {position:1,color:{argb:'d9f1fa'}}
      ],
    }

    sheet.getRow(1).color={
      color:'yellow',
     
    }
    workbook.xlsx.writeBuffer().then(data => {
      var blob = new Blob([data], { type: EXCEL_TYPE });
     /* var url = window.URL.createObjectURL(blob);
     var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download =excelFileName;
      a.click();*/
      //adding some delay in removing the dynamically created link solves the problem in FireFox
      //setTimeout(function() {window.URL.revokeObjectURL(url);},0);
      FileSaver.saveAs(blob, excelFileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
    });
  }
}


