import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  diaryList = [];
  getdetail:any;
  Date:any;
  Title:any;
  Detail:any;
  Feeling:any;
  feeling = {
    smiling: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/beaming-face-with-smiling-eyes_1f601.png',
    screaming: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-screaming-in-fear_1f631.png',
    flushed: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/flushed-face_1f633.png',
    thermometer: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-with-thermometer_1f912.png',
    expressionless: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/expressionless-face_1f611.png',
    angry: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/pouting-face_1f621.png',
    crying: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/loudly-crying-face_1f62d.png',
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public navCtrl: NavController,
    public actroute: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.firebaseService.read_diaries().subscribe(data => {

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
      const detail = this.actroute.snapshot.paramMap.get('senddetail');
      this.getdetail = JSON.parse(detail);
      // console.log( this.getdetail);
      this.Date = this.getdetail.Date;
      this.Title = this.getdetail.Title;
      this.Detail = this.getdetail.Detail;
      this.Feeling = this.getdetail.Feeling;
      // console.log(this.Feeling);
    });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_diary(rowID);
    this.back();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            // console.log('Edit clicked');
            this.navEdit(this.getdetail);
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // console.log('Delete clicked');
            // this.RemoveRecord(item.id);
            this.presentAlertConfirm(this.getdetail);
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

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
      message: 'Do you want to <strong>Delete</strong> it',
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

  navEdit(data) {
    let dataEdit = JSON.stringify(data);
    this.router.navigate(["edit-diary", dataEdit]);
  }

  back(){
    this.navCtrl.pop();
    // this.router.navigate(['/diary-list'])
  }

}
