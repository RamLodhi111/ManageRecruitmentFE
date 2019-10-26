import { SummaryDataClient } from './../_models/summaryDataClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatureDetails } from '../_models';
import { chart } from '../_models/chart';
import { Observable } from 'rxjs';
import {Summary} from '../_models/summary'

@Injectable({
  providedIn: 'root'
})
export class CandidatureDetailsService {
     API_URL  =  'https://recruitmentportalapp.cfapps.io';
     //API_URL  =  'http://localhost:9000';

    constructor(private http: HttpClient) { }

    getCandidatures(){
        return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetails`);
    }

    getCandidaturesChart(Criteria : string){
        return this.http.get<chart>(`${this.API_URL}/api/candidatureDetailsBy/`+Criteria);
    }

    getCandidaturesReports(Criteria : string){	
        return this.http.get<any>(`${this.API_URL}/api/candidatureDetailsBy/reports/`+Criteria);	
    }	

    getCandidaturesSecondaryChart(Criteria : string,Category : string,Type : string){
        return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetailsBy/`+Criteria+"/"+Category+"/and/"+Type);
    }

    getCandidaturesReportsBarGraph(Criteria : string){
        return this.http.get<any>(`${this.API_URL}/api/candidatureDetailsBy/reports/bargraph/`+Criteria);
    }

    getCandidatureStatusCountByClientName(clientName: string){
      return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetailsByClientName/`+clientName);
  }

  getSummaryDataClient(){
    return this.http.get<SummaryDataClient[]>(`${this.API_URL}/api/candidatureDetailsSummaryDataByClient/`);
}
    
    updateCandidature(candidature: CandidatureDetails) {
       // console.log("candidate id >> "+candidature.id);
        return this.http.put(`${this.API_URL}/api/candidatureDetails/` + candidature.id,candidature);
        
    }

    saveCandidature(candidatureDetails: any): Observable<any> {
        let addURL=this.API_URL+"/api/candidatureDetails";
       // console.log(addURL);
        //console.log(candidatureDetails)
      // this.http.post(addURL,CandidatureDetails)
        return this.http.post(addURL, candidatureDetails);
    }
    

    deleteCandidature(id: string): Observable<any> {
        return this.http.delete(`${this.API_URL}/api/candidatureDetails/`+ id);
    }

    deleteCandidate(candidate:CandidatureDetails[]): Observable<any>{
        return this.http.post(`${this.API_URL}/api/candidatureDetails/delete`,candidate);
      }
    


    getClientSummary(){
        return this.http.get<[Summary]>(`${this.API_URL}/clientDetails/getSummaryData`);
    }
}
