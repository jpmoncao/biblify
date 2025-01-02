import { Link } from "react-router"

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Biblify!</h1>
            <Link to="/nvi">Vamos lá!</Link>
        </div>
    )
}