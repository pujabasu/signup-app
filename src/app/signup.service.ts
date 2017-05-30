import { Injectable } from '@angular/core';

@Injectable()
export class SignupService {
  tempUsr='';
  // using a hardcoded array containing the domain names to be compared 
  // with the domain names provided in username to check any typo and
  // suggest the correct domain. In real app, this needs to fetched from DNS lookup.
  validEmailList=new Array('gmail.com','yahoo.com','hotmail.com');
  constructor() { }
 // method to check the validity of the username provided.
  checkIfUsernameIsValid(userName: string):any{
    let valid=false;
    this.tempUsr= userName.toLowerCase();
      const regx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // comparing against the regex expression to check if @ and . are properly placed
      // and if there is atleast two alphabets placed after @ and . in the domain name
      // like "in", "com", "gov", etc.
      if(regx.test(this.tempUsr)){
        // if the regular expression satisfies, then it needs to check
        // if the domain name matches with any of the domain names present in the dummy array.
         const rateSymbolPos= this.tempUsr.indexOf('@'); // position of @.
         this.validEmailList.some((element,index)=>{
           if(element===this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length)){
              valid=true;
              return true;
           }
           else {
             valid=false;
           }
         });
         // if the domain name does not matches any of the provided domains--
         if(!valid){
           let temp=[];
           // looping over each dummy domain name array.
           for(let count=0;count<this.validEmailList.length;count++){
             let match=0;
             // looping over each of the characters of the domain name in the given username.
             for(let index=0;index<this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length).length;index++){
              // checking if the character is present in the current domain name of the array above.
              if(this.validEmailList[count].indexOf(this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length)[index])>=0){
                match++; // incrementing if a match is found.
              }
             }
             // if match is found, storing in an array the match count against the 
             // current domain name of the array.
            if(match>0){
                 temp.push({'matchedKey':match,'mail': this.validEmailList[count]});
            }
           }
           // if the stored array of matches and domain names has some data---
           if(temp.length > 0){
             // sorting over the temp array against the match count in descending order
             // so that the domain name that has maximum number of matched characters
             // comes up to the top.
              temp = temp.sort((a,b)=>{
                return b.matchedKey-a.matchedKey;
              });
              // the top now has the maximum matched characters. It is now 
              // compared against the total number of characters of its matched domain.
              // If that exceeds 60%, a suggestion will be returned will the original domain 
              // from the array, thus bypassing the typo.
              if( temp[0].matchedKey/temp[0].mail.length * 100 >= 60){
                 return {result: 'Suggestion', suggestedEmail:userName.toLowerCase().substring(0,rateSymbolPos)+'@'+temp[0].mail};
            }
           }
         }
         // if the domain name of the username matches fully with any of the 
         // domain name from the array, then the result is returned as 'Valid'.
         else {
          return {result: 'Valid', suggestedEmail:''};
         }
    }
    // If the regex is not matched, or the domain name provided in the username did not match the
    // 60% criteria of the character matching, or some other wrong domain was provided, that
    // is not registerd in the valid domain names collection, in all such cases result will be 
    // returned as 'Invalid'
      return {result: 'Invalid', suggestedEmail:''};
  }
}
