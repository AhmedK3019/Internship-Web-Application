export const technicalSkillsQuestions = [
  {
    id: 1,
    text: "What is the virtual DOM in React?",
    options: [
      "A direct representation of the actual DOM",
      "A lightweight copy of the DOM that React uses for performance",
      "A browser API for manipulating the DOM",
      "A React component that renders other components"
    ],
    correctAnswer: 1,
    explanation: "The virtual DOM is a lightweight copy of the actual DOM that React maintains in memory to optimize performance by minimizing direct DOM manipulations."
  },
  {
    id: 2,
    text: "Which CSS property is used to create space between elements without affecting their size?",
    options: [
      "padding",
      "margin",
      "border",
      "outline"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What will be logged: console.log(1 + '2' + 3)?",
    options: [
      "6",
      "123",
      "15",
      "NaN"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Which algorithm has the best time complexity for sorting?",
    options: [
      "Bubble Sort - O(n²)",
      "Merge Sort - O(n log n)",
      "Insertion Sort - O(n²)",
      "Quick Sort - O(n²) in worst case"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "Always refers to the window object",
      "Refers to the object that the function is a property of",
      "Refers to the parent function",
      "Is always undefined in arrow functions"
    ],
    correctAnswer: 1
  }
];

export const behavioralQuestions = [
  {
    id: 1,
    text: "How would you handle a situation where a team member isn't completing their tasks on time?",
    options: [
      "Report them to management immediately",
      "Ignore it and do their work for them",
      "Have a private conversation to understand any challenges they're facing",
      "Publicly call them out in a team meeting"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "You disagree with your manager's approach to a project. What do you do?",
    options: [
      "Implement your own approach without telling anyone",
      "Express your concerns respectfully with alternative suggestions",
      "Complain to other team members about the manager",
      "Do nothing and follow the approach even if you think it will fail"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "How do you prioritize tasks when everything seems urgent?",
    options: [
      "Work on whatever your manager last asked about",
      "Ask stakeholders to clarify priorities and deadlines",
      "Work on the easiest tasks first",
      "Randomly select tasks to work on"
    ],
    correctAnswer: 1
  }
];

export const cognitiveQuestions = [
  {
    id: 1,
    text: "Which number comes next in the sequence: 2, 5, 10, 17, 26, ___?",
    options: [
      "35",
      "37",
      "36",
      "34"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "If all Bloops are Razzies and all Razzies are Lazzies, then:",
    options: [
      "All Bloops are definitely Lazzies",
      "All Lazzies are definitely Bloops",
      "Some Razzies may not be Bloops",
      "Bloops are not related to Lazzies"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    text: "Which shape is the odd one out?",
    options: [
      "Cube",
      "Sphere",
      "Tetrahedron",
      "Cylinder"
    ],
    correctAnswer: 1
  }
];