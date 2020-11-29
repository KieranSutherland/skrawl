import scenarios from '../scenarios.json'

export const generateScenarioList = async (sfw: boolean | undefined, players: FirebaseLobbyPlayersField): Promise<FirebaseScenariosField[]> => {
	const scenariosFiltered = sfw ? scenarios.sfw : scenarios.sfw.concat(scenarios.nsfw)
	var scenariosList: FirebaseScenariosField[] = []
	players.forEach(player => {
		const randomIndex = Math.floor(Math.random() * Math.floor(scenariosFiltered.length))
		const scenarioAttemptOriginal: ScenarioAttempt = {
			attempt: scenariosFiltered[randomIndex], 
			attemptBy: 'Original Scenario',
			attemptByDisplayName: 'Original Scenario',
			phase: 'guess', 
		}
		const scenario = {
			originalPlayer: player.uid,
			assignedPlayer: player.uid,
			scenarioAttempts: [scenarioAttemptOriginal]
		}
		scenariosList.push(scenario)
		scenariosFiltered.splice(randomIndex)
	})
	console.log(scenariosList)
	return scenariosList
}

export const sleep = async (msec: number): Promise<any> => {
	return new Promise(resolve => setTimeout(resolve, msec))
}