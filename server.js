const app = require("./dist/app.js").default || require("./dist/app.js");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("🔥 Server running on port " + port);
});
