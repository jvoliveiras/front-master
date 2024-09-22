import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ToggleColorMode from './ToggleColorMode';
import getSignUpTheme from './theme/getSignUpTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

function TemplateFrame({
                         showCustomTheme,
                         toggleCustomTheme,
                         mode,
                         toggleColorMode,
                         children,
                       }) {

  const signUpTheme = createTheme(getSignUpTheme(mode));

  return (
      <ThemeProvider theme={signUpTheme}>
        <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
          <StyledAppBar>
            <Toolbar
                variant="dense"
                disableGutters
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  p: '8px 12px',
                }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                {/* Aqui você pode adicionar outro conteúdo se necessário */}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ToggleColorMode
                    data-screenshot="toggle-mode"
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                />
              </Box>
            </Toolbar>
          </StyledAppBar>
          <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
        </Box>
      </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
