import db from "./db";

class Post {
  constructor(blog) {
    this.title = blog.title;
    this.body = blog.body;
    this.author = blog.author;
    this.published = blog.published;
  }
}

//Create the DB
Post.createDb = () => {
  let sql = "CREATE DATABASE IF NOT EXISTS blogDB";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

//Create the table
Post.createTable = () => {
  let sql = `CREATE TABLE IF NOT EXISTS "blogDB.postsTable" (
               id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
               title varchar(255) NOT NULL,
               body varchar(255),
               published BOOLEAN DEFAULT false
             ) DEFAULT CHARSET=utf8;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

//Creating a post
Post.create = (newPost, result) => {
  let sql = "INSERT INTO blogDB.postsTable SET ?";
  db.query(sql, newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

//Finidng a post by id
Post.findById = (id, result) => {
  let sql = `SELECT * FROM blogDB.postsTable WHERE id = ${id}`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found post with the id
    result({ kind: "not_found" }, null);
  });
};

//Finidng all posts and filter by title
Post.getAll = (title, result) => {
  let sql = "SELECT * FROM blogDB.postsTable";

  if (title) {
    sql += ` WHERE title LIKE '%${title}%'`;
  }

  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};

//Get all published posts
Post.getAllPublished = (result) => {
  const sql = "SELECT * FROM blogDB.postsTable WHERE published=true";
  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

//Update post by id
Post.updateById = (id, post, result) => {
  let sql =
    "UPDATE blogDB.postsTable SET title = ?, description = ?, published = ? WHERE id = ?";
  db.query(
    sql,
    [post.title, post.description, post.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

//Remove post by id
Post.remove = (id, result) => {
  let sql = "DELETE FROM blogDB.postsTable WHERE id = ?";
  db.query(sql, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted post with id: ", id);
    result(null, res);
  });
};

//Remove all posts
Post.removeAll = (result) => {
  let sql = "DELETE FROM blogDB.postsTable";
  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} posts`);
    result(null, res);
  });
};

module.exports = Post;
