export default function SurveyTitleShow(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className={props.bgColor + " space-y-6 px-4 py-5 sm:p-6"}>
                    <div>
                        <h1 className="px-4 text-xl font-extrabold text-gray-600 ">
                        {props.svyTitle}
                        </h1>
                        <h1 className="px-4 text-l font-extrabold text-gray-600 ">
                        {props.svyIntro}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
  