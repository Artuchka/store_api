const { ProductModel } = require("../model/Product")

const getAllProductsStatic = async (req, res) => {
	const items = await ProductModel.find({})
	res.status(200).json({ items })
}
const getAllProducts = async (req, res) => {
	const queryObject = { ...req.query }
	if ("name" in queryObject) {
		queryObject.name = { $regex: queryObject.name, $options: "i" }
	}
	if ("price" in queryObject) {
		queryObject.price = { $lte: queryObject.price }
	}
	if ("rating" in queryObject) {
		queryObject.rating = { $gte: queryObject.rating }
	}
	if ("sort" in queryObject) {
		queryObject.sort = queryObject.sort.split(",").join(" ")
	}
	if ("numericFilters" in queryObject) {
		const operatorsMap = {
			"<": "$lt",
			"<=": "$lte",
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
		}

		const regex = /\b(<|<=|=|>=|>)\b/
		const filterOptions = ["rating", "price"]

		const filters = {}

		queryObject.numericFilters.split(",").forEach((filter) => {
			const replacement = filter.replace(regex, (text) => {
				if (text in operatorsMap) {
					return `-${operatorsMap[text]}-`
				} else {
					return ""
				}
			})
			const [name, sign, amount] = replacement.split("-")
			if (filterOptions.includes(name)) {
				queryObject[name] = { [sign]: amount }
			}
		})
	}

	const page = Number(queryObject.page) || 1
	const limit = Number(queryObject.limit) || 10
	const skip = (page - 1) * limit

	const pagesAmount = Math.ceil(
		(await ProductModel.find(queryObject)).length / limit
	)

	const products = await ProductModel.find(queryObject)
		.sort(queryObject.sort)
		.limit(limit)
		.skip(skip)

	res.status(200).json({
		success: true,
		amount: products.length,
		pagesAmount,
		products,
	})
}

module.exports = { getAllProducts, getAllProductsStatic }
