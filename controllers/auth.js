exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie').split('=')[1]
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn,
    })
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true')
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
