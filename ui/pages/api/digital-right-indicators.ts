import { db } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { country, pillar} = req.query;

  if (!country || !pillar) { 
    res
      .status(400)
      .json({ error: "country, pillar are required" });
    return;
  }
 
  let indices = db.digital_right_scores.filter((score) => {
          return (
            score["Country Name"] === country &&
            score["Pillar"] === pillar &&
            Boolean(score["Indicator"])
          );

  });

  let indicesWithSources = indices.map((index) => {
    return {
      ...index,
      sources: db.digital_right_scores.filter((score) => {
        return (
          score["Country Name"] === country &&
          score["Pillar"] === pillar &&
          score["Indicator"] === index["Indicator"] &&
          score["Source Name"]
        );
      }),
    };
  });

  res.status(200).json(indicesWithSources);
};
