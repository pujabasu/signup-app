import { Component, OnInit } from '@angular/core';
import {SignupService} from './../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private signupSvc : SignupService) { }
  userName: string;
  password: string;
  validEmail:string;
  valid: boolean=true;
  emptyUserName:boolean;
  img=require('./error-icon.png');
  hyperlink:string="";
  isButtonDisable:boolean=true;
  ngOnInit() {
  }
  populateUserName(){
    this.userName = this.hyperlink;
    this.valid=true;
  }
  enableButton(){
     this.valid=true;
     this.emptyUserName=false;
    // this.isButtonDisable=true;
    if(this.userName && this.userName!=''){
       this.emptyUserName=false;
       if(this.password && this.password!==""){
        this.isButtonDisable=false;
       }
       else
        this.isButtonDisable=true;
    }
     else if(this.password && this.password!==""){
        this.isButtonDisable=true;
        this.valid=true;
        this.validEmail="UserName cannot be empty";
        this.emptyUserName=true;
     }
}

checkIfUsernameIsValid(){
  this.hyperlink="";
  const rtnObject=this.signupSvc.checkIfUsernameIsValid(this.userName);
  switch(rtnObject.result){
    case "Invalid": 
        this.valid=false;
        this.hyperlink="";
        this.validEmail="UserName is incorrect";
        break;
    case "Suggestion":
        this.valid=false;
        this.hyperlink=rtnObject.suggestedEmail;
        this.validEmail="Do you mean "+ "";
        break;
    default:
        this.valid= true;
  }
}
}
