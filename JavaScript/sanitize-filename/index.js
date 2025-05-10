const invalidWindowsFilename = 's:u/c\\c?e:e<d>e|d*!"!';

console.log(sanitizeWindowsFilename(invalidWindowsFilename));

function sanitizeWindowsFilename(filename) {
    return filename.replace(/\u0022|\u003C|\u003E|\u007C|\u003A|\u002A|\u003F|\u005C|\u002F/g, '');
}
