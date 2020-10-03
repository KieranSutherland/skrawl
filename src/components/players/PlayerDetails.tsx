export default class PlayerDetails {

	readonly nickname: string
	finished: boolean

	constructor(nickname: string) {
		this.nickname = nickname
		this.finished = false
	}
	
}