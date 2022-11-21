import bcrypt from "bcrypt";
import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import joi from "joi";

export async function signUp(req, res) {
  const user = req.body; // name, email and password

  try {
    const hashPassword = bcrypt.hashSync(user.password, 10);
    delete user.passwordConfirm;
    await usersCollection.insertOne({ ...user, password: hashPassword });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();

  try {
    const userExists = await usersCollection.findOne({ email });
    await sessionsCollection.insertOne({
      token,
      userId: userExists._id,
    });

    res.send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteSession(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const endSession = await sessionsCollection.deleteOne({ token });
    console.log("Deletando", endSession);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
