import { Component, OnInit } from '@angular/core';
import {SignupService} from './../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userName: string;
  password: string;
  validEmail: string;
  valid = true;
  emptyUserName: boolean;
  img = require('./error-icon.png');
  hyperlink = '';
  isButtonDisable = true;
 // injecting a demo service that will basically handle the business logic part
 // and return the valid/invalid result against an username.
  constructor(private signupSvc: SignupService) { }
  
  ngOnInit() {
  }

  // if the hyperlink of a suggestion is clicked
  // it will auto-populate the username textbox.
  populateUserName(){
    this.userName = this.hyperlink;
    this.valid=true;
  }

  // function to determine whether or not the Submit button 
  // will be enabled.
  enableButton(){
     this.valid=true;
     this.emptyUserName=false;
     this.hyperlink= '';
    if(this.userName && this.userName!==''){
      // checks if both username and password are given
      // it will enable the Submit button.
       this.emptyUserName=false;
       if(this.password && this.password!==''){
        this.isButtonDisable=false;
       }
       else {
        this.isButtonDisable=true;
       }
    }
     else if(this.password && this.password!==''){
       // if password field is populated but username is still empty
       // a warning message will be displayed.
        this.isButtonDisable=true;
        this.valid=true;
        this.validEmail='UserName cannot be empty';
        this.emptyUserName=true;
     }
}

// Submit button click handler.
checkIfUsernameIsValid(){
  this.hyperlink='';
  // calls the checkIfUsernameIsValid method of the demo service to 
  // to check if the username entered is valid.
  const rtnObject=this.signupSvc.checkIfUsernameIsValid(this.userName);
  switch(rtnObject.result){
    case 'Invalid': 
        this.valid=false;
        this.hyperlink='';
        // setting the message to be displayed in case of incorrect username.
        this.validEmail='UserName is incorrect';
        break;
    case 'Suggestion':
        this.valid=false;
        // setting the hyperlink to be displayed in case of auto-correction.
        this.hyperlink=rtnObject.suggestedEmail;
        // setting the message to be displayed in case of incorrect username.
        this.validEmail='Do you mean '+ '';
        break;
    default:
        this.valid= true;
  }
}
}
