export default class PlayerDetails {

	readonly displayName: string
	finished: boolean

	constructor(displayName: string) {
		this.displayName = displayName
		this.finished = false
	}
	
}