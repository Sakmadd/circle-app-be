class FeedDto {
  content: string;
  image: string;
  authorId: number;
  constructor({ content, image, authorId }) {
    this.authorId = authorId;
    this.content = content;
    this.image = image;
  }
}

export default FeedDto;
