function getKey(key) {
    var intKey = parseInt(key, 10);
    return intKey.toString() === key ? intKey : key;
}

function hasShallowProperty(obj, prop) {
    // to handle objects with null prototypes (too edge case?)
    if (obj === null) {
        return false;
    }

    if (typeof prop === 'number' && Array.isArray(obj)) {
        return true;
    }

    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function getShallowProperty(obj, prop) {
    if (hasShallowProperty(obj, prop)) {
        return obj[prop];
    }
}

function getFromObject(obj, path, defaultValue) {
    if (typeof path === 'number') {
        path = [path];
    }

    if (!path || path.length === 0 || obj === null) {
        return defaultValue;
    }

    if (typeof path === 'string') {
        if (path in obj) {
            return getShallowProperty(obj, path);
        } else {
            return getFromObject(obj, path.split('.'), defaultValue);
        }
    }

    var currentPath = getKey(path[0]),
        nextObj = getShallowProperty(obj, currentPath);

    if (nextObj === void 0) {
        return defaultValue;
    }

    if (path.length === 1) {
        return nextObj;
    }

    return getFromObject(obj[currentPath], path.slice(1), defaultValue);
}

module.exports = getFromObject;
