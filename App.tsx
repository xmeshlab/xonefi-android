import * as React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import MainContainer from './navigation/MainContainer'

function App() {
    return (<RootSiblingParent>
            <MainContainer/>
        </RootSiblingParent>);
}

export default App;