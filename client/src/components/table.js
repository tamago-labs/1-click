

const Table = ({ headers, data }) => {
    return (

        <div class="relative   shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        {headers.map((header, index) => {
                            return (
                                <th key={index} scope="col" class="px-6 py-3">
                                    {header}
                                </th>
                            )
                        })

                        }

                    </tr>
                </thead>
                <tbody> 

                    { data.map((item, index) => {
                        return (
                            <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        { item.map((i, ii) => {
                            return ( 
                        <td key={ii} class="px-6 py-4">
                        {i}
                        </td> 
                            )
                        })

                        }
                    </tr>
                        )
                    })

                    }

                </tbody>
            </table>
        </div>

    )
}

export default Table