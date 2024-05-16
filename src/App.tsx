import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import NavBar from "./components/navbar";
import Header from "./components/header";
import Footer from "./components/footer";
import UserInfo from "./components/user-info";
import WriteAbleFun from "./components/writes-functions";
import UserAccount from "./components/userAccount";
// import { ConnectWallet } from "./components/conn-btn";
import "./assets/style/style.scss";
import Slider from "./components/read-functions";
import btc_video from "./assets/img/btc.mp4";
// import btc_video from "./assets/img/btc-rain.mp4";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="wrap ">
            <div className="video-background">
              <video autoPlay loop muted>
                <source src={btc_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="dashboard min-vh-100">
              <NavBar />
              <UserAccount />
              {/* <ConnectWallet /> */}
              <Header />
              <Slider />
              <UserInfo />
              <WriteAbleFun />
              <Footer />
            </div>
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
