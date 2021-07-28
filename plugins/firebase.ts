import firebase from "firebase/app";
import "@firebase/firestore";
import { WhereFilterOp, OrderByDirection } from "@firebase/firestore-types";

const get = async (doc: string) => {
  try {
    const snapShot = await firebase
      .firestore()
      .collection(doc)
      .get();
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
      .doc();
    setData.id = collectionRef.id;
    const res = await collectionRef.set(setData);
    return collectionRef;
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
    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
  }
  inject("request", {
    get,
    where,
    set
  });
}
