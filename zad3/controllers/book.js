const Book = require('../models/Book');
const User = require('../models/User');

const getBookDetails = (req, res) => {
    const bookId = req.params.id;
    const book = Book.getById(bookId); // Pobierz książkę po jej identyfikatorze
    const userId = req.session.userId; // Pobierz identyfikator aktualnego użytkownika z sesji
    const didUserBorrowTheBook = User.getById(userId).findBorrowedBookById(bookId); // Sprawdź, czy użytkownik wypożyczył tę książkę

    // Renderuj widok szczegółów książki, przekazując odpowiednie zmienne
    res.render('book-details', {
        title: 'Book Details',
        book,
        didUserBorrowTheBook
    });
};

const postBookBorrow = (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.userId;
    const user = User.getById(userId);

    // Znajdź książkę i zmień jej dostępność na false
    const book = Book.getById(bookId);
    book.borrow();

    // Dodaj książkę do listy wypożyczonych przez użytkownika
    user.borrowBook(book);

    // Przekieruj użytkownika na stronę sukcesu po wypożyczeniu książki
    res.redirect('/books/borrow/success');
};

const postBookReturn = (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.userId;
    const user = User.getById(userId);

    // Znajdź książkę i zmień jej dostępność na true
    const book = Book.getById(bookId);
    book.return();

    // Usuń książkę z listy wypożyczonych przez użytkownika
    user.returnBook(bookId);

    // Przekieruj użytkownika na stronę sukcesu po zwróceniu książki
    res.redirect('/books/return/success');
};

const getBookBorrowSuccess = (req, res) => {
    // Renderuj stronę sukcesu po wypożyczeniu książki
    res.render('success', { title: 'Success', message: 'Book borrowed successfully' });
};

const getBookReturnSuccess = (req, res) => {
    // Renderuj stronę sukcesu po zwróceniu książki
    res.render('success', { title: 'Success', message: 'Book returned successfully' });
};

module.exports = { getBookDetails, postBookBorrow, postBookReturn, getBookBorrowSuccess, getBookReturnSuccess };
