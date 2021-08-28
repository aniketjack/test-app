import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }


findOcc(arr, key){
  let arr2 = [];
  arr.forEach((x)=>{
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){   
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
         }
      }) 
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
    
  return arr2
 } 

/**
 * Sort Array albhabetuically for Property
 */
 getAlbhabeticallySortedArray(arr, propertyName){
    arr.sort(function(a, b){
      if(a['propertyName'] < b['propertyName']) { return -1; }
      if(a['propertyName'] > b['propertyName']) { return 1; }
      return 0;
    })

    return arr;
 }


}
