export interface connectorOptions {
	apiUrl?: string
}

export interface AllCoinsParams {
	recvWindow?: number
	timestamp: number
}

interface AllCoinsDataNetworkList {
	addressRegex: string,
	coin: string,
	depositDesc: string, // shown only when depositEnable is false.
	depositEnable: boolean,
	isDefault: boolean,
	memoRegex: string,
	minConfirm: number,  // min number for balance confirmation
	name: string,
	network: string,
	resetAddressStatus: boolean,
	specialTips: string,
	unLockConfirm: number,  // confirmation number for balance unlock
	withdrawDesc: string, // shown only when withdrawEnable is false.
	withdrawEnable: boolean,
	withdrawFee: string,
	withdrawIntegerMultiple: string,
	withdrawMax: string,
	withdrawMin: string,
	sameAddress: boolean,  // If the coin needs to provide memo to withdraw
	estimatedArrivalTime: number,
	busy: boolean
}

export interface AllCoinsData {
	coin: string
	depositAllEnable: boolean
	free: string
	freeze: string
	ipoable: string
	ipoing: string
	isLegalMoney: boolean
	locked: string
	name: string
	networkList: AllCoinsDataNetworkList[]
}

export interface SystemStatusResponse {
	status: 0 | 1 // 0: normal，1：system maintenance
	msg: string  // normal, system_maintenance
}

export interface P2PRequestParams {
	startTimestamp?: number | Date
	endTimestamp?: number | Date
	page?: number
	rows?: number
	recvWindow?: number
	timestamp?: number
}

export interface P2PData {
	orderNumber: string
	advNo: string
	tradeType: string
	asset: string
	fiat: string
	fiatSymbol: string
	amount: string
	totalPrice: string
	unitPrice: string
	orderStatus: string
	createTime: number
	commission: string
	counterPartNickName: string
	advertisementRole: string
}

export interface P2PHistoryResponse {
	code: string
	message: string
	data: P2PData[]
	total: number
	success: boolean
}