
const { Wishlist, CartItemList, Book } = require('../Schema');

const cartLists = async (req, res) => {
  console.log("Cart")
  const { userId } = req.query;
  try {
    const lists = await CartItemList.findOne({ userId });

    const wishlists = lists?.books.map(({ bookId }) => ({ bookId }));

    const books = await Book.find();

    const data1 = books.filter(item1 => wishlists.some(item2 => item1.id === item2.bookId));

    const data = data1.map(book => {
      const listItem = lists.books.find(listBook => listBook.bookId === book.id);
      if (listItem) {
        return { ...book.toObject(), bookQuantity: listItem.bookQuantity };
      } else {
        return book.toObject();
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}

const addToCart = async (req, res) => {
  console.log('addToCart ');
  const { userId, bookId, bookQuantity } = req.body;

  try {

    let cartlist = await CartItemList.findOne({ userId });

    if (!cartlist) {
      cartlist = new CartItemList({ userId, books: [{ bookId, bookQuantity }] });

    } else {

      const existingBookIndex = cartlist?.books.findIndex(item => item.bookId === parseInt(bookId));

      if (existingBookIndex !== -1) {

        cartlist.books[existingBookIndex].bookQuantity += bookQuantity;
      } else {

        cartlist.books.push({ bookId, bookQuantity });
      }
    }

    await cartlist.save();

    res.status(200).json({ message: 'Added To Your Cart!', cartlist });
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteFromCart = async (req, res) => {
  const { userId, bookId, bookQuantity } = req.body;

  try {
    let cartlist = await CartItemList.findOne({ userId });

    const existingBookIndex = cartlist.books.findIndex(item => item.bookId === parseInt(bookId));

    if (existingBookIndex !== -1) {

      cartlist.books[existingBookIndex].bookQuantity -= bookQuantity;
    } else {

      cartlist.books.push({ bookId, bookQuantity });
    }
    await cartlist.save();
    res.status(200).json({ message: 'Added To Your Cart!', cartlist });
  } catch (error) {
    res.status(500).json(error)
  }
}

const removeItemFromCart = async (req, res) => {
  const { userId, bookId } = req.body;
  // const { userId, bookId } = req.query;

  try {
    let cartlist = await CartItemList.findOne({ userId })
    
    const findBookIndex = cartlist.books.findIndex(item => item.bookId === parseInt(bookId))

    cartlist.books.splice(findBookIndex, 1);

    await cartlist.save();
    res.status(200).json({ message: 'Removed From Your Cart!', cartlist });
  } catch (error) {
    res.status(500).json(error)
  }

}

module.exports = { cartLists, addToCart, deleteFromCart, removeItemFromCart }
