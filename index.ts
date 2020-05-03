import fs from 'fs'
import { spawn, Worker, Pool } from 'threads'
import { Managers } from '@arkecosystem/crypto'
import cliProgress from 'cli-progress'

import type { WorkerMethods } from './worker'
import type { GenerationOptions, Wallet, GenerationOptionsFs } from './types'

export async function generateWallets({ amount = 100, network = 'devnet' }: GenerationOptions = {}) {
  Managers.configManager.setFromPreset(network)
  Managers.configManager.setHeight(999999999)

  const pool = Pool(() => spawn<WorkerMethods>(new Worker('./worker')), { concurrency: 6 })

  let generatedWallets: Wallet[] = []

  const addWallet = async ({ genWallet }: WorkerMethods) => generatedWallets.push(await genWallet())
  for (let i = 0; i < amount; i++) pool.queue(addWallet)

  await pool.completed()
  await pool.terminate()

  return generatedWallets
}

export async function generateWalletsFs({
  file = '_arkWallets.txt',
  amount = 100,
  network = 'devnet',
  logs = true,
  showWallets = false
}: GenerationOptionsFs = {}) {
  Managers.configManager.setFromPreset(network)
  Managers.configManager.setHeight(999999999)

  let walletCount = 1

  let progressBar = new cliProgress.SingleBar(
    { clearOnComplete: true, etaBuffer: 100 },
    cliProgress.Presets.shades_classic
  )
  if (logs) {
    console.info(`Generating ${amount} wallets to "${file}".\n`)
    if (!showWallets) progressBar.start(amount, 0)
  }

  const pool = Pool(() => spawn<WorkerMethods>(new Worker('./worker')), { concurrency: 6 })

  const hrstart = process.hrtime()

  const fileHandle = await fs.promises.open(file, 'a')

  const addWallet = async ({ genWallet }: WorkerMethods) => {
    const wallet = await genWallet()
    await fileHandle.writeFile(`${wallet.address}:${wallet.passphrase}\n`)

    if (logs) {
      const countPadded = walletCount.toString().padStart(amount.toString().length, '0')
      if (!showWallets) progressBar.increment()
      else console.log(`${countPadded} ${wallet.address}`)
    }
    walletCount++
  }

  for (let i = 0; i < amount; i++) pool.queue(addWallet)

  await pool.completed()
  await pool.terminate()
  await fileHandle.close()
  const hrend = process.hrtime(hrstart)

  if (logs) {
    if (!showWallets) progressBar.stop()
    console.info(`\nGenerated ${amount} wallets to "${file}" in ${hrend[0]}s.\n`)
  }
}
