const connection = require('../db-config')
const router = require('express').Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM posts', (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving posts from database')
    } else {
      return res.json(result)
    }
  })
})
router.get('/:id', (req, res) => {
  const postId = req.params.id
  connection.query('SELECT * FROM posts WHERE id = ?'),
    [postId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving posts from database')
      } else {
        if (result.length) res.json(results[0])
        else res.status(404).send('Post not found')
      }
    }
})

router.post('/', (req, res) => {
  const {
    title,
    message,
    createdAt,
    tags,
    selectedFile,
    likeCount,
    creator_id
  } = req.body
  console.log(req.body)
  connection.query(
    'INSERT INTO posts (title, message, createdAt, tags, selectedFile, likeCount, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, message, createdAt, tags, selectedFile, likeCount, creator_id],
    (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving posts from database' + err.code)
      } else {
        const id = result.insertId
        const createdPost = { id, title }
        res.status(201).json(createdPost)
      }
    }
  )
})

router.put('/:id', (req, res) => {
  'UPDATE posts SET ? WHERE id = ?',
    [req.body, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send('error updating a post')
      } else {
        if (result.affectedRows) {
          const updatedPost = {
            id: req.params.id,
            title: req.body.title
          }
          return res.status(200).json(updatedPost)
        } else return res.status(404).send('Post not found')
      }
    }
})
router.delete('/id', (req, res) => {
  const postId = req.params.id
  connection.query(
    'DELETE FROM posts WHERE id = ?',
    [postId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error while deleting a post')
      } else {
        if (result.affectedRows) res.status(200).send('post perfectly deleted')
        else res.status(404).send('Post not found!')
      }
    }
  )
})

module.exports = router
