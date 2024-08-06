// SpotlightSearchBarStyles.js
import styled, { createGlobalStyle } from 'styled-components';
import { ModalLayout, Textarea } from '@strapi/design-system';

// Import the Inter font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    color: #FFFFFF; 
  }
`;

export const SearchbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: 'Inter', sans-serif;
  color: #FFFFFF; 
  border-radius: 12px;
`;

export const SearchbarModal = styled(ModalLayout)`
  width: 850px;
  height: 630px;
  font-family: 'Inter', sans-serif;
  color: #FFFFFF; 
  border-radius: 15px;
`;

export const SearchInput = styled(Textarea)`
  width: 100%;
  margin-bottom: 20px;
  height: 40px;
  font-family: 'Inter', sans-serif;
  color: #FFFFFF; 
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  font-family: 'Inter', sans-serif;
  color: #FFFFFF; 
`;

export const TaskItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  color: #FFFFFF; 
  &:hover {
    background-color: #181826;
  }
`;

export const TaskName = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: #FFFFFF; 
`;

export const TaskShortcut = styled.div`
  margin-left: 28px;  /* Adjust the margin to align properly */
  font-size: 0.9em;
  color: #A9A9A9;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
`;

export const MacShortcut = styled.span`
  font-weight: bold;
`;

export const WindowsShortcut = styled.span`
  font-weight: normal;
`;

export default GlobalStyle;