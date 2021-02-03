exports.datapoi = (req, res, next) => {
    req.sqlQuery = `
      SELECT *
      FROM public.poi;
    `
    return next()
  };

  // module.exports = datapoi;