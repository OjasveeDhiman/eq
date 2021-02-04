const {Pool} = require('pg');
const pool = new Pool();
exports.queryhandler = (req, res, next) => {
    pool.query(req.sqlQuery).then((r) => {
      return res.json(r.rows || [])
    }).catch(next)
  }
