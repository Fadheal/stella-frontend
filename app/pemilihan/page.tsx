'use client'

import Silk from '@/components/Silk'
import TiltedCard from '../component/tiltedCard'
import Image from 'next/image'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertConfirmationDialog } from '../component/alert';

export default function PemilihanPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if (!token) {
            router.push('/');
            return
        };
        
        const jwtData = JSON.parse(atob(token.split('.')[1]));
        setName(jwtData.name);
    }, []);

    return (
        <div className='relative w-screen h-screen'>
            <div className="absolute inset-0 flex items-center justify-center">
                <Silk
                    speed={5}
                    scale={1}
                    color="#2800c7"
                    noiseIntensity={1.2}
                    rotation={0}
                />
            </div>
            <div className="absolute inset-0 bg-black/50 text-white z-10 p-20">     
                <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full h-full">
                    <div className="col-span-5 px-20">
                        <Image src='/LogoText.webp' width={359} height={125} alt='LogoSide' className='w-[359] h-[125]' />
                    </div>
                    <div className="col-span-5 row-span-3 row-start-2 flex justify-center items-center gap-15">
                        <AlertConfirmationDialog paslon={1}>
                            <div>
                                <TiltedCard paslon='1' name='SA' photoW={371} photoH={408} />
                            </div>
                        </AlertConfirmationDialog>
                        <AlertConfirmationDialog paslon={2}>
                            <div>
                                <TiltedCard paslon='2' name='SS' photoW={365} photoH={334} />
                            </div>
                        </AlertConfirmationDialog>
                        <AlertConfirmationDialog paslon={3}>
                            <div>
                                <TiltedCard paslon='3' name='AR' photoW={371} photoH={360} />
                            </div>
                        </AlertConfirmationDialog>
                    </div>
                    <div className="col-span-5 row-start-5 flex flex-col justify-end p-4">
                        <p className="text-white font-poppins text-[15.45px]">Selamat Datang, {name}.<br/>Gunakan pilihan anda dengan bijak!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}