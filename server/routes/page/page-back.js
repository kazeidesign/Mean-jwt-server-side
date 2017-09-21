function pagesRouter(router, connection, response, sendError) {

  // Create new page
  router.post('/pages', (req, res) => {
    connection((db) => {
      db.collection('pages')
        .save(req.body)
        .then((data) => {
          response.data = data;
          res.json(response);
        })
        .catch((err) => {
          sendError(err, res);
        });
    });
  })
}

module.exports.pagesRouter = pagesRouter;
