import { Component, Input } from '@angular/core';
import Pedidos from '../../models/Pedido';
import { LocalStorageSetService } from '../../services/local-storage-set.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormArray, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-orden',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './lista-orden.component.html',
  styles: ``
})
export default class ListaOrdenComponent {
  @Input() 
  arrayPedidoo: { nombre: string; pedidos: any[] }[] = [];

  tablaPedidos!:FormGroup;
  constructor(private tP:FormBuilder, public localStorageService: LocalStorageSetService){ }

  ngOnInit(): void{
    this.tablaPedidos = this.initForm();
  }
  
  initForm():FormGroup{
    return this.tP.group({
      eliminado:['']
    })
  }
    
  onSubmit():void{
    
  }

  eliminarP():void{
    const {eliminado} = this.tablaPedidos.value;
    this.localStorageService.eliminarLocalStorage(eliminado); 
  }
}
