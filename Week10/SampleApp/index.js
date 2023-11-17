const express = require("express");
var bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const supabaseUrl = "https://bxquwemdpdwczvachras.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cXV3ZW1kcGR3Y3p2YWNocmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5MDQ4NDksImV4cCI6MjAxNTQ4MDg0OX0.mBxsXBloI9M7Y31vltPTrCmNPxKW2YrUzfZE4zChhgw";
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.sendFile("public/public.html", { root: __dirname });
});

app.get("/customers", async (req, res) => {
  console.log(`Getting Customer`);

  const { data, error } = await supabase.from("Customer").select();

  if (error) {
    console.log(error);
  } else if (data) {
    res.send(data);
  }
});

app.post("/customer", async (req, res) => {
  console.log("Adding Customer");

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var state = req.body.state;

  const { data, error } = await supabase
    .from("Customer")
    .insert([
      {
        cust_first_name: firstName,
        cust_last_name: lastName,
        cust_state: state,
      },
    ])
    .select();

  console.log(data);
  res.header("Content-type", "application/json");
  res.send(data);
});

app.listen(port, () => {
  console.log("APP IS ALIVEEEEEE");
});
