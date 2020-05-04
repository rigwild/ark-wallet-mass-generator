import fs from 'fs'
import type { ExecutionContext } from 'ava'

export const checkWalletFile = async (t: ExecutionContext, file: string) => {
  await t.notThrowsAsync(fs.promises.access(file))
  const wallets = (await fs.promises.readFile(file, { encoding: 'utf-8' })).trim().split('\n')
  t.is(wallets.length, 3)
  t.true(wallets.every(x => x.startsWith('A')))
}
