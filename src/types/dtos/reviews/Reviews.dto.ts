
export interface ReviewDto {
  user: {
    id: string;
    name: string;
    image?: string;
  };
  comment: string;
  qualification: number;
}