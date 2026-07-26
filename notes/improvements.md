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

2. what happends if we upload a csv with some missing colomn?

= handles

3. 

Query
const query = `
    SELECT *
    FROM citizen
    WHERE voter_id = $1
`;

This is simply SQL.

If we replaced $1 with the actual value, it would become:

SELECT *
FROM citizen
WHERE voter_id = '1234567890';
Why $1 instead of writing the value directly?

This is extremely important.

Imagine a malicious user sends:

12345'; DROP TABLE citizen; --

If you build SQL like this:

"SELECT * FROM citizen WHERE voter_id = '" + voterId + "'"

you've opened the door to SQL Injection.

By using:

$1

and then passing:

[voterId]

PostgreSQL treats it as data, not SQL.

This is called a parameterized query.

Rule to remember for your career:

Never build SQL by concatenating user input.

Always use placeholders ($1, $2, ...).

4. 

now i have another problem


I deleted the file from uploads
and deleted the data from the database like this

simvault=# select * from citizen
simvault-# ;
 id |  voter_id  | first_name | last_name
----+------------+------------+-----------
  1 | 1234567890 | Turabi     | Rahman
  2 | 9876543210 | Robin      | Rahman
(2 rows)


simvault=# select * from sim;
 id | citizen_id | sim_company | sim_number | registration_date | expiry_date
----+------------+-------------+------------+-------------------+-------------
(0 rows)


simvault=# delete from citizen where id = 1;
DELETE 1
simvault=# select * from citizen;
 id |  voter_id  | first_name | last_name
----+------------+------------+-----------
  2 | 9876543210 | Robin      | Rahman
(1 row)


simvault=# delete from citizen where id = 2;
DELETE 1
simvault=# select * from citizen;
 id | voter_id | first_name | last_name
----+----------+------------+-----------
(0 rows)
 
then send the req by postman again by the same file

they gave

{
    "success": true,
    "rows": [
        {
            "voter_id": "1234567890",
            "first_name": "Turabi",
            "last_name": "Rahman",
            "sim_company": "Grameenphone",
            "sim_number": "01711111111",
            "registration_date": "2024-01-15",
            "expiry_date": "2027-01-15",
            "citizen_id": "3"
        },
        {
            "voter_id": "9876543210",
            "first_name": "Robin",
            "last_name": "Rahman",
            "sim_company": "Robi",
            "sim_number": "01812345678",
            "registration_date": "2024-01-20",
            "expiry_date": "2027-01-20",
            "citizen_id": "4"
        },
        {
            "voter_id": "1234567890",
            "first_name": "Turabi",
            "last_name": "Rahman",
            "sim_company": "Grameenphone",
            "sim_number": "01711111111",
            "registration_date": "2024-01-15",
            "expiry_date": "2027-01-15",
            "citizen_id": "3"
        },
        {
            "voter_id": "1234567890",
            "first_name": "Turabi",
            "last_name": "Rahman",
            "sim_company": "Grameenphone",
            "sim_number": "01711111112",
            "registration_date": "2024-01-15",
            "expiry_date": "2027-01-15",
            "citizen_id": "3"
        }
    ]
}

see citizen_id is 3 and 4????

and also in database it is keeping 3 and 4 

simvault=# select * from citizen;
 id |  voter_id  | first_name | last_name
----+------------+------------+-----------
  3 | 1234567890 | Turabi     | Rahman
  4 | 9876543210 | Robin      | Rahman
(2 rows)



is this a problem or i can ignore it for now?


solve === 

Option 1 (Best)

Instead of deleting rows

Use

TRUNCATE TABLE citizen RESTART IDENTITY;

This does two things.

Deletes all rows.
Resets the sequence.

After that

New inserts become

1
2
3

again.

Option 2

Reset the sequence manually.

ALTER SEQUENCE citizen_id_seq RESTART WITH 1;

But this is usually only used for special situations.

TRUNCATE ... RESTART IDENTITY is cleaner when you're wiping the whole table

