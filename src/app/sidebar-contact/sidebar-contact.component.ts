import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HomeService } from '../services/home.service';
declare var $ : any; 

@Component({
  selector: 'app-sidebar-contact',
  templateUrl: './sidebar-contact.component.html',
  styleUrls: ['./sidebar-contact.component.css']
})
export class SidebarContactComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public form: any;
  data:any = [];
  url:string;
  dominio: string = environment.domain;

  constructor(private _sanitizer: DomSanitizer, private _homeservice:HomeService, @Inject(PLATFORM_ID) private platform_id) {
    if(isPlatformBrowser(this.platform_id)){
      this.url = window.location.hash.substr(1);
    }
    this.url = this.url.replace("/","");
    this.url = this.url.toUpperCase();
    this.form = {
      empresa: '',
      nombre: '',
      telefono: '',
      email: '',
      producto: this.url,
      acepto: ''
    };
  }

  ngOnInit(): void {
  }

  reason = '';
  
  public cierraTrabajemos() {
    if(isPlatformBrowser(this.platform_id)){
      $('.overlaytrabaja').removeClass('active');
      $("#wrapper").toggleClass("toggled");
    }
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  enviarForm(form) {
    $.ajax({
      url: `${environment.domain}/wp-content/plugins/form-contactenos/mailProducts.php`,
      type: 'POST',
      data: JSON.stringify(this.form),
      dataType:"json",
      success: function(data) {
      }, error: function(error){
        if(error.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Gracias por regalarnos tus datos. Nos comunicaremos contigo.',
            showConfirmButton: true
          }); 
        form.reset();
        } else {
          Swal.fire('Oops...', 'Algo pas??. Corrige los errores, por favor!', 'error')
        }
      }
    });
   }

}
