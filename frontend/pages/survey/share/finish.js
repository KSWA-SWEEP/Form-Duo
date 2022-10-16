import PageTitle from "../../../components/ui/PageTitle";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import LazyShow from "../../../components/common/LazyShow"
import Loading from "../../../components/common/Loading";

const Basic = () => {

    const router = useRouter();
    const [query, setQuery] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [endMessage, setEndMessage] = useState("감사합니다👍");

    useEffect(() => {
        setLoading(true)
        getQuery();
    }, [query])

    if (isLoading) return <Loading />;
    if (query == undefined) return <Loading />;

    async function getQuery() {
        try {
            // 쿼리 가져오기
            console.log("###### query: " + JSON.stringify(router.query));
            console.log("###### endMessage: " + router.query.endMsg);
            
            setQuery(router.query)
            setEndMessage(JSON.parse(query.endMsg));
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <LazyShow>
                <div className="mx-8 my-44">
                    <div className="lg:text-center">
                        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            설문 응답이 완료되었습니다
                        </p>
                        <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
                            {endMessage}
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
