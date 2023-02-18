import { Post } from 'pages/types/blog.type'
import uuid from 'react-uuid'

export const initialPostList: Post[] = [
  {
    id: uuid(),
    title: 'Lộ trình học Front-end',
    description:
      'Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
    publishDate: new Date().toLocaleString(),
    featuredImage: 'https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png',
    published: true
  },
  {
    id: uuid(),
    title: 'Ngôn ngữ lập trình là gì? Các ngôn ngữ lập trình phổ biến nhất hiện nay',
    description:
      'Ngôn ngữ lập trình là gì, tại sao phải sử dụng ngôn ngữ lập trình để giao tiếp với máy tính?” là câu hỏi được nhiều người mới làm...',
    publishDate: new Date().toLocaleString(),
    featuredImage: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/6498/63ef28d67ef05.jpg',
    published: true
  },
  {
    id: uuid(),
    title: 'Lập trình web là gì? Kỹ năng nào lập trình viên web cần có?',
    description:
      'Dạo trên các cộng đồng, chúng ta đều thấy mọi người nói rằng “lập trình viên website đang rất hot và không sợ thất nghiệp”, vậy...',
    publishDate: new Date().toLocaleString(),
    featuredImage: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/6484/63ec92953fb9b.jpg',
    published: true
  },
  {
    id: uuid(),
    title: 'Thực hành Flexbox!',
    description: 'Mình bảo đảm khi đọc hết bài này: Chỉ cần nhớ ba dòng, chắc chắn bạn thông thạo Flexbox!',
    publishDate: new Date().toLocaleString(),
    featuredImage: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/6294/63da2870cd0db.jpg',
    published: true
  }
]
export const postDefault: Post = {
  id: uuid(),
  title: '',
  description: '',
  publishDate: '',
  featuredImage: '',
  published: false
}
