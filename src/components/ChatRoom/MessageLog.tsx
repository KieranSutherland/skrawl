import React from 'react'

export default function MessageLog(props: any) {
	return (
		<div className="messageLog">
			{props.messages && (props.messages as FirebaseLobbyMessagesField).reverse().map((msg, index) => {
				return (<div className="message" key={index}>
							<div className="messageLogDisplayName">{msg.displayName}</div>
							<div>{msg.message}</div>
						</div>)
			})}
		</div>
	)
}