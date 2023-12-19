import { FC } from 'react';
import NavBar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';
import Transaction from '../Transactions/transactions';

const HomePage: FC = () => {
  return (
    <div className="text-center ">
      <NavBar />
      <div className="flex">
        <Dashboard />
        <Transaction />
      </div>
    </div>
  );
};

export default HomePage;
