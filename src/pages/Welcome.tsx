import { use, useEffect, useState } from "react";
import { useGameState } from "../game/store";
import Card from "../component/EventCard";
// import KinhTeIcon from "../assests/rice.svg?react";
import KinhTeIcon from "../assets/rice.svg?react";

import DoanKetIcon from "../assets/hand.svg?react";
import AnNinhIcon from "../assets/shield.svg?react";
import NiemTinIcon from "../assets/star.svg?react";
import IconInd from "../component/IconIndicator";
import SvgFillMask from "../component/SvgFillMask";

import rice from "../assets/rice.svg?url";
import hand from "../assets/hand.svg?url";
import shield from "../assets/shield.svg?url";
import star from "../assets/star.svg?url";

const ICON_PATHS: Record<string, string> = {
    kinhTe: rice,
    doanKet: hand,
    anNinh: shield,
    niemTin: star,
};

const Welcome = () => {
    const { currentNode, applyChoice, stats, list } = useGameState();
    const [boundaryVisible, setBoundaryVisible] = useState(false);
    const [boundaryValue, setBoundaryValue] = useState(180);

    const IconIndicator = IconInd as React.FC<React.SVGProps<SVGSVGElement>>;

    if (!currentNode) return <div>Kết thúc game</div>;

    return (
        <main className="flex items-center justify-center h-full">
            <div className='flex-1 flex flex-col items-center gap-6 min-h-0 bg-[#BDA867] h-full pb-2'>
                <header className='flex flex-col items-center gap-9 w-full h-30 bg-[#231402]'>
                    <div className='flex w-full h-full items-center justify-evenly mb-1.5 bg-[#231402]'>
                        {Object.entries(stats).map(([key, value]) => {
                            const iconPath = ICON_PATHS[key];
                            return (
                                <div key={key} className="flex flex-col items-center px-2 mt-4">

                                    <SvgFillMask
                                        icon={iconPath}
                                        percent={(value / 10) * 100}
                                        baseColor="#3A2704"
                                        fillColor="#D8B65A"
                                        size={60}
                                    />

                                </div>
                            );
                        })}

                    </div>
                </header>
                <h1 className="">{currentNode.text}</h1>
                <div className='w-[450px] h-full flex flex-col flex-1'>
                    {/* <div className='flex-1 bg-red-300'> */}
                    {boundaryVisible && (
                        <div className="absolute inset-0 top-30 pointer-events-none">
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
                                    left: `calc(73% - ${boundaryValue}px)`,
                                    right: 0
                                }}
                            />
                        </div>
                    )}

                    <Card
                        image={currentNode.image as string}
                        backgroundColor="#ddd"
                        currentEvent={currentNode}
                        // leftText={currentNode.left.text}
                        // rightText={currentNode.right.text}
                        onChooseLeftAnswer={(choice) => applyChoice(choice)}
                        onChooseRightAnswer={(choice) => applyChoice(choice)}
                        isHoldingCallback={(isHolding: boolean, threshold: number) => {
                            setBoundaryVisible(isHolding);
                            setBoundaryValue(threshold);
                        }}
                    />
                    {/* </div> */}
                    {/* <div className='flex w-full flex-0 h-[450px] justify-between'>
                        <button onClick={() => applyChoice(currentNode.left)}>
                            {currentNode.left.text}
                        </button>

                        <button onClick={() => applyChoice(currentNode.right)}>
                            {currentNode.right.text}
                        </button>
                    </div> */}
                </div>
            </div >
        </main >
    );
};

export default Welcome;