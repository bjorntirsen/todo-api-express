var express = require('express');
var router = express.Router();

let todoItems = [
  {
    id: 1,
    title: 'First item',
    content: 'Content of first item',
  },
  {
    id: 2,
    title: 'second item',
    content: 'Content of second item',
  },
  {
    id: 3,
    title: 'third item',
    content: 'Content of third item',
  },
];

/* GET all todo items  */
router.get('/', function (req, res, next) {
  res.json(todoItems);
});

/* GET one todo item. */
router.get('/:id', function (req, res, next) {
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
router.post('/', function (req, res, next) {
  let highestId = 0;
  todoItems.forEach((item) => {
    if (item.id > highestId) highestId = parseInt(item.id);
  });

  const newItem = {
    id: highestId + 1,
    title: req.body.title,
    content: req.body.content,
  };

  console.log(`Created new item: `);
  console.log(newItem);

  todoItems.push(newItem);
  res.statusCode = 201;
  res.json(newItem);
});

/* PATCH update one todo item. */
router.patch('/:id', function (req, res, next) {
  const itemId = parseInt(req.params.id);
  let item = todoItems.find((item) => item.id === itemId);
  if (!item) {
    res.statusCode = 404;
    res.json('No item found by that id!');
  } else {
    if (req.body.title) {
      item.title = req.body.title
    }
    if (req.body.content) {
      item.content = req.body.content
    }
    const filteredItems = todoItems.filter((item) => item.id !== itemId);
    todoItems = [...filteredItems, item];
    todoItems = todoItems.sort((first, second) => first.id - second.id);
    res.statusCode = 200;
    res.json(item);
  }
});

/* DELTE delete one todo item. */
router.delete('/:id', (req, res, next) => {
  const itemId = parseInt(req.params.id);
  todoItems = todoItems.filter((item) => item.id !== itemId);
  res.statusCode = 204;
  res.end();
});

module.exports = router;
