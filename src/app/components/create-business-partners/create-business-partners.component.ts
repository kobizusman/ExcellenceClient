import { Component, OnInit } from '@angular/core';
import { BusinessPartner } from 'src/app/models/businessPartner';
import { City } from 'src/app/models/city';
import { Bank } from 'src/app/models/jsonModelBanksAndBrunches';
import { BankBranch } from 'src/app/models/jsonModelBanksAndBrunches';
import { BusinessPartnerService } from 'src/app/services/business-partner.service';
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";


@Component({
  selector: 'app-creat-business-partners',
  templateUrl: './create-business-partners.component.html',
  styleUrls: ['./create-business-partners.component.scss']
})
export class CreateBusinessPartnersComponent implements OnInit {

  
  businessPartner :BusinessPartner;
  city=<City>{};
  bank=<Bank>{};
  branch=<BankBranch>{};
  cities:City[];
  banks:Bank[];
  branches:BankBranch[];
  resultModelBanksAndBranches:any;


  constructor( private businessPartnerService: BusinessPartnerService,
    private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.businessPartner=new BusinessPartner();
    this.getCities();
    this.getBanksAndBrunches();
  }

  createBusinessPartner(createForm:NgForm) {
   
    this.businessPartner.branchName=this.branches.find(b=>b.bankCode== this.businessPartner.bankCode).branchName;
    this.businessPartner.bankDescription=this.banks.find(b=>b.code== this.businessPartner.bankCode).description;
    this.businessPartner.cityName=this.cities.find(c=>c.cityId==this.businessPartner.cityId).name;

    this.businessPartnerService.createBusinessPartner(this.businessPartner).subscribe
    (res =>{
      this.toastr.success('Business Partner added successfully ', '( :')  
      createForm.reset();
       this.router.navigate(['businessPartners/list']); 
      }, err => {
        this.toastr.error(err.error.message, "Error, ):")
      });
  }

  getCities(){
  this.businessPartnerService.getCities().subscribe(
    (res=> {
      this.cities=res;
      if(this.cities.length==0)
      this.toastr.error("There are no existing cities ")
    }),err=>this.toastr.error("Error, ):") ); 
  }

  getBanksAndBrunches(){
     this.businessPartnerService.getAllBanksAndBrunches().subscribe(
    (res=> {
      this.resultModelBanksAndBranches=res;
      this.banks=res.data.banks;
      if(this.banks.length==0)
      this.toastr.error("There are no existing banks ")
    }),err=>this.toastr.error("Error, ):") ); 
  }

  onSelectedBank(event){
    var bankCode=event.target.value;
    this.branches=this.resultModelBanksAndBranches.data.bankBranches.filter(b=>b.bankCode==bankCode).
    sort((n1,n2) => n1 - n2);;
  }
  
}
