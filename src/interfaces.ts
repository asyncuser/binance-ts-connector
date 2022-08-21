export interface connectorOptions {
	apiUrl?: string
	signFunction: (queryString: string, apiSecret: string) => void
}

export interface authParams {
	apiKey: string
	apiSecret: string
}

export interface AllCoinsNetwork {
	addressRegex: string
	coin: string
	depositDesc: string // shown only when depositEnable is false.
	depositEnable: boolean
	isDefault: boolean
	memoRegex: string
	minConfirm: number  // min number for balance confirmation
	name: string
	network: string
	resetAddressStatus: boolean
	specialTips: string
	unLockConfirm: number // confirmation number for balance unlock
	withdrawDesc: string // shown only when withdrawEnable is false.
	withdrawEnable: boolean
	withdrawFee: string
	withdrawIntegerMultiple: string
	withdrawMax: string
	withdrawMin: string
	sameAddress: boolean  // If the coin needs to provide memo to withdraw
	estimatedArrivalTime: number
	busy: boolean
}

export interface AllCoinsResponse {
	coin: string
	depositAllEnable: boolean
	free: string
	freeze: string
	ipoable: string
	ipoing: string
	isLegalMoney: boolean
	locked: string
	name: string
	networkList: AllCoinsNetwork[]
}

export interface ApiKeyPermissionResponse {
	ipRestrict: boolean
	createTime: number
	enableWithdrawals: boolean   // This option allows you to withdraw via API. You must apply the IP Access Restriction filter in order to enable withdrawals
	enableInternalTransfer: boolean  // This option authorizes this key to transfer funds between your master account and your sub account instantly
	permitsUniversalTransfer: boolean  // Authorizes this key to be used for a dedicated universal transfer API to transfer multiple supported currencies. Each business's own transfer API rights are not affected by this authorization
	enableVanillaOptions: boolean  //  Authorizes this key to Vanilla options trading
	enableReading: boolean
	enableFutures: boolean  //  API Key created before your futures account opened does not support futures API service
	enableMargin: boolean   //  This option can be adjusted after the Cross Margin account transfer is completed
	enableSpotAndMarginTrading: boolean // Spot and margin trading
	tradingAuthorityExpirationTime: number  // Expiration time for spot and margin trading permission
}

export interface AccountSnapshotParams {
	type: 'SPOT' | 'MARGIN' | 'FUTURES'
	startTime: string | number | Date
	endTime: string | number | Date
	limit: number
	recvWindow: number
	timestamp: string | number | Date
}

export interface AccountApiTradingStatusResponse {
	data: {          // API trading status detail
		isLocked: boolean   // API trading function is locked or not
		plannedRecoverTime: number  // If API trading function is locked, this is the planned recover time
		triggerCondition: {
			GCR: number  // Number of GTC orders
			IFER: number // Number of FOK/IOC orders
			UFR: number   // Number of orders
		},
		updateTime: number
	}
}

export interface AccountSnapshotBalance {
	asset: string,
	free: string
	locked: string
}

export interface AccountSnapshot {
	data: {
		balances: AccountSnapshotBalance[]
		totalAssetOfBtc: string
	},
	type: string,
	updateTime: number
}

