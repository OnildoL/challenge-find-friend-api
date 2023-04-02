import { makeValidators } from "@/application/factories/make-validators";
import { app } from "./configs/app";

async function connect() {
  const env = await makeValidators().validateProcessEnv();
  app
    .listen({
      port: env.PORT,
    })
    .then(() => console.log("Server running!"));
}

connect();
