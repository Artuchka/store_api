const { connectDB } = require("./database/connect")
const { ProductModel } = require("./model/Product")
require("dotenv").config()

const data = require("./products.json")

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		await ProductModel.deleteMany()
		await ProductModel.create(data)
		console.log("success")
		process.exit(0)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}
start()
