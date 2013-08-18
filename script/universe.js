/**
 * Created with JetBrains WebStorm.
 * User: Миша
 * Date: 11.08.13
 * Time: 14:00
 * To change this template use File | Settings | File Templates.
 */
var Universe = new function () {
    var self = this;
    var cells = new matrix(100, 100);
    var planetNames = ["Eros", "Gaspra", "Ida", "Mathilde", "Kalliope", "Iapetus", "Phoebe", "Epimetheus"];
    var ShipNames = ["The Crusher", "The Aldemarin Comet", "The Jovian Corsair", "The Stoorkoian Death", "The Mars Star"]
    var goods = [
        {name: "Spice", wight: 1},
        {name: "Uranium", wight: 7},
        {name: "Unobtanium", wight: 5},
        {name: "Parts of Droids", wight: 25},
        {name: "Space dust", wight: 1}
    ]
    var planetsFullNames = [];
    var planets = [];
    var Ships = [];
    self.bigBang = function () {
        generatePlanets(50);
        createShip();
        console.log(planets);
        console.log(getNearPlanet());
    };

    self.getCells = function () {
        return cells;
    };

    self.getCell = function (posotion) {
        return cells[posotion.x][posotion.y];
    };
    self.reportSomeCell = function () {
        console.log(getRandomCell());
    };
    self.reportCell = function (x, y) {
        if (typeof (cells[x][y]) == "object") {
            return cells[x][y]
        }
        else console.log("This part of the the universe is not presented on map");
    };

    self.moveShip = function (ship, position, callback) {
        self.getCell(ship.reportPosition()).ship = null;
        self.getCell(position).ship = ship;
        if (typeof (callback) == "function")callback("ok");
    };

    self.moveShipToPlanet = function (ship, planetName, callback) {
        var planetPosition = getPlanetPositionByName(planetName);
        if (planetPosition) {
            self.getCell(ship.reportPosition()).ship = null;
            self.getCell(planetPosition).ship = ship;
            if (typeof (callback) == "function")callback("ok");
        } else {
            if (typeof (callback) == "function")callback("No such planet found");
        }
    };

    function generatePlanets(count) {
        setPlanetsFullNames();
        for (var i = 0; i < count; i++) {
            var cell = getRandomCell();

            if (cell.planet == null) {
                cell.planet = new planet(getPlanetName(), cell.coords, getRandomCargo());
                planets.push(cell.planet)
            }
            else {
                i--;
            }
        }
    };

    function matrix(rows, columns) {
        var arr = new Array();
        for (var i = 0; i < columns; i++) {
            arr[i] = new Array();
            for (var j = 0; j < rows; j++) {
                arr[i][j] = {
                    planet: null,
                    ship: null,
                    coords: {x: i, y: j}
                };
            }
        }
        return arr;
    };

    function setPlanetsFullNames() {
        for (i in planetNames) {
            planetsFullNames.push({
                name: planetNames[i],
                number: 1
            })
        }
    };

    function getNearPlanet() {
        var min = findPathLength(planets[0].reportPosition(), planets[1].reportPosition());
        var NearestPlanet = null;
        for (i in planets) {
            var l = findPathLength({x: 50, y: 50}, planets[i].reportPosition());
            if (l < min) {
                min = l
                NearestPlanet = planets[i];
            }
        }
        return{
            min: min,
            planet: NearestPlanet
        }
    };

    function getPlanetPositionByName(name) {
        for (var i in planets) {
            if (planets[i].reportName() == name) return  planets[i].reportPosition();
        }
        return -1;
    };

    function findPathLength(coords1, coords2) {
        var x1 = coords1.x;
        var y1 = coords1.y;
        var x2 = coords2.x;
        var y2 = coords2.y;
        var PathLength = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return PathLength;
    };

    function getPlanetName() {
        var index = Math.floor(Math.random() * planetsFullNames.length);
        var planetNumber = planetsFullNames[index].number == 1 ? "" : "-" + planetsFullNames[index].number;
        planetsFullNames[index].number++;
        var newName = planetsFullNames[index].name + planetNumber;
        return newName;
    };

    function createShip(_name, _position, _maxcago) {
        var name = name ? name : ShipNames[Math.floor(Math.random() * ShipNames.length)];
        var position = _position ? _position : getRandomCell().coords;
        var maxcargo = _maxcago ? _maxcago : Math.floor(Math.random() * 100);
        newShip = new ship(name, position, maxcargo);
        Ships.push(newShip)
        console.log(newShip);
        newShip.reportPosition();
    };

    function generateCargo() {
        var index = Math.floor(Math.random() * goods.length);
        var _cargo = goods[index];
        var cargo = {
            name: _cargo.name,
            wight: _cargo.wight,
            quantity: Math.floor(Math.random() * 500) + 200
        }
        return cargo;
    };

    function getRandomCargo() {
        var seed = Math.floor(Math.random() * 1000);
        if (seed % 4 == 0) {
            return null
        } else {
            return generateCargo()
        }
    };


    function getRandomCell() {
        return cells[getRandomInt(0, 99)][getRandomInt(0, 99)];
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

} ;