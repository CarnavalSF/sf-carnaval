import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  vendors;
  e1718 = [];
  e1819 = [];
  e1920 = [];
  e2021 = [];
  s1718 = [];
  s1819 = [];
  s1920 = [];
  s2021 = [];

  constructor(
    private _api: ApiService
  ) { }

  ngOnInit() {
    this._api.getVendors().subscribe(response => {
      this.vendors = response['data'];
      this.sortVendors();
    })
  }

  sortVendors(){
    for(var i = 0; i < this.vendors.length; i++){
      if(this.vendors[i].attributes.location == "Exhibits: 17th to 18th"){
        this.e1718.push(this.vendors[i].attributes);
      } else if (this.vendors[i].attributes.location == "Exhibits: 18th to 19th"){
        this.e1819.push(this.vendors[i].attributes);
      } else if (this.vendors[i].attributes.location == "Exhibits: 19th to 20th"){
        this.e1920.push(this.vendors[i].attributes);
      } else if (this.vendors[i].attributes.location == "Exhibits: 20th to 21st"){
        this.e2021.push(this.vendors[i].attributes);
      } else if (this.vendors[i].attributes.location == "Sponsors: 17th to 18th"){
        this.s1718.push(this.vendors[i].attributes);
      } else if (this.vendors[i].attributes.location == "Sponsors: 18th to 19th"){
        this.s1819.push(this.vendors[i].attributes);
      } else if (this.vendors[i].attributes.location == "Sponsors: 19th to 20th"){
        this.s1920.push(this.vendors[i].attributes);
      } else {
        this.s2021.push(this.vendors[i].attributes);
      }
    }
  }

}
