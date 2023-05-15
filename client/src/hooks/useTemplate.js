import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import axios from "axios"
import { API_HOST } from "@/constants"

export const TemplateContext = createContext()

const Provider = ({ children }) => {

    const [values, dispatch] = useReducer(
        (curVal, newVal) => ({ ...curVal, ...newVal }),
        {
            templates: []
        }
    )

    const { templates } = values

    useEffect(() => {
        axios.get(`${API_HOST}/templates`).then(
            ({ data }) => {
                if (data && data.length > 0) {
                    dispatch({
                        templates : data
                    })
                }
            }
        )
    }, [])

    const templateContext = useMemo(
        () => ({
            templates
        }),
        [templates]
    )

    return (
        <TemplateContext.Provider value={templateContext} >
            {children}
        </TemplateContext.Provider>
    )
}

export default Provider