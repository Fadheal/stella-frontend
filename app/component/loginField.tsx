'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import axios from 'axios';

export default function LoginField() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [nis, setNis] = useState('');

    function hasItems<T>(arr: T[]): boolean {
        return arr.length > 0;
    }

    async function handleLogin() {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, nis }),
        });

        if (!res.ok) {
            alert('Login failed');
            return;
        }

        const data = await res.json();
        if (data.token) {
            sessionStorage.setItem('jwt', data.token);
            console.log(nis);

            const config = {
                'Content-Type': 'application/json',
                'Authorization': process.env.NEXT_PUBLIC_API_KEY,
            };

            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/nis`,{
                headers: config,
                params: { nis: nis }
            })
            .then(response => {
                console.log(name);
                if (hasItems(response.data.data) && response.data.data[0].nama == name.toUpperCase()) {
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/voter/nis`,{
                        headers: config,
                        params: { nis: nis }
                    })
                    .then(response => {
                        if (!hasItems(response.data.data)) {
                            router.push('/pemilihan')
                        } else {
                            alert('Anda sudah melakukan voting');
                        }
                    })
                    .catch(err => {
                        console.log('Something went wrong : ', err)
                    })
                } else {
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/nip`, {
                        headers: config,
                        params: { nip: nis }
                    })
                    .then(response => {
                        if (hasItems(response.data.data) && response.data.data[0].name == name.toUpperCase()) {
                            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/voter/nip`,{
                                headers: config,
                                params: { nip: nis }
                            })
                            .then(response => {
                                if (!hasItems(response.data.data)) {
                                    router.push('/pemilihan')
                                } else {
                                    alert('Anda sudah melakukan voting');
                                }
                            })
                            .catch(err => {
                                console.log('Something went wrong : ', err)
                            })
                        } else {
                            alert('Gagal Login, Nama, Nis / Nip salah');
                        }
                    })
                    .catch(err => {
                        console.log('Something went wrong : ', err)
                    })
                }
            })
            .catch(err => {
                console.log('Something went wrong : ', err)
            })

        }
    }

    useEffect(() => {
        
        const token = sessionStorage.getItem('jwt');
        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;

        if (Date.now() < exp) {
        } else {
            sessionStorage.removeItem('jwt');
        }
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="w-full h-full p-10 grid gap-5">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name" className="font-poppins text-md">Nama</Label>
                    <Input type="text" id="user_name" placeholder="FADHIL NUGROHO" autoCapitalize="on" autoComplete="off" autoCorrect="off" spellCheck={false} className="h-12 uppercase" defaultValue={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value.toUpperCase())} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="nisOrNip" className="font-poppins text-md">Nis/Nip</Label>
                    <Input type="text" id="nisOrNip" placeholder="0000/0000.063" className="h-12" defaultValue={nis} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNis(e.target.value)} />
                </div>
                <Button onClick={handleLogin} variant="outline" className="text-white bg-[#011F4B] hover:cursor-pointer">Masuk</Button>
                <a className="decoration-0 text-blue-600 cursor-pointer" onClick={() => {
                    sessionStorage.removeItem('jwt');
                    alert('ok');
                }}>Reset JWT</a>
            </div>
        </div>
    )
}
