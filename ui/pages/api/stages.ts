import { db } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { pillar, subpillar } = req.query;

  if (!pillar) {
    res.status(400).json({ message: "Pillar is required" });
    return;
  }

  let stages = db.definitions.find(
    (d) => d["Pillar"] === pillar && d["Sub-Pillar"] === subpillar
  );

  res.status(200).json(stages);
};
