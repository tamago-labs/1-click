import { useCallback, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { PlayCircle, Plus, PlusCircle, X } from "react-feather"
import axios from "axios"
import { API_HOST } from "@/constants"

const GalleryContainer = () => {

    const [items, setItems] = useState([])

    useEffect(() => {

        axios.get(`${API_HOST}/jobs`).then(
            ({ data }) => {
                if (data && data.length > 0) {

                    const completed = data.filter(item => item.status === "Completed")

                    setItems(completed)
                }
            }
        )

    }, [])

    return (
        <div class="p-6 flex-grow bg-gray-900 text-white flex flex-col items-center justify-center">
            <div class=" w-full max-w-2xl mx-auto">
                <div class="text-center">
                    <h1 class="text-2xl text-white font-bold mb-4">Public Gallery</h1>
                    <p class="text-sm text-gray-300 mb-2">Each community template contains a series of tasks that let you generate a certain type of app or action, you can help attaching prompts to the task and earn when someone executes it</p>
                </div>
            </div>
            <div class="w-full lg:w-3/5 py-2 mx-auto px-4 mt-4  ">
                <div className="grid grid-cols-12 p-2 gap-3">
                    {items.map((item, index) => {

                        const name = `${item.name}`; 
                        return (
                            <a class="col-span-4" index={index} target="_blank" href={`${API_HOST}/crossword?id=${item.jobId}`}>
                                <div class="p-4 cursor-pointer border-2 flex flex-col border-transparent hover:border-blue-600 bg-gray-700 h-60 rounded-lg">
                                    <div class="mx-auto flex flex-col">
                                        <h1 class="text-lg text-white mt-2 text-center font-bold">
                                            {name}
                                        </h1>
                                        <p class="text-sm text-center mt-1 text-gray-300 ">
                                            #{item.jobId}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GalleryContainer