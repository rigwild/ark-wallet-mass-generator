import test from 'ava'
import fs from 'fs'
import { resolve as r } from 'path'
import execa from 'execa'

import { checkWalletFile } from './_utils'

const distDir = r(__dirname, '..', 'dist')
const cli = r(distDir, 'cli.js')

test.before(async () => {
  try {
    // prettier-ignore
    await Promise.all([
      fs.promises.unlink(r(__dirname, '_cli_1.txt')),
      fs.promises.unlink(r(__dirname, '_cli_2.txt'))
    ])
  } catch {}

  // Compile TypeScript if `dist` directory is not found
  if (!fs.existsSync(distDir)) await execa('npx', ['tsc'])
})

test('show wallets', async t => {
  const file = r(__dirname, '_cli_1.txt')
  const { stdout } = await execa(cli, ['--file', file, '--amount', '3', '--network', 'mainnet', '--show-wallets'])
  await checkWalletFile(t, file)
  t.is(stdout.split('\n').filter(x => x.slice(2).startsWith('A')).length, 3)
})

test('no logs', async t => {
  const file = r(__dirname, '_cli_2.txt')
  const { stdout } = await execa(cli, ['--file', file, '--amount', '3', '--network', 'mainnet', '--no-logs'])
  await checkWalletFile(t, file)
  t.true(stdout === '' || stdout.startsWith('Node worker_threads not available'))
})
