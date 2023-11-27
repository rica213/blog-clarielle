const Blog = require("../models/blog");
const processHTMLWithPostHTML = require("../htmlProcessor");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById(id);
    if (!result) {
      return res.status(404).render("404");
    }
    result.body = await processHTMLWithPostHTML(result.body);

    res.render("blogs/details", { blog: result });
  } catch (error) {
    return res.status(404).render("404");
    console.log(error);
  }
};

module.exports = {
  blog_index,
  blog_details,
};
