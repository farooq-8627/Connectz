const requestLogger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	console.log("Headers:", req.headers);
	console.log("Body:", req.body);
	next();
};

export default requestLogger;
