import { db } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { country, pillar, subpillar } = req.query;

  if (!country || !pillar || !subpillar) {
    res
      .status(400)
      .json({ error: "country, pillar, and subpillar are required" });
    return;
  }

  let indices = db.indices.filter((index) => {
    return (
      index["Country Name"] === country &&
      index["Pillar"] === pillar &&
      index["Sub-Pillar"] === subpillar
    );
  });

  let indicesWithSources = indices.map((index) => {
    return {
      ...index,
      sources: db.sources.filter((source) => {
        return (
          source["Country Name"] === country &&
          source["Pillar"] === pillar &&
          source["Sub-Pillar"] === subpillar &&
          source["Indicator"] === index["Indicator"]
        );
      }),
    };
  });

  res.status(200).json(indicesWithSources);
};
