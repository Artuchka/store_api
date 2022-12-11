const errorHandlerMiddleware = async (err, req, res, next) => {
	console.log(err)
	return res.status(500).json({
		success: false,
		msg: `smth went wrong...`,
	})
}

module.exports = { errorHandlerMiddleware }
