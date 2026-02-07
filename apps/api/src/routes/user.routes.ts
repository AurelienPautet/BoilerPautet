import { Router } from "express";
import { createUserSchema, userIdParamSchema } from "@repo/shared";
import { db, users, eq } from "@repo/db";
import { validate } from "../middleware/validate.js";

export const userRouter = Router();

userRouter.get("/", async (_req, res, next) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = userIdParamSchema.parse(req.params);
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/", validate(createUserSchema), async (req, res, next) => {
  try {
    const [newUser] = await db.insert(users).values(req.body).returning();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = userIdParamSchema.parse(req.params);
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "User deleted", user: deleted });
  } catch (err) {
    next(err);
  }
});
