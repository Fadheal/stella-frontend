'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from 'axios';

type alertProp = {
    paslon: number;
    children?: React.ReactNode
}

export function AlertConfirmationDialog(props: alertProp) {
    const router = useRouter();
    const [selected, setSelected] = useState({ selected: props.paslon });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.NEXT_PUBLIC_API_KEY,
      },
    };
    
    async function continueButtonHandler(e: { preventDefault: () => void; }) {
        setSelected({ selected: props.paslon })
        console.log('requesting');
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/votes', selected, config)
            console.log('Form submited succesfully: ', response.data);

            const token = sessionStorage.getItem('jwt');
            if (!token) return;
            
            const jwtData = JSON.parse(atob(token.split('.')[1]));

            if (jwtData.nis.length > 15) {
                const voterResponse = await axios.post('http://localhost:8080/voter/nip', { name: jwtData.name, nip: jwtData.nis }, config);
                console.log('Form submitted succesfully: ', voterResponse.data);
            } else {
                const voterResponse = await axios.post('http://localhost:8080/voter/nis', { name: jwtData.name, nis: jwtData.nis }, config);
                console.log('Form submitted succesfully: ', voterResponse.data);
            }

            sessionStorage.removeItem('jwt');
            router.push('/');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {props.children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#011F4B]">
                <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Apakah kamu yakin?</AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                    Pilihan anda tidak akan bisa diubah. Anda hanya punya satu kesempatan untuk memilih Paslon {props.paslon}, pastikan pilihan anda sudah benar. Setelah anda memilih, akan langsung dikembalikan ke laman masuk.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent text-white hover:bg-red-900 hover:text-white">Batal</AlertDialogCancel>
                <AlertDialogAction onClick={continueButtonHandler} className="bg-white text-gray-800 hover:text-white hover:bg-blue-900 ">Lanjutkan</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
