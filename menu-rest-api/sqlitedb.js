var sqlite3 = require('sqlite3').verbose();
const DBSOURCE = 'menudb.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
 if (err) {
  console.error(err.message);
  throw err;
 } else {
  console.log('Connected to the SQLite database.');
  db.run(
   `CREATE TABLE menu (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name text, 
         price real, 
         category text,
         updatedAt date, 
         createdAt date 
         )`,
   (err) => {
    if (err) {
     console.log(err);
    } else {
     var insert = 'INSERT INTO menu (name, price, category, updatedAt, createdAt) VALUES (?,?,?,?,?)';

     db.run(insert, ['Phở Bò (Beef Pho)', 200000, 'Vietnamese Cuisine', '2020-05-26 10:10', '2020-05-26 10:10']);
     db.run(insert, ['Tiramisu', 120000, 'Italian Cuisine', '2020-05-28 11:10', '2020-05-28 11:10']);
     db.run(insert, ['Sushi (Maguro, Ebi, Tamago)', 200000, 'Japanese Cuisine', '2020-05-29 09:22', '2020-05-29 09:22']);
     db.run(insert, ['Mango Sticky Rice', 120000, 'Thai Cuisine', '2020-06-06 16:18', '2020-06-06 16:18']);
     db.run(insert, ['Chicken Tikka Masala', 200000, 'Indian Cuisine', '2020-06-01 18:14', '2020-05-01 18:14']);
    }
   },
  );
 }
});

module.exports = db;
