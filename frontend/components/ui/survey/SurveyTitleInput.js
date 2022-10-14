export default function SurveyTitleInput(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className={props.bgColor + " space-y-6 px-4 py-5 sm:p-6"}>
                    <div>
                        <input
                            type="text"
                            id="svyTitle"
                            placeholder="설문 제목을 입력하세요"
                            className="block w-full font-bold text-gray-900 border-0 rounded-md shadow-sm bg-opacity-20 focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                            onChange={props.setSvyTitle}
                            defaultValue={props.receiveTitle}
                        />
                        <textarea
                            id="svyIntro"
                            rows={3}
                            className="block w-full mt-4 text-gray-900 border-0 rounded-md shadow-sm bg-opacity-20 focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                            placeholder="설문 설명을 입력하세요"
                            defaultValue={props.receiveIntro}
                            onChange={props.setSvyIntro}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
  