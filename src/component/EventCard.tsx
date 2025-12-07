import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Choice, EventNode } from "../game/type";

type CardProps = {
    // leftText: string,
    // rightText: string,
    currentEvent: EventNode,
    image: string,
    backgroundColor: string,
    onChooseLeftAnswer: (choice: Choice | null) => void,
    onChooseRightAnswer: (choice: Choice | null) => void;
    isHoldingCallback: (state: boolean, threshold: number, currentEvent: EventNode) => void;
    threshold?: number;
    setCurrentlySelectedChoice: (choice: Choice | null) => void;
};

export default function Card({
    currentEvent,
    image,
    backgroundColor,
    onChooseLeftAnswer,
    onChooseRightAnswer,
    isHoldingCallback,
    setCurrentlySelectedChoice
}: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const lastPreviewRef = useRef<"left" | "right" | null>(null);
    //const currentNodeRef = useRef<EventNode | null>(null);
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

    const [threshold] = useState(160);


    const THRESHOLD = threshold;

    const [isHolding, setIsHolding] = useState(false);

    // useEffect(() => {
    //     x.set(0);
    //     lastPreviewRef.current = null;
    // }, [currentEvent]);


    useEffect(() => {
        isHoldingCallback(isHolding, THRESHOLD, currentEvent);
    }, [isHolding]);

    const handlePointerDown = () => {
        setIsHolding(true);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isHolding || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        const delta = e.clientX - centerX;

        animate(x, delta, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });

        if (delta > 10 && lastPreviewRef.current !== "right") {
            lastPreviewRef.current = "right";
            setCurrentlySelectedChoice(currentEvent.right);
        }
        else if (delta < -10 && lastPreviewRef.current !== "left") {
            lastPreviewRef.current = "left";
            setCurrentlySelectedChoice(currentEvent.left);
        }
        else if (Math.abs(delta) <= 10 && lastPreviewRef.current !== null) {
            lastPreviewRef.current = null;
            setCurrentlySelectedChoice(null);
        }

        if (delta > THRESHOLD) {
            setIsHolding(false);
            onChooseRightAnswer(currentEvent.right);

            animate(x, window.innerWidth * 1.2, {
                type: "tween",
                duration: 1,
                ease: "easeOut",
                onComplete: () => x.set(0)
            });
        } else if (delta < -THRESHOLD) {
            setIsHolding(false);
            onChooseLeftAnswer(currentEvent.left);
            animate(x, -window.innerWidth * 1.2, {
                type: "tween",
                duration: 1,
                ease: "easeOut",
                onComplete: () => x.set(0)
            });
        }
    };

    const handlePointerUp = () => {
        setIsHolding(false);
        animate(x, 0, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                width: "330px",
                height: "330px",
                //aspectRatio: "1",
                borderRadius: "clamp(20px, 5vw, 35px)",
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
                    fontSize: "clamp(12px, 3vw, 16px)",
                    maxWidth: "40%",
                }}
            >
                {/* {leftText} */}
                {currentEvent.left?.text}
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
                    fontSize: "clamp(12px, 3vw, 16px)",
                    maxWidth: "40%",
                }}
            >
                {/* {rightText} */}
                {currentEvent.right?.text}
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
