const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })

  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json(
        {message: "No categories found!"}
      );
      return;
    };
      res.json(categoryData);
  })

  .catch(err => {
    console.log(err, "An error has occurred");
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })

  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json(
        {message: "No categories found!"}
      );
      return;
    };
      res.json(categoryData);
  })

  .catch(err => {
    console.log(err, "An error has occurred");
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: require.body.category_name
  })

  .then(categoryData => {
    res.json(
      (categoryData)
    );
  })

  .catch(err => {
    console.log(err, "An error has occurred");
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
  })

  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json(
        {message: "No categories found within this id"}
      );
      return;
    };
      res.json(categoryData);
  })

  .catch(err => {
    console.log(err, "An error has occurred");
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    },
  })

  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json(
        {message: "No categories found within this id"}
      );
      return;
    };
      res.json(categoryData);
  })

  .catch(err => {
    console.log(err, "An error has occurred");
    res.status(500).json(err);
  });
});

module.exports = router;