import { Identities, Managers } from '@arkecosystem/crypto'
import { generateMnemonic } from 'bip39'
import { createHash, randomBytes } from 'crypto'
import * as MoreEntropy from 'promised-entropy'

import path from 'path'
import fs from 'fs'

export const genWallet = async () => {
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
  return `${Identities.Address.fromPassphrase(passphrase)};${passphrase}`
}

export const chunkArray = <T>(array: T[], chunkSize: number) =>
  Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize)
  )

export const loggerCount = (countWidth: number = 2, padStr = ' ') => {
  let count = 0
  return (...args: any[]) => (
    count++, process.stdout.write(`${count.toString().padStart(countWidth, padStr)} `), console.log(...args)
  )
}

export interface GenerationOptions {
  /** Output file */
  file?: string
  /** Amount of wallets to generate */
  amount?: number
  /** Concurrent wallets generation */
  concurrency?: number
  /** Should logging output be hidden */
  hideLogs?: boolean
}

export const massGenerate = async ({
  file = path.resolve(__dirname, '_wallets_ark.txt'),
  amount = 30,
  concurrency = 12,
  hideLogs = false
}: GenerationOptions) => {
  Managers.configManager.setFromPreset('mainnet')
  Managers.configManager.setHeight(999999999)

  let log: ReturnType<typeof loggerCount>
  if (!hideLogs) {
    console.log(`Generating ${amount} wallets with concurrency ${concurrency} to "${file}".\n`)
    log = loggerCount(amount.toString().length, '0')
  }
  const chunked = chunkArray(Array(amount).fill(0), concurrency)

  let generatedWallets = []

  const fileHandle = await fs.promises.open(file, 'a')
  for (const aChunk of chunked) {
    const wallets = await Promise.all(aChunk.map(() => genWallet()))
    generatedWallets.push(...wallets)
    if (!hideLogs) wallets.forEach(x => log(x.split(';')[0]))
    await fileHandle.writeFile(`${wallets.join('\n')}\n`)
  }
  await fileHandle.close()

  if (!hideLogs) console.log(`\nAll ${amount} wallets were successfully generated to "${file}".`)

  return generatedWallets
}
