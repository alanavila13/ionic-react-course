import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";

import { trash } from "ionicons/icons"

import { Entry, toEntry } from "../models";

import { firestore } from "../firebase";
import { useAuth } from "../auth";

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  //Aqui hubo un error de ts por el cual se tuvo que declarar el tipado de id
  const { id } = useParams<RouteParams>();

  const history = useHistory()

  const { userId } = useAuth()

  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore.collection("users").doc(userId).collection("entries").doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [userId]);

  const handleDelete = async () => {
    const entryRef = firestore.collection("users").doc(userId).collection("entries").doc(id);
    await entryRef.delete()
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.date}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trash} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
