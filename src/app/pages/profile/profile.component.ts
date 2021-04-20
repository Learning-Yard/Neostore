import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from '../../../assets/services/profile-data.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogueProfileComponent } from '../dialogue-profile/dialogue-profile.component';

export interface DialogData {
  [x: string]: any;
  animal: string;
  name: string;
  }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profile:any=[]
  name: any;
  animal: any;

  constructor(private service:ProfileDataService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.profile = this.service.UserProfile;
    console.log(this.profile);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueProfileComponent, {
      width: 'auto',
      data: {name: this.name, animal: this.animal}
    });

}
}
