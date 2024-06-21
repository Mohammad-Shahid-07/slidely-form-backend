import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());

const dbFilePath = path.join(__dirname, "/db.json");

// Define the Submission interface
interface Submission {
  Name: string;
  Email: string;
  Phone: string;
  GitHubLink: string;
  StopwatchTime: string;
}

// Ensure the db.json file exists and is initialized as an empty array if it's not
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, "[]", "utf8");
}

app.get("/ping", (req: Request, res: Response) => {
  console.log("GET /ping");
  res.send(true);
});

app.post("/submit", (req: Request, res: Response) => {
  const submission: Submission = req.body;
  console.log(dbFilePath);

  let submissions: Submission[] = [];
  try {
    const submissionsData = fs.readFileSync(dbFilePath, "utf8");
    submissions = JSON.parse(submissionsData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    res.status(500).send({ error: "Failed to read submissions" });
    return;
  }

  submissions.push(submission);

  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2), "utf8");
    res.status(201).send(submission);
  } catch (err) {
    console.error("Error writing submissions:", err);
    res.status(500).send({ error: "Failed to save submission" });
  }
});

app.get("/read", (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  let submissions: Submission[] = [];
  try {
    const submissionsData = fs.readFileSync(dbFilePath, "utf8");
    submissions = JSON.parse(submissionsData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    res.status(500).send({ error: "Failed to read submissions" });
    return;
  }

  if (index >= 0 && index < submissions.length) {
    res.send(submissions[index]);
  } else {
    res.status(404).send({ error: "Index out of bounds" });
  }
});

app.get("/count", (req: Request, res: Response) => {
  let submissions: Submission[] = [];
  try {
    const submissionsData = fs.readFileSync(dbFilePath, "utf8");
    submissions = JSON.parse(submissionsData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    res.status(500).send({ error: "Failed to read submissions" });
    return;
  }

  res.send({ count: submissions.length });
});

app.delete("/delete", (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  let submissions: Submission[] = [];
  try {
    const submissionsData = fs.readFileSync(dbFilePath, "utf8");
    submissions = JSON.parse(submissionsData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    res.status(500).send({ error: "Failed to read submissions" });
    return;
  }

  if (index >= 0 && index < submissions.length) {
    submissions.splice(index, 1);
    try {
      fs.writeFileSync(
        dbFilePath,
        JSON.stringify(submissions, null, 2),
        "utf8",
      );
      res.status(200).send({ message: "Submission deleted successfully" });
    } catch (err) {
      console.error("Error writing submissions:", err);
      res
        .status(500)
        .send({ error: "Failed to save submissions after deletion" });
    }
  } else {
    res.status(404).send({ error: "Index out of bounds" });
  }
});

app.put("/edit", (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const updatedSubmission: Submission = req.body;

  let submissions: Submission[] = [];
  try {
    const submissionsData = fs.readFileSync(dbFilePath, "utf8");
    submissions = JSON.parse(submissionsData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    res.status(500).send({ error: "Failed to read submissions" });
    return;
  }

  if (index >= 0 && index < submissions.length) {
    submissions[index] = updatedSubmission;
    try {
      fs.writeFileSync(
        dbFilePath,
        JSON.stringify(submissions, null, 2),
        "utf8",
      );
      res.status(200).send(updatedSubmission);
    } catch (err) {
      console.error("Error writing submissions:", err);
      res.status(500).send({ error: "Failed to save updated submission" });
    }
  } else {
    res.status(404).send({ error: "Index out of bounds" });
  }
});

app.get("/search", (req: Request, res: Response) => {
  const email = req.query.email as string

  let submissions: Submission[] = [];
  try {
    const submissionsData = fs.readFileSync(dbFilePath, "utf8");
    submissions = JSON.parse(submissionsData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    res.status(500).send({ error: "Failed to read submissions" });
    return;
  }

  const filteredSubmissions = submissions.filter((sub) => sub.Email === email);
  res.send(filteredSubmissions);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
