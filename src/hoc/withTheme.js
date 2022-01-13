import React from 'react';
import { ThemeContext } from '../components/theme-context';

const withTheme = (Wrapped) => {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {
          ({ theme, toggleTheme }) => (
            <Wrapped {...props} theme={theme} toggleTheme={toggleTheme} />
          )
        }
      </ThemeContext.Consumer>
    );
  }
};

export default withTheme;
