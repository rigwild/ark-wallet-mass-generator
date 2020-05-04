import test from 'ava'
import fs from 'fs'
import { resolve as r } from 'path'

import { generateWallets, generateWalletsFs } from '../'
import { checkWalletFile } from './_utils'

test.before(async () => {
  try {
    await fs.promises.unlink(r(__dirname, '_api_1.txt'))
  } catch {}
})

test('generateWallets', async t => {
  const res = await generateWallets({ amount: 3, network: 'mainnet' })
  t.is(res.length, 3)
  t.true(res.every(x => x.address.startsWith('A')))
})

test('generateWalletsFs', async t => {
  const file = r(__dirname, '_api_1.txt')
  await generateWalletsFs({ file, amount: 3, network: 'mainnet', logs: false })
  await checkWalletFile(t, file)
})
