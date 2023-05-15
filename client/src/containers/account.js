import { useEffect, useState } from "react"
import axios from "axios"
import { API_HOST } from "@/constants"

import Table from "@/components/table"

const AccountContainer = () => {

    const [jobs, setJobs] = useState([])

    useEffect(() => {

        axios.get(`${API_HOST}/jobs`).then(
            ({ data }) => {
                setJobs(data)
            })

    }, [])

    console.log("jobs --> ", jobs)

    return (
        <div class="p-6 flex-grow bg-gray-900 text-white flex flex-col  justify-center">
            <div class="grid grid-cols-4 gap-5">
                <div class="col-span-2">
                    <h1 class="text-2xl text-white font-bold mb-2">Running Jobs</h1>
                    <Table
                        headers={["#","Template Name", "Status"]}
                        data={jobs.filter(item => item.status !== "Completed").map(item => [item.jobId, item.name, item.status])}
                    />
                </div>
                <div class="col-span-2">
                    <h1 class="text-2xl text-white font-bold mb-2">Completed Jobs</h1>
                    <Table
                        headers={["#","Template Name", "Status"]}
                        data={jobs.filter(item => item.status === "Completed").map(item => [item.jobId, item.name, item.status])}
                    />
                </div>
            </div>
        </div>
    )
}

export default AccountContainer