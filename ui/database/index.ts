import { Convert } from "./processed/db";
import json from "./processed/db.json";
console.log("")
export const db = Convert.toDB(JSON.stringify(json));
