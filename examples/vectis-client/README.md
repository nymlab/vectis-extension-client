# Using Vectis Client

## Dev

### For local development

You can run the injected script locally in the `vectis-ui/apps/wallet` repo.
You must add the require `.env` file in that directory which should include `ORIGIN="http://localhost:3001/"`.
Then you can add the `.env` file for this example as `VITE_INJECTED_URI=http://localhost:3001/js/injectedScript.js`.

### Using testnet and deployed wallet

You can add the `.env` file for this example as `VITE_INJECTED_URI=http://localhost:3001/js/injectedScript.js`.

**NOTE:** the `injectedScript.js` from `localhost:3001` is built by running `npm run build` - it is not built with `npm run dev`
