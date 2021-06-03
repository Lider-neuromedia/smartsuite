import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $ : any; 

@Component({
  selector: 'app-intrack',
  templateUrl: './intrack.component.html',
  styleUrls: ['./intrack.component.css']
})
export class IntrackComponent implements OnInit {
  public userside: any;

  constructor(private http: HttpClient) { 
    this.userside = {
      empresa: '',
      nombres: '',
      telefono: '',
      email: '',
      producto: '',
      acepto: ''
    };
  }

  ngOnInit(): void {
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


  enviarForm(form) {
    $.ajax({
      url: '',
      type: 'POST',
      data: JSON.stringify(this.userside),
      dataType:"json",
      success: function(data) {
       
      }, error: function(error){
        if(error.status === 200){
          /*Swal.fire({
            icon: 'success',
            title: 'Gracias por regalarnos tus datos. Nos comunicaremos contigo.',
            showConfirmButton: true
          });*/ 
          //console.log(error);
        form.reset();
        } else {
          /*Swal.fire('Oops...', 'Algo pasó. Corrige los errores, por favor!', 'error')*/
        }
      }
    });
   }

}