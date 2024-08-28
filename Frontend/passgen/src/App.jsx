import "./App.css";
import Create from "./Component/Create";
import Header from "./Component/Header";
import ModeProvider from "./Context/Context";

function App() {
  return (
    <>
      <div className="flex flex-col dark:bg-[#040c1d] w-screen h-screen">
        <ModeProvider>
          <Header />
          <Create />
        </ModeProvider>
      </div>
    </>
  );
}

export default App;
