const generatePost = (skip: string) => {
  const samplePosts = [
    'ROTC experience is mediocre in this University.',
    'Sira naman aircon dito sa isang specific na college building. Kailan niyo aayusin UD!!',
    'Malas naman, there are no parking spots dito sa Oval. UD do better kasi ang taas ng tuition pero mediocre ang experience.',
    'Looking for iphone 11 pm me po if you sell one. Price negotiable :)',
    'No KathNiel No Life :<',
    "The same people who talk about justice, fairness, and human rights are the same people who spread an unproven rumor about someone. You guys are about to destroy someone else's life with your one-sided judgment.",
    "Hello! since this is a freedom wall. gusto ko lang humingi ng advice about relationship. i've been dating this girl for quite some time now.\n\nsa mga may jowa dyan na matagal na and currently in a relationship, how do you maintain a long lasting relationship? and paano pa ba dumiskarte sa chat and sa personal. yung matinong sagot po sana. thank you",
    'In their post consideration will be given to students who will be late or absent during the transport strike. Hope they will be true to their word. Because their instructors seem to find it hard to give consideration to their student/s who were absent due to illness, even with medical certificate 😥',
    'grabe ang tibay ng UD. May transport strike, paru-paro festival, at umuulan na then wala pa rin announcement.',
    "No matter who you are and what your status is, your words matter. It can be a sword that helps or hurts others. I just want to remind people to be mindful with their words because it doesn't mean you are having a bad day is that you are entitled to say mean things or hurt other people through the words you say to them. Be kind. You may be going through something but so are they.",
  ];

  let idx: number = 0;
  let terminateLoop = false;

  while (!terminateLoop) {
    idx = Math.floor(Math.random() * samplePosts.length);
    if (samplePosts[idx] !== skip) terminateLoop = true;
  }

  return samplePosts[idx];
};

export default generatePost;
