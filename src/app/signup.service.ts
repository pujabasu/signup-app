import { Injectable } from '@angular/core';
import {SignUpData} from './signup-data';

@Injectable()
export class SignupService {
  tempUsr='';
  // Call the fetchDomain function to get the domain names.
  validDomainList: any= new SignUpData().fetchDomain();
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
         this.validDomainList.some((element,index)=>{
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
           const domain = this.tempUsr.substring(rateSymbolPos+1,this.tempUsr.length);
           // looping over each dummy domain name array.
           for(let count=0;count<this.validDomainList.length;count++){
              let match=0;
              let unique=0;
              let comparator=0;
              //splitting the current valid domain from domain list and the domain provided by user over ".".
              let arr1=this.validDomainList[count].split('.');
              let arr2=domain.split('.');
                for(let arrLen=0;arrLen<arr1.length;arrLen++){
                  // if domain of username is greater than valid domain, then removing the last 
                  // entry after "." to keep both the domains length equal.
                    if(arr2.length>arr1.length){
                      arr2.splice(arr2.length-1,arr2.length-arr1.length);
                    }
                    else if(arr2.length<arr1.length && !arr2[arrLen]){
                        break;
                    }
                    // the current element of valid domain matches the current element of username
                    if(arr1[arrLen]===arr2[arrLen]){
                        match+=arr1[arrLen].length;
                      }
                    else {
                      // remove the duplicate values from both the domains.
                      arr1[arrLen]=arr1[arrLen].split('').filter(function(allItems,i,a){
                                              return i == a.indexOf(allItems);
                                          }).join('');
                      arr2[arrLen]=arr2[arrLen].split('').filter(function(allItems,i,a){
                                              return i == a.indexOf(allItems);
                                          }).join('');
                      for(let i=0;i<arr2[arrLen].length;i++){
                        // checking the occurence of each character from the domain of username in the valid domain
                         if(arr1[arrLen].indexOf(arr2[arrLen][i])>=0){
                            match++; // incrementing if a match is found.
                          }
                      }
                      
                    }
                  }
                // removing the duplicate characters from the original domain name.
                this.validDomainList[count].split('.').forEach(function(currVal,i){
                comparator+=currVal.split('').filter(function(allItems,i,a){
                                              return i==a.indexOf(allItems);
                     }).join('').length;
                })
                if(match>0){
                  // pushing the % of matching characters into a temp array against the domain name.
                        temp.push({'matchedKey':(match/comparator*100),'mail': this.validDomainList[count]});
                 }
           }
           // if the stored array of matches and domain names has some data---
           if(temp.length > 0){
             // sorting over the temp array against the match count in descending order
             // so that the domain name that has maximum number of matched characters
             // comes up to the top.
             temp.sort((a,b)=>{
                return b.matchedKey-a.matchedKey;
              });
              // check to see if more than one valid domain name match more than 60% of the 
              // domain name provided in username.
              if(temp[0].matchedKey >= 60){
              temp=temp.map((value,index,a)=>{
                return value.matchedKey===a[0].matchedKey?value:null;
              })
              // if any such domain names are found, they are sent as an array of "Suggestion" to the calling function.
                   return {result: 'Suggestion', suggestedEmail:temp};
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
