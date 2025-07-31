 
type Comment = {
  qualification: number;
};

export function getAverageRating(userComments: Comment[]): number {
  if (userComments.length === 0) return 0;

  const total = userComments.reduce((sum, comment) => sum + comment.qualification, 0);
  return total / userComments.length;
}
