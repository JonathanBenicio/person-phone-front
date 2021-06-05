import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse, PersonResponse, Phone, PhoneResponse, TypePhoneResponse } from './models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  urlApi = "http://localhost:5000/api"
  constructor(private http:HttpClient) { }

  getPerson():Observable<PersonResponse>{
    return this.http.get<PersonResponse>(`${this.urlApi}/Person`);
  }

  getPhones(id:number):Observable<PhoneResponse>{
    return this.http.get<PhoneResponse>(`${this.urlApi}/PersonPhone/${id}`);
  }  
  deletePhone(id:number):Observable<BaseResponse>{
    return this.http.delete<BaseResponse>(`${this.urlApi}/PersonPhone/${id}`);
  }
  alteraPhone(phone:Phone):Observable<BaseResponse>{
    return this.http.put<BaseResponse>(`${this.urlApi}/PersonPhone/`, phone);
  }
  addPhone(phone:Phone):Observable<TypePhoneResponse>{
    return this.http.post<TypePhoneResponse>(`${this.urlApi}/PersonPhone/`,  phone);
  }
  getTypePhone():Observable<TypePhoneResponse>{
    return this.http.get<TypePhoneResponse>(`${this.urlApi}/PhoneNumberType/`);
  }
}
