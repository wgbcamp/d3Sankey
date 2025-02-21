import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from "react";

import ChordDiagram from './chordDiagram.jsx';
import XyPlot from './xyPlot.jsx';

createRoot(document.getElementById('root')).render(
    <div>
      <ChordDiagram />
      <XyPlot />
    </div>  
)
