# ark-wallet-mass-generator
> Generate a lot a ARK wallets 👛

![Screenshot](./screenshot.png)

Generate a lot of [ARK](https://ark.io/) wallets quickly. This can be useful to find a nice wallet address.

Uses Node.js [Worker Threads](https://nodejs.org/api/worker_threads.html) for optimal performance (will use a Polyfill if Node.js version is less than 12).

## Install
```
$ yarn global add ark-wallet-mass-generator
# or npm i -g ark-wallet-mass-generator
```

## Usage
```
$ ark-wallet-mass-generator --help

  Usage
    $ ark-wallet-mass-generator
  
  Options
    --file -f         Output file [Default: "_arkWallets.txt"]
    --amount -a       Amount of wallets to generate [Default: 100]
    --network -n      Blockchain network [Default: "devnet"]
    --no-logs         Hide all logging output
    --show-wallets    Print wallets to the terminal instead of the progress bar [Default: false]

  Examples
    $ ark-wallet-mass-generator
    $ ark-wallet-mass-generator --network="mainnet"
    $ ark-wallet-mass-generator --file="_arkWallets.txt" --amount 500000
    $ ark-wallet-mass-generator --amount 500 --no-logs --network="testnet"
    $ ark-wallet-mass-generator --show-wallets

  https://github.com/rigwild/ark-wallet-mass-generator
```

## Output
Generated wallets will be appended to your output file with the following format:

```
AazdtKbM6dwBPmRpdYySE4GGUyGhCpKmCM;topic crush heart chase return breeze boil laugh silly antenna hen width
AH3tAPYZyYeLFb6nEcGyY8xKY2WmfQqv2W;forest pepper sauce flat flame object basic odor wall dutch mail mosquito
AM3DCuCdZtLEsC9KFDqU7Dhme7Tce7D6mF;clerk rookie direct saddle mesh eye confirm have silly doll enact profit
ASfKW3gsjF3FMyXgyp3WK77f2k6rdCsNKZ;fence banner dirt uniform dawn fan ribbon ill person banana ridge stone
```

## Benchmark
Windows 10 x64 - Intel Core i7-6700HQ CPU @ 2.60GHz (8 cores)

```
Generated 5000 wallets to "_arkWallets.txt" in 55s
=> 90.9 wallets/s
```

## Related
 - [ipfs-ark-stamp](https://github.com/rigwild/ipfs-ark-stamp) - 📝 Add files to IPFS and stamp its IPFS CID hash permanently on the ARK Blockchain

## License
[The MIT license](./LICENSE)
