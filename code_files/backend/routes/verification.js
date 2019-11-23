module.exports = function (req, res, next) {
    const token = req.session.username;
    if(!token) return res.status(401).send('Access denied')
    else {
        next();
    }
}