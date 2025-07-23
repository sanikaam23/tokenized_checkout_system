// backend/controllers/productController.js

const fetch = require('node-fetch');

exports.getProducts = async (req, res) => {
  try {
    const categories = ['mens-shirts', 'womens-dresses', 'tops', 'mens-shoes', 'womens-shoes'];

    const results = await Promise.all(
      categories.map(category =>
        fetch(`https://dummyjson.com/products/category/${category}`)
          .then(res => res.json())
          .then(data => data.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: category
          })))
      )
    );

    const products = [].concat(...results);
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
