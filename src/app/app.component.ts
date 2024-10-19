import { AsyncPipe, CommonModule, JsonPipe, } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { single } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resto';
  food$: any;
  subtotal = signal(0);
  orderplaced: boolean = false;
  colorProp: string = 'red';
  intialId: number = 1001;
  initialValue: any = [];




  widthSize = signal(10)
  boxsize = signal(16);
  lengthSize = signal(10)
  price = signal(35)
  box = signal(1)
  addRow: WritableSignal<any[]> = signal<any[]>([]);
  constructor(private cd: ChangeDetectorRef) { }
  markForCheck() {
    this.cd.markForCheck();
  }

  areacal(val: any, ch: any, id: any) {
    console.log(id)
    if (ch == 'width') {
      this.widthSize.set(+val.target.value);
      this.addRow.update((item: any) => item.map((itm: any) => {
        return (itm.id == id) ? { ...itm, width: +val.target.value, box: Math.ceil(this.widthSize() * this.lengthSize() / this.boxsize()) } : itm

      }));
    }
    if (ch == 'length') {
      this.lengthSize.set(+val.target.value);
      this.addRow.update((item: any) => item.map((itm: any) => {
        return (itm.id == id) ? {
          ...itm, length: +val.target.value, box: Math
            .ceil(this.widthSize() * this.lengthSize() / this.boxsize())
        } : itm

      }));
    }
    if (ch == 'price') {
      this.price.set(+val.target.value);
      this.addRow.update((item: any) => item.map((itm: any) => {
        return (itm.id == id) ? { ...itm, price: +val.target.value } : itm

      }));
    }

  }

  updaterow(id: any, val: any) {

  }
  size(e: any, id: any) {
    // console.log(id, e)
    this.boxsize.set(e.target.value);
    this.addRow.update((item: any) => item.map((itm: any) => {
      return (itm.id == id) ? { ...itm, size: +e.target.value, box: Math.ceil(itm.width * itm.length / +e.target.value) } : itm

    }));
  }
  area = computed(() => (this.widthSize() * this.lengthSize()))
  noofbox = computed(() => Math.ceil((this.area() / this.box())))
  total = computed(() => (this.widthSize() * this.lengthSize()) * this.price())
  idnum: any = 0
  addrowfn() {
    this.addRow.update((item => ([...item, { id: ++this.idnum, width: 10, length: 10, price: 35, size: 'size', box: 7 }])))
  }

  cc = effect(() => console.log(this.addRow()))


  totalCompute = computed(() => this.addRow().reduce((acc: any, itm: any) => {
    return acc + itm.width * itm.length * itm.price
  }, 0))
  totalbox = computed(() => this.addRow().reduce((acc: any, itm: any) => {
    return acc + itm.box
  }, 0))





}





