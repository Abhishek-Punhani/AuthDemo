import mongoose from "mongoose";
const { DB_URL } = process.env;

export async function connect() {
  // handling mongo error

  mongoose.connection.on("error", (err) => {
    console.error(`Mongo Connection Error ${err}`);
    process.exit(1);
  });

  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to db");
    });

  // debug mode on :: lets u know all changes in db on ur console
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
}
