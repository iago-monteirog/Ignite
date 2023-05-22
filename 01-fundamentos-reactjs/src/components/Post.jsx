export function Post({ content, author }) {
    return (
        <>
            <strong>{author}</strong>
            <p>{content}</p>
        </>
    )
}