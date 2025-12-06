import { useGameState } from "../game/store";

type CharacterSelectProps = {
    onSelect: (role: "father" | "mother") => void;
};

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
    const setRole = useGameState(state => state.setRole);

    return (
        <div className="flex flex-col items-center justify-center h-screen 
                        bg-[#BDA867] px-4">

            <h2 className="text-4xl font-bold text-[#231402] mb-10">
                Chọn Nhân Vật
            </h2>

            <div className="flex gap-6">
                <button
                    onClick={() => {
                        onSelect("father");
                        setRole("father");
                    }}
                    className="w-48 bg-white rounded-xl shadow-md hover:shadow-xl 
                               transition p-4 flex flex-col items-center"
                >
                    <img
                        src="/assets/father.png"
                        alt="Cha"
                        className="w-32 h-32 object-cover rounded-lg mb-3"
                    />
                    <div className="text-xl font-semibold text-[#231402]">Cha</div>
                </button>

                <button
                    onClick={() => {
                        onSelect("mother");
                        setRole("mother");
                    }}
                    className="w-48 bg-white rounded-xl shadow-md hover:shadow-xl 
                               transition p-4 flex flex-col items-center"
                >
                    <img
                        src="/assets/mother.png"
                        alt="Mẹ"
                        className="w-32 h-32 object-cover rounded-lg mb-3"
                    />
                    <div className="text-xl font-semibold text-[#231402]">Mẹ</div>
                </button>
            </div>

            {/* <p className="mt-6 text-md italic text-[#231402]">
                Mỗi nhân vật sẽ có trải nghiệm khác nhau
            </p> */}
        </div>
    );
}
