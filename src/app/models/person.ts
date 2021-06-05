
export class BaseResponse {
    'success' : boolean;
    'errors' : Array<string>;
    'data'?: Array<any>;
}
export class Person {
    'businessEntityID' : number;
    'name':string;
}

export class PersonResponse extends BaseResponse{
    'data'?: Array<Person>;
}

export class Phone {
    "id"?: number;
    "businessEntityID": number;
    "phoneNumber": string;
    "phoneNumberTypeID": number;
}

export class PhoneResponse extends BaseResponse{
    'data'?: Array<Phone>;
}



export class TypePhone {
    "phoneNumberTypeID": number;
    "name": string;
  } 


export class TypePhoneResponse extends BaseResponse{
    'data'?: Array<TypePhone>;
}
