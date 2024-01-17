const db = require("../models/index");

const initializeBookModel = require("../models/book.model");

const Book = initializeBookModel(db.sequelize);

/**
 * Create a new book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} req.body - Request body parameters
 * @param {string} req.body.username - The username for the new user (string)
 * @param {string} req.body.password - The password for the new user (string)
 * @param {Object} req.body.role - The role information for the new user (object)
 * @param {number} req.body.role.id - The ID of the role for the new user (number)
 */
const create = async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieve all books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const findAll = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieve a book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - The bookId
 */
const byId = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Update a book by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - The bookId
 * @param {Object} req.body - Request body parameters
 * @param {string} req.body.title - Updated title of the book
 * @param {string} req.body.author - Updated author of the book
 * @param {number} req.body.year - Updated publication year of the book
 * @param {string} req.body.genre - Updated genre of the book
 */
const updateOne = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, year, genre } = req.body;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update({
      ...req.body,
    });

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Delete a book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - The bookId
 */
const deleteOne = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { create, findAll, byId, updateOne, deleteOne };
