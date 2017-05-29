import { Injectable } from '@angular/core';

@Injectable()
export class SignupService {

  constructor() { }
  tempUsr='';
  validEmailList=new Array("gmail.com","yahoo.com","hotmail.com");
  checkIfUsernameIsValid(userName: string):any{
    let valid=false;
    this.tempUsr= userName.toLowerCase();
      let regx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!regx.test(this.tempUsr)){
       // this.valid=false;
       // this.validEmail="UserName is incorrect.";
       return {result: "Invalid",suggestedEmail:""};
      }
       else {
         const rateSymbolPos= this.tempUsr.indexOf("@");
         
         this.validEmailList.some((element,index)=>{
           if(element===this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length)){
              valid=true;
              return true;
           }
           else{
             valid=false;
           }
         });
         if(!valid){
           let temp=[];
           for(let count=0;count<this.validEmailList.length;count++){
             let match=0;
             for(let index=0;index<this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length).length;index++){
              if(this.validEmailList[count].indexOf(this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length)[index])>=0){
                match++;
              }
             }
            if(match>0){
                 temp.push({'matchedKey':match,'mail': this.validEmailList[count]});
            }
           }

           if(temp.length>0){
            //if(temp.length>1)
              temp = temp.sort((a,b)=>{
                return b.matchedKey-a.matchedKey;
              })
              if( temp[0].matchedKey/temp[0].mail.length * 100 >= 60){
                // this.hyperlink=this.userName.toLowerCase().substring(0,rateSymbolPos)+"@"+checkStr;
                // this.validEmail="Do you mean "+ "";
                 return {result: "Suggestion",suggestedEmail:userName.toLowerCase().substring(0,rateSymbolPos)+"@"+temp[0].mail};
            }
            else{
             // this.hyperlink="";
               return {result: "Invalid",suggestedEmail:""};
            }

              // this.checkIfUsernameIsValid(this.temp[0].matchedKey,this.temp[0].mail,rateSymbolPos);
           }
           else
                 return {result: "Invalid",suggestedEmail:""};
         }
         else
          return {result: "Valid",suggestedEmail:""};
    }
      // if( matched/checkStr.length * 100 >= 60){
      //     this.hyperlink=this.userName.toLowerCase().substring(0,rateSymbolPos)+"@"+checkStr;
      //     this.validEmail="Do you mean "+ "";
      // }
      // else{
      //   this.hyperlink="";
      //   this.validEmail="UserName is not valid";
      // }
  }
}
