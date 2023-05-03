import { Redirect, Route } from "react-router-dom";
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from "@ionic/react";

import { home, settings } from "ionicons/icons";

import Home from "./pages/Home";
import Settings from "./pages/Settings";
import EntryPage from "./pages/EntryPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useAuth } from "./auth";
import NewEntry from "./pages/NewEntry";

setupIonicReact();

const AppTabs: React.FC = ({  }) => {
    const { loggedIn } = useAuth()
    if(!loggedIn){
        return <Redirect to="/login" />
    }
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/my/entries">
                    <Home />
                </Route>
                <Route exact path="/my/entries/view/:id">
                    <EntryPage />
                </Route>
                <Route exact path="/my/entries/add">
                    <NewEntry />
                </Route>
                <Route exact path="/my/settings">
                    <Settings />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/my/entries">
                    <IonIcon icon={home}></IonIcon>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="settings" href="/my/settings">
                    <IonIcon icon={settings}></IonIcon>
                    <IonLabel>Settings</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default AppTabs;
