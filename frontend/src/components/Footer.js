import './Footer.css'
export const Footer = () => {
  const date = new Date().getFullYear()

    return (
        <footer id="footer">
            <p>ReactGram &copy; {date}</p>
        </footer>
  )
}
