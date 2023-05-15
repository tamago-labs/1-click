import Job from "./job.js"



const runner = async (job) => {
    

    const currentJob = new Job(job.jobId, job.tasks, job.variables)

    while (await currentJob.next() ) {
        
    }
    

}

export default runner