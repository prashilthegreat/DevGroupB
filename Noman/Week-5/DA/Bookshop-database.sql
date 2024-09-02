create database BookShop;

CREATE TABLE Authors (
    author_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    nationality VARCHAR(50)
);

CREATE TABLE Books (
    book_id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(150) NOT NULL,
    genre VARCHAR(50),
    price DECIMAL(10, 2),
    publication_date DATE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY IDENTITY(1,1),
    order_date DATE NOT NULL,
    customer_id INT,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_Items (
    order_item_id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT,
    book_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT,
    book_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

INSERT INTO Authors (name, bio, nationality) VALUES
('George Orwell', 'English novelist and essayist, journalist, and critic.', 'British'),
('J.K. Rowling', 'British author, best known for the Harry Potter series.', 'British'),
('Harper Lee', 'American novelist widely known for "To Kill a Mockingbird".', 'American');


INSERT INTO Books (title, genre, price, publication_date, author_id) VALUES
('1984', 'Dystopian', 9.99, '1949-06-08', 1),
('Animal Farm', 'Political satire', 7.99, '1945-08-17', 1),
('Harry Potter and the Sorcerers Stone', 'Fantasy', 10.99, '1997-06-26', 2),
('To Kill a Mockingbird', 'Southern Gothic', 8.99, '1960-07-11', 3);

INSERT INTO Customers (name, email, phone, address) VALUES
('John Doe', 'johndoe@example.com', '123-456-7890', '123 Main St, Anytown, USA'),
('Jane Smith', 'janesmith@example.com', '234-567-8901', '456 Oak St, Anytown, USA'),
('Emily Johnson', 'emilyj@example.com', '345-678-9012', '789 Pine St, Anytown, USA');

INSERT INTO Orders (order_date, customer_id, total_amount) VALUES
('2023-08-01', 1, 18.98),
('2023-08-02', 2, 10.99),
('2023-08-03', 3, 8.99);

INSERT INTO Order_Items (order_id, book_id, quantity, price) VALUES
(1, 1, 1, 9.99),
(1, 2, 1, 7.99),
(2, 3, 1, 10.99),
(3, 4, 1, 8.99);

INSERT INTO Reviews (customer_id, book_id, rating, comment, review_date) VALUES
(1, 1, 5, 'A timeless classic. Very thought-provoking.', '2023-08-05'),
(2, 3, 4, 'Magical and engaging. A must-read for all ages.', '2023-08-06'),
(3, 4, 5, 'Incredible story with powerful themes.', '2023-08-07');






