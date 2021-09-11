import {drawerWidth} from './constants'

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20
      },
      hide: {
        display: "none"
      },
      navBtns: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        marginRight: "1rem",
        '& a': {
            textDecoration: "none"
        },
        '& button': {
            margin: "5px"
        }
      }
});

export default styles;