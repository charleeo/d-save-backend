const express = require('express');
const postsController = require('../controllers/PostController');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, postsController.save);
router.get("/", postsController.index);
router.get("/:id", postsController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, postsController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postsController.destroy);
router.get("/get_by_cat_id/:id",  postsController.getPostByCat);
router.get('/cat/:id',postsController.showCat)
module.exports = router;
