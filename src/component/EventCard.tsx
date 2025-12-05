import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Choice, EventNode } from "../game/type";

type CardProps = {
    // leftText: string,
    // rightText: string,
    currentEvent: EventNode,
    image: string,
    backgroundColor: string,
    onChooseLeftAnswer: (choice: Choice) => void,
    onChooseRightAnswer: (choice: Choice) => void;
    isHoldingCallback: (state: boolean, threshold: number) => void;
    threshold?: number;
};

export default function Card({
    // leftText,
    // rightText,
    currentEvent,
    image,
    backgroundColor,
    onChooseLeftAnswer,
    onChooseRightAnswer,
    isHoldingCallback
}: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    //const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const x = useMotionValue(0);

    const animatedX = useSpring(x, {
        stiffness: 150,
        damping: 20,
        mass: 0.5
    });

    const rotate = useTransform(animatedX, [-150, 150], [-10, 10]);
    const opacityLeft = useTransform(animatedX, [-110, -50], [1, 0]);
    const opacityRight = useTransform(animatedX, [10, 150], [0, 1]);
    //const DELAY = 150;
    const THRESHOLD = 190;

    const [isHolding, setIsHolding] = useState(false);


    useEffect(() => {
        isHoldingCallback(isHolding, THRESHOLD);
    }, [isHolding]);

    const handlePointerDown = () => {
        setIsHolding(true);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isHolding || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        const delta = e.clientX - centerX;

        // x.set(delta);
        animate(x, delta, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
        // if (timeoutRef.current) return;

        if (delta > THRESHOLD) {
            setIsHolding(false);
            onChooseRightAnswer(currentEvent.right);
            //timeoutRef.current = null;
        } else if (delta < -THRESHOLD) {
            setIsHolding(false);
            onChooseLeftAnswer(currentEvent.left);
            //timeoutRef.current = null;
        }
    };

    const handlePointerUp = () => {
        setIsHolding(false);
        animate(x, 0, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
        // if (timeoutRef.current) {
        //     clearTimeout(timeoutRef.current);
        //     timeoutRef.current = null;
        // }
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                width: 400,
                height: 400,
                borderRadius: 35,
                position: "relative",
                backgroundColor,
                overflow: "hidden",
                x: animatedX,
                rotate,
                touchAction: "none",
                userSelect: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={(e) => handlePointerMove(e)}
            // onDoubleClick={(e) => handleDoubleClick(e)}
            onPointerUp={handlePointerUp}
        //onPointerLeave={handlePointerUp}
        >
            <motion.div
                style={{
                    opacity: opacityLeft,
                    position: "absolute",
                    left: 10,
                    top: 10,
                    color: "white",
                    background: "rgba(0,0,0,0.4)",
                    padding: 10,
                    borderRadius: 8,
                }}
            >
                {/* {leftText} */}
                {currentEvent.left.text}
            </motion.div>

            <motion.div
                style={{
                    opacity: opacityRight,
                    position: "absolute",
                    right: 10,
                    top: 10,
                    color: "white",
                    background: "rgba(0,0,0,0.4)",
                    padding: 10,
                    borderRadius: 8,
                }}
            >
                {/* {rightText} */}
                {currentEvent.right.text}
            </motion.div>

            <img
                src={image}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
                draggable={false}
            />
        </motion.div>
    );
}
