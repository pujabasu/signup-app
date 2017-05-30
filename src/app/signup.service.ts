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
      if(regx.test(this.tempUsr)){
      // return {result: "Invalid",suggestedEmail:""};
    //  }
      //else {
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
              temp = temp.sort((a,b)=>{
                return b.matchedKey-a.matchedKey;
              })
              if( temp[0].matchedKey/temp[0].mail.length * 100 >= 60){
                 return {result: "Suggestion",suggestedEmail:userName.toLowerCase().substring(0,rateSymbolPos)+"@"+temp[0].mail};
            }
            // else{
            //    return {result: "Invalid",suggestedEmail:""};
            // }
           }
          //  else
          //      return {result: "Invalid",suggestedEmail:""};
         }
         else
          return {result: "Valid",suggestedEmail:""};
    }
  //  else {
      return {result: "Invalid",suggestedEmail:""};
  //  }
  }
}
