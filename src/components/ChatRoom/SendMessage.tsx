import React, { useState } from 'react'
import CustomCssTextField from '../mui/CustomCssTextField'

export default function SendMessage() {
	const [message, setMessage] = useState<string>('')

	return (
		<div className="sendMessage">
			<CustomCssTextField 
				value={message}
				onChangeMethod={setMessage}
				id="outlined-basic"
				inputLabelColor={"#b9b9b9"}
				inputTextColor={"black"}
				label="Message" />
		</div>
	)
}