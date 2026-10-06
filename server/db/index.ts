import { drizzle } from "drizzle-orm/postgres-js"; import postgres from "postgres"; import * as schema from "./schema";
const url = process.env.DATABASE_URL || ""; let db:any;
if(url){ const c=postgres(url,{prepare:false}); db=drizzle(c,{schema}); } else { db={ query:{questions:{findMany:async()=>[]}} }; }
export { db };
