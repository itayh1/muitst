import React, { useState } from "react";
import styled from "styled-components";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <Nav>
                <Logo>
                    Mui<span>Test</span>
                </Logo>
                <Hamburger
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}>
                    <span />
                    <span />
                    <span />
                </Hamburger>
                <Menu isOpen={isOpen}>
                    <MenuLink href="">Our work</MenuLink>
                    <MenuLink href="">About</MenuLink>
                    <MenuLink href="">Contact us</MenuLink>
                </Menu>
            </Nav>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* margin-bottom: 80px; */
`;

const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color: white;
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100; */
`;

const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    span {
        height: 3px;
        width: 25px;
        background: #7b7fda;
        margin-bottom: 4px;
        border-radius: 5px;
    }

    @media (max-width: 600px) {
        display: flex;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: relative;

    @media (max-width: 600px) {
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
        transition: max-height 0.3s ease-in;
    }
`;
const MenuLink = styled.a`
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: #67bc98;
    transition: all 0.1s ease-in;

    &:hover {
        color: #7b7fda;
    }
`;

const Logo = styled.a`
    padding: 1rem 0;
    color: #7b7fda;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.7rem;

    span {
        font-weight: 300;
        font-size: 1.3rem;
    }
`;

export default Navbar;
