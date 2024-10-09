function calculateScore(userTranslation: string, accurateTranslation: string): number {
  const userWords = userTranslation.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  const accurateWords = accurateTranslation.toLowerCase().split(/\s+/).filter(word => word.length > 2);

  // Word match score (50% of total score)
  const wordMatches = userWords.filter(word => accurateWords.includes(word));
  const wordMatchScore = (wordMatches.length / accurateWords.length) * 50;

  // Word order score (30% of total score)
  let orderScore = 0;
  let lastIndex = -1;
  for (const word of userWords) {
    const index = accurateWords.indexOf(word);
    if (index > lastIndex) {
      orderScore++;
      lastIndex = index;
    }
  }
  const wordOrderScore = (orderScore / accurateWords.length) * 30;

  // Length similarity score (20% of total score)
  const lengthDifference = Math.abs(userWords.length - accurateWords.length);
  const lengthSimilarityScore = Math.max(0, 20 - (lengthDifference * 2));

  // Calculate total score
  const totalScore = Math.round(wordMatchScore + wordOrderScore + lengthSimilarityScore);

  return Math.min(100, Math.max(0, totalScore)); // Ensure score is between 0 and 100
}

export default calculateScore;