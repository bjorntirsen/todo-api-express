var express = require('express');
var router = express.Router();

const todoItems = [
  {
    id: 1,
    title: 'First item',
    body: 'Content of first item',
  },
  {
    id: 2,
    title: 'second item',
    body: 'Content of second item',
  },
  {
    id: 3,
    title: 'third item',
    body: 'Content of third item',
  },
];

/* GET all todo items  */
router.get('/', function(req, res, next) {
  res.json(todoItems);
});

/* GET one todo item. */
router.get('/:id', function(req, res, next) {
  const itemId = parseInt(req.params.id);
  const item = todoItems.find((item) => item.id === itemId);
  if (!item) {
    res.statusCode = 404;
    res.json('No item found by that id!');
  } else {
    res.statusCode = 200;
    res.json(item);
  }
});

/* POST create new todo item. */
/* PATCH update one todo item. */
/* DELTE delete one todo item. */

module.exports = router;