export interface AccountSnapshotResponse {
	code: number
	msg: string
	snapshotVos: AccountSnapshot[]
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

export interface AssetDividendRow {
	id: number
	amount: string
	asset: string
	divTime: number
	enInfo: string
	tranId: number
}

export interface AssetDividendResponse {
	total: number
	rows: AssetDividendRow[]
}

export interface AssetDetailResponse {
	[key: string]: {
		minWithdrawAmount: string //min withdraw amount
		depositStatus: boolean //deposit status (false if ALL of networks' are false)
		withdrawFee: number // withdraw fee
		withdrawStatus: boolean //withdraw status (false if ALL of networks' are false)
		depositTip: string //reason
	}
}

export interface AssetDividendParams {
	asset: string
	startTime: string | number | Date
	endTime: string | number | Date
	limit: number
	recvWindow: number
	timestamp: string | number | Date
}

export interface BNBConvertableDetails {
	asset: string
	assetFullName: string
	amountFree: string   //Convertible amount
	toBTC: string  //BTC amount
	toBNB: string  //BNB amount（Not deducted commission fee）
	toBNBOffExchange: string //BNB amount（Deducted commission fee）
	exchange: string //Commission fee
}

export interface BNBConvertableResponse {
	totalTransferBtc: string
	totalTransferBNB: string
	dribbletPercentage: string // Commission fee
	details: BNBConvertableDetails[]
}

export interface DustTransferParams {
	asset: string[]
	recvWindow: number
	timestamp: string | number | Date
}

export interface DustTransferResult {
	amount: string
	fromAsset: string
	operateTime: number
	serviceChargeAmount: string
	tranId: number
	transferedAmount: string
}

export interface DustTransferResponse {
	totalServiceCharge: string
	totalTransfered: string
	transferResult: DustTransferResult[]
}

export interface DepositParams {
	coin: string
	status: number // 0 - pending | 1 - success | 6 - credited but cannot withdraw
	startTime: string | number | Date
	endTime: string | number | Date
	offset: number
	limit: number
	recvWindow: number
	timestamp: string | number | Date
}

export interface DepositResponse {
	amount: string
	coin: string
	network: string
	status: number
	address: string
	addressTag: string
	txId: string
	insertTime: number
	transferType: number
	unlockConfirm: string  // confirm times for unlocking
	confirmTimes: string
}

export interface DepositAddressParams {
	coin: string
	network?: string
	recvWindow?: number
	timestamp: string | number | Date
}

export interface DepositAddressResponse {
	address: string
	coin: string
	tag: string
	url: string
}

export interface SystemStatusResponse {
	status: 0 | 1 // 0: normal，1：system maintenance
	msg: string  // normal, system_maintenance
}

export interface TradeFeeResponse {
	symbol: string
	makerCommission: string
	takerCommission: string
}

export interface P2PRequestData {
	orderNumber: string
	advNo: string
	tradeType: string
	asset: string
	fiat: string
	fiatSymbol: string
	amount: string  // Quantity (in Crypto)
	totalPrice: string
	unitPrice: string // Unit Price (in Fiat)
	orderStatus: string  // PENDING, TRADING, BUYER_PAYED, DISTRIBUTING, COMPLETED, IN_APPEAL, CANCELLED, CANCELLED_BY_SYSTEM
	createTime: number
	commission: string   // Transaction Fee (in Crypto)
	counterPartNickName: string
	advertisementRole: string
}

export interface P2PRequestResponse {
	code:string
	message: string
	data: P2PRequestData[]
	total: number
	success: boolean
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

export interface UserAssetDribbletDetails {
	transId: number
	serviceChargeAmount: string
	amount: string
	operateTime: number
	transferedAmount: string
	fromAsset: string
}

export interface DustLog {
	operateTime: number
	totalTransferedAmount: string   // Total transfered BNB amount for this exchange.
	totalServiceChargeAmount: string    //Total service charge amount for this exchange.
	transId: number
	userAssetDribbletDetails: UserAssetDribbletDetails[]
}

export interface DustLogResponse {
	total: number
	userAssetDribblets: DustLog[]
}

export interface P2PHistoryResponse {
	code: string
	message: string
	data: P2PData[]
	total: number
	success: boolean
}

export interface FundingWalletParams {
	asset: string
	needBtcValuation: boolean
	recvWindow: number
	timestamp: string | number | Date
}

export interface UserAssetResponse {
	asset: string
	free: string
	locked: string
	freeze: string
	withdrawing: string
	ipoable: string
	btcValuation: string
}

enum UniversalTransferType {
	MAIN_UMFUTURE = 'MAIN_UMFUTURE', // Spot account transfer to USDⓈ-M Futures account
	MAIN_CMFUTURE = 'MAIN_CMFUTURE', //Spot account transfer to COIN-M Futures account
	MAIN_MARGIN = 'MAIN_MARGIN',//Spot account transfer to Margin（cross）account
	UMFUTURE_MAIN = 'UMFUTURE_MAIN',//USDⓈ-M Futures account transfer to Spot account
	UMFUTURE_MARGIN = 'UMFUTURE_MARGIN',//USDⓈ-M Futures account transfer to Margin（cross）account
	CMFUTURE_MAIN = 'CMFUTURE_MAIN',//COIN-M Futures account transfer to Spot account
	CMFUTURE_MARGIN = 'CMFUTURE_MARGIN',//COIN-M Futures account transfer to Margin(cross) account
	MARGIN_MAIN = 'MARGIN_MAIN',//Margin（cross）account transfer to Spot account
	MARGIN_UMFUTURE = 'MARGIN_UMFUTURE',//Margin（cross）account transfer to USDⓈ-M Futures
	MARGIN_CMFUTURE = 'MARGIN_CMFUTURE',//Margin（cross）account transfer to COIN-M Futures
	ISOLATEDMARGIN_MARGIN = 'ISOLATEDMARGIN_MARGIN',// Isolated margin account transfer to Margin(cross) account
	MARGIN_ISOLATEDMARGIN = 'MARGIN_ISOLATEDMARGIN' ,//Margin(cross) account transfer to Isolated margin account
	ISOLATEDMARGIN_ISOLATEDMARGIN = 'ISOLATEDMARGIN_ISOLATEDMARGIN',// Isolated margin account transfer to Isolated margin account
	MAIN_FUNDING = 'MAIN_FUNDING',// Spot account transfer to Funding account
	FUNDING_MAIN = 'FUNDING_MAIN',// Funding account transfer to Spot account
	FUNDING_UMFUTURE = 'FUNDING_UMFUTURE',// Funding account transfer to UMFUTURE account
	UMFUTURE_FUNDING = 'UMFUTURE_FUNDING',//UMFUTURE account transfer to Funding account
	MARGIN_FUNDING = 'MARGIN_FUNDING',// MARGIN account transfer to Funding account
	FUNDING_MARGIN = 'FUNDING_MARGIN',// Funding account transfer to Margin account
	FUNDING_CMFUTURE = 'FUNDING_CMFUTURE',// Funding account transfer to CMFUTURE account
	CMFUTURE_FUNDING = 'CMFUTURE_FUNDING',//CMFUTURE account transfer to Funding account
}

export interface UniversalTransferParams {
	type: UniversalTransferType
	asset: string
	amount: number
	fromSymbol: string
	toSymbol: string
	recvWindow: number
	timestamp: string | number | Date
}

export interface UniversalTransferHistoryParams {
	type: UniversalTransferType
	startTime: number
	endTime: number
	current: number
	size: number
	fromSymbol: string
	toSymbol: string
	recvWindow: number
	timestamp: string | number | Date
}

export interface UniversalTransferHistoryRow {
	asset: string
	amount: string
	type: UniversalTransferType
	status: string
	tranId: number
	timestamp: string | number | Date
}

export interface UniversalTransferHistoryResponse {
	total: number,
	rows: UniversalTransferHistoryRow[]
}

export interface WithdrawRequestParams {
	coin: string
	withdrawOrderId?: string
	network?: string
	address: string
	addressTag?: string
	amount: number
	transactionFeeFlag?: boolean
	name?: string
	walletType?: 0 | 1 // 0 - spot | 1 - funding
	recvWindow?: number
	timestamp: string | number | Date
}

export interface WithdrawHistoryParams {
	coin: string
	withdrawOrderId: string
	status: number
	offset: number
	limit: number
	startTime: string | number | Date
	endTime: string | number | Date
	recvWindow: number
	timestamp: string | number | Date
}

export interface WithdrawHistoryResponse {
	address: string
	amount: string
	applyTime: string
	coin: string
	id: string
	withdrawOrderId: string // will not be returned if there's no withdrawOrderId for this withdraw.
	network: string
	transferType: number  // 1 for internal transfer, 0 for external transfer
	status: number
	transactionFee: string
	confirmNo: number  // confirm times for withdraw
	info: string // reason for withdrawal failure
	txId: string
}