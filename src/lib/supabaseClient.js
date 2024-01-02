import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://afwklgwroiahnncowhaj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd2tsZ3dyb2lhaG5uY293aGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxNDQzMTYsImV4cCI6MjAxOTcyMDMxNn0.LXjiW6EXxqeW4WxzI4VtxjXSIKQxU_e4qo_bylG5WoU"
);
