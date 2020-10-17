export default class Message {

	readonly nickname: string
	readonly body: string

	constructor(nickname: string, body: string) {
		this.nickname = nickname
		this.body = body
	}
	
}