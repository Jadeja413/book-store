const { Wishlist, Book } = require('../Schema');

const wishLists = async (req, res) => {
  const { userId } = req.query;

  try {
    const lists = await Wishlist.findOne({ userId });

    const wishlists = lists.books.map(({ bookId }) => ({ bookId }));

    const books = await Book.find();

    const data = books.filter(item1 => wishlists.some(item2 => item1.id === item2.bookId));

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }

}

const addToWishlist = async (req, res) => {

  const { userId, bookId } = req.body;

  try {

    let wishlist = await Wishlist.findOne({ userId });
    console.log('whishlist ', wishlist);

    if (!wishlist) {
      wishlist = new Wishlist({ userId, books: [] })
    } else {
      const bookExist = wishlist.books.find(item => item.bookId === bookId);
      if (bookExist) {
        return res.status(400).json({ message: 'Already Added To Your WishList!' })
      }
    }
    wishlist.books.push({ bookId });
    await wishlist.save();

    const wishlistCount = wishlist.books?.length;
    console.log('add wish', wishlist.books?.length)
    res.status(200).json({ message: 'Added To Your WishList!', wishlistCount });

  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Failed to add book to wishlist' });
  }
}

const removeFromWishlist = async (req, res) => {
  console.log("remove ")
  const { userId, bookId } = req.query;

  try {
    const books = await Book.find();

    let wishlist = await Wishlist.findOne({ userId });

    wishlist.books = wishlist.books.filter(item => item.bookId !== parseInt(bookId));
    await wishlist.save();

    const updatedWishlistData = books.filter(book => wishlist.books.some(item => book.id === item.bookId))
    // console.log("wish", wish);

    res.status(200).json(updatedWishlistData);

  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = { wishLists, addToWishlist, removeFromWishlist };
