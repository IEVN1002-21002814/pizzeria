import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import ListaOrdenComponent from "../lista-orden/lista-orden.component";
import Pedidos from '../../models/Pedido';
import { LocalStorageSetService } from '../../services/local-storage-set.service';
import { FiltradoComponent } from "../filtrado/filtrado.component";

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, ListaOrdenComponent, FiltradoComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export default class FormularioComponent {
  formGroup!:FormGroup;
 
  datos:Pedidos={
    nombre:'',
    direccion:'',
    tamanio:'',
    ingredientes:[''],
    telefono:0,
    nopizzas:0,
    fecha: '',
    subtotal: 0
  }

  constructor(private fb:FormBuilder, public localStorageService: LocalStorageSetService) { }

  ngOnInit(): void{
    this.formGroup = this.initForm();
  }
  
  initForm():FormGroup{
    return this.fb.group({
      nombre:['', Validators.required],
      direccion:['',  Validators.required],
      tamanio:['',  Validators.required],
      ingredientes:this.fb.array([]),
      telefono:[0,  Validators.required],
      nopizzas:[0,  [Validators.required, Validators.min(1)]],
      fecha:['',  Validators.required]
    })
  }

  onCheckboxChange(e: any) {
    const ingredientes: FormArray = this.formGroup.get('ingredientes') as FormArray;
  
    if (e.target.checked) {
      ingredientes.push(new FormControl(e.target.value));
    } else {

      const index = ingredientes.controls.findIndex(x => x.value === e.target.value);
      ingredientes.removeAt(index);
    }
  }

  onSubmit():void{
    const {nombre, direccion, tamanio, ingredientes, telefono, nopizzas, fecha} = this.formGroup.value;
    
    this.datos.nombre = nombre;
    this.datos.direccion = direccion;
    this.datos.tamanio = tamanio;
    this.datos.ingredientes = ingredientes;
    this.datos.telefono = telefono;
    this.datos.nopizzas = nopizzas;
    this.datos.fecha = fecha;
    this.datos.subtotal = this.localStorageService.calculoSubTotal(tamanio, nopizzas, ingredientes);

    this.localStorageService.localStorageSett(this.datos);
  }

  
}
