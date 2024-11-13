import { Injectable } from '@angular/core';
import Pedidos from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageSetService {
  /* pedido: Pedidos; */
  arrayPedidos:  Pedidos[] = [];

  constructor() { 
    console.log('LocalStorageSetService constructor Iniciado');
  }

  localStorageSett(datos:Pedidos):void{

    const pedidosLocal = JSON.parse(localStorage.getItem('pedidos') || '{}'); 

    if (!pedidosLocal[datos.nombre]) {
      pedidosLocal[datos.nombre] = [];
    }
    const nuevoId = pedidosLocal[datos.nombre].length;

    const nuevoPedido = {
      id: nuevoId,
      direccion: datos.direccion,
      tamanio: datos.tamanio,
      ingredientes: datos.ingredientes,
      telefono: datos.telefono,
      nopizzas: datos.nopizzas,
      fecha: datos.fecha,
      subtotal: datos.subtotal
    };
    pedidosLocal[datos.nombre].push(nuevoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosLocal));
  }

  localStorageGett(): { nombre: string; pedidos: any[] }[] {
    const pedidosLocal = JSON.parse(localStorage.getItem('pedidos') || '{}');
    return Object.keys(pedidosLocal).map(nombre => ({
      nombre,
      pedidos: pedidosLocal[nombre]
    }));
  }


  calculoSubTotal(tam: string, cant:number, ingre: any[]):number{
    let subtotal = 0;
    let extras = 0;
    switch (tam) {
      case 'chica':
         extras = (ingre.length * 10);
         subtotal = (extras + 40) * cant;
        break;
      case 'mediana':
         extras = (ingre.length * 10);
         subtotal = (extras + 80) * cant;
        break;
      case 'grande':
         extras = (ingre.length * 10);
         subtotal = (extras + 120) * cant;
        break;
    
      default:
        break;
    }
    return subtotal;
  }

  eliminarLocalStorage(eliminar:string):void{
    let valores: string[] = eliminar.split('-');
    let nombre = valores[0];
    let idEliminar = parseInt(valores[1]);;

    const pedidosLocal = JSON.parse(localStorage.getItem('pedidos') || '{}');

    if (pedidosLocal[nombre]) {
      pedidosLocal[nombre] = pedidosLocal[nombre].filter((pedido: any) => pedido.id !== idEliminar);

      pedidosLocal[nombre].forEach((pedido: any, index: number) => {
          pedido.id = index; 
      });

      if (pedidosLocal[nombre].length === 0) {
          delete pedidosLocal[nombre];
      }
      localStorage.setItem('pedidos', JSON.stringify(pedidosLocal));
  }
  }


  dateObtener(day: string): { nombre: string; total: number }[] {
    console.log(day)
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado','domingo'];
    const pedidosLocal = JSON.parse(localStorage.getItem('pedidos') || '{}');
    const diadios: string = day.toLocaleLowerCase();

    let resumenPedidos: { [key: string]: number } = {};
      
    Object.keys(pedidosLocal).forEach(nombre => {
      let pedidos: Pedidos[] = pedidosLocal[nombre];
      pedidos.forEach((pedid: Pedidos) => {
        let fecha = new Date(pedid.fecha);
        let dia = fecha.getDay();
        console.log('No. Dia:',dia)

        if (dia === diasSemana.indexOf(diadios)) {
          if (!resumenPedidos[nombre]) {
            resumenPedidos[nombre] = 0; 
          }
          console.log('Sumando')
          resumenPedidos[nombre] += (pedid.subtotal);
        }
      });
    });

    return Object.keys(resumenPedidos).map(nombre => ({
      nombre,
      total: resumenPedidos[nombre]
    }));
  }
}
