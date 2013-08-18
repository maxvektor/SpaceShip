var ship = function (_name, _position, _maxcargo) {
    var self = this;
    var maxcargo = _maxcargo;
    var coords = _position ? _position : {
        x: 0,
        y: 0
    };
    var cell = Universe.getCell(coords);

    var name = name;

    self.reportPosition = function () {
        return coords;
    }

    self.reportName = function () {
        return name;
    }

    self.getCargo = function () {

    }

    self.flyTo = function (option, option2) {
        if (typeof option == typeof option2 == "number") {
            if (option != coords.x && option2 != coords.y)flyToCoords(option, option2);
        }
        if (typeof option2 == "undefined")
            switch (typeof option) {
                case "array":
                    flyToCoords(option[0], option[1]);
                    break;
                case  "object":
                    flyToCoords(option.x, option.y)
                    break;
                case "srting":
                    flyToPlanet(option);
                    break;
                default:
                    console.log("Unable to find this location");
            }
    }

    function flyToCoords(_x, _y) {
        try {
            Universe.moveShip(self, {x: _x, y: _y}, successLanding);
        }
        catch (e) {
            console.log("Something wrong with your navigation system.");
            self.reportPosition();
        }
    }

    function flyToPlanet() {
        U
    }

    function successLanding(message) {
        console.log("message");
    }

}