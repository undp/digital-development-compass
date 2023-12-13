import { Convert } from "./processed/db";
import json from "./processed/db.json";
export const db = Convert.toDB(JSON.stringify(json));
