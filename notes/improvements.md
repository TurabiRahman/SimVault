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
