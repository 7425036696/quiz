  import { useEffect, useReducer } from "react";
  import "../index.css";
  import Header from "../Header.jsx";
  import Loader from "../Loader.jsx";
  import Error from "../Error.jsx";

  function App() {
    const initialState = {
      questions: [],
      status: "loading",
      points : 0,
      index: 0,
      selectedOption: null,
    };

    function reducer(state, action) {
      switch (action.type) {
        case "active":
          return { ...state, status: "active" };
        case "SET_QUESTIONS":
          return { ...state, questions: action.payload.questions, status: "loaded" };
        case "ERROR":
          return { ...state, status: "error" };
          case "select_option":
            const isCorrect = state.questions[state.index].correctOption === action.payload;
            const questionPoints = state.questions[state.index].points || 10; // Default 10 points
            return { 
              ...state, 
              selectedOption: action.payload, 
              points: isCorrect ? state.points + questionPoints : state.points 
            };
        case "next_question":
          return {
            ...state,
            index: state.index + 1,
            selectedOption: null, // Reset selected option
            status: "active", // Reset status
          };
        default:
          return state;
      }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
     
    dispatch({ type: "SET_QUESTIONS", payload: {
      "questions": [
        {
          "question": "Which is the most popular JavaScript framework?",
          "options": ["Angular", "React", "Svelte", "Vue"],
          "correctOption": 1,
          "points": 10
        },
        {
          "question": "Which company invented React?",
          "options": ["Google", "Apple", "Netflix", "Facebook"],
          "correctOption": 3,
          "points": 10
        },
        {
          "question": "What's the fundamental building block of React apps?",
          "options": ["Components", "Blocks", "Elements", "Effects"],
          "correctOption": 0,
          "points": 10
        },
        {
          "question": "What's the name of the syntax we use to describe the UI in React components?",
          "options": ["FBJ", "Babel", "JSX", "ES2015"],
          "correctOption": 2,
          "points": 10
        },
        {
          "question": "How does data flow naturally in React apps?",
          "options": [
            "From parents to children",
            "From children to parents",
            "Both ways",
            "The developers decides"
          ],
          "correctOption": 0,
          "points": 10
        },
        {
          "question": "How to pass data into a child component?",
          "options": ["State", "Props", "PropTypes", "Parameters"],
          "correctOption": 1,
          "points": 10
        },
        {
          "question": "When to use derived state?",
          "options": [
            "Whenever the state should not trigger a re-render",
            "Whenever the state can be synchronized with an effect",
            "Whenever the state should be accessible to all components",
            "Whenever the state can be computed from another state variable"
          ],
          "correctOption": 3,
          "points": 30
        },
        {
          "question": "What triggers a UI re-render in React?",
          "options": [
            "Running an effect",
            "Passing props",
            "Updating state",
            "Adding event listeners to DOM elements"
          ],
          "correctOption": 2,
          "points": 20
        },
        {
          "question": "When do we directly \"touch\" the DOM in React?",
          "options": [
            "When we need to listen to an event",
            "When we need to change the UI",
            "When we need to add styles",
            "Almost never"
          ],
          "correctOption": 3,
          "points": 20
        },
        {
          "question": "In what situation do we use a callback to update state?",
          "options": [
            "When updating the state will be slow",
            "When the updated state is very data-intensive",
            "When the state update should happen faster",
            "When the new state depends on the previous state"
          ],
          "correctOption": 3,
          "points": 30
        },
        {
          "question": "If we pass a function to useState, when will that function be called?",
          "options": [
            "On each re-render",
            "Each time we update the state",
            "Only on the initial render",
            "The first time we update the state"
          ],
          "correctOption": 2,
          "points": 30
        },
        {
          "question": "Which hook to use for an API request on the component's initial render?",
          "options": ["useState", "useEffect", "useRef", "useReducer"],
          "correctOption": 1,
          "points": 10
        },
        {
          "question": "Which variables should go into the useEffect dependency array?",
          "options": [
            "Usually none",
            "All our state variables",
            "All state and props referenced in the effect",
            "All variables needed for clean up"
          ],
          "correctOption": 2,
          "points": 30
        },
        {
          "question": "An effect will always run on the initial render.",
          "options": [
            "True",
            "It depends on the dependency array",
            "False",
            "In depends on the code in the effect"
          ],
          "correctOption": 0,
          "points": 30
        },
        {
          "question": "When will an effect run if it doesn't have a dependency array?",
          "options": [
            "Only when the component mounts",
            "Only when the component unmounts",
            "The first time the component re-renders",
            "Each time the component is re-rendered"
          ],
          "correctOption": 3,
          "points": 20
        }
      ]
    }
     })
    }, []);

    return (
      <>
        <Header />
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "loaded" && (
          <div className="start">
            <h1>Welcome to React Quiz</h1>
            <p>15 questions to test your React skills</p>
            <button onClick={() => dispatch({ type: "active" })}>Let's Start</button>
          </div>
        )}
        {state.status === "active" && state.questions.length > 0 && (
          <header className="progress">
          <progress max={state.questions.length} value={state.index}>
          </progress>
          <p>
            Questions {state.index + 1} / {state.questions.length}
          </p>
          <p>{state.points}/280</p>
          </header>
        )}

        {state.status === "active" && state.questions.length > 0 && (
          
          <div>
            <h1>Question {state.index + 1}</h1>
            <h2>{state.questions[state.index]?.question}</h2>
            <div className="options">
              {state.questions[state.index]?.options.map((option, index) => (
                <button
                  key={index}
                  className={`btn btn-option ${
                    state.selectedOption !== null
                      ? index === state.questions[state.index].correctOption
                        ? "correct"
                        : index === state.selectedOption
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                  disabled={state.selectedOption !== null}
                  onClick={() => dispatch({ type: "select_option", payload: index })}
                >
                  {option}
                </button>
              ))}
            </div>

            {state.selectedOption !== null && (
              <button onClick={() => dispatch({ type: "next_question" })}>Next Question</button>
            )}
          </div>
        )}
      </>
    );
  }

  export default App;
