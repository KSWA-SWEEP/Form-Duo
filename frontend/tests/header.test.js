import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/common/Header";
import { RecoilRoot } from "recoil";

describe("Header", () => {
    it("show the text props correctly", () => {

        render(
            <RecoilRoot>
                <Header />
            </RecoilRoot>
        );

        expect(screen.queryByText("폼듀란?")).toBeInTheDocument();
        expect(screen.queryByText("튜토리얼")).toBeInTheDocument();
        expect(screen.queryByText("로그인")).toBeInTheDocument();
        expect(screen.queryByText("회원가입")).toBeInTheDocument();

    });

});

