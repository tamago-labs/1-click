import { useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { Connectors, SUPPORT_CHAINS } from "../constants";
import Blockies from "react-blockies"
import Link from "next/link";

import useEagerConnect from "@/hooks/useEagerConnect";
import useInactiveListener from "@/hooks/useInactiveListener";
import { useRouter } from 'next/router';
import { shortAddress } from "@/helper";

const WrongNetwork = () => (<small>Support <a class="underline" href="https://chainlist.org/chain/3141" target="_blank">Hyperspace Testnet</a> only</small>)


const Sidebar = () => {

    const context = useWeb3React()
    const router = useRouter()
    const { account, activate, deactivate, error, chainId } = context

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState()

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    const corrected = SUPPORT_CHAINS.includes(chainId)

    return (
        <div class="bg-gray-800 w-80 flex-none flex flex-col">
            <div class="text-white p-6 flex flex-col justify-between h-full">
                <div class="overflow-y-auto mb-4">
                    {/* <div className="flex items-center mb-6 h-20">
                        {(account && corrected) && (
                            <div class="w-full flex flex-row">
                                <Blockies
                                    className="h-16 w-16 rounded-full"
                                    size={16}
                                    seed={`${account}`}
                                />

                                <Link href="/account" className={`ml-4 mt-auto mb-auto cursor-pointer ${router.pathname === "/account" && "underline"}`}>
                                    <h2 className="text-lg font-semibold">Unnamed</h2>
                                    <p className="text-sm">
                                        {shortAddress(account)}
                                    </p>
                                </Link>
                            </div>
                        )}
                        {(account && !corrected) && (
                            <>
                                <div class="w-full flex flex-col items-center">
                                    <button class="w-full bg-transparent hover:bg-white  text-white font-semibold hover:text-slate-700 py-2 px-4 border border-white hover:border-transparent rounded">
                                        Wrong Network
                                    </button>
                                    <WrongNetwork />
                                </div>
                            </>
                        )}

                        {!account && (
                            <div class="w-full flex flex-col items-center">
                                <button onClick={() => {
                                    setActivatingConnector(Connectors[0].connector)
                                    activate(Connectors[0].connector)
                                }} class="w-full bg-transparent hover:bg-white  text-white font-semibold hover:text-slate-700 py-2 px-4 border border-white hover:border-transparent rounded">
                                    Connect MetaMask
                                </button>
                                <WrongNetwork />
                            </div>
                        )}
                    </div>  */}
                    <div class="space-y-2">
                        <Link href="/" class="text-sm">
                            <div class={`p-4  rounded-lg cursor-pointer ${router.pathname === "/" && "bg-gray-700 "}`}>
                                <h3 class="font-semibold">Public Gallery</h3>
                                <p>Play the game offline without connect the wallet</p>
                            </div>
                        </Link>
                    </div>
                    <div class="space-y-2 mt-2">
                        <Link href="/create" class="text-sm">
                            <div class={`p-4  rounded-lg cursor-pointer  ${router.pathname === "/create" && "bg-gray-700 "}`}>
                                <h3 class="font-semibold">Create</h3>
                                <p> Play the game with words from movies, whitepapers, prompts</p>
                            </div>
                        </Link>
                    </div>
                    <div class="space-y-2 mt-6">
                        <Link href="/account" class="text-sm">
                            <button  class="w-full bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4  rounded">
                                Current Jobs
                            </button>
                        </Link>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div>
                        <div class="flex items-center space-x-2">
                            <h2 class="text-xl font-semibold">1-Click</h2>
                            <small class="mt-auto">v.Alpha</small>
                        </div>
                        <div class="flex items-center space-x-2">
                            <small>Web3-based Autonomous AI agents</small>
                        </div>
                        <div class="text-sm mt-1">
                            {/* <a href="https://github.com/pisuthd/1-clickcrossword" target="_blank" class="text-blue-500 hover:text-blue-700">GitHub</a> |{` `} */}
                            <a href="https://twitter.com/pisuthd" target="_blank" class="text-blue-500 hover:text-blue-700">Twitter</a> |{` `}
                            <a href="https://promptsea.io" target="_blank" class="text-blue-500 hover:text-blue-700">Main Websites</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar