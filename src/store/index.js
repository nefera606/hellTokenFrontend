import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import getHate from '../util/getHate'
import getContract from '../util/getContract'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance(state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
    },
    registerDataElements(state, payload) {
      console.log('registerData Mutation being executed', payload)
      let dataCopy = state.data;
      payload.forEach(element => {
        dataCopy.push(element);
      });
      state.data = dataCopy;
    },
    registerContractInstance (state, payload) {
      console.log('Hate token contract instance: ', payload)
      state.contractInstance = () => payload
      }
  },
  actions: {
    registerWeb3({
      commit
    }) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    registerData({
      commit
    }) {
      console.log('registerData Action being executed')
      getHate.then(result => {
        console.log('commiting result to registerDataElements mutation');
        commit('registerDataElements', result)
      }).catch(e => {
        console.log('error in action registerData', e)
      })
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
      commit('registerContractInstance', result)
      }).catch(e => console.log(e))
      }
  },
})
