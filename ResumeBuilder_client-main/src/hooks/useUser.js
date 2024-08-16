import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../api";

const useUser = () => {
    const {data,isLoading,error,refetch} = useQuery({
        queryKey:["users"],
        queryFn: async ()=>{

                const userDetails = await getUserDetails();
                return userDetails;
          
        },
        refetchOnWindowFocus:false,
    })
    return {data,isLoading,error,refetch};
}
export default useUser;