import { FC } from 'react';
import { ethers } from 'ethers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Token from '../../constants/ABI/erc20.json';
import './transaction.css';
const axios = require('axios');

const Transaction: FC = () => {
  const { signer } = useAppSelector((state) => state.walletReducer);
  const apiKey = 'J9FHY4MFAVAS42EY3ZZXEZ1ZAK6Z3NJAAG';
  const tokenAddress = '0x8fb5805ebf3bc9a4759bffce7e486f01b73413d4';
  const network = 'testnet'; //
  let data = [{}];
  async function getAllTokenTransactions() {
    try {
      // Get the contract ABI
      const contract = new ethers.Contract(tokenAddress, Token, signer);

      // Get all token transactions
      const allTransactions = await axios.get(
        `https://api-${network}.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&apikey=${apiKey}`
      );

      // Print all transactions
      const latestTransactions = allTransactions.data.result
        .filter(
          (transaction: any) =>
            transaction.from !== '0x0000000000000000000000000000000000000000'
        ) // Filter out contract creation transactions
        .slice(0, 10);
      const table = document.getElementById('transactionTable');
      //@ts-ignore
      table.innerHTML = '<tr><th>From</th><th>Hash</th></tr>';
      latestTransactions.forEach((transaction: any) => {
        const row = `<tr><td>${'Transaction'}</td><td class="value">${transaction.hash}</td></tr>`;
        //@ts-ignore
        table.innerHTML += row;
      });
      //@ts-ignore
      table.innerHTML += '<tr><td colspan="2">---</td></tr>';
    } catch (error) {
      console.error('Error:', error);
    }
  }
  getAllTokenTransactions();

  return (
    <div className="body">
      <div id="wrapper">
        <table id="transactionTable">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
