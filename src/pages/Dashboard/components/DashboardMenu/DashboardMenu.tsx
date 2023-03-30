import { Menu, Switch } from "antd";
import Paragraph from "components/Typography/Paragraph";
import { items } from "pages/Dashboard/menuConstants";
import { useDispatch } from "react-redux/es/exports";
import { setUser } from "store/slice/userSlice";

import { CompanyContainer, StyledSider, ToggleAdminContainer } from "./styles";
import { type DashboardMenuProps } from "./types";
const DashboardMenu = ({
  onClick,
  current,
  userData,
  companyName,
  unitName,
}: DashboardMenuProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleAdminMode = (value: boolean): void => {
    if (value && value) {
      dispatch(setUser({ ...userData, isAdmin: true }));
    } else {
      dispatch(setUser({ ...userData, isAdmin: false }));
    }
  };

  return (
    <StyledSider>
      <CompanyContainer>
        <Paragraph color="#fff" strong>
          {companyName}
        </Paragraph>
        <Paragraph color="#fff" strong>
          {unitName}
        </Paragraph>
      </CompanyContainer>
      <Menu
        theme="dark"
        onClick={onClick}
        style={{
          width: "100%",
        }}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <ToggleAdminContainer>
        <Switch
          checkedChildren="Modo Admin"
          unCheckedChildren="Modo Usuário"
          onChange={(value) => {
            handleAdminMode(value);
          }}
          defaultChecked={userData.isAdmin}
        />
      </ToggleAdminContainer>
    </StyledSider>
  );
};

export default DashboardMenu;
