import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _http:HttpClient){}
  title = 'faucet_SSC';
  address:string = "";
  faucet(){
    this._http.get('http://localhost:3000/faucet?address='+this.address).subscribe(d=>{
      this.address = "";
      alert(d);
    },
    error=>{
      this.address = "";
      console.log(error);
    });
  }
}
