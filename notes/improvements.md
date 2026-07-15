Instead of:

server/
│
├── src/
│   ├── app.js
│   └── server.js

recommended:

server/
│
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── server.js

Then:

server.js

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

and

"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}



----> deleted outside package-lock.json
{
  "name": "SimVault",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {}
}



----------> my question 
1. why in this line sim_number VARCHAR(20) UNIQUE NOT NULL,
sim_number is varchar??
why not int?

= The leading zero problem 
Integers drop leading zeros because, mathematically, 01711234567 is exactly the same as 1711234567.

However, in SIM numbers and phone numbers, that leading zero is vital data. If you store a SIM number starting with 0 into an INT column, the database will strip the zero away, completely ruining the number.

The Size Limit (Integer Overflow)
Standard integers have a strict limit on how large a number they can hold:

An INT (4 bytes) can only hold numbers up to 2,147,483,647 (10 digits).

SIM numbers (like ICCIDs) are typically 19 to 20 digits long.