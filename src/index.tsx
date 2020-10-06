import React from 'react'
import ReactDOM from 'react-dom'
import './css/base.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Game from './components/Game'
import PrivateLobby from './components/PrivateLobby'
import PrivateLobbyCreator from './components/PrivateLobbyCreator'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
		<Router>
			<Header />	
			<Switch>
				<Route exact path="/" >
					<Home />
				</Route>
				<Route path="/game" >
					<Game />
				</Route>
				<Route path="/private-lobby" >
					<PrivateLobby />
				</Route>
				<Route path="/private-lobby-creator" >
					<PrivateLobbyCreator />
				</Route>
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
