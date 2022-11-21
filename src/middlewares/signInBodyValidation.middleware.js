import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signInBodyValidation(req, res, next) {
  const { email, password } = req.body;

  const userExists = await usersCollection.findOne({ email });
  if (!userExists) {
    return res.status(401).send("User não existente!");
  }

  const passwordOk = bcrypt.compareSync(password, userExists.password);
  if (!passwordOk) {
    return res.status(401).send("Senha incorreta!");
  }

  req.userSignin = userExists;

  next();
}
