"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var reactstrap_1 = require("reactstrap");
var classnames_1 = require("classnames");
var equations_1 = require("../../../util/equations");
var Macronutrients = function (_a) {
    var userData = _a.userData;
    var _b = react_1.useState('Maintenance'), activeTab = _b[0], setActiveTab = _b[1];
    var toggle = function (tab) {
        if (activeTab !== tab)
            setActiveTab(tab);
    };
    var formula = userData.formula;
    var formulaOption = formula === 'MifflinStJeor' ?
        equations_1.MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
        equations_1.HarrisBenedict(userData) : equations_1.KatchMcardle(userData);
    var kcalAmount = activeTab === 'Maintenance' ?
        formulaOption : activeTab === 'Cutting' ?
        formulaOption - 500 : formulaOption + 500;
    var _c = equations_1.ModerateCarb(kcalAmount), proteinModerate = _c[0], carbsModerate = _c[1], fatsModerate = _c[2];
    var _d = equations_1.LowCarb(kcalAmount), proteinLow = _d[0], carbsLow = _d[1], fatsLow = _d[2];
    var _e = equations_1.HighCarb(kcalAmount), proteinHigh = _e[0], carbsHigh = _e[1], fatsHigh = _e[2];
    return (<div>
      <reactstrap_1.Nav tabs className="d-flex justify-content-center">
        <reactstrap_1.NavItem>
          <reactstrap_1.NavLink className={classnames_1.default({ active: activeTab === 'Maintenance' })} onClick={function () { toggle('Maintenance'); }}>
            Maintenance
          </reactstrap_1.NavLink>
        </reactstrap_1.NavItem>

        <reactstrap_1.NavItem>
          <reactstrap_1.NavLink className={classnames_1.default({ active: activeTab === 'Cutting' })} onClick={function () { toggle('Cutting'); }}>
            Cutting
          </reactstrap_1.NavLink>
        </reactstrap_1.NavItem>

        <reactstrap_1.NavItem>
          <reactstrap_1.NavLink className={classnames_1.default({ active: activeTab === 'Bulking' })} onClick={function () { toggle('Bulking'); }}>
            Bulking
          </reactstrap_1.NavLink>
        </reactstrap_1.NavItem>
      </reactstrap_1.Nav>

      
      <reactstrap_1.TabContent activeTab={activeTab}>
        <reactstrap_1.TabPane tabId="Maintenance">
          <reactstrap_1.Row>
            <reactstrap_1.Col sm="12">
              <p className="h6 text-center my-3">
                These macronutrient values reflect your maintenance calories
                of {kcalAmount} kcal per day.
                </p>
            </reactstrap_1.Col>
          </reactstrap_1.Row>
          <reactstrap_1.Table>
            <thead className="text-center">
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Protein</td>
                <td>{proteinModerate}g</td>
                <td>{proteinLow}g</td>
                <td>{proteinHigh}g</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{carbsModerate}g</td>
                <td>{carbsLow}g</td>
                <td>{carbsHigh}g</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{fatsModerate}g</td>
                <td>{fatsLow}g</td>
                <td>{fatsHigh}g</td>
              </tr>
            </tbody>
          </reactstrap_1.Table>
        </reactstrap_1.TabPane>

        
        <reactstrap_1.TabPane tabId="Cutting">
          <reactstrap_1.Row>
            <reactstrap_1.Col sm="12">
              <p className="h6 text-center my-3">
                These macronutrient values reflect your maintenance calories
                of {kcalAmount} kcal per day, which is a 500 calories deficit.
                </p>
            </reactstrap_1.Col>
          </reactstrap_1.Row>
          <reactstrap_1.Table>
            <thead className="text-center">
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Protein</td>
                <td>{proteinModerate}g</td>
                <td>{proteinLow}g</td>
                <td>{proteinHigh}g</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{carbsModerate}g</td>
                <td>{carbsLow}g</td>
                <td>{carbsHigh}g</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{fatsModerate}g</td>
                <td>{fatsLow}g</td>
                <td>{fatsHigh}g</td>
              </tr>
            </tbody>
          </reactstrap_1.Table>
        </reactstrap_1.TabPane>

        
        <reactstrap_1.TabPane tabId="Bulking">
          <reactstrap_1.Row>
            <reactstrap_1.Col sm="12">
              <p className="h6 text-center my-3">
                These macronutrient values reflect your maintenance calories
                of {kcalAmount} kcal per day, which is a 500 calories surplus.
                </p>
            </reactstrap_1.Col>
          </reactstrap_1.Row>
          <reactstrap_1.Table>
            <thead className="text-center">
              <tr>
                <th>Macro</th>
                <th>Medium Carb</th>
                <th>Low Carb</th>
                <th>High Carb</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Protein</td>
                <td>{proteinModerate}g</td>
                <td>{proteinLow}g</td>
                <td>{proteinHigh}g</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{carbsModerate}g</td>
                <td>{carbsLow}g</td>
                <td>{carbsHigh}g</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{fatsModerate}g</td>
                <td>{fatsLow}g</td>
                <td>{fatsHigh}g</td>
              </tr>
            </tbody>
          </reactstrap_1.Table>
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
exports.default = react_redux_1.connect(mapStateToProps, null)(Macronutrients);
