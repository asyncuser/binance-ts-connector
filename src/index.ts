import axios from "axios";
import * as qs from 'qs'

import {
	connectorOptions,
	P2PRequestParams,
	SystemStatusResponse,
	AllCoinsParams,
	AllCoinsData,
	authParams, UserAssetResponse
} from "./interfaces";
import { removeEmptyValue } from "./utils";

export class Connector {
	private baseUrl
	private apiKey
	private apiSecret
	private signFunction

	constructor(params: authParams, options: connectorOptions) {
		this.apiKey = params.apiKey
		this.apiSecret = params.apiSecret
		this.baseUrl = options?.apiUrl || 'https://api.binance.com'
		this.signFunction = options.signFunction
	}

	private async request(method: 'GET' | 'POST', path: string, params: any = {}): Promise<{ data?: any, error?: any }> {
		params = removeEmptyValue(params)
		const queryString = qs.stringify({ ...params, timestamp: Date.now() })
		const signature = this.signFunction(queryString, this.apiSecret)

		const methods = {
			'GET': () => axios.get(`${this.baseUrl}/${path}?${queryString}&signature=${signature}`, {
				headers: {
					'Content-Type': 'application/json',
					'X-MBX-APIKEY': this.apiKey,
				}
			}),
			'POST': () => axios.post(`${this.baseUrl}/${path}?${queryString}&signature=${signature}`, {}, {
				headers: {
					'Content-Type': 'application/json',
					'X-MBX-APIKEY': this.apiKey,
				}
			}),
		}

		try {
			const { data } = await methods[method]()

			return data
		} catch (e) {
			console.error(`[REQUEST ERROR]: ${e}`)

			return { error: e }
		}
	}

	public async getP2pHistory(tradeType: 'BUY' | 'SELL', params: P2PRequestParams) {
		return this.request('GET','sapi/v1/c2c/orderMatch/listUserOrderHistory', { ...params, tradeType })
	}

	public async systemStatus(): Promise<{ data?: SystemStatusResponse, error?: any }> {
		return this.request('GET','sapi/v1/system/status')
	}

	public async allCoins(params?: AllCoinsParams): Promise<{ data?: AllCoinsData[], error?: any }> {
		return this.request('GET','sapi/v1/capital/config/getall', { ...params })
	}

	public async userAsset(type: 'SPOT' | 'MARGIN' | 'FUTURES', params?: any): Promise<{ data?: UserAssetResponse[], error?: any }> {
		return this.request('POST','sapi/v3/asset/getUserAsset', { ...params, type })
	}
}