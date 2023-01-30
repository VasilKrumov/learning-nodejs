exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
    })
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true
    res.redirect('/')
    // User.findById('63d3cdfea6673f35c077df57')
    //     .then((user) => {
    //         req.session.user = user
    //         req.session.save((err) => {
    //             console.log(err)
    //         })
    //     })
    //     .catch((err) => console.log(err))
}
