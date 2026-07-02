import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://blollxoieizbaiggzgwd.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsb2xseG9pZWl6YmFpZ2d6Z3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTMyNTgsImV4cCI6MjA5ODI4OTI1OH0.Ks1Z1WRYXnlGQrZVFCt35fDy8K0QXnMOCn6GsqJ8yQQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
