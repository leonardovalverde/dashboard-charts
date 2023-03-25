import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

const App = (): JSX.Element => {
  return (
    <ConfigProvider locale={ptBR}>
      <div className="App">é isto</div>
    </ConfigProvider>
  );
};

export default App;
