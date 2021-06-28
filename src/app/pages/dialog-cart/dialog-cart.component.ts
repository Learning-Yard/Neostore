import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/assets/services/api.service';
import { CartComponent, DialogData } from '../cart/cart.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dialog-cart',
  templateUrl: './dialog-cart.component.html',
  styleUrls: ['./dialog-cart.component.scss']
})
export class DialogCartComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit(): void {
  }
  
/**
 * Action is performed and the data is not passed and dialogue is closed
 *
 * @memberof DialogCartComponent
 */
onNoClick(): void {
    this.dialogRef.close('false');
  }

/**
 *
 * Action is performed and the data is passed and dialogue is closed
 * @memberof DialogCartComponent
 */
onOkClick() {
    this.dialogRef.close('true');
  }

}
