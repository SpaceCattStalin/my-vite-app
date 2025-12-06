import { useEffect, useState } from "react";
import { useGameState } from "../game/store";
import Card from "../component/EventCard";
import SvgFillMask from "../component/SvgFillMask";

import rice from "../assets/rice.svg?url";
import hand from "../assets/hand.svg?url";
import shield from "../assets/shield.svg?url";
import star from "../assets/star.svg?url";
import IconIndicator from "../component/IconIndicator";
import type { Choice, EventNode } from '../game/type';

const ICON_PATHS: Record<string, string> = {
    kinhTe: rice,
    doanKet: hand,
    anNinh: shield,
    niemTin: star,
};

const ICON_TITLE: Record<string, string> = {
    kinhTe: "Kinh tế",
    doanKet: "Đoàn kết",
    anNinh: "An ninh",
    niemTin: "Niềm tin",
};


type Props = {
    setStage: (stage: "menu" | "select" | "game") => void;
};

const Welcome = ({ setStage }: Props) => {
    const { currentNode, applyChoice, stats, list, role, gameEnd, resetGame } = useGameState();
    const [boundaryVisible, setBoundaryVisible] = useState(false);
    const [boundaryValue, setBoundaryValue] = useState(180);
    const [currentEvent, setCurrentEvent] = useState<EventNode | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        if (gameEnd) {
            setShowDrawer(true);
        }
    }, [gameEnd]);

    //const IconIndicator = IconInd as React.FC<React.SVGProps<SVGSVGElement>>;
    const [previewStats, setPreviewStats] = useState<Record<string, number> | null>(null);

    if (!currentNode) return <div>Kết thúc game</div>;

    return (
        <main className="flex items-center justify-center h-full">
            <div className='flex-1 flex flex-col items-center gap-1 bg-[#BDA867] h-full pb-2'>

                {showDrawer && (
                    <div
                        className={`fixed bottom-6 right-6 
                        bg-[#231402] text-white 
                        px-5 py-5 rounded-xl shadow-2xl 
                        flex flex-col gap-3 z-50
                        transition-transform duration-500 ease-out
                        ${showDrawer ? "translate-x-0 opacity-100" : "translate-x-[150%] opacity-0"}
                    `}>
                        <div className="text-lg font-semibold">Trò chơi kết thúc</div>

                        <button
                            onClick={() => {
                                resetGame();
                                setShowDrawer(false);
                            }}
                            className="button-50 px-6 py-2 bg-[#D8B65A] text-black font-semibold rounded-md"
                        >
                            Chơi lại
                        </button>

                        <button
                            onClick={() => {
                                window.location.reload();
                            }}
                            className="button-50 px-6 py-2 bg-white text-black rounded-md"
                        >
                            Về Menu
                        </button>
                    </div>
                )}

                <header className='
                flex flex-col items-center gap-9 w-full bg-[#231402]
                '>
                    <div className="flex flex-wrap gap-36 w-full justify-center py-2 bg-[#231402]">
                        {Object.entries(stats).map(([key, value]) => {
                            const iconPath = ICON_PATHS[key];
                            const previewValue = previewStats?.[key] ?? 0;
                            const finalValue = previewStats ? previewValue : value;
                            return (
                                <div key={key} className="flex flex-col items-center">
                                    <div className="flex items-center px-2 mt-4">

                                        <SvgFillMask
                                            icon={iconPath}
                                            percent={(value / 10) * 100}
                                            baseColor="#3A2704"
                                            fillColor="#D8B65A"
                                            size={40}
                                        />

                                        <IconIndicator value={finalValue} />

                                    </div>

                                    <span className="text-white text-sm mt-1">
                                        {ICON_TITLE[key]}
                                    </span>
                                </div>
                            );
                        })}

                    </div>
                </header>

                <h1 className="text-md sm:text-2xl font-medium text-[#231402] text-center px-4">
                    {currentNode.text}
                </h1>

                {/* <div className='w-full max-w-[500px] h-full flex flex-col flex-1'> */}
                <div className='w-full max-w-[500px] px-4 h-full flex flex-col flex-1 items-center'>
                    {/* {boundaryVisible && (
                        <div className="absolute inset-0 top-18 pointer-events-none">
                            <div
                                className="absolute top-0 bottom-0 w-[2px] bg-gray-700"
                                style={{ left: `calc(50% - ${boundaryValue}px)` }}
                            />

                            <div
                                className="absolute top-0 bottom-0 w-[2px] bg-gray-700"
                                style={{ left: `calc(50% + ${boundaryValue}px)` }}
                            />
                            
                            <div
                                className="absolute top-0 bottom-0 bg-gray-700/20"
                                style={{
                                    left: 0,
                                    right: `calc(50% + ${boundaryValue}px)`
                                }}
                            />

                            <div
                                className="absolute top-0 bottom-0 bg-gray-700/20"
                                style={{
                                    left: `calc(70% - ${boundaryValue}px)`,
                                    right: 0
                                }}
                            />
                        </div>
                    )} */}

                    <Card
                        image={currentNode.image as string}
                        backgroundColor="#ddd"
                        currentEvent={currentNode}
                        // leftText={currentNode.left.text}
                        // rightText={currentNode.right.text}
                        onChooseLeftAnswer={(choice) => applyChoice(choice)}
                        onChooseRightAnswer={(choice) => applyChoice(choice)}
                        isHoldingCallback={(isHolding: boolean, threshold: number, currentEvent: EventNode) => {
                            setBoundaryVisible(isHolding);
                            setBoundaryValue(threshold);
                            setCurrentEvent(currentEvent);
                        }}
                        setCurrentlySelectedChoice={function (choice: Choice): void {
                            if (!choice) return;

                            const { effects } = choice;
                            if (effects) {
                                setPreviewStats(effects);
                            }
                        }} />
                </div>
            </div >
        </main >
    );
};

export default Welcome;