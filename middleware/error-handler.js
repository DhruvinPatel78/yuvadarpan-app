const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ mag: "There was an error" });
};

export default errorHandlerMiddleware;
