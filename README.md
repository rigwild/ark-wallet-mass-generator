# ark-wallet-mass-generator
> Generate a lot a ARK wallets 👛

![Screenshot](./screenshot.png)

Generate a lot of [ARK](https://ark.io/) wallets quickly. This can be useful to find a nice wallet address.

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
```

## Output
Generated wallets will be appended to your output file with the following format.
```
AazdtKbM6dwBPmRpdYySE4GGUyGhCpKmCM;topic crush heart chase return breeze boil laugh silly antenna hen width
AH3tAPYZyYeLFb6nEcGyY8xKY2WmfQqv2W;forest pepper sauce flat flame object basic odor wall dutch mail mosquito
AM3DCuCdZtLEsC9KFDqU7Dhme7Tce7D6mF;clerk rookie direct saddle mesh eye confirm have silly doll enact profit
ASfKW3gsjF3FMyXgyp3WK77f2k6rdCsNKZ;fence banner dirt uniform dawn fan ribbon ill person banana ridge stone
```

## Related
 - [ipfs-ark-stamp](https://github.com/rigwild/ipfs-ark-stamp) - 📝 Add files to IPFS and stamp its IPFS CID hash permanently on the ARK Blockchain

## License
[The MIT license](./LICENSE)
