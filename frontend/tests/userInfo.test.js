import UserInfo from "../components/ui/account/UserInfo";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("UserInfo", () => {
    it("renders a userInfo component", async () => {

        render(
            <RecoilRoot>
                <UserInfo />
            </RecoilRoot>
        );

        const name = screen.queryByTestId("name");
        const nameModify = screen.queryByTestId("nameModify");
        const modifyBtn = screen.queryByTestId("modify");

        // check if all components are rendered
        expect(name).toBeInTheDocument();
        expect(nameModify).toBeInTheDocument();
        expect(modifyBtn).toBeInTheDocument();
    });

    // check if name is submitted properly
    it("name equal test", async () => {

        render(
            <RecoilRoot>
                <UserInfo />
            </RecoilRoot>
        );

        const name = screen.queryByTestId("name");
        const nameModify = screen.queryByTestId("nameModify");
        const modifyBtn = screen.queryByTestId("modify");

        fireEvent.click(modifyBtn);
        expect(name).toHaveTextContent(nameModify);

    });
});

