import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Diary';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  create_diary(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_diaries() {
    return this.firestore.collection(this.collectionName, ref => ref.orderBy('Date', "desc")).snapshotChanges();
  }

  update_diary(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_diary(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

}
