require("dotenv").config();
const db = require("./configs/db");
const { sha256 } = require("js-sha256");
const app = require("./app");

db.seq.sync().then(
  async () => {
    try {
      if (!(await isAdminUserFound())) {
        const created = await createDefaultAdminUser();
        if (!created) {
          console.error("Failed to create default admin user.");
          process.exit(11);
        }
      }

      app.listen(process.env.HTTP_SERVER_PORT || 8001, () => {
        console.log(
          `Server Started At port ${process.env.HTTP_SERVER_PORT || 8001}`
        );
      });
    } catch (err) {
      console.error("Error during initialization:", err);
      process.exit(1);
    }
  },
  (err) => {
    console.error("DB Sync Error:", err);
    process.exit(1);
  }
);

async function isAdminUserFound() {
  const data = await db.User.findAll({
    where: { role: "admin" },
    raw: true,
  });

  return data.length !== 0;
}

async function createDefaultAdminUser() {
  try {
    const data = await db.User.create({
      name: "ARUN PRABHAKAR G",
      email: "sample@gmail.com",
      password: sha256(
        sha256("test@1234" + process.env.FSALT) + process.env.BSALT
      ),
      role: "admin",
    });

    return !!data?.get({ plain: true })?.id;
  } catch (error) {
    console.error("Error creating default admin:", error);
    return false;
  }
}
