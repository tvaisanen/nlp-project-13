import React from "react";
import axios from "axios";
import "./App.css";

const similarity = async () => axios.get("/data/stss131/similarity");
const sentences = async () => axios.get("/data/stss131/sentences");
const reducer = (a: any, b: any) => ({ ...a, ...b });
const init = { loading: true, selectedIndex: undefined };
const correlations = [0.72, 0.77, 0.66, 0.73, 0.64];

function App() {
  const [state, setState] = React.useReducer(reducer, init);

  React.useEffect(() => {
    sentences().then((res1) =>
      similarity().then((res2) =>
        setState({
          score: res2.data.data,
          labels: res2.data.labels,
          sentences: res1.data,
          loading: false,
          selectedIndex: 3,
        })
      )
    );
  }, []);

  React.useEffect(() => {
    if (state.sentences)
      setState({ selected: state.sentences[state.selectedIndex] });
  }, [state.selectedIndex]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="section">
        <p className="title is-1">Semantic Similarity Project 13</p>
        <div className="content">
          This application demonstrates semantic similarity calculations for
          STSS131 dataset sentence pairs.
        </div>
      </div>

      <div className="section">
        <Correlations labels={state.labels} />
      </div>
      <div className="section">
        <div className="select">
          <select
            value={state.selectedIndex}
            onChange={(e) => setState({ selectedIndex: e.target.value })}
          >
            <option value="-1">Select sentence pair</option>
            {state.sentences.map(
              ([s1, s2, score]: [string, string, number], i: number) => (
                <option key={i} value={i}>
                  Sentence pair {i}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      {state.selected && (
        <>
          <div className="section">
            <div className="columns">
              <div className="column is-half">
                <p className="subtitle is-6">Sentence 1</p>
                <p className="subtitle is-4">{state.selected[0]}</p>
              </div>
              <div className="column is-half">
                <p className="subtitle is-6">Sentence 2</p>
                <p className="subtitle is-4">{state.selected[1]}</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="block">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>STSS131 Human Judgement</th>
                      {state.labels.map((label: string) => (
                        <th>{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <td>{state.selected[2]}</td>
                    {state.score[state.selectedIndex]
                      .slice(1)
                      .map((s: string | number, i: number) => (
                        <td key={i}>{Number(s).toFixed(3)}</td>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

const Correlations: React.FC<{ labels: string[] }> = ({ labels }) => (
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {labels.map((label: string) => (
            <th>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <th>Correlation with human judgement (STSS131)</th>
        {correlations.map((corr) => (
          <td>{corr}</td>
        ))}
      </tbody>
    </table>
  </div>
);
