require("dotenv").config()
require("express-async-errors")

const express = require("express")
const { connectDB } = require("./database/connect")
const { errorHandlerMiddleware } = require("./middleware/error-handler")
const { notFoundRoute } = require("./middleware/not-found-route")
const { productsRouter } = require("./router/products")
const app = express()

// async errors

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
	res.send(`
        <h1> hello 
        </h1>
        <a href="/api/v1/products">back home</a>
    `)
})

app.use("/api/products", productsRouter)

app.use(notFoundRoute)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		console.log("connected")

		app.listen(PORT, () => {
			console.log(`listening on port = ${PORT}`)
		})
	} catch (error) {}
}

start()
