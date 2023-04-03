import { app } from "./configs/app";

app
  .listen({
    host: "0.0.0.0",
    port: 3000,
  })
  .then(() => console.log("Server running!"));
