import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Userinterface, UserService } from '../userdetail.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  // _userData$: Observable<Userinterface[]>;

  validateForm: FormGroup;
  isEdit:boolean=true;
  radioValues = ['Male', 'Female'];
  myvalue;

  activitylist: any = [
    { aid: 1, aname: 'Sports' ,label:'Sports',value:'Sports'  },
    { aid: 2, aname: 'Travelling',label:'Travelling',value:'Travelling' },
    { aid: 3, aname: 'Music',label:'Music',value:'Music' },
    { aid: 4, aname: 'Drama',label:'Drama',value:'Drama'},
    { aid: 5, aname: 'Yoga',label:'Yoga',value:'Yoga' },
    { aid: 6, aname: 'Gaming',label:'Gaming',value:'Gaming' },
  ];
  userActivity: any;
  userActivityID: any;

 

  submitForm() {
    let index = this.userserv._userData.findIndex(x=>x.uID==this.userserv.getsingleuser().uid);
    console.log("submit",index);
    if(index==-1)
   {
    this.userserv.create(this.validateForm.value,this.userActivity,this.userActivityID);   
    console.log("ift",index);
   }
   else{
    console.log("submit","null");
    
    this.userserv.editcreate(this.validateForm.value,this.userActivity,this.userActivityID,index);   

    console.log("alldata",this.userserv._userData[index])
        //  this._userData[index]=this._user;
   }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder , private router:Router,
    private route:ActivatedRoute,private userserv:UserService) { }

  onchange(){
  }

  updateSingleChecked(): void {
    if (this.activitylist.every(item => !item.checked)) {
      
    } else if (this.activitylist.every(item => item.checked)) {//nothing
      }
    else if (this.activitylist.some(item => item.checked)) { 
      this.userActivity=this.activitylist.filter(x=>x.checked==true).map(x=>x.aname).join(",").toString();
      this.userActivityID=this.activitylist.filter(x=>x.checked==true).map(x=>x.aid).join(",").toString();
      console.log("activiy,id",this.userActivity,this.userActivityID)
      
     } else {
      // this.indeterminate = true;
        }
  }

   ngOnInit(): void {
     this.myvalue=this.userserv.geteditset();
    //  this._userData$ = this.userserv._userData$;

     if(this.myvalue? true:false){
      console.log("Sss",this.myvalue,this.userserv.getsingleuser().uactivity,this.userserv.getsingleuser().uactivityid) ;
      this.isEdit = false;

      let selectedactivityidlist=this.userserv.getsingleuser().uactivityid; 
      
    for(let i=0;i<selectedactivityidlist.length;i++)
    {
      this.activitylist.filter(x=>x.aid==Number(selectedactivityidlist[i])).map(x=>x.checked=true);
   
    }

      this.validateForm = this.fb.group({
        userName: [ this.userserv.getsingleuser().uname, [Validators.required], [this.userNameAsyncValidator]],
        email:    [this.userserv.getsingleuser().uemail, [Validators.email, Validators.required]],
        password: [this.userserv.getsingleuser().upass],
        confirm:  [this.userserv.getsingleuser().uconifpass],
        address:  [this.userserv.getsingleuser().uaddress, [Validators.required]],
        radio: [this.userserv.getsingleuser().ugender],
        activityList:  [this.activitylist],
      });


    }
    else{

      this.validateForm = this.fb.group({
    
          userName: ['', [Validators.required], [this.userNameAsyncValidator]],
          email:    ['', [Validators.email, Validators.required]],
          password: ['', [Validators.required]],
          confirm:  ['', [this.confirmValidator]],
          address:  ['', [Validators.required]],
          radio: [{ value: 'Male', disabled: false }],
          activityList:  [this.activitylist],
        });
      
    }
      

   }

  save(){
    let data:any=this.validateForm.value;
    console.log("userDetail form",);
    // this.userserv.create(this.validateForm.value);
    // this.userserv.create(this.validateForm.value);   
    this.router.navigate(['/usertable',this.validateForm.value.userName],)
      console.log("data",data);
      // {
      //   queryParams:{data:JSON.stringify(data),skipLocationChange: true}
      // },
 }
 
}