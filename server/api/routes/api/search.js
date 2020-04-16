let router = require("express").Router();
// const esConnection = require("../../connection");
//
// async function insertCatData(name, origin, data) {
//   let bulkOps = [];
//   try {
//     bulkOps.push({
//       index: { _index: esConnection.index, _type: esConnection.type },
//     });
//
//     bulkOps.push({
//       name,
//       origin,
//       data,
//     });
//
//     await esConnection.client.bulk({body: bulkOps});
//     bulkOps = [];
//     console.log(`Indexed Cat Info`);
//   } catch (e) {
//     console.log(e);
//   }
// }

router.post("/", function (req, res, next) {});

module.exports = router;
