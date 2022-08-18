import { db } from "database";
import { uniqBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { country, pillar, subpillar } = req.query;

  if (!country || !pillar || !subpillar) {
    res
      .status(400)
      .json({ error: "country, pillar, and subpillar are required" });
    return;
  }

  const allIndicators = db.scores.filter(
    (score) =>
      score["Pillar"] === pillar &&
      score["Sub-Pillar"] === subpillar &&
      Boolean(score["Indicator"])
  );
  const uniqueIndicators = uniqBy(allIndicators, "Indicator");

  res.status(200).json(uniqueIndicators);
};
