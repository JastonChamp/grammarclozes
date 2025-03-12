document.addEventListener('DOMContentLoaded', () => {
  const grammarTypeSelect = document.getElementById('grammar-type-select');
  const passageTitle = document.getElementById('passage-title');
  const passageText = document.getElementById('passage-text');
  const wordBox = document.getElementById('word-box');
  const hintBtn = document.getElementById('hint-btn');
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('feedback');
  const progressTracker = document.getElementById('progress-tracker');

  let currentGrammarType = 'prepositions';
  let currentPassageIndex = 0;
  let completedPassages = 0;
  let totalPassages = 20; // For each grammar type

  const passages = {
  prepositions: [
    {
      text: "Sally placed her bag ___(1)___ the table. She looked ___(2)___ the window and saw a bird. The bird was perched ___(3)___ the fence. Her cat hid ___(4)___ a chair. Sally walked ___(5)___ the door quietly.",
      wordBox: ["in", "on", "under", "by", "through", "around", "towards"],
      answers: ["on", "through", "by", "under", "towards"],
      hint: "Look at the objects before and after the blank. Where are they or how do they move?"
    },
    {
      text: "Tom sat ___(1)___ the sofa and watched TV. His mom was cooking ___(2)___ the kitchen. The dog slept ___(3)___ the rug. Tom’s sister played ___(4)___ the garden. Later, they ate dinner ___(5)___ the table.",
      wordBox: ["on", "in", "under", "by", "around", "at", "near"],
      answers: ["on", "in", "on", "in", "at"],
      hint: "Think about where things are located. Are they inside, on top, or close to something?"
    },
    {
      text: "The ball rolled ___(1)___ the hill and stopped ___(2)___ a tree. A squirrel ran ___(3)___ the tree and hid ___(4)___ the branches. The children played ___(5)___ the park all day.",
      wordBox: ["down", "up", "under", "by", "around", "near", "between"],
      answers: ["down", "by", "up", "in", "in"],
      hint: "Consider the movement or position of the objects. Are they moving up, down, or staying near something?"
    },
    {
      text: "The teacher stood ___(1)___ the classroom. She wrote ___(2)___ the whiteboard. The students sat ___(3)___ their desks. A poster hung ___(4)___ the wall. The clock was ___(5)___ the door.",
      wordBox: ["in", "on", "under", "by", "near", "above", "below"],
      answers: ["in", "on", "at", "on", "above"],
      hint: "Focus on the location of people and objects. Are they inside, on top, or above something?"
    },
    {
      text: "The fish swam ___(1)___ the pond. A frog jumped ___(2)___ a lily pad. The ducks floated ___(3)___ the water. A boy stood ___(4)___ the bridge and watched. His friend sat ___(5)___ the grass nearby.",
      wordBox: ["in", "on", "under", "by", "around", "near", "between"],
      answers: ["in", "on", "on", "on", "on"],
      hint: "Think about where things are in relation to water or other objects. Are they in, on, or near something?"
    },
    {
      text: "The kite flew ___(1)___ the sky. The boy held the string ___(2)___ his hands. The wind blew ___(3)___ the trees. The kite soared ___(4)___ the clouds. His sister cheered ___(5)___ the ground.",
      wordBox: ["in", "on", "under", "by", "through", "above", "below"],
      answers: ["in", "in", "through", "above", "on"],
      hint: "Think about where things are moving or positioned in the air or on the ground."
    },
    {
      text: "The book is ___(1)___ the shelf. A pen rolled ___(2)___ the desk. The bag is ___(3)___ the chair. The teacher walked ___(4)___ the room. A picture hangs ___(5)___ the wall.",
      wordBox: ["on", "under", "by", "around", "near", "above", "below"],
      answers: ["on", "under", "under", "around", "above"],
      hint: "Look at the position of objects. Are they on top, below, or moving around?"
    },
    {
      text: "The bus stopped ___(1)___ the bus stop. People waited ___(2)___ the shelter. The driver sat ___(3)___ the wheel. A girl looked ___(4)___ her phone. The bus moved ___(5)___ the road.",
      wordBox: ["at", "in", "on", "under", "by", "near", "along"],
      answers: ["at", "in", "at", "at", "along"],
      hint: "Think about where people or things are waiting, sitting, or moving."
    },
    {
      text: "The monkey climbed ___(1)___ the tree. It swung ___(2)___ the branches. A bird flew ___(3)___ its nest. The zookeeper stood ___(4)___ the cage. The children watched ___(5)___ the fence.",
      wordBox: ["up", "on", "under", "by", "around", "near", "to"],
      answers: ["up", "on", "to", "by", "near"],
      hint: "Consider how things move or where they are in a zoo setting."
    },
    {
      text: "The plate is ___(1)___ the table. A spoon fell ___(2)___ the floor. The soup is ___(3)___ the bowl. Mother cooked ___(4)___ the stove. We ate ___(5)___ the dining room.",
      wordBox: ["on", "under", "in", "by", "around", "near", "at"],
      answers: ["on", "on", "in", "by", "in"],
      hint: "Think about where food and objects are placed or used."
    },
    {
      text: "The boy ran ___(1)___ the playground. He jumped ___(2)___ a bench. His friends waited ___(3)___ the slide. The ball rolled ___(4)___ the sandpit. They played ___(5)___ the sun set.",
      wordBox: ["in", "on", "under", "by", "around", "near", "until"],
      answers: ["in", "on", "by", "into", "until"],
      hint: "Look at movement or waiting positions in a playground."
    },
    {
      text: "The rain fell ___(1)___ the roof. The cat slept ___(2)___ the mat. A puddle formed ___(3)___ the house. The girl stood ___(4)___ an umbrella. The dog ran ___(5)___ the rain.",
      wordBox: ["on", "under", "by", "around", "near", "through", "in"],
      answers: ["on", "on", "near", "under", "through"],
      hint: "Think about where things are during rainy weather."
    },
    {
      text: "The flag is ___(1)___ the pole. The wind blew ___(2)___ the school. The students stood ___(3)___ the field. A bell rang ___(4)___ the building. They walked ___(5)___ their classrooms.",
      wordBox: ["on", "in", "under", "by", "around", "near", "to"],
      answers: ["on", "around", "on", "in", "to"],
      hint: "Focus on positions or movements in a school setting."
    },
    {
      text: "The boat floated ___(1)___ the river. A fish swam ___(2)___ the water. The man fished ___(3)___ the bank. A bird flew ___(4)___ the boat. The net was ___(5)___ the deck.",
      wordBox: ["on", "in", "under", "by", "around", "near", "above"],
      answers: ["on", "in", "by", "above", "on"],
      hint: "Think about where things are near water or on a boat."
    },
    {
      text: "The plane flew ___(1)___ the clouds. The pilot sat ___(2)___ the cockpit. Passengers looked ___(3)___ the windows. The luggage was ___(4)___ the seats. The airport was ___(5)___ the city.",
      wordBox: ["in", "on", "under", "by", "through", "near", "below"],
      answers: ["through", "in", "through", "under", "near"],
      hint: "Consider positions or movements related to flying."
    },
    {
      text: "The ant crawled ___(1)___ the leaf. The leaf was ___(2)___ the ground. A worm moved ___(3)___ the soil. The boy looked ___(4)___ the ant closely. The tree stood ___(5)___ the garden.",
      wordBox: ["on", "in", "under", "by", "around", "near", "above"],
      answers: ["on", "on", "under", "at", "in"],
      hint: "Think about small creatures and their positions."
    },
    {
      text: "The shoes are ___(1)___ the mat. The mat is ___(2)___ the door. The boy walked ___(3)___ the house. His socks are ___(4)___ his feet. He sat ___(5)___ a chair.",
      wordBox: ["on", "in", "under", "by", "around", "near", "at"],
      answers: ["on", "by", "into", "on", "on"],
      hint: "Focus on where things are placed or how people move."
    },
    {
      text: "The stars shone ___(1)___ the sky. The moon was ___(2)___ the clouds. The boy looked ___(3)___ a telescope. His sister sat ___(4)___ him. They stayed ___(5)___ the balcony.",
      wordBox: ["in", "on", "under", "by", "around", "near", "above"],
      answers: ["in", "above", "through", "by", "on"],
      hint: "Think about positions at night or with stargazing."
    },
    {
      text: "The hawker cooked ___(1)___ the stall. The food was ___(2)___ the plates. People sat ___(3)___ the tables. A fan spun ___(4)___ the ceiling. The queue was ___(5)___ the counter.",
      wordBox: ["in", "on", "under", "by", "around", "near", "at"],
      answers: ["in", "on", "at", "under", "near"],
      hint: "Consider a hawker centre and where things are placed."
    },
    {
      text: "The MRT runs ___(1)___ the tracks. People stand ___(2)___ the platform. The train stops ___(3)___ the station. A sign hangs ___(4)___ the entrance. We walked ___(5)___ the gate.",
      wordBox: ["on", "in", "under", "by", "around", "near", "to"],
      answers: ["on", "on", "at", "above", "to"],
      hint: "Think about positions or movements on public transport."
    }
  ],
  conjunctions: [
    {
      text: "Tom wanted to go outside ___(1)___ it was raining. He waited ___(2)___ the rain stopped ___(3)___ then ran to the park. He could play ___(4)___ read a book, ___(5)___ he chose to play.",
      wordBox: ["but", "and", "or", "until", "because", "so", "although"],
      answers: ["but", "until", "and", "or", "so"],
      hint: "Think about how the sentences connect. Are they showing contrast, sequence, or choice?"
    },
    {
      text: "I like apples ___(1)___ bananas. My sister likes oranges ___(2)___ grapes. We both like strawberries ___(3)___ they are sweet. Sometimes we eat fruit ___(4)___ breakfast ___(5)___ for a snack.",
      wordBox: ["and", "but", "or", "because", "so", "although", "after"],
      answers: ["and", "and", "because", "for", "or"],
      hint: "Look for words that connect similar ideas or show reasons."
    },
    {
      text: "The dog barked loudly ___(1)___ the cat meowed softly. They were hungry ___(2)___ they wanted food. The owner fed them ___(3)___ they stopped making noise. Later, the dog slept ___(4)___ the cat played. They are friends ___(5)___ they sometimes fight.",
      wordBox: ["and", "but", "or", "because", "so", "although", "after"],
      answers: ["and", "so", "and", "while", "although"],
      hint: "Consider if the sentences are showing contrast, cause, or sequence."
    },
    {
      text: "I can go to the park ___(1)___ stay home. If I go to the park, I will play ___(2)___ my friends. If I stay home, I will read ___(3)___ watch TV. I think I will go ___(4)___ it is sunny. My mom said I can go ___(5)___ I finish my homework.",
      wordBox: ["or", "and", "but", "because", "so", "if", "unless"],
      answers: ["or", "with", "or", "because", "if"],
      hint: "Think about choices, conditions, or reasons in the sentences."
    },
    {
      text: "The children were tired ___(1)___ they kept playing. They wanted to win ___(2)___ they tried hard. The coach cheered ___(3)___ they scored a goal. After the game, they were happy ___(4)___ exhausted. They celebrated ___(5)___ they went home.",
      wordBox: ["but", "and", "or", "because", "so", "although", "after"],
      answers: ["but", "so", "when", "but", "before"],
      hint: "Look for words that show contrast, cause, or time relationships."
    },
    {
      text: "The sky was dark ___(1)___ it might rain. I took an umbrella ___(2)___ I didn’t want to get wet. It started raining ___(3)___ I reached the bus stop. I waited there ___(4)___ the rain stopped. I was glad ___(5)___ I stayed dry.",
      wordBox: ["but", "and", "or", "because", "so", "until", "after"],
      answers: ["and", "because", "when", "until", "because"],
      hint: "Think about reasons, timing, or adding ideas."
    },
    {
      text: "I wanted to eat rice ___(1)___ noodles. My brother chose noodles ___(2)___ he likes them more. We ate together ___(3)___ we shared the food. It was spicy ___(4)___ tasty. We drank water ___(5)___ we finished.",
      wordBox: ["or", "and", "but", "because", "so", "although", "after"],
      answers: ["or", "because", "and", "but", "after"],
      hint: "Look for choices, reasons, or sequence in eating."
    },
    {
      text: "The room was messy ___(1)___ we cleaned it. We worked fast ___(2)___ we wanted to play. Mom helped us ___(3)___ we finished quickly. We were tired ___(4)___ happy. We rested ___(5)___ everything was done.",
      wordBox: ["but", "and", "or", "because", "so", "after", "although"],
      answers: ["so", "because", "and", "but", "after"],
      hint: "Think about cause, adding ideas, or what happens next."
    },
    {
      text: "I can draw ___(1)___ paint today. I like painting ___(2)___ it is fun. I draw well ___(3)___ I need practice with paint. I will try both ___(4)___ I have time. My sister will join me ___(5)___ she likes art too.",
      wordBox: ["or", "and", "but", "because", "so", "if", "although"],
      answers: ["or", "because", "but", "because", "because"],
      hint: "Look for choices, reasons, or contrasts in activities."
    },
    {
      text: "The movie was long ___(1)___ exciting. We watched it ___(2)___ we ate popcorn. It ended late ___(3)___ we stayed awake. We were sleepy ___(4)___ happy. We talked about it ___(5)___ we went to bed.",
      wordBox: ["but", "and", "or", "because", "so", "after", "although"],
      answers: ["but", "while", "but", "but", "before"],
      hint: "Think about contrast, timing, or feelings."
    },
    {
      text: "I wanted to swim ___(1)___ the pool was closed. I went to the park ___(2)___ I played there. It was hot ___(3)___ I brought water. I stayed ___(4)___ the sun set. I had fun ___(5)___ I was tired.",
      wordBox: ["but", "and", "or", "because", "so", "until", "although"],
      answers: ["but", "and", "so", "until", "although"],
      hint: "Look for contrast, sequence, or reasons."
    },
    {
      text: "The cake was sweet ___(1)___ delicious. I wanted more ___(2)___ I was full. My friend ate some ___(3)___ she liked it too. We saved some ___(4)___ later. We smiled ___(5)___ we enjoyed it.",
      wordBox: ["and", "but", "or", "because", "so", "for", "after"],
      answers: ["and", "but", "because", "for", "because"],
      hint: "Think about adding ideas, contrast, or reasons."
    },
    {
      text: "The bell rang ___(1)___ we went to class. We studied math ___(2)___ science. I like math ___(3)___ it is easy. Science is fun ___(4)___ challenging. We worked hard ___(5)___ we wanted good grades.",
      wordBox: ["and", "but", "or", "because", "so", "although", "after"],
      answers: ["and", "and", "because", "but", "because"],
      hint: "Look for sequence, adding ideas, or reasons."
    },
    {
      text: "I can read a book ___(1)___ play a game. I chose a book ___(2)___ I like stories. It was quiet ___(3)___ I could focus. My brother played ___(4)___ I read. We had fun ___(5)___ we did different things.",
      wordBox: ["or", "and", "but", "because", "so", "while", "although"],
      answers: ["or", "because", "so", "while", "although"],
      hint: "Think about choices, reasons, or timing."
    },
    {
      text: "The kite flew high ___(1)___ the string broke. I ran to get it ___(2)___ it fell. My friend helped ___(3)___ we caught it. We fixed it ___(4)___ flew it again. We were happy ___(5)___ we saved it.",
      wordBox: ["but", "and", "or", "because", "so", "after", "although"],
      answers: ["but", "when", "and", "and", "because"],
      hint: "Look for contrast, timing, or adding ideas."
    },
    {
      text: "The baby cried ___(1)___ she was hungry. Mom fed her ___(2)___ she stopped crying. I watched TV ___(3)___ Mom was busy. The baby slept ___(4)___ her meal. We rested ___(5)___ the house was quiet.",
      wordBox: ["because", "and", "but", "so", "or", "after", "although"],
      answers: ["because", "so", "while", "after", "when"],
      hint: "Think about reasons, results, or timing."
    },
    {
      text: "I like soccer ___(1)___ basketball. I play soccer ___(2)___ it’s outdoors. Basketball is fun ___(3)___ I’m not tall. I practice both ___(4)___ I want to improve. My friends join me ___(5)___ we have time.",
      wordBox: ["or", "and", "but", "because", "so", "if", "although"],
      answers: ["and", "because", "but", "because", "when"],
      hint: "Look for adding ideas, reasons, or contrast."
    },
    {
      text: "The lights were off ___(1)___ it was dark. I used a torch ___(2)___ I could see. The power came back ___(3)___ we cheered. We watched TV ___(4)___ it was late. We slept ___(5)___ the show ended.",
      wordBox: ["but", "and", "or", "because", "so", "after", "although"],
      answers: ["so", "so", "and", "although", "after"],
      hint: "Think about results, reasons, or timing."
    },
    {
      text: "I wanted juice ___(1)___ milk. I picked juice ___(2)___ it was cold. My sister took milk ___(3)___ she likes it. We drank together ___(4)___ we ate snacks. It was fun ___(5)___ we shared.",
      wordBox: ["or", "and", "but", "because", "so", "while", "although"],
      answers: ["or", "because", "because", "while", "because"],
      hint: "Look for choices, reasons, or timing."
    },
    {
      text: "The park was crowded ___(1)___ noisy. I played there ___(2)___ I had fun. It rained ___(3)___ we went home. We were wet ___(4)___ happy. We dried off ___(5)___ we got inside.",
      wordBox: ["and", "but", "or", "because", "so", "after", "although"],
      answers: ["and", "and", "so", "but", "after"],
      hint: "Think about adding ideas, results, or sequence."
    }
  ],
  subjectVerbAgreement: [
    {
      text: "The dog ___(1)___ loudly every morning. The cats ___(2)___ quietly in the garden. Each child ___(3)___ a toy. The team ___(4)___ hard to win. Many birds ___(5)___ in the sky.",
      wordBox: ["bark", "barks", "sleep", "sleeps", "has", "have", "work", "works", "fly", "flies"],
      answers: ["barks", "sleep", "has", "works", "fly"],
      hint: "Check if the subject is singular or plural to match the verb."
    },
    {
      text: "My friend ___(1)___ to school every day. The students ___(2)___ their homework. Each teacher ___(3)___ a classroom. The books ___(4)___ on the shelf. The bird ___(5)___ in the tree.",
      wordBox: ["walk", "walks", "do", "does", "have", "has", "are", "is", "sing", "sings"],
      answers: ["walks", "do", "has", "are", "sings"],
      hint: "Look at the subject. Is it one person or thing, or more than one?"
    },
    {
      text: "The flowers ___(1)___ beautifully in the garden. Each flower ___(2)___ a different color. The bees ___(3)___ around the flowers. The gardener ___(4)___ the plants every day. Many insects ___(5)___ in the garden.",
      wordBox: ["bloom", "blooms", "have", "has", "buzz", "buzzes", "water", "waters", "live", "lives"],
      answers: ["bloom", "has", "buzz", "waters", "live"],
      hint: "Match the verb to the subject. Is it singular or plural?"
    },
    {
      text: "The car ___(1)___ fast on the road. The drivers ___(2)___ carefully. Each passenger ___(3)___ a seatbelt. The buses ___(4)___ slowly in traffic. The motorcycle ___(5)___ loudly.",
      wordBox: ["go", "goes", "drive", "drives", "wear", "wears", "move", "moves", "roar", "roars"],
      answers: ["goes", "drive", "wears", "move", "roars"],
      hint: "Check the subject. Does it need a singular or plural verb?"
    },
    {
      text: "The baby ___(1)___ in the crib. The parents ___(2)___ the baby. Each toy ___(3)___ a different sound. The children ___(4)___ with the toys. The dog ___(5)___ the children play.",
      wordBox: ["sleep", "sleeps", "watch", "watches", "make", "makes", "play", "plays", "watch", "watches"],
      answers: ["sleeps", "watch", "makes", "play", "watches"],
      hint: "Look at the subject. Is it one thing or many things?"
    },
    {
      text: "The kite ___(1)___ high in the sky. The children ___(2)___ the kite. Each boy ___(3)___ a turn. The clouds ___(4)___ across the sky. The wind ___(5)___ strongly.",
      wordBox: ["fly", "flies", "hold", "holds", "take", "takes", "move", "moves", "blow", "blows"],
      answers: ["flies", "hold", "takes", "move", "blows"],
      hint: "Check if the subject is one or many to pick the right verb."
    },
    {
      text: "The teacher ___(1)___ the class every day. The students ___(2)___ quietly. Each desk ___(3)___ a book. The pencils ___(4)___ on the table. The bell ___(5)___ at noon.",
      wordBox: ["teach", "teaches", "sit", "sits", "have", "has", "are", "is", "ring", "rings"],
      answers: ["teaches", "sit", "has", "are", "rings"],
      hint: "Look at the subject. Is it singular or plural?"
    },
    {
      text: "The fish ___(1)___ in the tank. The children ___(2)___ the fish. Each fish ___(3)___ a bright color. The bubbles ___(4)___ to the top. The cat ___(5)___ the tank closely.",
      wordBox: ["swim", "swims", "watch", "watches", "have", "has", "rise", "rises", "look", "looks"],
      answers: ["swims", "watch", "has", "rise", "looks"],
      hint: "Match the verb to the subject’s number—singular or plural."
    },
    {
      text: "The sun ___(1)___ in the morning. The birds ___(2)___ in the trees. Each cloud ___(3)___ a shape. The leaves ___(4)___ in the wind. The dog ___(5)___ in the yard.",
      wordBox: ["rise", "rises", "sing", "sings", "have", "has", "move", "moves", "play", "plays"],
      answers: ["rises", "sing", "has", "move", "plays"],
      hint: "Check the subject to see if it’s one or more than one."
    },
    {
      text: "The clock ___(1)___ every hour. The hands ___(2)___ around the face. Each minute ___(3)___ slowly. The children ___(4)___ for recess. The teacher ___(5)___ the time.",
      wordBox: ["tick", "ticks", "move", "moves", "pass", "passes", "wait", "waits", "check", "checks"],
      answers: ["ticks", "move", "passes", "wait", "checks"],
      hint: "Look at the subject. Does it need a singular or plural verb?"
    },
    {
      text: "The bus ___(1)___ at the stop. The passengers ___(2)___ quietly. Each driver ___(3)___ a route. The wheels ___(4)___ on the road. The horn ___(5)___ loudly.",
      wordBox: ["stop", "stops", "wait", "waits", "have", "has", "roll", "rolls", "sound", "sounds"],
      answers: ["stops", "wait", "has", "roll", "sounds"],
      hint: "Match the verb to whether the subject is one or many."
    },
    {
      text: "The cake ___(1)___ delicious. The children ___(2)___ the cake. Each slice ___(3)___ a cherry. The plates ___(4)___ on the table. The party ___(5)___ at six.",
      wordBox: ["taste", "tastes", "eat", "eats", "have", "has", "are", "is", "start", "starts"],
      answers: ["tastes", "eat", "has", "are", "starts"],
      hint: "Check if the subject is singular or plural for the verb."
    },
    {
      text: "The rain ___(1)___ heavily. The umbrellas ___(2)___ the people dry. Each drop ___(3)___ on the ground. The clouds ___(4)___ dark. The wind ___(5)___ the trees.",
      wordBox: ["fall", "falls", "keep", "keeps", "land", "lands", "look", "looks", "move", "moves"],
      answers: ["falls", "keep", "lands", "look", "moves"],
      hint: "Look at the subject to choose the right verb form."
    },
    {
      text: "The monkey ___(1)___ in the tree. The bananas ___(2)___ on the branch. Each leaf ___(3)___ green. The birds ___(4)___ nearby. The zookeeper ___(5)___ the animals.",
      wordBox: ["climb", "climbs", "hang", "hangs", "is", "are", "fly", "flies", "feed", "feeds"],
      answers: ["climbs", "hang", "is", "fly", "feeds"],
      hint: "Match the verb to the subject—one or more than one."
    },
    {
      text: "The phone ___(1)___ loudly. The children ___(2)___ the sound. Each button ___(3)___ a light. The messages ___(4)___ on the screen. The teacher ___(5)___ the phone off.",
      wordBox: ["ring", "rings", "hear", "hears", "have", "has", "appear", "appears", "turn", "turns"],
      answers: ["rings", "hear", "has", "appear", "turns"],
      hint: "Check the subject’s number to pick the verb."
    },
    {
      text: "The star ___(1)___ in the sky. The planets ___(2)___ around the sun. Each moon ___(3)___ a shadow. The clouds ___(4)___ away. The night ___(5)___ quiet.",
      wordBox: ["shine", "shines", "move", "moves", "cast", "casts", "float", "floats", "is", "are"],
      answers: ["shines", "move", "casts", "float", "is"],
      hint: "Look at the subject to see if it’s singular or plural."
    },
    {
      text: "The boat ___(1)___ on the water. The waves ___(2)___ high. Each sailor ___(3)___ a job. The fish ___(4)___ below. The wind ___(5)___ the sails.",
      wordBox: ["float", "floats", "rise", "rises", "have", "has", "swim", "swims", "push", "pushes"],
      answers: ["floats", "rise", "has", "swim", "pushes"],
      hint: "Match the verb to the subject’s number."
    },
    {
      text: "The lion ___(1)___ in the cage. The visitors ___(2)___ the lion. Each child ___(3)___ a camera. The monkeys ___(4)___ in the trees. The zookeeper ___(5)___ the gate.",
      wordBox: ["roar", "roars", "watch", "watches", "hold", "holds", "climb", "climbs", "open", "opens"],
      answers: ["roars", "watch", "holds", "climb", "opens"],
      hint: "Check if the subject is one or many for the verb."
    },
    {
      text: "The MRT ___(1)___ fast. The doors ___(2)___ at each stop. Each passenger ___(3)___ a ticket. The seats ___(4)___ full. The driver ___(5)___ the train.",
      wordBox: ["move", "moves", "open", "opens", "have", "has", "are", "is", "control", "controls"],
      answers: ["moves", "open", "has", "are", "controls"],
      hint: "Look at the subject to pick the right verb form."
    },
    {
      text: "The hawker ___(1)___ the food. The customers ___(2)___ at the tables. Each plate ___(3)___ rice. The fans ___(4)___ above. The queue ___(5)___ long.",
      wordBox: ["cook", "cooks", "sit", "sits", "have", "has", "spin", "spins", "grow", "grows"],
      answers: ["cooks", "sit", "has", "spin", "grows"],
      hint: "Match the verb to whether the subject is singular or plural."
    }
  ],
  pronouns: [
    {
      text: "Mary lost ___(1)___ book yesterday. She asked John if ___(2)___ had seen it. He said that ___(3)___ didn’t know where it was. ___(4)___ both looked for it. Later, ___(5)___ found it under the desk.",
      wordBox: ["she", "her", "he", "him", "they", "them", "it"],
      answers: ["her", "he", "he", "they", "she"],
      hint: "Look at who or what the sentence is talking about. Does it need a subject or object pronoun?"
    },
    {
      text: "The cat chased ___(1)___ tail. ___(2)___ was very playful. The dog watched ___(3)___ and barked. ___(4)___ both ran around the yard. Later, ___(5)___ rested under the tree.",
      wordBox: ["it", "its", "he", "him", "they", "them", "she"],
      answers: ["its", "It", "it", "They", "they"],
      hint: "Think about whether the pronoun is replacing a person or a thing."
    },
    {
      text: "Tom and Jerry are friends. ___(1)___ play together every day. ___(2)___ share their toys. Sometimes, ___(3)___ argue, but ___(4)___ always make up. ___(5)___ are best friends.",
      wordBox: ["They", "He", "She", "It", "We", "You", "Them"],
      answers: ["They", "They", "they", "they", "They"],
      hint: "Look for pronouns that refer to more than one person."
    },
    {
      text: "The teacher gave ___(1)___ a test. ___(2)___ was difficult, but ___(3)___ all tried their best. After the test, ___(4)___ graded the papers. ___(5)___ were proud of their work.",
      wordBox: ["us", "it", "they", "she", "he", "them", "we"],
      answers: ["us", "It", "they", "she", "They"],
      hint: "Consider if the pronoun is for the speaker, the listener, or others."
    },
    {
      text: "The bird built ___(1)___ nest in the tree. ___(2)___ laid eggs in ___(3)___ nest. The chicks hatched and ___(4)___ chirped loudly. The mother bird fed ___(5)___ worms.",
      wordBox: ["it", "its", "she", "her", "they", "them", "he"],
      answers: ["its", "She", "her", "they", "them"],
      hint: "Think about whether the pronoun is for a female, a thing, or multiple things."
    },
    {
      text: "The boy dropped ___(1)___ pencil. ___(2)___ picked it up quickly. The girl next to ___(3)___ smiled. ___(4)___ both laughed about it. Later, ___(5)___ gave her a new pencil.",
      wordBox: ["he", "him", "his", "she", "her", "they", "them"],
      answers: ["his", "He", "him", "They", "he"],
      hint: "Look at who is doing or receiving the action."
    },
    {
      text: "The dog wagged ___(1)___ tail. ___(2)___ ran to the park. The children played with ___(3)___. ___(4)___ all had fun together. The dog licked ___(5)___ hands.",
      wordBox: ["it", "its", "he", "him", "they", "them", "us"],
      answers: ["its", "It", "it", "They", "their"],
      hint: "Think about whether it’s a thing or people being replaced."
    },
    {
      text: "My sister and I went shopping. ___(1)___ bought new shoes. ___(2)___ tried them on. The shopkeeper helped ___(3)___. ___(4)___ thanked him. ___(5)___ was very kind.",
      wordBox: ["we", "us", "she", "her", "he", "him", "they"],
      answers: ["We", "We", "us", "We", "He"],
      hint: "Look for pronouns for the speaker or others."
    },
    {
      text: "The teacher called ___(1)___ to the front. ___(2)___ asked John a question. ___(3)___ answered correctly. The class clapped for ___(4)___. ___(5)___ smiled proudly.",
      wordBox: ["he", "him", "she", "her", "they", "them", "us"],
      answers: ["him", "She", "he", "him", "He"],
      hint: "Think about who is acting or being acted upon."
    },
    {
      text: "The kite flew high. ___(1)___ caught the wind. The boy held ___(2)___ string. His sister watched ___(3)___. ___(4)___ both cheered loudly. ___(5)___ waved at them.",
      wordBox: ["it", "its", "he", "him", "she", "her", "they"],
      answers: ["It", "its", "it", "They", "she"],
      hint: "Look at what or who the pronoun replaces."
    },
    {
      text: "The baby dropped ___(1)___ toy. ___(2)___ cried loudly. The mother picked ___(3)___ up. ___(4)___ hugged her tightly. ___(5)___ smiled at them.",
      wordBox: ["it", "its", "he", "him", "she", "her", "they"],
      answers: ["its", "He", "him", "She", "they"],
      hint: "Think about the baby, toy, or mother being replaced."
    },
    {
      text: "The team won the game. ___(1)___ celebrated together. The coach praised ___(2)___. ___(3)___ all cheered loudly. The trophy was for ___(4)___. ___(5)___ held it high.",
      wordBox: ["they", "them", "he", "him", "we", "us", "it"],
      answers: ["They", "them", "They", "them", "They"],
      hint: "Look for pronouns for a group of people."
    },
    {
      text: "The flower lost ___(1)___ petals. ___(2)___ fell to the ground. The girl picked ___(3)___ up. ___(4)___ showed it to her friend. ___(5)___ liked the color.",
      wordBox: ["it", "its", "she", "her", "they", "them", "he"],
      answers: ["its", "They", "them", "She", "he"],
      hint: "Think about the flower or people being replaced."
    },
    {
      text: "The bus stopped for ___(1)___. ___(2)___ got on quickly. The driver waved at ___(3)___. ___(4)___ all sat down. ___(5)___ started the bus again.",
      wordBox: ["we", "us", "they", "them", "he", "him", "it"],
      answers: ["us", "We", "us", "We", "He"],
      hint: "Look for pronouns for passengers or the driver."
    },
    {
      text: "The monkey stole ___(1)___ banana. ___(2)___ ate it fast. The zookeeper chased ___(3)___. ___(4)___ laughed at the monkey. ___(5)___ was funny.",
      wordBox: ["it", "its", "he", "him", "they", "them", "us"],
      answers: ["its", "It", "it", "They", "It"],
      hint: "Think about the monkey or banana being replaced."
    },
    {
      text: "The rain wet ___(1)___ clothes. ___(2)___ ran inside. The teacher gave ___(3)___ a towel. ___(4)___ dried off quickly. ___(5)___ thanked her.",
      wordBox: ["he", "him", "she", "her", "they", "them", "us"],
      answers: ["their", "They", "them", "They", "They"],
      hint: "Look for pronouns for people affected by rain."
    },
    {
      text: "The star shone for ___(1)___. ___(2)___ looked up at it. The boy pointed at ___(3)___. ___(4)___ all gasped in wonder. ___(5)___ twinkled brightly.",
      wordBox: ["we", "us", "they", "them", "it", "its", "he"],
      answers: ["us", "We", "it", "We", "It"],
      hint: "Think about who sees the star or what it is."
    },
    {
      text: "The cake was for ___(1)___. ___(2)___ cut it into pieces. The girl gave ___(3)___ a slice. ___(4)___ ate it happily. ___(5)___ said it was yummy.",
      wordBox: ["they", "them", "she", "her", "he", "him", "we"],
      answers: ["them", "She", "him", "He", "He"],
      hint: "Look for pronouns for people eating cake."
    },
    {
      text: "The MRT took ___(1)___ to school. ___(2)___ stood by the door. The driver helped ___(3)___. ___(4)___ all thanked him. ___(5)___ was kind.",
      wordBox: ["we", "us", "they", "them", "he", "him", "it"],
      answers: ["us", "We", "us", "We", "He"],
      hint: "Think about passengers or the driver."
    },
    {
      text: "The hawker cooked for ___(1)___. ___(2)___ ordered chicken rice. The plate was for ___(3)___. ___(4)___ ate it fast. ___(5)___ smiled at them.",
      wordBox: ["he", "him", "she", "her", "they", "them", "us"],
      answers: ["them", "They", "them", "They", "She"],
      hint: "Look for pronouns for customers or the hawker."
    }
  ],
  adjectivesAdverbs: [
    {
      text: "The ___(1)___ cat ran ___(2)___ across the yard. It jumped ___(3)___ onto the fence. The boy watched ___(4)___ as it moved ___(5)___ toward the tree.",
      wordBox: ["quick", "quickly", "high", "highly", "soft", "softly", "careful", "carefully", "silent", "silently"],
      answers: ["quick", "quickly", "high", "carefully", "silently"],
      hint: "Decide if the word describes a noun (adjective) or an action (adverb)."
    },
    {
      text: "The ___(1)___ sun shone ___(2)___ in the sky. The children played ___(3)___ in the park. They laughed ___(4)___ as they ran ___(5)___ the slides.",
      wordBox: ["bright", "brightly", "happy", "happily", "loud", "loudly", "down", "slow", "slowly"],
      answers: ["bright", "brightly", "happily", "loudly", "down"],
      hint: "Look for words that describe things or how actions are done."
    },
    {
      text: "The ___(1)___ puppy barked ___(2)___ at the mailman. It wagged its tail ___(3)___ when it saw its owner. The owner petted it ___(4)___ and spoke ___(5)___ to it.",
      wordBox: ["small", "smallly", "loud", "loudly", "quick", "quickly", "gentle", "gently", "soft", "softly"],
      answers: ["small", "loudly", "quickly", "gently", "softly"],
      hint: "Think about whether the word is describing the puppy or how it does something."
    },
    {
      text: "The ___(1)___ teacher explained the lesson ___(2)___. The students listened ___(3)___ and took notes ___(4)___. They all worked ___(5)___ on their assignments.",
      wordBox: ["kind", "kindly", "clear", "clearly", "attentive", "attentively", "careful", "carefully", "hard", "hardly"],
      answers: ["kind", "clearly", "attentively", "carefully", "hard"],
      hint: "Decide if the word is describing a person or how they do something."
    },
    {
      text: "The ___(1)___ wind blew ___(2)___ through the trees. The leaves rustled ___(3)___ as they fell ___(4)___ to the ground. The children played ___(5)___ in the park.",
      wordBox: ["strong", "strongly", "soft", "softly", "gentle", "gently", "slow", "slowly", "happy", "happily"],
      answers: ["strong", "strongly", "softly", "slowly", "happily"],
      hint: "Look for words that describe the wind or how things are moving."
    },
    {
      text: "The ___(1)___ kite flew ___(2)___ in the sky. The boy pulled the string ___(3)___. It rose ___(4)___ above the trees. He smiled ___(5)___ at his success.",
      wordBox: ["colorful", "colorfully", "high", "highly", "tight", "tightly", "quick", "quickly", "happy", "happily"],
      answers: ["colorful", "high", "tightly", "high", "happily"],
      hint: "Think about describing the kite or how actions happen."
    },
    {
      text: "The ___(1)___ bird sang ___(2)___ in the morning. It perched ___(3)___ on a branch. The children listened ___(4)___ to the song. The tune was ___(5)___ to hear.",
      wordBox: ["pretty", "prettily", "sweet", "sweetly", "high", "highly", "quiet", "quietly", "nice", "nicely"],
      answers: ["pretty", "sweetly", "high", "quietly", "nice"],
      hint: "Look for words that describe the bird or how it sings."
    },
    {
      text: "The ___(1)___ rain fell ___(2)___ on the roof. The girl watched ___(3)___ as it dripped ___(4)___. The sound was ___(5)___ and calming.",
      wordBox: ["heavy", "heavily", "soft", "softly", "careful", "carefully", "slow", "slowly", "gentle", "gently"],
      answers: ["heavy", "heavily", "carefully", "slowly", "gentle"],
      hint: "Think about describing the rain or how it falls."
    },
    {
      text: "The ___(1)___ boy ran ___(2)___ to the bus. He waved ___(3)___ at his friends. The bus moved ___(4)___ down the road. He sat ___(5)___ in his seat.",
      wordBox: ["fast", "fastly", "quick", "quickly", "happy", "happily", "slow", "slowly", "quiet", "quietly"],
      answers: ["fast", "quickly", "happily", "slowly", "quietly"],
      hint: "Look for words that describe the boy or his actions."
    },
    {
      text: "The ___(1)___ cake smelled ___(2)___ in the oven. The baker mixed the batter ___(3)___. It baked ___(4)___ and turned ___(5)___ brown.",
      wordBox: ["sweet", "sweetly", "nice", "nicely", "careful", "carefully", "slow", "slowly", "golden", "goldenly"],
      answers: ["sweet", "nicely", "carefully", "slowly", "golden"],
      hint: "Think about describing the cake or how it’s made."
    },
    {
      text: "The ___(1)___ dog barked ___(2)___ at strangers. It wagged its tail ___(3)___ for its owner. The owner called ___(4)___ to it. The dog ran ___(5)___ to him.",
      wordBox: ["big", "bigly", "loud", "loudly", "happy", "happily", "soft", "softly", "quick", "quickly"],
      answers: ["big", "loudly", "happily", "softly", "quickly"],
      hint: "Look for words that describe the dog or its actions."
    },
    {
      text: "The ___(1)___ flowers grew ___(2)___ in the garden. The gardener watered them ___(3)___. They smelled ___(4)___ and looked ___(5)___ in the sun.",
      wordBox: ["tall", "tallly", "quick", "quickly", "careful", "carefully", "sweet", "sweetly", "pretty", "prettily"],
      answers: ["tall", "quickly", "carefully", "sweetly", "pretty"],
      hint: "Think about describing flowers or how they grow."
    },
    {
      text: "The ___(1)___ bus drove ___(2)___ through the city. The driver turned the wheel ___(3)___. Passengers sat ___(4)___ and waited ___(5)___ for their stop.",
      wordBox: ["big", "bigly", "fast", "fastly", "careful", "carefully", "quiet", "quietly", "patient", "patiently"],
      answers: ["big", "fast", "carefully", "quietly", "patiently"],
      hint: "Look for words that describe the bus or how it moves."
    },
    {
      text: "The ___(1)___ monkey climbed ___(2)___ up the tree. It ate a banana ___(3)___. The children watched ___(4)___ as it swung ___(5)___ on the branches.",
      wordBox: ["small", "smallly", "quick", "quickly", "hungry", "hungrily", "close", "closely", "high", "highly"],
      answers: ["small", "quickly", "hungrily", "closely", "high"],
      hint: "Think about describing the monkey or its actions."
    },
    {
      text: "The ___(1)___ star shone ___(2)___ in the sky. The boy looked ___(3)___ at it. It twinkled ___(4)___ and seemed ___(5)___ at night.",
      wordBox: ["bright", "brightly", "careful", "carefully", "soft", "softly", "pretty", "prettily", "clear", "clearly"],
      answers: ["bright", "brightly", "carefully", "softly", "clear"],
      hint: "Look for words that describe the star or how it shines."
    },
    {
      text: "The ___(1)___ baby slept ___(2)___ in the crib. The mother sang ___(3)___ to her. The room was ___(4)___ and felt ___(5)___ warm.",
      wordBox: ["cute", "cutely", "quiet", "quietly", "soft", "softly", "calm", "calmly", "nice", "nicely"],
      answers: ["cute", "quietly", "softly", "calm", "nice"],
      hint: "Think about describing the baby or how things happen."
    },
    {
      text: "The ___(1)___ team played ___(2)___ in the match. They kicked the ball ___(3)___. The crowd cheered ___(4)___ and clapped ___(5)___ for them.",
      wordBox: ["strong", "strongly", "good", "well", "hard", "hardly", "loud", "loudly", "happy", "happily"],
      answers: ["strong", "well", "hard", "loudly", "happily"],
      hint: "Look for words that describe the team or their actions."
    },
    {
      text: "The ___(1)___ fish swam ___(2)___ in the tank. The boy fed them ___(3)___. They moved ___(4)___ and looked ___(5)___ in the water.",
      wordBox: ["colorful", "colorfully", "quick", "quickly", "careful", "carefully", "slow", "slowly", "pretty", "prettily"],
      answers: ["colorful", "quickly", "carefully", "slowly", "pretty"],
      hint: "Think about describing the fish or how they swim."
    },
    {
      text: "The ___(1)___ MRT moved ___(2)___ through the tunnel. The driver worked ___(3)___. Passengers stood ___(4)___ and waited ___(5)___ for their stations.",
      wordBox: ["fast", "fastly", "smooth", "smoothly", "careful", "carefully", "quiet", "quietly", "calm", "calmly"],
      answers: ["fast", "smoothly", "carefully", "quietly", "calmly"],
      hint: "Look for words that describe the MRT or how it runs."
    },
    {
      text: "The ___(1)___ hawker cooked ___(2)___ for the crowd. The food smelled ___(3)___ and tasted ___(4)___. Customers ate ___(5)___ at the tables.",
      wordBox: ["busy", "busily", "quick", "quickly", "good", "well", "nice", "nicely", "happy", "happily"],
      answers: ["busy", "quickly", "nice", "well", "happily"],
      hint: "Think about describing the hawker or how cooking happens."
    }
  ]
};

  // Load the selected passage
  function loadPassage() {
    const grammarType = grammarTypeSelect.value;
    const passage = passages[grammarType][currentPassageIndex];
    passageTitle.textContent = `Passage ${currentPassageIndex + 1}: ${grammarType.charAt(0).toUpperCase() + grammarType.slice(1)}`;
    passageText.innerHTML = passage.text.replace(/___\(\d+\)___/g, '<span class="blank" data-answer=""></span>');
    wordBox.innerHTML = '';
    passage.wordBox.forEach(word => {
      const wordElem = document.createElement('span');
      wordElem.className = 'word';
      wordElem.textContent = word;
      wordElem.draggable = true;
      wordBox.appendChild(wordElem);
    });
    feedback.textContent = '';
    submitBtn.disabled = true;
    const blanks = passageText.querySelectorAll('.blank');
    blanks.forEach((blank, index) => {
      blank.dataset.answer = passage.answers[index];
    });
  }

  // Drag-and-drop functionality
  let draggedWord = null;

  document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('word')) {
      draggedWord = e.target;
      e.target.classList.add('dragging');
    }
  });

  document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('word')) {
      e.target.classList.remove('dragging');
      draggedWord = null;
    }
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedWord) {
      const dropTarget = e.target;
      if (dropTarget.classList.contains('blank') && !dropTarget.firstChild) {
        dropTarget.appendChild(draggedWord);
        checkCompletion();
      } else if (dropTarget.id === 'word-box') {
        dropTarget.appendChild(draggedWord);
      }
    }
  });

  // Enable/disable submit button based on blank completion
  function checkCompletion() {
    const blanks = passageText.querySelectorAll('.blank');
    const allFilled = Array.from(blanks).every(blank => blank.firstChild);
    submitBtn.disabled = !allFilled;
    submitBtn.style.backgroundColor = allFilled ? 'var(--primary-color)' : '#cccccc';
  }

  // Check answers and provide feedback
  submitBtn.addEventListener('click', () => {
    const blanks = passageText.querySelectorAll('.blank');
    let allCorrect = true;
    blanks.forEach(blank => {
      const word = blank.firstChild ? blank.firstChild.textContent : '';
      const correctAnswer = blank.dataset.answer;
      blank.classList.remove('correct', 'incorrect');
      if (word === correctAnswer) {
        blank.classList.add('correct');
      } else {
        blank.classList.add('incorrect');
        allCorrect = false;
      }
    });
    feedback.textContent = allCorrect 
      ? "Well done! All answers are correct." 
      : "Some answers are incorrect. Try again!";
    if (allCorrect) {
      completedPassages++;
      progressTracker.textContent = `Progress: ${completedPassages}/${totalPassages} passages completed`;
    }
  });

  // Show hint for the current passage
  hintBtn.addEventListener('click', () => {
    const grammarType = grammarTypeSelect.value;
    const passage = passages[grammarType][currentPassageIndex];
    alert(passage.hint);
  });

  // Reload passage when grammar type changes
  grammarTypeSelect.addEventListener('change', () => {
    currentGrammarType = grammarTypeSelect.value;
    currentPassageIndex = 0;
    completedPassages = 0;
    progressTracker.textContent = `Progress: ${completedPassages}/${totalPassages} passages completed`;
    loadPassage();
  });

  // Load initial passage
  loadPassage();
});
