import { Container as ContainerContent } from "semantic-ui-react";

function Container({ children }) {
  return (
    <>
      <ContainerContent text>{children}</ContainerContent>
    </>
  );
}

export default Container;
