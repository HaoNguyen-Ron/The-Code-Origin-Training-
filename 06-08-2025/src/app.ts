import ExpressPlus from "@gieo/express"

const app = new ExpressPlus();

app.listen(3000, () => {
  console.log("✅ Server is running at http://localhost:3000");
});
