import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse, PersonResponse, Phone, PhoneResponse, TypePhoneResponse } from './models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
 
  constructor(private http:HttpClient) { }

  getPerson():Observable<PersonResponse>{
    return this.http.get<PersonResponse>('http://localhost:59730/api/Person');
  }

  getPhones(id:number):Observable<PhoneResponse>{
    return this.http.get<PhoneResponse>(`http://localhost:59730/api/PersonPhone/${id}`);
  }  
  deletePhone(id:number):Observable<BaseResponse>{
    return this.http.delete<BaseResponse>(`http://localhost:59730/api/PersonPhone/${id}`);
  }
  alteraPhone(phone:Phone):Observable<BaseResponse>{
    return this.http.put<BaseResponse>(`http://localhost:59730/api/PersonPhone/`, phone);
  }
  addPhone(phone:Phone):Observable<TypePhoneResponse>{
    return this.http.post<TypePhoneResponse>(`http://localhost:59730/api/PersonPhone/`,  phone);
  }
  getTypePhone():Observable<TypePhoneResponse>{
    return this.http.get<TypePhoneResponse>(`http://localhost:59730/api/PhoneNumberType/`);
  }
}
