import React from "react";
import {
    IonBackButton,
    IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";

import { entries } from "../helpers/data";

interface RouteParams {
    id: string
}

const EntryPage: React.FC = () => {
  //Aqui hubo un error de ts por el cual se tuvo que declarar el tipado de id
  const { id } = useParams<RouteParams>();
  const entry = entries.find((entry) => entry.id === id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton />
            </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{entry?.description}</IonContent>
    </IonPage>
  );
};

export default EntryPage;
