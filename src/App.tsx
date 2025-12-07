import { useState } from 'react';
import './App.css';
import Welcome from './pages/Welcome';
import Menu from './component/Menu';
import CharacterSelect from './component/CharacterSelect';

function App() {
  // const [stage, setStage] = useState<"menu" | "select" | "game">("menu");
  // const [setRole] = useState<"father" | "mother" | null>(null);
  const [stage, setStage] = useState<"menu" | "select" | "game">("menu");
  const [role, setRole] = useState<"father" | "mother" | null>(null);

  return (
    <>
      {/* {stage === "menu" && (
        <Menu onPlay={() => setStage("select")} />
      )}

      {stage === "select" && (
        <CharacterSelect
          onSelect={(picked) => {
            setRole(picked);
            setStage("game");
          }}
        />
      )}

      {stage === "game" && (
        <Welcome />
      )} */}
      {stage === "menu" && (
        <Menu onPlay={() => setStage("select")} />
      )}

      {stage === "select" && (
        <CharacterSelect
          onSelect={(picked) => {
            setRole(picked);
            setStage("game");
          }}
        />
      )}

      {stage === "game" && (
        <Welcome />
      )}
    </>
  );
}

export default App;
