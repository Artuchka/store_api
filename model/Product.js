const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must provide name!"],
	},
	price: {
		type: Number,
		required: [true, "must provide price!"],
	},
	company: {
		type: String,
		enum: {
			values: ["marcos", "liddy", "ikea", "caressa"],
			message: "company='{VALUE}' is not supported",
		},
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

const model = new mongoose.model("Product", ProductSchema)

module.exports = { ProductModel: model }
