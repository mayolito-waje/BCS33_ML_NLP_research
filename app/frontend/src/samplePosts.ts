const generatePost = (skip: string) => {
  const samplePosts = [
    'ROTC experience is mediocre in this University.',
    'Sira naman aircon dito sa isang specific na college building. Kailan niyo aayusin UD!!',
    'Malas naman, there are no parking spots dito sa Oval. UD do better kasi ang taas ng tuition pero mediocre ang experience.',
    'Looking for iphone 11 pm me po if you sell one. Price negotiable :)',
    'No KathNiel No Life :<',
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
