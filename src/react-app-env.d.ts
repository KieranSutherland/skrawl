/// <reference types="react-scripts" />
declare module 'react-router-dom';
declare module 'express';
declare module 'node-schedule';

declare type FirebaseCollectionRefData = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
declare type FirebaseDocumentRefData = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
declare type FirebaseQueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
declare type FirebaseLobbyPlayersField = FirebaseLobbyPlayerField[]
declare type FirebaseLobbyPlayerField = { uid: string, displayName: string, finishedRound: boolean, scenarioObj: FirebaseScenarioField }
declare type FirebaseLobbyMessagesField = { displayName: string, message: string }[]
declare type FirebaseScenarioField = {originPlayer: string, scenario: any, phase: ScenarioPhase}
declare type ScenarioPhase = 'draw' | 'guess'