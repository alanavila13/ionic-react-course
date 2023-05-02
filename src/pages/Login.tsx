import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router";

import { auth } from "../firebase";

import { useAuth } from "../auth";

const Login: React.FC = () => {
  const { loggedIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState({loading: false, error: false})

  const handleLogin = async () => {
    try {
      setStatus({loading: true, error: false})
      const credential = await auth.signInWithEmailAndPassword(email, password)
      console.log(credential);
    } catch (error) {
      setStatus({loading: false, error: true})
      console.log("error: ", error);
    }

  }

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value)} label="Email" labelPlacement="floating" type="email" />
          </IonItem>
          <IonItem>
            <IonInput value={password} onIonChange={(e) => setPassword(e.detail.value)} label="Password" labelPlacement="floating" type="password" />
          </IonItem>
        </IonList>
        {status.error && (
          <IonText color="danger">Invidalid Credentials</IonText>
        )}
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default Login;
