import sizes from './sizes';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down('xl')]: {
            width: "80%"
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
        gridGap: "5%",
        [sizes.down('sm')]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: "repeat(1, 100%)",
        }
    }
}

export default styles;