import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle } from "styled-components";

import router from "./routes/routes";
import { persistor } from "./store/index";
import { store } from "./store";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={ptBR}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
