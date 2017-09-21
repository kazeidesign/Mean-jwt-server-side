function pagesRouter(router, connection, response, sendError) {

  // Get all pages
  router.get('/pages', (req, res) => {
    connection((db) => {
      db.collection('pages')
        .find()
        .toArray()
        .then((data) => {
          response.data = data;
          res.json(response);
        })
        .catch((err) => {
          sendError(err, res);
        });
    });
  })


  // Get one pages
  router.get('/pages/:slug', (req, res) => {
    connection((db) => {
      db.collection('pages')
        .find({
          "slug": req.params.slug
        })
        .toArray()
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
