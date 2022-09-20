const connection = require('../db-config')
const router = require('express').Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM creator', (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving creators from database')
    } else {
      return res.json(result)
    }
  })
})
router.get('/:id', (req, res) => {
  const creatorId = req.params.id
  connection.query('SELECT * FROM creator WHERE id = ?'),
    [creatorId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving creator from database')
      } else {
        if (result.length) res.json(results[0])
        else res.status(404).send('Creator not found')
      }
    }
})

router.post('/', (req, res) => {
  const { creatorName, creatorBirthday, creatorEmail } = req.body
  console.log(req.body)
  connection.query(
    'INSERT INTO creator (creatorName, creatorBirthday, creatorEmail) VALUES (?, ?, ?)',
    [creatorName, creatorBirthday, creatorEmail],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send('Error retrieving creator from database' + err.code)
      } else {
        const id = result.insertId
        const createdCreator = { id, creatorName }
        res.status(201).json(createdCreator)
      }
    }
  )
})

router.put('/:id', (req, res) => {
  'UPDATE creator SET ? WHERE id = ?',
    [req.body, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send('error updating a post')
      } else {
        if (result.affectedRows) {
          const updatedCreator = {
            id: req.params.id,
            creatorName: req.body.creatorName
          }
          return res.status(200).json(updatedCreator)
        } else return res.status(404).send('Creator not found')
      }
    }
})
router.delete('/id', (req, res) => {
  const creatorId = req.params.id
  connection.query(
    'DELETE FROM creator WHERE id = ?',
    [creatorId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error while deleting a creator')
      } else {
        if (result.affectedRows)
          res.status(200).send('creator perfectly deleted')
        else res.status(404).send('Creator not found!')
      }
    }
  )
})

module.exports = router
