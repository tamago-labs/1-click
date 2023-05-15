
import Queue from "bull";
import * as fastq from "fastq";
import express from "express";
import cors from "cors"
import routes from "./routes/index.js";
import TEMPLATES from "./data/templates.js";
import Task from "./lib/task.js";



import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(cors())

// const queue = new Queue("task-queue", { redis: { port: process.env.REDIS_PORT || "6379", host: process.env.REDIS_HOST || "localhost", password: process.env.REDIS_PASSWORD || "foobar" } })

let jobs = []



// queue.process((job) => {

//   // done();
//   // done(new Error('error transcoding')); 

//   return processJob(job.data)
// });


const processJob = async (data) => {


  const { jobId, globalVariables, tasks, variables } = data

  try {

    let outputVariables = {
      ...globalVariables,
      ...variables
    }

    let count = 1

    for (let task of tasks) {

      jobs = jobs.map((item) => {
        if (item.jobId === jobId) {
          item.status = `Task ${count}/${tasks.length}`
        }
        return item
      })

      const instance = new Task({
        ...task,
        apiKey: task.model === "chat" ? process.env.OPENAI_API_KEY : process.env.HF_ACCESS_KEY,
        variables: outputVariables
      })

      await instance.execute()

      outputVariables = instance.variables

      count += 1
    }

    jobs = jobs.map((item) => {
      if (item.jobId === jobId) {
        item.status = `Completed`,
          item.output = outputVariables
      }
      return item
    })

  } catch (e) {

    jobs = jobs.map((item) => {
      if (item.jobId === jobId) {
        item.status = "Failed"
      }
      return item
    })

  }
}

const queue = fastq.promise(processJob, 1)

app.get('/', (req, res) => {
  return res.status(200).json({ status : "ok"});
});

app.use('/users', routes.user)
app.use('/templates', routes.template)

app.get('/jobs', (req, res) => {
  return res.status(200).json(jobs);
});

app.post('/jobs', async (req, res) => {
  const data = req.body;

  const { slug, variables } = data

  const template = TEMPLATES.find(item => item.slug === slug)

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

  const jobId = random(1000, 9999)

  jobs.push({
    jobId,
    slug,
    variables,
    name: template.name,
    status: "Queued"
  })

  await queue.push({
    ...template,
    jobId,
    variables
  })

  return res.status(200).json({
    status: "submitted",
    templateId: slug
  });
});

app.use('/crossword', express.static('packages/html-crossword'))



app.listen(8000, () => {
  console.log(`Server Started at ${8000}`)
})

// main().catch(console.error);