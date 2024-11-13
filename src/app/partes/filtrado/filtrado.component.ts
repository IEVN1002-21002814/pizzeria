import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageSetService } from '../../services/local-storage-set.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filtrado.component.html',
  styles: ``
})
export class FiltradoComponent {
  /* @Input()
  filtro: any[]; */
  resumenPedidos: { nombre:string; total:number }[] = [];

  filtrosDates!:FormGroup;
  constructor(private daF:FormBuilder, public localStorageService: LocalStorageSetService){ }

  ngOnInit(): void{
    this.filtrosDates = this.initForm();
  }
  
  initForm():FormGroup{
    return this.daF.group({
      dayValue:[''],
      mesValue:['']
    })
  }
    
  onSubmit():void{
    
  }

  diaSearch():void{
    console.log('Click');
    /* 
    const {day, mounth} = this.filtrosDates.value; */
    const dayValue = this.filtrosDates.get('dayValue')?.value;
    console.log(dayValue);
    this.resumenPedidos = this.localStorageService.dateObtener(dayValue);
  }
}
