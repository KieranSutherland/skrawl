/// <reference types="react-scripts" />
declare module 'react-router-dom';
declare module 'express';
declare module 'node-schedule';
declare module 'react-color';

declare type FirebaseCollectionRefData = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
declare type FirebaseDocumentRefData = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
declare type FirebaseDocumentSnapshotData = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
declare type FirebaseQueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
declare type FirebaseLobbyPlayersField = FirebaseLobbyPlayerField[]
declare type FirebaseLobbyMessagesField = { 
	displayName: string, 
	message: string 
}[]
declare type FirebaseLobbyPlayerField = { 
	uid: string, 
	displayName: string, 
	finishedRound: boolean,
	points: number | null
}
declare type FirebaseScenariosField = {
	originalPlayer: string 
	assignedPlayer: string,
	scenarioAttempts: ScenarioAttempt[]
}
declare type ScenarioAttempt = {
	attempt: any, 
	attemptBy: string,
	attemptByDisplayName: string,
	phase: ScenarioPhase,
}
declare type ScenarioPhase = 'draw' | 'guess'