import axios from "axios";
import * as qs from 'qs'

import {
	connectorOptions,
	P2PRequestParams,
	SystemStatusResponse,
	AllCoinsParams,
	AllCoinsData,
	authParams,
	UserAssetResponse,
	AccountSnapshotParams,
	AccountSnapshotResponse,
	DepositParams,
	DepositResponse,
	WithdrawRequestParams,
	WithdrawHistoryParams,
	WithdrawHistoryResponse,
	DepositAddressParams,
	DepositAddressResponse,
	AccountApiTradingStatusResponse,
	DustLogResponse,
	BNBConvertableResponse,
	DustTransferParams,
	DustTransferResponse,
	AssetDividendResponse,
	AssetDetailResponse,
	TradeFeeResponse,
	UniversalTransferParams,
	UniversalTransferHistoryParams,
	UniversalTransferHistoryResponse,
	FundingWalletParams,
	ApiKeyPermissionResponse,
	P2PRequestResponse
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

			return { data }
		} catch (error) {
			console.error(`[REQUEST ERROR]: ${JSON.stringify(error)}`)

			return { error }
		}
	}

	// System - https://binance-docs.github.io/apidocs/spot/en/#system-status-system

	public async systemStatus(): Promise<{ data?: SystemStatusResponse, error?: any }> {
		return this.request('GET','sapi/v1/system/status')
	}

	public async accountSnapshot(params?: AccountSnapshotParams): Promise<{ data?: AccountSnapshotResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/accountSnapshot', { ...params })
	}

	public async disableFastWithdrawSwitch(params?: { recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: {}, error?: any }> {
		return this.request('POST', 'sapi/v1/account/disableFastWithdrawSwitch', { ...params })
	}

	public async enableFastWithdrawSwitch(params?: { recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: {}, error?: any }> {
		return this.request('POST', 'sapi/v1/account/enableFastWithdrawSwitch', { ...params })
	}

	public async withdraw(params?: WithdrawRequestParams): Promise<{ data?: { id: string }, error?: any }> {
		return this.request('POST', 'sapi/v1/capital/withdraw/apply', { ...params })
	}

	public async depositHistory(params?: DepositParams): Promise<{ data?: DepositResponse[], error?: any }> {
		return this.request('GET', 'sapi/v1/capital/deposit/hisrec', { ...params })
	}

	public async withdrawHistory(params?: WithdrawHistoryParams): Promise<{ data?: WithdrawHistoryResponse[], error?: any }> {
		return this.request('GET', 'sapi/v1/capital/withdraw/history', { ...params })
	}

	public async depositAddress(params?: DepositAddressParams): Promise<{ data?: DepositAddressResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/capital/deposit/address', { ...params })
	}

	public async accountStatus(params?: { recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: { data: string }, error?: any }> {
		return this.request('GET', 'sapi/v1/account/status', { ...params })
	}

	public async accountApiTradingStatus(params?: { recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: AccountApiTradingStatusResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/account/apiTradingStatus', { ...params })
	}

	public async dustLog(params?: { recvWindow: number, timestamp: string | number | Date, startTime: string | number | Date, endTime: string | number | Date }): Promise<{ data?: DustLogResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/asset/dribblet', { ...params })
	}

	public async getBNBConvertableAssets(params?: { recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: BNBConvertableResponse, error?: any }> {
		return this.request('POST', 'sapi/v1/asset/dust-btc', { ...params })
	}

	public async dustTransfer(params?: DustTransferParams): Promise<{ data?: DustTransferResponse, error?: any }> {
		return this.request('POST', 'sapi/v1/asset/dust', { ...params })
	}

	public async assetDividendRecord(params?: any): Promise<{ data?: AssetDividendResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/asset/assetDividend', { ...params })
	}

	public async assetDetail(params?: { asset: string, timestamp: string | number | Date, recvWindow: number }): Promise<{ data?: AssetDetailResponse, error?: any }> {
		return this.request('GET', '', { ...params })
	}

	public async tradeFee(params?: { symbol: string, timestamp: string | number | Date, recvWindow: number }): Promise<{ data?: TradeFeeResponse[], error?: any }> {
		return this.request('GET', 'sapi/v1/asset/tradeFee', { ...params })
	}
	
	public universalTransfer(params?: UniversalTransferParams): Promise<{ data?: { tranId: number }, error?: any }> {
		return this.request('POST', 'api/v1/asset/transfer', { ...params })
	}

	public async universalTransferHistory(params?: UniversalTransferHistoryParams): Promise<{ data?: UniversalTransferHistoryResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/asset/transfer', { ...params })
	}

	public async fundingWallet(params?: FundingWalletParams): Promise<{ data?: UserAssetResponse[], error?: any }> {
		return this.request('POST', 'sapi/v1/asset/get-funding-asset', { ...params })
	}

	public async userAsset(params?: { asset: string, needBtcValuation: boolean, recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: UserAssetResponse[], error?: any }> {
		return this.request('POST','sapi/v3/asset/getUserAsset', { ...params })
	}

	public async getApiKeyPermissions(params?: { recvWindow: number, timestamp: string | number | Date }): Promise<{ data?: ApiKeyPermissionResponse, error?: any }> {
		return this.request('GET', 'sapi/v1/account/apiRestrictions', { ...params })
	}

	public async allCoins(params?: AllCoinsParams): Promise<{ data?: AllCoinsData[], error?: any }> {
		return this.request('GET','sapi/v1/capital/config/getall', { ...params })
	}

	public async getP2pHistory(tradeType: 'BUY' | 'SELL', params: P2PRequestParams): Promise<{ data?: P2PRequestResponse, error?: any }> {
		return this.request('GET','sapi/v1/c2c/orderMatch/listUserOrderHistory', { ...params, tradeType })
	}
}