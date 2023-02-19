import { useState } from "react";
import * as React from 'react';
import AuthNavigation from "./components/Navigation/AuthNavigation";
import InAppNavigation from "./components/Navigation/InAppNavigation";
import AppContext from "./AppContext";

function App() {

    const [user, setUser] = useState(null);

    if(!user){
        return <AuthNavigation setUser={setUser} />
    }

    return (
        <AppContext.Provider value={{ user, logout: () => setUser(null) }}>
            <InAppNavigation />
        </AppContext.Provider>
    )
}

export default App;
