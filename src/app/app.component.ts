import { AsyncPipe, CommonModule, JsonPipe, } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { single } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tile Caluclator';
  food$: any;
  subtotal = signal(0);
  orderplaced: boolean = false;
  colorProp: string = 'red';
  intialId: number = 1001;
  initialValue: any = [];
  isShow: boolean = false;
  customerName = <any>signal('');
  mobile = <any>signal(0)



  widthSize = signal(10)
  boxsize = signal(16);
  lengthSize = signal(10)
  price = signal(35)
  box = signal(1)
  addRow: WritableSignal<any[]> = signal<any[]>([]);
  tileName: any = [{ name: 'Astetic Grey ', box: 23, id: 1 }, { name: 'Beige Brown', box: 25, id: 2 }, { name: 'Black Blue', box: 125, id: 3 }, { name: 'Golden Base', box: 26, id: 4 }, { name: 'Wooden Grey', box: 36, id: 5 }, { name: 'Armani Gold', box: 66, id: 6 }]
  constructor(private cd: ChangeDetectorRef) { }
  markForCheck() {
    this.cd.markForCheck();
  }
  pendingTile = signal(this.tileName)
  reset() {
    this.addRow.set([])
  }
  customerNameFN(val:any) {
    this.customerName.set(val.target.value);
  }
  MobileFN(val:any) {
    this.mobile.set(val.target.value);
  }
  areacal(val: any, ch: any, id: any) {

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

    if (ch == 'tile') {
      this.addRow.update((item: any) => item.map((itm: any) => {
        return (itm.id == id) ? { ...itm, name: val.target.value } : itm

      }));
    }
    if (ch == 'box') {
      this.addRow.update((item: any) => item.map((itm: any) => {
        return (itm.id == id) ? { ...itm, box: +val.target.value } : itm

      }));
    }

  }

  remove(id: any) {
    this.idnum.update((i: any) => i - 1)
    console.log(id)
    this.addRow.update((item: any) => item.filter((itm: any) => {
      return itm.id !== id

    }));
  }
  size(e: any, id: any) {
    // console.log(id, e)
    this.boxsize.set(e.target.value);
    this.addRow.update((item: any) => item.map((itm: any) => {
      return (itm.id == id) ? { ...itm, size: +e.target.value, box: Math.ceil(itm.width * itm.length / +e.target.value) } : itm

    }));
  }
  area = computed(() => (this.widthSize() * this.lengthSize())+10)
  noofbox = computed(() => Math.ceil((this.area() / this.box())))
  total = computed(() => (this.widthSize() * this.lengthSize()) * this.price())
  idnum: any = signal(0)
  addrowfn() {
    this.idnum.update((i: any) => i + 1)
    this.addRow.update((item => ([...item, { id: this.idnum(), width: 10, length: 10, price: 35, size: 'size', box: 7 }])))
  }

  selectiles(e: any) {
    const numval = e.target.value;
    console.log(numval)
  }
  cc = effect(() => console.log(this.addRow()))


  totalCompute = computed(() => this.addRow().reduce((acc: any, itm: any) => {
    return acc + itm.box* 16 * itm.price
  }, 0))
  totalbox = computed(() => this.addRow().reduce((acc: any, itm: any) => {
    return acc + itm.box 
  }, 0))





}





