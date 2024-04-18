import { db } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { country, pillar, subpillar} = req.query;

  if (!country || !pillar || !subpillar) { 
    res
      .status(400)
      .json({ error: "country, pillar, and subpillar are required" });
    return;
  }
 
  let indices = db.scores.filter((score) => {
          return (
            score["Country Name"] === country &&
            score["Pillar"] === pillar &&
            score["Sub-Pillar"] === subpillar &&
            Boolean(score["Indicator"])
          );

  });

  let indicesWithSources = indices.map((index) => {
    return {
      ...index,
      sources: db.scores.filter((score) => {
        return (
          score["Country Name"] === country &&
          score["Pillar"] === pillar &&
          score["Sub-Pillar"] === subpillar &&
          score["Indicator"] === index["Indicator"] &&
          score["Source Name"]
        );
      }),
    };
  });

  res.status(200).json(indicesWithSources);
};
