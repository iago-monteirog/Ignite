import { Header } from "./components/Header/Header"
import { Post, PostType } from "./components/Post/Post"
import './global.css'
import styles from './App.module.css';
import { Sidebar } from "./components/Sidebar/Sidebar";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/azabraao.png',
      name: 'Abraao Azevedo',
      role: 'Mobile Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala DEEEV 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀', },
      { type: 'link', content: '👉jane.design / doctorcare', },
    ],
    publishedAt: new Date('2023-05-23 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/iago-monteirog.png',
      name: 'Iago Garcia',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀', },
      { type: 'link', content: '👉jane.design / doctorcare', },
    ],
    publishedAt: new Date('2023-05-24 20:00:00')
  }
]

export function App() {

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                post={post}
                key={post.id}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}

