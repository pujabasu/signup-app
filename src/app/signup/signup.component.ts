import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor() { }
  userName: string;
  password: string;
  validEmail:string;
  img=require('./error-icon.png');
  validEmailList=new Array(["gmail","yahoo"]);
 // validPwd: string;
  isButtonDisable:boolean=true;
  ngOnInit() {
  }
  enableButton(){
    if((this.userName && this.userName!='')  && (this.password!='' && this.password))
      this.isButtonDisable=false;
    else
      this.isButtonDisable=true;
  }
  submitResult(){
      let regx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
      if(!regx.test(this.userName)){
        this.validEmail="Please provide a valid email";
      }
      else {
        // var rateSymbolPos= this.userName.indexOf("@");
        // this.comSymbolPos=this.
        this.validEmail="";
      }
    }
}
