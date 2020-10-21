import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [state, setState] = React.useReducer(
    (a: any, b: any) => ({ ...a, ...b }),
    { r: "", right: [], l: "", left: [], union: [] }
  );

  React.useEffect(() => {
    axios.get("/words").then(({ data }) => setState({ words: data }));
  }, []);

  const loadRelated = (w: string, l: string) => {
    const lr = l === "left" ? "l" : "r";
    axios.get(`/ml/${w}`).then(({ data }) => setState({ [l]: data, [lr]: w }));
  };

  React.useEffect(() => {
    const s = [...state.right, ...state.left].filter(
      (w) => state.left.includes(w) && state.right.includes(w) && w !== ""
    );
    console.log(s);
    setState({ union: Array.from(new Set(s)) });
  }, [state.right, state.left]);

  console.log(state);
  return (
    <div className="App">
      <div className="block">
        <div className="select">
          <select onChange={(e) => loadRelated(e.target.value, "left")}>
            <option>Select a word</option>
            {state.words &&
              state.words.map((w: string) => <option value={w}>{w}</option>)}
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => loadRelated(e.target.value, "right")}>
            <option>Select a word</option>
            {state.words &&
              state.words.map((w: string) => <option value={w}>{w}</option>)}
          </select>
        </div>
      </div>
      <div className="columns">
        <div className="column is-4">
          <div className="subtitle is-2">{state.l}</div>
          {state.left &&
            state.left.map((w: string, i: number) => <div key={i}>{w}</div>)}
        </div>
        <div className="column is-4">
          <div className="subtitle is-2">Common</div>
          {state.union &&
            state.union.map((w: string, i: number) => <div key={i}>{w}</div>)}
        </div>
        <div className="column is-4">
          <div className="subtitle is-2">{state.r}</div>
          {state.right &&
            state.right.map((w: string, i: number) => <div key={i}>{w}</div>)}
        </div>
      </div>
    </div>
  );
}

// <input value={"lause paikoillaan"} />
// <input value={"lause paikoillaan"} />
export default App;
