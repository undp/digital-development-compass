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

  const allIndicators = db.indices.filter(
    (indicator) =>
      indicator["Pillar"] === pillar && indicator["Sub-Pillar"] === subpillar
  );
  const uniqueIndicators = uniqBy(allIndicators, "Indicator");

  res.status(200).json(uniqueIndicators);
};
