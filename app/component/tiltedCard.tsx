'use client'

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

type cardProp = {
    paslon: string;
    photoW: number;
    photoH: number;
    name: string;
}

export default function TiltedCard(props: cardProp) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        ["10deg", "-10deg"]
    )

    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        ["-10deg", "10deg"]
    )

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return(
        <motion.div className={`relative grid place-content-center w-[371px] h-[518px] bg-[url('/card/Frame-Awal.webp')] bg-cover cursor-pointer`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
        }}>
            <div className={`relative grid place-content-center w-[371px] h-[381px] bg-[url('/card/round-transparent.webp')] bg-cover`} style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d"
            }}>
                <div className={`relative grid place-content-center w-[150px] h-[152px] bg-cover mb-70 mr-20`} style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                    backgroundImage: `url(/card/${props.paslon}.webp)`
                }}>
                    <div className={`relative grid place-content-center w-[${props.photoW}px] h-[${props.photoH}px] bg-center bg-no-repeat mt-60 ml-20`} style={{
                        transform: "translateZ(75px)",
                        transformStyle: "preserve-3d",
                        backgroundImage: `url(/card/${props.name}.webp)`
                    }}>
                        <div className={`relative grid place-content-center w-[371px] h-[517px] bg-[url('/card/frame-cover-transparent.webp')] bg-cover mt-10`} style={{
                            transform: "translateZ(75px)",
                            transformStyle: "preserve-3d"
                        }}>
                            <div className={`relative grid place-content-center w-[415px] h-[144px] bg-cover mt-36`} style={{
                                transform: "translateZ(75px)",
                                transformStyle: "preserve-3d",
                                backgroundImage: `url(/card/${props.name}_text.webp)`
                            }}>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
