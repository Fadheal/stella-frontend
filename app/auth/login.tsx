import Image from "next/image"
import LoginField from "../component/loginField"

export default function LoginPage() {
    return(
        <div className="bg-[url('/Background_Login.png')] bg-cover bg-center bg-no-repeat h-screen w-screen">
            <div className="grid grid-cols-6 grid-rows-1 gap-0">
                <div className="col-span-4 h-full">
                    <div className="p-20 flex flex-col h-full w-full">
                        <Image src='/AllLogo.png' width={312} height={62.52} alt="Logo"/>
                        <div className="grid gap-[39px] p-20">
                            <h1 className="text-white font-poppins font-bold text-[64px]">Halo Sobat, Vohisma! 👋</h1>
                            <p className="text-white font-poppins text-[24.45px]">Selamat datang di E-Pilketos Osis Vohi5ma Regeneration. Gunakan hak pilih anda dengan bijak, karena satu suara dari anda akan sangat berpengaruh pada keberlangsungan demokrasi di SMKN 5 Malang. Atas perhatian dan suara anda, kami ucapkan Terima Kasih.</p>
                        </div>
                        <div className="mt-auto">
                            <p className="text-white font-poppins text-[24.45px]">SMKN 5 Kota Malang . Stella Vohi5ma 2024/2025</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 col-start-5 h-screen bg-white">
                    <div className="p-20 grid gap-30">
                        <h1 className="text-[#011F4B] text-5xl font-poppins font-bold leading-[59px]">Silakan Masukan Data Anda</h1>
                        <div className="h-full">
                            <LoginField />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}