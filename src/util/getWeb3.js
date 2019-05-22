import Web3 from 'web3'
import hateAbi from './hateAbi'

/*
 * 1. Check for injected web3 (mist/metamask)
 * 2. If metamask/mist create a new web3 instance and pass on result
 * 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
 * 4. Get user account from metamask
 * 5. Get user balance
 */

let getWeb3 = new Promise(function (resolve, reject) {
    // Check for injected web3 (mist/metamask)
    var web3js = window.web3
    if (typeof web3js !== 'undefined') {
      var web3 = new Web3(web3js.currentProvider)
      resolve({
        injectedWeb3: web3.isConnected(),
        web3() {
          return web3
        }
      })
    } else {
      // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
      reject(new Error('Unable to connect to Metamask'))
    }
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve network ID
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          reject(new Error('Unable to retrieve network ID'))
        } else {
          console.log(networkId);
          // Assign the networkId property to our result and resolve promise
          if (networkId == '3') {
            result = Object.assign({}, result, {
              networkId: 'Ropsten'
            })
          } else {
            result = Object.assign({}, result, {
              networkId: 'You need to be connected to ropsten'
            })
          }
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, {
            coinbase
          })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      let hateContract = result.web3().eth.contract(hateAbi);
      let hateInstance = hateContract.at("0xa9edb6a9c1f407340d7f1cff36fa299308397422");
      hateInstance.balanceOf(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, {
            balance
          })
          resolve(result)
        }
      })
    })
  })

export default getWeb3
