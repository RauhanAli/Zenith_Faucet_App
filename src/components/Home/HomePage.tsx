import { FC } from 'react';
import NavBar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';
import Transaction from '../Transactions/transactions';

const HomePage: FC = () => {
  return (
    <div className="text-center ">
      <NavBar />
      <div className="float-left">
        <Dashboard />
      </div>
      <div>
        <Transaction />
      </div>
    </div>
  );
};

export default HomePage;
