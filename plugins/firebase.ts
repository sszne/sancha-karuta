import firebase from "firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import { WhereFilterOp, OrderByDirection } from "@firebase/firestore-types";
import html2canvas from "html2canvas";

const get = async (
  doc: string,
  orderby: OrderByDirection | undefined,
  orderbyField: string
) => {
  try {
    const collectionRef = await firebase.firestore().collection(doc);
    const snapShot = orderby
      ? await collectionRef.orderBy(orderbyField, orderby).get()
      : await collectionRef.get();
    const result = snapShot.docs.map(doc =>
      doc.data({ serverTimestamps: "estimate" })
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const where = async (
  doc: string,
  field: string,
  operator: WhereFilterOp,
  searchValue: string,
  orderby: OrderByDirection | undefined,
  orderbyField: string
) => {
  try {
    const collectionRef = firebase
      .firestore()
      .collection(doc)
      .where(field, operator, searchValue);
    const snapShot = orderby
      ? await collectionRef.orderBy(orderbyField, orderby).get()
      : await collectionRef.get();
    const result = snapShot.docs.map(doc =>
      doc.data({ serverTimestamps: "estimate" })
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const set = async (doc: string, setData: any) => {
  try {
    const collectionRef = firebase
      .firestore()
      .collection("karuta")
      .doc(doc);
    setData.createdAt = firebase.firestore.Timestamp.now();
    const res = await collectionRef.set(setData);
    return collectionRef;
  } catch (err) {
    console.log(err);
  }
};

const uploadImage = async (selector: any, postId: string) => {
  try {
    window.scrollTo(0, 0);
    const canvas = await html2canvas(selector, {
      allowTaint: false,
      useCORS: true,
      imageTimeout: 0,
      scale: 1
    });
    const img = canvas.toDataURL();
    const storageRef = firebase.storage().ref();
    const imagePathRef = storageRef.child(`images/${postId}`);
    const uploadImageSnapshot = await imagePathRef.putString(img, "data_url");
    const url = uploadImageSnapshot.ref.getDownloadURL();
    console.log("url", url);
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default function injectFirebase(context: any, inject: any) {
  const firebaseConfig = {
    apiKey: context.$config.apiKey,
    authDomain: context.$config.authDomain,
    projectId: context.$config.projectId,
    storageBucket: context.$config.storageBucket,
    messagingSenderId: context.$config.messagingSenderId,
    appId: context.$config.appId
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  inject("request", {
    get,
    where,
    set,
    uploadImage
  });
}
