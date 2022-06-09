const express = require("express");
const router = express.Router();
const { User, Blog } = require("../models");

router.get("/", (req, res) => {
  Blog.findAll().then((blogs) => {
    console.log(blogs);
    const hbsBlogs = blogs.map((blog) => blog.get({ plain: true }));
    console.log("==========");
    console.log(hbsBlogs);
    const loggedIn = req.session.user ? true : false;
    res.render("home", {
      blogs: hbsBlogs,
      loggedIn,
      username: req.session.user?.username,
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  res.render("login");
});

router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  User.findByPk(req.session.user.id, {
    include: [Blog],
  }).then((userData) => {
    console.log(userData);
    const hbsData = userData.get({ plain: true });
    console.log("=======");
    console.log(hbsData);
    hbsData.loggedIn = req.session.user ? true : false;
    res.render("profile", hbsData);
  });
});
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("editPost", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
