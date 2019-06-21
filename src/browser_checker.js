class browser {
    constructor(name, min_ver) {
        this.name = name;
        this.min_ver = min_ver;
    }

    isvalid(name, ver) {
        if (name.match(new RegExp(this.name, 'i'))) {
            const _check = compareVersion(this.min_ver, ver);
            return _check;
        } else {
            return false;
        }
    }
}

function checkBrowser(name, ver) {
    var _found = false;
    browsers.forEach(v => {
        if (v.isvalid(name, ver)) _found = true;
    });
    return _found;
}

function compareVersion (target, current) {
    let _t = target.split(".");
    let _c = current.split(".");
    var _v = true;
    for (var i = 0; i < _t.length; i++) {
        if (_v) {
            if (!(_c.length > i)) {
                _v = false;
                break;
            }
            let __t = _t[i];
            let __c = _c[i];
            if (!(__c >= __t)) {
                _v = false;
                break;
            }
            continue;
        }
        break;
    }
    return _v;
}

const browsers = [
    new browser('Chrome', '22'),
    new browser('Firefox', '3'),
    new browser('Opera', '15'),
    new browser('Safari', '6.1')
];

module.exports = () => {
    var object = {
        isvalid: (name, ver) => {
            return checkBrowser(name, ver);
        },
    };
};

module.exports.check = (name, ver) => {
    return checkBrowser(name, ver);
};