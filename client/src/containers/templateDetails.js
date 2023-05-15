import { API_HOST } from "@/constants"
import TEMPLATES from "@/data/templates"
import { parseModelName } from "@/helper"
import axios from "axios"
import { useCallback, useState } from "react"


const TemplateDetailsContainer = ({ slug, data }) => {


    const [variables, setVariables] = useState({})


    const onSubmit = useCallback(async () => {

        if (Object.keys(variables).length === 0) {
            return
        }

        const payload = {
            slug,
            variables
        }

        const { data } = await axios.post(`${API_HOST}/jobs`, payload)

        console.log("data : ", data)

        setVariables({})

    }, [slug, variables])

    const onClear = useCallback(() => {
        setVariables({})
    }, [])

    return (
        <div class="flex-1 flex flex-col">
            <div class="p-6 bg-gray-700">
                <div class="grid grid-cols-4">
                    <div class="col-span-2">
                        <h1 class="text-lg text-white font-bold mb-2">{data.name}</h1>
                        <p class="text-sm text-gray-300 mb-4">{data.description}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 bg-gray-900 text-white flex-grow">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="col-span-1">
                        {data.tasks.map((task, index) => {

                            return (
                                <div key={index}>
                                    <h1 class="text-lg text-white font-bold">{index + 1}.{` `}{task.name}
                                        <span class="bg-blue-100 ml-2 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{parseModelName(task.model)}</span>
                                    </h1>
                                    <div class="w-full py-2 mx-auto px-4 mt-4 mb-4 bg-gray-700 rounded-lg">
                                        <div className="grid grid-cols-6 p-2 gap-3">
                                            {Object.keys(task.variables).map((v, i) => {
                                                const variable = task.variables[v]
                                                return (
                                                    <div key={i} class="col-span-3">
                                                        <label class="block text-sm font-medium text-gray-300">{variable.name}</label>
                                                        <input
                                                            value={variables[v] || ""}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                setVariables({
                                                                    ...variables,
                                                                    [v]: value
                                                                })
                                                            }}
                                                            placeholder={variable.placeholder} class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base" type="text" />
                                                        <p class=" text-gray-300 mt-1 text-xs">
                                                            Ex. {variable.description}
                                                        </p>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                        {Object.keys(task.variables).length === 0 && (
                                            <div class="p-2 pt-0 mb-2">Not required</div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div class="  mt-6  ">
                    <div class="grid grid-cols-2 lg:grid-cols-4 ">
                        <button onClick={onSubmit} class="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 mx-2 rounded">
                            Submit
                        </button>
                        <button onClick={onClear} class="bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 mx-2 rounded">
                            Clear
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TemplateDetailsContainer