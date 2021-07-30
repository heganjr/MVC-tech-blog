const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/:id", async (req, res) => {
  try {
    const commentData = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        // the user_id is based on who is logged in (i.e the req.session)

        post_id: req.params.id
        // used to access information thats provided to you in the url path!

        // post id is based on the params in the url path

    });
   

      res.status(200).json(commentData);
    // When I save the logged in information for the user
    // {{#if logged_in}}
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router

// export the router so I dont have to export each individual route