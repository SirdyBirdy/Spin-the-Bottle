/* Spin — Spin the Bottle
   Content: prompt packs + category metadata.
   Edit this file to add/remove/change prompts — no need to touch app.js. */

const PROMPTS = {
  icebreaker: [
    "What's a small thing that instantly puts you in a good mood?",
    "What's the last thing you Googled?",
    "What's a skill you wish you'd learned but never got around to?",
    "What's your most-used emoji, and does it actually match your personality?",
    "If you could instantly master one skill, what would it be?",
    "What's a food combination you love that most people find strange?",
    "What's the most useless talent you have?",
    "If your life had a soundtrack, what song would be playing right now?",
    "What's something you believed as a kid that turned out to be completely wrong?",
    "What's a movie or show you pretend to have seen but haven't?",
    "What's the best piece of advice you've ever ignored?",
    "If you swapped lives with the person to your left for a day, what's the first thing you'd do?"
  ],
  dare: [
    "Do your best impression of someone else in this room until they guess who.",
    "Let the group scroll through your camera roll for 10 seconds.",
    "Talk in an accent of the group's choosing for the next two minutes.",
    "Do 10 seconds of the most dramatic slow-motion run you can manage.",
    "Send a message to a random contact saying 'you up?' — nothing else.",
    "Let the person on your right style your hair for the rest of the round.",
    "Attempt to lick your elbow. Everyone deserves to try.",
    "Do your best red-carpet pose for a photo.",
    "Speak only in questions for the next two turns.",
    "Hold a straight face for 30 seconds while the group tries to make you laugh."
  ],
  wildcard: [
    "You can only eat one meal for the rest of your life — what is it?",
    "Would you rather read minds or see 24 hours into the future?",
    "You're given a time machine but can only use it once — when do you go?",
    "What's one rule you'd add if you were in charge of the world for a day?",
    "Would you rather lose your sense of smell or your sense of taste?",
    "If you had a warning label, what would it say?",
    "You wake up tomorrow with one new ability — what do you hope it is?",
    "Would you rather always be 10 minutes late or always 20 minutes early?",
    "If you could delete one invention from history, what would it be?",
    "What's a completely made-up fact you could convince this group is true?"
  ],
  deep: [
    "What's the biggest risk you've ever taken?",
    "What's something you find hard to say out loud, even to people close to you?",
    "If you could change one decision from your past, what would it be?",
    "Who has influenced your life the most, and how?",
    "What's a dream you haven't told anyone about yet?",
    "What would you want to tell your younger self?"
  ]
};

const TAG_META = {
  icebreaker: { label: "Icebreaker", cls: "tag-icebreaker" },
  dare: { label: "Dare", cls: "tag-dare" },
  wildcard: { label: "Wildcard", cls: "tag-wildcard" },
  deep: { label: "Deep Talk", cls: "tag-deep" }
};
