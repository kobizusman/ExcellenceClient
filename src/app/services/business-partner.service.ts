import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusinessPartner } from '../models/businessPartner';
import { City } from '../models/City';
import { Bank, JsonModelBanksAndBrunches } from '../models/jsonModelBanksAndBrunches';

@Injectable({
  providedIn: 'root'
})
export class BusinessPartnerService {

  constructor(private http: HttpClient) { }

  createBusinessPartner(businessPartner: BusinessPartner): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/BusinessPartners/CreateBusinessPartner`, businessPartner);
  }

  getBusinessPartners(): Observable<BusinessPartner[]> {
    return this.http.get<BusinessPartner[]>(`${environment.baseApiUrl}/BusinessPartners/getBusinessPartners`)
  }

  removeBusinessPartner(identityCard: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseApiUrl}/BusinessPartners/${identityCard}`);
  }

  getCities():Observable<City[]>{
    return this.http.get<City[]>(`${environment.baseApiUrl}/BusinessPartners/getAllCities`)
  }

  getAllBanksAndBrunches():Observable<JsonModelBanksAndBrunches>{
    return this.http.get<JsonModelBanksAndBrunches>(`${environment.baseApiUrl}/BusinessPartners/getAllBanksAndBrunches`)
  }
}
