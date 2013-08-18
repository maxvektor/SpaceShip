var planet = function (_name, _position, _cargo) {
    var self = this;

    var name = _name;
    var cargo = [];
    if (_cargo)cargo.push(_cargo);

    var coords = _position ? _position : {
        x: 0,
        y: 0
    };
       self.cargo=cargo;
    self.reportPosition = function () {
        return coords;
    }

    self.reportName = function () {
        return name;
    }

    self.getCargo = function (_cargo, callback) {
        var index = indexOfCargo(_cargo.name);
        if (!index) {
            cargo.push(_cargo);
        } else {
            cargo[index].quantity += _cargo.quantity;
        }
        if (typeof (callback) == "function") callback();
    }

    function indexOfCargo(cargoName) {
        for (var i in cargo) {
            if (cargo[i].name == cargoName) return true;
        }
        return -1;
    }


};