import {User} from "@/types/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import ProfileCard from "@/Features/Profile/Components/Presentational/ProfileCard.tsx";
import {useCallback, useEffect, useState} from "react";
import {KYC} from "@/Features/Profile/Types/KYC.ts";
import {get} from "@/services/apiService.ts";
import {toast} from "sonner";
import KYCDetailsCard from "@/Features/Profile/Components/Presentational/KYCDetailsCard.tsx";
import {Card} from "@/components/ui/card.tsx";
import KYCForm from "@/Features/Profile/Components/Functional/KYCForm.tsx";

const ProfilePage = () => {
    const user = useSelector((state: RootState): User | null => state.auth.user);
    const [KYCDetails, setKYCDetails] = useState<KYC[]>([]);
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    const fetchKYCStatus = useCallback(async () => {
        try {
            if (authToken) {
                const KYCInfo = await get<KYC[]>(import.meta.env.VITE_KYCDETAILS_API, {}, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setKYCDetails(KYCInfo);
                toast.success('KYC details fetched successfully.');
            }
        } catch (error) {
            toast.error('Error fetching KYC Details:');
            console.error('Error fetching KYC Details:', error);
        }
    }, [authToken]);

    useEffect(() => {
        fetchKYCStatus();
    }, [fetchKYCStatus]);


    return (
        <div className="p-4 gap-4">
            <h1 className="font-serif text-4xl mb-4 text-gray-700">{user?.username}'s Profile</h1>
            <div className="mb-4">
                <ProfileCard user={user}/>
            </div>
            <h1 className="font-serif text-2xl mb-4 text-gray-700">KYC Details</h1>{KYCDetails !== null &&
            <div>
                {KYCDetails.map((kyc) => (
                    <KYCDetailsCard key={kyc.KYCID} KYCInfo={kyc}/>
                ))}
            </div> ||
            <div className="mb-4">
                <em>
                    <h1 className="font-serif text-md text-gray-500 mb-4">
                        Haven't Done KYC Yet Apply Below
                    </h1>
                </em>
                <Card className="p-4">
                    <KYCForm onSuccess={fetchKYCStatus}/>
                </Card>
            </div>
        }
        </div>
    );
};

export default ProfilePage;