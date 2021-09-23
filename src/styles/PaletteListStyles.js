import sizes from './sizes';
import bg from "./bg.svg"


const styles = {
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#1F1BAA',
        // Background from svgbackgrounds.com
        backgroundImage: `URL(${bg})`,
        backgroundAttachment: 'fixed',
        overflow: 'scroll'
    },
    heading: {
        fontSize: '2rem'
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down('xl')]: {
            width: "80%"
        },
        [sizes.down('xs')]: {
            width: "75 %"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: 'center',
        '& a': {
            color: 'white',
            textDecoration: "none"
        },
        '& a:hover': {
            textDecoration: "underline"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        [sizes.down('md')]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: '1.5rem'
        }
    }
}

export default styles;