import type { NetworkName } from '@arkecosystem/crypto/dist/types'

export interface Wallet {
  address: string
  passphrase: string
}

export interface GenerationOptions {
  /** Amount of wallets to generate */
  amount?: number
  /** Blockchain network */
  network?: NetworkName
}

export interface GenerationOptionsFs {
  /** Output file */
  file?: string
  /** Amount of wallets to generate */
  amount?: number
  /** Blockchain network */
  network?: NetworkName
  /** Show logs */
  logs?: boolean
  /** Log wallet addresses instead of the loading spinner */
  showWallets?: boolean
}
