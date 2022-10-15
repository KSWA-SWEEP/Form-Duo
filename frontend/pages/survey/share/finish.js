import PageTitle from "../../../components/ui/PageTitle";
import React from "react";
import Link from "next/link";
import LazyShow from "../../../components/common/LazyShow"

const Basic = () => {
    return (
        <div>
            <LazyShow>
                <div className="mx-8 my-44">
                    <div className="lg:text-center">
                        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            설문 응답이 완료되었습니다
                        </p>
                        <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
                            감사합니다👍
                        </p>

                        <div className="flex justify-center mt-8 md:mt-14 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link 
                                    href={{
                                    pathname: '/'
                                    }} 
                                > 
                                <div
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-md bg-fdblue hover:bg-fdbluedark"
                                    >
                                    메인 화면으로 이동
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </LazyShow>
        </div>
    );
};

export default Basic;
