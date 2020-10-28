import React from 'react'
import ReactDOM from 'react-dom'
import './css/base.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Game from './components/Game'
import PrivateLobby from './components/privateLobby/PrivateLobby'
import PrivateLobbyJoin from './components/privateLobby/PrivateLobbyJoin'
import PrivateLobbyCreate from './components/privateLobby/PrivateLobbyCreate'
import PrivateLobbyCreator from './components/privateLobby/PrivateLobbyCreator'
import TermsAndConditions from './components/legals/TermsAndConditions'
import Privacy from './components/legals/Privacy'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import FIREBASE_API_KEY from './secrets'

firebase.initializeApp(FIREBASE_API_KEY)

ReactDOM.render(
    <React.StrictMode>
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" render={() => <Home />} />
				<Route path="/game" render={() => <Game />} />
				<Route path="/private-lobby" render={() => <PrivateLobby />} />
				<Route path="/private-lobby-join" render={() => <PrivateLobbyJoin />} />
				<Route path="/private-lobby-create" render={() => <PrivateLobbyCreate />} />
				<Route path="/private-lobby-creator" render={() => <PrivateLobbyCreator />} />
				<Route path="/terms-and-conditions" render={() => <TermsAndConditions />} />
				<Route path="/privacy" render={() => <Privacy />} />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
