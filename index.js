console.log("Hello World");

//Switch Case
function reactWithEmotion(emotion) {
  let reaction_text = "";
  switch (emotion) {
    case "angry":
      reaction_text = "I am angry >:(";
      break;

    case "happy":
      reaction_text = "I am happy XD";
      break;

    case "sad":
      reaction_text = "I am sad =(";
      break;

    default:
      reaction_text = "I feel despair";
      break;
  }

  return reaction_text;
}

console.log(reactWithEmotion("dsdsds"));
