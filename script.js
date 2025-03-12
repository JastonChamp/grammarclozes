document.addEventListener('DOMContentLoaded', () => {
  // Full passage data
  const passages = {
    prepositions: [
      {
        text: "Sally placed her bag ___(1)___ the table. She looked ___(2)___ the window and saw a bird. The bird was perched ___(3)___ the fence. Her cat hid ___(4)___ a chair. Sally walked ___(5)___ the door quietly.",
        wordBox: ["in", "on", "under", "by", "through", "around", "towards"],
        answers: ["on", "through", "by", "under", "towards"],
        clueWords: ["table", "window"],
        hint: "Look at the objects before and after the blank. Where are they or how do they move?"
      },
      {
        text: "Tom sat ___(1)___ the sofa and watched TV. His mom was cooking ___(2)___ the kitchen. The dog slept ___(3)___ the rug. Tom’s sister played ___(4)___ the garden. Later, they ate dinner ___(5)___ the table.",
        wordBox: ["on", "in", "under", "by", "around", "at", "near"],
        answers: ["on", "in", "on", "in", "at"],
        clueWords: ["sofa", "kitchen"],
        hint: "Think about where things are located. Are they inside, on top, or close to something?"
      },
      {
        text: "The ball rolled ___(1)___ the hill and stopped ___(2)___ a tree. A squirrel ran ___(3)___ the tree and hid ___(4)___ the branches. The children played ___(5)___ the park all day.",
        wordBox: ["down", "up", "under", "by", "around", "near", "between"],
        answers: ["down", "by", "up", "in", "in"],
        clueWords: ["hill", "tree"],
        hint: "Consider the movement or position of the objects. Are they moving up, down, or staying near something?"
      },
      {
        text: "The teacher stood ___(1)___ the classroom. She wrote ___(2)___ the whiteboard. The students sat ___(3)___ their desks. A poster hung ___(4)___ the wall. The clock was ___(5)___ the door.",
        wordBox: ["in", "on", "under", "by", "near", "above", "below"],
        answers: ["in", "on", "at", "on", "above"],
        clueWords: ["classroom", "whiteboard"],
        hint: "Focus on the location of people and objects. Are they inside, on top, or above something?"
      },
      {
        text: "The fish swam ___(1)___ the pond. A frog jumped ___(2)___ a lily pad. The ducks floated ___(3)___ the water. A boy stood ___(4)___ the bridge and watched. His friend sat ___(5)___ the grass nearby.",
        wordBox: ["in", "on", "under", "by", "around", "near", "between"],
        answers: ["in", "on", "on", "on", "on"],
        clueWords: ["pond", "lily pad"],
        hint: "Think about where things are in relation to water or other objects. Are they in, on, or near something?"
      },
      {
        text: "The kite flew ___(1)___ the sky. The boy held the string ___(2)___ his hands. The wind blew ___(3)___ the trees. The kite soared ___(4)___ the clouds. His sister cheered ___(5)___ the ground.",
        wordBox: ["in", "on", "under", "by", "through", "above", "below"],
        answers: ["in", "in", "through", "above", "on"],
        clueWords: ["sky", "trees"],
        hint: "Think about where things are moving or positioned in the air or on the ground."
      },
      {
        text: "The book is ___(1)___ the shelf. A pen rolled ___(2)___ the desk. The bag is ___(3)___ the chair. The teacher walked ___(4)___ the room. A picture hangs ___(5)___ the wall.",
        wordBox: ["on", "under", "by", "around", "near", "above", "below"],
        answers: ["on", "under", "under", "around", "above"],
        clueWords: ["shelf", "desk"],
        hint: "Look at the position of objects. Are they on top, below, or moving around?"
      },
      {
        text: "The bus stopped ___(1)___ the bus stop. People waited ___(2)___ the shelter. The driver sat ___(3)___ the wheel. A girl looked ___(4)___ her phone. The bus moved ___(5)___ the road.",
        wordBox: ["at", "in", "on", "under", "by", "near", "along"],
        answers: ["at", "in", "at", "at", "along"],
        clueWords: ["bus stop", "shelter"],
        hint: "Think about where people or things are waiting, sitting, or moving."
      },
      {
        text: "The monkey climbed ___(1)___ the tree. It swung ___(2)___ the branches. A bird flew ___(3)___ its nest. The zookeeper stood ___(4)___ the cage. The children watched ___(5)___ the fence.",
        wordBox: ["up", "on", "under", "by", "around", "near", "to"],
        answers: ["up", "on", "to", "by", "near"],
        clueWords: ["tree", "branches"],
        hint: "Consider how things move or where they are in a zoo setting."
      },
      {
        text: "The plate is ___(1)___ the table. A spoon fell ___(2)___ the floor. The soup is ___(3)___ the bowl. Mother cooked ___(4)___ the stove. We ate ___(5)___ the dining room.",
        wordBox: ["on", "under", "in", "by", "around", "near", "at"],
        answers: ["on", "on", "in", "by", "in"],
        clueWords: ["table", "floor"],
        hint: "Think about where food and objects are placed or used."
      },
      {
        text: "The boy ran ___(1)___ the playground. He jumped ___(2)___ a bench. His friends waited ___(3)___ the slide. The ball rolled ___(4)___ the sandpit. They played ___(5)___ the sun set.",
        wordBox: ["in", "on", "under", "by", "around", "near", "until"],
        answers: ["in", "on", "by", "into", "until"],
        clueWords: ["playground", "bench"],
        hint: "Look at movement or waiting positions in a playground."
      },
      {
        text: "The rain fell ___(1)___ the roof. The cat slept ___(2)___ the mat. A puddle formed ___(3)___ the house. The girl stood ___(4)___ an umbrella. The dog ran ___(5)___ the rain.",
        wordBox: ["on", "under", "by", "around", "near", "through", "in"],
        answers: ["on", "on", "near", "under", "through"],
        clueWords: ["roof", "mat"],
        hint: "Think about where things are during rainy weather."
      },
      {
        text: "The flag is ___(1)___ the pole. The wind blew ___(2)___ the school. The students stood ___(3)___ the field. A bell rang ___(4)___ the building. They walked ___(5)___ their classrooms.",
        wordBox: ["on", "in", "under", "by", "around", "near", "to"],
        answers: ["on", "around", "on", "in", "to"],
        clueWords: ["pole", "school"],
        hint: "Focus on positions or movements in a school setting."
      },
      {
        text: "The boat floated ___(1)___ the river. A fish swam ___(2)___ the water. The man fished ___(3)___ the bank. A bird flew ___(4)___ the boat. The net was ___(5)___ the deck.",
        wordBox: ["on", "in", "under", "by", "around", "near", "above"],
        answers: ["on", "in", "by", "above", "on"],
        clueWords: ["river", "water"],
        hint: "Think about where things are near water or on a boat."
      },
      {
        text: "The plane flew ___(1)___ the clouds. The pilot sat ___(2)___ the cockpit. Passengers looked ___(3)___ the windows. The luggage was ___(4)___ the seats. The airport was ___(5)___ the city.",
        wordBox: ["in", "on", "under", "by", "through", "near", "below"],
        answers: ["through", "in", "through", "under", "near"],
        clueWords: ["clouds", "cockpit"],
        hint: "Consider positions or movements related to flying."
      },
      {
        text: "The ant crawled ___(1)___ the leaf. The leaf was ___(2)___ the ground. A worm moved ___(3)___ the soil. The boy looked ___(4)___ the ant closely. The tree stood ___(5)___ the garden.",
        wordBox: ["on", "in", "under", "by", "around", "near", "above"],
        answers: ["on", "on", "under", "at", "in"],
        clueWords: ["leaf", "ground"],
        hint: "Think about small creatures and their positions."
      },
      {
        text: "The shoes are ___(1)___ the mat. The mat is ___(2)___ the door. The boy walked ___(3)___ the house. His socks are ___(4)___ his feet. He sat ___(5)___ a chair.",
        wordBox: ["on", "in", "under", "by", "around", "near", "at"],
        answers: ["on", "by", "into", "on", "on"],
        clueWords: ["mat", "door"],
        hint: "Focus on where things are placed or how people move."
      },
      {
        text: "The stars shone ___(1)___ the sky. The moon was ___(2)___ the clouds. The boy looked ___(3)___ a telescope. His sister sat ___(4)___ him. They stayed ___(5)___ the balcony.",
        wordBox: ["in", "on", "under", "by", "around", "near", "above"],
        answers: ["in", "above", "through", "by", "on"],
        clueWords: ["sky", "clouds"],
        hint: "Think about positions at night or with stargazing."
      },
      {
        text: "The hawker cooked ___(1)___ the stall. The food was ___(2)___ the plates. People sat ___(3)___ the tables. A fan spun ___(4)___ the ceiling. The queue was ___(5)___ the counter.",
        wordBox: ["in", "on", "under", "by", "around", "near", "at"],
        answers: ["in", "on", "at", "under", "near"],
        clueWords: ["stall", "plates"],
        hint: "Consider a hawker centre and where things are placed."
      },
      {
        text: "The MRT runs ___(1)___ the tracks. People stand ___(2)___ the platform. The train stops ___(3)___ the station. A sign hangs ___(4)___ the entrance. We walked ___(5)___ the gate.",
        wordBox: ["on", "in", "under", "by", "around", "near", "to"],
        answers: ["on", "on", "at", "above", "to"],
        clueWords: ["tracks", "platform"],
        hint: "Think about positions or movements on public transport."
      }
    ],
    conjunctions: [
      {
        text: "Tom wanted to go outside ___(1)___ it was raining. He waited ___(2)___ the rain stopped ___(3)___ then ran to the park. He could play ___(4)___ read a book, ___(5)___ he chose to play.",
        wordBox: ["but", "and", "or", "until", "because", "so", "although"],
        answers: ["but", "until", "and", "or", "so"],
        clueWords: ["raining", "rain"],
        hint: "Think about how the sentences connect. Are they showing contrast, sequence, or choice?"
      },
      {
        text: "I like apples ___(1)___ bananas. My sister likes oranges ___(2)___ grapes. We both like strawberries ___(3)___ they are sweet. Sometimes we eat fruit ___(4)___ breakfast ___(5)___ for a snack.",
        wordBox: ["and", "but", "or", "because", "so", "although", "after"],
        answers: ["and", "and", "because", "for", "or"],
        clueWords: ["apples", "strawberries"],
        hint: "Look for words that connect similar ideas or show reasons."
      },
      {
        text: "The dog barked loudly ___(1)___ the cat meowed softly. They were hungry ___(2)___ they wanted food. The owner fed them ___(3)___ they stopped making noise. Later, the dog slept ___(4)___ the cat played. They are friends ___(5)___ they sometimes fight.",
        wordBox: ["and", "but", "or", "because", "so", "although", "after"],
        answers: ["and", "so", "and", "while", "although"],
        clueWords: ["dog", "cat"],
        hint: "Consider if the sentences are showing contrast, cause, or sequence."
      },
      {
        text: "I can go to the park ___(1)___ stay home. If I go to the park, I will play ___(2)___ my friends. If I stay home, I will read ___(3)___ watch TV. I think I will go ___(4)___ it is sunny. My mom said I can go ___(5)___ I finish my homework.",
        wordBox: ["or", "and", "but", "because", "so", "if", "unless"],
        answers: ["or", "with", "or", "because", "if"],
        clueWords: ["park", "sunny"],
        hint: "Think about choices, conditions, or reasons in the sentences."
      },
      {
        text: "The children were tired ___(1)___ they kept playing. They wanted to win ___(2)___ they tried hard. The coach cheered ___(3)___ they scored a goal. After the game, they were happy ___(4)___ exhausted. They celebrated ___(5)___ they went home.",
        wordBox: ["but", "and", "or", "because", "so", "although", "after"],
        answers: ["but", "so", "when", "but", "before"],
        clueWords: ["tired", "win"],
        hint: "Look for words that show contrast, cause, or time relationships."
      },
      {
        text: "The sky was dark ___(1)___ it might rain. I took an umbrella ___(2)___ I didn’t want to get wet. It started raining ___(3)___ I reached the bus stop. I waited there ___(4)___ the rain stopped. I was glad ___(5)___ I stayed dry.",
        wordBox: ["but", "and", "or", "because", "so", "until", "after"],
        answers: ["and", "because", "when", "until", "because"],
        clueWords: ["dark", "bus stop"],
        hint: "Think about reasons, timing, or adding ideas."
      },
      {
        text: "I wanted to eat rice ___(1)___ noodles. My brother chose noodles ___(2)___ he likes them more. We ate together ___(3)___ we shared the food. It was spicy ___(4)___ tasty. We drank water ___(5)___ we finished.",
        wordBox: ["or", "and", "but", "because", "so", "although", "after"],
        answers: ["or", "because", "and", "but", "after"],
        clueWords: ["rice", "noodles"],
        hint: "Look for choices, reasons, or sequence in eating."
      },
      {
        text: "The room was messy ___(1)___ we cleaned it. We worked fast ___(2)___ we wanted to play. Mom helped us ___(3)___ we finished quickly. We were tired ___(4)___ happy. We rested ___(5)___ everything was done.",
        wordBox: ["but", "and", "or", "because", "so", "after", "although"],
        answers: ["so", "because", "and", "but", "after"],
        clueWords: ["messy", "play"],
        hint: "Think about cause, adding ideas, or what happens next."
      },
      {
        text: "I can draw ___(1)___ paint today. I like painting ___(2)___ it is fun. I draw well ___(3)___ I need practice with paint. I will try both ___(4)___ I have time. My sister will join me ___(5)___ she likes art too.",
        wordBox: ["or", "and", "but", "because", "so", "if", "although"],
        answers: ["or", "because", "but", "because", "because"],
        clueWords: ["draw", "paint"],
        hint: "Look for choices, reasons, or contrasts in activities."
      },
      {
        text: "The movie was long ___(1)___ exciting. We watched it ___(2)___ we ate popcorn. It ended late ___(3)___ we stayed awake. We were sleepy ___(4)___ happy. We talked about it ___(5)___ we went to bed.",
        wordBox: ["but", "and", "or", "because", "so", "after", "although"],
        answers: ["but", "while", "but", "but", "before"],
        clueWords: ["long", "popcorn"],
        hint: "Think about contrast, timing, or feelings."
      },
      {
        text: "I wanted to swim ___(1)___ the pool was closed. I went to the park ___(2)___ I played there. It was hot ___(3)___ I brought water. I stayed ___(4)___ the sun set. I had fun ___(5)___ I was tired.",
        wordBox: ["but", "and", "or", "because", "so", "until", "although"],
        answers: ["but", "and", "so", "until", "although"],
        clueWords: ["pool", "hot"],
        hint: "Look for contrast, sequence, or reasons."
      },
      {
        text: "The cake was sweet ___(1)___ delicious. I wanted more ___(2)___ I was full. My friend ate some ___(3)___ she liked it too. We saved some ___(4)___ later. We smiled ___(5)___ we enjoyed it.",
        wordBox: ["and", "but", "or", "because", "so", "for", "after"],
        answers: ["and", "but", "because", "for", "because"],
        clueWords: ["sweet", "full"],
        hint: "Think about adding ideas, contrast, or reasons."
      },
      {
        text: "The bell rang ___(1)___ we went to class. We studied math ___(2)___ science. I like math ___(3)___ it is easy. Science is fun ___(4)___ challenging. We worked hard ___(5)___ we wanted good grades.",
        wordBox: ["and", "but", "or", "because", "so", "although", "after"],
        answers: ["and", "and", "because", "but", "because"],
        clueWords: ["bell", "math"],
        hint: "Look for sequence, adding ideas, or reasons."
      },
      {
        text: "I can read a book ___(1)___ play a game. I chose a book ___(2)___ I like stories. It was quiet ___(3)___ I could focus. My brother played ___(4)___ I read. We had fun ___(5)___ we did different things.",
        wordBox: ["or", "and", "but", "because", "so", "while", "although"],
        answers: ["or", "because", "so", "while", "although"],
        clueWords: ["book", "quiet"],
        hint: "Think about choices, reasons, or timing."
      },
      {
        text: "The kite flew high ___(1)___ the string broke. I ran to get it ___(2)___ it fell. My friend helped ___(3)___ we caught it. We fixed it ___(4)___ flew it again. We were happy ___(5)___ we saved it.",
        wordBox: ["but", "and", "or", "because", "so", "after", "although"],
        answers: ["but", "when", "and", "and", "because"],
        clueWords: ["kite", "string"],
        hint: "Look for contrast, timing, or adding ideas."
      },
      {
        text: "The baby cried ___(1)___ she was hungry. Mom fed her ___(2)___ she stopped crying. I watched TV ___(3)___ Mom was busy. The baby slept ___(4)___ her meal. We rested ___(5)___ the house was quiet.",
        wordBox: ["because", "and", "but", "so", "or", "after", "although"],
        answers: ["because", "so", "while", "after", "when"],
        clueWords: ["baby", "hungry"],
        hint: "Think about reasons, results, or timing."
      },
      {
        text: "I like soccer ___(1)___ basketball. I play soccer ___(2)___ it’s outdoors. Basketball is fun ___(3)___ I’m not tall. I practice both ___(4)___ I want to improve. My friends join me ___(5)___ we have time.",
        wordBox: ["or", "and", "but", "because", "so", "if", "although"],
        answers: ["and", "because", "but", "because", "when"],
        clueWords: ["soccer", "basketball"],
        hint: "Look for adding ideas, reasons, or contrast."
      },
      {
        text: "The lights were off ___(1)___ it was dark. I used a torch ___(2)___ I could see. The power came back ___(3)___ we cheered. We watched TV ___(4)___ it was late. We slept ___(5)___ the show ended.",
        wordBox: ["but", "and", "or", "because", "so", "after", "although"],
        answers: ["so", "so", "and", "although", "after"],
        clueWords: ["lights", "dark"],
        hint: "Think about results, reasons, or timing."
      },
      {
        text: "I wanted juice ___(1)___ milk. I picked juice ___(2)___ it was cold. My sister took milk ___(3)___ she likes it. We drank together ___(4)___ we ate snacks. It was fun ___(5)___ we shared.",
        wordBox: ["or", "and", "but", "because", "so", "while", "although"],
        answers: ["or", "because", "because", "while", "because"],
        clueWords: ["juice", "milk"],
        hint: "Look for choices, reasons, or timing."
      },
      {
        text: "The park was crowded ___(1)___ noisy. I played there ___(2)___ I had fun. It rained ___(3)___ we went home. We were wet ___(4)___ happy. We dried off ___(5)___ we got inside.",
        wordBox: ["and", "but", "or", "because", "so", "after", "although"],
        answers: ["and", "and", "so", "but", "after"],
        clueWords: ["park", "rained"],
        hint: "Think about adding ideas, results, or sequence."
      },
      {
        text: "I ___(1)___ to the park yesterday. My friends ___(2)___ there with me. We ___(3)___ games and ___(4)___ a picnic. The sun ___(5)___ brightly all day.",
        wordBox: ["go", "went", "was", "were", "play", "played", "have", "had", "shine", "shone"],
        answers: ["went", "were", "played", "had", "shone"],
        clueWords: ["yesterday", "park"],
        hint: "Look for time words like 'yesterday' to decide the tense."
      },
      {
        text: "She ___(1)___ her homework now. She ___(2)___ it last night. Her brother ___(3)___ TV while she works. They ___(4)___ dinner later. Yesterday, they ___(5)___ at a restaurant.",
        wordBox: ["do", "does", "did", "watch", "watches", "have", "had", "ate", "eat"],
        answers: ["does", "did", "watches", "have", "ate"],
        clueWords: ["now", "last night"],
        hint: "Check time words like 'now' or 'last night' to choose the tense."
      },
      {
        text: "The dog ___(1)___ in the yard every morning. Yesterday, it ___(2)___ a bone. It ___(3)___ happy when it found it. We ___(4)___ it play. Tomorrow, we ___(5)___ it again.",
        wordBox: ["run", "runs", "find", "found", "is", "was", "watch", "watched", "see", "will see"],
        answers: ["runs", "found", "was", "watched", "will see"],
        clueWords: ["every morning", "yesterday"],
        hint: "Look for time markers like 'yesterday' or 'tomorrow' to determine the tense."
      },
      {
        text: "We ___(1)___ to school every day. Last week, we ___(2)___ a school trip. The bus ___(3)___ us there. We ___(4)___ fun all day. Tomorrow, we ___(5)___ a test.",
        wordBox: ["go", "went", "take", "took", "have", "had", "write", "will write", "are"],
        answers: ["go", "went", "took", "had", "will write"],
        clueWords: ["every day", "last week"],
        hint: "Check the time words to decide if the action is past, present, or future."
      },
      {
        text: "He ___(1)___ his bike now. Yesterday, he ___(2)___ to the park. He ___(3)___ with his friends there. They ___(4)___ ice cream after playing. Tomorrow, he ___(5)___ again.",
        wordBox: ["ride", "rides", "go", "went", "play", "played", "eat", "ate", "will go"],
        answers: ["rides", "went", "played", "ate", "will go"],
        clueWords: ["now", "yesterday"],
        hint: "Look for time words like 'now' or 'yesterday' to choose the tense."
      },
      {
        text: "The teacher ___(1)___ the class every day. Last month, she ___(2)___ us a story. We ___(3)___ it very much. Now, we ___(4)___ a new book. Next week, we ___(5)___ a quiz.",
        wordBox: ["teach", "teaches", "tell", "told", "like", "liked", "read", "reads", "will have"],
        answers: ["teaches", "told", "liked", "read", "will have"],
        clueWords: ["every day", "last month"],
        hint: "Check the time words to decide the correct tense."
      },
      {
        text: "The birds ___(1)___ in the tree now. Yesterday, they ___(2)___ away. They ___(3)___ back today. We ___(4)___ them sing. Tomorrow, they ___(5)___ again.",
        wordBox: ["sing", "sings", "fly", "flew", "come", "came", "hear", "heard", "will sing"],
        answers: ["sing", "flew", "came", "hear", "will sing"],
        clueWords: ["now", "yesterday"],
        hint: "Look for time markers to determine the tense."
      },
      {
        text: "I ___(1)___ my room every weekend. Last weekend, I ___(2)___ it thoroughly. My mom ___(3)___ happy with me. She ___(4)___ me a treat. Next weekend, I ___(5)___ it again.",
        wordBox: ["clean", "cleans", "cleaned", "is", "was", "give", "gave", "will clean"],
        answers: ["clean", "cleaned", "was", "gave", "will clean"],
        clueWords: ["every weekend", "last weekend"],
        hint: "Check the time words to decide if it’s past, present, or future."
      },
      {
        text: "She ___(1)___ to school every day. Yesterday, she ___(2)___ late. Her teacher ___(3)___ her a note. She ___(4)___ it home. Tomorrow, she ___(5)___ early.",
        wordBox: ["go", "goes", "arrive", "arrived", "give", "gave", "take", "took", "will come"],
        answers: ["goes", "arrived", "gave", "took", "will come"],
        clueWords: ["every day", "yesterday"],
        hint: "Look for time words to select the appropriate tense."
      },
      {
        text: "The cat ___(1)___ on the mat now. Last night, it ___(2)___ a mouse. It ___(3)___ proud of itself. We ___(4)___ it yesterday. Tomorrow, we ___(5)___ it again.",
        wordBox: ["sit", "sits", "catch", "caught", "feel", "felt", "see", "saw", "will watch"],
        answers: ["sits", "caught", "felt", "saw", "will watch"],
        clueWords: ["now", "last night"],
        hint: "Check time indicators like 'now' or 'tomorrow' for the tense."
      },
      {
        text: "We ___(1)___ a movie every weekend. Last weekend, we ___(2)___ a comedy. It ___(3)___ us laugh. Now, we ___(4)___ a new one. Next week, we ___(5)___ another.",
        wordBox: ["watch", "watches", "see", "saw", "make", "made", "choose", "chose", "will watch"],
        answers: ["watch", "saw", "made", "choose", "will watch"],
        clueWords: ["every weekend", "last weekend"],
        hint: "Check time words to determine the tense."
      }
    ]
  };

  // Game state
  let currentPassage = null;
  let currentGrammarType = null;
  let currentPassageIndex = 0;
  let score = 0;
  let lives = 3;
  let hintsUsed = 0;

  // DOM elements
  const grammarSelect = document.getElementById('grammar-select');
  const passageText = document.getElementById('passage-text');
  const wordBox = document.getElementById('word-box');
  const scoreDisplay = document.getElementById('score');
  const livesDisplay = document.getElementById('lives');
  const hintButton = document.getElementById('hint-button');
  const hintDisplay = document.getElementById('hint');
  const feedbackDisplay = document.getElementById('feedback');
  const nextPassageButton = document.getElementById('next-passage');

  // Initialize the game
  function initGame() {
    score = 0;
    lives = 3;
    hintsUsed = 0;
    updateScoreAndLives();
    loadGrammarType();
  }

  // Load grammar type when selected
  function loadGrammarType() {
    currentGrammarType = grammarSelect.value;
    currentPassageIndex = 0;
    loadPassage();
  }

  // Load a passage based on grammar type and index
  function loadPassage() {
    if (!currentGrammarType || currentPassageIndex >= passages[currentGrammarType].length) {
      endGame();
      return;
    }

    currentPassage = passages[currentGrammarType][currentPassageIndex];
    displayPassage();
    displayWordBox();
    clearFeedback();
    hintDisplay.textContent = '';
  }

  // Display the passage with blanks and add dragover/drop event listeners
  function displayPassage() {
    let passageWithInputs = currentPassage.text.replace(/___(\d+)___/g, (match, num) => {
      return `<input type="text" class="blank" id="blank-${num}" data-blank="${num}" placeholder="___(${num})___">`;
    });
    passageText.innerHTML = passageWithInputs;

    // Add event listeners to inputs
    document.querySelectorAll('.blank').forEach(input => {
      input.addEventListener('input', checkAnswer);
      input.addEventListener('dragover', dragOver);
      input.addEventListener('drop', dropWord);
    });
  }

  // Display the word box and make each word draggable
  function displayWordBox() {
    wordBox.innerHTML = currentPassage.wordBox.map(word => `<span class="word" draggable="true">${word}</span>`).join(' | ');
    document.querySelectorAll('.word').forEach(word => {
      word.addEventListener('dragstart', dragStart);
    });
  }

  // Check the user's answers
  function checkAnswer(event) {
    const blankId = event.target.dataset.blank;
    const userAnswer = event.target.value.trim().toLowerCase();
    const correctAnswer = currentPassage.answers[parseInt(blankId) - 1].toLowerCase();

    if (userAnswer === correctAnswer) {
      event.target.classList.add('correct');
      event.target.disabled = true;
      score += 10;
      feedbackDisplay.textContent = "Correct! Well done!";
      feedbackDisplay.style.color = "green";

      // Check if all blanks are filled correctly
      const allCorrect = Array.from(document.querySelectorAll('.blank')).every(input => {
        return input.classList.contains('correct');
      });

      if (allCorrect) {
        nextPassageButton.style.display = 'block';
      }
    } else {
      event.target.classList.add('incorrect');
      lives--;
      feedbackDisplay.textContent = "Incorrect! Try again.";
      feedbackDisplay.style.color = "red";

      if (lives <= 0) {
        endGame();
      }
    }

    updateScoreAndLives();
  }

  // Update score and lives display
  function updateScoreAndLives() {
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
  }

  // Drag and Drop functions
  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.textContent);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function dropWord(event) {
    event.preventDefault();
    const droppedWord = event.dataTransfer.getData("text/plain");
    event.target.value = droppedWord;
    // Manually trigger the input event to check answer
    event.target.dispatchEvent(new Event('input'));
  }

  // Show hint
  function showHint() {
    if (hintsUsed < 3) {
      hintDisplay.textContent = currentPassage.hint;
      hintsUsed++;
      hintButton.disabled = hintsUsed >= 3;
    }
  }

  // Clear feedback
  function clearFeedback() {
    feedbackDisplay.textContent = '';
    nextPassageButton.style.display = 'none';
  }

  // Load next passage
  function nextPassage() {
    currentPassageIndex++;
    loadPassage();
  }

  // End the game
  function endGame() {
    passageText.innerHTML = `<h2>Game Over!</h2><p>Your final score is ${score}.</p>`;
    wordBox.innerHTML = '';
    hintDisplay.textContent = '';
    feedbackDisplay.textContent = '';
    nextPassageButton.style.display = 'none';
    hintButton.disabled = true;
  }

  // Event listeners
  grammarSelect.addEventListener('change', loadGrammarType);
  hintButton.addEventListener('click', showHint);
  nextPassageButton.addEventListener('click', nextPassage);

  // Start the game
  initGame();
});
