import React, { Context } from 'react';

// Interface
import { ContextInterface } from './Interface';

const Context: Context<ContextInterface> = React.createContext(null);

export const { Provider } = Context;
export default Context;
