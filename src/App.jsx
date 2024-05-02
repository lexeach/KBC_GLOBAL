
import UserAccount from "./components/userAccount";
import { WagmiConfig } from "wagmi";
import ConnectButton from "./components/connectButton";

import Footer from "./components/Footer";
import WriteAbleFun from "./components/body-write-function";
import Header from "./components/header";
import NavBar from "./components/navbar";
import Slider from "./components/slider";
import UserInfo from "./components/user-info";
import { config } from "./config";
import './assets/style/style.scss'

import "./App.css";

// const queryClient = new QueryClient() 
export default function App() {
  return (
    <WagmiConfig config={config}>
      <div className="wrap">
        <div className="dashboard min-vh-100">
          <NavBar />
          <UserAccount />
          <div className="d-flex justify-content-center input-section">
            <ConnectButton />
          </div>
          <Header />
          <Slider />
          <UserInfo />
          <WriteAbleFun />
          <Footer />
        </div>
      </div>
    </WagmiConfig>
  );
}
