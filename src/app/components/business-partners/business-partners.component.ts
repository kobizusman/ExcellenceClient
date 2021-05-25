import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { BusinessPartnerService } from 'src/app/services/business-partner.service';
import { BusinessPartner } from '../../models/businessPartner'

@Component({
  selector: 'app-business-partners',
  templateUrl: './business-partners.component.html',
  styleUrls: ['./business-partners.component.scss']
})
export class BusinessPartnersComponent implements OnInit {

  businessPartners: BusinessPartner[];

  constructor(private businessPartnerService: BusinessPartnerService, private toastr: ToastrService
    ,private router: Router) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();



  ngOnInit() {
    this.businessPartnerService.getBusinessPartners().subscribe(res => {
      this.businessPartners = res
      this.dtTrigger.next();
      if (this.businessPartners.length == 0)
        this.toastr.info('To create a new BP please press on the tab Add BP on the nav bar', 'Your list is empty',
          {
            positionClass: 'toast-center-center',
            timeOut: 10000
          });
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

  }

  removeBusinessPartner(identityCard: string) {
       this.businessPartnerService.removeBusinessPartner(identityCard)
       .subscribe(res =>{
        this.toastr.success('Business Partner added successfully ', '( :')  
        this.businessPartners = this.businessPartners.filter(b => b.identityCard !== identityCard);
        window.location.reload();
        }, err => {
          this.toastr.error(err.error.message, "Error, ):")
        });
    }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}