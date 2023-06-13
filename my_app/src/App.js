import React from 'react'
import "./styles.css";


import image from  "./images/login.jpg";
import lib from  "./images/lib.jpg";
import c from  "./images/c.jpg";
//import book1 from  "./images/book1.jpg";



// Books data;
const books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', subject: 'Coming-of-age', publishDate: '2022-01-01', availability: 5, copies: 5 },
  { id: 2, title: '1984', author: 'George Orwell', subject: 'Dystopian', publishDate: '2022-02-01', availability: 3, copies: 5 },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', subject: 'Romance', publishDate: '2022-03-01', availability: 4, copies: 5 },
  { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', subject: 'Jazz Age', publishDate: '2022-04-01', availability:3 , copies: 5 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', subject: 'Bildungsroman', publishDate: '2022-05-01', availability: 3, copies: 5 },
  { id: 6, title: 'To the Lighthouse', author: ' Virginia WoolfAuthor', subject: 'Modernism', publishDate: '2022-06-01', availability: 3, copies: 5 },
  { id: 7, title: 'The Hobbit', author: 'J.R.R. Tolkien', subject: ' Fantasy', publishDate: '2022-07-01', availability: 5, copies: 5 },
  { id: 8, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', subject: 'History', publishDate: '2022-08-01', availability: 0, copies: 5 },
  { id: 9, title: 'The Alchemist', author: 'Author 4Paulo Coelho', subject: 'Allegory', publishDate: '2022-09-01', availability: 5, copies: 5 },
  { id: 10, title: 'The Odyssey', author: 'Homer', subject: 'Homer', publishDate: '2022-04-05', availability: 5, copies: 5 },
  
  
 
];

// App component
const App = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [booksPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');
  const [cart, setCart] = React.useState([]);

  // Login
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    // Validate username and password (in this example, just check for non-empty values)
    if (username && password) {
      setUser({ username });
    } else {
      alert('Invalid username or password');
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchResults.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page
  };

  React.useEffect(() => {
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publishDate.includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  // Filter
  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset pagination to first page
  };

  // Sort
  const handleSort = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset pagination to first page
  };

  React.useEffect(() => {
    let sortedBooks = [...searchResults];

    if (sortBy === 'title') {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === 'subject') {
      sortedBooks.sort((a, b) => a.subject.localeCompare(b.subject));
    } else if (sortBy === 'publishDate') {
      sortedBooks.sort((a, b) => a.publishDate.localeCompare(b.publishDate));
    }

    if (filter) {
      sortedBooks = sortedBooks.filter((book) =>
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.subject.toLowerCase().includes(filter.toLowerCase()) ||
        book.publishDate.includes(filter)
      );
    }

    setSearchResults(sortedBooks);
  }, [filter, sortBy, searchResults]);

  // Add to cart
  const handleAddToCart = (book) => {
    if (book.availability > 0) {
      const cartItem = cart.find((item) => item.id === book.id);
      if (cartItem) {
        if (cartItem.quantity < book.availability) {
          const updatedCart = cart.map((item) =>
            item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCart(updatedCart);
        } else {
          alert('Cannot add more copies than available');
        }
      } else {
        setCart([...cart, { ...book, quantity: 1 }]);
      }
    } else {
      alert('Book is not available');
    }
  };

  // Remove from cart
  const handleRemoveFromCart = (book) => {
    const updatedCart = cart.filter((item) => item.id !== book.id);
    setCart(updatedCart);
  };

  // Checkout
  const handleCheckout = () => {
    // Perform checkout logic (e.g., update availability and number of copies)
    const updatedBooks = books.map((book) => {
      const cartItem = cart.find((item) => item.id === book.id);
      if (cartItem) {
        return { ...book, availability: book.availability - cartItem.quantity };
      }
      return book;
    });
    setCart([]);
    setSearchResults(updatedBooks);
    alert('Checkout successful');
  };

  return (
    <div className="container">
      {user ? (
        <>
          <h1 align="center">LIBRARY MANAGEMENT SYSTEM</h1>
          <div class='right'> <button  class='log'onClick={handleLogout}>Logout</button></div>
         
          <img src={lib} className=''/>
         
          
          <h1>Welcome, {user.username}!</h1>
          
          <h2>Book List</h2>
          <p className="count">Total Books: {searchResults.length}</p>
          
          
          <div className='textbox'>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            
          />
          </div>
          {/* <select value={filter} onChange={handleFilter}>
            <option value="">All</option>
            <option value="Subject 1">Subject 1</option>
            <option value="Subject 2">Subject 2</option>
          </select> */}
          <select value={sortBy} onChange={handleSort}>
             <option value="">Sort By</option> 
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
            <option value="publishDate">Publish Date</option>
          </select>
          <div className="detail">
          <ul className="book-list">
            {currentBooks.map((book) => (
              <li key={book.id}>
                <img src={require('./images/'+book.id+'.jpg')}  alt="React Image" />    
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Subject: {book.subject}</p>
                <p>Publish Date: {book.publishDate}</p>
                <p>Availability: {book.availability}</p>
                <p>Copies: {book.copies}</p>
                <div className='AddCart'>
                <button onClick={() => handleAddToCart(book)}s>Add to Cart</button>
                </div>
                <div className='temp'></div>
              </li>
             
            ))}
          </ul>
          
          </div>
         
          <div className="pagination">
            {Array.from({ length: Math.ceil(searchResults.length / booksPerPage) }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
          </div>
          {/* <p className="count">Total Books: {searchResults.length}</p> */}
          <div className="cart">
            <h1 id="heading">Cart</h1>
            <img src={c} className=''/>
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    {/* {console.log(item.id)} */}
                    {/* <img src={IMAGES.1} alt={item.title} /> */}
                    <img src={require('./images/'+item.id+'.jpg')}  alt="React Image" /> 
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.title}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                     <div className="cart-item-actions"> 
                      <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </div> 
                  </div>
                ))}
                <div className="checkout">
                  <button onClick={handleCheckout}>Checkout</button>
                  </div>
                
              </>
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <div className='ulogin'>
          <h1>Login</h1>
          <img src={image} className=''/>

          </div>
          
          <div className='input'>
          <input type="text" name="username" placeholder="Username" required />
          </div>
          <br/>
          <div className='input'>
          <input type="password" name="password" placeholder="Password" required />
          </div>
          <br/>
          <div className='ulogin'><button type="submit">Login</button></div>
          
        </form>
      )}
      {loading && <div className="loader"></div>}
    </div>
  );
};

export default App;
