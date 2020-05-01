#!/usr/bin/env node
'use strict'

import meow from 'meow'
import updateNotifier from 'update-notifier'

import { massGenerate } from './api'

const cli = meow(
  `
    Usage
      $ ark-wallet-mass-generator
    
    Options
      --file -f         Output file (default: "_arkWallets.txt")
      --amount -a       Amount of wallets to generate (default: 30)
      --concurrency -c  Concurrent wallet generation (default: 12)
      --network -n      Blockchain network (default: "devnet")
      --hideLogs        Hide logging output

    Examples
      $ ark-wallet-mass-generator
      $ ark-wallet-mass-generator --network="mainnet"
      $ ark-wallet-mass-generator --file="_arkWallets.txt" --amount 500 -c 20
      $ ark-wallet-mass-generator --amount 50 --concurrency 8 --hideLogs --network="testnet"

    https://github.com/rigwild/ark-wallet-mass-generator
`,
  {
    flags: {
      file: {
        type: 'string',
        alias: 'f'
      },
      amount: {
        type: 'number',
        alias: 'a'
      },
      concurrency: {
        type: 'number',
        alias: 'c'
      },
      network: {
        type: 'string',
        alias: 'n'
      },
      hideLogs: {
        type: 'boolean'
      }
    }
  }
)

updateNotifier({ pkg: cli.pkg as updateNotifier.Package }).notify()

massGenerate(cli.flags)
