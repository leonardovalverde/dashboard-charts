import { Button, Menu, Spin } from "antd";
import Paragraph from "components/Typography/Paragraph";
import { items } from "pages/Dashboard/menuConstants";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { useGetUnitByIdQuery } from "services/units/units";

import { Container, SignOutButtonWrapper, UserInfoWrapper } from "./styles";
import { type DashboardMobileMenuProps } from "./types";

const DashboardMobileMenu = ({
  onClick,
  current,
  colapsed,
  userData,
}: DashboardMobileMenuProps): JSX.Element => {
  const { data, isLoading } = useGetUnitByIdQuery(userData.unitId);
  const { data: companyData, isLoading: companyIsLoading } =
    useGetCompanyByIdQuery(userData.companyId);

  return (
    <>
      {colapsed ? (
        <></>
      ) : (
        <Container>
          <UserInfoWrapper>
            <Paragraph color="#fff">{userData.name}</Paragraph>
            <Paragraph color="#fff">ID: {userData.id}</Paragraph>
            <Paragraph color="#fff">
              {isLoading ? <Spin /> : data?.name}
            </Paragraph>
            <Paragraph color="#fff">
              {companyIsLoading ? <Spin /> : companyData?.name}
            </Paragraph>
          </UserInfoWrapper>
          <Menu
            theme="dark"
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
          <SignOutButtonWrapper>
            <Button
              type="default"
              onClick={() => {
                window.location.reload();
              }}
            >
              Sair
            </Button>
          </SignOutButtonWrapper>
        </Container>
      )}
    </>
  );
};

export default DashboardMobileMenu;
