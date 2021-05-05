import lightStyles from "./App.module.css"
import { useTheme } from "./contexts/Provider"
import darkStyles from "./DarkApp.module.css"
import Navbar from "./navbar/Navbar"
import Toolbar from "./toolbar/Toolbar"
import WordTable from "./wordTable/WordTable"

function App() {
    const [darkTheme] = useTheme()
    const styles = darkTheme ? darkStyles : lightStyles
    return (
        <div className={styles.page} style={{ minHeight: window.innerHeight }}>
            <Navbar></Navbar>
            <Toolbar></Toolbar>
            <WordTable></WordTable>
        </div>
    )
}

export default App
