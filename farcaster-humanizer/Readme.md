# Farcaster Humanizer Package

A library for checking if farcaster fid is verified via world id. 
Mapping contract is deployed on Optimism, and this package reading from contract and checking if fid is authorized

```
$ npm install farcaster-humanizer
```

```
import { useVerified } from "farcaster-humanizer"
const { isVerified } = useVerified({})
const isVerified = await isVerified(your_fid)
```

github url: https://github.com/Bagdu/farcaster-humanizer/tree/main/farcaster-humanizer