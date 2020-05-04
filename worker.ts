import { expose } from 'threads/worker'

import { Identities, Managers } from '@arkecosystem/crypto'
import { generateMnemonic } from 'bip39'
import { createHash, randomBytes } from 'crypto'
import * as MoreEntropy from 'promised-entropy'

import type { Wallet } from './types'
import type { NetworkName } from '@arkecosystem/crypto/dist/types'

async function genWallet(network: NetworkName): Promise<Wallet> {
  Managers.configManager.setFromPreset(network)
  Managers.configManager.setHeight(999999999)

  const nbBits: number = 128
  const bytes = Math.ceil(nbBits / 8)
  const hudgeEntropy: number[] = await MoreEntropy.promisedEntropy(nbBits)
  const seed = randomBytes(bytes)
  const entropy = createHash('sha256')
    .update(Buffer.from(new Int32Array(hudgeEntropy).buffer))
    .update(seed)
    .digest()
    .slice(0, bytes)

  const passphrase = generateMnemonic(nbBits, _ => entropy)
  return {
    address: Identities.Address.fromPassphrase(passphrase),
    passphrase
  }
}

const workerMethods = { genWallet }
export type WorkerMethods = typeof workerMethods

// Expose as a Worker
expose(workerMethods)
