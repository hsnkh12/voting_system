const expressApp = require("./frameworks/web/express");
const db = require("./frameworks/db/sequelize.db");
const initModels = require("./core/models/init.model");
require("dotenv").config();

(async () => {
  try {
    await initModels(db);
    // Sync the database after models are defined
    await db.sync({ force: false });
    expressApp.listen(process.env.APP_PORT, () => {
      console.log(`Server is running on port ${process.env.APP_PORT}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
})();
