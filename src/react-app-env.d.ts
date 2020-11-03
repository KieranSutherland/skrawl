/// <reference types="react-scripts" />
declare module 'react-router-dom';
declare module 'express';
declare module 'node-schedule';

declare type FirebaseCollectionRefData = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
declare type FirebaseQueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
declare type FirebaseLobbyPlayersField = { uid: string, displayName: string }[]
declare type FirebaseLobbyMessagesField = { displayName: string, message: string }[]