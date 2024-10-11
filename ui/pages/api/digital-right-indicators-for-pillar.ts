import { db } from "database";
import { uniqBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { country, pillar} = req.query;

  if (!country || !pillar) {
    res
      .status(400)
      .json({ error: "country, pillar are required" });
    return;
  }

  const allIndicators = db.digital_right_scores.filter(
    (score) =>
      score["Pillar"] === pillar &&
      Boolean(score["Indicator"])
  );
  const uniqueIndicators = uniqBy(allIndicators, "Indicator");

  res.status(200).json(uniqueIndicators);
};
