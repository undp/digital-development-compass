import { db } from "database";
import { Country } from "database/processed/db";
import type { NextApiRequest, NextApiResponse } from "next";

const regionalKeys = ["Region Name", "Sub-region Name"];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { key, country } = req.query;

  const countryMatch = db.countries.find(
    (c) => c["ISO-alpha3 Code"] === country
  );

  if (!countryMatch) {
    res.status(404).json({ error: "Country not found" });
  }

  let filtered = db.countries.filter((c) => {
    if (regionalKeys.includes(key as string)) {
      // Filter by region.
      return countryMatch?.[key as keyof Country] === c[key as keyof Country];
    } else {
      // Filter by sids, lldc, or ldc. Include the country itself in the results.
      return c[key as keyof Country] || c["ISO-alpha3 Code"] === country;
    }
  });

  res.status(200).json(filtered);
};
