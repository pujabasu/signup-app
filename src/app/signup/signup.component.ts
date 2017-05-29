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
//  tempUsr:string;
  password: string;
  validEmail:string;
  valid: boolean=true;
  emptyUserName:boolean;
  img=require('./error-icon.png');
  //validEmailList=new Array("gmail.com","yahoo.com","hotmail.com");
  //temp:any[];
 // max:any;
  hyperlink:string="";
  isButtonDisable:boolean=true;
  ngOnInit() {
  }
  populateUserName(){
    this.userName = this.hyperlink;
    this.valid=true;
  }
  enableButton(e){
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
        this.validEmail="UserName cannot be empty";
        this.emptyUserName=true;
     }
  //    }
  //  this.hyperlink="";
  //   if((this.userName && this.userName!='')){
  //     this.tempUsr=this.userName.toLowerCase();
  //     this.emptyUserName=false;
  //     let regx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //     if(!regx.test(this.tempUsr)){
  //       this.valid=false;
  //       this.validEmail="UserName is incorrect.";
  //     }
    //     else {
  //        var rateSymbolPos= this.tempUsr.indexOf("@");
         
  //        this.validEmailList.some((element,index)=>{
  //          if(element===this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length)){
  //            this.valid=true;
  //             return true;
  //          }
  //          else{
  //            this.valid=false;
  //          }
  //        });
  //        if(!this.valid){
  //          this.temp=[];
  //          for(let count=0;count<this.validEmailList.length;count++){
  //            let match=0;
  //            for(let index=0;index<this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length).length;index++){
  //             if(this.validEmailList[count].indexOf(this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length)[index])>=0){
  //               match++;
  //             }
  //            }
  //           if(match>0){
  //                this.temp.push({'matchedKey':match,'mail': this.validEmailList[count]});
  //           }
  //          }

  //          if(this.temp.length>0){
  //            if(this.temp.length>1)
  //             this.temp = this.temp.sort((a,b)=>{
  //               return b.matchedKey-a.matchedKey;
  //             })

  //              this.checkIfUsernameIsValid(this.temp[0].matchedKey,this.temp[0].mail,rateSymbolPos);
  //          }
  //          else
  //               this.validEmail="UserName entered is incorrect.";
  //        }
  //        else if(this.valid && (this.password!='' && this.password)){
  //          this.isButtonDisable=false;
  //        }
  //        else{
  //          this.isButtonDisable=true;
  //        }
  //     }
  //   }
  //   else if(this.password && this.password!==""){
  //     this.valid=true;
  //     this.isButtonDisable=true;
  //     this.validEmail="UserName cannot be empty";
  //     this.emptyUserName=true;
  //   }
  //    else
  //      this.valid=true;
}

checkIfUsernameIsValid(){
  const rtnObject=this.signupSvc.checkIfUsernameIsValid(this.userName);
  switch(rtnObject.result){
    case "Invalid": 
        this.valid=false;
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
// checkIfUsernameIsValid(matched:number,checkStr:string,rateSymbolPos:number){
//       if( matched/checkStr.length * 100 >= 60){
//           this.hyperlink=this.userName.toLowerCase().substring(0,rateSymbolPos)+"@"+checkStr;
//           this.validEmail="Do you mean "+ "";
//       }
//       else{
//         this.hyperlink="";
//         this.validEmail="UserName is not valid";
//       }
//   }

}
