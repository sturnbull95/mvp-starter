const router = require('express').Router();
const controller = require('./controller')

router.route('/types').post(controller.type)
router.route('/favorites')
.get(controller.get)
.post(controller.post)
.delete(controller.delete)
//.put(controller.put);
module.exports = router;
