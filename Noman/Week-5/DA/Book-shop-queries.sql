
SELECT b.title, b.genre, b.price, a.name AS author_name
FROM Books b
JOIN Authors a ON b.author_id = a.author_id;


--Find All Orders with Customer and Book Details
SELECT o.order_id, c.name AS customer_name, o.order_date, b.title AS book_title, oi.quantity, oi.price
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Order_Items oi ON o.order_id = oi.order_id
JOIN Books b ON oi.book_id = b.book_id;

--Get Total Sales per Customer
SELECT c.name AS customer_name, SUM(o.total_amount) AS total_spent
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY c.name
ORDER BY total_spent DESC;

--List Top-Rated Books
SELECT b.title, AVG(r.rating) AS average_rating
FROM Reviews r
JOIN Books b ON r.book_id = b.book_id
GROUP BY b.title
HAVING AVG(r.rating) >= 4
ORDER BY average_rating DESC;

--Find Customers Who Have Purchased a Specific Book
SELECT DISTINCT c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Order_Items oi ON o.order_id = oi.order_id
JOIN Books b ON oi.book_id = b.book_id
WHERE b.title = '1984';


--Get the Most Recent Reviews
SELECT r.review_id, c.name AS customer_name, b.title AS book_title, r.rating, r.comment, r.review_date
FROM Reviews r
JOIN Customers c ON r.customer_id = c.customer_id
JOIN Books b ON r.book_id = b.book_id
ORDER BY r.review_date DESC;