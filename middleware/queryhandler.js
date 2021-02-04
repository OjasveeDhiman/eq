const {Pool} = require('pg');
const pool = new Pool(
      user: readonly,
      host: work-samples-db.cx4wctygygyq.us-east-1.rds.amazonaws.com,
      database: work_samples,
      password: w2UIO@#bg532!,
      port: 5432
);
exports.queryhandler = (req, res, next) => {
    pool.query(req.sqlQuery).then((r) => {
      return res.json(r.rows || [])
    }).catch(next)
  }
