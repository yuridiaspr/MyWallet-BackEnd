import { Db, ObjectId } from "mongodb";
import {
  sessionsCollection,
  usersCollection,
  walletCollection,
} from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import { descriptionSchema } from "../models/wallet.model.js";
import dayjs from "dayjs";

export async function addNewProfit(req, res) {
  const { value, description } = req.body;

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const session = await sessionsCollection.findOne({ token });
  const user = await usersCollection.findOne({ _id: session?.userId });

  try {
    const newValue = {
      date: dayjs().format("DD/MM"),
      value,
      description,
      status: "profit",
      email: user.email,
    };

    const { error } = descriptionSchema.validate(newValue, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    await walletCollection.insertOne(newValue);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function addNewExpense(req, res) {
  const { value, description } = req.body;

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const session = await sessionsCollection.findOne({ token });
  const user = await usersCollection.findOne({ _id: session?.userId });

  try {
    const newValue = {
      date: dayjs().format("DD/MM"),
      value,
      description,
      status: "expense",
      email: user.email,
    };

    const { error } = descriptionSchema.validate(newValue, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    await walletCollection.insertOne(newValue);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function showMenu(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });

    const listWallet = await walletCollection
      .find({ email: user.email })
      .sort({ _id: -1 })
      .toArray();

    res.status(201).send([listWallet, user.name]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
