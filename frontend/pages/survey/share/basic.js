import PageTitle from "../../../components/ui/PageTitle";
import React from "react"
import BasicSurveyResponse from "../../../components/ui/survey/BasicSurveyResponse";

const Basic = () => {
    return (
        <div>
            <PageTitle title="Basic 설문 응답"/>
            <div className="mx-8">
                <BasicSurveyResponse/>
            </div>
        </div>
    );
};

export default Basic;
