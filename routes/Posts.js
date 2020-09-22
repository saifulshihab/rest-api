const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router
  .route('/')
  //GET all post
  .get(async (req, res, next) => {
    const posts = await Post.find({});
    res.json(posts);
  })
  //POST a post
  .post(async (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    try {
      const savedPost = await post.save();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(savedPost);
    } catch (error) {
      res.send({ message: error });
    }
  });

router
  .route('/:postId')
  //GET one post with Id
  .get(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    try {
      if (post !== null) {
        res.statusCode = 200;
        res.json(post);
      } else {
        res.statusCode = 404;
        res.json({ message: 'Post not found!' });
      }
    } catch (error) {
      res.json({ message: error });
    }
  })
  //Edit a post
  .put((req, res, next) => {
    Post.findByIdAndUpdate(req.params.postId, {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
      new: true,
    })
      .then((post) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
      })
      .catch((err) => next(err));
  })
  //DELETE a post
  .delete((req, res, next) => {
    Post.findByIdAndDelete(req.params.postId)
      .then((post) => {
        res.statusCode = 200;
        res.json({ message: `Post with Id ${post._id} is deleted.` });
      })
      .catch((err) => next(err));
  });

module.exports = router;
