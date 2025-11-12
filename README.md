# Wonder-Forum
Wonder Forum is a simple, interactive web application where users can register, log in, and participate in discussions across different categories. Users can create posts, view posts by category, and interact with the forum in a user-friendly interface. Admin functionality allows overseeing user activity and content.





FEATURES:

.User Registration with optional email verification

.User Login & Logout

.Edit User Profile

.Create Posts with Title, Content, and Category

.View Posts by Category

.Upload Files (images/docs)

.Search Topics

.Categories & Sub-forums

.Admin Overview of Users & Posts




TECHNOLOGIES USED:

Backend: Node.js, Express.js

Frontend: EJS Templates, HTML, CSS

Database: MySQL (Sequelize ORM)

Authentication: Session-based

File Uploads: Multer


INSTALLATION PROCESS:

CLONE REPOSITORY:git clone https://github.com/yourusername/wonder-forum.git
cd wonder-forum

Install DEPENDENCIES
"bcrypt": "^6.0.0",

"crypto": "^1.0.1",

"dotenv": "^17.2.3",

"ejs": "^3.1.10",
    
 "express": "^5.1.0",
 
"express-session": "^1.18.2",

"express-validator": "^7.3.0",

"multer": "^2.0.2",

"mysql2": "^3.15.3",

 "sequelize": "^6.37.7"


  SET UP DATABASE:
    
 1.  CREATE DATABASE forumdb;


CONFIGURE DATABASE:
Update src/config/db.js with your MySQL username and password.

RUN SERVER:
npm start


FOLDER STRUCTURE:

src/

├── controllers/

│   ├── postController.js

│   └── usercontroller.js

├── models/

│   ├── post.js

│   └── user.js

├── routes/

│   ├── category.js

│   ├── postsendpoint.js

│   └── usersendpoint.js

├── views/

│   ├── category/

│   ├── createPost.ejs

│   ├── dashboard.ejs

│   ├── homepage.ejs

│   ├── login.ejs

│   └── register.ejs

├── config/

│   └── db.js

└── app.js


USAGE:

1. Register a new account.

2. Log in with your credentials.

3. Select a category from the dashboard.

4. View existing posts or create a new post in that category.

5. Admin users can monitor posts and users (if implemented).


LICENSE:

This project is open-source and free to use under the MIT License.

User Registration with optional email verification

User Login & Logout

Edit User Profile

Create Posts with Title, Content, and Category

View Posts by Category

Upload Files (images/docs)

Search Topics

Categories & Sub-forums

Admin Overview of Users & Posts
