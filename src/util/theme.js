export default {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  formInput: {
    formInput: {
      '& .group': {
        position: 'relative',
        margin: '25px 0',
      },
      '& .form-input': {
        background: 'none',
        backgroundColor: 'white',
        color: 'grey',
        fontSize: 18,
        padding: '10px 10px 10px 5px',
        display: 'block',
        width: '100%',
        border: 'none',
        borderRadius: 10,
        borderBottom: '2px solid grey',
        margin: '10px 0',

        '&:focus': {
          outline: 'none'
        },

        '&:focus ~ .form-input-label': {
          top: '-14px',
          fontSize: '12px',
          color: 'black'
        }
      },
      '& input[type="password"]': {
        letterSpacing: '0.3em'
      },

      '& .form-input-label': {
        color: 'grey',
        fontSize: 16,
        fontWeight: 'normal',
        position: 'absolute',
        pointerEvents: 'none',
        left: 5,
        top: 10,
        transition: '300ms ease all',

        '&.shrink': {
          top: '-14px',
          fontSize: '12px',
          color: 'black'
        }
      }
    }
  }
}