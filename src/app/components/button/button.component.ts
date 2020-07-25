import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: string = 'button'
  @Input() name: string;
  @Input() id: string;
  @Input() className: string;
  @Input() secondary: boolean = false;
  @Output() onClick = new EventEmitter
  @Output() hover = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

}
