/* Botal Ghumao — Spin the Bottle (Desi Edition)
   Content: prompt packs + category metadata.
   Edit this file to add/remove/change prompts — no need to touch app.js. */

const PROMPTS = {
  icebreaker: [
    "Tumhara sabse embarrassing school ka kissa kya hai?",
    "Agar tumhe ek superpower milta, kaunsa lete aur kyun?",
    "Sabse pehla crush kaun tha, sach sach batao!",
    "Tumhari mummy ka sabse famous dialogue kya hai?",
    "Agar ek din ke liye Bollywood star ban sakte, kaun bante?",
    "Sabse weird cheez jo tumne kabhi khayi ho, batao.",
    "Group mein sabse zyada 'call kiya tha' bolne wala kaun hai?",
    "Tumhare phone mein sabse purana photo kiska hai?",
    "Agar lottery lag jaye, sabse pehle kya kharidoge?",
    "Sabse zyada dar kis cheez se lagta hai?",
    "Ek aisi cheez batao jo sab tumhare baare mein nahi jaante.",
    "Tumhara favorite bachpan ka khel kaunsa tha?"
  ],
  dare: [
    "30 second tak apni best filmy villain wali entry karo.",
    "Group ke kisi member ko ek filmy dialogue mein propose karo.",
    "Apni awaaz mein news anchor ban ke aaj ka din describe karo.",
    "Bina haath use kiye ek biscuit khao.",
    "Ek minute tak sirf Hindi mein baat karo, chahe kitna mushkil ho.",
    "Apna favorite item number 15 second gaao aur naacho.",
    "Kisi ek member ki nakal utaro, sab guess karenge kaun.",
    "Apne crush ko 'I like you' bolne ka acting karo (real message nahi).",
    "Ek selfie lo sabse funny face banake.",
    "5 push-ups lagao ya ek gaana poora gaao — tumhari choice."
  ],
  bollywood: [
    "SRK ya Salman — favourite batao aur reason do, warna ek dare karo.",
    "Ek gaane ki 2 lines gaao jisme tumhara naam fit ho jaye.",
    "Woh sad song bologe jo breakup pe sabse zyada sunte ho.",
    "Apne favorite movie ka ek scene 15 second mein recreate karo.",
    "Best Bollywood dialogue bolo dramatic andaaz mein.",
    "Agar tumhari life pe movie bane, uska naam kya hoga?"
  ],
  deep: [
    "Zindagi mein sabse bada risk kya liya hai?",
    "Kaunsi cheez hai jo tumhe bolne mein abhi tak dar lagta hai?",
    "Agar ek cheez apne past mein badal sakte, kya badalte?",
    "Sabse zyada kis insaan ne inspire kiya hai tumhe?",
    "Tumhara sabse bada sapna kya hai jo abhi tak kisi ko nahi bataya?",
    "Kaunsi baat tum apne 15 saal ke khud ko batana chahoge?"
  ]
};

const TAG_META = {
  icebreaker: { label: "Icebreaker", cls: "tag-icebreaker" },
  dare: { label: "Dare", cls: "tag-dare" },
  bollywood: { label: "Bollywood Masala", cls: "tag-bollywood" },
  deep: { label: "Deep Talk", cls: "tag-deep" }
};
