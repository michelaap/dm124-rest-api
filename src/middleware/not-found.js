module.exports = (request, response) => {
  return response
    .status(404)
    .json({ error: `Route ${request.method} ${request.url} not found!` });
}
