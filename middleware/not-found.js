const notFound = (req, res) => res.status(404).send("Invalid Uri");

module.exports = notFound;
