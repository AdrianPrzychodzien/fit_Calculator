"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
// import Chart from '../../Chart/Chart'
var reactstrap_1 = require("reactstrap");
var classnames_1 = require("classnames");
var equations_1 = require("../../../util/equations");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var WeightTrackerData = function (_a) {
    var userData = _a.userData;
    var _b = react_1.useState('Chart'), activeTab = _b[0], setActiveTab = _b[1];
    var toggle = function (tab) {
        if (activeTab !== tab)
            setActiveTab(tab);
    };
    var dailyWeightArray = userData.dailyWeightArray, height = userData.height, start = userData.start, finish = userData.finish;
    var _c = equations_1.displayAverageWeight(dailyWeightArray, equations_1.getActualWeekDates), thisWeekAvg = _c[0], lastWeekAvg = _c[1], beforeLastWeekAvg = _c[2];
    var historyItems = dailyWeightArray
        .slice(0)
        .reverse()
        .map(function (item, index) {
        var itemBMI = (item.weight / ((height / 100) * (height / 100))).toFixed(2);
        var el = dailyWeightArray.slice(0).reverse();
        var icon = (index + 1) < dailyWeightArray.length && (item.weight - el[index + 1].weight > 0
            ? free_solid_svg_icons_1.faArrowUp : item.weight - el[index + 1].weight < 0
            ? free_solid_svg_icons_1.faArrowDown : free_solid_svg_icons_1.faEquals);
        return (<tr key={item.date}>
          <td>{item.date}</td>
          <td>{item.weight} kg</td>
          <td style={{ color: equations_1.rangeBMIColor(itemBMI), fontWeight: 'bold' }}>{itemBMI}</td>
          <td style={{ color: equations_1.rangeBMIColor(itemBMI) }}>
            {icon && <react_fontawesome_1.FontAwesomeIcon className="" icon={icon}/>}
          </td>
        </tr>);
    });
    return (<div>
      <reactstrap_1.Nav tabs className="d-flex justify-content-center">
        <reactstrap_1.NavItem>
          <reactstrap_1.NavLink className={classnames_1.default({ active: activeTab === 'Chart' })} onClick={function () { toggle('Chart'); }}>
            Chart
          </reactstrap_1.NavLink>
        </reactstrap_1.NavItem>

        <reactstrap_1.NavItem>
          <reactstrap_1.NavLink className={classnames_1.default({ active: activeTab === 'History' })} onClick={function () { toggle('History'); }}>
            History
          </reactstrap_1.NavLink>
        </reactstrap_1.NavItem>

        <reactstrap_1.NavItem>
          <reactstrap_1.NavLink className={classnames_1.default({ active: activeTab === 'Stats' })} onClick={function () { toggle('Stats'); }}>
            Statistics
          </reactstrap_1.NavLink>
        </reactstrap_1.NavItem>
      </reactstrap_1.Nav>

      
      <reactstrap_1.TabContent activeTab={activeTab}>
        {start && finish && dailyWeightArray.length > 0 &&
        <reactstrap_1.TabPane tabId="Chart">
            <reactstrap_1.Row>
              <reactstrap_1.Col sm="12">
                <p className="h6 text-center my-3">
                  Start day was on {equations_1.myDateFormat(start)} <br />
                  Finish will be on {equations_1.myDateFormat(finish)}
                </p>
              </reactstrap_1.Col>
            </reactstrap_1.Row>

            
          </reactstrap_1.TabPane>}
        
        <reactstrap_1.TabPane tabId="History">
          <reactstrap_1.Row>
            <reactstrap_1.Col sm="12">
              <p className="h6 text-center my-3">
                Check your weight log
                </p>
            </reactstrap_1.Col>
          </reactstrap_1.Row>
          <reactstrap_1.Table size="sm" striped>
            <thead className="text-center">
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>BMI</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {historyItems}
            </tbody>
          </reactstrap_1.Table>
        </reactstrap_1.TabPane>

        
        <reactstrap_1.TabPane tabId="Stats">
          <reactstrap_1.Row>
            <reactstrap_1.Col sm="12">
              <div className="h6 text-center my-3">
                Some statistics...
              </div>
            </reactstrap_1.Col>
          </reactstrap_1.Row>
          <div className="h6 my-1">
            <p>You already <b>{equations_1.loseOrGain(userData)}</b></p>
            <p>Average weight in actual week: <b>{thisWeekAvg}{thisWeekAvg !== 'no data' && 'kg'}</b></p>
            <p>Average weight one week before: <b>{lastWeekAvg}{lastWeekAvg !== 'no data' && 'kg'}</b></p>
            <p>Average weight two weeks before: <b>{beforeLastWeekAvg}{beforeLastWeekAvg !== 'no data' && 'kg'}</b></p>
          </div>
        </reactstrap_1.TabPane>
      </reactstrap_1.TabContent>
    </div>);
};
var mapStateToProps = function (_a) {
    var data = _a.data;
    return ({
        userData: data
    });
};
exports.default = react_redux_1.connect(mapStateToProps, null)(WeightTrackerData);
