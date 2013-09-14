
/*
 * GET home page.
 */

//req.query.queryTerm per REST endpoint
//req.params.paramName quandp assegnato a una delle routes

exports.index = function(req, res){
  res.render('index', { body: req.params.userid });
};