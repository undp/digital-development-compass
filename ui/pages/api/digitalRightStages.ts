import { db } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { pillar} = req.query;

  if (!pillar) {
    res.status(400).json({ message: "Pillar is required" });
    return;
  }

  let stages = db.digital_right_definitions.find(
    (d) => d["Pillar"] === pillar
  );

  res.status(200).json(stages);
};
