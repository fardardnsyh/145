import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:JzQVDlwPr3R1@ep-quiet-glade-a5mwqnmh.us-east-2.aws.neon.tech/AI-Form-builder?sslmode=require',
  }
});