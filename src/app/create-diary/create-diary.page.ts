import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface DiaryData {
  Date: string;
  Title: string;
  Detail: string;
  Feeling: string;
}

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.page.html',
  styleUrls: ['./create-diary.page.scss'],
})
export class CreateDiaryPage implements OnInit {

  diaryData: DiaryData;
  diaryForm: FormGroup;
  datenow: any = new Date().toISOString();
  emojis: any = [];
  defouleLang: string = "";
  year:string;
  feeling = {
    smiling: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/beaming-face-with-smiling-eyes_1f601.png',
    screaming: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-screaming-in-fear_1f631.png',
    flushed: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/flushed-face_1f633.png',
    thermometer: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/face-with-thermometer_1f912.png',
    expressionless: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/expressionless-face_1f611.png',
    angry: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/pouting-face_1f621.png',
    crying: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/271/loudly-crying-face_1f62d.png',
  };
  emoji = '';

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
  ) {
    this.diaryData = {} as DiaryData;
    this.emojis = ["smiling", "screaming", "flushed", "thermometer", "expressionless", "angry", "crying"];
    this.defouleLang = this.emojis[0];

  }

  ngOnInit() {
    this.year = this.datenow.substring(0,10);
    this.diaryForm = this.fb.group({
      Date: [this.datenow, [Validators.required]],
      Title: ['', [Validators.required]],
      Detail: ['', [Validators.required]],
      Feeling: [this.defouleLang, [Validators.required]],
    });
    // console.log(this.datenow);
    this.emoji = this.feeling[this.defouleLang];
  }

  CreateRecord() {
    // console.log(this.diaryForm.value);
    this.firebaseService.create_diary(this.diaryForm.value).then(resp => {
      // this.diaryForm.reset();
      // console.log(this.diaryForm.value);
      this.back();
    })
      .catch(error => {
        console.log(error);
      });
  }

  back(){
    // console.log("back");
    this.navCtrl.pop();

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
          optionLabelElement.innerHTML += '<img  src="' + this.feeling[image] + '" style="width:30px;height:30px;float:right;margin-right: 15px;"/>';
        }
      }
    }, 100);

  }

  Emoji(){
    this.emoji = this.feeling[this.defouleLang];
  }

}
