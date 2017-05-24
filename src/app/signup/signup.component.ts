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
  valid: boolean=true;
  emptyUserName:boolean;
  img=require('./error-icon.png');
  validEmailList=new Array("gmail.com","yahoo.com","hotmail.com");
  temp:any[];
  max:any;
  hyperlink:string="";
 // validPwd: string;
  isButtonDisable:boolean=true;
  ngOnInit() {
  }
  populateUserName(){
    this.userName = this.hyperlink;
    this.valid=true;
  }
  enableButton(e){
   // this.validEmail="";
   // this.emptyUserName=false;
   // this.valid=false;
   this.hyperlink="";
    if((this.userName && this.userName!='')){
      this.emptyUserName=false;
      // this.isButtonDisable=false;
      let regx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
      if(!regx.test(this.userName)){
        this.valid=false;
        this.validEmail="UserName is not complete.";
      }
      else {
       // this.validEmail="did you mean";
         var rateSymbolPos= this.userName.indexOf("@");
         
         this.validEmailList.some((element,index)=>{
           if(element===this.userName.substring(rateSymbolPos+1,this.userName.length)){
             this.valid=true;
              return true;
           }
           else{
             this.valid=false;
           }
         });
         if(!this.valid){
           this.temp=[];
           for(let count=0;count<this.validEmailList.length;count++){
             let match=0;
             for(let index=0;index<this.userName.substring(rateSymbolPos+1,this.userName.length).length;index++){
              if(this.validEmailList[count].indexOf(this.userName.substring(rateSymbolPos+1,this.userName.length)[index])>=0){
                match++;
              }
             }
            if(match>0){
                 this.temp.push({'matchedKey':match,'mail': this.validEmailList[count]});
              // if( match/this.validEmailList[count].length * 100 >= 60)
              //   this.validEmail="Do you mean "+ this.userName.substring(0,rateSymbolPos)+"@"+this.validEmailList[count];
              // else
              //   this.validEmail="Please check the username entered.";
            }
           }

           if(this.temp.length>0){
             if(this.temp.length>1)
              this.temp = this.temp.sort((a,b)=>{
                return b.matchedKey-a.matchedKey;
              })

               this.checkIfUsernameIsValid(this.temp[0].matchedKey,this.temp[0].mail,rateSymbolPos);
             
            //  if( this.max[0].matchedKey/this.max[0].mail.length * 100 >= 60){
            //    this.hyperlink=this.userName.substring(0,rateSymbolPos)+"@"+this.max[0].mail;
            //    this.validEmail="Do you mean "+ "";
            //  }
            //   else{
            //     this.hyperlink="";
            //     this.validEmail="Please check the username entered.";
            //   }
           }
           
          //  else if(this.temp.length==1){
          //     if( this.temp[0].match/this.temp[0].mail.length * 100 >= 60)
          //       this.validEmail="Do you mean "+ this.userName.substring(0,rateSymbolPos)+"@"+this.temp[0].mail;
          //     else
          //       this.validEmail="Please check the username entered.";
          //  }
           else
                this.validEmail="UserName entered is incorrect.";
         }
         else if(this.valid && (this.password!='' && this.password)){
           this.isButtonDisable=false;
         }
         else{
           this.isButtonDisable=true;
         }
      }
    }
    else if(this.password && this.password!==""){
      this.valid=true;
      this.isButtonDisable=true;
      this.validEmail="UserName cannot be empty";
      this.emptyUserName=true;
    }
     else
       this.valid=true;
  }

checkIfUsernameIsValid(matched:number,checkStr:string,rateSymbolPos:number){
      if( matched/checkStr.length * 100 >= 60){
          this.hyperlink=this.userName.substring(0,rateSymbolPos)+"@"+checkStr;
          this.validEmail="Do you mean "+ "";
      }
      else{
        this.hyperlink="";
        this.validEmail="UserName is not valid";
      }
}
 // submitResult(){
      // let regx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
      // if(!regx.test(this.userName)){
      //   this.validEmail="Please provide a valid email";
      // }
      // else {
      //   this.validEmail="";
      //  // this.validEmail="did you mean";
      //    var rateSymbolPos= this.userName.indexOf("@");
      //    let valid: boolean;
      //    this.validEmailList.forEach((element,index)=>{
      //      if(element===this.userName.substring(rateSymbolPos+1,this.userName.length)){
      //         valid=true;
      //      }
      //    });
      //    if(!valid){
      //      for(let count=0;count<this.validEmailList.length;count++){
      //        let match=0;
      //        for(let index=0;index<this.userName.substring(rateSymbolPos+1,this.userName.length).length;index++){
      //         if(this.validEmailList[count].includes(this.userName.substring(rateSymbolPos+1,this.userName.length)[index])){
      //           match++;
      //         }
      //        }
      //       if(match>0){
      //         if( match/this.validEmailList[count].length * 100 >= 80)
      //           this.validEmail="Did you mean "+ this.userName.substring(0,rateSymbolPos)+"@"+this.validEmailList[count];
      //         else
      //           this.validEmail="Please check the username entered.";
      //         break;
      //       }
      //      }
      //    }
      // }
   // }
}
