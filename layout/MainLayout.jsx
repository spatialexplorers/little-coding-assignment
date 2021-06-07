import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

export function MainLayout({ title, children }) {
  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <div>
      <Nav>
        <Link href="/">
          <a className={asPath === "/" ? "active" : undefined}>Home</a>
        </Link>

        <Link href="/list">
          <a className={asPath === "/list" ? "active" : undefined}>Pokedex</a>
        </Link>
      </Nav>
      <Content>{children}</Content>
    </div>
  );
}

const Nav = styled.nav`
  background-color: midnightblue;
  height: 56px;
  padding: 0 32px;
  display: flex;
  align-items: center;

  a {
    margin-right: 16px;
    color: white;
    &.active {
      color: cyan;
    }
  }
`;

const Content = styled.main`
  padding: 32px;
`;
