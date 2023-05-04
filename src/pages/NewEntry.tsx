import React, { useEffect, useRef, useState } from "react";
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

import { firestore, storage } from "../firebase";
import { useAuth } from "../auth";
import { useHistory } from "react-router";

async function savePicture(blobUrl, userId){
    const pictureRef = storage.ref(`/users//${userId}/picture/${Date.now()}`)
    const reponse = await fetch(blobUrl)
    const blob = await reponse.blob()
    const snapshot = await pictureRef.put(blob)
    const url = await snapshot.ref.getDownloadURL()
    console.log('saved pic:', url);
    return url
}

const NewEntry: React.FC = () => {

    const { userId } = useAuth()
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [pictureUrl, setPictureUrl] = useState("/assets/Placeholder.png")

    const fileInputRef = useRef<HTMLInputElement>()

    useEffect(() => () => {
        if(pictureUrl.startsWith('blob:')){
            URL.revokeObjectURL(pictureUrl)
        }
    }, [pictureUrl])
    

    const handleSave = async () => {
        const entriesRef = firestore.collection("users").doc(userId)
            .collection("entries")
        const entryData = { title, description, date, pictureUrl }
        if(pictureUrl.startsWith('blob:')){
            entryData.pictureUrl = await savePicture(pictureUrl, userId)
        }
        const entryRef = await entriesRef.add(entryData)
        console.log("saved:", entryRef)
        history.goBack()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       if(e.target.files.length > 0){
        const file = e.target.files.item(0)
        const pictureUrl = URL.createObjectURL(file)
        setPictureUrl(pictureUrl)
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
                        <input type="file" accept="image/*" onChange={handleFileChange} hidden ref={fileInputRef}/>
                        <img src={pictureUrl} alt="" style={{cursor: "pointer"}} onClick={() => fileInputRef.current.click()} />
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
