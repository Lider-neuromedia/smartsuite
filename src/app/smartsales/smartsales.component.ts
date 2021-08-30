import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSidenav } from '@angular/material/sidenav';
import { HomeService } from '../services/home.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import AOS from 'aos';
import { CommonService } from '../services/common.service';

declare var $ : any; 

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    // return this.sanitized.bypassSecurityTrustHtml(value);
    switch (type) {
      case 'html': return this.sanitized.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitized.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitized.bypassSecurityTrustScript(value);
      case 'url': return this.sanitized.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitized.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}

@Component({
  selector: 'app-smartsales',
  templateUrl: './smartsales.component.html',
  styleUrls: ['./smartsales.component.css']
})
export class SmartsalesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  loader = true;
  submenu:any = [];
  data:any = [];

  constructor(private _sanitizer: DomSanitizer, private _homeservice:HomeService, private common: CommonService) { 

  }

  ngOnInit(): void {
    this.common.paginaSmartSalesMetaData();
    this._homeservice.getMenuSmartsales()
    .subscribe((res:any) => {
      this.submenu = this._sanitizer.bypassSecurityTrustHtml(res);
      this.submenu = this.submenu.changingThisBreaksApplicationSecurity;
    });
    this._homeservice.getHomeSmartsales()
    .subscribe((res:any) => {
      this.loader = false;
      this.data = this._sanitizer.bypassSecurityTrustHtml(res);
      this.data = this.data.changingThisBreaksApplicationSecurity;
      AOS.init();
    });
  }

  reason = '';
  
  abrirSide(){
    $("#wrapper").toggleClass("toggled");
    $('.overlaytrabaja').addClass('active');
  }

  public cierraTrabajemos() {
    $('.overlaytrabaja').removeClass('active');
    $("#wrapper").toggleClass("toggled");
  }

  
  // public offsetAnchor() {
  //   if (location.hash.length !== 0) {
  //     window.scrollTo(window.scrollX, window.scrollY - 20);
  //   }
  // }
  
  anchorCustom(){
    console.log('entro');
    // window.setTimeout(function() {
    //   this.offsetAnchor();
    // }, 0);
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 1000,
    smartSpeed: 1000,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

}
