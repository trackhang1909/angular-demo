import { User } from './../../user';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() users?: User[]
  @Output() deleteUser = new EventEmitter<any>()
  @ViewChild('closeModal') closeModal!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteUser(id: string) {
    this.deleteUser.emit(id)
    this.closeModal.nativeElement.click()
  }

}
