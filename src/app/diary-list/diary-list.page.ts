import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, RouterModule } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.page.html',
  styleUrls: ['./diary-list.page.scss'],
})
export class DiaryListPage implements OnInit {

  diaryList = [];
  datenew: string;
  Today:boolean = false;
  datenow: any = new Date().toISOString();
  feeling = {
    smiling: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/beaming-face-with-smiling-eyes_1f601.png',
    screaming: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-screaming-in-fear_1f631.png',
    flushed: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/flushed-face_1f633.png',
    thermometer: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-with-thermometer_1f912.png',
    expressionless: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/expressionless-face_1f611.png',
    angry: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/pouting-face_1f621.png',
    crying: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/loudly-crying-face_1f62d.png',
  };
  textdata:string = 'All';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public alertController: AlertController,
    private firestore: AngularFirestore,
  ) { }

  read_Diaries() {
    if (this.Today == true) {
      this.textdata = 'Today';
      return this.firestore.collection('Diary', ref => ref.where("Date", ">=", this.datenow.substring(0,10)).orderBy('Date', "desc")).snapshotChanges();
    }else{
      this.textdata = 'All';
      return this.firestore.collection('Diary', ref => ref.orderBy('Date', "desc")).snapshotChanges();
    }
  }

  ngOnInit() {
    // console.log(this.datenow.substring(0,10));
    this.read_Diaries().subscribe(data => {

      this.diaryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Date: e.payload.doc.data()['Date'],
          Title: e.payload.doc.data()['Title'],
          Detail: e.payload.doc.data()['Detail'],
          Feeling: e.payload.doc.data()['Feeling'],
        };
      })

    });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_diary(rowID);
  }


  navigate() {
    this.router.navigate(['/create-diary'])
  }

  navEdit(data) {
    let dataEdit = JSON.stringify(data);
    this.router.navigate(["edit-diary", dataEdit]);
  }

  editDiary(data) {
    let editdata = JSON.stringify(data);
    this.router.navigate(["edit-diary", editdata]);
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            // console.log('Edit clicked');
            this.navEdit(item);
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // console.log('Delete clicked');
            // this.RemoveRecord(item.id);
            this.presentAlertConfirm(item);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async FilterActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Filter',
      buttons: [
        {
          text: 'Today',
          icon: 'browsers-outline',
          handler: () => {
            this.Today = true;
            console.log(this.Today);
            this.ngOnInit();
          }
        }, {
          text: 'All',
          role: 'destructive',
          icon: 'albums-outline',
          handler: () => {
            this.Today = false;
            this.ngOnInit();
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
      message: 'Do you want to <strong>Delete</strong> it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            // console.log('Delete');
            this.RemoveRecord(item.id);
          }
        }
      ]
    });

    await alert.present();
  }

  open_diary(data) {
    // console.log(data)
    // let a = data.id
    // console.log(a.Name)
    let detail = JSON.stringify(data);
    this.router.navigate(["diary", detail]);
    // this.navCtrl.pus(diary,{detail:detail});
  }

}
