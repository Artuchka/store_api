const notFoundRoute = (req, res, next) => {
	res.status(404).json({
		success: false,
		msg: `route does not exist`,
	})
}

module.exports = { notFoundRoute }
