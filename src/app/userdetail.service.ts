import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Userinterface {
    uID:number;
    userName:string;
    useremail:string;
    userGender:string;
    userActivityID:number;
    userActivity:string;
    userAddress:string;
  }
  
  @Injectable()
export class UserService{

    // private _user$ = new BehaviorSubject<Userinterface[]>([]);
    // readonly _userData$ = this._user$.asObservable();
  
     _userData: Userinterface[] = [];
    private nextId = 0;
    constructor() {}
    private isedit;

    private singleUID;
    private singleUNAME;
    private singleEMAIL;
    private singleGENDER;
    private singleADDRESS;
    private singlepass;
    private singleconifpass;
    private singleactivity;
    private singleactivityid;
 
    create(myuserdata: Userinterface,uactivity,uactivityid) {
       myuserdata.uID=++this.nextId;
       myuserdata.userActivity=uactivity;
       myuserdata.userActivityID=uactivityid;

        //Update database
        this._userData.push(myuserdata);
        // this._user$.next(Object.assign([], this._userData));
      }

      editcreate(myu:Userinterface,uactivity,uactivityid,index){
        myu.userActivity=uactivity;
        myu.userActivityID=uactivityid;
        this._userData[index]=myu;

      }
 
      alldat(){
        return this._userData;
      }

editset(value) {      
  this.isedit = value;  
} 
geteditset(){
  return this.isedit;
 }

 setsingleuser(id,name,email,gender,address,password,conifpass,activity,activityid){
   this.singleUID=id;
   this.singleUNAME=name;
   this.singleEMAIL=email;
   this.singleGENDER=gender;
   this.singleADDRESS=address;
   this.singlepass=password;
   this.singleconifpass=conifpass;
   this.singleactivity=activity;
   this.singleactivityid=activityid;
 }

 getsingleuser(){
   return {
     uid:this.singleUID,
     uname:this.singleUNAME,
     uemail:this.singleEMAIL,
     ugender:this.singleGENDER,
     uaddress:this.singleADDRESS,
     upass:this.singlepass,
     uconifpass:this.singleconifpass,
     uactivity:this.singleactivity,
     uactivityid:this.singleactivityid}
  }

  deleteuser(x){
    this._userData.splice(x, 1 );
  }

  search(searchValue){
    // this.searchofDisplayData = this._userData.filter((item: Userinterface) => item.userName.indexOf(this.searchValue) !== -1);

  }

}
