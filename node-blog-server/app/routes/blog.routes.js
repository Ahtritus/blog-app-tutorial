export default (app) => {
  import blog from "../controller/blog.controller";

  var router = require("express").Router;

  // Create a new Blog Post
  router.post("/", blog.create);

  // Read all Blog Posts
  router.get("/", blog.findAll);

  // Read all published Blog Posts
  router.get("/published", blog.findAllPublished);

  // Read a single Blog Post with id
  router.get("/:id", blog.findOne);

  // Update a Blog Post with id
  router.put("/:id", blog.update);

  // Delete a Blog Post by id
  router.delete("/:id", blog.delete);

  // Delete all Blog Posts
  router.delete("/", blog.deleteAll);

  app.use("/api/blogPosts", router);
};
