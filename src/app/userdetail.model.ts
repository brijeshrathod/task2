export class UserDetail{
  
    public uID:number;
    public userName:string;
    public useremail:string;
    public userGender:string;
    public userActivityID:number;
    public userActivity:string;
    public userAddress:string;
        
    constructor( uID:number,  userName:string,   useremail:string, userGender:string,userActivityID:number,
        userActivity:string,userAddress:string){
        this.uID=uID;
        this.userName=userName;
        this.useremail=useremail;
        this.userGender=userGender;
        this.userActivityID=userActivityID;
        this.userActivity=userActivity;
        this.userAddress=userAddress
    }
}