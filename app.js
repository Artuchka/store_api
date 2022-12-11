const express = require("express")
const app = express()
require("dotenv").config()

const PORT = proccess.env.PORT

app.listen(PORT, () => {
	console.log(`listening on port = ${PORT}`)
})
