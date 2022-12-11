const { connect } = require("mongoose")

const connectDB = (uri) => {
	return connect(uri)
}

module.exports = { connectDB }
