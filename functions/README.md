## Deployment

```

export GOOGLE_APPLICATION_CREDENTIALS=wwin-testnet-firebase-adminsdk-8a6a2-2554148e4b.json

export GOOGLE_APPLICATION_CREDENTIALS=wwin-mainnet-firebase-adminsdk-sia77-e2283ed42e.json
firebase emulators:start

## Kill emulator
lsof -i tcp:3000 
killall -9 java


```

## Production

```
firebase deploy --only "functions:handleCollections"
```

1. switch hardhat config to mainnet
2. change account secret to owner