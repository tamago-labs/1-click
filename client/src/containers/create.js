import { useCallback, useContext, useState } from "react"
import { TemplateContext } from "@/hooks/useTemplate"
import Link from "next/link"
import { PlayCircle, Plus, PlusCircle, X } from "react-feather"

const CreateContainer = () => {

    const { templates } = useContext(TemplateContext)

    return (
        <div class="p-6 flex-grow bg-gray-900 text-white flex flex-col items-center justify-center">
            <div class=" w-full max-w-2xl mx-auto">
                <div class="text-center">
                    <h1 class="text-2xl text-white font-bold mb-4">Choose a Template</h1>
                    <p class="text-sm text-gray-300 mb-2">Each community template contains a series of tasks that let you generate a certain type of app or action, you can help attaching prompts to the task and earn when someone executes it</p>
                </div>
            </div>
            <div class="w-full lg:w-3/5 py-2 mx-auto px-4 mt-4  ">
                <div className="grid grid-cols-12 p-2 gap-3">
                    {templates.map((item, index) => {
                        return (
                            <Link class="col-span-4" index={index} href={`/template/${item.slug}`}>
                                <div class="p-4 cursor-pointer border-2 flex flex-col border-transparent hover:border-blue-600 bg-gray-700 h-60 rounded-lg">
                                    <div class="mx-auto flex flex-col">
                                        <h1 class="text-lg text-white mt-2 text-center font-bold">
                                            {item.name}
                                        </h1>
                                        <p class="text-sm text-center mt-1 text-gray-300 ">
                                            {item.description}
                                        </p>
                                    </div>
                                    {/* <div class="grid grid-cols-4 mt-auto gap-1">   
                                        <div class="p-1 text-center col-span-4">
                                            <p class="text-sm text-gray-300 ">Cost</p>
                                            <h1 class="text-sm text-white   font-bold">
                                                {item.cost} FIL
                                            </h1>
                                        </div> 
                                    </div> */}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CreateContainer