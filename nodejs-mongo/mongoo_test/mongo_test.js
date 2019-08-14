var imgModel = require('./mongoSchema').imgModle

imgM = new  imgModel({
    'title' : 'nimei',
    'urls'  : ['dd1','dd2','dd3']
})

imgM.save(function (err) {
    if (err) {
        console.log(err)
    }

})
