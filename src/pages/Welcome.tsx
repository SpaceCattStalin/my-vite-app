import { useEffect } from "react";
import { useGameState } from "../game/store";

const Welcome = () => {
    const { currentNode, applyChoice, stats, list } = useGameState();

    useEffect(() => {
        console.log("currentNode changed:", currentNode);
        console.log(list)
    }, [currentNode]);

    useEffect(() => {
        console.log(list)
    }, [])

    if (!currentNode) return <div>Kết thúc game</div>

    return (
        <main className="flex items-center justify-center h-full">
            <div className='flex-1 flex flex-col items-center gap-6 min-h-0 bg-[#BDA867] h-full pb-2'>
                <header className='flex flex-col items-center gap-9 w-full h-20 bg-[#231402]'>
                    <div className='flex w-full h-10 justify-evenly mb-1.5 bg-[#231402]'>
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key}>
                                {key} : {value}
                            </div>
                        ))}
                    </div>
                </header>
                <h1 className="">{currentNode.text}</h1>
                <div className='w-[450px] h-full flex flex-col flex-1'>
                    <div className='flex-1 bg-red-300'>
                    </div>
                    <div className='flex w-full flex-0 h-[450px] justify-between'>
                        <button onClick={() => applyChoice(currentNode.left)}>
                            {currentNode.left.text}
                        </button>

                        <button onClick={() => applyChoice(currentNode.right)}>
                            {currentNode.right.text}
                        </button>
                    </div>
                </div>
            </div >
        </main >
    );
}

export default Welcome;