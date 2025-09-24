import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerHelper } from '../../core/services/spinner-helper';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.css']
})
export class Spinner implements OnInit {
  constructor(public spinner: SpinnerHelper) {}

  ngOnInit(): void {
    // this.spinner.show();

    // // Wait for 2 seconds, then hide spinner
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 2000);
  }
}
