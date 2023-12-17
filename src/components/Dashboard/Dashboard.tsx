import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Token from '../../constants/ABI/erc20.json';
import Faucet from '../../constants/ABI/faucet.json';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Dashboard: FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [data, setData] = useState<any>({});
  const [message, setMessage] = useState<any>({});
  const [refresh, setRefresh] = useState<number>(0);
  const [nextBuyTime, setNextBuyTime] = useState<number>(0);
  const { networkId, accountAddress, provider, signer } = useAppSelector(
    (state) => state.walletReducer
  );

  // const POSSIBLE_ERRORS = [
  //   'ERC20: insufficient allowance',
  //   'Your next request time is not reached yet',
  //   'ERC20: transfer amount exceeds balance',
  //   'requestTokens(): Failed to Transfer',
  // ];
  const zenithToken = '0x8fB5805EbF3BC9A4759BFfce7E486f01b73413d4';
  const faucetAddress = '0x5f071eE547BE4a77e61AB34f3D5DCDdFcafB7B23';
  let faucetCalled = false;

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const getBalance = async () => {
    let balanceFormated: any;
    //@ts-ignore
    const ERC20 = new ethers.Contract(zenithToken, Token, signer);
    const Balance = await ERC20.balanceOf(accountAddress);
    balanceFormated = parseFloat(
      (Number(Balance) / 10 ** 18)?.toString()
    )?.toFixed(4);

    setBalance(balanceFormated);
  };

  const transfer = async (address: any, amount: number) => {
    const zenithContract = new ethers.Contract(zenithToken, Token, signer);
    let tx = await zenithContract.transfer(
      address,
      ethers.utils.parseEther(amount?.toString())
    );
    await tx.wait();
    setMessage({
      title: 'success',
      description: 'Transferred Successfully',
    });
    // setRefresh((prev) => prev + 1);
  };
  const approve = async (address: any, amount: number) => {
    //0xfb..26 approved to take money on my behalf
    const zenithContract = new ethers.Contract(zenithToken, Token, signer);
    let tx = await zenithContract.transfer(
      address,
      ethers.utils.parseEther(amount?.toString())
    );
    await tx.wait();
    setMessage({
      title: 'success',
      description: 'Approved tokens successfully',
    });
  };

  const requestTokens = async () => {
    const faucetContract = new ethers.Contract(faucetAddress, Faucet, signer);
    faucetCalled = true;
    let tx = await faucetContract.requestTokens({
      gasLimit: 900000,
    });
    await tx.wait();

    setMessage({
      title: 'success',
      description: 'Tokens Received successfully',
    });
    setRefresh((prev) => prev + 1);
  };

  const getNextBuyTime = async () => {
    const faucetContract = new ethers.Contract(faucetAddress, Faucet, signer);
    let nextBuyTime = await faucetContract.getNextBuyTime();
    setNextBuyTime(nextBuyTime.toNumber() * 1000);
  };
  useEffect(() => {
    if (accountAddress !== '') getBalance();
    if (faucetCalled) getNextBuyTime();
  }, [refresh, faucetCalled, accountAddress]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-auto mt-4 max-w-screen-lg">
        {/* form here */}

        <div className="bg-white-300 flex-1">
          <div className="container max-w-3xl py-10">
            <div className="shadow-border bg-blue-200 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-4 bg-yellow-400 flex flex-col p-4 border-black">
                  <h2 className="text-4xl md:text-5xl font-bold">{`${balance} ZTK`}</h2>
                  <div className="flex-1" />
                  <p className="text-lg font-bold">Balance</p>
                </div>

                <button
                  onClick={() => {
                    //@ts-ignore
                    new Date() - new Date(nextBuyTime) > 0
                      ? requestTokens()
                      : null;
                  }}
                  className="btn bg-green-500 md:text-2xl border-4 border-black"
                >
                  {
                    //@ts-ignore
                    new Date() - new Date(nextBuyTime) < 0 ? (
                      <>{`Next Request at ${new Date(
                        nextBuyTime
                      ).toLocaleString()}`}</>
                    ) : (
                      <>
                        <span className="block font-bold">Request</span>
                        <span className="block font-bold">Tokens</span>
                      </>
                    )
                  }
                </button>
                <div className="sm:col-span-2 bg-gray-700 h-0.5" />
                <input
                  placeholder="Address"
                  className="border-4 border-black p-2"
                  type={'text'}
                  name="address"
                  onChange={handleChange}
                />
                <input
                  placeholder="Amount"
                  className="border-4 border-black p-2"
                  type={'text'}
                  name="amount"
                  onChange={handleChange}
                />

                <button
                  onClick={() => {
                    console.log(data);
                    transfer(data.address, data.amount);
                  }}
                  className="btn bg-green-400 border-4 border-black md:text-2xl"
                >
                  <span className="sm:block font-bold">Transfer</span>
                  <span className="sm:block font-bold">Tokens</span>
                </button>

                <button
                  onClick={() => {
                    approve(data.address, data.amount);
                  }}
                  className="btn md:text-2xl bg-orange-400 border-4 border-black"
                >
                  <span className="sm:block font-bold">Approve</span>
                  <span className="sm:block font-bold">Tokens</span>
                </button>

                <div className="col-span-2 bg-amber-200 border-4 border-black p-4">
                  {message.description ? (
                    <p className="text-xl capitalize">{`${message.title}: ${message.description}`}</p>
                  ) : (
                    <p className="text-xl font-bold">{`No Message`}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
