"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // Full Passage Data for All Grammar Types
  // -------------------------
  const passages = {
    prepositions: [
      {
        text: "Sally placed her bag ___(1)___ the table. She looked ___(2)___ the window and saw a bird. The bird was perched ___(3)___ the fence. Her cat hid ___(4)___ a chair. Sally walked ___(5)___ the door quietly.",
        wordBox: ["in", "on", "under", "by", "through", "around", "towards"],
        answers: ["on", "through", "by", "under", "towards"],
        // One clue word per blank:
        clueWords: ["bag", "window", "fence", "chair", "door"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "Tom sat ___(1)___ the sofa and watched TV. His mom was cooking ___(2)___ the kitchen. The dog slept ___(3)___ the rug. Tom’s sister played ___(4)___ the garden. Later, they ate dinner ___(5)___ the table.",
        wordBox: ["on", "in", "under", "by", "around", "at", "near"],
        answers: ["on", "in", "on", "in", "at"],
        clueWords: ["sofa", "kitchen", "rug", "garden", "table"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ball rolled ___(1)___ the hill and stopped ___(2)___ a tree. A squirrel ran ___(3)___ the tree and hid ___(4)___ the branches. The children played ___(5)___ the park all day.",
        wordBox: ["down", "up", "under", "by", "around", "near", "between"],
        answers: ["down", "by", "up", "in", "in"],
        clueWords: ["hill", "tree", "squirrel", "branches", "park"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The teacher stood ___(1)___ the classroom. She wrote ___(2)___ the whiteboard. The students sat ___(3)___ their desks. A poster hung ___(4)___ the wall. The clock was ___(5)___ the door.",
        wordBox: ["in", "on", "under", "by", "near", "above", "below"],
        answers: ["in", "on", "at", "on", "above"],
        clueWords: ["teacher", "whiteboard", "desks", "poster", "door"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The fish swam ___(1)___ the pond. A frog jumped ___(2)___ a lily pad. The ducks floated ___(3)___ the water. A boy stood ___(4)___ the bridge and watched. His friend sat ___(5)___ the grass nearby.",
        wordBox: ["in", "on", "under", "by", "around", "near", "between"],
        answers: ["in", "on", "on", "on", "on"],
        clueWords: ["fish", "lily pad", "ducks", "bridge", "grass"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The kite flew ___(1)___ the sky. The boy held the string ___(2)___ his hands. The wind blew ___(3)___ the trees. The kite soared ___(4)___ the clouds. His sister cheered ___(5)___ the ground.",
        wordBox: ["in", "on", "under", "by", "through", "above", "below"],
        answers: ["in", "in", "through", "above", "on"],
        clueWords: ["kite", "string", "wind", "clouds", "ground"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The book is ___(1)___ the shelf. A pen rolled ___(2)___ the desk. The bag is ___(3)___ the chair. The teacher walked ___(4)___ the room. A picture hangs ___(5)___ the wall.",
        wordBox: ["on", "under", "by", "around", "near", "above", "below"],
        answers: ["on", "under", "under", "around", "above"],
        clueWords: ["book", "pen", "bag", "teacher", "picture"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The bus stopped ___(1)___ the bus stop. People waited ___(2)___ the shelter. The driver sat ___(3)___ the wheel. A girl looked ___(4)___ her phone. The bus moved ___(5)___ the road.",
        wordBox: ["at", "in", "on", "under", "by", "near", "along"],
        answers: ["at", "in", "at", "at", "along"],
        clueWords: ["bus", "shelter", "driver", "girl", "road"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The monkey climbed ___(1)___ the tree. It swung ___(2)___ the branches. A bird flew ___(3)___ its nest. The zookeeper stood ___(4)___ the cage. The children watched ___(5)___ the fence.",
        wordBox: ["up", "on", "under", "by", "around", "near", "to"],
        answers: ["up", "on", "to", "by", "near"],
        clueWords: ["monkey", "branches", "bird", "zookeeper", "fence"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The plate is ___(1)___ the table. A spoon fell ___(2)___ the floor. The soup is ___(3)___ the bowl. Mother cooked ___(4)___ the stove. We ate ___(5)___ the dining room.",
        wordBox: ["on", "under", "in", "by", "around", "near", "at"],
        answers: ["on", "on", "in", "by", "in"],
        clueWords: ["plate", "spoon", "soup", "stove", "dining room"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The boy ran ___(1)___ the playground. He jumped ___(2)___ a bench. His friends waited ___(3)___ the slide. The ball rolled ___(4)___ the sandpit. They played ___(5)___ the sun set.",
        wordBox: ["in", "on", "under", "by", "around", "near", "until"],
        answers: ["in", "on", "by", "into", "until"],
        clueWords: ["boy", "bench", "slide", "ball", "sun"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The rain fell ___(1)___ the roof. The cat slept ___(2)___ the mat. A puddle formed ___(3)___ the house. The girl stood ___(4)___ an umbrella. The dog ran ___(5)___ the rain.",
        wordBox: ["on", "under", "by", "around", "near", "through", "in"],
        answers: ["on", "on", "near", "under", "through"],
        clueWords: ["rain", "cat", "puddle", "umbrella", "dog"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The flag is ___(1)___ the pole. The wind blew ___(2)___ the school. The students stood ___(3)___ the field. A bell rang ___(4)___ the building. They walked ___(5)___ their classrooms.",
        wordBox: ["on", "in", "under", "by", "around", "near", "to"],
        answers: ["on", "around", "on", "in", "to"],
        clueWords: ["flag", "wind", "students", "bell", "classrooms"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The boat floated ___(1)___ the river. A fish swam ___(2)___ the water. The man fished ___(3)___ the bank. A bird flew ___(4)___ the boat. The net was ___(5)___ the deck.",
        wordBox: ["on", "in", "under", "by", "around", "near", "above"],
        answers: ["on", "in", "by", "above", "on"],
        clueWords: ["boat", "fish", "bank", "bird", "net"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The plane flew ___(1)___ the clouds. The pilot sat ___(2)___ the cockpit. Passengers looked ___(3)___ the windows. The luggage was ___(4)___ the seats. The airport was ___(5)___ the city.",
        wordBox: ["in", "on", "under", "by", "through", "near", "below"],
        answers: ["through", "in", "through", "under", "near"],
        clueWords: ["plane", "pilot", "passengers", "luggage", "airport"],
        hint: "Remember to use the objects around you as clues."
      }
    ],
    conjunctions: [
      {
        text: "Tom wanted to go outside ___(1)___ it was raining. He waited ___(2)___ the rain stopped ___(3)___ then ran to the park. He could play ___(4)___ read a book, ___(5)___ he chose to play.",
        wordBox: ["but", "and", "or", "until", "because", "so", "although"],
        answers: ["but", "until", "and", "or", "so"],
        clueWords: ["outside", "rain", "park", "play", "chose"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I like apples ___(1)___ bananas. My sister likes oranges ___(2)___ grapes. We both like strawberries ___(3)___ they are sweet. Sometimes we eat fruit ___(4)___ breakfast ___(5)___ for a snack.",
        wordBox: ["and", "but", "or", "because", "so", "although", "after"],
        answers: ["and", "and", "because", "for", "or"],
        clueWords: ["apples", "oranges", "strawberries", "breakfast", "snack"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The dog barked loudly ___(1)___ the cat meowed softly. They were hungry ___(2)___ they wanted food. The owner fed them ___(3)___ they stopped making noise. Later, the dog slept ___(4)___ the cat played. They are friends ___(5)___ they sometimes fight.",
        wordBox: ["and", "but", "or", "because", "so", "although", "after"],
        answers: ["and", "so", "and", "while", "although"],
        clueWords: ["dog", "hungry", "fed", "cat", "fight"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I can go to the park ___(1)___ stay home. If I go to the park, I will play ___(2)___ my friends. If I stay home, I will read ___(3)___ watch TV. I think I will go ___(4)___ it is sunny. My mom said I can go ___(5)___ I finish my homework.",
        wordBox: ["or", "and", "but", "because", "so", "if", "unless"],
        answers: ["or", "with", "or", "because", "if"],
        clueWords: ["park", "play", "read", "sunny", "homework"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The children were tired ___(1)___ they kept playing. They wanted to win ___(2)___ they tried hard. The coach cheered ___(3)___ they scored a goal. After the game, they were happy ___(4)___ exhausted. They celebrated ___(5)___ they went home.",
        wordBox: ["but", "and", "or", "because", "so", "although", "after"],
        answers: ["but", "so", "when", "but", "before"],
        clueWords: ["children", "win", "cheered", "happy", "home"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The sky was dark ___(1)___ it might rain. I took an umbrella ___(2)___ I didn’t want to get wet. It started raining ___(3)___ I reached the bus stop. I waited there ___(4)___ the rain stopped. I was glad ___(5)___ I stayed dry.",
        wordBox: ["but", "and", "or", "because", "so", "until", "after"],
        answers: ["and", "because", "when", "until", "because"],
        clueWords: ["sky", "umbrella", "raining", "bus stop", "dry"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I wanted to eat rice ___(1)___ noodles. My brother chose noodles ___(2)___ he likes them more. We ate together ___(3)___ we shared the food. It was spicy ___(4)___ tasty. We drank water ___(5)___ we finished.",
        wordBox: ["or", "and", "but", "because", "so", "although", "after"],
        answers: ["or", "because", "and", "but", "after"],
        clueWords: ["rice", "noodles", "together", "spicy", "water"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The room was messy ___(1)___ we cleaned it. We worked fast ___(2)___ we wanted to play. Mom helped us ___(3)___ we finished quickly. We were tired ___(4)___ happy. We rested ___(5)___ everything was done.",
        wordBox: ["but", "and", "or", "because", "so", "after", "although"],
        answers: ["so", "because", "and", "but", "after"],
        clueWords: ["room", "fast", "mom", "tired", "done"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I can draw ___(1)___ paint today. I like painting ___(2)___ it is fun. I draw well ___(3)___ I need practice with paint. I will try both ___(4)___ I have time. My sister will join me ___(5)___ she likes art too.",
        wordBox: ["or", "and", "but", "because", "so", "if", "although"],
        answers: ["or", "because", "but", "because", "because"],
        clueWords: ["draw", "painting", "practice", "time", "sister"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The movie was long ___(1)___ exciting. We watched it ___(2)___ we ate popcorn. It ended late ___(3)___ we stayed awake. We were sleepy ___(4)___ happy. We talked about it ___(5)___ we went to bed.",
        wordBox: ["but", "and", "or", "because", "so", "after", "although"],
        answers: ["but", "while", "but", "but", "before"],
        clueWords: ["movie", "popcorn", "late", "sleepy", "bed"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I wanted to swim ___(1)___ the pool was closed. I went to the park ___(2)___ I played there. It was hot ___(3)___ I brought water. I stayed ___(4)___ the sun set. I had fun ___(5)___ I was tired.",
        wordBox: ["but", "and", "or", "because", "so", "until", "although"],
        answers: ["but", "and", "so", "until", "although"],
        clueWords: ["swim", "park", "hot", "sun", "tired"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The cake was sweet ___(1)___ delicious. I wanted more ___(2)___ I was full. My friend ate some ___(3)___ she liked it too. We saved some ___(4)___ later. We smiled ___(5)___ we enjoyed it.",
        wordBox: ["and", "but", "or", "because", "so", "for", "after"],
        answers: ["and", "but", "because", "for", "because"],
        clueWords: ["cake", "full", "friend", "saved", "smiled"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The bell rang ___(1)___ we went to class. We studied math ___(2)___ science. I like math ___(3)___ it is easy. Science is fun ___(4)___ challenging. We worked hard ___(5)___ we wanted good grades.",
        wordBox: ["and", "but", "or", "because", "so", "although", "after"],
        answers: ["and", "and", "because", "but", "because"],
        clueWords: ["bell", "math", "easy", "challenging", "grades"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I can read a book ___(1)___ play a game. I chose a book ___(2)___ I like stories. It was quiet ___(3)___ I could focus. My brother played ___(4)___ I read. We had fun ___(5)___ we did different things.",
        wordBox: ["or", "and", "but", "because", "so", "while", "although"],
        answers: ["or", "because", "so", "while", "although"],
        clueWords: ["book", "stories", "quiet", "brother", "fun"],
        hint: "Remember to use the objects around you as clues."
      }
    ],
    subjectVerbAgreement: [
      {
        text: "The dog ___(1)___ loudly every morning. The cats ___(2)___ quietly in the garden. Each child ___(3)___ a toy. The team ___(4)___ hard to win. Many birds ___(5)___ in the sky.",
        wordBox: ["bark", "barks", "sleep", "sleeps", "has", "have", "work", "works", "fly", "flies"],
        answers: ["barks", "sleep", "has", "works", "fly"],
        clueWords: ["dog", "cats", "child", "team", "birds"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "My friend ___(1)___ to school every day. The students ___(2)___ their homework. Each teacher ___(3)___ a classroom. The books ___(4)___ on the shelf. The bird ___(5)___ in the tree.",
        wordBox: ["walk", "walks", "do", "does", "have", "has", "are", "is", "sing", "sings"],
        answers: ["walks", "do", "has", "are", "sings"],
        clueWords: ["friend", "students", "teacher", "books", "bird"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The flowers ___(1)___ beautifully in the garden. Each flower ___(2)___ a different color. The bees ___(3)___ around the flowers. The gardener ___(4)___ the plants every day. Many insects ___(5)___ in the garden.",
        wordBox: ["bloom", "blooms", "have", "has", "buzz", "buzzes", "water", "waters", "live", "lives"],
        answers: ["bloom", "has", "buzz", "waters", "live"],
        clueWords: ["flowers", "flower", "bees", "gardener", "insects"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The car ___(1)___ fast on the road. The drivers ___(2)___ carefully. Each passenger ___(3)___ a seatbelt. The buses ___(4)___ slowly in traffic. The motorcycle ___(5)___ loudly.",
        wordBox: ["go", "goes", "drive", "drives", "wear", "wears", "move", "moves", "roar", "roars"],
        answers: ["goes", "drive", "wears", "move", "roars"],
        clueWords: ["car", "drivers", "passenger", "buses", "motorcycle"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The baby ___(1)___ in the crib. The parents ___(2)___ the baby. Each toy ___(3)___ a different sound. The children ___(4)___ with the toys. The dog ___(5)___ the children play.",
        wordBox: ["sleep", "sleeps", "watch", "watches", "make", "makes", "play", "plays", "watch", "watches"],
        answers: ["sleeps", "watch", "makes", "play", "watches"],
        clueWords: ["baby", "parents", "toy", "children", "dog"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The kite ___(1)___ high in the sky. The children ___(2)___ the kite. Each boy ___(3)___ a turn. The clouds ___(4)___ across the sky. The wind ___(5)___ strongly.",
        wordBox: ["fly", "flies", "hold", "holds", "take", "takes", "move", "moves", "blow", "blows"],
        answers: ["flies", "hold", "takes", "move", "blows"],
        clueWords: ["kite", "children", "boy", "clouds", "wind"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The teacher ___(1)___ the class every day. The students ___(2)___ quietly. Each desk ___(3)___ a book. The pencils ___(4)___ on the table. The bell ___(5)___ at noon.",
        wordBox: ["teach", "teaches", "sit", "sits", "have", "has", "are", "is", "ring", "rings"],
        answers: ["teaches", "sit", "has", "are", "rings"],
        clueWords: ["teacher", "students", "desk", "pencils", "bell"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The fish ___(1)___ in the tank. The children ___(2)___ the fish. Each fish ___(3)___ a bright color. The bubbles ___(4)___ to the top. The cat ___(5)___ the tank closely.",
        wordBox: ["swim", "swims", "watch", "watches", "have", "has", "rise", "rises", "look", "looks"],
        answers: ["swims", "watch", "has", "rise", "looks"],
        clueWords: ["fish", "children", "fish", "bubbles", "cat"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The sun ___(1)___ in the morning. The birds ___(2)___ in the trees. Each cloud ___(3)___ a shape. The leaves ___(4)___ in the wind. The dog ___(5)___ in the yard.",
        wordBox: ["rise", "rises", "sing", "sings", "have", "has", "move", "moves", "play", "plays"],
        answers: ["rises", "sing", "has", "move", "plays"],
        clueWords: ["sun", "birds", "cloud", "leaves", "dog"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The clock ___(1)___ every hour. The hands ___(2)___ around the face. Each minute ___(3)___ slowly. The children ___(4)___ for recess. The teacher ___(5)___ the time.",
        wordBox: ["tick", "ticks", "move", "moves", "pass", "passes", "wait", "waits", "check", "checks"],
        answers: ["ticks", "move", "passes", "wait", "checks"],
        clueWords: ["clock", "hands", "minute", "children", "teacher"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The bus ___(1)___ at the stop. The passengers ___(2)___ quietly. Each driver ___(3)___ a route. The wheels ___(4)___ on the road. The horn ___(5)___ loudly.",
        wordBox: ["stop", "stops", "wait", "waits", "have", "has", "roll", "rolls", "sound", "sounds"],
        answers: ["stops", "wait", "has", "roll", "sounds"],
        clueWords: ["bus", "passengers", "driver", "wheels", "horn"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The cake ___(1)___ delicious. The children ___(2)___ the cake. Each slice ___(3)___ a cherry. The plates ___(4)___ on the table. The party ___(5)___ at six.",
        wordBox: ["taste", "tastes", "eat", "eats", "have", "has", "are", "is", "start", "starts"],
        answers: ["tastes", "eat", "has", "are", "starts"],
        clueWords: ["cake", "children", "slice", "plates", "party"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The rain ___(1)___ heavily. The umbrellas ___(2)___ the people dry. Each drop ___(3)___ on the ground. The clouds ___(4)___ dark. The wind ___(5)___ the trees.",
        wordBox: ["fall", "falls", "keep", "keeps", "land", "lands", "look", "looks", "move", "moves"],
        answers: ["falls", "keep", "lands", "look", "moves"],
        clueWords: ["rain", "umbrellas", "drop", "clouds", "wind"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The monkey ___(1)___ in the tree. The bananas ___(2)___ on the branch. Each leaf ___(3)___ green. The birds ___(4)___ nearby. The zookeeper ___(5)___ the animals.",
        wordBox: ["climb", "climbs", "hang", "hangs", "is", "are", "fly", "flies", "feed", "feeds"],
        answers: ["climbs", "hang", "is", "fly", "feeds"],
        clueWords: ["monkey", "bananas", "leaf", "birds", "zookeeper"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The phone ___(1)___ loudly. The children ___(2)___ the sound. Each button ___(3)___ a light. The messages ___(4)___ on the screen. The teacher ___(5)___ the phone off.",
        wordBox: ["ring", "rings", "hear", "hears", "have", "has", "appear", "appears", "turn", "turns"],
        answers: ["rings", "hear", "has", "appear", "turns"],
        clueWords: ["phone", "children", "button", "messages", "teacher"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The star ___(1)___ in the sky. The planets ___(2)___ around the sun. Each moon ___(3)___ a shadow. The clouds ___(4)___ away. The night ___(5)___ quiet.",
        wordBox: ["shine", "shines", "move", "moves", "cast", "casts", "float", "floats", "is", "are"],
        answers: ["shines", "move", "casts", "float", "is"],
        clueWords: ["star", "planets", "moon", "clouds", "night"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The boat ___(1)___ on the water. The waves ___(2)___ high. Each sailor ___(3)___ a job. The fish ___(4)___ below. The wind ___(5)___ the sails.",
        wordBox: ["float", "floats", "rise", "rises", "have", "has", "swim", "swims", "push", "pushes"],
        answers: ["floats", "rise", "has", "swim", "pushes"],
        clueWords: ["boat", "waves", "sailor", "fish", "wind"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The lion ___(1)___ in the cage. The visitors ___(2)___ the lion. Each child ___(3)___ a camera. The monkeys ___(4)___ in the trees. The zookeeper ___(5)___ the gate.",
        wordBox: ["roar", "roars", "watch", "watches", "hold", "holds", "climb", "climbs", "open", "opens"],
        answers: ["roars", "watch", "holds", "climb", "opens"],
        clueWords: ["lion", "visitors", "child", "monkeys", "zookeeper"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The MRT ___(1)___ fast. The doors ___(2)___ at each stop. Each passenger ___(3)___ a ticket. The seats ___(4)___ full. The driver ___(5)___ the train.",
        wordBox: ["move", "moves", "open", "opens", "have", "has", "are", "is", "control", "controls"],
        answers: ["moves", "open", "has", "are", "controls"],
        clueWords: ["MRT", "doors", "passenger", "seats", "driver"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The hawker ___(1)___ the food. The customers ___(2)___ at the tables. Each plate ___(3)___ rice. The fans ___(4)___ above. The queue ___(5)___ long.",
        wordBox: ["cook", "cooks", "sit", "sits", "have", "has", "spin", "spins", "grow", "grows"],
        answers: ["cooks", "sit", "has", "spin", "grows"],
        clueWords: ["hawker", "customers", "plate", "fans", "queue"],
        hint: "Remember to use the objects around you as clues."
      }
    ],
    pronouns: [
      {
        text: "Mary lost ___(1)___ book yesterday. She asked John if ___(2)___ had seen it. He said that ___(3)___ didn’t know where it was. ___(4)___ both looked for it. Later, ___(5)___ found it under the desk.",
        wordBox: ["she", "her", "he", "him", "they", "them", "it"],
        answers: ["her", "he", "he", "they", "she"],
        clueWords: ["Mary", "John", "book", "both", "desk"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The cat chased ___(1)___ tail. ___(2)___ was very playful. The dog watched ___(3)___ and barked. ___(4)___ both ran around the yard. Later, ___(5)___ rested under the tree.",
        wordBox: ["it", "its", "he", "him", "they", "them", "she"],
        answers: ["its", "It", "it", "They", "they"],
        clueWords: ["cat", "tail", "dog", "both", "tree"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "Tom and Jerry are friends. ___(1)___ play together every day. ___(2)___ share their toys. Sometimes, ___(3)___ argue, but ___(4)___ always make up. ___(5)___ are best friends.",
        wordBox: ["They", "He", "She", "It", "We", "You", "Them"],
        answers: ["They", "They", "they", "they", "They"],
        clueWords: ["Tom", "Jerry", "toys", "argue", "friends"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The teacher gave ___(1)___ a test. ___(2)___ was difficult, but ___(3)___ all tried their best. After the test, ___(4)___ graded the papers. ___(5)___ were proud of their work.",
        wordBox: ["us", "it", "they", "she", "he", "them", "we"],
        answers: ["us", "It", "they", "she", "They"],
        clueWords: ["teacher", "test", "tried", "graded", "proud"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The bird built ___(1)___ nest in the tree. ___(2)___ laid eggs in ___(3)___ nest. The chicks hatched and ___(4)___ chirped loudly. The mother bird fed ___(5)___ worms.",
        wordBox: ["it", "its", "she", "her", "they", "them", "he"],
        answers: ["its", "She", "her", "they", "them"],
        clueWords: ["bird", "nest", "eggs", "chicks", "worms"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The boy dropped ___(1)___ pencil. ___(2)___ picked it up quickly. The girl next to ___(3)___ smiled. ___(4)___ both laughed about it. Later, ___(5)___ gave her a new pencil.",
        wordBox: ["he", "him", "his", "she", "her", "they", "them"],
        answers: ["his", "He", "him", "They", "he"],
        clueWords: ["boy", "pencil", "girl", "laughed", "new"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The dog wagged ___(1)___ tail. ___(2)___ ran to the park. The children played with ___(3)___ . ___(4)___ all had fun together. The dog licked ___(5)___ hands.",
        wordBox: ["it", "its", "he", "him", "they", "them", "us"],
        answers: ["its", "It", "it", "They", "their"],
        clueWords: ["dog", "park", "children", "fun", "hands"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "My sister and I went shopping. ___(1)___ bought new shoes. ___(2)___ tried them on. The shopkeeper helped ___(3)___ . ___(4)___ thanked him. ___(5)___ was very kind.",
        wordBox: ["we", "us", "she", "her", "he", "him", "they"],
        answers: ["We", "We", "us", "We", "He"],
        clueWords: ["sister", "shoes", "shopkeeper", "tried", "kind"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The teacher called ___(1)___ to the front. ___(2)___ asked John a question. ___(3)___ answered correctly. The class clapped for ___(4)___ . ___(5)___ smiled proudly.",
        wordBox: ["he", "him", "she", "her", "they", "them", "us"],
        answers: ["him", "She", "he", "him", "He"],
        clueWords: ["called", "John", "answered", "clapped", "smiled"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The kite flew high. ___(1)___ caught the wind. The boy held ___(2)___ string. His sister watched ___(3)___ . ___(4)___ both cheered loudly. ___(5)___ waved at them.",
        wordBox: ["it", "its", "he", "him", "she", "her", "they"],
        answers: ["It", "its", "it", "They", "she"],
        clueWords: ["kite", "wind", "string", "cheered", "waved"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The baby dropped ___(1)___ toy. ___(2)___ cried loudly. The mother picked ___(3)___ up. ___(4)___ hugged her tightly. ___(5)___ smiled at them.",
        wordBox: ["it", "its", "he", "him", "she", "her", "they"],
        answers: ["its", "He", "him", "She", "they"],
        clueWords: ["baby", "toy", "mother", "hugged", "smiled"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The team won the game. ___(1)___ celebrated together. The coach praised ___(2)___ . ___(3)___ all cheered loudly. The trophy was for ___(4)___ . ___(5)___ held it high.",
        wordBox: ["they", "them", "he", "him", "we", "us", "it"],
        answers: ["They", "them", "They", "them", "They"],
        clueWords: ["team", "celebrated", "coach", "trophy", "held"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The flower lost ___(1)___ petals. ___(2)___ fell to the ground. The girl picked ___(3)___ up. ___(4)___ showed it to her friend. ___(5)___ liked the color.",
        wordBox: ["it", "its", "she", "her", "they", "them", "he"],
        answers: ["its", "They", "them", "She", "he"],
        clueWords: ["flower", "petals", "girl", "showed", "color"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The bus stopped for ___(1)___ . ___(2)___ got on quickly. The driver waved at ___(3)___ . ___(4)___ all sat down. ___(5)___ started the bus again.",
        wordBox: ["we", "us", "they", "them", "he", "him", "it"],
        answers: ["us", "We", "us", "We", "He"],
        clueWords: ["bus", "stopped", "driver", "sat", "started"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The monkey stole ___(1)___ banana. ___(2)___ ate it fast. The zookeeper chased ___(3)___ . ___(4)___ laughed at the monkey. ___(5)___ was funny.",
        wordBox: ["it", "its", "he", "him", "they", "them", "us"],
        answers: ["its", "It", "it", "They", "It"],
        clueWords: ["monkey", "banana", "zookeeper", "laughed", "funny"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The rain wet ___(1)___ clothes. ___(2)___ ran inside. The teacher gave ___(3)___ a towel. ___(4)___ dried off quickly. ___(5)___ thanked her.",
        wordBox: ["he", "him", "she", "her", "they", "them", "us"],
        answers: ["their", "They", "them", "They", "They"],
        clueWords: ["rain", "clothes", "teacher", "dried", "thanked"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The star shone for ___(1)___ . ___(2)___ looked up at it. The boy pointed at ___(3)___ . ___(4)___ all gasped in wonder. ___(5)___ twinkled brightly.",
        wordBox: ["we", "us", "they", "them", "it", "its", "he"],
        answers: ["us", "We", "it", "We", "It"],
        clueWords: ["star", "looked", "pointed", "gasped", "twinkled"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The cake was for ___(1)___ . ___(2)___ cut it into pieces. The girl gave ___(3)___ a slice. ___(4)___ ate it happily. ___(5)___ said it was yummy.",
        wordBox: ["they", "them", "she", "her", "he", "him", "we"],
        answers: ["them", "She", "him", "He", "He"],
        clueWords: ["cake", "cut", "slice", "ate", "yummy"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The MRT took ___(1)___ to school. ___(2)___ stood by the door. The driver helped ___(3)___ . ___(4)___ all thanked him. ___(5)___ was kind.",
        wordBox: ["we", "us", "they", "them", "he", "him", "it"],
        answers: ["us", "We", "us", "We", "He"],
        clueWords: ["MRT", "door", "driver", "thanked", "kind"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The hawker cooked for ___(1)___ . ___(2)___ ordered chicken rice. The plate was for ___(3)___ . ___(4)___ ate it fast. ___(5)___ smiled at them.",
        wordBox: ["he", "him", "she", "her", "they", "them", "us"],
        answers: ["them", "They", "them", "They", "She"],
        clueWords: ["hawker", "ordered", "plate", "ate", "smiled"],
        hint: "Remember to use the objects around you as clues."
      }
    ],
    adjectivesAdverbs: [
      {
        text: "The ___(1)___ cat ran ___(2)___ across the yard. It jumped ___(3)___ onto the fence. The boy watched ___(4)___ as it moved ___(5)___ toward the tree.",
        wordBox: ["quick", "quickly", "high", "highly", "soft", "softly", "careful", "carefully", "silent", "silently"],
        answers: ["quick", "quickly", "high", "carefully", "silently"],
        clueWords: ["cat", "ran", "jumped", "watched", "tree"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ sun shone ___(2)___ in the sky. The children played ___(3)___ in the park. They laughed ___(4)___ as they ran ___(5)___ the slides.",
        wordBox: ["bright", "brightly", "happy", "happily", "loud", "loudly", "down", "slow", "slowly"],
        answers: ["bright", "brightly", "happily", "loudly", "down"],
        clueWords: ["sun", "shone", "children", "laughed", "slides"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ puppy barked ___(2)___ at the mailman. It wagged its tail ___(3)___ when it saw its owner. The owner petted it ___(4)___ and spoke ___(5)___ to it.",
        wordBox: ["small", "smallly", "loud", "loudly", "quick", "quickly", "gentle", "gently", "soft", "softly"],
        answers: ["small", "loudly", "quickly", "gently", "softly"],
        clueWords: ["puppy", "barked", "tail", "petted", "spoke"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ teacher explained the lesson ___(2)___ . The students listened ___(3)___ and took notes ___(4)___ . They all worked ___(5)___ on their assignments.",
        wordBox: ["kind", "kindly", "clear", "clearly", "attentive", "attentively", "careful", "carefully", "hard", "hardly"],
        answers: ["kind", "clearly", "attentively", "carefully", "hard"],
        clueWords: ["teacher", "explained", "listened", "notes", "assignments"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ wind blew ___(2)___ through the trees. The leaves rustled ___(3)___ as they fell ___(4)___ to the ground. The children played ___(5)___ in the park.",
        wordBox: ["strong", "strongly", "soft", "softly", "gentle", "gently", "slow", "slowly", "happy", "happily"],
        answers: ["strong", "strongly", "softly", "slowly", "happily"],
        clueWords: ["wind", "blew", "rustled", "fell", "park"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ kite flew ___(2)___ in the sky. The boy pulled the string ___(3)___ . It rose ___(4)___ above the trees. He smiled ___(5)___ at his success.",
        wordBox: ["colorful", "colorfully", "high", "highly", "tight", "tightly", "quick", "quickly", "happy", "happily"],
        answers: ["colorful", "high", "tightly", "high", "happily"],
        clueWords: ["kite", "flew", "string", "rose", "smiled"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ bird sang ___(2)___ in the morning. It perched ___(3)___ on a branch. The children listened ___(4)___ to the song. The tune was ___(5)___ to hear.",
        wordBox: ["pretty", "prettily", "sweet", "sweetly", "high", "highly", "quiet", "quietly", "nice", "nicely"],
        answers: ["pretty", "sweetly", "high", "quietly", "nice"],
        clueWords: ["bird", "sang", "perched", "listened", "tune"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ rain fell ___(2)___ on the roof. The girl watched ___(3)___ as it dripped ___(4)___ . The sound was ___(5)___ and calming.",
        wordBox: ["heavy", "heavily", "soft", "softly", "careful", "carefully", "slow", "slowly", "gentle", "gently"],
        answers: ["heavy", "heavily", "carefully", "slowly", "gentle"],
        clueWords: ["rain", "fell", "watched", "dripped", "sound"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ boy ran ___(2)___ to the bus. He waved ___(3)___ at his friends. The bus moved ___(4)___ down the road. He sat ___(5)___ in his seat.",
        wordBox: ["fast", "fastly", "quick", "quickly", "happy", "happily", "slow", "slowly", "quiet", "quietly"],
        answers: ["fast", "quickly", "happily", "slowly", "quietly"],
        clueWords: ["boy", "ran", "waved", "moved", "seat"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ cake smelled ___(2)___ in the oven. The baker mixed the batter ___(3)___ . It baked ___(4)___ and turned ___(5)___ brown.",
        wordBox: ["sweet", "sweetly", "nice", "nicely", "careful", "carefully", "slow", "slowly", "golden", "goldenly"],
        answers: ["sweet", "nicely", "carefully", "slowly", "golden"],
        clueWords: ["cake", "smelled", "batter", "baked", "turned"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ dog barked ___(2)___ at strangers. It wagged its tail ___(3)___ for its owner. The owner called ___(4)___ to it. The dog ran ___(5)___ to him.",
        wordBox: ["big", "bigly", "loud", "loudly", "happy", "happily", "soft", "softly", "quick", "quickly"],
        answers: ["big", "loudly", "happily", "softly", "quickly"],
        clueWords: ["dog", "barked", "tail", "called", "ran"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ flowers grew ___(2)___ in the garden. The gardener watered them ___(3)___ . They smelled ___(4)___ and looked ___(5)___ in the sun.",
        wordBox: ["tall", "tallly", "quick", "quickly", "careful", "carefully", "sweet", "sweetly", "pretty", "prettily"],
        answers: ["tall", "quickly", "carefully", "sweetly", "pretty"],
        clueWords: ["flowers", "grew", "watered", "smelled", "looked"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ MRT moved ___(2)___ through the tunnel. The driver worked ___(3)___ . Passengers stood ___(4)___ and waited ___(5)___ for their stations.",
        wordBox: ["fast", "fastly", "smooth", "smoothly", "careful", "carefully", "quiet", "quietly", "calm", "calmly"],
        answers: ["fast", "smoothly", "carefully", "quietly", "calmly"],
        clueWords: ["MRT", "moved", "driver", "passengers", "stations"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The ___(1)___ hawker cooked ___(2)___ for the crowd. The food smelled ___(3)___ and tasted ___(4)___ . Customers ate ___(5)___ at the tables.",
        wordBox: ["busy", "busily", "quick", "quickly", "good", "well", "nice", "nicely", "happy", "happily"],
        answers: ["busy", "quickly", "nice", "well", "happily"],
        clueWords: ["hawker", "cooked", "smelled", "tasted", "tables"],
        hint: "Remember to use the objects around you as clues."
      }
    ],
    tenses: [
      {
        text: "I ___(1)___ to the park yesterday. My friends ___(2)___ there with me. We ___(3)___ games and ___(4)___ a picnic. The sun ___(5)___ brightly all day.",
        wordBox: ["go", "went", "was", "were", "play", "played", "have", "had", "shine", "shone"],
        answers: ["went", "were", "played", "had", "shone"],
        clueWords: ["yesterday", "friends", "games", "picnic", "sun"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "She ___(1)___ her homework now. She ___(2)___ it last night. Her brother ___(3)___ TV while she works. They ___(4)___ dinner later. Yesterday, they ___(5)___ at a restaurant.",
        wordBox: ["do", "does", "did", "watch", "watches", "have", "had", "ate", "eat"],
        answers: ["does", "did", "watches", "have", "ate"],
        clueWords: ["now", "last night", "TV", "dinner", "restaurant"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The dog ___(1)___ in the yard every morning. Yesterday, it ___(2)___ a bone. It ___(3)___ happy when it found it. We ___(4)___ it play. Tomorrow, we ___(5)___ it again.",
        wordBox: ["run", "runs", "find", "found", "is", "was", "watch", "watched", "see", "will see"],
        answers: ["runs", "found", "was", "watched", "will see"],
        clueWords: ["morning", "bone", "happy", "play", "tomorrow"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "We ___(1)___ to school every day. Last week, we ___(2)___ a school trip. The bus ___(3)___ us there. We ___(4)___ fun all day. Tomorrow, we ___(5)___ a test.",
        wordBox: ["go", "went", "take", "took", "have", "had", "write", "will write", "are"],
        answers: ["go", "went", "took", "had", "will write"],
        clueWords: ["every day", "school trip", "bus", "fun", "test"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "He ___(1)___ his bike now. Yesterday, he ___(2)___ to the park. He ___(3)___ with his friends there. They ___(4)___ ice cream after playing. Tomorrow, he ___(5)___ again.",
        wordBox: ["ride", "rides", "go", "went", "play", "played", "eat", "ate", "will go"],
        answers: ["rides", "went", "played", "ate", "will go"],
        clueWords: ["bike", "park", "friends", "ice cream", "tomorrow"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The teacher ___(1)___ the class every day. Last month, she ___(2)___ us a story. We ___(3)___ it very much. Now, we ___(4)___ a new book. Next week, we ___(5)___ a quiz.",
        wordBox: ["teach", "teaches", "tell", "told", "like", "liked", "read", "reads", "will have"],
        answers: ["teaches", "told", "liked", "read", "will have"],
        clueWords: ["class", "story", "liked", "new book", "quiz"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The birds ___(1)___ in the tree now. Yesterday, they ___(2)___ away. They ___(3)___ back today. We ___(4)___ them sing. Tomorrow, they ___(5)___ again.",
        wordBox: ["sing", "sings", "fly", "flew", "come", "came", "hear", "heard", "will sing"],
        answers: ["sing", "flew", "came", "hear", "will sing"],
        clueWords: ["now", "away", "back", "sing", "tomorrow"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "I ___(1)___ my room every weekend. Last weekend, I ___(2)___ it thoroughly. My mom ___(3)___ happy with me. She ___(4)___ me a treat. Next weekend, I ___(5)___ it again.",
        wordBox: ["clean", "cleans", "cleaned", "is", "was", "give", "gave", "will clean"],
        answers: ["clean", "cleaned", "was", "gave", "will clean"],
        clueWords: ["room", "last weekend", "happy", "treat", "next weekend"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "She ___(1)___ to school every day. Yesterday, she ___(2)___ late. Her teacher ___(3)___ her a note. She ___(4)___ it home. Tomorrow, she ___(5)___ early.",
        wordBox: ["go", "goes", "arrive", "arrived", "give", "gave", "take", "took", "will come"],
        answers: ["goes", "arrived", "gave", "took", "will come"],
        clueWords: ["every day", "late", "teacher", "home", "early"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "The cat ___(1)___ on the mat now. Last night, it ___(2)___ a mouse. It ___(3)___ proud of itself. We ___(4)___ it yesterday. Tomorrow, we ___(5)___ it again.",
        wordBox: ["sit", "sits", "catch", "caught", "feel", "felt", "see", "saw", "will watch"],
        answers: ["sits", "caught", "felt", "saw", "will watch"],
        clueWords: ["cat", "mouse", "proud", "yesterday", "tomorrow"],
        hint: "Remember to use the objects around you as clues."
      },
      {
        text: "We ___(1)___ a movie every weekend. Last weekend, we ___(2)___ a comedy. It ___(3)___ us laugh. Now, we ___(4)___ a new one. Next week, we ___(5)___ another.",
        wordBox: ["watch", "watches", "see", "saw", "make", "made", "choose", "chose", "will watch"],
        answers: ["watch", "saw", "made", "choose", "will watch"],
        clueWords: ["movie", "comedy", "laugh", "new", "next week"],
        hint: "Remember to use the objects around you as clues."
      }
    ]
  };

  // Global game state
  let currentGrammarType = "prepositions";
  let currentPassageIndex = 0;
  let score = 0;
  let lives = 0;
  let hintUsage = {};
  let selectedWord = null;

  // DOM Elements
  const grammarSelect = document.getElementById("grammar-type");
  const passageText = document.getElementById("passage-text");
  const wordBox = document.getElementById("word-box");
  const feedbackDisplay = document.getElementById("feedback");
  const nextPassageButton = document.getElementById("next-btn");
  const prevPassageButton = document.getElementById("prev-btn");
  const hintButton = document.getElementById("hint-btn");
  const clearButton = document.getElementById("clear-btn");
  const progressDisplay = document.getElementById("progress");
  const scoreDisplay = document.getElementById("score");
  const livesDisplay = document.getElementById("lives");
  const progressBar = document.getElementById("progress-bar");
  const highlightCluesButton = document.getElementById("highlight-clues-btn");
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const speakPassageBtn = document.getElementById("speak-passage-btn");

  // Speech Synthesis Setup
  const synth = window.speechSynthesis;
  let voices = [];
  let ukFemaleVoice = null;

  function loadVoices() {
    voices = synth.getVoices();
    ukFemaleVoice = voices.find(voice => 
      voice.lang === "en-GB" && 
      (voice.name.includes("Female") || voice.name.includes("Google UK English Female") || voice.name === "Samantha" || voice.name === "Kate")
    ) || voices.find(voice => voice.lang === "en-GB"); // Fallback to any en-GB voice
  }
  loadVoices();
  synth.onvoiceschanged = loadVoices;

  function speak(text) {
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    if (ukFemaleVoice) {
      utterance.voice = ukFemaleVoice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    synth.speak(utterance);
  }

  // Onboarding
  if (!localStorage.getItem("hasSeenTutorial")) {
    alert("Welcome to Grammar Cloze Adventure! Drag or tap a word to fill in each blank. Use the menu for hints and controls!");
    localStorage.setItem("hasSeenTutorial", "true");
    speak("Welcome to Grammar Cloze Adventure! Drag or tap a word to fill in each blank.");
  }

  // Utility Functions
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function updateStatus() {
    scoreDisplay.textContent = `⭐ Score: ${score}`;
    livesDisplay.textContent = `❤️ Lives: ${lives}`;
    progressDisplay.textContent = `📖 Progress: ${currentPassageIndex + 1} / ${passages[currentGrammarType].length}`;
    progressBar.style.width = `${((currentPassageIndex + 1) / passages[currentGrammarType].length) * 100}%`;
  }

  function displayPassage() {
    const passage = passages[currentGrammarType]?.[currentPassageIndex];
    if (!passage) {
      passageText.innerHTML = "<p>Error loading passage.</p>";
      return;
    }
    let passageHTML = passage.text;
    // Process clueWords – assume one clue per blank
    if (passage.clueWords) {
      passage.clueWords.forEach((clue, index) => {
        const blankNum = index + 1;
        const regex = new RegExp(`\\b${clue}\\b`, 'gi');
        passageHTML = passageHTML.replace(regex, `<span class="keyword keyword-${blankNum}">${clue}</span>`);
      });
    }
    passageHTML = passageHTML.replace(/___\((\d+)\)___/g, (_, num) => {
      return `<span class="blank" data-blank="${num}">
                _
                <button class="hint-for-blank" aria-label="Hint for blank ${num}">💡</button>
              </span>`;
    });
    passageText.innerHTML = passageHTML;

    wordBox.innerHTML = shuffle(passage.wordBox)
      .map(word => `<div class="word" draggable="true" tabindex="0">${word}</div>`)
      .join("");

    document.querySelectorAll(".blank").forEach(blank => {
      blank.addEventListener("dragover", handleDragOver);
      blank.addEventListener("dragleave", handleDragLeave);
      blank.addEventListener("drop", handleDrop);
    });

    document.querySelectorAll(".word").forEach(word => {
      word.addEventListener("dragstart", handleDragStart);
      word.addEventListener("dragend", handleDragEnd);
      word.addEventListener("click", function() {
        selectedWord = word;
        document.querySelectorAll(".word").forEach(w => w.classList.remove("selected"));
        word.classList.add("selected");
      });
    });

    // When the hint-for-blank (light bulb) is clicked, highlight the corresponding keyword for that blank.
    document.querySelectorAll(".hint-for-blank").forEach(button => {
      button.addEventListener("click", function() {
        const blankNum = this.parentElement.getAttribute("data-blank");
        // Remove any previous highlighting
        document.querySelectorAll(".keyword").forEach(el => el.classList.remove("highlighted"));
        // Highlight keywords for this blank
        document.querySelectorAll(`.keyword-${blankNum}`).forEach(el => el.classList.add("highlighted"));
        setTimeout(() => {
          document.querySelectorAll(".keyword").forEach(el => el.classList.remove("highlighted"));
        }, 3000);
      });
    });
  }

  // Drag-and-Drop Handlers
  let draggedItem = null;
  function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData("text/plain", e.target.textContent);
    e.target.classList.add("dragging");
  }
  function handleDragEnd(e) {
    e.target.classList.remove("dragging");
    draggedItem = null;
  }
  function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }
  function handleDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }
  function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const droppedWord = e.dataTransfer.getData("text/plain");
    if (e.currentTarget.classList.contains("blank") && !e.currentTarget.classList.contains("filled")) {
      placeWord(e.currentTarget, droppedWord);
      document.querySelectorAll(".word").forEach(word => {
        if (word.textContent === droppedWord) {
          word.parentNode.removeChild(word);
        }
      });
      updateStatus();
    }
  }

  function placeWord(blank, word) {
    blank.textContent = word;
    blank.classList.add("filled");
    checkAnswer(blank);
  }

  function checkAnswer(blank) {
    const blankId = parseInt(blank.getAttribute("data-blank"));
    const userAnswer = blank.textContent.trim().toLowerCase();
    const correctAnswer = passages[currentGrammarType][currentPassageIndex].answers[blankId - 1].toLowerCase();
    if (userAnswer === correctAnswer) {
      blank.classList.add("correct");
      score += 10;
      lives++;
      feedbackDisplay.textContent = "Correct! Great job!";
      feedbackDisplay.style.color = "green";
      speak("Correct! Great job!");
    } else {
      blank.classList.add("incorrect");
      feedbackDisplay.textContent = "Incorrect! Try again.";
      feedbackDisplay.style.color = "red";
      speak("Incorrect! Try again.");
    }
    updateStatus();
  }

  // Menu and Fullscreen Controls
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      document.body.classList.add("fullscreen");
      fullscreenBtn.textContent = "↙";
    } else {
      document.exitFullscreen();
      document.body.classList.remove("fullscreen");
      fullscreenBtn.textContent = "⤢";
    }
  });

  // Game Controls
  grammarSelect.addEventListener("change", function() {
    currentGrammarType = grammarSelect.value;
    currentPassageIndex = 0;
    displayPassage();
    updateStatus();
  });

  nextPassageButton.addEventListener("click", () => {
    currentPassageIndex++;
    if (currentPassageIndex >= passages[currentGrammarType].length) {
      feedbackDisplay.textContent = "Game Over! Final Score: " + score;
      speak("Game Over! Your final score is " + score);
      return;
    }
    displayPassage();
    updateStatus();
    menu.classList.add("hidden");
  });

  prevPassageButton.addEventListener("click", () => {
    if (currentPassageIndex > 0) {
      currentPassageIndex--;
      displayPassage();
      updateStatus();
    }
    menu.classList.add("hidden");
  });

  clearButton.addEventListener("click", () => {
    hintUsage = {};
    selectedWord = null;
    displayPassage();
    menu.classList.add("hidden");
  });

  hintButton.addEventListener("click", () => {
    const passage = passages[currentGrammarType][currentPassageIndex];
    if (passage.hint) {
      feedbackDisplay.textContent = passage.hint;
      feedbackDisplay.style.color = "blue";
      speak(passage.hint);
    }
    menu.classList.add("hidden");
  });

  speakPassageBtn.addEventListener("click", () => {
    const passage = passages[currentGrammarType][currentPassageIndex];
    if (passage.text) {
      const textToSpeak = passage.text.replace(/___\(\d+\)___/g, "blank");
      speak(textToSpeak);
    }
    menu.classList.add("hidden");
  });

  // Initialize Game
  displayPassage();
  updateStatus();
});
