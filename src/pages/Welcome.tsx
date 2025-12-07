import { useEffect, useState } from "react";
import { useGameState } from "../game/store";
import Card from "../component/EventCard";
import SvgFillMask from "../component/SvgFillMask";

// import rice from "../assets/rice.svg?url";
// import hand from "../assets/hand.svg?url";
// import shield from "../assets/shield.svg?url";
// import star from "../assets/star.svg?url";
import IconIndicator from "../component/IconIndicator";
import type { Choice, EventNode } from '../game/type';

const UTI_PATH = {
    back: '/assets/back.svg',
    question: '/assets/question.svg',
};

const ICON_PATHS: Record<string, string> = {
    kinhTe: '/assets/rice.svg',
    doanKet: '/assets/hand.svg',
    niemTin: '/assets/star.svg',
};

const ICON_TITLE: Record<string, string> = {
    kinhTe: 'Kinh tế',
    doanKet: 'Đoàn kết',
    niemTin: 'Niềm tin',
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
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        if (gameEnd) {
            setShowDrawer(true);
        }
    }, [gameEnd]);

    const [previewStats, setPreviewStats] = useState<Record<string, number> | null>(null);

    if (!currentNode) return <div>Kết thúc game</div>;

    return (
        <main className="flex items-center justify-center h-full">
            <div className="flex-1 flex flex-col items-center gap-1 bg-[#BDA867] h-full pb-2">
                {showHelp && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white w-[90%] p-6 rounded-2xl shadow-xl text-center flex flex-col gap-5">
                            <h2 className="text-xl font-semibold text-[#231402]">Hướng dẫn chơi</h2>

                            <div className="flex flex-col items-center gap-3">
                                <img
                                    src="/assets/tur1.png"
                                    alt="tutorial 1"
                                    className="w-full max-w-[400px] h-auto cursor-pointer"
                                />

                                <img
                                    src="/assets/tur2.png"
                                    alt="tutorial 1"
                                    className="w-full max-w-[400px] h-auto cursor-pointer"
                                />
                                <img
                                    src="/assets/tur3.png"
                                    alt="tutorial 1"
                                    className="w-full max-w-[400px] h-auto cursor-pointer"
                                />
                            </div>

                            <div className="flex flex-col gap-2 text-[#3A2704] text-sm leading-relaxed text-left">
                                <div>➤ Mách nhẹ: lúc kéo thẻ có thể phản hồi hơi chậm một chút nhé.</div>
                                <div>➤ Cố gắng giữ cân bằng đến hết 20 sự kiện nhé!</div>
                            </div>

                            <button
                                className="button-50 bg-[#D8B65A] text-black px-4 py-2 rounded-md font-medium"
                                onClick={() => setShowHelp(false)}
                            >
                                Đã hiểu
                            </button>
                        </div>
                    </div>
                )}

                {showDrawer && (
                    <div
                        className={`fixed bottom-6 right-6 
                        bg-[#231402] text-white 
                        px-5 py-5 rounded-xl shadow-2xl 
                        flex flex-col gap-3 z-50
                        transition-transform duration-500 ease-out
                        ${showDrawer ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}
                    `}
                    >
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
                            // onClick={() => {
                            //     resetGame();
                            //     router.push('/card_menu');
                            // }}
                            onClick={() => {
                                window.location.reload();
                            }}
                            className="button-50 px-6 py-2 bg-white text-black rounded-md"
                        >
                            Về Menu
                        </button>
                    </div>
                )}

                <header
                    className="
                flex flex-col items-center gap-9 w-full bg-[#231402]
                "
                >
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

                                    <span className="text-white text-sm mt-1">{ICON_TITLE[key]}</span>
                                </div>
                            );
                        })}
                    </div>
                </header>
                <div className="absolute top-3 right-3 py-2 flex gap-2">
                    {Object.entries(UTI_PATH).map(([key, path]) => (
                        <SvgFillMask
                            key={key}
                            icon={path}
                            percent={100}
                            baseColor="#3A2704"
                            fillColor="#D8B65A"
                            size={20}
                            onClick={() => {
                                if (key === 'back') {
                                    resetGame();
                                    window.location.reload();
                                }

                                if (key === 'question') {
                                    setShowHelp(true);
                                }
                            }}
                        />
                    ))}
                </div>

                <h1 className="text-md font-medium text-[#231402] text-center px-4">{currentNode.text}</h1>

                <div className="w-full max-w-[500px] px-4 h-full flex flex-col flex-1 items-center">
                    <Card
                        image={currentNode.image as string}
                        backgroundColor="#ddd"
                        currentEvent={currentNode}
                        onChooseLeftAnswer={(choice) => applyChoice(choice)}
                        onChooseRightAnswer={(choice) => applyChoice(choice)}
                        isHoldingCallback={(isHolding: boolean, threshold: number, currentEvent: EventNode) => {
                            setBoundaryVisible(isHolding);
                            setBoundaryValue(threshold);
                            setCurrentEvent(currentEvent);
                        }}
                        setCurrentlySelectedChoice={function (choice: Choice | null): void {
                            if (!choice) return;

                            const { effects } = choice;
                            if (effects) {
                                setPreviewStats(effects);
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    );
};

export default Welcome;