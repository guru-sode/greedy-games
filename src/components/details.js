import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function details() {

  return (
    <div>
      <Paper>
        <Typography variant="h5" component="h3">
          Details about Installation and User Document
        </Typography>
        <Typography component="p">
            <ul className="details"> Installation:
          <li>This project is built using 'create-react-app'</li>
          <li>Clone the project from <a href="https://github.com/guru-sode/greedy-games">github</a></li>
          <li>Run - npm install</li>
          <li>Start using command - npm start</li>
          </ul>
          <ul className="details"> Packages used:
          <li> Material UI </li>
          <li> ReCharts</li>
          <li>React table</li>
          <li>Moment JS</li>
          </ul>
          <ul className="details"> Using this assignment:
          <li> There are three tabs details, grahical representation and tabular representation </li>
          <li> Graph is ploted based on the date range selected by the user. Future dates are blocked</li>
          <li>If user selects invalid date range or no data is availabe in that range graph and table will be blank</li>
          <li>Table has pagination feature with customised page size</li>
          <li>UI will handle connectibity problems or broken API end point</li>
          </ul>
          <ul className="details"> Future improvements:
          <li>Implementation of redux</li>
          <li>Handling limited connectivity by introducing Promise.race() concept</li>
          <li>Introducing spinners during loading</li>
          <li>Introducing middlewares like thunk, saga or axios</li>
          </ul>
        </Typography>
      </Paper>
    </div>
  );
}

export default details;