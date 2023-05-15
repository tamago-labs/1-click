import { InjectedConnector } from "@web3-react/injected-connector"

export const injected = new InjectedConnector()

export const SUPPORT_CHAINS = [3141]

export const Connectors = [
    {
        name: "MetaMask",
        connector: injected
    }
]

export const API_HOST = "http://lb-agent-8e844a6-1124593334.ap-southeast-1.elb.amazonaws.com:8000"