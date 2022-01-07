import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userinterface, UserService } from '../userdetail.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  searchValue = '';
  visible = false;
  // _userData$: Observable<Userinterface[]>;
  usid: any;
  userdata= [];
  listOfDisplayData;

  constructor(private router:Router,
  private route:ActivatedRoute,private use:UserService) {  }

  ngOnInit(): void {
    this.userdata=this.use._userData;
    // this._userData$ = this.use._userData$;
    
    console.log("a");
     this.listOfDisplayData = [...this.userdata];


      // this.route.queryParams.subscribe((params)=>{
      // console.log(params);  
      // this.data=JSON.parse(params.data);    
      // console.log("tabledata",this.data);
      // })
 }

 edit(todo){
   this.use.editset(true);
   this.usid=todo.uID;
   console.log("DATAID",this.usid);
   this.router.navigate(['/userform',this.usid],)
   this.use.setsingleuser(todo.uID,todo.userName,todo.email,todo.radio,todo.address,todo.password,todo.confirm,todo.userActivity,todo.userActivityID);
 }

 deleteRow(x){
  var delBtn = confirm(" Do you want to delete?");
  if (delBtn == true) {
    // this.use.alldat().splice(x, 1 );
    this.use.deleteuser(x);
        console.log(x); 
   }   
  }

  
  // reset(): void {
  //   this.searchValue = '';
  //   this.search();
  // }

  search(search) {
    console.log("mikris",this.listOfDisplayData);

    const targetValue: any[] = [];
    this.listOfDisplayData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search)) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.userdata = targetValue;
    console.log('listOfDisplayData',this.listOfDisplayData);
    console.log('targetValue',targetValue);
    console.log('this.userdata',this.userdata);
    console.log('this.searchValue',this.searchValue);

  }
}