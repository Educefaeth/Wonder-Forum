import { Sequelize } from "sequelize";

const sequelize = new Sequelize("forumdb", "root", "Code4Life@10", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("MySQL Connected");
} catch (error) {
  console.error("Connection Failed:", error);
}

export default sequelize;
