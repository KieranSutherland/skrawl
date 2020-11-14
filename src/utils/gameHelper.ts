import scenarios from '../scenarios.json'

export const generateScenarioList = (sfw: boolean | undefined, players: FirebaseLobbyPlayersField): FirebaseScenariosField[] => {
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
	return scenariosList
}