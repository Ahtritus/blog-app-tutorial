import Post from "../model/blogDB.model";

// Create and Save a new Blog Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  //Create a Post
  const post = new Post({
    title: req.title,
    body: req.body,
    published: req.published || false,
  });

  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the post.",
      });
    else res.send(data);
  });
};

// Retrieve all Blog Posts from the database (with condition).
exports.findAll = (req, res) => {};

// Find a single Blog Post with a id
exports.findOne = (req, res) => {};

// find all published Blog Posts
exports.findAllPublished = (req, res) => {};

// Update a Blog Post identified by the id in the request
exports.update = (req, res) => {};

// Delete a Blog Post with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Blog Posts from the database.
exports.deleteAll = (req, res) => {};
