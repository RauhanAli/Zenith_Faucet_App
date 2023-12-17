import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { setAccountAddress, setProvider, setSigner } from '../../redux/Wallet';
import { setModalOpen, setDisconnectedModalOpen } from '../../redux/modal';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Modal, Space } from 'antd';

const NavBar: FC = () => {
  const [message, setMessage] = useState<any>({});
  const [account, setAccount] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { accountAddress } = useAppSelector((state) => state.walletReducer);

  const { ethereum } = (typeof window !== 'undefined' ? window : {}) as {
    ethereum: any;
  };
  let firstThree: string;
  let lastThree: string;
  const checkEthereumExists = () => {
    if (!ethereum) {
      return false;
    }
    return true;
  };
  const showDisconnectModalOpen = () => {
    setOpenModal(true);
  };
  const handleDisconnectModalCancel = () => {
    setOpenModal(false);
  };
  const connectWallet = async () => {
    if (checkEthereumExists()) {
      try {
        const accounts = await ethereum.request(
          {
            method: 'eth_requestAccounts',
          },
          []
        );
        dispatch(setAccountAddress(accounts[0]));
        setOpenModal(false);
        setAccount(true);
        connectProvider();
      } catch (err) {
        //  setMessage(err?.message?.split('(')[0]);
        setMessage('Error Occured');
      }
    }
  };

  const connectProvider = () => {
    if (checkEthereumExists()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      dispatch(setProvider(provider));
      dispatch(setSigner(signer));
    }
  };

  if (accountAddress !== '') {
    var length = accountAddress!?.length;
    firstThree = accountAddress!?.substr(0, 5); // Extracts the first 3 characters
    lastThree = accountAddress!?.substr(length - 5);
  }

  const disconnectWallet = () => {
    // @ts-ignore
    if (checkEthereumExists()) {
      dispatch(setAccountAddress(''));
      dispatch(setProvider(null));
      dispatch(setSigner(null));
      setOpenModal(false);
      // dispatch(setDisconnectedModalOpen(false));
    }
  };
  useEffect(() => {
    if (checkEthereumExists()) {
      ethereum.on('accountsChanged', connectWallet);
      connectWallet();
    }
    return () => {
      if (checkEthereumExists()) {
        ethereum.removeListener('accountsChanged', connectWallet);
      }
    };
  }, []);

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white mb-0 ">
              ZenithX
            </span>
          </a>
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white mb-0 ">
              Mint Faucet
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={
                accountAddress !== '' ? showDisconnectModalOpen : connectWallet
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {accountAddress === ''
                ? 'Connect Wallet'
                : //@ts-ignore
                  firstThree + '...' + lastThree}
            </button>
            <Modal
              className="w-fit"
              footer={null}
              open={openModal}
              onCancel={handleDisconnectModalCancel}
              closable={true}
              centered={true}
            >
              <div className="text-center">
                <Space direction="vertical" size={'middle'}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      disconnectWallet();
                    }}
                  >
                    Disconnect
                  </button>
                </Space>
              </div>
            </Modal>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
