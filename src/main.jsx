import { createRoot } from 'react-dom/client';

import SankeyDiagram from './sankeyDiagram.jsx';
import ChordDiagram from './chordDiagram.jsx';
import XyPlot from './xyPlot.jsx';

createRoot(document.getElementById('root')).render(
    <div>
      <SankeyDiagram />
      {/* <ChordDiagram />
      <XyPlot /> */}
    </div>  
)
