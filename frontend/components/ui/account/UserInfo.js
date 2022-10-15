import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../common/Loading";


export default function UserInfo() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    getUserInfo()  
  }, [])

  if (isLoading) return <Loading/>
  if (!data) return <div className="flex justify-center mt-20"><p>유저 정보가 없습니다.</p></div>

  async function getUserInfo(){
    try{
        const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/members');
        setData(result.data)
        setLoading(false)
    }catch (e) {
        console.log(e);
    }
  }

  return (
    <div className="bg-white">
    </div>
  )
}
  