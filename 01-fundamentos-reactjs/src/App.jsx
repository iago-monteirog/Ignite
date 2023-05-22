import { Post } from "./components/Post"

export function App() {

  return (
    <>
      <Post
        author="Iago Garcia"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae incidunt molestias sequi. Ea, id optio omnis qui accusamus unde doloremque at deleniti, facilis dignissimos sequi, magnam magni modi quam iure?"
      />

      <Post
        author="Diego Fernandes"
        content="Um novo post mt legal"
      />
    </>
  )
}

