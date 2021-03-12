import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-diary',
  templateUrl: './edit-diary.page.html',
  styleUrls: ['./edit-diary.page.scss'],
})
export class EditDiaryPage implements OnInit {

  diaryList = [];
  diaryForm: FormGroup;
  getdetail:any;
  Date:any;
  Title:any;
  Detail:any;
  Feeling:any;
  emojis: any = [];
  defouleLang: string = "";
  feel= {
    smiling: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/beaming-face-with-smiling-eyes_1f601.png',
    screaming: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-screaming-in-fear_1f631.png',
    flushed: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/flushed-face_1f633.png',
    thermometer: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-with-thermometer_1f912.png',
    expressionless: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/expressionless-face_1f611.png',
    angry: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/pouting-face_1f621.png',
    crying: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/loudly-crying-face_1f62d.png',
  };
  datenow: any = new Date().toISOString();
  year:string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public navCtrl: NavController,
    public actroute: ActivatedRoute,
    public alertController: AlertController,
  ) {
    this.emojis = ["smiling", "screaming", "flushed", "thermometer", "expressionless", "angry", "crying"];
    this.defouleLang = this.emojis[0];
  }

  ngOnInit() {
    this.year = this.datenow.substring(0,10);
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
      const detail = this.actroute.snapshot.paramMap.get('sendEdit');
      this.getdetail = JSON.parse(detail);
      // console.log( this.getdetail);
      this.Date = this.getdetail.Date;
      this.Title = this.getdetail.Title;
      this.Detail = this.getdetail.Detail;
      this.Feeling = this.getdetail.Feeling;
    });
  }

  UpdateRecord() {
    // console.log(this.Date);
    this.getdetail.isEdit = true;
    let record = {};
    record['Date'] = this.Date;
    record['Title'] = this.Title;
    record['Detail'] = this.Detail;
    record['Feeling'] = this.Feeling;
    this.firebaseService.update_diary(this.getdetail.id, record);
    this.getdetail.isEdit = false;
    this.navCtrl.pop();
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update!',
      message: ' <strong>Update</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Update',
          handler: () => {
            // console.log('Delete');
            this.UpdateRecord();
          }
        }
      ]
    });

    await alert.present();
  }

  OpenEmoji() {
    setTimeout(() => {
      let buttonElements = document.querySelectorAll('div.alert-radio-group button');
      if (!buttonElements.length) {
        this.OpenEmoji();
      } else {
        for (let index = 0; index < buttonElements.length; index++) {
          let buttonElement = buttonElements[index];
          let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
          let image = optionLabelElement.innerHTML.trim();
          optionLabelElement.innerHTML += '<img  src="' + this.feel[image] + '" style="width:30px;height:30px;float:right;margin-right: 15px;"/>';
        }
      }
    }, 100);

  }

  back(){
    this.navCtrl.pop();
  }

}
