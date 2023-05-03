import React, { useState } from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { useHistory } from "react-router";

const NewEntry: React.FC = () => {

    const { userId } = useAuth()
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [pictureUrl, setPictureUrl] = useState("/assets/Placeholder.png")

    const handleSave = async () => {
        const entriesRef = firestore.collection("users").doc(userId)
            .collection("entries")
        const entryData = { title, description, date }
        const entryRef = await entriesRef.add(entryData)
        console.log("saved:", entryRef)
        history.goBack()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       if(e.target.files.length > 0){
        const file = e.target.files.item(0)
       } 
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>AddEntry</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonInput type="date" value={date} label="Date" labelPlacement="floating" onIonChange={(e) => setDate(e.detail.value)} />
                    </IonItem>
                    <IonItem>
                        <IonInput value={title} label="Title" labelPlacement="floating" onIonChange={(e) => setTitle(e.detail.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Image</IonLabel><br />  
                        <input type="file" accept="image/*" onChange={handleFileChange}/><br />
                        <img src={pictureUrl} alt="" />
                    </IonItem>
                    <IonItem>
                        <IonTextarea value={description} label="Description" labelPlacement="floating" onIonChange={(e) => setDescription(e.detail.value)} />
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={handleSave}>Save</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default NewEntry;
